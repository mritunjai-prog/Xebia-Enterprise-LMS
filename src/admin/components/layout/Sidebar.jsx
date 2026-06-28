import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { useRouter, useLocation } from '@tanstack/react-router';
import { BookOpen, Tag, Layers, LogOut, LayoutDashboard, PieChart } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

// We import both logos to switch based on theme
import logoPurple from '../../../assets/logo-purple.png';
import logoWhite from '../../../assets/logo-white.png';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <div 
    onClick={onClick} 
    className={clsx(
      "flex items-center gap-3 px-4 py-3 mx-4 my-1 rounded-xl cursor-pointer font-medium transition-all duration-200 group text-[14px]",
      isActive 
        ? "bg-[#6C1D5F] text-white shadow-md shadow-[#6C1D5F]/20" 
        : "text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
    )}
  >
    <Icon className={clsx(
      "w-[20px] h-[20px] shrink-0 transition-transform duration-200 group-hover:scale-110",
      isActive ? "text-white opacity-100" : "opacity-80 group-hover:opacity-100"
    )} />
    {label}
  </div>
);

export function Sidebar() {
  const router = useRouter();
  const location = useLocation();
  const currentPath = location.pathname;
  const { setActiveSidebarItem, theme, adminProfile } = useAppStore(); // Assuming theme is available, or we use CSS

  // Note: we can use a CSS technique to show/hide logos based on dark class on HTML
  // but since we want to rely on the global dark class:
  
  useEffect(() => {
    if (currentPath === '/') {
      setActiveSidebarItem('Dashboard');
    } else if (currentPath.startsWith('/courses')) {
      setActiveSidebarItem('Courses');
    } else if (currentPath.startsWith('/categories')) {
      setActiveSidebarItem('Categories');
    } else if (currentPath.startsWith('/curriculum')) {
      setActiveSidebarItem('Curriculum');
    } else if (currentPath.startsWith('/analytics')) {
      setActiveSidebarItem('Analytics');
    }
  }, [currentPath, setActiveSidebarItem]);

  const handleNavClick = (path) => {
    router.navigate({ to: path });
  };

  return (
    <aside className="w-[280px] shrink-0 flex flex-col h-full bg-white dark:bg-[#4A1E47] border-r border-gray-200 dark:border-transparent transition-colors overflow-hidden relative shadow-sm dark:shadow-none">
      
      {/* Brand */}
      <div className="pt-9 pb-7 px-8 flex flex-col justify-center border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-3.5">
          {/* Light mode logo (purple) */}
          <img src={logoPurple} alt="Xebia" className="h-11 rounded-full dark:hidden object-contain drop-shadow-sm" />
          {/* Dark mode logo (white) */}
          <img src={logoWhite} alt="Xebia" className="h-11 rounded-full hidden dark:block object-contain drop-shadow-sm" />
          
          <div className="flex flex-col pt-0.5">
            <span className="text-[21px] font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">Xebia LMS</span>
            <span className="text-[10.5px] font-bold text-[#6C1D5F] dark:text-white/60 tracking-[0.2em] uppercase mt-0.5">Admin Panel</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden hide-scrollbar">
        <div className="px-8 pb-3 text-[11px] font-bold tracking-wider text-gray-400 dark:text-white/40 uppercase">Main Menu</div>
        
        <NavItem 
          icon={LayoutDashboard}
          label="Dashboard" 
          isActive={currentPath === '/'}
          onClick={() => handleNavClick('/')}
        />
        <NavItem 
          icon={Tag} 
          label="Categories" 
          isActive={currentPath === '/categories' || currentPath === '/categories/' || currentPath.startsWith('/categories/')}
          onClick={() => handleNavClick('/categories/')}
        />
        <NavItem 
          icon={BookOpen}
          label="Courses" 
          isActive={currentPath === '/courses' || currentPath === '/courses/' || currentPath.startsWith('/courses/')}
          onClick={() => handleNavClick('/courses/')}
        />
        <NavItem 
          icon={Layers} 
          label="Curriculum" 
          isActive={currentPath === '/curriculum'}
          onClick={() => handleNavClick('/curriculum')}
        />
        <NavItem 
          icon={PieChart} 
          label="Analytics" 
          isActive={currentPath === '/analytics' || currentPath.startsWith('/analytics/')}
          onClick={() => handleNavClick('/analytics/')}
        />
      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-gray-100 dark:border-white/10 mt-auto">
        <div 
          onClick={() => {
            localStorage.removeItem('lms_token');
            window.close();
          }}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 cursor-pointer transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-[#6C1D5F] dark:bg-[#84117C] text-white flex items-center justify-center font-bold text-sm shadow-sm relative overflow-hidden">
            {adminProfile?.image ? (
               <img src={adminProfile.image} alt={adminProfile.name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
               <span>{adminProfile?.name?.charAt(0) || 'A'}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{adminProfile?.name || 'Admin User'}</div>
            <div className="text-xs text-gray-500 dark:text-white/50 truncate">{adminProfile?.email || 'admin@xebia.com'}</div>
          </div>
          <LogOut className="w-5 h-5 text-gray-400 dark:text-white/50 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
        </div>
      </div>
      
    </aside>
  );
}
