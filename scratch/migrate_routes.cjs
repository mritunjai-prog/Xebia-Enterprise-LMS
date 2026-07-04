const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src', 'routes');
const oldAnalyticsDir = path.join(srcDir, 'analytics');
const adminDir = path.join(srcDir, 'admin');
const newAnalyticsDir = path.join(adminDir, 'analytics');

// 1. Move folder if it exists
if (fs.existsSync(oldAnalyticsDir)) {
  fs.renameSync(oldAnalyticsDir, newAnalyticsDir);
  console.log('Moved analytics directory to admin/analytics');
}

// 2. Update createFileRoute paths in all files inside newAnalyticsDir
if (fs.existsSync(newAnalyticsDir)) {
  const files = fs.readdirSync(newAnalyticsDir);
  let updateCount = 0;
  
  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(newAnalyticsDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      const original = content;
      content = content.replace(/createFileRoute\(['"`]\/analytics\//g, "createFileRoute('/admin/analytics/");
      
      if (content !== original) {
        fs.writeFileSync(filePath, content);
        updateCount++;
      }
    }
  });
  console.log(`Updated route paths in ${updateCount} files.`);
}
