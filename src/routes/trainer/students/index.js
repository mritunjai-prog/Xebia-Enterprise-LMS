import { createFileRoute } from "@tanstack/react-router";
import { Search, Download } from "lucide-react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/students/")({
  component: StudentsView,
});
const mockStudents = [
  {
    id: "s1",
    name: "Alice Johnson",
    email: "alice@example.com",
    batch: "Spring Boot Jan 2026",
    progress: 85,
    lastActive: "2 hours ago",
  },
  {
    id: "s2",
    name: "Bob Smith",
    email: "bob@example.com",
    batch: "React Advanced Cohort",
    progress: 42,
    lastActive: "1 day ago",
  },
  {
    id: "s3",
    name: "Charlie Davis",
    email: "charlie@example.com",
    batch: "Spring Boot Jan 2026",
    progress: 95,
    lastActive: "Just now",
  },
];
function StudentsView() {
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
                        children: "Student Directory",
                      },
                      void 0,
                      false,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "p",
                      {
                        className: "text-muted-foreground mt-1 text-sm",
                        children: "Monitor student progress across your assigned batches.",
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
                    " Export CSV",
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
            className: "glass rounded-2xl p-4 sm:p-6 space-y-4",
            children: [
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  className: "flex flex-col sm:flex-row justify-between items-center gap-4",
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
                              placeholder: "Search by name or email...",
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
                      "select",
                      {
                        className:
                          "border rounded-full px-3 py-2 text-sm bg-background outline-none cursor-pointer",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "option",
                            {
                              value: "",
                              children: "All Batches",
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            "option",
                            {
                              value: "b1",
                              children: "Spring Boot Jan 2026",
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            "option",
                            {
                              value: "b2",
                              children: "React Advanced Cohort",
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
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  className: "overflow-x-auto rounded-xl border border-border/50 bg-card",
                  children: /*#__PURE__*/ _jsxDEV(
                    "table",
                    {
                      className: "w-full text-sm text-left",
                      children: [
                        /*#__PURE__*/ _jsxDEV(
                          "thead",
                          {
                            className:
                              "bg-secondary/50 text-muted-foreground border-b border-border/50",
                            children: /*#__PURE__*/ _jsxDEV(
                              "tr",
                              {
                                children: [
                                  /*#__PURE__*/ _jsxDEV(
                                    "th",
                                    {
                                      className: "px-4 py-3 font-medium",
                                      children: "Name",
                                    },
                                    void 0,
                                    false,
                                  ),
                                  /*#__PURE__*/ _jsxDEV(
                                    "th",
                                    {
                                      className: "px-4 py-3 font-medium hidden sm:table-cell",
                                      children: "Email",
                                    },
                                    void 0,
                                    false,
                                  ),
                                  /*#__PURE__*/ _jsxDEV(
                                    "th",
                                    {
                                      className: "px-4 py-3 font-medium",
                                      children: "Batch",
                                    },
                                    void 0,
                                    false,
                                  ),
                                  /*#__PURE__*/ _jsxDEV(
                                    "th",
                                    {
                                      className: "px-4 py-3 font-medium text-right",
                                      children: "Progress",
                                    },
                                    void 0,
                                    false,
                                  ),
                                  /*#__PURE__*/ _jsxDEV(
                                    "th",
                                    {
                                      className:
                                        "px-4 py-3 font-medium text-right hidden md:table-cell",
                                      children: "Last Active",
                                    },
                                    void 0,
                                    false,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                            ),
                          },
                          void 0,
                          false,
                        ),
                        /*#__PURE__*/ _jsxDEV(
                          "tbody",
                          {
                            className: "divide-y divide-border/50",
                            children: mockStudents.map((student) =>
                              /*#__PURE__*/ _jsxDEV(
                                "tr",
                                {
                                  className:
                                    "hover:bg-secondary/30 transition-colors cursor-pointer group",
                                  children: [
                                    /*#__PURE__*/ _jsxDEV(
                                      "td",
                                      {
                                        className:
                                          "px-4 py-4 font-medium text-foreground group-hover:text-primary transition-colors",
                                        children: student.name,
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "td",
                                      {
                                        className:
                                          "px-4 py-4 text-muted-foreground hidden sm:table-cell",
                                        children: student.email,
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "td",
                                      {
                                        className: "px-4 py-4",
                                        children: /*#__PURE__*/ _jsxDEV(
                                          "span",
                                          {
                                            className: "bg-secondary px-2 py-1 rounded text-xs",
                                            children: student.batch,
                                          },
                                          void 0,
                                          false,
                                        ),
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "td",
                                      {
                                        className: "px-4 py-4 text-right",
                                        children: /*#__PURE__*/ _jsxDEV(
                                          "div",
                                          {
                                            className: "flex items-center justify-end gap-2",
                                            children: [
                                              /*#__PURE__*/ _jsxDEV(
                                                "div",
                                                {
                                                  className:
                                                    "w-16 h-1.5 bg-secondary rounded-full overflow-hidden hidden sm:block",
                                                  children: /*#__PURE__*/ _jsxDEV(
                                                    "div",
                                                    {
                                                      className: "h-full bg-primary",
                                                      style: {
                                                        width: `${student.progress}%`,
                                                      },
                                                    },
                                                    void 0,
                                                    false,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                              ),
                                              /*#__PURE__*/ _jsxDEV(
                                                "span",
                                                {
                                                  className: "font-semibold",
                                                  children: [student.progress, "%"],
                                                },
                                                void 0,
                                                true,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                        ),
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "td",
                                      {
                                        className:
                                          "px-4 py-4 text-muted-foreground text-right hidden md:table-cell",
                                        children: student.lastActive,
                                      },
                                      void 0,
                                      false,
                                    ),
                                  ],
                                },
                                student.id,
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
