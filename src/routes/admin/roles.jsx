import { createFileRoute } from "@tanstack/react-router";
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/roles")({
  component: RolesRoute,
});

function RolesRoute() {
  return <GenericPage title="Roles & Permissions" />;
}
