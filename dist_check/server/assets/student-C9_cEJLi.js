import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-DtCIqy0P.js";
import { t as Button } from "./button-DQGSKKzh.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { t as Progress } from "./progress-DkDHPJkx.js";
import { a as enrolledCourses, c as upcomingAssessments, o as notifications, r as chartData, s as studentProfile } from "./dummy-data-CD87CTHp.js";
import { n as LearningActivityChart, t as SubjectPerformanceChart } from "./SubjectPerformanceChart-Dgjz5Wga.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Award, Bell, BookOpen, Calendar, Clock, PlayCircle } from "lucide-react";
//#region src/features/student/components/dashboard/WelcomeBanner.jsx
/**
* Welcome banner displayed at the top of the student dashboard.
*/
function WelcomeBanner() {
	const initials = studentProfile.name.split(" ").map((n) => n[0]).join("").toUpperCase();
	return /* @__PURE__ */ jsxs("div", {
		className: "relative overflow-hidden rounded-2xl glass-strong p-8",
		children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-mesh opacity-20 pointer-events-none" }), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsxs("h1", {
					className: "text-3xl md:text-4xl font-bold tracking-tight text-foreground",
					children: [
						"Welcome Back,",
						" ",
						/* @__PURE__ */ jsxs("span", {
							className: "text-gradient",
							children: [studentProfile.name, "!"]
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-muted-foreground text-lg",
					children: "Continue your learning journey and track your progress."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-4 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ jsx(Badge, {
						variant: "secondary",
						className: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
						children: studentProfile.batch
					}), /* @__PURE__ */ jsx(Badge, {
						variant: "outline",
						className: "text-muted-foreground",
						children: studentProfile.university
					})]
				})
			] }), /* @__PURE__ */ jsx("div", {
				className: "hidden md:block",
				children: /* @__PURE__ */ jsx("div", {
					className: "h-24 w-24 rounded-full border-4 border-background shadow-glow flex items-center justify-center text-2xl font-bold text-primary bg-primary/10",
					children: initials
				})
			})]
		})]
	});
}
//#endregion
//#region src/features/student/components/dashboard/StatCard.jsx
/**
* A single stats card displayed in the dashboard summary row.
* @param {{ title: string, value: number|string, icon: React.ElementType, trend: string, trendUp: boolean }} props
*/
function StatCard({ title, value, icon: Icon, trend, trendUp }) {
	return /* @__PURE__ */ jsx(Card, {
		className: "glass hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
		children: /* @__PURE__ */ jsxs(CardContent, {
			className: "p-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between space-y-0 pb-2",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: title
				}), /* @__PURE__ */ jsx("div", {
					className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center",
					children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" })
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1 mt-2",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-3xl font-bold",
					children: value
				}), /* @__PURE__ */ jsx("p", {
					className: `text-xs ${trendUp ? "text-green-500" : "text-muted-foreground"}`,
					children: trend
				})]
			})]
		})
	});
}
//#endregion
//#region src/features/student/components/dashboard/ContinueLearning.jsx
/**
* "Continue Learning" section – shows in-progress courses with resume CTA.
* @param {{ courses: Array }} props
*/
function ContinueLearning({ courses }) {
	const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between mb-4",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-xl font-bold tracking-tight",
			children: "Continue Learning"
		}), /* @__PURE__ */ jsx(Button, {
			variant: "ghost",
			asChild: true,
			children: /* @__PURE__ */ jsx(Link, {
				to: "/student/courses",
				children: "View All"
			})
		})]
	}), /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
		children: inProgress.map((course) => /* @__PURE__ */ jsxs(Card, {
			className: "glass hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "h-32 w-full overflow-hidden",
					children: /* @__PURE__ */ jsx("img", {
						src: course.image,
						alt: course.title,
						className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					})
				}),
				/* @__PURE__ */ jsxs(CardHeader, {
					className: "p-4 pb-2",
					children: [/* @__PURE__ */ jsx(CardTitle, {
						className: "text-lg line-clamp-1 group-hover:text-primary transition-colors",
						children: course.title
					}), /* @__PURE__ */ jsxs(CardDescription, {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
							" ",
							course.duration
						]
					})]
				}),
				/* @__PURE__ */ jsxs(CardContent, {
					className: "p-4 pt-0",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between text-xs text-muted-foreground mb-1.5",
							children: [/* @__PURE__ */ jsx("span", { children: "Progress" }), /* @__PURE__ */ jsxs("span", {
								className: "font-medium",
								children: [course.progress, "%"]
							})]
						}),
						/* @__PURE__ */ jsx(Progress, {
							value: course.progress,
							className: "h-2"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex items-center text-sm text-muted-foreground bg-muted/50 p-2 rounded-md",
							children: [/* @__PURE__ */ jsx(PlayCircle, { className: "h-4 w-4 mr-2 text-primary" }), /* @__PURE__ */ jsx("span", {
								className: "line-clamp-1",
								children: course.lastWatched
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx(CardFooter, {
					className: "p-4 pt-0",
					children: /* @__PURE__ */ jsx(Button, {
						className: "w-full btn-hero",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ jsx(Link, {
							to: `/student/course/${course.id}`,
							children: "Resume Learning"
						})
					})
				})
			]
		}, course.id))
	})] });
}
//#endregion
//#region src/routes/student/index.jsx?tsr-split=component
function DashboardHome() {
	const unreadNotifications = notifications.filter((n) => !n.read).length;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(WelcomeBanner, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsx(StatCard, {
						title: "Enrolled Courses",
						value: enrolledCourses.length,
						icon: BookOpen,
						trend: "+2 this month",
						trendUp: true
					}),
					/* @__PURE__ */ jsx(StatCard, {
						title: "Upcoming Assessments",
						value: upcomingAssessments.length,
						icon: Calendar,
						trend: "Next: Tomorrow",
						trendUp: false
					}),
					/* @__PURE__ */ jsx(StatCard, {
						title: "Completed Courses",
						value: enrolledCourses.filter((c) => c.progress === 100).length,
						icon: Award,
						trend: "Great job!",
						trendUp: true
					}),
					/* @__PURE__ */ jsx(StatCard, {
						title: "Unread Notifications",
						value: unreadNotifications,
						icon: Bell,
						trend: "Check your inbox",
						trendUp: false
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "glass",
					children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Learning Activity" }), /* @__PURE__ */ jsx(CardDescription, { children: "Hours spent learning over the past few months" })] }), /* @__PURE__ */ jsx(CardContent, {
						className: "h-[300px]",
						children: /* @__PURE__ */ jsx(LearningActivityChart, { data: chartData.courseProgress })
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "glass",
					children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, { children: "Subject Performance" }), /* @__PURE__ */ jsx(CardDescription, { children: "Assessment scores across key subject areas" })] }), /* @__PURE__ */ jsx(CardContent, {
						className: "h-[300px]",
						children: /* @__PURE__ */ jsx(SubjectPerformanceChart, { data: chartData.assessmentPerformance })
					})]
				})]
			}),
			/* @__PURE__ */ jsx(ContinueLearning, { courses: enrolledCourses })
		]
	});
}
//#endregion
export { DashboardHome as component };
