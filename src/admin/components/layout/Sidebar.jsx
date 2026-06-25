import React, { useState } from 'react';
import { clsx } from 'clsx';
import { useRouter, useLocation } from '@tanstack/react-router';
import {
  IconDashboard, IconOrganizations, IconExpand, IconUsers, IconRoles,
  IconCourses, IconBatch, IconAssessments, IconApprovals, IconNotifications,
  IconReports, IconAuditLogs, IconSettings, IconMoreHorizontal
} from '../Icons';

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
  const router = useRouter();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openSections, setOpenSections] = useState({
    orgs: true,
    courses: true
  });

  const toggleSection = (key, e) => {
    if (e) e.stopPropagation();
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNavClick = (path, isParent = false, key) => {
    router.navigate({ to: path });
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
          isActive={currentPath === '/admin' || currentPath === '/admin/'} 
          onClick={() => handleNavClick('/admin')}
        />

        <div className="nav-section">Organizations</div>
        <NavItem 
          icon={<IconOrganizations className="nav-icon" />} 
          label="Organizations" 
          hasChildren 
          isOpen={openSections.orgs}
          isActive={currentPath.startsWith('/admin/organizations')}
          onClick={() => handleNavClick('/admin/organizations', true, 'orgs')}
        />
        {openSections.orgs && (
          <div className="nav-children">
            <NavChild label="Universities" isActive={currentPath === '/admin/organizations/universities'} onClick={() => handleNavClick('/admin/organizations/universities')} />
            <NavChild label="Colleges" isActive={currentPath === '/admin/organizations/colleges'} onClick={() => handleNavClick('/admin/organizations/colleges')} />
            <NavChild label="Companies" isActive={currentPath === '/admin/organizations/companies'} onClick={() => handleNavClick('/admin/organizations/companies')} />
          </div>
        )}

        <div className="nav-section">Users & Access</div>
        <NavItem 
          icon={<IconUsers className="nav-icon" />} 
          label="Users" 
          badge="2.4k" 
          badgeColor="green" 
          isActive={currentPath === '/admin/users'}
          onClick={() => handleNavClick('/admin/users')}
        />
        <NavItem 
          icon={<IconRoles className="nav-icon" />} 
          label="Roles & Permissions" 
          isActive={currentPath === '/admin/roles'}
          onClick={() => handleNavClick('/admin/roles')}
        />

        <div className="nav-section">Learning</div>
        <NavItem 
          icon={<IconCourses className="nav-icon" />} 
          label="Categories" 
          isActive={currentPath === '/admin/categories'}
          onClick={() => handleNavClick('/admin/categories')}
        />
        <NavItem 
          icon={<IconCourses className="nav-icon" />} 
          label="Courses" 
          isActive={currentPath === '/admin/courses' || currentPath.startsWith('/admin/courses/')}
          onClick={() => handleNavClick('/admin/courses')}
        />
        <NavItem icon={<IconBatch className="nav-icon" />} label="Batch & Enrollment" isActive={currentPath === '/admin/batch'} onClick={() => handleNavClick('/admin/batch')} />
        <NavItem icon={<IconAssessments className="nav-icon" />} label="Assessments" isActive={currentPath === '/admin/assessments'} onClick={() => handleNavClick('/admin/assessments')} />

        <div className="nav-section">Operations</div>
        <NavItem icon={<IconApprovals className="nav-icon" />} label="Approvals" badge="14" isActive={currentPath === '/admin/approvals'} onClick={() => handleNavClick('/admin/approvals')} />
        <NavItem icon={<IconNotifications className="nav-icon" />} label="Notifications" badge="3" isActive={currentPath === '/admin/notifications'} onClick={() => handleNavClick('/admin/notifications')} />
        <NavItem icon={<IconReports className="nav-icon" />} label="Reports" isActive={currentPath === '/admin/reports'} onClick={() => handleNavClick('/admin/reports')} />
        <NavItem icon={<IconAuditLogs className="nav-icon" />} label="Audit Logs" isActive={currentPath === '/admin/audit'} onClick={() => handleNavClick('/admin/audit')} />
        <NavItem icon={<IconSettings className="nav-icon" />} label="Settings" isActive={currentPath === '/admin/settings'} onClick={() => handleNavClick('/admin/settings')} />
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
