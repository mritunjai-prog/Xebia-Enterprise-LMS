import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-DtCIqy0P.js";
import { f as PageHeader, n as useCompletionData, o as usePerformanceData } from "./manager-data-B87DN6xf.js";
import { t as Skeleton } from "./skeleton-BSi1XvLP.js";
import { t as EnrollmentChart } from "./enrollment-chart-Bu2KULZu.js";
import { t as Button } from "./button-DQGSKKzh.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Award, Clock, Download, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Bar, BarChart as BarChart$1, CartesianGrid, Cell, Legend, Pie, PieChart as PieChart$1, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/components/manager/analytics/completion-chart.js
function CustomTooltip$1({ active, payload }) {
	if (!active || !payload?.length) return null;
	const d = payload[0].payload;
	const pct = Math.round(d.completed / d.total * 100);
	return jsxs("div", {
		className: "rounded-xl border border-[#EDEDED]/60 bg-white p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
		children: [jsx("p", {
			className: "mb-1.5 text-xs font-bold text-[#5A5A5A] uppercase tracking-wider",
			children: d.category
		}), jsxs("p", {
			className: "text-sm font-medium text-[#000000]",
			children: [
				d.completed,
				" / ",
				d.total,
				" completed (",
				jsx("span", {
					className: "font-bold text-[#6C1D5F]",
					children: pct + "%"
				}),
				")"
			]
		})]
	});
}
function CustomLegend({ payload }) {
	return jsx("div", {
		className: "mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2",
		children: payload?.map((entry, i) => jsxs("div", {
			className: "flex items-center gap-2",
			children: [jsx("div", {
				className: "h-3 w-3 rounded-full",
				style: { backgroundColor: entry.color }
			}), jsx("span", {
				className: "text-[13px] font-medium text-[#5A5A5A]",
				children: entry.value
			})]
		}, i))
	});
}
function CompletionChart() {
	const { data, isLoading } = useCompletionData();
	const pieData = data?.map((d) => ({
		...d,
		name: d.category,
		value: d.completed
	}));
	return jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .4,
			delay: .1
		},
		children: jsxs(Card, {
			className: "overflow-hidden rounded-2xl border border-[#EDEDED]/60 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
			children: [jsx(CardHeader, {
				className: "border-b border-[#EDEDED]/40 bg-[#F7F7F8]/30 px-6 py-5",
				children: jsx(CardTitle, {
					className: "text-[17px] font-bold text-[#000000]",
					children: "Completion by Category"
				})
			}), jsx(CardContent, {
				className: "p-6",
				children: isLoading ? jsx(Skeleton, { className: "mx-auto h-[320px] w-full rounded-xl" }) : jsx(ResponsiveContainer, {
					width: "100%",
					height: 320,
					children: jsxs(PieChart$1, { children: [
						jsx(Pie, {
							data: pieData,
							cx: "50%",
							cy: "45%",
							innerRadius: 70,
							outerRadius: 115,
							paddingAngle: 4,
							dataKey: "value",
							stroke: "none",
							children: pieData.map((entry, i) => jsx(Cell, { fill: entry.color }, i))
						}),
						jsx(Tooltip, { content: jsx(CustomTooltip$1, {}) }),
						jsx(Legend, { content: jsx(CustomLegend, {}) })
					] })
				})
			})]
		})
	});
}
//#endregion
//#region src/components/manager/analytics/performance-chart.js
var barColors = [
	"#6C1D5F",
	"#8A177D",
	"#4A1E47",
	"#00A99D",
	"#5B1E53",
	"#793B74",
	"#FF6A00",
	"#533754"
];
function CustomTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return jsxs("div", {
		className: "rounded-xl border border-[#EDEDED]/60 bg-white p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
		children: [
			jsx("p", {
				className: "mb-2 text-xs font-bold text-[#5A5A5A] uppercase tracking-wider",
				children: label
			}),
			jsxs("p", {
				className: "text-sm font-medium text-[#5A5A5A] py-0.5",
				children: ["Avg. Score: ", jsxs("span", {
					className: "font-bold text-[#000000]",
					children: [payload[0].value, "%"]
				})]
			}),
			jsxs("p", {
				className: "text-sm font-medium text-[#5A5A5A] py-0.5",
				children: ["Students: ", jsx("span", {
					className: "font-bold text-[#000000]",
					children: payload[0].payload.students.toLocaleString()
				})]
			})
		]
	});
}
function PerformanceChart() {
	const { data, isLoading } = usePerformanceData();
	return jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .4,
			delay: .2
		},
		children: jsxs(Card, {
			className: "overflow-hidden rounded-2xl border border-[#EDEDED]/60 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
			children: [jsx(CardHeader, {
				className: "border-b border-[#EDEDED]/40 bg-[#F7F7F8]/30 px-6 py-5",
				children: jsx(CardTitle, {
					className: "text-[17px] font-bold text-[#000000]",
					children: "Top Performing Courses"
				})
			}), jsx(CardContent, {
				className: "p-6",
				children: isLoading ? jsx(Skeleton, { className: "h-[320px] w-full rounded-xl" }) : jsx(ResponsiveContainer, {
					width: "100%",
					height: 320,
					children: jsxs(BarChart$1, {
						data,
						margin: {
							top: 10,
							right: 10,
							left: -20,
							bottom: 0
						},
						children: [
							jsx(CartesianGrid, {
								strokeDasharray: "4 4",
								stroke: "#EDEDED",
								vertical: false
							}),
							jsx(XAxis, {
								dataKey: "course",
								axisLine: false,
								tickLine: false,
								tick: {
									fill: "#888888",
									fontSize: 11,
									fontWeight: 500
								},
								interval: 0,
								angle: -15,
								textAnchor: "end",
								dy: 5
							}),
							jsx(YAxis, {
								domain: [60, 100],
								axisLine: false,
								tickLine: false,
								tick: {
									fill: "#888888",
									fontSize: 12,
									fontWeight: 500
								},
								dx: -10
							}),
							jsx(Tooltip, {
								content: jsx(CustomTooltip, {}),
								cursor: {
									fill: "#EDEDED",
									opacity: .4
								}
							}),
							jsx(Bar, {
								dataKey: "avgScore",
								radius: [
									8,
									8,
									0,
									0
								],
								maxBarSize: 45,
								children: data?.map((_, i) => jsx(Cell, { fill: barColors[i % barColors.length] }, i))
							})
						]
					})
				})
			})]
		})
	});
}
//#endregion
//#region src/components/manager/analytics/analytics-grid.js
var summaryStats = [
	{
		label: "Total Enrollments",
		value: "9,360",
		icon: Users,
		color: "text-[#6C1D5F]",
		bg: "bg-[#6C1D5F]/8"
	},
	{
		label: "Avg. Completion Time",
		value: "4.2 wks",
		icon: Clock,
		color: "text-[#00A99D]",
		bg: "bg-[#00A99D]/8"
	},
	{
		label: "Avg. Score",
		value: "84.8%",
		icon: Award,
		color: "text-[#FF6A00]",
		bg: "bg-[#FF6A00]/8"
	},
	{
		label: "Growth Rate",
		value: "+18.3%",
		icon: TrendingUp,
		color: "text-[#8A177D]",
		bg: "bg-[#8A177D]/8"
	}
];
function AnalyticsGrid() {
	return jsxs(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: { duration: .4 },
		className: "space-y-6",
		children: [
			jsx("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: summaryStats.map((stat, index) => jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 15
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .3,
						delay: index * .08
					},
					children: jsx(Card, {
						className: "border-0 bg-white shadow-sm",
						children: jsxs(CardContent, {
							className: "flex items-center gap-3 p-4",
							children: [jsx("div", {
								className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.bg}`,
								children: jsx(stat.icon, { className: `h-5 w-5 ${stat.color}` })
							}), jsxs("div", { children: [jsx("p", {
								className: "text-xl font-bold text-[#000000]",
								children: stat.value
							}), jsx("p", {
								className: "text-xs text-[#5A5A5A]",
								children: stat.label
							})] })]
						})
					})
				}, stat.label))
			}),
			jsx(EnrollmentChart, {}),
			jsxs("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
				children: [jsx(CompletionChart, {}), jsx(PerformanceChart, {})]
			})
		]
	});
}
//#endregion
//#region src/routes/manager/analytics.js?tsr-split=component
function AnalyticsPage() {
	return jsxs("div", {
		className: "space-y-6",
		children: [jsx(PageHeader, {
			title: "Analytics",
			description: "Track enrollment trends, course performance, and learning outcomes.",
			children: jsxs(Button, {
				variant: "outline",
				className: "border-[#EDEDED] shadow-sm",
				children: [jsx(Download, { className: "mr-2 h-4 w-4" }), "Export Report"]
			})
		}), jsx(AnalyticsGrid, {})]
	});
}
//#endregion
export { AnalyticsPage as component };
