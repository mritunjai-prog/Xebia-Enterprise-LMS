import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, MoreVertical, Clock, Users } from "lucide-react";
import { PermissionGuard } from "@/components/auth/permission-guard";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/courses/")({
  component: CourseListView,
});
const mockCourses = [
  {
    id: "c1",
    title: "Enterprise Architecture Patterns",
    status: "Published",
    students: 124,
    duration: "12h 30m",
    updated: "2026-06-20",
  },
  {
    id: "c2",
    title: "Advanced React & Next.js",
    status: "Draft",
    students: 0,
    duration: "8h 15m",
    updated: "2026-06-22",
  },
  {
    id: "c3",
    title: "Microservices with Spring Boot",
    status: "Published",
    students: 89,
    duration: "15h 0m",
    updated: "2026-06-15",
  },
];
function CourseListView() {
  return /*#__PURE__*/ _jsxDEV(
    PermissionGuard,
    {
      required: "course.read",
      children: /*#__PURE__*/ _jsxDEV(
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
                            className:
                              "text-3xl font-bold font-display tracking-tight text-foreground",
                            children: "Courses",
                          },
                          void 0,
                          false,
                        ),
                        /*#__PURE__*/ _jsxDEV(
                          "p",
                          {
                            className: "text-muted-foreground mt-1 text-sm",
                            children: "Manage and author your training content.",
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
                        " Create Course",
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
                      className: "flex flex-col sm:flex-row justify-between items-center gap-4",
                      children: /*#__PURE__*/ _jsxDEV(
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
                                placeholder: "Search courses...",
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
                    },
                    void 0,
                    false,
                  ),
                  /*#__PURE__*/ _jsxDEV(
                    "div",
                    {
                      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                      children: mockCourses.map((course) =>
                        /*#__PURE__*/ _jsxDEV(
                          "div",
                          {
                            className:
                              "group bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all flex flex-col",
                            children: [
                              /*#__PURE__*/ _jsxDEV(
                                "div",
                                {
                                  className:
                                    "h-28 bg-secondary/50 flex items-start justify-between p-4",
                                  children: [
                                    /*#__PURE__*/ _jsxDEV(
                                      "span",
                                      {
                                        className: `px-2.5 py-1 rounded-full text-xs font-semibold ${course.status === "Published" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground border"}`,
                                        children: course.status,
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "button",
                                      {
                                        className:
                                          "h-8 w-8 rounded-full bg-background/50 hover:bg-background grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity",
                                        children: /*#__PURE__*/ _jsxDEV(
                                          MoreVertical,
                                          {
                                            className: "w-4 h-4",
                                          },
                                          void 0,
                                          false,
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
                              /*#__PURE__*/ _jsxDEV(
                                "div",
                                {
                                  className: "p-5 flex-1 flex flex-col",
                                  children: [
                                    /*#__PURE__*/ _jsxDEV(
                                      "h3",
                                      {
                                        className:
                                          "font-bold text-lg leading-tight text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors",
                                        children: course.title,
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "div",
                                      {
                                        className: "mt-auto space-y-3",
                                        children: [
                                          /*#__PURE__*/ _jsxDEV(
                                            "div",
                                            {
                                              className:
                                                "flex items-center gap-4 text-xs text-muted-foreground",
                                              children: [
                                                /*#__PURE__*/ _jsxDEV(
                                                  "span",
                                                  {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                      /*#__PURE__*/ _jsxDEV(
                                                        Clock,
                                                        {
                                                          className: "w-3.5 h-3.5",
                                                        },
                                                        void 0,
                                                        false,
                                                      ),
                                                      " ",
                                                      course.duration,
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                ),
                                                /*#__PURE__*/ _jsxDEV(
                                                  "span",
                                                  {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                      /*#__PURE__*/ _jsxDEV(
                                                        Users,
                                                        {
                                                          className: "w-3.5 h-3.5",
                                                        },
                                                        void 0,
                                                        false,
                                                      ),
                                                      " ",
                                                      course.students,
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
                                              className:
                                                "pt-3 border-t border-border/50 flex items-center justify-between",
                                              children: [
                                                /*#__PURE__*/ _jsxDEV(
                                                  "span",
                                                  {
                                                    className:
                                                      "text-[10px] uppercase font-semibold text-muted-foreground tracking-wider",
                                                    children: ["Updated ", course.updated],
                                                  },
                                                  void 0,
                                                  true,
                                                ),
                                                /*#__PURE__*/ _jsxDEV(
                                                  Link,
                                                  {
                                                    to: "/trainer/courses/$courseId",
                                                    params: {
                                                      courseId: course.id,
                                                    },
                                                    className:
                                                      "text-sm font-semibold text-primary hover:underline",
                                                    children: "Edit",
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
                          course.id,
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
      ),
    },
    void 0,
    false,
  );
}
