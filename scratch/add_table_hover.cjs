const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'champions.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add hover border effect to the Top Learners Table container
content = content.replace(
  /className="bg-white dark:bg-\[#111111\] rounded-2xl border border-gray-300 dark:border-white\/20 shadow-sm overflow-hidden mb-8 transition-colors"/g,
  'className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-300 dark:border-white/20 shadow-sm overflow-hidden mb-8 transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]"'
);

fs.writeFileSync(filePath, content);
console.log("Added hover border effect to Top Learners Leaderboard table container.");
