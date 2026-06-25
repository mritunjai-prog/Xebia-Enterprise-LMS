import { t as Route } from "./_courseId-CDc2YOD6.js";
import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, Edit2, FileText, GripVertical, MoreVertical, Plus, Save, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/trainer/courses/$courseId.jsx?tsr-split=component
var initialModules = [{
	id: 1,
	title: "Module 1: Introduction to Microservices",
	items: [{
		id: 101,
		type: "video",
		title: "Video: Monolith to Microservice Journey"
	}, {
		id: 102,
		type: "pdf",
		title: "PDF: Architecture Cheat Sheet"
	}]
}, {
	id: 2,
	title: "Module 2: Event-Driven Patterns",
	items: []
}];
function CourseBuilderView() {
	const { courseId } = Route.useParams();
	const [modules, setModules] = useState(initialModules);
	const [activeMenuId, setActiveMenuId] = useState(null);
	const deleteModule = (id) => {
		if (confirm("Are you sure you want to delete this module?")) {
			setModules(modules.filter((m) => m.id !== id));
			toast.error("Module deleted successfully.");
		}
		setActiveMenuId(null);
	};
	const deleteItem = (moduleId, itemId) => {
		if (confirm("Delete this content item?")) {
			setModules(modules.map((m) => {
				if (m.id === moduleId) return {
					...m,
					items: m.items.filter((item) => item.id !== itemId)
				};
				return m;
			}));
			toast.error("Content item removed.");
		}
		setActiveMenuId(null);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ jsx(ModuleHeroBanner, {
			breadcrumb: `Dashboard / Courses / ${courseId}`,
			title: "Course Content Builder",
			subtitle: "Construct modules, rearrange syllabus, and manage assets for this course.",
			actions: /* @__PURE__ */ jsxs("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ jsxs(Link, {
					to: "/trainer/courses",
					className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer bg-secondary text-foreground hover:bg-secondary/80 border border-border/50",
					children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }), " Back to Courses"]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: () => toast.success("Draft saved!"),
					className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
					children: [/* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }), " Save Draft"]
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 glass rounded-2xl p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold font-display text-foreground",
						children: "Course Outline"
					}), /* @__PURE__ */ jsxs("button", {
						onClick: () => toast.info("Add Module Dialog..."),
						className: "text-sm font-semibold text-primary hover:underline flex items-center gap-1",
						children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), " Add Module"]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-4",
					children: modules.map((mod) => /* @__PURE__ */ jsxs("div", {
						className: "border border-border/50 rounded-xl overflow-hidden bg-card/50 hover:border-primary/30 transition-colors duration-300",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 p-3.5 bg-secondary/30 hover:bg-secondary/50 transition-colors relative",
								children: [
									/* @__PURE__ */ jsx(GripVertical, { className: "w-4 h-4 text-muted-foreground cursor-grab" }),
									/* @__PURE__ */ jsx("h3", {
										className: "font-bold text-sm flex-1 text-foreground",
										children: mod.title
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "text-xs font-semibold text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border/40",
										children: [mod.items.length, " items"]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx("button", {
											onClick: () => setActiveMenuId(activeMenuId === `mod-${mod.id}` ? null : `mod-${mod.id}`),
											className: "h-8 w-8 rounded-full hover:bg-background grid place-items-center transition-colors cursor-pointer",
											children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4 text-foreground" })
										}), /* @__PURE__ */ jsx(AnimatePresence, { children: activeMenuId === `mod-${mod.id}` && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
											className: "fixed inset-0 z-10",
											onClick: () => setActiveMenuId(null)
										}), /* @__PURE__ */ jsxs(motion.div, {
											initial: {
												opacity: 0,
												y: 8
											},
											animate: {
												opacity: 1,
												y: 0
											},
											exit: {
												opacity: 0,
												y: 8
											},
											className: "absolute right-0 mt-1 w-40 rounded-xl glass-strong border shadow-lg z-20 py-1.5",
											children: [
												/* @__PURE__ */ jsxs("button", {
													onClick: () => {
														setActiveMenuId(null);
														toast.info("Edit module name");
													},
													className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer",
													children: [/* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5 text-blue-500" }), "Edit Module"]
												}),
												/* @__PURE__ */ jsx("hr", { className: "my-1 border-border/40" }),
												/* @__PURE__ */ jsxs("button", {
													onClick: () => deleteModule(mod.id),
													className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2 cursor-pointer",
													children: [/* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }), "Delete Module"]
												})
											]
										})] }) })]
									})
								]
							}),
							mod.items.length > 0 && /* @__PURE__ */ jsx("div", {
								className: "p-2.5 space-y-1 bg-background/30",
								children: mod.items.map((item) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/60 group transition-colors border border-transparent hover:border-border/40",
									children: [
										/* @__PURE__ */ jsx(GripVertical, { className: "w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab" }),
										item.type === "video" ? /* @__PURE__ */ jsx(Video, { className: "w-4 h-4 text-pink-500" }) : /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-blue-500" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium flex-1 text-foreground/90",
											children: item.title
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("button", {
												onClick: () => setActiveMenuId(activeMenuId === `item-${item.id}` ? null : `item-${item.id}`),
												className: "h-6 w-6 rounded hover:bg-background grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
												children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-3.5 h-3.5 text-muted-foreground" })
											}), /* @__PURE__ */ jsx(AnimatePresence, { children: activeMenuId === `item-${item.id}` && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
												className: "fixed inset-0 z-10",
												onClick: () => setActiveMenuId(null)
											}), /* @__PURE__ */ jsx(motion.div, {
												initial: {
													opacity: 0,
													y: 8
												},
												animate: {
													opacity: 1,
													y: 0
												},
												exit: {
													opacity: 0,
													y: 8
												},
												className: "absolute right-0 mt-1 w-36 rounded-xl glass-strong border shadow-lg z-20 py-1.5",
												children: /* @__PURE__ */ jsxs("button", {
													onClick: () => deleteItem(mod.id, item.id),
													className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2 cursor-pointer",
													children: [/* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }), "Delete Item"]
												})
											})] }) })]
										})
									]
								}, item.id))
							}),
							/* @__PURE__ */ jsx("div", {
								className: "p-2 border-t border-border/30 bg-background/30",
								children: /* @__PURE__ */ jsxs("button", {
									className: "text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/50 flex items-center gap-1.5 p-2 w-full justify-center border border-dashed border-border/60 rounded-lg transition-colors cursor-pointer",
									children: [/* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }), " Add Content"]
								})
							})
						]
					}, mod.id))
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-6 h-fit sticky top-24",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-bold font-display text-foreground mb-4",
						children: "Upload Content"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border-2 border-dashed border-border/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 hover:border-primary/40 transition-colors cursor-pointer",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4",
								children: /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6 text-primary" })
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-bold text-foreground mb-1",
								children: "Drag & drop files here"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Video, PDF, PPT, DOCX up to 2GB"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 pt-6 border-t border-border/40",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-sm font-bold text-foreground mb-3",
							children: "Or select from Library"
						}), /* @__PURE__ */ jsx("button", {
							className: "w-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer",
							children: "Browse Content Library"
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { CourseBuilderView as component };
