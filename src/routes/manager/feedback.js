import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/manager/shared/page-header";
import { FeedbackPanel } from "@/components/manager/feedback/feedback-panel";

export const Route = createFileRoute("/manager/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — Xebia Enterprise LMS" },
      { name: "description", content: "View and analyze student feedback across courses." },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  return (
    _jsxs("div", {
      className: "space-y-6",
      children: [
        _jsx(PageHeader, {
          title: "Feedback",
          description: "Student reviews, ratings, and sentiment analysis.",
        }),

        _jsx(FeedbackPanel, {}),
      ],
    })
  );
}
