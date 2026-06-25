import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DtCIqy0P.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-grI7xhag.js";
import { a as enrolledCourses, r as chartData, t as assessmentResults } from "./dummy-data-CD87CTHp.js";
import { t as useDarkMode } from "./use-dark-mode-CINeHm2i.js";
import { n as LearningActivityChart, t as SubjectPerformanceChart } from "./SubjectPerformanceChart-Dgjz5Wga.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/features/student/components/charts/CourseProgressChart.jsx
/**
* Horizontal bar chart showing course completion progress.
* @param {{ data: Array<{title: string, progress: number}> }} props
*/
function CourseProgressChart({ data }) {
	const isDark = useDarkMode();
	return /* @__PURE__ */ jsx(ResponsiveContainer, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ jsxs(BarChart, {
			data,
			layout: "vertical",
			margin: {
				top: 20,
				right: 30,
				left: 20,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ jsx(CartesianGrid, {
					strokeDasharray: "3 3",
					opacity: .15,
					stroke: isDark ? "#ffffff20" : "#00000015",
					horizontal: true,
					vertical: false
				}),
				/* @__PURE__ */ jsx(XAxis, {
					type: "number",
					domain: [0, 100],
					hide: true
				}),
				/* @__PURE__ */ jsx(YAxis, {
					dataKey: "title",
					type: "category",
					width: 100,
					tick: {
						fill: "currentColor",
						opacity: .7,
						fontSize: 12
					}
				}),
				/* @__PURE__ */ jsx(Tooltip, {
					contentStyle: {
						backgroundColor: "var(--card)",
						borderColor: "var(--border)",
						borderRadius: "8px"
					},
					itemStyle: { color: "var(--foreground)" },
					formatter: (value) => [`${value}%`, "Progress"]
				}),
				/* @__PURE__ */ jsx(Bar, {
					dataKey: "progress",
					fill: "var(--primary)",
					radius: [
						0,
						4,
						4,
						0
					],
					barSize: 20
				})
			]
		})
	}, isDark ? "dark" : "light");
}
//#endregion
//#region src/routes/student/results.jsx?tsr-split=component
function ResultsPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Results & Performance"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1",
				children: "Track your learning progress and assessment scores."
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ jsxs(Card, {
						className: "glass",
						children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Course Progress" }), /* @__PURE__ */ jsx(CardDescription, { children: "Completion status of enrolled courses" })] }), /* @__PURE__ */ jsx(CardContent, {
							className: "h-[300px]",
							children: /* @__PURE__ */ jsx(CourseProgressChart, { data: enrolledCourses })
						})]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "glass",
						children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Subject Performance" }), /* @__PURE__ */ jsx(CardDescription, { children: "Your scores across different subjects" })] }), /* @__PURE__ */ jsx(CardContent, {
							className: "h-[300px]",
							children: /* @__PURE__ */ jsx(SubjectPerformanceChart, { data: chartData.assessmentPerformance })
						})]
					}),
					/* @__PURE__ */ jsxs(Card, {
						className: "glass",
						children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Learning Activity" }), /* @__PURE__ */ jsx(CardDescription, { children: "Hours spent learning over time" })] }), /* @__PURE__ */ jsx(CardContent, {
							className: "h-[300px]",
							children: /* @__PURE__ */ jsx(LearningActivityChart, { data: chartData.courseProgress })
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "text-xl font-semibold mt-8 mb-4 tracking-tight",
				children: "Recent Results"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "rounded-xl border bg-card glass overflow-hidden",
				children: /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableHead, { children: "Assessment Name" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Course" }),
						/* @__PURE__ */ jsx(TableHead, { children: "Date" }),
						/* @__PURE__ */ jsx(TableHead, {
							className: "text-center",
							children: "Score"
						}),
						/* @__PURE__ */ jsx(TableHead, {
							className: "text-right",
							children: "Grade"
						})
					] }) }), /* @__PURE__ */ jsx(TableBody, { children: assessmentResults.map((result) => /* @__PURE__ */ jsxs(TableRow, { children: [
						/* @__PURE__ */ jsx(TableCell, {
							className: "font-medium",
							children: result.assessmentName
						}),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-muted-foreground",
							children: result.course
						}),
						/* @__PURE__ */ jsx(TableCell, { children: result.date }),
						/* @__PURE__ */ jsxs(TableCell, {
							className: "text-center font-semibold",
							children: [
								result.marks,
								" / ",
								result.maxMarks,
								" (",
								result.percentage,
								"%)"
							]
						}),
						/* @__PURE__ */ jsx(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ jsx(Badge, {
								className: "bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold text-sm",
								children: result.grade
							})
						})
					] }, result.id)) })] })
				})
			})
		]
	});
}
//#endregion
export { ResultsPage as component };
