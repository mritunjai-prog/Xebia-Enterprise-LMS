import { t as Button } from "./button-DQGSKKzh.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table$1 } from "./table-grI7xhag.js";
import { c as upcomingAssessments } from "./dummy-data-CD87CTHp.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle, Clock, PlayCircle } from "lucide-react";
//#region src/routes/student/assessments.jsx?tsr-split=component
function AssessmentsPage() {
	const getStatusBadge = (status) => {
		switch (status) {
			case "Completed": return /* @__PURE__ */ jsxs(Badge, {
				className: "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20",
				children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3 mr-1" }), " Completed"]
			});
			case "Upcoming": return /* @__PURE__ */ jsxs(Badge, {
				className: "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20",
				children: [/* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 mr-1" }), " Upcoming"]
			});
			case "Pending": return /* @__PURE__ */ jsxs(Badge, {
				className: "bg-orange-500/10 text-orange-500 border-orange-500/20 hover:bg-orange-500/20",
				children: [/* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 mr-1" }), " Pending"]
			});
			default: return /* @__PURE__ */ jsx(Badge, { children: status });
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold tracking-tight",
			children: "Assessments"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "View your upcoming and pending assessments."
		})] }), /* @__PURE__ */ jsx("div", {
			className: "rounded-xl border bg-card glass overflow-hidden",
			children: /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ jsxs(Table$1, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
					/* @__PURE__ */ jsx(TableHead, { children: "Assessment Name" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Course" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Date" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Time" }),
					/* @__PURE__ */ jsx(TableHead, { children: "Status" }),
					/* @__PURE__ */ jsx(TableHead, {
						className: "text-right",
						children: "Action"
					})
				] }) }), /* @__PURE__ */ jsx(TableBody, { children: upcomingAssessments.map((assessment) => /* @__PURE__ */ jsxs(TableRow, { children: [
					/* @__PURE__ */ jsx(TableCell, {
						className: "font-medium",
						children: assessment.name
					}),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-muted-foreground",
						children: assessment.course
					}),
					/* @__PURE__ */ jsx(TableCell, { children: assessment.date }),
					/* @__PURE__ */ jsx(TableCell, { children: assessment.time }),
					/* @__PURE__ */ jsx(TableCell, { children: getStatusBadge(assessment.status) }),
					/* @__PURE__ */ jsx(TableCell, {
						className: "text-right",
						children: assessment.status === "Completed" ? /* @__PURE__ */ jsx(Button, {
							variant: "outline",
							size: "sm",
							className: "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
							children: "View Result"
						}) : /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							className: "bg-primary/10 text-primary hover:bg-primary/20 variant-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
							children: [/* @__PURE__ */ jsx(PlayCircle, { className: "w-4 h-4 mr-2" }), " Start"]
						})
					})
				] }, assessment.id)) })] })
			})
		})]
	});
}
//#endregion
export { AssessmentsPage as component };
