import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  IconDashboard, IconOrganizations, IconExpand, IconUsers, IconRoles,
  IconCourses, IconBatch, IconAssessments, IconApprovals, IconNotifications,
  IconReports, IconAuditLogs, IconSettings, IconMoreHorizontal
} from '../Icons';
import { useAppStore } from '../../store/useAppStore';



const NavItem = ({ icon, label, badge, badgeColor, hasChildren, isActive, isOpen, onClick }) => (
  <div onClick={onClick} className={clsx("nav-item", isActive && "active")}>
    {icon}
    {label}
    {badge && (
      <span className={clsx("nav-badge", badgeColor === 'green' && "green")}>
        {badge}
      </span>
    )}
    {hasChildren && <IconExpand className={clsx("nav-expand", isOpen && "rotate-180")} />}
  </div>
);

const NavChild = ({ label, isActive, onClick }) => (
  <div onClick={onClick} className={clsx("nav-child", isActive && "active")}>
    {label}
  </div>
);

export function Sidebar() {
  const { activeSidebarItem, setActiveSidebarItem } = useAppStore();
  const [openSections, setOpenSections] = useState({
    orgs: true,
    courses: true
  });

  const toggleSection = (key, e) => {
    if (e) e.stopPropagation();
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNavClick = (label, isParent = false, key) => {
    setActiveSidebarItem(label);
    if (isParent && key) {
      if (!openSections[key]) {
        toggleSection(key);
      }
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo">
          <div className="logo-mark"><span>X</span></div>
          <div>
            <div className="logo-text">Xebia</div>
            <div className="logo-sub">LMS Admin</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavItem 
          icon={<IconDashboard className="nav-icon" />} 
          label="Dashboard" 
          isActive={activeSidebarItem === 'Dashboard'} 
          onClick={() => handleNavClick('Dashboard')}
        />

        <div className="nav-section">Organizations</div>
        <NavItem 
          icon={<IconOrganizations className="nav-icon" />} 
          label="Organizations" 
          hasChildren 
          isOpen={openSections.orgs}
          isActive={['Organizations', 'Universities', 'Colleges', 'Companies'].includes(activeSidebarItem)}
          onClick={() => handleNavClick('Organizations', true, 'orgs')}
        />
        {openSections.orgs && (
          <div className="nav-children">
            <NavChild label="Universities" isActive={activeSidebarItem === 'Universities'} onClick={() => handleNavClick('Universities')} />
            <NavChild label="Colleges" isActive={activeSidebarItem === 'Colleges'} onClick={() => handleNavClick('Colleges')} />
            <NavChild label="Companies" isActive={activeSidebarItem === 'Companies'} onClick={() => handleNavClick('Companies')} />
          </div>
        )}

        <div className="nav-section">Users & Access</div>
        <NavItem 
          icon={<IconUsers className="nav-icon" />} 
          label="Users" 
          badge="2.4k" 
          badgeColor="green" 
          isActive={activeSidebarItem === 'Users'}
          onClick={() => handleNavClick('Users')}
        />
        <NavItem 
          icon={<IconRoles className="nav-icon" />} 
          label="Roles & Permissions" 
          isActive={activeSidebarItem === 'Roles & Permissions'}
          onClick={() => handleNavClick('Roles & Permissions')}
        />

        <div className="nav-section">Learning</div>
        <NavItem 
          icon={<IconCourses className="nav-icon" />} 
          label="Categories" 
          isActive={activeSidebarItem === 'Categories'}
          onClick={() => handleNavClick('Categories')}
        />
        <NavItem 
          icon={<IconCourses className="nav-icon" />} 
          label="Courses" 
          isActive={activeSidebarItem === 'Courses'}
          onClick={() => handleNavClick('Courses')}
        />
        <NavItem icon={<IconBatch className="nav-icon" />} label="Batch & Enrollment" isActive={activeSidebarItem === 'Batch & Enrollment'} onClick={() => handleNavClick('Batch & Enrollment')} />
        <NavItem icon={<IconAssessments className="nav-icon" />} label="Assessments" isActive={activeSidebarItem === 'Assessments'} onClick={() => handleNavClick('Assessments')} />

        <div className="nav-section">Operations</div>
        <NavItem icon={<IconApprovals className="nav-icon" />} label="Approvals" badge="14" isActive={activeSidebarItem === 'Approvals'} onClick={() => handleNavClick('Approvals')} />
        <NavItem icon={<IconNotifications className="nav-icon" />} label="Notifications" badge="3" isActive={activeSidebarItem === 'Notifications'} onClick={() => handleNavClick('Notifications')} />
        <NavItem icon={<IconReports className="nav-icon" />} label="Reports" isActive={activeSidebarItem === 'Reports'} onClick={() => handleNavClick('Reports')} />
        <NavItem icon={<IconAuditLogs className="nav-icon" />} label="Audit Logs" isActive={activeSidebarItem === 'Audit Logs'} onClick={() => handleNavClick('Audit Logs')} />
        <NavItem icon={<IconSettings className="nav-icon" />} label="Settings" isActive={activeSidebarItem === 'Settings'} onClick={() => handleNavClick('Settings')} />
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">SA</div>
          <div className="user-info">
            <div className="user-name">Super Admin</div>
            <div className="user-role">Platform Administrator</div>
          </div>
          <IconMoreHorizontal className="text-white/35" />
        </div>
      </div>
    </aside>
  );
}
