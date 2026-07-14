import { createFileRoute } from "@tanstack/react-router";
import { UnifiedLayout } from "@/components/layout/unified-layout";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return <UnifiedLayout portalType="admin" />;
}
