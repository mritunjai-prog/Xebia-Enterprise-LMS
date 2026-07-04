const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'trends.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the orange blur circle in the 4th indicator card
content = content.replace(
  /<div className="absolute -right-4 -bottom-4 w-16 h-16 bg-\[#FF6200\]\/10 rounded-full blur-xl pointer-events-none"><\/div>\s*/g,
  ''
);

fs.writeFileSync(filePath, content);
console.log("Removed orange blur from AI Adoption Growth card.");
