/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import Users from './pages/Users';
import Approvals from './pages/Approvals';
import GenericPage from './pages/GenericPage';
import { useAppStore } from './store/useAppStore';
import { ToastContainer } from './components/ui/ToastContainer';

export default function App() {
  const { activeSidebarItem } = useAppStore();

  const renderContent = () => {
    switch (activeSidebarItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Organizations':
      case 'Universities':
      case 'Colleges':
      case 'Companies':
        return <Organizations />;
      case 'Users':
        return <Users />;
      case 'Roles & Permissions':
        return <GenericPage title="Roles & Permissions" subtitle="Manage dynamic access control and module visibility." />;
      case 'Courses':
      case 'Course List':
      case 'Content Builder':
        return <GenericPage title="Course Management" subtitle="Author and manage structured learning content." />;
      case 'Batch & Enrollment':
        return <GenericPage title="Batch & Enrollment" subtitle="Schedule and manage student cohorts." />;
      case 'Assessments':
        return <GenericPage title="Assessments" subtitle="Configure theoretical and practical evaluations." />;
      case 'Approvals':
        return <Approvals />;
      case 'Notifications':
        return <GenericPage title="Notification Center" subtitle="View delivery queues and dead letters." />;
      case 'Reports':
        return <GenericPage title="Reports & Analytics" subtitle="Export comprehensive compliance and activity reports." />;
      case 'Audit Logs':
        return <GenericPage title="Audit Logs" subtitle="Review detailed platform operational history." />;
      case 'Settings':
        return <GenericPage title="Platform Settings" subtitle="Configure system-wide behavior and integrations." />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <AppShell>
        {renderContent()}
      </AppShell>
      <ToastContainer />
    </>
  );
}
