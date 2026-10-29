const fs = require('fs');
const path = require('path');
const http = require('http');

const pagesDir = path.resolve('AUDIRA-BILLING/apps/frontend/src/pages');

// 1. Recursive file finder
function getPageFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getPageFiles(fullPath));
    } else if (file.endsWith('.tsx') && !file.startsWith('_')) {
      results.push(fullPath);
    }
  }
  return results;
}

const pageFiles = getPageFiles(pagesDir);
console.log(`Discovered ${pageFiles.length} page files to audit.`);

// 2. Map file path to route URL
function fileToRoute(filePath) {
  let rel = path.relative(pagesDir, filePath).replace(/\\/g, '/').replace(/\.tsx$/, '');
  if (rel.endsWith('/index')) {
    rel = rel.slice(0, -6);
  }
  if (rel === 'index') {
    rel = '';
  }
  // Handle dynamic parameters
  rel = rel.replace(/\[id\]/g, 'INV-2026-07-0012'); // Mock ID
  rel = rel.replace(/\[slug\]/g, 'demo-slug');
  return '/' + rel;
}

// 3. Static Code Audit: Dead Buttons, No-ops, and Empty Containers
const codeAuditResults = [];

for (const f of pageFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const rel = path.relative(pagesDir, f).replace(/\\/g, '/');
  
  // A. Check for buttons without onClick and without type="submit"
  const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
  let match;
  const deadButtons = [];
  
  while ((match = buttonRegex.exec(content)) !== null) {
    const attrs = match[1];
    const buttonInner = match[2].trim().replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
    const hasOnClick = /onClick\s*=/i.test(attrs);
    const isSubmit = /type\s*=\s*['"]submit['"]/i.test(attrs);
    const isDisabled = /disabled\b/i.test(attrs);
    const isDropdownTrigger = /data-toggle|data-state/i.test(attrs);
    
    // Check for empty handler: onClick={() => {}} or onClick={() => {}}
    const isEmptyHandler = /onClick\s*=\s*\{(?:\(\s*\)\s*=>\s*\{\s*\}|\(\s*\)\s*=>\s*undefined|\(\s*\)\s*=>\s*null)\}/i.test(attrs);
    const isConsoleOnly = /onClick\s*=\s*\{(?:\(\s*\)\s*=>\s*console\.log[^}]*)\}/i.test(attrs);

    if (!hasOnClick && !isSubmit && !isDisabled && !isDropdownTrigger) {
      deadButtons.push({ text: buttonInner || '(Icon only)', type: 'NO_ONCLICK', snippet: match[0].slice(0, 100) });
    } else if (isEmptyHandler) {
      deadButtons.push({ text: buttonInner || '(Icon only)', type: 'EMPTY_HANDLER', snippet: match[0].slice(0, 100) });
    } else if (isConsoleOnly) {
      deadButtons.push({ text: buttonInner || '(Icon only)', type: 'CONSOLE_ONLY', snippet: match[0].slice(0, 100) });
    }
  }

  // B. Check for dead anchors (href="#" or href="javascript:void(0)")
  const deadAnchorRegex = /<a\b[^>]*href\s*=\s*["'](?:#|javascript:void\(0\)|)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const deadAnchors = [];
  while ((match = deadAnchorRegex.exec(content)) !== null) {
    const text = match[1].trim().replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
    deadAnchors.push(text || '(Icon only)');
  }

  // C. Check for potential blank render returns
  const hasReturnNull = /return\s+null\s*;/i.test(content);
  const hasComingSoon = /(coming soon|under construction|dalam pengembangan|belum tersedia)/i.test(content);
  const fileLines = content.split('\n').length;
  const isTooShort = fileLines < 30; // Very short file might be an empty skeleton

  if (deadButtons.length > 0 || deadAnchors.length > 0 || hasComingSoon || isTooShort) {
    codeAuditResults.push({
      file: rel,
      lines: fileLines,
      deadButtons,
      deadAnchors,
      hasReturnNull,
      hasComingSoon,
      isTooShort
    });
  }
}

// 4. HTTP Live Route Testing
async function testRoute(route) {
  return new Promise((resolve) => {
    const url = `http://localhost:3217${route}`;
    const req = http.get(url, { timeout: 8000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          length: data.length,
          hasContent: data.length > 1500,
          isNextError: data.includes('Next.js - Application error') || data.includes('Internal Server Error')
        });
      });
    });
    req.on('error', (err) => {
      resolve({ route, status: 0, length: 0, error: err.message });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ route, status: 408, length: 0, error: 'Timeout' });
    });
  });
}

async function runAudit() {
  console.log('\n=== 1. LIVE HTTP ROUTE AUDIT (Checking all pages at http://localhost:3217) ===');
  const httpResults = [];
  for (const f of pageFiles) {
    const route = fileToRoute(f);
    const res = await testRoute(route);
    httpResults.push(res);
  }

  const failedRoutes = httpResults.filter(r => r.status !== 200 || r.isNextError || r.length < 1000);
  console.log(`\nAudited ${httpResults.length} routes.`);
  console.log(`Successful 200 OK: ${httpResults.filter(r => r.status === 200 && !r.isNextError).length}`);
  console.log(`Problematic / Empty / Error Routes: ${failedRoutes.length}`);

  if (failedRoutes.length > 0) {
    console.log('\n--- PROBLEMATIC ROUTES FOUND ---');
    failedRoutes.forEach(r => {
      console.log(`Route: ${r.route.padEnd(35)} | Status: ${r.status} | Body Length: ${r.length} bytes | Error: ${r.error || (r.isNextError ? 'Next.js App Error' : 'Minimal Body')}`);
    });
  } else {
    console.log('✅ ALL routes returned valid HTTP 200 OK with substantial HTML content!');
  }

  console.log('\n=== 2. STATIC CODE AUDIT (Dead Buttons, Dead Anchors, Coming Soon) ===');
  console.log(`Files with potential issues: ${codeAuditResults.length} out of ${pageFiles.length}`);

  codeAuditResults.forEach(r => {
    console.log(`\n📁 File: ${r.file} (${r.lines} lines)`);
    if (r.isTooShort) console.log(`   ⚠️ WARNING: File is very short (${r.lines} lines) - possible stub!`);
    if (r.hasComingSoon) console.log(`   ⚠️ NOTICE: Contains 'Coming Soon' / 'Dalam Pengembangan' text`);
    if (r.deadButtons.length > 0) {
      console.log(`   🔴 Dead / Inactive Buttons (${r.deadButtons.length}):`);
      r.deadButtons.slice(0, 5).forEach(b => console.log(`      - [${b.type}] "${b.text}" -> ${b.snippet.slice(0, 60)}...`));
      if (r.deadButtons.length > 5) console.log(`      ... and ${r.deadButtons.length - 5} more`);
    }
    if (r.deadAnchors.length > 0) {
      console.log(`   🟡 Dead Anchors href="#" (${r.deadAnchors.length}):`);
      r.deadAnchors.slice(0, 5).forEach(a => console.log(`      - "${a}"`));
    }
  });

  // Save report to JSON for further inspection
  fs.writeFileSync('scratch/full_audit_results.json', JSON.stringify({ httpResults, codeAuditResults }, null, 2));
  console.log('\nSaved detailed audit log to scratch/full_audit_results.json');
}

runAudit();
