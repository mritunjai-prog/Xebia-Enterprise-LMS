import { createFileRoute } from "@tanstack/react-router";
import { Reply } from "lucide-react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/discussions/")({
  component: DiscussionsView,
});
const mockThreads = [
  {
    id: "d1",
    student: "Alice Johnson",
    course: "Advanced React",
    module: "Hooks Overview",
    message: "Can you explain how useEffect cleanup works?",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "d2",
    student: "Bob Smith",
    course: "Spring Boot",
    module: "Kafka Events",
    message: "Is the dead-letter queue auto configured?",
    time: "1 day ago",
    unread: false,
  },
];
function DiscussionsView() {
  return /*#__PURE__*/ _jsxDEV(
    "div",
    {
      className:
        "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
      children: [
        /*#__PURE__*/ _jsxDEV(
          "div",
          {
            children: [
              /*#__PURE__*/ _jsxDEV(
                "h1",
                {
                  className: "text-3xl font-bold font-display tracking-tight text-foreground",
                  children: "Discussions",
                },
                void 0,
                false,
              ),
              /*#__PURE__*/ _jsxDEV(
                "p",
                {
                  className: "text-muted-foreground mt-1 text-sm",
                  children: "Respond to student questions and moderate course comments.",
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
            className: "grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]",
            children: [
              /*#__PURE__*/ _jsxDEV(
                "div",
                {
                  className:
                    "glass rounded-2xl flex flex-col overflow-hidden border border-border/50",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className: "p-4 border-b border-border/50 bg-secondary/30",
                        children: /*#__PURE__*/ _jsxDEV(
                          "h2",
                          {
                            className: "font-semibold text-sm",
                            children: "Inbox",
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
                        className: "flex-1 overflow-y-auto",
                        children: mockThreads.map((thread) =>
                          /*#__PURE__*/ _jsxDEV(
                            "button",
                            {
                              className: `w-full text-left p-4 border-b border-border/50 hover:bg-secondary/50 transition-colors ${thread.unread ? "bg-primary/5" : ""}`,
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  "div",
                                  {
                                    className: "flex items-start justify-between mb-1",
                                    children: [
                                      /*#__PURE__*/ _jsxDEV(
                                        "span",
                                        {
                                          className: `text-sm font-semibold ${thread.unread ? "text-foreground" : "text-muted-foreground"}`,
                                          children: thread.student,
                                        },
                                        void 0,
                                        false,
                                      ),
                                      /*#__PURE__*/ _jsxDEV(
                                        "span",
                                        {
                                          className: "text-[10px] text-muted-foreground",
                                          children: thread.time,
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
                                    className: "text-xs font-medium text-primary mb-2",
                                    children: [thread.course, " • ", thread.module],
                                  },
                                  void 0,
                                  true,
                                ),
                                /*#__PURE__*/ _jsxDEV(
                                  "p",
                                  {
                                    className: "text-sm text-muted-foreground line-clamp-2",
                                    children: thread.message,
                                  },
                                  void 0,
                                  false,
                                ),
                              ],
                            },
                            thread.id,
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
                  className:
                    "lg:col-span-2 glass rounded-2xl flex flex-col overflow-hidden border border-border/50",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className: "p-4 border-b border-border/50 bg-secondary/30",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "h2",
                            {
                              className: "font-semibold text-foreground",
                              children: "Hooks Overview",
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            "p",
                            {
                              className: "text-xs text-muted-foreground mt-0.5",
                              children: "Alice Johnson • Advanced React",
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
                        className: "flex-1 p-6 overflow-y-auto space-y-6",
                        children: /*#__PURE__*/ _jsxDEV(
                          "div",
                          {
                            className: "flex gap-4",
                            children: [
                              /*#__PURE__*/ _jsxDEV(
                                "div",
                                {
                                  className:
                                    "w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 font-bold text-xs",
                                  children: "AJ",
                                },
                                void 0,
                                false,
                              ),
                              /*#__PURE__*/ _jsxDEV(
                                "div",
                                {
                                  className:
                                    "bg-card border border-border/50 rounded-2xl rounded-tl-none p-4 text-sm",
                                  children: [
                                    /*#__PURE__*/ _jsxDEV(
                                      "p",
                                      {
                                        children:
                                          "Can you explain how useEffect cleanup works? Specifically when dealing with WebSockets.",
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "span",
                                      {
                                        className: "text-[10px] text-muted-foreground block mt-2",
                                        children: "2 hours ago",
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
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className: "p-4 border-t border-border/50 bg-background",
                        children: /*#__PURE__*/ _jsxDEV(
                          "div",
                          {
                            className: "relative",
                            children: [
                              /*#__PURE__*/ _jsxDEV(
                                "textarea",
                                {
                                  placeholder: "Type your reply...",
                                  className:
                                    "w-full bg-card border border-border/50 rounded-xl p-3 pr-12 text-sm outline-none resize-none h-20 focus:border-primary",
                                },
                                void 0,
                                false,
                              ),
                              /*#__PURE__*/ _jsxDEV(
                                "button",
                                {
                                  className:
                                    "absolute bottom-3 right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground grid place-items-center hover:bg-primary/90 transition-colors",
                                  children: /*#__PURE__*/ _jsxDEV(
                                    Reply,
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
  );
}
