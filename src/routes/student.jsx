import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StudentSidebar } from "@/components/layout/sidebar";
import { StudentNavbar } from "@/components/layout/navbar";
import { useState } from "react";


export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="shell">
      <StudentSidebar isCollapsed={!isSidebarOpen} />
      <div className="main">
        <StudentNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
