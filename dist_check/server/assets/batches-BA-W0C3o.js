import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Calendar, Edit2, MoreVertical, Play, Plus, Search, Trash2, Users } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/trainer/batches/index.jsx?tsr-split=component
var initialBatches = [
	{
		id: "b1",
		name: "Spring Boot Jan 2026",
		course: "Microservices with Spring Boot",
		students: 45,
		nextSession: "Tomorrow, 10:00 AM",
		status: "Active",
		gradient: "from-blue-600 to-indigo-600"
	},
	{
		id: "b2",
		name: "React Advanced Cohort",
		course: "Advanced React & Next.js",
		students: 32,
		nextSession: "Friday, 2:00 PM",
		status: "Active",
		gradient: "from-purple-600 to-pink-600"
	},
	{
		id: "b3",
		name: "Enterprise Architecture Q2",
		course: "Enterprise Architecture Patterns",
		students: 120,
		nextSession: "Monday, 9:00 AM",
		status: "Upcoming",
		gradient: "from-emerald-600 to-teal-600"
	}
];
function BatchesView() {
	const [search, setSearch] = useState("");
	const [batches, setBatches] = useState(initialBatches);
	const [activeMenuId, setActiveMenuId] = useState(null);
	const filteredBatches = batches.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.course.toLowerCase().includes(search.toLowerCase()));
	const deleteBatch = (id) => {
		if (confirm("Are you sure you want to delete this batch?")) {
			setBatches(batches.filter((b) => b.id !== id));
			toast.error("Batch deleted.");
		}
		setActiveMenuId(null);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(ModuleHeroBanner, {
				breadcrumb: "Dashboard / Batches",
				title: "Batches & Scheduling",
				subtitle: "Manage student cohorts, view schedules, and launch live sessions.",
				actions: /* @__PURE__ */ jsxs("button", {
					onClick: () => toast.info("Opening Batch Creator..."),
					className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
					children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), " Create Batch"]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative w-full sm:max-w-sm",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
						type: "text",
						placeholder: "Search batches by name or course...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: filteredBatches.map((batch) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					className: "group glass border border-border/40 rounded-2xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col",
					children: [/* @__PURE__ */ jsx("div", {
						className: `h-24 bg-gradient-to-r ${batch.gradient} p-4 flex flex-col justify-between relative`,
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between relative z-10",
							children: [/* @__PURE__ */ jsx("span", {
								className: "bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider",
								children: batch.status
							}), /* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => setActiveMenuId(activeMenuId === batch.id ? null : batch.id),
									className: "h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white grid place-items-center cursor-pointer transition-colors",
									children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4" })
								}), /* @__PURE__ */ jsx(AnimatePresence, { children: activeMenuId === batch.id && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
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
									className: "absolute right-0 mt-1 w-48 rounded-xl glass-strong border shadow-lg z-20 py-1.5",
									children: [
										/* @__PURE__ */ jsxs("button", {
											onClick: () => {
												setActiveMenuId(null);
												toast.success("Live session launched!");
											},
											className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ jsx(Play, { className: "w-3.5 h-3.5 text-emerald-500" }), "Launch Live Session"]
										}),
										/* @__PURE__ */ jsxs("button", {
											onClick: () => {
												setActiveMenuId(null);
												toast.info("Opening Edit Dialog...");
											},
											className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ jsx(Edit2, { className: "w-3.5 h-3.5 text-blue-500" }), "Edit Batch Info"]
										}),
										/* @__PURE__ */ jsx("hr", { className: "my-1 border-border/40" }),
										/* @__PURE__ */ jsxs("button", {
											onClick: () => deleteBatch(batch.id),
											className: "w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2 cursor-pointer",
											children: [/* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }), "Delete Batch"]
										})
									]
								})] }) })]
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5 flex-1 flex flex-col justify-between space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-bold text-lg leading-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors",
								children: batch.name
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs font-medium text-muted-foreground mt-1 line-clamp-1",
								children: ["Course: ", batch.course]
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between text-sm bg-secondary/30 p-3 rounded-xl border border-border/40",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(Users, { className: "w-4 h-4 text-primary" }),
											/* @__PURE__ */ jsx("span", {
												className: "font-bold text-foreground",
												children: batch.students
											}),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs text-muted-foreground",
												children: "Students"
											})
										]
									}), /* @__PURE__ */ jsx("div", {
										className: "flex -space-x-2",
										children: [
											1,
											2,
											3
										].map((i) => /* @__PURE__ */ jsxs("div", {
											className: "w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[8px] font-bold",
											children: ["S", i]
										}, i))
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-xs font-medium bg-primary/5 text-primary p-2.5 rounded-xl border border-primary/20",
									children: [/* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }), /* @__PURE__ */ jsxs("span", { children: ["Next: ", batch.nextSession] })]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-2 pt-2 border-t border-border/40",
								children: [/* @__PURE__ */ jsxs("button", {
									onClick: () => toast.info("Opening Schedule"),
									className: "flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5" }), " Schedule"]
								}), /* @__PURE__ */ jsxs("button", {
									onClick: () => toast.info("Opening Roster"),
									className: "flex-1 border hover:bg-secondary text-foreground text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ jsx(Users, { className: "w-3.5 h-3.5" }), " Roster"]
								})]
							})
						]
					})]
				}, batch.id))
			}),
			filteredBatches.length === 0 && /* @__PURE__ */ jsx("div", {
				className: "glass rounded-2xl p-12 text-center",
				children: /* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground",
					children: "No batches found matching your search."
				})
			})
		]
	});
}
//#endregion
export { BatchesView as component };
