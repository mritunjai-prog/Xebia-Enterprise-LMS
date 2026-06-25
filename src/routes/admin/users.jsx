import { createFileRoute } from "@tanstack/react-router";
import Users from '@/admin/pages/Users/index';

export const Route = createFileRoute("/admin/users")({
  component: Users,
});
