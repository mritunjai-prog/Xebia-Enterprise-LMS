const fs = require('fs');
const path = require('path');

const analyticsDir = path.join(process.cwd(), 'src', 'routes', 'analytics');

function fixColors(filename, replacements) {
  const filePath = path.join(analyticsDir, filename);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  replacements.forEach(([pattern, replacement]) => {
    content = content.replace(new RegExp(pattern, 'g'), replacement);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed colors in ${filename}`);
  }
}

// Fix ai.jsx (stars and ratings)
fixColors('ai.jsx', [
  ['text-yellow-500', 'text-[#FF6200]'],
  ['text-yellow-400', 'text-[#FF6200]'],
  ['bg-yellow-400', 'bg-[#FF6200]'],
  ['bg-yellow-500', 'bg-[#FF6200]']
]);

// Fix effectiveness.jsx (stars)
fixColors('effectiveness.jsx', [
  ['text-yellow-500', 'text-[#FF6200]'],
  ['fill-yellow-500', 'fill-[#FF6200]']
]);

// Fix pillars.jsx (standard tailwind colors to brand colors)
fixColors('pillars.jsx', [
  ['text-emerald-500', 'text-[#01AC9F]'],
  ['text-emerald-400', 'text-[#01AC9F]/80'],
  ['text-emerald-700', 'text-[#01AC9F]'],
  ['bg-emerald-100', 'bg-[#01AC9F]/10'],
  ['bg-emerald-500\\/20', 'bg-[#01AC9F]/20'],
  
  ['text-blue-500', 'text-[#6C1D5F]'],
  ['text-blue-400', 'text-[#6C1D5F]/80'],
  ['text-blue-700', 'text-[#6C1D5F]'],
  ['bg-blue-100', 'bg-[#6C1D5F]/10'],
  ['bg-blue-500\\/20', 'bg-[#6C1D5F]/20']
]);

// Note: certifications.jsx has 'to-emerald-600'
fixColors('certifications.jsx', [
  ['to-emerald-600', 'to-[#01AC9F]'],
  ['from-emerald-500', 'from-[#01AC9F]']
]);

console.log("Color fixes applied.");
