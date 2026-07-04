const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'routes', 'admin', 'analytics');
const destDir = path.join(__dirname, 'src', 'routes', 'analytics');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    let content = fs.readFileSync(srcPath, 'utf8');
    content = content.replace(/'\/admin\/analytics/g, "'/analytics");
    fs.writeFileSync(destPath, content);
    console.log(`Copied and updated ${file}`);
    
    if (file !== 'index.jsx') {
      fs.unlinkSync(srcPath); // delete old file
    }
  }
});

// Create redirect in admin/analytics/index.jsx
const redirectContent = `import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/analytics/')({
  component: () => <Navigate to="/analytics" replace />,
});
`;
fs.writeFileSync(path.join(srcDir, 'index.jsx'), redirectContent);
console.log('Created redirect in admin/analytics/index.jsx');
