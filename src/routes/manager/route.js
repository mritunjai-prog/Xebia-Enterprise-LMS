import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/manager/shared/dashboard-shell";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/manager")({
  head: () => ({
    meta: [
      { title: "Manager Dashboard — Xebia Enterprise LMS" },
      {
        name: "description",
        content:
          "Manage users, courses, approvals and analytics for the Xebia Enterprise Learning Management System.",
      },
    ],
  }),
  component: ManagerLayout,
});

function ManagerLayout() {
  return (
    _jsxs(DashboardShell, {
      children: [
        _jsx(Outlet, {}),
        _jsx(Toaster, { richColors: true, position: "bottom-right" }),
      ],
    })
  );
}
