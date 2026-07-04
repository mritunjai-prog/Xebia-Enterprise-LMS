const fs = require('fs');
const path = require('path');

const analyticsDir = path.join(process.cwd(), 'src', 'routes', 'analytics');

function standardizeExportButton() {
  const files = fs.readdirSync(analyticsDir).filter(f => f.endsWith('.jsx'));
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(analyticsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let original = content;
    // Replace various "Export" variants with the standard "Export Report" button
    content = content.replace(/>\s*Export Data\s*<\/Button>/g, '>Export Report</Button>');
    content = content.replace(/>\s*Export CSV\s*<\/Button>/g, '>Export Report</Button>');
    content = content.replace(/>\s*Export Report\s*<\/button>/g, '>Export Report</button>'); // If standard html button

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      updatedCount++;
      console.log(`Updated Export button in ${file}`);
    }
  });

  console.log(`Standardized Export button in ${updatedCount} files.`);
}

standardizeExportButton();
