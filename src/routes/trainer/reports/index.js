import { createFileRoute } from "@tanstack/react-router";
import { Download, BarChart2, TrendingUp, Users } from "lucide-react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/reports/")({
  component: ReportsView,
});
function ReportsView() {
  return /*#__PURE__*/ _jsxDEV(
    "div",
    {
      className:
        "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
      children: [
        /*#__PURE__*/ _jsxDEV(
          "div",
          {
            className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
            children: [
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      "h1",
                      {
                        className: "text-3xl font-bold font-display tracking-tight text-foreground",
                        children: "Analytics & Reports",
                      },
                      void 0,
                      false,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "p",
                      {
                        className: "text-muted-foreground mt-1 text-sm",
                        children: "Monitor batch performance and export reports.",
                      },
                      void 0,
                      false,
                    ),
                  ],
                },
                void 0,
                true,
              ),
              /*#__PURE__*/ _jsxDEV(
                "button",
                {
                  className:
                    "border hover:bg-secondary flex items-center justify-center gap-2 h-10 px-4 rounded-full text-sm font-medium shrink-0 transition-colors",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      Download,
                      {
                        className: "w-4 h-4",
                      },
                      void 0,
                      false,
                    ),
                    " Generate Full Report",
                  ],
                },
                void 0,
                true,
              ),
            ],
          },
          void 0,
          true,
        ),
        /*#__PURE__*/ _jsxDEV(
          "div",
          {
            className: "grid grid-cols-1 md:grid-cols-3 gap-6",
            children: [
              {
                label: "Avg. Assessment Score",
                value: "82%",
                note: "+4% vs last cohort",
                icon: TrendingUp,
                color: "text-primary",
              },
              {
                label: "Attendance Rate",
                value: "94%",
                note: "Across all active batches",
                icon: Users,
                color: "text-accent",
              },
              {
                label: "Course Completion",
                value: "68%",
                note: "Students finishing tracks",
                icon: BarChart2,
                color: "text-blue-500",
              },
            ].map((stat) =>
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  className: "glass rounded-xl p-6 border border-border/50",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className: "flex items-center gap-3 mb-4",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            stat.icon,
                            {
                              className: `w-5 h-5 ${stat.color}`,
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            "h3",
                            {
                              className: "font-semibold text-sm text-foreground",
                              children: stat.label,
                            },
                            void 0,
                            false,
                          ),
                        ],
                      },
                      void 0,
                      true,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className: "text-4xl font-bold font-display",
                        children: stat.value,
                      },
                      void 0,
                      false,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "p",
                      {
                        className: "text-xs text-muted-foreground mt-2",
                        children: stat.note,
                      },
                      void 0,
                      false,
                    ),
                  ],
                },
                stat.label,
                true,
              ),
            ),
          },
          void 0,
          false,
        ),
        /*#__PURE__*/ _jsxDEV(
          "div",
          {
            className: "glass rounded-2xl p-6 border border-border/50",
            children: [
              /*#__PURE__*/ _jsxDEV(
                "h2",
                {
                  className: "font-semibold text-lg mb-6 text-foreground",
                  children: "Available Exports",
                },
                void 0,
                false,
              ),
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                  children: [
                    "Student Performance Matrix (.pdf)",
                    "Batch Attendance Log (.xlsx)",
                    "Course Engagement Report (.pdf)",
                    "Assessment Marks Sheet (.xlsx)",
                  ].map((report) =>
                    /*#__PURE__*/ _jsxDEV(
                      "button",
                      {
                        className:
                          "flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-secondary/50 hover:border-primary/50 transition-colors text-left group",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "span",
                            {
                              className:
                                "text-sm font-medium text-foreground group-hover:text-primary transition-colors",
                              children: report,
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            Download,
                            {
                              className:
                                "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors",
                            },
                            void 0,
                            false,
                          ),
                        ],
                      },
                      report,
                      true,
                    ),
                  ),
                },
                void 0,
                false,
              ),
            ],
          },
          void 0,
          true,
        ),
      ],
    },
    void 0,
    true,
  );
}
