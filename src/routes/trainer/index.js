import { createFileRoute } from "@tanstack/react-router";
import { Users, BookOpen, Clock, CalendarCheck } from "lucide-react";
import { PermissionGuard } from "@/components/auth/permission-guard";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/")({
  component: TrainerDashboard,
});
function StatCard({ title, value, icon: Icon, trend }) {
  return /*#__PURE__*/ _jsxDEV(
    "div",
    {
      className: "glass rounded-xl p-6 flex flex-col gap-2 relative overflow-hidden",
      children: [
        /*#__PURE__*/ _jsxDEV(
          "div",
          {
            className: "absolute top-0 right-0 p-4 opacity-10 pointer-events-none",
            children: /*#__PURE__*/ _jsxDEV(
              Icon,
              {
                className: "w-16 h-16",
              },
              void 0,
              false,
            ),
          },
          void 0,
          false,
        ),
        /*#__PURE__*/ _jsxDEV(
          "div",
          {
            className: "flex items-center justify-between text-muted-foreground relative z-10",
            children: [
              /*#__PURE__*/ _jsxDEV(
                "h3",
                {
                  className: "font-medium text-sm",
                  children: title,
                },
                void 0,
                false,
              ),
              /*#__PURE__*/ _jsxDEV(
                Icon,
                {
                  className: "w-5 h-5 text-primary",
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
            className: "text-3xl font-bold font-display text-foreground relative z-10",
            children: value,
          },
          void 0,
          false,
        ),
        /*#__PURE__*/ _jsxDEV(
          "div",
          {
            className: "text-xs text-muted-foreground mt-1 relative z-10",
            children: trend,
          },
          void 0,
          false,
        ),
      ],
    },
    void 0,
    true,
  );
}
function TrainerDashboard() {
  return /*#__PURE__*/ _jsxDEV(
    PermissionGuard,
    {
      required: "batch.create",
      children: /*#__PURE__*/ _jsxDEV(
        "div",
        {
          className:
            "max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500",
          children: [
            /*#__PURE__*/ _jsxDEV(
              "div",
              {
                children: [
                  /*#__PURE__*/ _jsxDEV(
                    "h1",
                    {
                      className: "text-3xl font-bold font-display tracking-tight text-foreground",
                      children: "Trainer Dashboard",
                    },
                    void 0,
                    false,
                  ),
                  /*#__PURE__*/ _jsxDEV(
                    "p",
                    {
                      className: "text-muted-foreground mt-1 text-sm sm:text-base",
                      children: "Welcome back. Here's what's happening across your active scopes.",
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
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
                children: [
                  /*#__PURE__*/ _jsxDEV(
                    StatCard,
                    {
                      title: "Active Courses",
                      value: "12",
                      icon: BookOpen,
                      trend: "+2 from last month",
                    },
                    void 0,
                    false,
                  ),
                  /*#__PURE__*/ _jsxDEV(
                    StatCard,
                    {
                      title: "Active Batches",
                      value: "8",
                      icon: CalendarCheck,
                      trend: "3 upcoming sessions",
                    },
                    void 0,
                    false,
                  ),
                  /*#__PURE__*/ _jsxDEV(
                    StatCard,
                    {
                      title: "Total Students",
                      value: "342",
                      icon: Users,
                      trend: "+18% growth",
                    },
                    void 0,
                    false,
                  ),
                  /*#__PURE__*/ _jsxDEV(
                    StatCard,
                    {
                      title: "Pending Evaluations",
                      value: "24",
                      icon: Clock,
                      trend: "Action required",
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
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                  /*#__PURE__*/ _jsxDEV(
                    "div",
                    {
                      className: "lg:col-span-2 glass rounded-xl p-6",
                      children: [
                        /*#__PURE__*/ _jsxDEV(
                          "div",
                          {
                            className: "flex items-center justify-between mb-4",
                            children: [
                              /*#__PURE__*/ _jsxDEV(
                                "h2",
                                {
                                  className: "font-semibold text-lg text-foreground",
                                  children: "Upcoming Sessions",
                                },
                                void 0,
                                false,
                              ),
                              /*#__PURE__*/ _jsxDEV(
                                "button",
                                {
                                  className: "text-sm font-medium text-primary hover:underline",
                                  children: "View All",
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
                            className: "space-y-4",
                            children: [1, 2, 3].map((i) =>
                              /*#__PURE__*/ _jsxDEV(
                                "div",
                                {
                                  className:
                                    "flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:bg-card transition-colors",
                                  children: [
                                    /*#__PURE__*/ _jsxDEV(
                                      "div",
                                      {
                                        className:
                                          "bg-primary/10 text-primary w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0",
                                        children: [
                                          /*#__PURE__*/ _jsxDEV(
                                            "span",
                                            {
                                              className: "text-xs font-semibold uppercase",
                                              children: "Oct",
                                            },
                                            void 0,
                                            false,
                                          ),
                                          /*#__PURE__*/ _jsxDEV(
                                            "span",
                                            {
                                              className:
                                                "font-bold font-display text-lg leading-none",
                                              children: 10 + i,
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
                                        className: "flex-1 min-w-0",
                                        children: [
                                          /*#__PURE__*/ _jsxDEV(
                                            "h4",
                                            {
                                              className: "font-semibold text-foreground truncate",
                                              children: "Advanced Web Architecture - Batch A",
                                            },
                                            void 0,
                                            false,
                                          ),
                                          /*#__PURE__*/ _jsxDEV(
                                            "p",
                                            {
                                              className: "text-sm text-muted-foreground truncate",
                                              children: "10:00 AM – 11:30 AM • Virtual Room 1",
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
                                          "hidden sm:block btn-hero px-4 py-2 rounded-full text-xs font-semibold",
                                        children: "Join",
                                      },
                                      void 0,
                                      false,
                                    ),
                                  ],
                                },
                                i,
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
                  /*#__PURE__*/ _jsxDEV(
                    "div",
                    {
                      className: "glass rounded-xl p-6",
                      children: [
                        /*#__PURE__*/ _jsxDEV(
                          "h2",
                          {
                            className: "font-semibold text-lg mb-4 text-foreground",
                            children: "Recent Activity",
                          },
                          void 0,
                          false,
                        ),
                        /*#__PURE__*/ _jsxDEV(
                          "div",
                          {
                            className: "space-y-6",
                            children: [
                              {
                                title: "John Doe submitted Assignment 1",
                                time: "10 mins ago",
                              },
                              {
                                title: "New comment on 'React Basics'",
                                time: "1 hour ago",
                              },
                              {
                                title: "Batch C reached 80% completion",
                                time: "3 hours ago",
                              },
                            ].map((act, i) =>
                              /*#__PURE__*/ _jsxDEV(
                                "div",
                                {
                                  className: "flex items-start gap-3 group cursor-pointer",
                                  children: [
                                    /*#__PURE__*/ _jsxDEV(
                                      "div",
                                      {
                                        className:
                                          "w-2 h-2 rounded-full bg-primary mt-1.5 group-hover:scale-150 transition-transform",
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "div",
                                      {
                                        children: [
                                          /*#__PURE__*/ _jsxDEV(
                                            "p",
                                            {
                                              className:
                                                "text-sm font-medium text-foreground group-hover:text-primary transition-colors",
                                              children: act.title,
                                            },
                                            void 0,
                                            false,
                                          ),
                                          /*#__PURE__*/ _jsxDEV(
                                            "p",
                                            {
                                              className: "text-xs text-muted-foreground mt-0.5",
                                              children: act.time,
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
                                i,
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
