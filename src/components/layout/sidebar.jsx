import React from "react";
import { clsx } from "clsx";
import { useRouter, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Award,
  Bell,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { studentProfile } from "@/lib/dummy-data";
import logoPurple from "@/assets/logo-purple.png";
import logoWhite from "@/assets/logo-white.png";

const NavItem = ({ icon: Icon, label, isActive, onClick, isCollapsed }) => (
  <div 
    onClick={onClick} 
    title={isCollapsed ? label : undefined}
    className={clsx(
      "flex items-center gap-3 py-3 my-1 rounded-xl cursor-pointer font-medium transition-all duration-200 group text-[14px]",
      isCollapsed ? "mx-3 px-0 justify-center" : "px-4 mx-4",
      isActive 
        ? "bg-[#6C1D5F] text-white shadow-md shadow-[#6C1D5F]/20" 
        : "text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
    )}
  >
    <Icon className={clsx(
      "w-[20px] h-[20px] shrink-0 transition-transform duration-200 group-hover:scale-110",
      isActive ? "text-white opacity-100" : "opacity-80 group-hover:opacity-100"
    )} />
    {!isCollapsed && <span>{label}</span>}
  </div>
);

export function StudentSidebar({ isCollapsed }) {
  const router = useRouter();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavClick = (path) => {
    router.navigate({ to: path });
  };

  return (
    <aside className={clsx("shrink-0 flex flex-col h-full bg-white dark:bg-[#4A1E47] border-r border-gray-200 dark:border-transparent transition-all duration-300 overflow-hidden relative shadow-sm dark:shadow-none", isCollapsed ? "w-[80px]" : "w-[280px]")}>
      
      {/* Brand */}
      <div className={clsx("pt-9 pb-7 flex flex-col justify-center border-b border-gray-100 dark:border-white/10", isCollapsed ? "px-4 items-center" : "px-8")}>
        <div className="flex items-center gap-3.5">
          {/* Light mode logo (purple) */}
          <img src={logoPurple} alt="Xebia" className="h-11 rounded-full dark:hidden object-contain drop-shadow-sm" />
          {/* Dark mode logo (white) */}
          <img src={logoWhite} alt="Xebia" className="h-11 rounded-full hidden dark:block object-contain drop-shadow-sm" />
          
          {!isCollapsed && (
            <div className="flex flex-col pt-0.5">
              <span className="text-[21px] font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">Xebia LMS</span>
              <span className="text-[10.5px] font-bold text-[#6C1D5F] dark:text-white/60 tracking-[0.2em] uppercase mt-0.5">Student Portal</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden hide-scrollbar">
        {!isCollapsed && <div className="px-8 pb-3 text-[11px] font-bold tracking-wider text-gray-400 dark:text-white/40 uppercase">Main Menu</div>}
        
        <NavItem 
          icon={LayoutDashboard}
          label="Dashboard" 
          isCollapsed={isCollapsed} 
          isActive={currentPath === '/student' || currentPath === '/student/'}
          onClick={() => handleNavClick('/student')}
        />
        <NavItem 
          icon={BookOpen}
          label="My Courses" 
          isCollapsed={isCollapsed}
          isActive={currentPath === '/student/courses' || currentPath.startsWith('/student/courses/')}
          onClick={() => handleNavClick('/student/courses')}
        />
        <NavItem 
          icon={ClipboardCheck}
          label="Assessments" 
          isCollapsed={isCollapsed}
          isActive={currentPath === '/student/assessments' || currentPath.startsWith('/student/assessments/')}
          onClick={() => handleNavClick('/student/assessments')}
        />
        <NavItem 
          icon={Award}
          label="Results" 
          isCollapsed={isCollapsed}
          isActive={currentPath === '/student/results' || currentPath.startsWith('/student/results/')}
          onClick={() => handleNavClick('/student/results')}
        />
        
        {!isCollapsed && <div className="px-8 pt-4 pb-3 mt-2 text-[11px] font-bold tracking-wider text-gray-400 dark:text-white/40 uppercase">Updates & Help</div>}

        <NavItem 
          icon={Bell}
          label="Notifications" 
          isCollapsed={isCollapsed}
          isActive={currentPath === '/student/notifications' || currentPath.startsWith('/student/notifications/')}
          onClick={() => handleNavClick('/student/notifications')}
        />
        <NavItem 
          icon={MessageSquare}
          label="Feedback" 
          isCollapsed={isCollapsed}
          isActive={currentPath === '/student/feedback' || currentPath.startsWith('/student/feedback/')}
          onClick={() => handleNavClick('/student/feedback')}
        />
      </nav>

      {/* User Footer */}
      <div className={clsx("p-4 border-t border-gray-100 dark:border-white/10", isCollapsed ? "flex flex-col items-center gap-3" : "flex items-center justify-between")}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C1D5F] to-purple-800 text-white flex flex-col items-center justify-center font-bold text-sm shrink-0 shadow-inner relative">
            <span className="leading-none">{studentProfile.initials}</span>
            <span className="text-[7px] font-black uppercase mt-0.5 opacity-80 leading-none tracking-wider">PRO</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#4A1E47] rounded-full" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{studentProfile.name}</p>
              <p className="text-[11px] font-bold text-gray-400 truncate">{studentProfile.role}</p>
            </div>
          )}
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('lms_token');
            router.navigate({ to: '/' });
          }}
          className={clsx("text-gray-400 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10")} 
          title="Log out"
        >
          <LogOut className="w-[18px] h-[18px]" />
        </button>
      </div>
      
    </aside>
  );
}
