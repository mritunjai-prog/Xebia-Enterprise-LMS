import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BarChart2, CheckCircle, Download, File, FileSpreadsheet, FileText, Settings, TrendingUp, Users } from "lucide-react";
import "framer-motion";
import { toast } from "sonner";
//#region src/routes/organiser/reports/index.jsx?tsr-split=component
var reportTypes = [
	{
		id: "grades",
		name: "Student Performance Gradebook",
		desc: "Aggregated exam, quiz, and lab task score sheets."
	},
	{
		id: "attendance",
		name: "Batch Attendance Logs",
		desc: "Detailed classroom check-in logs and absenteeism rates."
	},
	{
		id: "engagement",
		name: "Course Engagement Summary",
		desc: "Video lecture retention, library downloads, and forum rates."
	},
	{
		id: "completion",
		name: "Curriculum Completion Index",
		desc: "Tracking students who completed all module requirements."
	}
];
function ReportsView() {
	const [selectedReport, setSelectedReport] = useState("grades");
	const [scope, setScope] = useState("All");
	const [batch, setBatch] = useState("All");
	const [dateRange, setDateRange] = useState("30");
	const [exportColumns, setExportColumns] = useState({
		uid: true,
		name: true,
		email: true,
		grade: true,
		attendance: true,
		activeHours: false
	});
	const [exportType, setExportType] = useState(null);
	const [progress, setProgress] = useState(0);
	const handleExport = (type) => {
		if (exportType) return;
		setExportType(type);
		setProgress(0);
		const interval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + 20;
				if (next >= 100) {
					clearInterval(interval);
					setTimeout(() => {
						setExportType(null);
						setProgress(0);
						toast.success(`Report compiled! Downloaded as ${selectedReport}_export.${type === "excel" ? "xlsx" : type}`, { icon: /* @__PURE__ */ jsx(CheckCircle, { className: "text-emerald-500" }) });
					}, 400);
					return 100;
				}
				return next;
			});
		}, 250);
	};
	const toggleColumn = (col) => {
		setExportColumns({
			...exportColumns,
			[col]: !exportColumns[col]
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(ModuleHeroBanner, {
				breadcrumb: "Dashboard / Reports",
				title: "Analytics & Report Compiler",
				subtitle: "Configure custom query schemas, select data fields, and compile exports.",
				actions: /* @__PURE__ */ jsxs("button", {
					onClick: () => handleExport("pdf"),
					disabled: !!exportType,
					className: "btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
					children: [/* @__PURE__ */ jsx(Download, { className: "w-4 h-4 animate-bounce" }), " Generate Full Report"]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [
					{
						label: "Avg. Assessment Score",
						value: "82%",
						note: "+4.2% vs last cohort semester",
						icon: TrendingUp,
						color: "text-primary",
						bg: "bg-primary/10"
					},
					{
						label: "Classroom Attendance",
						value: "94%",
						note: "Averaged across all active batches",
						icon: Users,
						color: "text-accent",
						bg: "bg-accent/10"
					},
					{
						label: "Course Completion",
						value: "68%",
						note: "Passed all syllabus module checkpoints",
						icon: BarChart2,
						color: "text-blue-500",
						bg: "bg-blue-500/10"
					}
				].map((stat) => /* @__PURE__ */ jsxs("div", {
					className: "glass rounded-xl p-6 border border-border/40 hover:border-primary/20 transition-all duration-200",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 mb-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: `p-2 rounded-lg ${stat.bg} ${stat.color}`,
								children: /* @__PURE__ */ jsx(stat.icon, { className: "w-4.5 h-4.5" })
							}), /* @__PURE__ */ jsx("h3", {
								className: "font-bold text-xs uppercase tracking-wider text-muted-foreground",
								children: stat.label
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-4xl font-extrabold font-display text-foreground tracking-tight",
							children: stat.value
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-[10px] text-muted-foreground mt-2 font-semibold",
							children: stat.note
						})
					]
				}, stat.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-2 glass rounded-2xl p-6 space-y-5 border-border/40",
					children: [
						/* @__PURE__ */ jsxs("h2", {
							className: "text-base font-bold text-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(Settings, { className: "w-4.5 h-4.5 text-primary animate-spin" }), " Query Configuration"]
						}),
						/* @__PURE__ */ jsx("hr", { className: "border-border/30" }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
								children: "Select Report Segment"
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-2",
								children: reportTypes.map((t) => /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => setSelectedReport(t.id),
									className: `w-full text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${selectedReport === t.id ? "bg-primary/10 border-primary text-primary" : "bg-card border-border/40 hover:bg-secondary/40 text-foreground"}`,
									children: [/* @__PURE__ */ jsx("span", { children: t.name }), /* @__PURE__ */ jsx("span", {
										className: "block text-[10px] text-muted-foreground font-medium mt-0.5",
										children: t.desc
									})]
								}, t.id))
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
										children: "University Partner Scope"
									}), /* @__PURE__ */ jsxs("select", {
										value: scope,
										onChange: (e) => setScope(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs cursor-pointer focus:border-primary",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "All",
												children: "All Scopes"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "University of Tech",
												children: "University of Tech"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Central Academy",
												children: "Central Academy"
											})
										]
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
										children: "Target Batch"
									}), /* @__PURE__ */ jsxs("select", {
										value: batch,
										onChange: (e) => setBatch(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs cursor-pointer focus:border-primary",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "All",
												children: "All Active Batches"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Spring Boot Jan 2026",
												children: "Spring Boot Jan 2026"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "React Advanced Cohort",
												children: "React Advanced Cohort"
											})
										]
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
										children: "Timeline Interval"
									}), /* @__PURE__ */ jsxs("select", {
										value: dateRange,
										onChange: (e) => setDateRange(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs cursor-pointer focus:border-primary",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "30",
												children: "Last 30 Days"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "90",
												children: "Last 90 Days"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "365",
												children: "Last 365 Days"
											})
										]
									})] })
								]
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-6 border-border/40 flex flex-col justify-between h-fit space-y-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-base font-bold text-foreground",
								children: "Include Fields"
							}),
							/* @__PURE__ */ jsx("hr", { className: "border-border/30" }),
							/* @__PURE__ */ jsx("div", {
								className: "space-y-2",
								children: [
									{
										id: "uid",
										label: "Student UID Roll"
									},
									{
										id: "name",
										label: "Student Full Name"
									},
									{
										id: "email",
										label: "Email Address"
									},
									{
										id: "grade",
										label: "Assessment Grade Scores"
									},
									{
										id: "attendance",
										label: "Attendance Ratios"
									},
									{
										id: "activeHours",
										label: "Active Portal Hours Log"
									}
								].map((col) => /* @__PURE__ */ jsxs("label", {
									className: "flex items-center justify-between p-2.5 rounded-xl border border-border/40 bg-card hover:bg-secondary/40 transition-colors cursor-pointer text-xs font-bold text-foreground",
									children: [/* @__PURE__ */ jsx("span", { children: col.label }), /* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: exportColumns[col.id],
										onChange: () => toggleColumn(col.id),
										className: "accent-primary h-4 w-4 rounded"
									})]
								}, col.id))
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-2.5",
						children: exportType ? /* @__PURE__ */ jsxs("div", {
							className: "p-3 bg-secondary/35 rounded-xl border border-border/40 text-center space-y-2",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-center text-xs font-bold text-primary",
								children: [/* @__PURE__ */ jsx("span", { children: "Compiling Export..." }), /* @__PURE__ */ jsxs("span", { children: [progress, "%"] })]
							}), /* @__PURE__ */ jsx("div", {
								className: "w-full h-1.5 bg-card border rounded-full overflow-hidden",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full bg-primary transition-all duration-200",
									style: { width: `${progress}%` }
								})
							})]
						}) : /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsxs("button", {
								onClick: () => handleExport("pdf"),
								className: "w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border bg-card hover:bg-secondary/40 text-foreground transition-colors cursor-pointer",
								children: [/* @__PURE__ */ jsx(File, { className: "w-3.5 h-3.5 text-red-500" }), " Export Document (.pdf)"]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => handleExport("excel"),
								className: "w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border bg-card hover:bg-secondary/40 text-foreground transition-colors cursor-pointer",
								children: [/* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-3.5 h-3.5 text-emerald-500" }), " Export Spreadsheet (.xlsx)"]
							}),
							/* @__PURE__ */ jsxs("button", {
								onClick: () => handleExport("csv"),
								className: "w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border bg-card hover:bg-secondary/40 text-foreground transition-colors cursor-pointer",
								children: [/* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-blue-500" }), " Export CSV Spreadsheet (.csv)"]
							})
						] })
					})]
				})]
			})
		]
	});
}
//#endregion
export { ReportsView as component };
