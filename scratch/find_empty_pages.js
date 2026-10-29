const fs = require('fs');
const path = require('path');

const pagesDir = path.resolve('AUDIRA-BILLING/apps/frontend/src/pages');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk(pagesDir);
const report = [];

for (const f of files) {
  const code = fs.readFileSync(f, 'utf8');
  const rel = path.relative(pagesDir, f).replace(/\\/g, '/');
  
  // 1. return null
  const returnNullMatches = [...code.matchAll(/return\s+null\s*;/g)];
  
  // 2. if (loading) or if (isLoading)
  const loadingGuards = [...code.matchAll(/if\s*\(\s*(?:is)?loading[^)]*\)\s*(?:return|\{)/gi)];
  
  // 3. if (!data) return null or empty
  const nullDataGuards = [...code.matchAll(/if\s*\(\s*!(?:data|customer|item|order|ticket|detail|user|invoice)\b[^)]*\)\s*return/gi)];
  
  // 4. 'Data tidak ditemukan' or 'Tidak Ditemukan'
  const notFoundGuards = [...code.matchAll(/(tidak ditemukan|not found)/gi)];

  if (returnNullMatches.length > 0 || loadingGuards.length > 0 || nullDataGuards.length > 0 || notFoundGuards.length > 0) {
    report.push({
      file: rel,
      returnNulls: returnNullMatches.length,
      loadingGuards: loadingGuards.length,
      nullDataGuards: nullDataGuards.length,
      notFoundGuards: notFoundGuards.length
    });
  }
}

console.log('Total pages with guards:', report.length);
report.forEach(r => {
  console.log(r.file.padEnd(35) + ' | returnNull: ' + r.returnNulls + ' | loadingGuard: ' + r.loadingGuards + ' | nullData: ' + r.nullDataGuards + ' | notFound: ' + r.notFoundGuards);
});
