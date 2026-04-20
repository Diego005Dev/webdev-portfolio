const fs = require('fs');
const path = require('path');

function walk(dir, exts, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walk(full, exts, files);
    } else {
      if (exts.includes(path.extname(e.name))) files.push(full);
    }
  }
  return files;
}

function runChecks(file) {
  const text = fs.readFileSync(file, 'utf8');
  const issues = [];

  // role="button" on non-button elements
  const rxRoleButton = /<(div|span|a|li|p|section|header|footer|figure)\b([^>]*)role=(?:"|')button(?:"|')/gi;
  let m;
  while ((m = rxRoleButton.exec(text))) {
    const tag = m[1];
    issues.push({ type: 'role-button-on-nonbutton', tag, snippet: text.substr(Math.max(0, m.index-40), 120) });
  }

  // tabindex > 0
  const rxTabIndex = /tabindex=(?:"|')([0-9]+)(?:"|')/gi;
  while ((m = rxTabIndex.exec(text))) {
    const val = parseInt(m[1],10);
    if (val > 0) issues.push({ type: 'positive-tabindex', value: val, snippet: text.substr(Math.max(0, m.index-40), 120) });
  }

  // aria-hidden on interactive elements (a,button,input,select,textarea)
  const rxInteractive = /<(a|button|input|select|textarea)\b([^>]*)aria-hidden=(?:"|')true(?:"|')/gi;
  while ((m = rxInteractive.exec(text))) {
    issues.push({ type: 'aria-hidden-on-interactive', tag: m[1], snippet: text.substr(Math.max(0, m.index-40), 120) });
  }

  // anchors with href="#" (non-descriptive)
  const rxHrefHash = /<a\b([^>]*)href=(?:"|')#(?:"|')([^>]*)>/gi;
  while ((m = rxHrefHash.exec(text))) {
    issues.push({ type: 'anchor-href-hash', snippet: text.substr(Math.max(0, m.index-40), 120) });
  }

  return issues.length ? { file, issues } : null;
}

function main() {
  const root = path.join(__dirname, '..');
  const files = walk(root, ['.tsx', '.jsx', '.html']);
  const results = [];
  for (const f of files) {
    const res = runChecks(f);
    if (res) results.push(res);
  }
  if (!results.length) {
    console.log('✅ No static accessibility issues found by basic heuristics.');
    process.exit(0);
  }
  console.log('Static accessibility issues detected:');
  for (const r of results) {
    console.log('\nFile:', r.file);
    for (const i of r.issues) {
      console.log('-', i.type, ':', i.tag || i.value || '', '\n  ', i.snippet.replace(/\n/g, ' '));
    }
  }
  process.exit(1);
}

main();
