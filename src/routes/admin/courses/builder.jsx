import { createFileRoute } from "@tanstack/react-router";
import HierarchyBuilder from "@/admin/pages/Courses/HierarchyBuilder";

export const Route = createFileRoute("/admin/courses/builder")({
  component: HierarchyBuilder,
});
