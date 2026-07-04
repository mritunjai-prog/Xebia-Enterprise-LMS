const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', 'analytics', 'programs.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the Refresh and Fullscreen buttons
const buttonsRegex = /<Button\s*variant="outline"\s*size="icon"\s*onClick=\{handleRefresh\}[\s\S]*?<\/Button>\s*<Button\s*variant="outline"\s*size="icon"\s*onClick=\{handleFullscreen\}[\s\S]*?<\/Button>/;
content = content.replace(buttonsRegex, '');

// Remove the unused handlers
content = content.replace(/const handleRefresh = \(\) => \{\s*setLastUpdated\(new Date\(\)\.toLocaleTimeString\(\)\);\s*\};\s*/, '');
content = content.replace(/const handleFullscreen = \(\) => \{[\s\S]*?\}\s*else\s*\{[\s\S]*?\}\s*\};\s*/, '');

fs.writeFileSync(filePath, content);
console.log("Removed refresh and fullscreen buttons from programs.jsx.");
