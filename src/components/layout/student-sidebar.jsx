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
import { studentProfile } from "@/features/student/mocks/dummy-data";
import { clsx } from "clsx";

const navItems = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "My Courses", href: "/student/courses", icon: BookOpen },
  { name: "My Batches", href: "/student/batches", icon: CalendarDays },
  { name: "Assessments", href: "/student/assessments", icon: ClipboardCheck },
  { name: "Results", href: "/student/results", icon: Award },
  { name: "Notifications", href: "/student/notifications", icon: Bell },
  { name: "Feedback", href: "/student/feedback", icon: MessageSquare },
];

export function StudentSidebar({ isMobileOpen, setIsMobileOpen, isSidebarCollapsed }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const initials = studentProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleNavClick = () => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <div className={clsx("sidebar sidebar-student", isSidebarCollapsed && "collapsed")}>
      {/* Brand */}
      <div className="sidebar-brand">
        <Link to="/student" onClick={() => handleNavClick()} className="logo" style={{ textDecoration: "none" }}>
          <div className="logo-mark">
            <span>X</span>
          </div>
          <div>
            <div className="logo-text">Xebia LMS</div>
            <div className="logo-sub">Student Portal</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        <div className="nav-section">Main Menu</div>
        
        {navItems.map((item) => {
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => handleNavClick()}
              className="nav-item"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: item.href === "/student" }}
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
        <Link
          to="/student/profile"
          className="sidebar-user"
          style={{ textDecoration: "none" }}
        >
          <div className="user-avatar">
            {initials}
          </div>
          <div className="user-info">
            <div className="user-name">{studentProfile.name}</div>
            <div className="user-role">View Profile</div>
          </div>
        </Link>
        <button className="sidebar-user w-full text-left mt-1 border-none bg-transparent">
          <div className="user-avatar" style={{ background: 'transparent', color: 'inherit' }}>
            <LogOut className="w-[18px] h-[18px] opacity-60" />
          </div>
          <div className="user-info">
            <div className="user-name text-red-500">Logout</div>
          </div>
        </button>
      </div>
    </div>
  );
}
