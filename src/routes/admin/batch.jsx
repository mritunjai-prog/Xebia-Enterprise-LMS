import { createFileRoute } from "@tanstack/react-router";
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/batch")({
  component: BatchRoute,
});

function BatchRoute() {
  return <GenericPage title="Batch & Enrollment" />;
}
