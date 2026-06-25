import { t as PermissionGuard } from "./permission-guard-CVDo8sNM.js";
import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Clock, Filter, Search, Shield, ShieldAlert, Trash2, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/manager/courses/index.jsx?tsr-split=component
var mockCourses = [
	{
		id: "c1",
		code: "CS-402",
		title: "Enterprise Architecture Patterns",
		subject: "Software Engineering",
		category: "Architecture",
		status: "Published",
		duration: "12h 30m",
		students: 124,
		gradient: "from-purple-600 to-indigo-600",
		deleteRequested: false
	},
	{
		id: "c2",
		code: "CS-501",
		title: "Advanced React & Next.js",
		subject: "Web Development",
		category: "Programming",
		status: "Draft",
		duration: "8h 15m",
		students: 0,
		gradient: "from-cyan-600 to-blue-600",
		deleteRequested: true
	},
	{
		id: "c3",
		code: "CS-308",
		title: "Microservices with Spring Boot",
		subject: "Backend Systems",
		category: "Architecture",
		status: "Published",
		duration: "15h 0m",
		students: 89,
		gradient: "from-pink-600 to-rose-600",
		deleteRequested: false
	}
];
function ManagerCoursesView() {
	const [courses, setCourses] = useState(mockCourses);
	const [search, setSearch] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [governanceModalOpen, setGovernanceModalOpen] = useState(false);
	const [courseToGovern, setCourseToGovern] = useState(null);
	const filteredCourses = courses.filter((c) => {
		const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
		return matchesSearch && matchesCategory;
	});
	const requestDelete = (e) => {
		e.preventDefault();
		setCourses(courses.map((c) => {
			if (c.id === courseToGovern.id) return {
				...c,
				deleteRequested: true
			};
			return c;
		}));
		toast.success("Deletion request sent to Admin for approval.");
		setGovernanceModalOpen(false);
	};
	const cancelDeleteRequest = (id) => {
		setCourses(courses.map((c) => {
			if (c.id === id) return {
				...c,
				deleteRequested: false
			};
			return c;
		}));
		toast.info("Deletion request cancelled.");
	};
	return /* @__PURE__ */ jsx(PermissionGuard, {
		required: "course.read",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
			children: [
				/* @__PURE__ */ jsx(ModuleHeroBanner, {
					breadcrumb: "Dashboard / Oversight / Courses",
					title: "Course Governance",
					subtitle: "Oversee active curriculum, review metrics, and request governed structural changes.",
					actions: /* @__PURE__ */ jsxs("div", {
						className: "bg-amber-500/10 text-amber-600 border border-amber-500/20 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(ShieldAlert, { className: "w-4 h-4" }), " Manager Governance Mode Active"]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative w-full md:max-w-sm",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							placeholder: "Search course title or code...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background",
						children: [/* @__PURE__ */ jsx(Filter, { className: "w-3.5 h-3.5 text-muted-foreground" }), /* @__PURE__ */ jsxs("select", {
							value: categoryFilter,
							onChange: (e) => setCategoryFilter(e.target.value),
							className: "bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "All",
									className: "bg-card text-foreground",
									children: "All Categories"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Architecture",
									className: "bg-card text-foreground",
									children: "Architecture"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Programming",
									className: "bg-card text-foreground",
									children: "Programming"
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "glass rounded-2xl overflow-hidden border border-border/40",
					children: /* @__PURE__ */ jsx("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-left border-collapse",
							children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
								className: "border-b border-border/40 bg-secondary/30",
								children: [
									/* @__PURE__ */ jsx("th", {
										className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
										children: "Course"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
										children: "Category"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
										children: "Metrics"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
										children: "Status"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right",
										children: "Governance Actions"
									})
								]
							}) }), /* @__PURE__ */ jsx("tbody", {
								className: "divide-y divide-border/20",
								children: filteredCourses.map((course) => /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-secondary/10 transition-colors",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "p-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("div", {
													className: `w-10 h-10 rounded-lg bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white font-bold text-xs shadow-sm`,
													children: course.code.split("-")[1]
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "font-bold text-sm text-foreground",
													children: course.title
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground",
													children: course.code
												})] })]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "p-4",
											children: /* @__PURE__ */ jsx("span", {
												className: "bg-secondary px-2.5 py-1 rounded-md text-xs font-semibold text-muted-foreground",
												children: course.category
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "p-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1",
													children: [
														/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-primary" }),
														" ",
														course.duration
													]
												}), /* @__PURE__ */ jsxs("span", {
													className: "flex items-center gap-1",
													children: [
														/* @__PURE__ */ jsx(Users, { className: "w-3.5 h-3.5 text-blue-500" }),
														" ",
														course.students
													]
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "p-4",
											children: course.deleteRequested ? /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20",
												children: [/* @__PURE__ */ jsx(ShieldAlert, { className: "w-3 h-3" }), " Deletion Pending"]
											}) : /* @__PURE__ */ jsx("span", {
												className: `inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${course.status === "Published" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"}`,
												children: course.status
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "p-4 text-right",
											children: course.deleteRequested ? /* @__PURE__ */ jsx("button", {
												onClick: () => cancelDeleteRequest(course.id),
												className: "text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer",
												children: "Cancel Request"
											}) : /* @__PURE__ */ jsx("button", {
												onClick: () => {
													setCourseToGovern(course);
													setGovernanceModalOpen(true);
												},
												className: "h-8 w-8 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white grid place-items-center transition-all cursor-pointer ml-auto",
												title: "Request Deletion",
												children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
											})
										})
									]
								}, course.id))
							})]
						})
					})
				}),
				/* @__PURE__ */ jsx(AnimatePresence, { children: governanceModalOpen && courseToGovern && /* @__PURE__ */ jsx(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: { scale: .95 },
						animate: { scale: 1 },
						exit: { scale: .95 },
						className: "w-full max-w-md glass rounded-2xl p-6 relative border-red-500/20",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => setGovernanceModalOpen(false),
								className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
								children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
							}),
							/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4",
								children: /* @__PURE__ */ jsx(Shield, { className: "w-6 h-6 text-red-500" })
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-bold font-display mb-2",
								children: "Request Course Deletion"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-muted-foreground mb-4",
								children: [
									"Destructive actions are governed by the Administrator. Submitting this request will flag ",
									/* @__PURE__ */ jsx("strong", { children: courseToGovern.title }),
									" for deletion pending an Admin's approval."
								]
							}),
							/* @__PURE__ */ jsx("form", {
								onSubmit: requestDelete,
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Reason for Deletion"
									}), /* @__PURE__ */ jsx("textarea", {
										required: true,
										rows: 3,
										placeholder: "Please explain why this course should be removed...",
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-red-500"
									})] }), /* @__PURE__ */ jsxs("div", {
										className: "flex gap-3 mt-6",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setGovernanceModalOpen(false),
											className: "flex-1 py-2.5 rounded-xl text-sm font-semibold border hover:bg-secondary transition-colors cursor-pointer",
											children: "Cancel"
										}), /* @__PURE__ */ jsx("button", {
											type: "submit",
											className: "flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer",
											children: "Submit Request"
										})]
									})]
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
export { ManagerCoursesView as component };
