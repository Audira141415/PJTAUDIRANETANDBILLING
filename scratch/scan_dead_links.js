const fs = require('fs');
const path = require('path');

const pagesDir = path.resolve('AUDIRA-BILLING/apps/frontend/src/pages');
const srcDir = path.resolve('AUDIRA-BILLING/apps/frontend/src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      results.push(full);
    }
  });
  return results;
}

const allSrcFiles = walk(srcDir);
const pageFiles = walk(pagesDir);

// Build set of valid routes
const validRoutes = new Set();
validRoutes.add('/');
pageFiles.forEach(f => {
  let rel = path.relative(pagesDir, f).replace(/\\/g, '/');
  rel = rel.replace(/\.(tsx|jsx|ts|js)$/, '');
  if (rel.endsWith('/index')) {
    rel = rel.slice(0, -6);
  }
  if (rel === 'index') rel = '';
  validRoutes.add('/' + rel);
});

console.log('Total valid routes:', validRoutes.size);

const linkRegex = /(?:href=|router\.push\(|router\.replace\()\s*['"`](\/[^'"`?#]+)['"`]/g;
const deadLinks = [];

allSrcFiles.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(code)) !== null) {
    const target = match[1];
    if (target.startsWith('/api') || target.startsWith('/_next') || target.startsWith('/static') || target.startsWith('/fonts') || target.startsWith('/images')) {
      continue;
    }
    
    // Check if matches a static route
    if (validRoutes.has(target)) continue;
    
    // Check if matches a dynamic route
    let matchedDynamic = false;
    for (const r of validRoutes) {
      if (r.includes('[')) {
        const regexStr = '^' + r.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+') + '$';
        if (new RegExp(regexStr).test(target)) {
          matchedDynamic = true;
          break;
        }
      }
    }
    
    if (!matchedDynamic) {
      deadLinks.push({
        source: path.relative(srcDir, file).replace(/\\/g, '/'),
        target
      });
    }
  }
});

console.log('Dead / missing link targets:', deadLinks.length);
deadLinks.forEach(d => console.log(`${d.source} -> ${d.target}`));
