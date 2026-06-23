import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconSearch, IconExpand, IconAdd, IconBell, IconProfile } from '../Icons';

export function Header() {
  const { activeTenant } = useAppStore();

  return (
    <header className="header">
      <div className="breadcrumb">
        <span>Platform</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-cur">Dashboard</span>
      </div>
      
      <div className="header-search">
        <IconSearch className="search-icon text-[#5A5A5A]" />
        <input type="text" placeholder="Search organizations, users, courses…" />
      </div>
      
      <div className="header-actions">
        <div className="tenant-switcher">
          <span className="tenant-dot"></span>
          {activeTenant}
          <IconExpand className="opacity-50" />
        </div>
        
        <button className="quick-create">
          <IconAdd />
          Quick Create
        </button>
        
        <div className="header-btn">
          <IconBell />
          <span className="notif-dot"></span>
        </div>
        
        <div className="header-btn">
          <IconProfile />
        </div>
      </div>
    </header>
  );
}
