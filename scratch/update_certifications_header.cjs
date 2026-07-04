const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'certifications.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Change title to "Certifications"
content = content.replace(
  /<h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">\s*Certification Dashboard\s*<\/h1>/,
  '<h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">\n            Certifications\n          </h1>'
);

// 2. Remove the Refresh and Fullscreen buttons
const buttonsRegex = /<Button\s*variant="outline"\s*size="icon"\s*onClick=\{handleRefresh\}[\s\S]*?<\/Button>\s*<Button\s*variant="outline"\s*size="icon"\s*onClick=\{handleFullscreen\}[\s\S]*?<\/Button>/;
content = content.replace(buttonsRegex, '');

// 3. Remove the unused handlers
content = content.replace(/const handleRefresh = \(\) => \{\s*setLastUpdated\(new Date\(\)\.toLocaleTimeString\(\)\);\s*\};\s*/, '');
content = content.replace(/const handleFullscreen = \(\) => \{[\s\S]*?\}\s*else\s*\{[\s\S]*?\}\s*\};\s*/, '');

fs.writeFileSync(filePath, content);
console.log("Updated title and removed buttons.");
