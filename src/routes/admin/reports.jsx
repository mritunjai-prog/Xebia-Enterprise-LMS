import { createFileRoute } from "@tanstack/react-router";
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/reports")({
  component: ReportsRoute,
});

function ReportsRoute() {
  return <GenericPage title="Reports" />;
}
