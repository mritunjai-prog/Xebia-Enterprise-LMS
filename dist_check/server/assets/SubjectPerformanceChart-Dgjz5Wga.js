import { t as useDarkMode } from "./use-dark-mode-CINeHm2i.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/features/student/components/charts/LearningActivityChart.jsx
/**
* Line chart showing learning activity / hours spent over time.
* @param {{ data: Array<{name: string, progress: number}> }} props
*/
function LearningActivityChart({ data }) {
	const isDark = useDarkMode();
	return /* @__PURE__ */ jsx(ResponsiveContainer, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ jsxs(LineChart, {
			data,
			margin: {
				top: 20,
				right: 30,
				left: -20,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ jsx(CartesianGrid, {
					strokeDasharray: "3 3",
					opacity: .15,
					stroke: isDark ? "#ffffff20" : "#00000015"
				}),
				/* @__PURE__ */ jsx(XAxis, {
					dataKey: "name",
					tick: {
						fill: "currentColor",
						opacity: .7,
						fontSize: 12
					}
				}),
				/* @__PURE__ */ jsx(YAxis, { tick: {
					fill: "currentColor",
					opacity: .7,
					fontSize: 12
				} }),
				/* @__PURE__ */ jsx(Tooltip, {
					contentStyle: {
						backgroundColor: "var(--card)",
						borderColor: "var(--border)",
						borderRadius: "8px"
					},
					itemStyle: { color: "var(--foreground)" }
				}),
				/* @__PURE__ */ jsx(Line, {
					type: "monotone",
					dataKey: "progress",
					stroke: "var(--primary)",
					strokeWidth: 3,
					dot: {
						fill: "var(--primary)",
						r: 4
					},
					activeDot: { r: 6 }
				})
			]
		})
	}, isDark ? "dark" : "light");
}
//#endregion
//#region src/features/student/components/charts/SubjectPerformanceChart.jsx
/**
* Bar chart showing assessment scores across subject areas.
* @param {{ data: Array<{subject: string, score: number}> }} props
*/
function SubjectPerformanceChart({ data }) {
	const isDark = useDarkMode();
	return /* @__PURE__ */ jsx(ResponsiveContainer, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ jsxs(BarChart, {
			data,
			margin: {
				top: 20,
				right: 30,
				left: -20,
				bottom: 0
			},
			children: [
				/* @__PURE__ */ jsx(CartesianGrid, {
					strokeDasharray: "3 3",
					opacity: .15,
					stroke: isDark ? "#ffffff20" : "#00000015"
				}),
				/* @__PURE__ */ jsx(XAxis, {
					dataKey: "subject",
					tick: {
						fill: "currentColor",
						opacity: .7,
						fontSize: 12
					}
				}),
				/* @__PURE__ */ jsx(YAxis, { tick: {
					fill: "currentColor",
					opacity: .7,
					fontSize: 12
				} }),
				/* @__PURE__ */ jsx(Tooltip, {
					contentStyle: {
						backgroundColor: "var(--card)",
						borderColor: "var(--border)",
						borderRadius: "8px"
					},
					itemStyle: { color: "var(--foreground)" }
				}),
				/* @__PURE__ */ jsx(Bar, {
					dataKey: "score",
					fill: "var(--primary)",
					radius: [
						4,
						4,
						0,
						0
					]
				})
			]
		})
	}, isDark ? "dark" : "light");
}
//#endregion
export { LearningActivityChart as n, SubjectPerformanceChart as t };
