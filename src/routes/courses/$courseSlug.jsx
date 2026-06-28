import { createFileRoute } from "@tanstack/react-router";
import CourseDetail from "@/admin/pages/Courses/CourseDetail";

export const Route = createFileRoute("/courses/$courseSlug")({
  component: CourseDetail,
});
