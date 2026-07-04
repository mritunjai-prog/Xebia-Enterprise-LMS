import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { UnifiedSidebar } from "./unified-sidebar";
import { StudentNavbar } from "./student-navbar";
import { Header as AdminHeader } from "@/admin/components/layout/Header";
import { useAppStore } from "@/admin/store/useAppStore";

export function UnifiedLayout({ portalType = "student" }) {
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
      <UnifiedSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        portalType={portalType}
      />

      {/* Main content */}
      <div className="main">
        {portalType === "student" ? (
          <StudentNavbar
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
        ) : (
          <AdminHeader />
        )}
        <div className="content">
          {portalType === "student" ? (
            <div className="md:p-8">
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
