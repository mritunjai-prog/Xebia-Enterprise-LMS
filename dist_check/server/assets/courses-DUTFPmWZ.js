import { t as PermissionGuard } from "./permission-guard-CVDo8sNM.js";
import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, Check, Clock, Edit2, Filter, MoreVertical, Plus, Search, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/trainer/courses/index.jsx?tsr-split=component
var initialCourses = [
	{
		id: "c1",
		code: "CS-402",
		title: "Enterprise Architecture Patterns",
		subject: "Software Engineering",
		university: "University of Technology",
		status: "Published",
		batches: 3,
		students: 124,
		duration: "12h 30m",
		updated: "2026-06-20",
		gradient: "from-purple-600 to-indigo-600",
		image: "/courses/enterprise_architecture.png"
	},
	{
		id: "c2",
		code: "CS-501",
		title: "Advanced React & Next.js",
		subject: "Web Development",
		university: "University of Technology",
		status: "Draft",
		batches: 0,
		students: 0,
		duration: "8h 15m",
		updated: "2026-06-22",
		gradient: "from-cyan-600 to-blue-600",
		image: "/courses/react_nextjs.png"
	},
	{
		id: "c3",
		code: "CS-308",
		title: "Microservices with Spring Boot",
		subject: "Backend Systems",
		university: "Central Engineering Academy",
		status: "Published",
		batches: 2,
		students: 89,
		duration: "15h 0m",
		updated: "2026-06-15",
		gradient: "from-emerald-600 to-teal-600",
		image: null
	}
];
function TrainerCourseListView() {
	const [courses, setCourses] = useState(initialCourses);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [scopeFilter, setScopeFilter] = useState("All");
	const [activeMenuId, setActiveMenuId] = useState(null);
	const filteredCourses = courses.filter((course) => {
		const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || course.code.toLowerCase().includes(search.toLowerCase()) || course.subject.toLowerCase().includes(search.toLowerCase());
		const matchesStatus = statusFilter === "All" || course.status === statusFilter;
		const matchesScope = scopeFilter === "All" || course.university === scopeFilter;
		return matchesSearch && matchesStatus && matchesScope;
	});
	const togglePublish = (id) => {
		setCourses(courses.map((c) => {
			if (c.id === id) {
				const newStatus = c.status === "Published" ? "Draft" : "Published";
				toast.success(`Course "${c.title}" is now ${newStatus}`);
				return {
					...c,
					status: newStatus
				};
			}
			return c;
		}));
		setActiveMenuId(null);
	};
	const deleteCourse = (id) => {
		const courseToDelete = courses.find((c) => c.id === id);
		if (confirm(`Are you sure you want to delete ${courseToDelete.title}?`)) {
			setCourses(courses.filter((c) => c.id !== id));
			toast.error(`Course "${courseToDelete.title}" deleted.`);
		}
		setActiveMenuId(null);
	};
	return /* @__PURE__ */ jsx(PermissionGuard, {
		required: "course.read",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
			children: [
				/* @__PURE__ */ jsx(ModuleHeroBanner, {
					breadcrumb: "Dashboard / Trainer Courses",
					title: "Assigned Courses & Content",
					subtitle: "Manage the syllabus, course outlines, and modules for the classes you teach.",
					actions: /* @__PURE__ */ jsxs("button", {
						onClick: () => toast.info("Opening Course Creator..."),
						className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
						children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), " Create Course"]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative w-full md:max-w-xs",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							placeholder: "Search code, title or subject...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-3 w-full md:w-auto justify-end",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background",
							children: [/* @__PURE__ */ jsx(Filter, { className: "w-3.5 h-3.5 text-muted-foreground" }), /* @__PURE__ */ jsxs("select", {
								value: scopeFilter,
								onChange: (e) => setScopeFilter(e.target.value),
								className: "bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground",
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "All",
										className: "bg-card text-foreground",
										style: {
											backgroundColor: "var(--card)",
											color: "var(--foreground)"
										},
										children: "All Universities"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "University of Technology",
										className: "bg-card text-foreground",
										style: {
											backgroundColor: "var(--card)",
											color: "var(--foreground)"
										},
										children: "University of Technology"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "Central Engineering Academy",
										className: "bg-card text-foreground",
										style: {
											backgroundColor: "var(--card)",
											color: "var(--foreground)"
										},
										children: "Central Engineering Academy"
									})
								]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background",
							children: /* @__PURE__ */ jsxs("select", {
								value: statusFilter,
								onChange: (e) => setStatusFilter(e.target.value),
								className: "bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground",
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "All",
										className: "bg-card text-foreground",
										style: {
											backgroundColor: "var(--card)",
											color: "var(--foreground)"
										},
										children: "All Statuses"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "Published",
										className: "bg-card text-foreground",
										style: {
											backgroundColor: "var(--card)",
											color: "var(--foreground)"
										},
										children: "Published"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "Draft",
										className: "bg-card text-foreground",
										style: {
											backgroundColor: "var(--card)",
											color: "var(--foreground)"
										},
										children: "Draft"
									})
								]
							})
						})]
					})]
				}),
				filteredCourses.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: filteredCourses.map((course) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						className: "group glass border border-border/40 rounded-2xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col",
						children: [/* @__PURE__ */ jsxs("div", {
							className: `h-32 bg-cover bg-center p-4 flex flex-col justify-between relative ${course.image ? "" : `bg-gradient-to-r ${course.gradient}`}`,
							style: course.image ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${course.image})` } : void 0,
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ jsx("span", {
									className: "bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider",
									children: course.code
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => setActiveMenuId(activeMenuId === course.id ? null : course.id),
										className: "h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white grid place-items-center cursor-pointer transition-colors",
										children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4" })
									}), /* @__PURE__ */ jsx(AnimatePresence, { children: activeMenuId === course.id && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
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
										className: "absolute right-0 mt-1 w-44 rounded-xl glass-strong border shadow-lg z-20 py-1.5",
										children: [
											/* @__PURE__ */ jsxs("button", {
												onClick: () => togglePublish(course.id),
												className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-emerald-500" }), course.status === "Published" ? "Make Draft" : "Publish Course"]
											}),
											/* @__PURE__ */ jsxs(Link, {
												to: "/trainer/courses/$courseId",
												params: { courseId: course.id },
												className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5 text-blue-500" }), "Edit Modules"]
											}),
											/* @__PURE__ */ jsx("hr", { className: "my-1 border-border/40" }),
											/* @__PURE__ */ jsxs("button", {
												onClick: () => deleteCourse(course.id),
												className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" }), "Delete Course"]
											})
										]
									})] }) })]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-end",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[11px] font-bold text-white/95 uppercase tracking-wide",
									children: course.subject
								}), /* @__PURE__ */ jsx("span", {
									className: `px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${course.status === "Published" ? "bg-emerald-500/25 text-emerald-300" : "bg-amber-500/25 text-amber-300"}`,
									children: course.status
								})]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-5 flex-1 flex flex-col justify-between space-y-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-bold text-lg leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200",
								children: course.title
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground mt-1 line-clamp-1",
								children: ["Scope: ", course.university]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-2 gap-2 text-xs text-muted-foreground bg-secondary/30 p-2.5 rounded-xl border border-border/40",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ jsx(Users, { className: "w-3.5 h-3.5 text-primary" }),
												/* @__PURE__ */ jsx("span", {
													className: "font-semibold",
													children: course.students
												}),
												" Enrolled"
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5 text-teal-500" }),
												/* @__PURE__ */ jsx("span", {
													className: "font-semibold",
													children: course.batches
												}),
												" Batches"
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5 col-span-2",
											children: [
												/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-amber-500" }),
												/* @__PURE__ */ jsx("span", {
													className: "font-semibold",
													children: course.duration
												}),
												" estimated time"
											]
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "pt-3 flex items-center justify-between border-t border-border/40",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider",
										children: ["Updated ", course.updated]
									}), /* @__PURE__ */ jsxs(Link, {
										to: "/trainer/courses/$courseId",
										params: { courseId: course.id },
										className: "text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-full transition-colors flex items-center gap-1",
										children: ["Manage ", /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" })]
									})]
								})]
							})]
						})]
					}, course.id))
				}) : /* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-12 text-center flex flex-col items-center justify-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "h-16 w-16 bg-secondary rounded-full grid place-items-center mb-4",
							children: /* @__PURE__ */ jsx(Search, { className: "w-6 h-6 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-bold text-foreground",
							children: "No courses found"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground mt-1 max-w-md",
							children: "We couldn't find any courses matching your filters. Try adjusting your search or create a new course."
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => {
								setSearch("");
								setStatusFilter("All");
								setScopeFilter("All");
							},
							className: "mt-6 text-sm font-semibold text-primary hover:underline",
							children: "Clear all filters"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { TrainerCourseListView as component };
