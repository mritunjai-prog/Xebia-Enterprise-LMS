import { createFileRoute } from "@tanstack/react-router";
import { Send, Smartphone, Mail } from "lucide-react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/notifications/")({
  component: NotificationsView,
});
function NotificationsView() {
  return /*#__PURE__*/ _jsxDEV(
    "div",
    {
      className:
        "max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
      children: [
        /*#__PURE__*/ _jsxDEV(
          "div",
          {
            children: [
              /*#__PURE__*/ _jsxDEV(
                "h1",
                {
                  className: "text-3xl font-bold font-display tracking-tight text-foreground",
                  children: "Send Notification",
                },
                void 0,
                false,
              ),
              /*#__PURE__*/ _jsxDEV(
                "p",
                {
                  className: "text-muted-foreground mt-1 text-sm",
                  children: "Send multi-channel announcements to your batches.",
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
            className: "glass rounded-2xl p-6",
            children: /*#__PURE__*/ _jsxDEV(
              "form",
              {
                className: "space-y-6",
                onSubmit: (e) => e.preventDefault(),
                children: [
                  /*#__PURE__*/ _jsxDEV(
                    "div",
                    {
                      children: [
                        /*#__PURE__*/ _jsxDEV(
                          "label",
                          {
                            className: "block text-sm font-medium mb-1.5 text-foreground",
                            children: "Select Audience",
                          },
                          void 0,
                          false,
                        ),
                        /*#__PURE__*/ _jsxDEV(
                          "select",
                          {
                            className:
                              "w-full bg-background border border-border/50 rounded-xl p-3 text-sm outline-none focus:border-primary",
                            children: [
                              /*#__PURE__*/ _jsxDEV(
                                "option",
                                {
                                  children: "All Active Batches",
                                },
                                void 0,
                                false,
                              ),
                              /*#__PURE__*/ _jsxDEV(
                                "option",
                                {
                                  children: "Spring Boot Jan 2026",
                                },
                                void 0,
                                false,
                              ),
                              /*#__PURE__*/ _jsxDEV(
                                "option",
                                {
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
                      children: [
                        /*#__PURE__*/ _jsxDEV(
                          "label",
                          {
                            className: "block text-sm font-medium mb-1.5 text-foreground",
                            children: "Channels",
                          },
                          void 0,
                          false,
                        ),
                        /*#__PURE__*/ _jsxDEV(
                          "div",
                          {
                            className: "flex gap-4",
                            children: [
                              /*#__PURE__*/ _jsxDEV(
                                "label",
                                {
                                  className:
                                    "flex items-center gap-2 border border-border/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/50 transition-colors flex-1",
                                  children: [
                                    /*#__PURE__*/ _jsxDEV(
                                      "input",
                                      {
                                        type: "checkbox",
                                        defaultChecked: true,
                                        className: "accent-primary",
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      Mail,
                                      {
                                        className: "w-4 h-4 text-muted-foreground",
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "span",
                                      {
                                        className: "text-sm font-medium",
                                        children: "Email",
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
                                "label",
                                {
                                  className:
                                    "flex items-center gap-2 border border-border/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/50 transition-colors flex-1",
                                  children: [
                                    /*#__PURE__*/ _jsxDEV(
                                      "input",
                                      {
                                        type: "checkbox",
                                        defaultChecked: true,
                                        className: "accent-primary",
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      Smartphone,
                                      {
                                        className: "w-4 h-4 text-green-500",
                                      },
                                      void 0,
                                      false,
                                    ),
                                    /*#__PURE__*/ _jsxDEV(
                                      "span",
                                      {
                                        className: "text-sm font-medium",
                                        children: "WhatsApp",
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
                  /*#__PURE__*/ _jsxDEV(
                    "div",
                    {
                      children: [
                        /*#__PURE__*/ _jsxDEV(
                          "label",
                          {
                            className: "block text-sm font-medium mb-1.5 text-foreground",
                            children: "Subject",
                          },
                          void 0,
                          false,
                        ),
                        /*#__PURE__*/ _jsxDEV(
                          "input",
                          {
                            type: "text",
                            placeholder: "E.g., Tomorrow's session rescheduled",
                            className:
                              "w-full bg-background border border-border/50 rounded-xl p-3 text-sm outline-none focus:border-primary",
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
                      children: [
                        /*#__PURE__*/ _jsxDEV(
                          "label",
                          {
                            className: "block text-sm font-medium mb-1.5 text-foreground",
                            children: "Message Body",
                          },
                          void 0,
                          false,
                        ),
                        /*#__PURE__*/ _jsxDEV(
                          "textarea",
                          {
                            rows: "5",
                            placeholder:
                              "Type your message here. You can use variables like {{student_name}}.",
                            className:
                              "w-full bg-background border border-border/50 rounded-xl p-3 text-sm outline-none resize-y focus:border-primary",
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
                      className: "pt-4 border-t border-border/50 flex justify-end",
                      children: /*#__PURE__*/ _jsxDEV(
                        "button",
                        {
                          type: "submit",
                          className:
                            "btn-hero flex items-center gap-2 h-10 px-6 rounded-full text-sm font-semibold",
                          children: [
                            /*#__PURE__*/ _jsxDEV(
                              Send,
                              {
                                className: "w-4 h-4",
                              },
                              void 0,
                              false,
                            ),
                            " Send Now",
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
