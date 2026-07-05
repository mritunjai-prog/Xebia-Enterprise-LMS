import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Award,
  Bell,
  MessageSquare,
  LogOut,
  User,
  Tag,
  Layers,
  PieChart,
  Users,
  Clock,
  Briefcase,
  Brain,
  ShieldCheck,
  TrendingUp,
  Activity,
  Award as AwardIcon,
  Wallet,
  GraduationCap,
  Target,
  Lightbulb,
  LineChart,
  BarChart2,
  ChevronDown,
  ChevronRight,
  Settings,
} from "lucide-react";
import { studentProfile } from "@/features/student/mocks/dummy-data";
import { useAppStore } from "@/admin/store/useAppStore";
import { clsx } from "clsx";
import logoPurple from "@/assets/logo-purple.png";
import logoWhite from "@/assets/logo-white.png";
import { useDarkMode } from "@/features/student/hooks/use-dark-mode";

const navConfig = {
  student: [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "My Batches", href: "/student/batches", icon: CalendarDays },
    { name: "Assessments", href: "/student/assessments", icon: ClipboardCheck },
    { name: "Results", href: "/student/results", icon: Award },
    { name: "Notifications", href: "/student/notifications", icon: Bell },
    { name: "Feedback", href: "/student/feedback", icon: MessageSquare },
  ],
  admin: [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Curriculum", href: "/admin/curriculum", icon: Layers },
    { isDivider: true, name: "Analytics Hub" },
    { name: "Executive Overview", href: "/admin/analytics/executive", icon: LayoutDashboard },
    { name: "Learning Coverage", href: "/admin/analytics/coverage", icon: Users },
    { name: "Learning Hours", href: "/admin/analytics/hours", icon: Clock },
    { name: "Learning Pillars", href: "/admin/analytics/pillars", icon: Briefcase },
    { name: "AI Transformation", href: "/admin/analytics/ai", icon: Brain },
    { name: "Certifications", href: "/admin/analytics/certifications", icon: ShieldCheck },
    { name: "Flagship Programs", href: "/admin/analytics/programs", icon: AwardIcon },
    { name: "Learning Trends", href: "/admin/analytics/trends", icon: TrendingUp },
    { name: "Effectiveness", href: "/admin/analytics/effectiveness", icon: Activity },
    { name: "Learning Champions", href: "/admin/analytics/champions", icon: AwardIcon },
    { name: "Project Investment", href: "/admin/analytics/investment", icon: Wallet },
    { name: "Apprentice Journey", href: "/admin/analytics/apprentice", icon: GraduationCap },
    { isDivider: true, name: "Future Enhancements" },
    { name: "Skill Gap", href: "/admin/analytics/skill-gap", icon: Target },
    { name: "Recommendations", href: "/admin/analytics/recommendations", icon: Lightbulb },
    { name: "Predictive Analytics", href: "/admin/analytics/predictive", icon: LineChart },
  ],
};

const portalTitles = {
  student: "Student Portal",
  admin: "Admin Portal",
  analytics: "Analytics Hub",
};

export function UnifiedSidebar({ isMobileOpen, setIsMobileOpen, portalType = "student" }) {
  const { isSidebarCollapsed, adminProfile, setActiveSidebarItem, setBreadcrumbs } = useAppStore();
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const isDark = useDarkMode();

  const navItems = navConfig[portalType] || navConfig.student;

  useEffect(() => {
    let activeItem = null;

    // Find the longest matching prefix for active item
    for (const item of navItems) {
      if (item.isDivider) continue;

      const isExactMatch = item.href === `/${portalType}`;
      if (isExactMatch) {
        if (currentPath === `/${portalType}` || currentPath === `/${portalType}/`) {
          activeItem = item;
          break;
        }
      } else if (currentPath.startsWith(item.href)) {
        if (!activeItem || item.href.length > activeItem.href.length) {
          activeItem = item;
        }
      }
    }

    if (activeItem) {
      setActiveSidebarItem(activeItem.name);

      const crumbs = [];
      if (portalType === "admin") {
        crumbs.push({ label: "Admin", href: "/admin" });
        if (activeItem.href?.startsWith("/admin/analytics") && activeItem.name !== "Dashboard") {
          crumbs.push({ label: "Analytics", href: "/admin/analytics/executive" });
        }
      } else if (portalType === "student") {
        crumbs.push({ label: "Student", href: "/student" });
      }

      if (activeItem.name !== "Dashboard") {
        crumbs.push({ label: activeItem.name, href: activeItem.href });
      } else {
        crumbs.push({ label: "Dashboard", href: activeItem.href });
      }

      setBreadcrumbs(crumbs);
    }
  }, [currentPath, portalType, navItems, setActiveSidebarItem, setBreadcrumbs]);

  const handleNavClick = () => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const portalTitle = portalTitles[portalType] || "Portal";

  // Use student profile for student portal, admin profile for admin/analytics
  const profileName =
    portalType === "student" ? studentProfile.name : adminProfile?.name || "Admin User";
  const initials = profileName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className={clsx("sidebar sidebar-student", isSidebarCollapsed && "collapsed")}>
      {/* Brand */}
      <div className="sidebar-brand">
        <Link
          to="/"
          onClick={() => handleNavClick()}
          className="logo"
          style={{ textDecoration: "none" }}
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            {/* The user requested to automatically switch logos based on active theme */}
            <img
              src={isDark ? logoWhite : logoPurple}
              alt="Xebia Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="logo-text">Xebia LMS</div>
            <div className="logo-sub">{portalTitle}</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav custom-scrollbar overflow-y-auto">
        <div className="nav-section">Main Menu</div>

        {navItems.map((item, index) => {
          // Hide analytics items if collapsed
          if (item.href?.startsWith("/admin/analytics") && !isAnalyticsOpen) {
            return null;
          }
          if (item.name === "Future Enhancements" && !isAnalyticsOpen) {
            return null;
          }

          if (item.isDivider) {
            if (item.name === "Analytics Hub") {
              return (
                <div
                  key={`divider-${index}`}
                  className="nav-section mt-6 mb-2 text-[11px] uppercase tracking-wider font-bold text-gray-900 dark:text-white opacity-90 cursor-pointer flex items-center justify-between hover:opacity-100 transition-opacity"
                  onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
                >
                  <span className="flex items-center gap-2">
                    <BarChart2 className="w-3.5 h-3.5" />
                    {item.name}
                  </span>
                  <span>
                    {isAnalyticsOpen ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                </div>
              );
            }
            return (
              <div
                key={`divider-${index}`}
                className="nav-section mt-6 mb-2 text-[11px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400 opacity-90"
              >
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
              activeOptions={{ exact: item.href === `/${portalType}` }}
              style={{ textDecoration: "none" }}
            >
              <item.icon className="nav-icon" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom section */}
      <div className="sidebar-footer">
        <div className="sidebar-user" style={{ textDecoration: "none" }}>
          <div className="user-avatar" style={{ background: "rgba(255,255,255,0.1)" }}>
            {initials}
          </div>
          <div className="user-info">
            <div className="user-name">{profileName}</div>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("lms_token");
            window.location.href = "/";
          }}
          className="sidebar-user w-full text-left mt-1 border-none bg-transparent"
        >
          <div className="user-avatar" style={{ background: "transparent", color: "inherit" }}>
            <LogOut className="w-[18px] h-[18px] opacity-60 text-red-400" />
          </div>
          <div className="user-info">
            <div className="user-name text-red-400">Logout</div>
          </div>
        </button>
      </div>
    </div>
  );
}
