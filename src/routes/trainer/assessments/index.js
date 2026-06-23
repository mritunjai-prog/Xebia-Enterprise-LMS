import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, CheckCircle, Clock } from "lucide-react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/assessments/")({
  component: AssessmentsView,
});
const mockAssessments = [
  {
    id: "a1",
    title: "Microservices Midterm",
    course: "Microservices with Spring Boot",
    type: "Theoretical",
    submissions: 45,
    pending: 12,
    dueDate: "2026-06-25",
  },
  {
    id: "a2",
    title: "React State Management Project",
    course: "Advanced React & Next.js",
    type: "Practical",
    submissions: 30,
    pending: 0,
    dueDate: "2026-06-20",
  },
];
function AssessmentsView() {
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
                        children: "Assessments",
                      },
                      void 0,
                      false,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "p",
                      {
                        className: "text-muted-foreground mt-1 text-sm",
                        children: "Create tests, assignments, and grade submissions.",
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
                    " Create Assessment",
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
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  className: "md:col-span-2 glass rounded-2xl p-4 sm:p-6 space-y-4",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className: "relative w-full",
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
                              placeholder: "Search assessments...",
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
                    mockAssessments.map((a) =>
                      /*#__PURE__*/ _jsxDEV(
                        "div",
                        {
                          className:
                            "flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-colors",
                          children: [
                            /*#__PURE__*/ _jsxDEV(
                              "div",
                              {
                                className: "flex-1 min-w-0",
                                children: [
                                  /*#__PURE__*/ _jsxDEV(
                                    "div",
                                    {
                                      className: "flex items-center gap-2 mb-1",
                                      children: [
                                        /*#__PURE__*/ _jsxDEV(
                                          "span",
                                          {
                                            className:
                                              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-secondary text-muted-foreground",
                                            children: a.type,
                                          },
                                          void 0,
                                          false,
                                        ),
                                        a.pending > 0 &&
                                          /*#__PURE__*/ _jsxDEV(
                                            "span",
                                            {
                                              className:
                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-red-500/20 text-red-500 flex items-center gap-1",
                                              children: [
                                                /*#__PURE__*/ _jsxDEV(
                                                  Clock,
                                                  {
                                                    className: "w-3 h-3",
                                                  },
                                                  void 0,
                                                  false,
                                                ),
                                                " ",
                                                a.pending,
                                                " to grade",
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
                                    "h3",
                                    {
                                      className: "font-bold text-base text-foreground truncate",
                                      children: a.title,
                                    },
                                    void 0,
                                    false,
                                  ),
                                  /*#__PURE__*/ _jsxDEV(
                                    "p",
                                    {
                                      className: "text-xs text-muted-foreground",
                                      children: a.course,
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
                                className:
                                  "flex flex-row sm:flex-col justify-between sm:justify-center sm:items-end gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-border/50 pt-3 sm:pt-0 sm:pl-4",
                                children: [
                                  /*#__PURE__*/ _jsxDEV(
                                    "div",
                                    {
                                      className: "text-xs text-muted-foreground",
                                      children: ["Due: ", a.dueDate],
                                    },
                                    void 0,
                                    true,
                                  ),
                                  /*#__PURE__*/ _jsxDEV(
                                    "button",
                                    {
                                      className: `px-4 py-1.5 rounded-full text-xs font-semibold ${a.pending > 0 ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border hover:bg-secondary"}`,
                                      children: a.pending > 0 ? "Grade Now" : "View Results",
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
                        a.id,
                        true,
                      ),
                    ),
                  ],
                },
                void 0,
                true,
              ),
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  className: "glass rounded-2xl p-6 h-fit",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      "h2",
                      {
                        className: "font-semibold text-lg mb-4 text-foreground",
                        children: "Evaluation Queue",
                      },
                      void 0,
                      false,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className:
                          "flex items-center justify-between p-3 rounded-lg bg-card border mb-3",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "div",
                            {
                              className: "flex items-center gap-3",
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  "div",
                                  {
                                    className:
                                      "bg-red-500/10 text-red-500 w-8 h-8 rounded-full flex items-center justify-center font-bold",
                                    children: "12",
                                  },
                                  void 0,
                                  false,
                                ),
                                /*#__PURE__*/ _jsxDEV(
                                  "span",
                                  {
                                    className: "text-sm font-medium",
                                    children: "Pending Review",
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
                            Clock,
                            {
                              className: "w-4 h-4 text-muted-foreground",
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
                        className:
                          "flex items-center justify-between p-3 rounded-lg bg-card border",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "div",
                            {
                              className: "flex items-center gap-3",
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  "div",
                                  {
                                    className:
                                      "bg-green-500/10 text-green-500 w-8 h-8 rounded-full flex items-center justify-center font-bold",
                                    children: "63",
                                  },
                                  void 0,
                                  false,
                                ),
                                /*#__PURE__*/ _jsxDEV(
                                  "span",
                                  {
                                    className: "text-sm font-medium",
                                    children: "Graded",
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
                            CheckCircle,
                            {
                              className: "w-4 h-4 text-muted-foreground",
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
