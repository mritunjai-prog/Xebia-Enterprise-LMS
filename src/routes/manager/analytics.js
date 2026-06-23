import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/manager/shared/page-header";
import { AnalyticsGrid } from "@/components/manager/analytics/analytics-grid";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Route = createFileRoute("/manager/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Xebia Enterprise LMS" },
      { name: "description", content: "Course performance, enrollment trends, and learning analytics." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    _jsxs("div", {
      className: "space-y-6",
      children: [
        _jsx(PageHeader, {
          title: "Analytics",
          description: "Track enrollment trends, course performance, and learning outcomes.",
          children: _jsxs(Button, {
            variant: "outline",
            className: "border-[#EDEDED] shadow-sm",
            children: [
              _jsx(Download, { className: "mr-2 h-4 w-4" }),
              "Export Report",
            ],
          }),
        }),

        _jsx(AnalyticsGrid, {}),
      ],
    })
  );
}
