import { t as PermissionGuard } from "./permission-guard-CVDo8sNM.js";
import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, Check, Clock, Edit2, Filter, MoreVertical, Plus, Search, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/organiser/courses/index.jsx?tsr-split=component
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
		gradient: "from-pink-600 to-rose-600",
		image: "/courses/spring_boot.png"
	},
	{
		id: "c4",
		code: "CS-205",
		title: "Distributed Databases & SQL",
		subject: "Data Systems",
		university: "Corporate Learning Hub",
		status: "Published",
		batches: 1,
		students: 45,
		duration: "10h 45m",
		updated: "2026-06-18",
		gradient: "from-teal-600 to-emerald-600",
		image: "/courses/databases_sql.png"
	}
];
function CourseListView() {
	const [courses, setCourses] = useState(initialCourses);
	const [search, setSearch] = useState("");
	const [scopeFilter, setScopeFilter] = useState("All");
	const [statusFilter, setStatusFilter] = useState("All");
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [activeMenuId, setActiveMenuId] = useState(null);
	const [newTitle, setNewTitle] = useState("");
	const [newCode, setNewCode] = useState("");
	const [newSubject, setNewSubject] = useState("");
	const [newCategory, setNewCategory] = useState("");
	const [newScope, setNewScope] = useState("");
	const [newDuration, setNewDuration] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleCreateCourse = (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setCourses([{
				id: `c${courses.length + 1}`,
				code: newCode || "CS-NEW",
				title: newTitle,
				subject: newSubject || "Web Development",
				university: newScope || "University of Technology",
				status: "Draft",
				batches: 0,
				students: 0,
				duration: `${newDuration || 10}h 0m`,
				updated: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				gradient: "from-amber-600 to-orange-600",
				image: newSubject.toLowerCase().includes("data") ? "/courses/databases_sql.png" : newSubject.toLowerCase().includes("back") || newSubject.toLowerCase().includes("spring") ? "/courses/spring_boot.png" : newSubject.toLowerCase().includes("react") || newSubject.toLowerCase().includes("web") ? "/courses/react_nextjs.png" : "/courses/enterprise_architecture.png"
			}, ...courses]);
			setIsSubmitting(false);
			setIsCreateOpen(false);
			setNewTitle("");
			setNewCode("");
			setNewSubject("");
			setNewCategory("");
			setNewScope("");
			setNewDuration("");
			toast.success("Course shell created! Redirecting to outline editor...");
		}, 1e3);
	};
	const togglePublish = (id) => {
		setCourses(courses.map((c) => {
			if (c.id === id) {
				const nextStatus = c.status === "Published" ? "Draft" : "Published";
				toast.success(`Course status updated to ${nextStatus}`);
				return {
					...c,
					status: nextStatus
				};
			}
			return c;
		}));
		setActiveMenuId(null);
	};
	const deleteCourse = (id) => {
		setCourses(courses.filter((c) => c.id !== id));
		toast.error("Course deleted successfully");
		setActiveMenuId(null);
	};
	const filteredCourses = courses.filter((c) => {
		const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
		const matchesScope = scopeFilter === "All" || c.university === scopeFilter;
		const matchesStatus = statusFilter === "All" || c.status === statusFilter;
		return matchesSearch && matchesScope && matchesStatus;
	});
	return /* @__PURE__ */ jsx(PermissionGuard, {
		required: "course.read",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
			children: [
				/* @__PURE__ */ jsx(ModuleHeroBanner, {
					breadcrumb: "Dashboard / Courses",
					title: "Course Library & Builder",
					subtitle: "Manage syllabus outline, module assets, and configure publishing schemas.",
					actions: /* @__PURE__ */ jsxs("button", {
						onClick: () => setIsCreateOpen(true),
						className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
						children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), " Create Course Shell"]
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
									}),
									/* @__PURE__ */ jsx("option", {
										value: "Corporate Learning Hub",
										className: "bg-card text-foreground",
										style: {
											backgroundColor: "var(--card)",
											color: "var(--foreground)"
										},
										children: "Corporate Learning Hub"
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
												to: "/organiser/courses/$courseId",
												params: { courseId: course.id },
												className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5 text-blue-500" }), "Edit Outline"]
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
								className: "space-y-3 pt-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-primary" }),
												" ",
												course.duration
											]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ jsx(Users, { className: "w-3.5 h-3.5 text-accent" }),
												" ",
												course.students,
												" Students"
											]
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5 text-teal-500" }),
												" ",
												course.batches,
												" Batches"
											]
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "pt-3 border-t border-border/40 flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "text-[9px] uppercase font-bold tracking-wider text-muted-foreground",
										children: ["Edited ", course.updated]
									}), /* @__PURE__ */ jsx(Link, {
										to: "/organiser/courses/$courseId",
										params: { courseId: course.id },
										className: "text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer",
										children: "Syllabus Outline →"
									})]
								})]
							})]
						})]
					}, course.id))
				}) : /* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed",
					children: [
						/* @__PURE__ */ jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground/60 mb-3" }),
						/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-bold text-foreground",
							children: "No Courses Found"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground max-w-sm mt-1",
							children: "Adjust your search keywords or university scopes, or create a new course shell to start authoring."
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setIsCreateOpen(true),
							className: "btn-hero px-4 py-2 rounded-xl text-xs font-bold mt-4 cursor-pointer",
							children: "Create Course Shell"
						})
					]
				}),
				/* @__PURE__ */ jsx(AnimatePresence, { children: isCreateOpen && /* @__PURE__ */ jsx(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							scale: .95,
							y: 15
						},
						animate: {
							scale: 1,
							y: 0
						},
						exit: {
							scale: .95,
							y: 15
						},
						className: "w-full max-w-lg glass rounded-2xl p-6 relative shadow-elegant border-primary/20",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => setIsCreateOpen(false),
								className: "absolute top-4 right-4 h-8 w-8 rounded-full border bg-card hover:bg-secondary grid place-items-center cursor-pointer transition-colors",
								children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-bold font-display text-foreground mb-4",
								children: "Create New Course Shell"
							}),
							/* @__PURE__ */ jsx("form", {
								onSubmit: handleCreateCourse,
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Course Title"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: "e.g. Advanced System Integrations",
											value: newTitle,
											onChange: (e) => setNewTitle(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Course Code"
											}), /* @__PURE__ */ jsx("input", {
												required: true,
												type: "text",
												placeholder: "e.g. CS-440",
												value: newCode,
												onChange: (e) => setNewCode(e.target.value),
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Subject"
											}), /* @__PURE__ */ jsx("input", {
												required: true,
												type: "text",
												placeholder: "e.g. System Security",
												value: newSubject,
												onChange: (e) => setNewSubject(e.target.value),
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] })]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Scope Scope"
											}), /* @__PURE__ */ jsxs("select", {
												value: newScope,
												onChange: (e) => setNewScope(e.target.value),
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "University of Technology",
														children: "University of Tech"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "Central Engineering Academy",
														children: "Central Academy"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "Corporate Learning Hub",
														children: "Corporate Hub"
													})
												]
											})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Category"
											}), /* @__PURE__ */ jsxs("select", {
												required: true,
												value: newCategory,
												onChange: (e) => setNewCategory(e.target.value),
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "",
														disabled: true,
														children: "Select Category"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "Programming",
														children: "Programming"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "Web Development",
														children: "Web Development"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "Architecture",
														children: "Architecture"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "Data Science",
														children: "Data Science"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "DevOps",
														children: "DevOps"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "Soft Skills",
														children: "Soft Skills"
													})
												]
											})] })]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "grid grid-cols-1 gap-4",
											children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Duration (Hours)"
											}), /* @__PURE__ */ jsx("input", {
												required: true,
												type: "number",
												placeholder: "e.g. 12",
												value: newDuration,
												onChange: (e) => setNewDuration(e.target.value),
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] })
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Mock Banner Style"
										}), /* @__PURE__ */ jsx("div", {
											className: "flex gap-2",
											children: [
												"from-purple-600 to-indigo-600",
												"from-cyan-600 to-blue-600",
												"from-pink-600 to-rose-600",
												"from-teal-600 to-emerald-600"
											].map((gradient, idx) => /* @__PURE__ */ jsx("div", { className: `h-8 w-12 rounded bg-gradient-to-r ${gradient} border cursor-pointer border-transparent hover:border-foreground` }, idx))
										})] }),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: isSubmitting,
											className: "w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-4 flex items-center justify-center cursor-pointer",
											children: isSubmitting ? "Creating course..." : "Initialize Course Outline"
										})
									]
								})
							})
						]
					})
				}) })
			]
		})
	});
}
//#endregion
export { CourseListView as component };
