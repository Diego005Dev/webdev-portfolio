const fs = require('fs');
const path = require('path');

function parseVars(cssText, selector) {
  // Find the block for selector and extract variables using brace matching
  const idx = cssText.indexOf(selector);
  if (idx === -1) return {};
  // find first '{' after idx
  let i = cssText.indexOf('{', idx);
  if (i === -1) return {};
  i++;
  let depth = 1;
  let j = i;
  while (j < cssText.length && depth > 0) {
    if (cssText[j] === '{') depth++;
    else if (cssText[j] === '}') depth--;
    j++;
  }
  const body = cssText.slice(i, j - 1);
  const lines = body.split(/;\s*/);
  const vars = {};
  for (const line of lines) {
    const m = line.match(/--([a-zA-Z0-9-]+)\s*:\s*([^;\n]+)/);
    if (m) vars[m[1]] = m[2].trim().replace(/;$/, '');
  }
  return vars;
}

function hslTripletToRgb(trip) {
  // trip like: "0 0% 100%" or "23 50% 40%"
  const parts = trip.split(/\s+/).map((s) => s.trim());
  if (parts.length < 3) return null;
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1].replace('%',''))/100;
  const l = parseFloat(parts[2].replace('%',''))/100;
  // HSL to RGB
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return { r: f(0), g: f(8), b: f(4) };
}

function rgbToHex({r,g,b}){
  const toHex = (v) => v.toString(16).padStart(2,'0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function relativeLuminance({r,g,b}){
  const srgb = [r,g,b].map(v => v/255).map((c) => {
    return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
  });
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}

function contrastRatio(rgb1, rgb2){
  const L1 = relativeLuminance(rgb1);
  const L2 = relativeLuminance(rgb2);
  const lighter = Math.max(L1,L2);
  const darker = Math.min(L1,L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function report() {
  const cssPath = path.join(__dirname, '..', 'app', 'globals.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  const rootVars = parseVars(css, ':root');
  const darkVars = parseVars(css, '\.dark');

  const pairs = [
    ['foreground','background'],
    ['card-foreground','card'],
    ['popover-foreground','popover'],
    ['primary-foreground','primary'],
    ['secondary-foreground','secondary'],
    ['muted-foreground','muted'],
    ['accent-foreground','accent'],
    ['destructive-foreground','destructive'],
  ];

  console.log('Contrast report (root / light mode):');
  for (const [fg,bg] of pairs){
    if (!rootVars[fg] || !rootVars[bg]) continue;
    const fgRgb = hslTripletToRgb(rootVars[fg]);
    const bgRgb = hslTripletToRgb(rootVars[bg]);
    const ratio = contrastRatio(fgRgb,bgRgb);
    console.log(`${fg} on ${bg}: ${ratio.toFixed(2)} (fg ${rgbToHex(fgRgb)} on bg ${rgbToHex(bgRgb)})`);
  }

  console.log('\nContrast report (dark mode):');
  for (const [fg,bg] of pairs){
    if (!darkVars[fg] || !darkVars[bg]) continue;
    const fgRgb = hslTripletToRgb(darkVars[fg]);
    const bgRgb = hslTripletToRgb(darkVars[bg]);
    const ratio = contrastRatio(fgRgb,bgRgb);
    console.log(`${fg} on ${bg}: ${ratio.toFixed(2)} (fg ${rgbToHex(fgRgb)} on bg ${rgbToHex(bgRgb)})`);
  }
}

report();
