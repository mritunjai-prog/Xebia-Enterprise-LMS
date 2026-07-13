import { createFileRoute } from "@tanstack/react-router";
import { UnifiedLayout } from "@/components/layout/unified-layout";

export const Route = createFileRoute("/trainer")({
  component: TrainerLayout,
});

function TrainerLayout() {
  return <UnifiedLayout portalType="trainer" />;
}
