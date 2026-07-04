const fs = require('fs');
const path = require('path');

const sidebarPath = path.join(process.cwd(), 'src', 'components', 'layout', 'unified-sidebar.jsx');
let content = fs.readFileSync(sidebarPath, 'utf8');

// 1. Add useState import
if (!content.includes('useState')) {
  content = content.replace(
    'import { Link, useLocation } from "@tanstack/react-router";',
    'import { Link, useLocation } from "@tanstack/react-router";\nimport { useState } from "react";'
  );
}

// 2. Update navConfig admin paths
content = content.replace(/href: "\/analytics\//g, 'href: "/admin/analytics/');

// 3. Inject useState inside component
content = content.replace(
  'export function UnifiedSidebar({ isMobileOpen, setIsMobileOpen, portalType = "student" }) {\n  const { isSidebarCollapsed, adminProfile } = useAppStore();',
  'export function UnifiedSidebar({ isMobileOpen, setIsMobileOpen, portalType = "student" }) {\n  const { isSidebarCollapsed, adminProfile } = useAppStore();\n  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);'
);

// 4. Update the render loop
const oldRenderBlock = /{navItems\.map\(\(item, index\) => \{[\s\S]*?\}\)\}/;
const newRenderBlock = `{navItems.map((item, index) => {
          // Hide analytics items if collapsed
          if (item.href?.startsWith('/admin/analytics') && !isAnalyticsOpen) {
            return null;
          }
          if (item.name === "Future Enhancements" && !isAnalyticsOpen) {
            return null;
          }

          if (item.isDivider) {
            if (item.name === "Analytics Hub") {
              return (
                <div 
                  key={\`divider-\${index}\`} 
                  className="nav-section mt-6 mb-2 text-[10px] uppercase tracking-wider font-black text-[#01AC9F] opacity-80 cursor-pointer flex items-center justify-between hover:opacity-100 transition-opacity"
                  onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
                >
                  <span className="flex items-center gap-2">📁 {item.name}</span>
                  <span>{isAnalyticsOpen ? '▼' : '▶'}</span>
                </div>
              );
            }
            return (
              <div key={\`divider-\${index}\`} className="nav-section mt-6 mb-2 text-[10px] uppercase tracking-wider font-black text-[#6C1D5F] dark:text-[#FFACE8] opacity-80">
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

content = content.replace(oldRenderBlock, newRenderBlock);

fs.writeFileSync(sidebarPath, content);
console.log("Updated unified-sidebar.jsx with collapsible logic and new paths.");
