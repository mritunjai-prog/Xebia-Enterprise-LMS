import { createFileRoute } from "@tanstack/react-router";
import Organizations from '@/admin/pages/Organizations/index';

export const Route = createFileRoute("/admin/organizations")({
  component: Organizations,
});
