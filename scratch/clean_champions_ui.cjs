const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'champions.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the decorative background shapes from the 4 category cards to strictly match executive styling
content = content.replace(
  /<div className="absolute top-0 right-0 w-32 h-32 bg-(?:yellow-500|\[#FF6200\]|\[#01AC9F\]|\[#6C1D5F\])(?:\/10)?(?: dark:bg-\[#FFACE8\]\/10)? rounded-bl-\[100px\] pointer-events-none"><\/div>\s*/g,
  ''
);

fs.writeFileSync(filePath, content);
console.log("Removed decorative background shapes for pure executive styling.");
