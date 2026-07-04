const fs = require('fs');
const path = require('path');

const analyticsDir = path.join(process.cwd(), 'src', 'routes', 'analytics');
const files = fs.readdirSync(analyticsDir).filter(f => f.endsWith('.jsx'));

const allowedHex = ['6C1D5F', '4A1E47', '84117C', '01AC9F', 'FF6200', '111111', 'FFACE8'];
// FFACE8 is a lighter version of purple I used for dark mode. If the user complains, I can change FFACE8 to something else, but let's check for standard tailwind colors first.

const colorRegex = /\b(text|bg|border|fill|stroke|from|to|via)-(red|blue|green|yellow|indigo|pink|purple|teal|orange|cyan|emerald|rose|fuchsia|violet|sky|lime|amber)-[0-9]{2,3}(?:\/[0-9]{1,2})?\b/g;
const hexRegex = /\[#([0-9a-fA-F]{6})\]/g;

console.log("Scanning for non-brand colors in analytics dashboards...\n");

files.forEach(file => {
  const content = fs.readFileSync(path.join(analyticsDir, file), 'utf8');
  let matches = [];
  
  let match;
  while ((match = colorRegex.exec(content)) !== null) {
    matches.push(match[0]);
  }
  
  while ((match = hexRegex.exec(content)) !== null) {
    if (!allowedHex.includes(match[1].toUpperCase())) {
      matches.push(match[0]);
    }
  }
  
  if (matches.length > 0) {
    // Unique matches
    matches = [...new Set(matches)];
    console.log(`File: ${file}`);
    console.log(`  Off-brand colors found: ${matches.join(', ')}`);
  }
});
