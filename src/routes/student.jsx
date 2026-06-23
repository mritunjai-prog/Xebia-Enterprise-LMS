import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { StudentNavbar } from "@/components/layout/student-navbar";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

function StudentLayout() {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <StudentNavbar />
        <main className="flex-1 overflow-auto bg-background p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
