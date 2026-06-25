import { createFileRoute } from "@tanstack/react-router";
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/settings")({
  component: SettingsRoute,
});

function SettingsRoute() {
  return <GenericPage title="Settings" />;
}
