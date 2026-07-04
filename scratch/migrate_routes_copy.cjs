const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src', 'routes');
const oldAnalyticsDir = path.join(srcDir, 'analytics');
const adminDir = path.join(srcDir, 'admin');
const newAnalyticsDir = path.join(adminDir, 'analytics');

if (!fs.existsSync(newAnalyticsDir)) {
  fs.mkdirSync(newAnalyticsDir, { recursive: true });
}

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
    fs.readdirSync(from).forEach(element => {
        const fromElement = path.join(from, element);
        const toElement = path.join(to, element);
        if (fs.lstatSync(fromElement).isFile()) {
            fs.copyFileSync(fromElement, toElement);
        } else {
            copyFolderSync(fromElement, toElement);
        }
    });
}

// 1. Copy files
if (fs.existsSync(oldAnalyticsDir)) {
  copyFolderSync(oldAnalyticsDir, newAnalyticsDir);
  console.log('Copied analytics directory to admin/analytics');
}

// 2. Update createFileRoute paths in newAnalyticsDir
const files = fs.readdirSync(newAnalyticsDir);
let updateCount = 0;

files.forEach(file => {
  if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
    const filePath = path.join(newAnalyticsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const original = content;
    // Replace standard tanstack router definition
    content = content.replace(/createFileRoute\(['"`]\/analytics\//g, "createFileRoute('/admin/analytics/");
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      updateCount++;
    }
  }
});

console.log(`Updated route paths in ${updateCount} copied files.`);

// 3. Attempt to delete old directory
try {
  fs.rmSync(oldAnalyticsDir, { recursive: true, force: true });
  console.log("Deleted old analytics directory successfully.");
} catch(e) {
  console.log("Could not delete old directory (files might be open in IDE). Please delete 'src/routes/analytics' manually.");
}
