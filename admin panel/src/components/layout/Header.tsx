import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconSearch, IconExpand, IconAdd, IconBell, IconProfile } from '../Icons';

export function Header() {
  const { activeTenant, addToast, activeSidebarItem } = useAppStore();

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
        
        <div className="header-btn" onClick={() => addToast('Profile menu coming soon.', 'info')}>
          <IconProfile />
        </div>
      </div>
    </header>
  );
}
