import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UnifiedLayout } from "@/components/layout/unified-layout";
import { useLMS } from "@/context/LMSContext";
import { useEffect } from "react";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

function StudentLayout() {
  const { currentUser, isInitializing } = useLMS();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we are SURE there is no user (not during initial load)
    if (!isInitializing && (!currentUser || currentUser.role !== "student")) {
      navigate({ to: "/", replace: true });
    }
  }, [isInitializing, currentUser, navigate]);

  if (isInitializing) {
    return null; // Wait for session to restore from localStorage/backend
  }

  if (!currentUser || currentUser.role !== "student") {
    return null;
  }

  return <UnifiedLayout portalType="student" />;
}
