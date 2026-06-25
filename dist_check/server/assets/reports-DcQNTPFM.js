import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { BarChart, Download, FileText, PieChart } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/trainer/reports/index.jsx?tsr-split=component
function ReportsView() {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ jsx(ModuleHeroBanner, {
			breadcrumb: "Dashboard / Reports",
			title: "Trainer Reports & Analytics",
			subtitle: "Export performance metrics, batch completion rates, and individual student analysis.",
			actions: /* @__PURE__ */ jsxs("button", {
				onClick: () => toast.success("Generating master report..."),
				className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
				children: [/* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }), " Export Master CSV"]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-6",
			children: [
				{
					title: "Batch Performance",
					desc: "Average grades and completion rates by cohort",
					icon: BarChart,
					color: "text-blue-500"
				},
				{
					title: "Student Risk Analysis",
					desc: "Identify students falling behind schedule",
					icon: PieChart,
					color: "text-amber-500"
				},
				{
					title: "Assessment Breakdown",
					desc: "Item analysis on specific quizzes and labs",
					icon: FileText,
					color: "text-primary"
				}
			].map((report, idx) => /* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-6 border border-border/40 hover:border-primary/40 hover:-translate-y-1 transition-all flex flex-col items-start gap-4",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: `p-3 rounded-xl bg-card border border-border/50 ${report.color}`,
						children: /* @__PURE__ */ jsx(report.icon, { className: "w-6 h-6" })
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "font-bold text-lg text-foreground",
						children: report.title
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground mt-1 leading-relaxed",
						children: report.desc
					})] }),
					/* @__PURE__ */ jsx("button", {
						className: "mt-auto w-full bg-secondary hover:bg-secondary/80 text-foreground text-sm font-bold py-2.5 rounded-xl transition-colors cursor-pointer",
						children: "Generate Report"
					})
				]
			}, idx))
		})]
	});
}
//#endregion
export { ReportsView as component };
