import { createFileRoute } from "@tanstack/react-router";
import Categories from '@/admin/pages/Categories/index';

export const Route = createFileRoute("/categories/")({
  component: Categories,
});
