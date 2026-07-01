import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StudentSidebar } from "@/components/layout/student-sidebar";
import { StudentNavbar } from "@/components/layout/student-navbar";
import { useState } from "react";
import { useAppStore } from "@/admin/store/useAppStore";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

function StudentLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isSidebarCollapsed } = useAppStore();

  return (
    <div className="shell">
      {/* Mobile backdrop overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <StudentSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Main content */}
      <div className="main" style={{ zoom: 0.8 }}>
        <StudentNavbar
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
