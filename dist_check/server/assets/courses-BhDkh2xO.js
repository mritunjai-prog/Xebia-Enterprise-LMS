import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DtCIqy0P.js";
import { t as Button } from "./button-DQGSKKzh.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { t as Progress } from "./progress-DkDHPJkx.js";
import { a as enrolledCourses } from "./dummy-data-CD87CTHp.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle, Clock, PlayCircle } from "lucide-react";
//#region src/routes/student/courses.jsx?tsr-split=component
function MyCourses() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold tracking-tight",
			children: "My Courses"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mt-1",
			children: "Access your assigned courses and continue learning."
		})] }), /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
			children: enrolledCourses.map((course) => /* @__PURE__ */ jsxs(Card, {
				className: "glass group overflow-hidden flex flex-col h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "relative h-48 w-full overflow-hidden",
						children: [/* @__PURE__ */ jsx("img", {
							src: course.image,
							alt: course.title,
							className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						}), course.progress === 100 && /* @__PURE__ */ jsx("div", {
							className: "absolute top-2 right-2",
							children: /* @__PURE__ */ jsxs(Badge, {
								className: "bg-green-500/90 hover:bg-green-600 text-white border-none gap-1",
								children: [/* @__PURE__ */ jsx(CheckCircle, { className: "h-3 w-3" }), " Completed"]
							})
						})]
					}),
					/* @__PURE__ */ jsxs(CardHeader, {
						className: "flex-none p-5 pb-3",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-xl group-hover:text-primary transition-colors line-clamp-2",
							children: course.title
						}), /* @__PURE__ */ jsxs(CardDescription, {
							className: "flex items-center gap-2 mt-2",
							children: [
								/* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
										" ",
										course.duration
									]
								}),
								/* @__PURE__ */ jsx("span", { children: "•" }),
								/* @__PURE__ */ jsxs("span", { children: ["By ", course.trainer] })
							]
						})]
					}),
					/* @__PURE__ */ jsx(CardContent, {
						className: "flex-1 p-5 py-2",
						children: /* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "text-muted-foreground",
										children: [
											"Progress (",
											course.modulesCompleted,
											"/",
											course.totalModules,
											" Modules)"
										]
									}), /* @__PURE__ */ jsxs("span", {
										className: "font-medium",
										children: [course.progress, "%"]
									})]
								}),
								/* @__PURE__ */ jsx(Progress, {
									value: course.progress,
									className: "h-2"
								}),
								course.progress > 0 && course.progress < 100 && /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-2 bg-muted/40 p-3 rounded-lg mt-4 border border-border/50",
									children: [/* @__PURE__ */ jsx(PlayCircle, { className: "h-5 w-5 text-primary mt-0.5 shrink-0" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5",
										children: "Resume from"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium line-clamp-2",
										children: course.lastWatched
									})] })]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(CardFooter, {
						className: "p-5 pt-4",
						children: /* @__PURE__ */ jsx(Button, {
							className: course.progress === 100 ? "w-full variant-outline" : "w-full btn-hero",
							variant: course.progress === 100 ? "outline" : "default",
							asChild: true,
							children: /* @__PURE__ */ jsx(Link, {
								to: `/student/course/${course.id}`,
								children: course.progress === 0 ? "Start Course" : course.progress === 100 ? "View Certificate" : "Continue Learning"
							})
						})
					})
				]
			}, course.id))
		})]
	});
}
//#endregion
export { MyCourses as component };
