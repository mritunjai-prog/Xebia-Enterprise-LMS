import * as React from "react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/admin/components/layout/Sidebar";
import { Header } from "@/admin/components/layout/Header";
import "@/admin/index.css"; // Import the admin-specific CSS

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
