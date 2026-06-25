import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DtCIqy0P.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { n as batchInfo } from "./dummy-data-CD87CTHp.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Building, CalendarDays, Clock, MapPin, User } from "lucide-react";
//#region src/routes/student/batches.jsx?tsr-split=component
function BatchesPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold tracking-tight",
			children: "My Batches"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "View your current batch enrollment details and schedule."
		})] }), /* @__PURE__ */ jsxs(Card, {
			className: "glass relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" }),
				/* @__PURE__ */ jsx(CardHeader, {
					className: "pb-4 relative z-10",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-2xl",
							children: batchInfo.batchName
						}), /* @__PURE__ */ jsx(CardDescription, {
							className: "mt-2 text-base max-w-2xl",
							children: batchInfo.description
						})] }), /* @__PURE__ */ jsx(Badge, {
							className: "w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-1.5 text-sm",
							children: "Active Enrollment"
						})]
					})
				}),
				/* @__PURE__ */ jsx(CardContent, {
					className: "relative z-10 pt-4 border-t border-border/50",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-2.5 rounded-lg bg-blue-500/10 text-blue-500",
										children: /* @__PURE__ */ jsx(CalendarDays, { className: "w-5 h-5" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-muted-foreground",
										children: "Duration"
									}), /* @__PURE__ */ jsxs("p", {
										className: "font-semibold mt-0.5",
										children: [
											batchInfo.startDate,
											" to ",
											batchInfo.endDate
										]
									})] })]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-2.5 rounded-lg bg-orange-500/10 text-orange-500",
										children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-muted-foreground",
										children: "Schedule"
									}), /* @__PURE__ */ jsx("p", {
										className: "font-semibold mt-0.5",
										children: batchInfo.schedule
									})] })]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-2.5 rounded-lg bg-purple-500/10 text-purple-500",
										children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-muted-foreground",
										children: "Primary Trainer"
									}), /* @__PURE__ */ jsx("p", {
										className: "font-semibold mt-0.5",
										children: batchInfo.trainer
									})] })]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-2.5 rounded-lg bg-green-500/10 text-green-500",
										children: /* @__PURE__ */ jsx(Building, { className: "w-5 h-5" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-muted-foreground",
										children: "Organization"
									}), /* @__PURE__ */ jsx("p", {
										className: "font-semibold mt-0.5",
										children: batchInfo.university
									})] })]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "sm:col-span-2 lg:col-span-1 rounded-xl bg-muted/30 p-5 border border-border/50",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "font-semibold mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-primary" }), " Location / Mode"]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: "This is a fully online batch. All classes and assessments will be conducted via the LMS video conferencing tools."
								})]
							})
						]
					})
				})
			]
		})]
	});
}
//#endregion
export { BatchesPage as component };
