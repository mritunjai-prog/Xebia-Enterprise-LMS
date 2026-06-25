import { createFileRoute } from "@tanstack/react-router";
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/approvals")({
  component: ApprovalsRoute,
});

function ApprovalsRoute() {
  return <GenericPage title="Approvals" />;
}
