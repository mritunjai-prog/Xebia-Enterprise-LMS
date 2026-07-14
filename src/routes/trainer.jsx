import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UnifiedLayout } from "@/components/layout/unified-layout";
import { useLMS } from "@/context/LMSContext";
import { useEffect } from "react";

export const Route = createFileRoute("/trainer")({
  component: TrainerLayout,
});

function TrainerLayout() {
  const { currentUser, isInitializing } = useLMS();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitializing && (!currentUser || currentUser.role !== "teacher")) {
      navigate({ to: "/", replace: true });
    }
  }, [isInitializing, currentUser, navigate]);

  if (isInitializing) {
    return null;
  }

  if (!currentUser || currentUser.role !== "teacher") {
    return null;
  }

  return <UnifiedLayout portalType="trainer" />;
}
