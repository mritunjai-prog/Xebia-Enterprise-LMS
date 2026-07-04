const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'components', 'layout', 'unified-sidebar.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add new icons to import
if (!content.includes('Target,')) {
  content = content.replace('GraduationCap\n} from "lucide-react";', 'GraduationCap,\n  Target,\n  Lightbulb,\n  LineChart\n} from "lucide-react";');
}

// 2. Add new routes to navConfig.analytics
const newRoutes = `
    { name: "Skill Gap", href: "/analytics/skill-gap", icon: Target },
    { name: "Recommendations", href: "/analytics/recommendations", icon: Lightbulb },
    { name: "Predictive Analytics", href: "/analytics/predictive", icon: LineChart },
  ],`;

content = content.replace(/\{ name: "Apprentice Journey", href: "\/analytics\/apprentice", icon: GraduationCap \},\n\s*\],/, 
  '{ name: "Apprentice Journey", href: "/analytics/apprentice", icon: GraduationCap },' + newRoutes);

fs.writeFileSync(filePath, content);
console.log("Sidebar routes added.");
