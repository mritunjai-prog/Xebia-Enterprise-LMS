import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary mb-4">Student Profile</h1>
      <p className="text-muted-foreground max-w-md text-center">
        This is a placeholder profile page. Replace it with the actual profile UI when the backend and real data are ready.
      </p>
    </div>
  );
}
