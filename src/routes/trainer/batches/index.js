import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Calendar as CalendarIcon, Users } from "lucide-react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/batches/")({
  component: BatchesView,
});
const mockBatches = [
  {
    id: "b1",
    name: "Spring Boot Jan 2026",
    course: "Microservices with Spring Boot",
    students: 45,
    nextSession: "Tomorrow, 10:00 AM",
    status: "Active",
  },
  {
    id: "b2",
    name: "React Advanced Cohort",
    course: "Advanced React & Next.js",
    students: 32,
    nextSession: "Friday, 2:00 PM",
    status: "Active",
  },
];
function BatchesView() {
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
                        children: "Batches & Scheduling",
                      },
                      void 0,
                      false,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "p",
                      {
                        className: "text-muted-foreground mt-1 text-sm",
                        children: "Manage student cohorts and session schedules.",
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
                    "btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-full text-sm font-semibold shrink-0",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      Plus,
                      {
                        className: "w-4 h-4",
                      },
                      void 0,
                      false,
                    ),
                    " Create Batch",
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
            className: "glass rounded-2xl p-4 sm:p-6 space-y-6",
            children: [
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  className: "relative w-full sm:max-w-md",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      Search,
                      {
                        className:
                          "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                      },
                      void 0,
                      false,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "input",
                      {
                        type: "text",
                        placeholder: "Search batches...",
                        className:
                          "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-full text-sm outline-none focus:border-primary",
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
                  className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                  children: mockBatches.map((batch) =>
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className:
                          "bg-card border border-border/50 rounded-xl p-5 hover:border-primary/50 transition-colors",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "div",
                            {
                              className: "flex items-start justify-between mb-4",
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  "div",
                                  {
                                    children: [
                                      /*#__PURE__*/ _jsxDEV(
                                        "h3",
                                        {
                                          className: "font-bold text-lg text-foreground",
                                          children: batch.name,
                                        },
                                        void 0,
                                        false,
                                      ),
                                      /*#__PURE__*/ _jsxDEV(
                                        "p",
                                        {
                                          className:
                                            "text-sm text-muted-foreground mt-1 line-clamp-1",
                                          children: batch.course,
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
                                  "span",
                                  {
                                    className:
                                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary/20 text-primary",
                                    children: batch.status,
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
                              className: "flex items-center gap-6 mt-4",
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  "div",
                                  {
                                    className:
                                      "flex items-center gap-2 text-sm text-muted-foreground",
                                    children: [
                                      /*#__PURE__*/ _jsxDEV(
                                        Users,
                                        {
                                          className: "w-4 h-4",
                                        },
                                        void 0,
                                        false,
                                      ),
                                      /*#__PURE__*/ _jsxDEV(
                                        "span",
                                        {
                                          className: "font-medium text-foreground",
                                          children: batch.students,
                                        },
                                        void 0,
                                        false,
                                      ),
                                      " students",
                                    ],
                                  },
                                  void 0,
                                  true,
                                ),
                                /*#__PURE__*/ _jsxDEV(
                                  "div",
                                  {
                                    className:
                                      "flex items-center gap-2 text-sm text-muted-foreground",
                                    children: [
                                      /*#__PURE__*/ _jsxDEV(
                                        CalendarIcon,
                                        {
                                          className: "w-4 h-4",
                                        },
                                        void 0,
                                        false,
                                      ),
                                      "Next: ",
                                      batch.nextSession,
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
                              className: "flex gap-2 mt-5",
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  "button",
                                  {
                                    className:
                                      "flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium py-2 rounded-lg transition-colors",
                                    children: "View Schedule",
                                  },
                                  void 0,
                                  false,
                                ),
                                /*#__PURE__*/ _jsxDEV(
                                  "button",
                                  {
                                    className:
                                      "flex-1 border hover:bg-secondary text-foreground text-sm font-medium py-2 rounded-lg transition-colors",
                                    children: "Manage Students",
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
                      batch.id,
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
