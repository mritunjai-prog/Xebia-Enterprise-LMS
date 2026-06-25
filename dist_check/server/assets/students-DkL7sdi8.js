import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle, Download, FileText, Filter, Mail, MoreVertical, Search, Shield, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/trainer/students/index.jsx?tsr-split=component
var mockStudents = [
	{
		id: "S101",
		name: "Alice Johnson",
		email: "alice@student.tech",
		batch: "Spring Boot Jan 2026",
		progress: 85,
		status: "Active"
	},
	{
		id: "S102",
		name: "Bob Smith",
		email: "bob@student.tech",
		batch: "Spring Boot Jan 2026",
		progress: 42,
		status: "At Risk"
	},
	{
		id: "S103",
		name: "Clara Oswald",
		email: "clara@student.tech",
		batch: "React Advanced Cohort",
		progress: 95,
		status: "Excellent"
	},
	{
		id: "S104",
		name: "David Kim",
		email: "david@student.tech",
		batch: "React Advanced Cohort",
		progress: 68,
		status: "Active"
	},
	{
		id: "S105",
		name: "Emma Watson",
		email: "emma@student.tech",
		batch: "Enterprise Architecture Q2",
		progress: 12,
		status: "Inactive"
	}
];
function StudentsView() {
	const [search, setSearch] = useState("");
	const [activeMenuId, setActiveMenuId] = useState(null);
	const filteredStudents = mockStudents.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.batch.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(ModuleHeroBanner, {
				breadcrumb: "Dashboard / Students",
				title: "Student Roster",
				subtitle: "Track student progress, monitor engagement, and manage your cohorts.",
				actions: /* @__PURE__ */ jsxs("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ jsxs("button", {
						onClick: () => toast.success("Exporting student data..."),
						className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer bg-secondary text-foreground hover:bg-secondary/80 border border-border/50",
						children: [/* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }), " Export CSV"]
					}), /* @__PURE__ */ jsxs("button", {
						onClick: () => toast.info("Opening Message Dialog..."),
						className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
						children: [/* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }), " Message Batch"]
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative w-full md:max-w-sm",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
						type: "text",
						placeholder: "Search students by name, ID, or batch...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full pl-9 pr-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap items-center gap-3 w-full md:w-auto justify-end",
					children: /* @__PURE__ */ jsxs("button", {
						className: "flex items-center gap-2 border border-border/50 rounded-xl px-4 py-2.5 bg-background hover:bg-secondary transition-colors text-sm font-semibold cursor-pointer",
						children: [/* @__PURE__ */ jsx(Filter, { className: "w-4 h-4 text-muted-foreground" }), " Filter List"]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "glass rounded-2xl overflow-hidden border border-border/40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "overflow-x-auto",
					children: [/* @__PURE__ */ jsxs("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "bg-secondary/40 border-b border-border/50",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground w-16",
									children: "ID"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: "Student Name"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: "Batch / Cohort"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: "Course Progress"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-border/30",
							children: filteredStudents.map((student) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-secondary/20 transition-colors group",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap text-sm font-semibold text-muted-foreground",
										children: student.id
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: "h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm",
												children: student.name.charAt(0)
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
												className: "text-sm font-bold text-foreground group-hover:text-primary transition-colors",
												children: student.name
											}), /* @__PURE__ */ jsx("div", {
												className: "text-xs text-muted-foreground",
												children: student.email
											})] })]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap",
										children: /* @__PURE__ */ jsx("span", {
											className: "text-sm font-medium bg-secondary px-2.5 py-1 rounded-md text-foreground",
											children: student.batch
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-full max-w-[120px] bg-secondary rounded-full h-2 overflow-hidden",
												children: /* @__PURE__ */ jsx("div", {
													className: `h-full ${student.progress > 80 ? "bg-emerald-500" : student.progress > 40 ? "bg-primary" : "bg-amber-500"}`,
													style: { width: `${student.progress}%` }
												})
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-xs font-bold text-muted-foreground",
												children: [student.progress, "%"]
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-6 py-4 whitespace-nowrap",
										children: /* @__PURE__ */ jsxs("span", {
											className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${student.status === "Excellent" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : student.status === "At Risk" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : student.status === "Inactive" ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-primary/10 text-primary border-primary/20"}`,
											children: [
												student.status === "Excellent" && /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }),
												student.status === "At Risk" && /* @__PURE__ */ jsx(Shield, { className: "w-3 h-3" }),
												student.status
											]
										})
									}),
									/* @__PURE__ */ jsxs("td", {
										className: "px-6 py-4 whitespace-nowrap text-right relative",
										children: [/* @__PURE__ */ jsx("button", {
											onClick: () => setActiveMenuId(activeMenuId === student.id ? null : student.id),
											className: "h-8 w-8 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground inline-flex items-center justify-center cursor-pointer transition-colors",
											children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4" })
										}), /* @__PURE__ */ jsx(AnimatePresence, { children: activeMenuId === student.id && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
											className: "fixed inset-0 z-10",
											onClick: () => setActiveMenuId(null)
										}), /* @__PURE__ */ jsxs(motion.div, {
											initial: {
												opacity: 0,
												y: 8,
												scale: .95
											},
											animate: {
												opacity: 1,
												y: 0,
												scale: 1
											},
											exit: {
												opacity: 0,
												y: 8,
												scale: .95
											},
											className: "absolute right-12 top-2 mt-1 w-48 rounded-xl glass-strong border shadow-lg z-20 py-1.5",
											children: [
												/* @__PURE__ */ jsxs("button", {
													onClick: () => {
														setActiveMenuId(null);
														toast.info("Opening Profile...");
													},
													className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer",
													children: [/* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5 text-primary" }), "View Full Profile"]
												}),
												/* @__PURE__ */ jsxs("button", {
													onClick: () => {
														setActiveMenuId(null);
														toast.info("Composing Message...");
													},
													className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer",
													children: [/* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 text-blue-500" }), "Direct Message"]
												}),
												/* @__PURE__ */ jsx("hr", { className: "my-1 border-border/40" }),
												/* @__PURE__ */ jsxs("button", {
													onClick: () => {
														setActiveMenuId(null);
														toast.info("Generating Report...");
													},
													className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer",
													children: [/* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-amber-500" }), "Generate Report"]
												})
											]
										})] }) })]
									})
								]
							}, student.id))
						})]
					}), filteredStudents.length === 0 && /* @__PURE__ */ jsx("div", {
						className: "p-12 text-center",
						children: /* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground font-medium",
							children: "No students found matching your filters."
						})
					})]
				})
			})
		]
	});
}
//#endregion
export { StudentsView as component };
