import { t as PermissionGuard } from "./permission-guard-CVDo8sNM.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Activity, BookOpen, Calendar, CalendarCheck, Clock, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "sonner";
//#region src/routes/trainer/index.jsx?tsr-split=component
var analyticsData = {
	Weekly: [
		{
			name: "Mon",
			attendance: 85,
			engagement: 70
		},
		{
			name: "Tue",
			attendance: 90,
			engagement: 82
		},
		{
			name: "Wed",
			attendance: 88,
			engagement: 75
		},
		{
			name: "Thu",
			attendance: 92,
			engagement: 85
		},
		{
			name: "Fri",
			attendance: 95,
			engagement: 90
		}
	],
	Monthly: [
		{
			name: "Week 1",
			attendance: 85,
			engagement: 75
		},
		{
			name: "Week 2",
			attendance: 88,
			engagement: 78
		},
		{
			name: "Week 3",
			attendance: 92,
			engagement: 85
		},
		{
			name: "Week 4",
			attendance: 94,
			engagement: 88
		}
	]
};
var mockActivities = [
	{
		id: 1,
		type: "submission",
		user: "Alice Johnson",
		detail: "submitted 'Assignment 2 - Docker Setup'",
		time: "12 mins ago"
	},
	{
		id: 2,
		type: "discussion",
		user: "Vikram Dev",
		detail: "asked a question in 'Microservices'",
		time: "45 mins ago"
	},
	{
		id: 3,
		type: "system",
		user: "System",
		detail: "Your batch 'Cohort 4' is starting soon",
		time: "2 hours ago"
	},
	{
		id: 4,
		type: "evaluation",
		user: "You",
		detail: "graded Bob Smith's Spring Boot Quiz",
		time: "5 hours ago"
	}
];
var mockSessions = {
	"2026-06-24": [{
		id: 1,
		time: "10:00 AM",
		title: "Advanced Web Architecture",
		batch: "Batch A",
		room: "Virtual Room 1"
	}, {
		id: 2,
		time: "02:00 PM",
		title: "React Context API",
		batch: "Batch B",
		room: "Virtual Room 2"
	}],
	"2026-06-25": [{
		id: 3,
		time: "11:30 AM",
		title: "Docker Containerization Lab",
		batch: "Cohort 4",
		room: "Offline Lab 1"
	}]
};
function StatCard({ title, value, icon: Icon, trend, trendUp, glowColor }) {
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .3 },
		className: "glass rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-all duration-300",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all pointer-events-none duration-300",
				children: /* @__PURE__ */ jsx(Icon, { className: `w-16 h-16 ${glowColor}` })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between text-muted-foreground",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-semibold text-xs uppercase tracking-wider",
					children: title
				}), /* @__PURE__ */ jsx("div", {
					className: `p-2 rounded-xl bg-card border border-border/40 text-primary`,
					children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" })
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-3xl font-extrabold font-display text-foreground tracking-tight",
					children: value
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1.5 mt-2",
					children: [/* @__PURE__ */ jsxs("span", {
						className: `flex items-center text-xs font-bold ${trendUp ? "text-emerald-500" : "text-amber-500"}`,
						children: [/* @__PURE__ */ jsx(TrendingUp, { className: `w-3.5 h-3.5 ${!trendUp && "rotate-180"}` }), trend]
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[10px] text-muted-foreground",
						children: "vs last month"
					})]
				})]
			})
		]
	});
}
function TrainerDashboard() {
	const [analyticsTab, setAnalyticsTab] = useState("Weekly");
	const [selectedDate, setSelectedDate] = useState("2026-06-24");
	const [activeModal, setActiveModal] = useState(null);
	const [loadingAction, setLoadingAction] = useState(false);
	return /* @__PURE__ */ jsx(PermissionGuard, {
		required: "course.read",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "relative overflow-hidden rounded-3xl border border-border/30 shadow-elegant",
					style: {
						background: "var(--hero-banner-bg)",
						minHeight: "170px"
					},
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 pointer-events-none dark:opacity-0 transition-opacity duration-500",
							style: { background: "linear-gradient(135deg, oklch(0.94 0.06 320 / 0.9) 0%, oklch(0.97 0.03 260 / 0.85) 40%, oklch(0.93 0.08 200 / 0.8) 100%)" }
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500",
							style: { background: "linear-gradient(135deg, oklch(0.16 0.06 310) 0%, oklch(0.14 0.04 260) 50%, oklch(0.15 0.05 200) 100%)" }
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute -left-16 -top-16 w-72 h-72 rounded-full pointer-events-none",
							style: {
								background: "radial-gradient(circle, oklch(0.55 0.22 320 / 0.35) 0%, transparent 70%)",
								filter: "blur(40px)"
							}
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute -right-10 -bottom-10 w-64 h-64 rounded-full pointer-events-none",
							style: {
								background: "radial-gradient(circle, oklch(0.72 0.18 200 / 0.28) 0%, transparent 70%)",
								filter: "blur(50px)"
							}
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]",
							style: {
								backgroundImage: "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
								backgroundSize: "28px 28px"
							}
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 sm:p-8",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest",
										style: { color: "oklch(0.55 0.16 320)" },
										children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }), "Dashboard / Trainer"]
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
										className: "text-3xl sm:text-4xl font-extrabold font-display tracking-tight",
										style: {
											background: "linear-gradient(135deg, var(--color-foreground) 0%, oklch(0.6 0.22 320) 60%, oklch(0.72 0.18 200) 100%)",
											WebkitBackgroundClip: "text",
											WebkitTextFillColor: "transparent",
											backgroundClip: "text"
										},
										children: "Trainer Dashboard"
									}), /* @__PURE__ */ jsx(motion.div, {
										animate: {
											scaleX: [
												.9,
												1.05,
												.9
											],
											opacity: [
												.7,
												1,
												.7
											]
										},
										transition: {
											duration: 3.5,
											repeat: Infinity,
											ease: "easeInOut"
										},
										className: "h-[2.5px] w-52 rounded-full mt-2.5 origin-left",
										style: { background: "linear-gradient(90deg, oklch(0.55 0.22 320), oklch(0.72 0.18 200), transparent)" }
									})] }),
									/* @__PURE__ */ jsx("p", {
										className: "text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed pt-0.5",
										children: "Welcome back. Monitor your batches, upcoming sessions, and pending evaluations."
									})
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "z-10 shrink-0 flex flex-col items-end gap-2",
								children: /* @__PURE__ */ jsxs(motion.span, {
									animate: { boxShadow: [
										"0 0 0px oklch(0.55 0.22 320 / 0)",
										"0 0 16px oklch(0.55 0.22 320 / 0.35)",
										"0 0 0px oklch(0.55 0.22 320 / 0)"
									] },
									transition: {
										duration: 3,
										repeat: Infinity
									},
									className: "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border backdrop-blur-md",
									style: {
										background: "oklch(0.55 0.18 320 / 0.12)",
										borderColor: "oklch(0.55 0.18 320 / 0.30)",
										color: "oklch(0.55 0.2 320)"
									},
									children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_oklch(0.7_0.2_145)]" }), "Trainer • University of Technology • Online"]
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ jsx(StatCard, {
							title: "Active Courses",
							value: "12",
							icon: BookOpen,
							trend: "+2 new",
							trendUp: true,
							glowColor: "text-purple-500"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							title: "Active Batches",
							value: "8",
							icon: CalendarCheck,
							trend: "+1 new",
							trendUp: true,
							glowColor: "text-teal-500"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							title: "Total Students",
							value: "342",
							icon: Users,
							trend: "+18% growth",
							trendUp: true,
							glowColor: "text-cyan-500"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							title: "Pending Evaluations",
							value: "24",
							icon: Clock,
							trend: "-4 pending",
							trendUp: false,
							glowColor: "text-amber-500"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-2 glass rounded-2xl p-6 flex flex-col justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-bold text-foreground",
								children: "Class Engagement"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: "Monitor student attendance and assignment submissions."
							})] }), /* @__PURE__ */ jsx("div", {
								className: "flex items-center p-1 rounded-full bg-secondary/80 border border-border/40",
								children: Object.keys(analyticsData).map((tab) => /* @__PURE__ */ jsx("button", {
									onClick: () => setAnalyticsTab(tab),
									className: `px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${analyticsTab === tab ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`,
									children: tab
								}, tab))
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "h-72 w-full mt-4",
							children: /* @__PURE__ */ jsx(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ jsxs(AreaChart, {
									data: analyticsData[analyticsTab],
									margin: {
										top: 10,
										right: 10,
										left: -20,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
											id: "colorAtt",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ jsx("stop", {
												offset: "5%",
												stopColor: "oklch(0.38 0.14 335)",
												stopOpacity: .4
											}), /* @__PURE__ */ jsx("stop", {
												offset: "95%",
												stopColor: "oklch(0.38 0.14 335)",
												stopOpacity: 0
											})]
										}), /* @__PURE__ */ jsxs("linearGradient", {
											id: "colorEng",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ jsx("stop", {
												offset: "5%",
												stopColor: "oklch(0.78 0.14 200)",
												stopOpacity: .4
											}), /* @__PURE__ */ jsx("stop", {
												offset: "95%",
												stopColor: "oklch(0.78 0.14 200)",
												stopOpacity: 0
											})]
										})] }),
										/* @__PURE__ */ jsx(CartesianGrid, {
											strokeDasharray: "3 3",
											vertical: false,
											stroke: "var(--border)",
											opacity: .3
										}),
										/* @__PURE__ */ jsx(XAxis, {
											dataKey: "name",
											stroke: "var(--muted-foreground)",
											fontSize: 11,
											tickLine: false
										}),
										/* @__PURE__ */ jsx(YAxis, {
											stroke: "var(--muted-foreground)",
											fontSize: 11,
											tickLine: false
										}),
										/* @__PURE__ */ jsx(Tooltip, { contentStyle: {
											background: "var(--card)",
											borderColor: "var(--border)",
											borderRadius: "12px"
										} }),
										/* @__PURE__ */ jsx(Area, {
											type: "monotone",
											dataKey: "attendance",
											stroke: "oklch(0.38 0.14 335)",
											strokeWidth: 2.5,
											fillOpacity: 1,
											fill: "url(#colorAtt)"
										}),
										/* @__PURE__ */ jsx(Area, {
											type: "monotone",
											dataKey: "engagement",
											stroke: "oklch(0.78 0.14 200)",
											strokeWidth: 2,
											fillOpacity: 1,
											fill: "url(#colorEng)"
										})
									]
								})
							})
						})] }), /* @__PURE__ */ jsx("div", {
							className: "flex flex-wrap items-center justify-between border-t border-border/40 pt-4 mt-4 gap-4",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-primary" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground font-semibold",
										children: "Average Attendance (%)"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-accent" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground font-semibold",
										children: "Average Engagement (%)"
									})]
								})]
							})
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "glass rounded-2xl p-6 flex flex-col justify-between",
						children: /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-lg font-bold text-foreground",
									children: "Upcoming Sessions"
								}), /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-primary" })]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-7 gap-1 text-center text-xs mb-4 border-b border-border/40 pb-2",
								children: [
									{
										day: 21,
										dateStr: "2026-06-21"
									},
									{
										day: 22,
										dateStr: "2026-06-22"
									},
									{
										day: 23,
										dateStr: "2026-06-23"
									},
									{
										day: 24,
										dateStr: "2026-06-24",
										hasSessions: true
									},
									{
										day: 25,
										dateStr: "2026-06-25",
										hasSessions: true
									},
									{
										day: 26,
										dateStr: "2026-06-26"
									},
									{
										day: 27,
										dateStr: "2026-06-27"
									}
								].map((day) => {
									const isSelected = selectedDate === day.dateStr;
									return /* @__PURE__ */ jsxs("button", {
										onClick: () => setSelectedDate(day.dateStr),
										className: `h-8 w-8 mx-auto rounded-full flex items-center justify-center relative transition-all cursor-pointer font-bold ${isSelected ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-secondary text-foreground"}`,
										children: [/* @__PURE__ */ jsx("span", { children: day.day }), day.hasSessions && !isSelected && /* @__PURE__ */ jsx("span", { className: "absolute bottom-0.5 h-1 w-1 rounded-full bg-accent" })]
									}, day.day);
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "space-y-3",
								children: mockSessions[selectedDate] ? mockSessions[selectedDate].map((session) => /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex justify-between items-start gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-xs font-bold text-primary",
												children: session.time
											}), /* @__PURE__ */ jsx("span", {
												className: "text-[9px] uppercase font-bold bg-secondary px-1.5 py-0.5 rounded text-muted-foreground",
												children: session.room
											})]
										}),
										/* @__PURE__ */ jsx("h4", {
											className: "text-sm font-semibold text-foreground mt-1",
											children: session.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground mt-0.5",
											children: session.batch
										})
									]
								}, session.id)) : /* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-2 p-4 rounded-xl bg-secondary/20 border border-dashed text-center justify-center",
									children: /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground",
										children: "No sessions scheduled."
									})
								})
							})
						] })
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "glass rounded-2xl p-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-lg font-bold text-foreground",
								children: "Recent Activity"
							}), /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-accent" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-4",
							children: mockActivities.map((act) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-3 p-3 rounded-xl bg-card/45 hover:bg-card/90 transition-colors border border-border/30",
								children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary mt-1.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
									className: "text-sm font-medium text-foreground",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold",
											children: act.user
										}),
										" ",
										act.detail
									]
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] text-muted-foreground",
									children: act.time
								})] })]
							}, act.id))
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "glass rounded-2xl p-6",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-foreground mb-4",
							children: "Pending Evaluations"
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-3",
							children: [{
								student: "Alice Johnson",
								task: "Docker Architecture Essay",
								deadline: "Today, 5 PM",
								delay: "critical"
							}, {
								student: "Bob Smith",
								task: "React Quiz",
								deadline: "Tomorrow",
								delay: "warning"
							}].map((task, idx) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between p-3 rounded-xl bg-card border border-border/40",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
									className: "text-sm font-semibold text-foreground",
									children: task.student
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: task.task
								})] }), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-500/10 text-red-500",
									children: task.deadline
								})]
							}, idx))
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { TrainerDashboard as component };
