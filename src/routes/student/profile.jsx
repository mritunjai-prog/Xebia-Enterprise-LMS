import { createFileRoute } from "@tanstack/react-router";

// Feature profile components
import { ProfileHeader } from "@/features/student/components/profile/ProfileHeader";
import { ProfileDetails, EnrolledCoursesList } from "@/features/student/components/profile/ProfileDetails";

export const Route = createFileRoute("/student/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1">View and manage your personal information.</p>
      </div>

      {/* Hero Card */}
      <ProfileHeader />

      {/* Personal Information Grid */}
      <ProfileDetails />

      {/* Enrolled Courses Summary */}
      <EnrolledCoursesList />
    </div>
  );
}
