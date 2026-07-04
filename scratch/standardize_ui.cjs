const fs = require('fs');
const path = require('path');

const analyticsDir = path.join(process.cwd(), 'src', 'routes', 'analytics');

// Fix recommendations.jsx
let recPath = path.join(analyticsDir, 'recommendations.jsx');
let recContent = fs.readFileSync(recPath, 'utf8');
recContent = recContent.replace(
  /<h1 className="text-3xl font-black tracking-tight text-\[#6C1D5F\] dark:text-\[#FFACE8\] flex items-center gap-3">\s*<Sparkles className="w-8 h-8" \/>\s*Learning Recommendation Engine\s*<\/h1>/,
  '<h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">\n            Learning Recommendation Engine\n          </h1>'
);
fs.writeFileSync(recPath, recContent);

// Fix predictive.jsx
let predPath = path.join(analyticsDir, 'predictive.jsx');
let predContent = fs.readFileSync(predPath, 'utf8');
predContent = predContent.replace(
  /<h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">\s*<Activity className="w-8 h-8 text-\[#01AC9F\]" \/>\s*Predictive Analytics\s*<\/h1>/,
  '<h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">\n            Predictive Analytics\n          </h1>'
);
fs.writeFileSync(predPath, predContent);

// Fix unified-sidebar.jsx
let sidebarPath = path.join(process.cwd(), 'src', 'components', 'layout', 'unified-sidebar.jsx');
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
sidebarContent = sidebarContent.replace(
  /<div className="nav-section mt-6 mb-2 text-\[10px\] uppercase tracking-wider font-black text-\[#6C1D5F\] dark:text-\[#FFACE8\] opacity-80">\s*Future Enhancements\s*<\/div>/,
  '<div className="nav-section mt-6">Future Enhancements</div>'
);
fs.writeFileSync(sidebarPath, sidebarContent);

console.log("Standardized UI and headers.");
