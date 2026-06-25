import { createFileRoute } from "@tanstack/react-router";
import GenericPage from '@/admin/pages/GenericPage';

export const Route = createFileRoute("/admin/assessments")({
  component: AssessmentsRoute,
});

function AssessmentsRoute() {
  return <GenericPage title="Assessments" />;
}
