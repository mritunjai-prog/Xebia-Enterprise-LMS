import { createFileRoute } from "@tanstack/react-router";
import CategoryDetail from '@/admin/pages/Categories/Detail';

export const Route = createFileRoute("/admin/categories/$categoryId")({
  component: CategoryDetail,
});
