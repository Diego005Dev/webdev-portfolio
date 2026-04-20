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

function findTags(text, tag) {
  const results = [];
  const rx = new RegExp(`<${tag}\\b([\\s\\S]*?)>(?:\\s*</${tag}>)?`, 'gi');
  let m;
  while ((m = rx.exec(text)) !== null) {
    results.push(m[1]);
  }
  return results;
}

function findSelfClosingTags(text, tag) {
  const results = [];
  const rx = new RegExp(`<${tag}\\b([\\s\\S]*?)\\/>`, 'gi');
  let m;
  while ((m = rx.exec(text)) !== null) {
    results.push(m[1]);
  }
  return results;
}

function checkFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const issues = [];

  // raw img tags
  const imgTags = findTags(text, 'img').concat(findSelfClosingTags(text, 'img'));
  for (const t of imgTags) {
    if (!/\balt\s*=/.test(t)) {
      issues.push({ type: 'img', snippet: t.trim().slice(0, 200) });
    }
  }

  // Next/Image component usage: <Image ... /> or <Image ...></Image>
  const imageTags = findSelfClosingTags(text, 'Image').concat(findTags(text, 'Image'));
  for (const t of imageTags) {
    if (!/\balt\s*=/.test(t)) {
      issues.push({ type: 'Image', snippet: t.trim().slice(0, 200) });
    }
  }

  return issues.length ? { file, issues } : null;
}

function main() {
  const root = path.join(__dirname, '..');
  const files = walk(root, ['.tsx', '.jsx', '.html']);
  const results = [];
  for (const f of files) {
    const res = checkFile(f);
    if (res) results.push(res);
  }
  if (!results.length) {
    console.log('✅ No missing alt attributes found for <img> or <Image> components.');
    process.exit(0);
  }
  console.log('Found missing alt attributes:');
  for (const r of results) {
    console.log('\nFile:', r.file);
    for (const i of r.issues) {
      console.log('-', i.type, ':', i.snippet.replace(/\n/g, ' '));
    }
  }
  process.exit(1);
}

main();
