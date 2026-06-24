import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from '@/admin/store/useAppStore';

import Dashboard from '@/admin/pages/Dashboard/index';
import Organizations from '@/admin/pages/Organizations/index';
import Users from '@/admin/pages/Users/index';
import Courses from '@/admin/pages/Courses/index';
import Categories from '@/admin/pages/Categories/index';
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/")({
  component: AdminViewContainer,
});

function AdminViewContainer() {
  const { activeSidebarItem } = useAppStore();

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
    case 'Categories':
      return <Categories />;
    case 'Courses':
    case 'Course List':
      return <Courses />;
    default:
      return <GenericPage title={activeSidebarItem} />;
  }
}
