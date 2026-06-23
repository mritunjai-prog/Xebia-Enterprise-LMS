import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/manager/shared/page-header";
import { ApprovalList } from "@/components/manager/approvals/approval-list";

export const Route = createFileRoute("/manager/approvals")({
  head: () => ({
    meta: [
      { title: "Approval Workflow — Xebia Enterprise LMS" },
      { name: "description", content: "Review and manage pending approval requests." },
    ],
  }),
  component: ApprovalsPage,
});

function ApprovalsPage() {
  return (
    _jsxs("div", {
      className: "space-y-6",
      children: [
        _jsx(PageHeader, {
          title: "Approvals",
          description: "Review course creation, user registrations, and content updates.",
        }),

        _jsx(ApprovalList, {}),
      ],
    })
  );
}
