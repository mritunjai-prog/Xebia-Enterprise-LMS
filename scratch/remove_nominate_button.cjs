const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'champions.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the "Nominate Colleague" button
content = content.replace(
  /<Button\s*\n\s*size="sm"\s*\n\s*className="bg-\[#01AC9F\] hover:bg-\[#018F84\] text-white shadow-sm transition-all"\s*>\s*\n\s*<Award className="w-4 h-4 mr-2" \/>\s*\n\s*Nominate Colleague\s*\n\s*<\/Button>/,
  ''
);

fs.writeFileSync(filePath, content);
console.log("Removed Nominate Colleague button.");
