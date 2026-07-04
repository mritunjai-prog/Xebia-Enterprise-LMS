const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'trends.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add lastUpdated state
content = content.replace(
  /const \[activeView, setActiveView\] = useState\('MoM'\);/,
  `const [activeView, setActiveView] = useState('MoM');\n  const [lastUpdated] = useState(new Date().toLocaleTimeString());`
);

// 2. Update the subtitle text to the executive format
content = content.replace(
  /<Calendar className="w-4 h-4" \/> Tracking learning growth over time/,
  `<Calendar className="w-4 h-4" /> Reporting Period: April 1 - June 30, 2026 • Last updated: {lastUpdated}`
);

fs.writeFileSync(filePath, content);
console.log("Updated subtitle to executive style in trends.jsx.");
