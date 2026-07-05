import { createFileRoute } from "@tanstack/react-router";
import { UnifiedLayout } from "@/components/layout/unified-layout";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

function StudentLayout() {
  return <UnifiedLayout portalType="student" />;
}
