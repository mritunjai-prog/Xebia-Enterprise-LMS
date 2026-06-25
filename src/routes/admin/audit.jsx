import { createFileRoute } from "@tanstack/react-router";
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/audit")({
  component: AuditRoute,
});

function AuditRoute() {
  return <GenericPage title="Audit Logs" />;
}
