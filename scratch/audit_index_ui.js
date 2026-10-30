const fs = require('fs');

const content = fs.readFileSync('f:/AUDIRA-NET-BILLING/AUDIRA-BILLING/apps/frontend/src/pages/index.tsx', 'utf8');

console.log('=== AUDIT INDEX.TSX ===');
console.log('Total length:', content.length);

// 1. Check for AI Slop keywords (R-01 - R-34 Anti-Slop Guidelines)
const slopWords = [
  'seamless', 'revolutionary', 'empower', 'game-changer', 'delve', 'tapestry',
  'unleash', 'supercharge', 'effortless', 'cutting-edge', 'world-class', 'tanpa pusing',
  '🏆', '🚀', '🔥', '✨', '⚡️', '—'
];

const escapeRegex = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

console.log('\n--- AI SLOP KEYWORDS SCAN ---');
slopWords.forEach(word => {
  const count = (content.match(new RegExp(escapeRegex(word), 'gi')) || []).length;
  if (count > 0) {
    console.log(`Found "${word}": ${count} times`);
  }
});

// 2. Check for gradient slop classes or blur orbs
console.log('\n--- GRADIENT / SLOP CLASS SCAN ---');
const slopClasses = ['bg-gradient-to-r', 'from-purple', 'to-pink', 'from-violet', 'to-fuchsia', 'blur-[', 'rounded-full blur'];
slopClasses.forEach(cls => {
  const count = (content.match(new RegExp(escapeRegex(cls), 'g')) || []).length;
  if (count > 0) {
    console.log(`Found class "${cls}": ${count} times`);
  }
});

// 3. Scan all interactive elements (buttons, links)
console.log('\n--- INTERACTIVE ELEMENTS AUDIT ---');
const linkRegex = /<Link\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/Link>/g;
let m;
let linkCount = 0;
while ((m = linkRegex.exec(content)) !== null) {
  linkCount++;
  if (m[1] === '#' || m[1] === '' || m[1].includes('void(0)')) {
    console.log('Dead Link:', m[1], 'text:', m[2].replace(/<[^>]+>/g, '').trim().substring(0, 40));
  }
}
console.log('Total Links examined:', linkCount);

// 4. Scan buttons and their handlers
const buttonRegex = /<button\s+([^>]*?)>([\s\S]*?)<\/button>/g;
let btnCount = 0;
let deadButtons = [];
while ((m = buttonRegex.exec(content)) !== null) {
  btnCount++;
  const attrs = m[1];
  const inner = m[2].replace(/<[^>]+>/g, '').trim().substring(0, 40);
  if (!attrs.includes('onClick') && !attrs.includes('type="submit"') && !attrs.includes('type=\'submit\'')) {
    deadButtons.push({ idx: btnCount, attrs, text: inner });
  }
}
console.log(`Total Buttons: ${btnCount}, Potentially Dead Buttons: ${deadButtons.length}`);
deadButtons.forEach(b => console.log(`  Button #${b.idx} [${b.text}]: attrs=${b.attrs.substring(0, 60)}`));

// 5. Check theme variables usage vs hardcoded dark/light
console.log('\n--- THEME COMPATIBILITY SCAN ---');
const hardcodedDark = content.match(/className="[^"]*\bbg-slate-900\b[^"]*"/g) || [];
console.log('Hardcoded bg-slate-900 occurrences:', hardcodedDark.length);
const hardcodedDark950 = content.match(/className="[^"]*\bbg-slate-950\b[^"]*"/g) || [];
console.log('Hardcoded bg-slate-950 occurrences:', hardcodedDark950.length);
const hardcodedTextWhite = content.match(/className="[^"]*\btext-white\b[^"]*"/g) || [];
console.log('Hardcoded text-white occurrences:', hardcodedTextWhite.length);

console.log('\n=== AUDIT COMPLETE ===');
