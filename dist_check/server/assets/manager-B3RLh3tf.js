import { t as cn } from "./utils-_lkLOWLq.js";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./card-DtCIqy0P.js";
import { a as useManagerStats, f as PageHeader, s as useRecentActivity } from "./manager-data-B87DN6xf.js";
import { t as Skeleton } from "./skeleton-BSi1XvLP.js";
import { t as EnrollmentChart } from "./enrollment-chart-Bu2KULZu.js";
import * as React from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, BarChart3, BookOpen, BookPlus, CheckCircle2, MessageSquare, ShieldAlert, ShieldCheck, Star, Target, TrendingDown, TrendingUp, Trophy, UserPlus, Users } from "lucide-react";
import { motion } from "framer-motion";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
//#region src/components/manager/dashboard/stat-card.js
function StatCard({ label, value, suffix = "", trend, icon: Icon, index = 0 }) {
	const isPositive = trend >= 0;
	return jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .4,
			delay: index * .1,
			ease: "easeOut"
		},
		children: jsx(Card, {
			className: `
          group relative overflow-hidden border border-[#EDEDED]/60 bg-white
          rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)]
          transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
        `,
			children: jsxs(CardContent, {
				className: "p-6",
				children: [
					jsxs("div", {
						className: "flex items-start justify-between",
						children: [jsx("div", {
							className: `
                    flex h-12 w-12 items-center justify-center rounded-2xl
                    bg-gradient-to-br from-[#6C1D5F]/10 to-[#6C1D5F]/5
                    transition-all duration-300 group-hover:scale-110 group-hover:from-[#6C1D5F]/15 group-hover:to-[#6C1D5F]/10
                  `,
							children: jsx(Icon, { className: "h-6 w-6 text-[#6C1D5F]" })
						}), jsxs("div", {
							className: `
                    flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide
                    ${isPositive ? "bg-[#00A99D]/10 text-[#00A99D]" : "bg-red-50 text-red-600"}
                  `,
							children: [isPositive ? jsx(TrendingUp, { className: "h-3.5 w-3.5" }) : jsx(TrendingDown, { className: "h-3.5 w-3.5" }), jsxs("span", { children: [
								isPositive ? "+" : "",
								trend,
								"%"
							] })]
						})]
					}),
					jsx("p", {
						className: "mt-5 text-[32px] font-extrabold tracking-tight text-[#000000]",
						children: typeof value === "number" ? value.toLocaleString() + suffix : value + suffix
					}),
					jsx("p", {
						className: "mt-1 text-sm font-medium text-[#5A5A5A]",
						children: label
					}),
					jsx("div", { className: `
                absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r
                from-[#6C1D5F] via-[#8A177D] to-[#00A99D]
                opacity-0 transition-opacity duration-300 group-hover:opacity-100
              ` })
				]
			})
		})
	});
}
//#endregion
//#region src/components/manager/dashboard/stats-grid.js
var iconMap = {
	"Total Students": Users,
	"Active Courses": BookOpen,
	"Completion Rate": Target,
	"Pending Approvals": ShieldAlert
};
function StatsGrid() {
	const { data, isLoading } = useManagerStats();
	if (isLoading) return jsx("div", {
		className: "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4",
		children: Array.from({ length: 4 }).map((_, i) => jsx("div", {
			className: "rounded-2xl border border-[#EDEDED]/60 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
			children: jsx(Skeleton, { className: "h-[120px] w-full rounded-xl" })
		}, i))
	});
	return jsx("div", {
		className: "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4",
		children: [
			data.totalStudents,
			data.activeCourses,
			data.completionRate,
			data.pendingApprovals
		].map((stat, index) => jsx(StatCard, {
			label: stat.label,
			value: stat.value,
			suffix: stat.suffix || "",
			trend: stat.trend,
			icon: iconMap[stat.label] || Users,
			index
		}, stat.label))
	});
}
//#endregion
//#region src/components/ui/scroll-area.js
var ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => jsxs(ScrollAreaPrimitive.Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		jsx(ScrollAreaPrimitive.Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		jsx(ScrollBar, {}),
		jsx(ScrollAreaPrimitive.Corner, {})
	]
}));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => jsx(ScrollAreaPrimitive.ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
//#endregion
//#region src/components/manager/dashboard/recent-activity.js
var iconComponentMap = {
	"user-plus": UserPlus,
	"check-circle": CheckCircle2,
	"shield-check": ShieldCheck,
	star: Star,
	"alert-triangle": AlertTriangle,
	"message-square": MessageSquare,
	trophy: Trophy
};
var typeColorMap = {
	enrollment: "bg-[#6C1D5F]/10 text-[#6C1D5F]",
	completion: "bg-[#00A99D]/10 text-[#00A99D]",
	approval: "bg-[#8A177D]/10 text-[#8A177D]",
	feedback: "bg-blue-50 text-blue-600",
	alert: "bg-[#FF6A00]/10 text-[#FF6A00]"
};
function RecentActivity() {
	const { data: activities, isLoading } = useRecentActivity();
	return jsxs(Card, {
		className: "border-0 bg-white shadow-sm",
		children: [jsx(CardHeader, {
			className: "pb-3",
			children: jsx(CardTitle, {
				className: "text-base font-semibold text-[#000000]",
				children: "Recent Activity"
			})
		}), jsx(CardContent, {
			className: "p-0",
			children: jsx(ScrollArea, {
				className: "h-[400px] px-6 pb-4",
				children: isLoading ? jsx("div", {
					className: "space-y-4",
					children: Array.from({ length: 6 }).map((_, i) => jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i))
				}) : jsx("div", {
					className: "space-y-1",
					children: activities.map((activity, index) => {
						const IconComp = iconComponentMap[activity.icon] || CheckCircle2;
						const colorClass = typeColorMap[activity.type] || typeColorMap.enrollment;
						return jsx(motion.div, {
							initial: {
								opacity: 0,
								x: -10
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: {
								duration: .3,
								delay: index * .05
							},
							children: jsxs("div", {
								className: `
                          flex items-start gap-3 rounded-lg p-3 transition-colors
                          hover:bg-[#EDEDED]/60
                        `,
								children: [jsx("div", {
									className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorClass}`,
									children: jsx(IconComp, { className: "h-4 w-4" })
								}), jsxs("div", {
									className: "min-w-0 flex-1",
									children: [jsx("p", {
										className: "text-sm text-[#000000] leading-snug",
										children: activity.message
									}), jsx("p", {
										className: "mt-0.5 text-xs text-[#5A5A5A]",
										children: activity.time
									})]
								})]
							})
						}, activity.id);
					})
				})
			})
		})]
	});
}
//#endregion
//#region src/components/manager/dashboard/quick-actions.js
var actions = [
	{
		title: "Add User",
		description: "Register a new student or trainer",
		icon: UserPlus,
		href: "/manager/users",
		color: "bg-[#6C1D5F]"
	},
	{
		title: "Create Course",
		description: "Set up a new learning course",
		icon: BookPlus,
		href: "/manager/users",
		color: "bg-[#8A177D]"
	},
	{
		title: "Review Approvals",
		description: "Pending items need your attention",
		icon: ShieldCheck,
		href: "/manager/approvals",
		color: "bg-[#FF6A00]"
	},
	{
		title: "View Reports",
		description: "Analytics and performance data",
		icon: BarChart3,
		href: "/manager/analytics",
		color: "bg-[#00A99D]"
	}
];
function QuickActions() {
	return jsxs(Card, {
		className: "border-0 bg-white shadow-sm",
		children: [jsx(CardHeader, {
			className: "pb-3",
			children: jsx(CardTitle, {
				className: "text-base font-semibold text-[#000000]",
				children: "Quick Actions"
			})
		}), jsx(CardContent, { children: jsx("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
			children: actions.map((action, index) => jsx(motion.div, {
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .3,
					delay: index * .08
				},
				children: jsx(Link, {
					to: action.href,
					className: `
                    group flex items-center gap-4 rounded-xl border border-transparent
                    bg-[#EDEDED]/50 p-4 transition-all duration-200
                    hover:border-[#6C1D5F]/10 hover:bg-white hover:shadow-sm
                  `,
					children: jsxs("div", {
						className: "flex items-center gap-4",
						children: [jsx("div", {
							className: `
                          flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                          ${action.color} transition-transform duration-200
                          group-hover:scale-105
                        `,
							children: jsx(action.icon, { className: "h-5 w-5 text-white" })
						}), jsxs("div", { children: [jsx("p", {
							className: "text-sm font-semibold text-[#000000]",
							children: action.title
						}), jsx("p", {
							className: "text-xs text-[#5A5A5A]",
							children: action.description
						})] })]
					})
				})
			}, action.title))
		}) })]
	});
}
//#endregion
//#region src/routes/manager/index.js?tsr-split=component
function ManagerDashboard() {
	return jsxs("div", {
		className: "space-y-6",
		children: [
			jsx(PageHeader, {
				title: "Dashboard",
				description: "Welcome back, Rajesh. Here's what's happening today."
			}),
			jsx(StatsGrid, {}),
			jsx(EnrollmentChart, { compact: true }),
			jsxs("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
				children: [jsx(RecentActivity, {}), jsx(QuickActions, {})]
			})
		]
	});
}
//#endregion
export { ManagerDashboard as component };
