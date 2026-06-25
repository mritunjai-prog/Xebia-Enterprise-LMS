import { createFileRoute } from "@tanstack/react-router";
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/notifications")({
  component: NotificationsRoute,
});

function NotificationsRoute() {
  return <GenericPage title="Notifications" />;
}
