const fs = require('fs');
const path = require('path');

// 1. Update PortalCards.jsx
const portalsPath = path.join(process.cwd(), 'src', 'components', 'landing', 'PortalCards.jsx');
let portalsContent = fs.readFileSync(portalsPath, 'utf8');

// Remove analytics card
portalsContent = portalsContent.replace(/,\s*\{\s*id:\s*"analytics"[\s\S]*?\}\s*\]/, '\n];');
// Update grid to 2 columns and center it
portalsContent = portalsContent.replace(
  'className="grid grid-cols-1 md:grid-cols-3 gap-8"',
  'className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"'
);
fs.writeFileSync(portalsPath, portalsContent);
console.log("Updated PortalCards.jsx");

// 2. Update unified-sidebar.jsx
const sidebarPath = path.join(process.cwd(), 'src', 'components', 'layout', 'unified-sidebar.jsx');
let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

const newAdminArray = `  admin: [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Curriculum", href: "/admin/curriculum", icon: Layers },
    { isDivider: true, name: "Analytics Hub" },
    { name: "Executive Overview", href: "/analytics/executive", icon: LayoutDashboard },
    { name: "Learning Coverage", href: "/analytics/coverage", icon: Users },
    { name: "Learning Hours", href: "/analytics/hours", icon: Clock },
    { name: "Learning Pillars", href: "/analytics/pillars", icon: Briefcase },
    { name: "AI Transformation", href: "/analytics/ai", icon: Brain },
    { name: "Certifications", href: "/analytics/certifications", icon: ShieldCheck },
    { name: "Flagship Programs", href: "/analytics/programs", icon: AwardIcon },
    { name: "Learning Trends", href: "/analytics/trends", icon: TrendingUp },
    { name: "Effectiveness", href: "/analytics/effectiveness", icon: Activity },
    { name: "Learning Champions", href: "/analytics/champions", icon: AwardIcon },
    { name: "Project Investment", href: "/analytics/investment", icon: Wallet },
    { name: "Apprentice Journey", href: "/analytics/apprentice", icon: GraduationCap },
    { isDivider: true, name: "Future Enhancements" },
    { name: "Skill Gap", href: "/analytics/skill-gap", icon: Target },
    { name: "Recommendations", href: "/analytics/recommendations", icon: Lightbulb },
    { name: "Predictive Analytics", href: "/analytics/predictive", icon: LineChart },
  ],`;

sidebarContent = sidebarContent.replace(/admin:\s*\[[\s\S]*?\],\s*analytics:\s*\[[\s\S]*?\],/, newAdminArray);

// Now update the render function to support dividers
const renderBlock = `{navItems.map((item, index) => {
          if (item.isDivider) {
            return (
              <div key={\`divider-\${index}\`} className="nav-section mt-6 mb-2 text-[10px] uppercase tracking-wider font-black text-[#01AC9F] opacity-80">
                {item.name}
              </div>
            );
          }
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => handleNavClick()}
              className="nav-item"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: item.href === \`/\${portalType}\` }}
              style={{ textDecoration: "none" }}
            >
              <item.icon className="nav-icon" />
              <span>{item.name}</span>
            </Link>
          );
        })}`;

// We need to replace the old navItems map
const oldNavItemsRegex = /\{navItems\.map\(\(item\) => \{[\s\S]*?\}\)\}/;
sidebarContent = sidebarContent.replace(oldNavItemsRegex, renderBlock);

fs.writeFileSync(sidebarPath, sidebarContent);
console.log("Updated unified-sidebar.jsx");
