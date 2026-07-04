const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'ai.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove handleRefresh and handleFullscreen methods
content = content.replace(/const handleRefresh = \(\) => \{\s*setLastUpdated\(new Date\(\)\.toLocaleTimeString\(\)\);\s*\};\s*/, '');
content = content.replace(/const handleFullscreen = \(\) => \{[\s\S]*?\}\s*else\s*\{[\s\S]*?\}\s*\};\s*/, '');

// 2. Remove the Refresh and Fullscreen buttons
const buttonsRegex = /<Button\s*variant="outline"\s*size="icon"\s*onClick=\{handleRefresh\}[\s\S]*?<\/Button>\s*<Button\s*variant="outline"\s*size="icon"\s*onClick=\{handleFullscreen\}[\s\S]*?<\/Button>/;
content = content.replace(buttonsRegex, '');

// Also remove the imports if they are unused, though it's not strictly necessary. 
content = content.replace(/RefreshCw,\s*/, '');
content = content.replace(/Maximize\s*/, '');

// 3. Make Maturity Score card smaller
// Current: className="flex-1 bg-white ...
// Change flex-1 to xl:w-[380px] xl:flex-none h-fit self-start
content = content.replace(
  /className="flex-1 bg-white dark:bg-\[#111111\] rounded-2xl p-6 border border-gray-200 dark:border-white\/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-\[#01AC9F\] dark:hover:border-\[#01AC9F\] group flex flex-col justify-between relative overflow-hidden"/,
  'className="xl:w-[380px] xl:flex-none h-fit self-start bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between relative overflow-hidden"'
);

fs.writeFileSync(filePath, content);
console.log("Maturity card resized and buttons removed.");
