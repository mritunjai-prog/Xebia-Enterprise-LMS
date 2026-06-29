import { createFileRoute } from "@tanstack/react-router";
import Detail from "@/admin/pages/Courses/Detail";

export const Route = createFileRoute("/admin/courses/$courseSlug")({
  component: Detail,
});
