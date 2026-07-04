const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'champions.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix border visibility on Top Learners section
content = content.replace(
  /className="bg-white dark:bg-\[#111111\] rounded-2xl border border-gray-200 dark:border-white\/10 shadow-sm overflow-hidden mb-8 transition-colors"/g,
  'className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-300 dark:border-white/20 shadow-sm overflow-hidden mb-8 transition-colors"'
);

// Fix table dividers for better visibility
content = content.replace(
  /divide-gray-100 dark:divide-white\/5/g,
  'divide-gray-200 dark:divide-white/10'
);

// Replace yellow-500 with Xebia Purple (#6C1D5F / dark: #FFACE8) to match brand colors
// For text:
content = content.replace(/text-yellow-500/g, 'text-[#6C1D5F] dark:text-[#FFACE8]');
// For borders:
content = content.replace(/border-yellow-500/g, 'border-[#6C1D5F] dark:border-[#FFACE8]');
// For hover borders:
content = content.replace(/hover:border-yellow-500 dark:hover:border-yellow-500/g, 'hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]');
// For bg:
content = content.replace(/bg-yellow-500\/10/g, 'bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10');


fs.writeFileSync(filePath, content);
console.log("Fixed borders and replaced yellow with Xebia brand colors.");
