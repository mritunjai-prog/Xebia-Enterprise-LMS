import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Save, Plus, GripVertical, FileText, Video, MoreVertical } from "lucide-react";
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export const Route = createFileRoute("/trainer/courses/$courseId")({
  component: CourseBuilderView,
});
function CourseBuilderView() {
  const { courseId } = Route.useParams();
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
                  className: "flex items-center gap-4",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      "button",
                      {
                        className:
                          "h-10 w-10 rounded-full border bg-card hover:bg-secondary grid place-items-center transition-colors",
                        children: /*#__PURE__*/ _jsxDEV(
                          ArrowLeft,
                          {
                            className: "w-5 h-5 text-muted-foreground",
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
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "h1",
                            {
                              className:
                                "text-2xl font-bold font-display tracking-tight text-foreground",
                              children: "Course Builder",
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            "div",
                            {
                              className: "flex items-center gap-2 mt-1",
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  "span",
                                  {
                                    className:
                                      "bg-muted px-2 py-0.5 rounded border text-xs text-muted-foreground",
                                    children: "Draft",
                                  },
                                  void 0,
                                  false,
                                ),
                                /*#__PURE__*/ _jsxDEV(
                                  "span",
                                  {
                                    className: "text-xs text-muted-foreground",
                                    children: ["ID: ", courseId],
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
              ),
              /*#__PURE__*/ _jsxDEV(
                "button",
                {
                  className:
                    "btn-hero px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      Save,
                      {
                        className: "w-4 h-4",
                      },
                      void 0,
                      false,
                    ),
                    " Save Draft",
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
                        className: "flex items-center justify-between mb-6",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "h2",
                            {
                              className: "text-lg font-semibold text-foreground",
                              children: "Course Outline",
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            "button",
                            {
                              className:
                                "text-sm font-semibold text-primary hover:underline flex items-center gap-1",
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  Plus,
                                  {
                                    className: "w-4 h-4",
                                  },
                                  void 0,
                                  false,
                                ),
                                " Add Module",
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
                        className: "space-y-4",
                        children: [
                          {
                            id: 1,
                            title: "Module 1: Introduction to Microservices",
                            items: 3,
                          },
                          {
                            id: 2,
                            title: "Module 2: Event-Driven Patterns",
                            items: 5,
                          },
                        ].map((mod) =>
                          /*#__PURE__*/ _jsxDEV(
                            "div",
                            {
                              className:
                                "border border-border/50 rounded-xl overflow-hidden bg-card/50",
                              children: [
                                /*#__PURE__*/ _jsxDEV(
                                  "div",
                                  {
                                    className:
                                      "flex items-center gap-3 p-3 bg-secondary/30 cursor-grab hover:bg-secondary/50 transition-colors",
                                    children: [
                                      /*#__PURE__*/ _jsxDEV(
                                        GripVertical,
                                        {
                                          className: "w-4 h-4 text-muted-foreground",
                                        },
                                        void 0,
                                        false,
                                      ),
                                      /*#__PURE__*/ _jsxDEV(
                                        "h3",
                                        {
                                          className: "font-semibold text-sm flex-1",
                                          children: mod.title,
                                        },
                                        void 0,
                                        false,
                                      ),
                                      /*#__PURE__*/ _jsxDEV(
                                        "span",
                                        {
                                          className:
                                            "text-xs font-medium text-muted-foreground bg-background px-2 py-1 rounded-md",
                                          children: [mod.items, " items"],
                                        },
                                        void 0,
                                        true,
                                      ),
                                      /*#__PURE__*/ _jsxDEV(
                                        "button",
                                        {
                                          className:
                                            "h-8 w-8 rounded-full hover:bg-background grid place-items-center",
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
                                mod.id === 1 &&
                                  /*#__PURE__*/ _jsxDEV(
                                    "div",
                                    {
                                      className: "p-2 space-y-1",
                                      children: [
                                        /*#__PURE__*/ _jsxDEV(
                                          "div",
                                          {
                                            className:
                                              "flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 group cursor-pointer",
                                            children: [
                                              /*#__PURE__*/ _jsxDEV(
                                                GripVertical,
                                                {
                                                  className:
                                                    "w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100",
                                                },
                                                void 0,
                                                false,
                                              ),
                                              /*#__PURE__*/ _jsxDEV(
                                                Video,
                                                {
                                                  className: "w-4 h-4 text-accent",
                                                },
                                                void 0,
                                                false,
                                              ),
                                              /*#__PURE__*/ _jsxDEV(
                                                "span",
                                                {
                                                  className: "text-sm",
                                                  children:
                                                    "Video: Monolith to Microservice Journey",
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
                                              "flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 group cursor-pointer",
                                            children: [
                                              /*#__PURE__*/ _jsxDEV(
                                                GripVertical,
                                                {
                                                  className:
                                                    "w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100",
                                                },
                                                void 0,
                                                false,
                                              ),
                                              /*#__PURE__*/ _jsxDEV(
                                                FileText,
                                                {
                                                  className: "w-4 h-4 text-blue-500",
                                                },
                                                void 0,
                                                false,
                                              ),
                                              /*#__PURE__*/ _jsxDEV(
                                                "span",
                                                {
                                                  className: "text-sm",
                                                  children: "PDF: Architecture Cheat Sheet",
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
                                    className: "p-2 border-t border-border/50",
                                    children: /*#__PURE__*/ _jsxDEV(
                                      "button",
                                      {
                                        className:
                                          "text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 p-2 w-full justify-center border border-dashed rounded-lg",
                                        children: [
                                          /*#__PURE__*/ _jsxDEV(
                                            Plus,
                                            {
                                              className: "w-3 h-3",
                                            },
                                            void 0,
                                            false,
                                          ),
                                          " Add Content",
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
                            mod.id,
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
                  className: "glass rounded-xl p-6 h-fit",
                  children: [
                    /*#__PURE__*/ _jsxDEV(
                      "h2",
                      {
                        className: "text-lg font-semibold text-foreground mb-4",
                        children: "Upload Content",
                      },
                      void 0,
                      false,
                    ),
                    /*#__PURE__*/ _jsxDEV(
                      "div",
                      {
                        className:
                          "border-2 border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 transition-colors cursor-pointer",
                        children: [
                          /*#__PURE__*/ _jsxDEV(
                            "div",
                            {
                              className:
                                "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4",
                              children: /*#__PURE__*/ _jsxDEV(
                                Plus,
                                {
                                  className: "w-6 h-6 text-primary",
                                },
                                void 0,
                                false,
                              ),
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            "h3",
                            {
                              className: "font-medium mb-1",
                              children: "Drag & drop files here",
                            },
                            void 0,
                            false,
                          ),
                          /*#__PURE__*/ _jsxDEV(
                            "p",
                            {
                              className: "text-xs text-muted-foreground",
                              children: "Video, PDF, PPT, DOCX up to 2GB",
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
