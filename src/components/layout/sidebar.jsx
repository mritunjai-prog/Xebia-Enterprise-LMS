import { Link, useLocation } from "@tanstack/react-router";
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
} from "lucide-react";
import { studentProfile } from "@/lib/dummy-data";
import { useDarkMode } from "@/hooks/use-dark-mode";


const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "My Courses", href: "/courses", icon: BookOpen },
  { name: "My Batches", href: "/batches", icon: CalendarDays },
  { name: "Assessments", href: "/assessments", icon: ClipboardCheck },
  { name: "Results", href: "/results", icon: Award },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
];

export function StudentSidebar({ isCollapsed, isMobileOpen, setIsMobileOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isDark = useDarkMode();

  const initials = studentProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-card border-r border-border shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* ── Header / Logo & Text ── */}
      <div className={`flex items-center py-5 ${isCollapsed ? "justify-center px-2" : "px-5"}`}>
        <Link
          to="/"
          className="flex items-center gap-3 group"
          style={{ textDecoration: "none" }}
        >
          <img
            src={isDark ? "/logo-white.png" : "/logo-purple.png"}
            alt="Xebia Logo"
            className={`${isCollapsed ? "h-6 max-w-[40px]" : "h-8 max-w-[120px]"} w-auto object-contain transition-all duration-300`}
          />

          {!isCollapsed && (
            <div className="flex flex-col leading-tight transition-all duration-300">
              <span className="text-base font-bold tracking-wide text-foreground">
                Xebia LMS
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest mt-0.5 text-muted-foreground">
                Student Portal
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* ── Divider ── */}
      <div className="mx-4 mb-5 h-px bg-border/50" />

      {/* ── Nav Items ── */}
      <nav className="flex-1 overflow-y-auto px-3 space-y-1.5">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/" && currentPath.startsWith(item.href));

          return (
            <Link
              key={item.name}
              to={item.href}
              title={isCollapsed ? item.name : undefined}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-200 group ${
                isCollapsed ? "justify-center px-0" : "px-3"
              } ${
                isActive
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1"
              }`}
            >
              {/* Icon container */}
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                    : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/10 group-hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
              </div>

              {!isCollapsed && <span className="truncate">{item.name}</span>}

              {/* Active indicator dot */}
              {!isCollapsed && isActive && (
                <div className="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary shadow-sm shadow-primary/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom section ── */}
      <div>
        {/* Divider */}
        <div className="mx-4 my-3 h-px bg-border/50" />

        {/* Profile */}
        <Link
          to="/profile"
          title={isCollapsed ? `${studentProfile.name} - View Profile` : undefined}
          onClick={() => setIsMobileOpen(false)}
          className={`mx-3 mb-1 flex items-center rounded-xl py-2.5 transition-all duration-200 group ${
            isCollapsed ? "justify-center px-0" : "gap-3 px-3"
          } text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1`}
        >
          {/* Initials circle */}
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-sm shadow-primary/30 group-hover:shadow-md">
            {initials || <User className="h-4 w-4" />}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">
                {studentProfile.name}
              </span>
              <span className="text-xs truncate text-muted-foreground">
                View Profile
              </span>
            </div>
          )}
        </Link>

        {/* Logout */}
        <Link
          to="/"
          title={isCollapsed ? "Logout" : undefined}
          className={`mx-3 mb-4 flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 group ${
            isCollapsed ? "justify-center px-0" : "gap-3 px-3"
          } text-destructive hover:bg-destructive/10 hover:translate-x-1`}
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-destructive/10 group-hover:bg-destructive/20 text-destructive transition-colors">
            <LogOut className="h-4 w-4" />
          </div>
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
