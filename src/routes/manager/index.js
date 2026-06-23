import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/manager/shared/page-header";
import { StatsGrid } from "@/components/manager/dashboard/stats-grid";
import { RecentActivity } from "@/components/manager/dashboard/recent-activity";
import { QuickActions } from "@/components/manager/dashboard/quick-actions";
import { EnrollmentChart } from "@/components/manager/analytics/enrollment-chart";

export const Route = createFileRoute("/manager/")({
  head: () => ({
    meta: [
      { title: "Dashboard Overview — Xebia Enterprise LMS" },
      { name: "description", content: "Manager dashboard with key metrics, trends, and recent activity." },
    ],
  }),
  component: ManagerDashboard,
});

function ManagerDashboard() {
  return (
    _jsxs("div", {
      className: "space-y-6",
      children: [
        _jsx(PageHeader, {
          title: "Dashboard",
          description: "Welcome back, Rajesh. Here's what's happening today.",
        }),

        _jsx(StatsGrid, {}),

        _jsx(EnrollmentChart, { compact: true }),

        _jsxs("div", {
          className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
          children: [
            _jsx(RecentActivity, {}),
            _jsx(QuickActions, {}),
          ],
        }),
      ],
    })
  );
}
