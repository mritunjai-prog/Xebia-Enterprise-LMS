import React, { useState } from 'react';
import { clsx } from 'clsx';
import {
  IconDashboard, IconOrganizations, IconExpand, IconUsers, IconRoles,
  IconCourses, IconBatch, IconAssessments, IconApprovals, IconNotifications,
  IconReports, IconAuditLogs, IconSettings, IconMoreHorizontal
} from '../Icons';
import { useAppStore } from '../../store/useAppStore';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  badgeColor?: 'orange' | 'green';
  hasChildren?: boolean;
  isActive?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, badge, badgeColor, hasChildren, isActive, isOpen, onClick }) => (
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

const NavChild: React.FC<{ label: string; isActive?: boolean }> = ({ label, isActive }) => (
  <div className={clsx("nav-child", isActive && "active")}>
    {label}
  </div>
);

export function Sidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    orgs: true,
    courses: true
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
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
        <NavItem icon={<IconDashboard className="nav-icon" />} label="Dashboard" isActive />

        <div className="nav-section">Organizations</div>
        <NavItem 
          icon={<IconOrganizations className="nav-icon" />} 
          label="Organizations" 
          hasChildren 
          isOpen={openSections.orgs}
          onClick={() => toggleSection('orgs')}
        />
        {openSections.orgs && (
          <div className="nav-children">
            <NavChild label="Universities" isActive />
            <NavChild label="Colleges" />
            <NavChild label="Companies" />
          </div>
        )}

        <div className="nav-section">Users & Access</div>
        <NavItem 
          icon={<IconUsers className="nav-icon" />} 
          label="Users" 
          badge="2.4k" 
          badgeColor="green" 
        />
        <NavItem 
          icon={<IconRoles className="nav-icon" />} 
          label="Roles & Permissions" 
        />

        <div className="nav-section">Learning</div>
        <NavItem 
          icon={<IconCourses className="nav-icon" />} 
          label="Courses" 
          hasChildren
          isOpen={openSections.courses}
          onClick={() => toggleSection('courses')}
        />
        {openSections.courses && (
          <div className="nav-children">
            <NavChild label="Course List" />
            <NavChild label="Content Builder" />
          </div>
        )}
        <NavItem icon={<IconBatch className="nav-icon" />} label="Batch & Enrollment" />
        <NavItem icon={<IconAssessments className="nav-icon" />} label="Assessments" />

        <div className="nav-section">Operations</div>
        <NavItem icon={<IconApprovals className="nav-icon" />} label="Approvals" badge="14" />
        <NavItem icon={<IconNotifications className="nav-icon" />} label="Notifications" badge="3" />
        <NavItem icon={<IconReports className="nav-icon" />} label="Reports" />
        <NavItem icon={<IconAuditLogs className="nav-icon" />} label="Audit Logs" />
        <NavItem icon={<IconSettings className="nav-icon" />} label="Settings" />
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
