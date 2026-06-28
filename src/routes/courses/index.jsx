import { createFileRoute } from "@tanstack/react-router";
import Courses from '@/admin/pages/Courses/index';

export const Route = createFileRoute("/courses/")({
  component: Courses,
});
