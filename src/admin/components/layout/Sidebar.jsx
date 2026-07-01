import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { useRouter, useLocation } from '@tanstack/react-router';
import { BookOpen, Tag, Layers, LogOut, LayoutDashboard, PieChart } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import logoPurple from '../../../assets/logo-purple.png';
import logoWhite from '../../../assets/logo-white.png';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <div 
    onClick={onClick} 
    className={clsx("nav-item", isActive && "active")}
  >
    <Icon className="nav-icon" />
    <span>{label}</span>
  </div>
);

export function Sidebar() {
  const router = useRouter();
  const location = useLocation();
  const currentPath = location.pathname;
  const { setActiveSidebarItem, adminProfile, isSidebarCollapsed } = useAppStore();

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
    <aside className={clsx("sidebar sidebar-admin bg-white dark:bg-[#15151f]", isSidebarCollapsed && "collapsed")}>
      
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="logo cursor-pointer" onClick={() => handleNavClick('/')}>
          <div className="logo-mark">
            <span>X</span>
          </div>
          <div>
            <div className="logo-text">Xebia LMS</div>
            <div className="logo-sub">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        <div className="nav-section">Main Menu</div>
        
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
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div 
          onClick={() => {
            localStorage.removeItem('lms_token');
            window.close();
          }}
          className="sidebar-user"
        >
          <div className="user-avatar overflow-hidden">
            {adminProfile?.image ? (
               <img src={adminProfile.image} alt={adminProfile.name} className="w-full h-full object-cover" />
            ) : (
               <span>{adminProfile?.name?.charAt(0) || 'A'}</span>
            )}
          </div>
          <div className="user-info">
            <div className="user-name">{adminProfile?.name || 'Admin User'}</div>
            <div className="user-role">{adminProfile?.email || 'admin@xebia.com'}</div>
          </div>
        </div>
      </div>
      
    </aside>
  );
}
