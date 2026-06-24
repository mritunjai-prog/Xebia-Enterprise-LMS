import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconSearch, IconExpand, IconAdd, IconBell, IconProfile } from '../Icons';

export function Header() {
  const { activeTenant, addToast, activeSidebarItem } = useAppStore();

  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('lms_theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('lms_theme', 'dark');
      setIsDark(true);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('lms_theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  return (
    <header className="header">
      <div className="breadcrumb">
        <span>Platform</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-cur">{activeSidebarItem}</span>
      </div>
      
      <div className="header-search">
        <IconSearch className="search-icon text-[#5A5A5A]" />
        <input type="text" placeholder="Search organizations, users, courses…" />
      </div>
      
      <div className="header-actions">
        <div className="tenant-switcher" onClick={() => addToast('Tenant switching available soon.', 'info')}>
          <span className="tenant-dot"></span>
          {activeTenant}
          <IconExpand className="opacity-50" />
        </div>
        
        <button className="quick-create" onClick={() => addToast('Opening quick creator workflow…', 'info')}>
          <IconAdd />
          Quick Create
        </button>
        
        <div className="header-btn" onClick={() => addToast('3 Unread notifications.', 'info')}>
          <IconBell />
          <span className="notif-dot"></span>
        </div>

        <button
          onClick={toggleDark}
          className="header-btn"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{ fontSize: '16px' }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        
        <div className="header-btn" onClick={() => addToast('Profile menu coming soon.', 'info')}>
          <IconProfile />
        </div>
      </div>
    </header>
  );
}
