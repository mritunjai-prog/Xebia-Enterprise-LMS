import { t as PermissionGuard } from "./permission-guard-CVDo8sNM.js";
import { t as Route$43 } from "./_courseId-CDc2YOD6.js";
import { t as Route$44 } from "./_courseId-CKkaimSU.js";
import { t as Route$45 } from "./_courseId-fKepfA_a.js";
import { useEffect, useRef, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Activity, AlertCircle, Bell, BookOpen, Calendar, CalendarCheck, CheckCircle, Clock, Download, FileText, Plus, Send, TrendingUp, Users, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-BLtIGOA5.css";
//#endregion
//#region src/lib/lovable-error-reporting.js
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/components/cursor-trail.js
function CursorTrail() {
	const canvasRef = useRef(null);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let animationFrameId;
		const mouse = {
			x: 0,
			y: 0,
			active: false
		};
		const points = [];
		const maxPoints = 10;
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();
		const handleMouseMove = (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			mouse.active = true;
			points.push({
				x: mouse.x,
				y: mouse.y,
				age: 0,
				vx: (Math.random() - .5) * .5,
				vy: (Math.random() - .5) * .5 - .5,
				size: Math.random() * 8 + 8
			});
			if (points.length > maxPoints) points.shift();
		};
		const handleMouseLeave = () => {
			mouse.active = false;
		};
		window.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseleave", handleMouseLeave);
		const render = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (points.length > 0) {
				ctx.beginPath();
				for (let i = 0; i < points.length; i++) {
					const pt = points[i];
					if (i < points.length - 1) {
						const nextPt = points[i + 1];
						pt.x += (nextPt.x - pt.x) * .15 + pt.vx;
						pt.y += (nextPt.y - pt.y) * .15 + pt.vy;
					} else if (mouse.active) {
						pt.x += (mouse.x - pt.x) * .2 + pt.vx;
						pt.y += (mouse.y - pt.y) * .2 + pt.vy;
					}
					pt.age += 1;
				}
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				for (let i = 1; i < points.length - 1; i++) {
					const xc = (points[i].x + points[i + 1].x) / 2;
					const yc = (points[i].y + points[i + 1].y) / 2;
					ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
				}
				ctx.strokeStyle = "rgba(124, 58, 237, 0.08)";
				ctx.lineWidth = 26;
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				for (let i = 1; i < points.length - 1; i++) {
					const xc = (points[i].x + points[i + 1].x) / 2;
					const yc = (points[i].y + points[i + 1].y) / 2;
					ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
				}
				ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
				ctx.lineWidth = 14;
				ctx.stroke();
				for (let i = 0; i < points.length; i++) {
					const pt = points[i];
					const ratio = i / points.length;
					const size = pt.size * ratio * (1 - pt.age / 100);
					if (size <= 0) continue;
					const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, size);
					grad.addColorStop(0, "rgba(255, 255, 255, 0.6)");
					grad.addColorStop(.3, "rgba(167, 139, 250, 0.4)");
					grad.addColorStop(.7, "rgba(59, 130, 246, 0.15)");
					grad.addColorStop(1, "rgba(59, 130, 246, 0)");
					ctx.fillStyle = grad;
					ctx.beginPath();
					ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			animationFrameId = requestAnimationFrame(render);
		};
		render();
		return () => {
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleMouseLeave);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);
	return jsx("canvas", {
		ref: canvasRef,
		style: {
			position: "fixed",
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh",
			pointerEvents: "none",
			zIndex: 9999
		}
	});
}
//#endregion
//#region src/routes/__root.js
function NotFoundComponent() {
	return jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: jsxs("div", {
			className: "max-w-md text-center",
			children: [
				jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				jsx("div", {
					className: "mt-6",
					children: jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: jsxs("div", {
			className: "max-w-md text-center",
			children: [
				jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$42 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Xebia Enterprise LMS — One Platform for Learning at Scale" },
			{
				name: "description",
				content: "Enterprise-grade Learning Management System for universities, organisations and enterprises. Identity, courses, assessments, video learning and reporting on one multi-tenant platform."
			},
			{
				name: "author",
				content: "Xebia"
			},
			{
				property: "og:title",
				content: "Xebia Enterprise LMS"
			},
			{
				property: "og:description",
				content: "One platform for universities, organisations and enterprise learning."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return jsxs("html", {
		lang: "en",
		children: [jsx("head", { children: jsx(HeadContent, {}) }), jsxs("body", { children: [children, jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$42.useRouteContext();
	return jsxs(QueryClientProvider, {
		client: queryClient,
		children: [jsx(Outlet, {}), jsx(CursorTrail, {})]
	});
}
//#endregion
//#region src/routes/trainer.js
var $$splitComponentImporter$40 = () => import("./trainer-DjGL9C8X.js");
var Route$41 = createFileRoute("/trainer")({ component: lazyRouteComponent($$splitComponentImporter$40, "component") });
//#endregion
//#region src/routes/student.jsx
var $$splitComponentImporter$39 = () => import("./student-DSCsthm_.js");
var Route$40 = createFileRoute("/student")({ component: lazyRouteComponent($$splitComponentImporter$39, "component") });
//#endregion
//#region src/routes/organiser.jsx
var $$splitComponentImporter$38 = () => import("./organiser-G97IRTTp.js");
var Route$39 = createFileRoute("/organiser")({ component: lazyRouteComponent($$splitComponentImporter$38, "component") });
//#endregion
//#region src/routes/login.jsx
var $$splitComponentImporter$37 = () => import("./login-DiFKv5kC.js");
var Route$38 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$37, "component") });
//#endregion
//#region src/routes/admin.jsx
var $$splitComponentImporter$36 = () => import("./admin-BJZxVB9V.js");
var Route$37 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$36, "component") });
//#endregion
//#region src/routes/manager/route.js
var $$splitComponentImporter$35 = () => import("./route-pEB9wpEY.js");
var Route$36 = createFileRoute("/manager")({
	head: () => ({ meta: [{ title: "Manager Dashboard — Xebia Enterprise LMS" }, {
		name: "description",
		content: "Manage users, courses, approvals and analytics for the Xebia Enterprise Learning Management System."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
//#endregion
//#region src/routes/index.js
var $$splitComponentImporter$34 = () => import("./routes-B3Ql-INP.js");
var Route$35 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Xebia Enterprise LMS — One Platform for Learning at Scale" },
		{
			name: "description",
			content: "Enterprise-grade Learning Management System for universities, organisations and enterprises. Identity, courses, assessments, video learning, notifications and reporting on one multi-tenant platform."
		},
		{
			property: "og:title",
			content: "Xebia Enterprise LMS"
		},
		{
			property: "og:description",
			content: "One multi-tenant platform for identity, courses, video learning, assessments and analytics."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
//#endregion
//#region src/routes/trainer/index.jsx
var $$splitComponentImporter$33 = () => import("./trainer-CF-Sjf_C.js");
var Route$34 = createFileRoute("/trainer/")({ component: lazyRouteComponent($$splitComponentImporter$33, "component") });
//#endregion
//#region src/routes/student/index.jsx
var $$splitComponentImporter$32 = () => import("./student-C9_cEJLi.js");
var Route$33 = createFileRoute("/student/")({ component: lazyRouteComponent($$splitComponentImporter$32, "component") });
//#endregion
//#region src/routes/organiser/index.jsx
var Route$32 = createFileRoute("/organiser/")({ component: TrainerDashboard });
var analyticsData = {
	Daily: [
		{
			name: "Mon",
			engagement: 120,
			views: 340,
			submissions: 15
		},
		{
			name: "Tue",
			engagement: 180,
			views: 420,
			submissions: 28
		},
		{
			name: "Wed",
			engagement: 210,
			views: 510,
			submissions: 32
		},
		{
			name: "Thu",
			engagement: 150,
			views: 380,
			submissions: 19
		},
		{
			name: "Fri",
			engagement: 240,
			views: 600,
			submissions: 45
		},
		{
			name: "Sat",
			engagement: 90,
			views: 210,
			submissions: 12
		},
		{
			name: "Sun",
			engagement: 110,
			views: 250,
			submissions: 8
		}
	],
	Weekly: [
		{
			name: "Week 1",
			engagement: 820,
			views: 2400,
			submissions: 120
		},
		{
			name: "Week 2",
			engagement: 1100,
			views: 3100,
			submissions: 185
		},
		{
			name: "Week 3",
			engagement: 950,
			views: 2800,
			submissions: 140
		},
		{
			name: "Week 4",
			engagement: 1450,
			views: 4200,
			submissions: 260
		}
	],
	Monthly: [
		{
			name: "Jan",
			engagement: 3100,
			views: 9800,
			submissions: 610
		},
		{
			name: "Feb",
			engagement: 4200,
			views: 12e3,
			submissions: 820
		},
		{
			name: "Mar",
			engagement: 5100,
			views: 14500,
			submissions: 980
		},
		{
			name: "Apr",
			engagement: 4800,
			views: 13900,
			submissions: 920
		},
		{
			name: "May",
			engagement: 6200,
			views: 18100,
			submissions: 1200
		},
		{
			name: "Jun",
			engagement: 7400,
			views: 21500,
			submissions: 1450
		}
	],
	Yearly: [
		{
			name: "2023",
			engagement: 38e3,
			views: 112e3,
			submissions: 7500
		},
		{
			name: "2024",
			engagement: 54e3,
			views: 165e3,
			submissions: 11200
		},
		{
			name: "2025",
			engagement: 78e3,
			views: 232e3,
			submissions: 16800
		},
		{
			name: "2026",
			engagement: 92e3,
			views: 285e3,
			submissions: 19800
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
		detail: "commented on 'Microservices Patterns'",
		time: "45 mins ago"
	},
	{
		id: 3,
		type: "system",
		user: "University of Tech",
		detail: "synced 18 new enrolments for Batch B",
		time: "2 hours ago"
	},
	{
		id: 4,
		type: "upload",
		user: "You",
		detail: "uploaded 'Kafka Guide.pdf' to Content Library",
		time: "4 hours ago"
	},
	{
		id: 5,
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
		title: "Cloud Architecture Masterclass",
		batch: "Batch A - Tech Uni",
		room: "Virtual Room 3"
	}, {
		id: 2,
		time: "02:00 PM",
		title: "Spring Boot Middleware Session",
		batch: "Batch B - Enterprise",
		room: "Virtual Room 1"
	}],
	"2026-06-25": [{
		id: 3,
		time: "11:30 AM",
		title: "React Query In-Depth Delivery",
		batch: "Cohort 4",
		room: "Virtual Room 2"
	}],
	"2026-06-28": [{
		id: 4,
		time: "09:00 AM",
		title: "Semester Practical Examinations",
		batch: "Batch A - Tech Uni",
		room: "Offline Lab 2"
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
	const [analyticsTab, setAnalyticsTab] = useState("Daily");
	const [selectedDate, setSelectedDate] = useState("2026-06-24");
	const [activeModal, setActiveModal] = useState(null);
	const [loadingAction, setLoadingAction] = useState(false);
	const handleQuickAction = (e, type) => {
		e.preventDefault();
		setLoadingAction(true);
		setTimeout(() => {
			setLoadingAction(false);
			setActiveModal(null);
			toast.success(`${type} successfully processed!`, { icon: /* @__PURE__ */ jsx(CheckCircle, { className: "text-emerald-500" }) });
		}, 1200);
	};
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
							className: "absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full pointer-events-none",
							style: {
								background: "radial-gradient(ellipse, oklch(0.65 0.16 165 / 0.2) 0%, transparent 70%)",
								filter: "blur(30px)"
							}
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]",
							style: {
								backgroundImage: "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
								backgroundSize: "28px 28px"
							}
						}),
						Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsx(motion.div, {
							className: "absolute rounded-full pointer-events-none",
							style: {
								width: i % 3 === 0 ? "3px" : "2px",
								height: i % 3 === 0 ? "3px" : "2px",
								left: `${i * 7.2 + 2}%`,
								bottom: "-6px",
								background: i % 2 === 0 ? "oklch(0.65 0.22 320 / 0.7)" : "oklch(0.75 0.18 200 / 0.6)"
							},
							animate: {
								y: [-5, -200],
								x: [0, (i % 2 === 0 ? 1 : -1) * (12 + i % 4 * 8)],
								opacity: [
									0,
									.8,
									0
								],
								scale: [
									1,
									1.4,
									.6
								]
							},
							transition: {
								duration: 5 + i % 4,
								repeat: Infinity,
								delay: i * .38,
								ease: "easeOut"
							}
						}, i)),
						/* @__PURE__ */ jsx(motion.div, {
							className: "absolute inset-y-0 w-24 pointer-events-none",
							style: {
								background: "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.06) 50%, transparent 60%)",
								left: "-10%"
							},
							animate: { left: ["−10%", "120%"] },
							transition: {
								duration: 4.5,
								repeat: Infinity,
								repeatDelay: 3.5,
								ease: "linear"
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
										children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }), "Dashboard / Organiser"]
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
										className: "text-3xl sm:text-4xl font-extrabold font-display tracking-tight",
										style: {
											background: "linear-gradient(135deg, var(--color-foreground) 0%, oklch(0.6 0.22 320) 60%, oklch(0.72 0.18 200) 100%)",
											WebkitBackgroundClip: "text",
											WebkitTextFillColor: "transparent",
											backgroundClip: "text"
										},
										children: "Organiser Dashboard"
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
										children: "Manage course delivery, student tracking, cohorts, and assessments from one unified hub."
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
									children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_oklch(0.7_0.2_145)]" }), "Organiser • University of Technology • Sync Active"]
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-5 border-primary/10",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4",
						children: "Quick Command Center"
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3",
						children: [
							{
								id: "course",
								label: "Create Course",
								icon: Plus,
								color: "text-purple-500 hover:bg-purple-500/10"
							},
							{
								id: "content",
								label: "Upload Content",
								icon: FileText,
								color: "text-blue-500 hover:bg-blue-500/10"
							},
							{
								id: "student",
								label: "Add Student",
								icon: Users,
								color: "text-cyan-500 hover:bg-cyan-500/10"
							},
							{
								id: "assessment",
								label: "New Assessment",
								icon: Clock,
								color: "text-pink-500 hover:bg-pink-500/10"
							},
							{
								id: "notification",
								label: "Send Notice",
								icon: Send,
								color: "text-amber-500 hover:bg-amber-500/10"
							},
							{
								id: "batch",
								label: "Launch Batch",
								icon: CalendarCheck,
								color: "text-teal-500 hover:bg-teal-500/10"
							},
							{
								id: "report",
								label: "Export Report",
								icon: Download,
								color: "text-indigo-500 hover:bg-indigo-500/10"
							}
						].map((action) => /* @__PURE__ */ jsxs("button", {
							onClick: () => setActiveModal(action.id),
							className: `flex flex-col items-center justify-center p-3 rounded-xl bg-card/60 border border-border/40 hover:-translate-y-0.5 transition-all text-center cursor-pointer ${action.color}`,
							children: [/* @__PURE__ */ jsx(action.icon, { className: "w-5 h-5 mb-1.5" }), /* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold text-foreground",
								children: action.label
							})]
						}, action.id))
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ jsx(StatCard, {
								title: "Total Courses",
								value: "12",
								icon: BookOpen,
								trend: "+16.6%",
								trendUp: true,
								glowColor: "text-purple-500"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ jsx(StatCard, {
								title: "Active Batches",
								value: "8",
								icon: CalendarCheck,
								trend: "+8.3%",
								trendUp: true,
								glowColor: "text-teal-500"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ jsx(StatCard, {
								title: "Total Enrolled",
								value: "342",
								icon: Users,
								trend: "+12.4%",
								trendUp: true,
								glowColor: "text-cyan-500"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ jsx(StatCard, {
								title: "Completion Rate",
								value: "84%",
								icon: TrendingUp,
								trend: "+4.1%",
								trendUp: true,
								glowColor: "text-emerald-500"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ jsx(StatCard, {
								title: "Pending Review",
								value: "24",
								icon: Clock,
								trend: "-14.2%",
								trendUp: true,
								glowColor: "text-amber-500"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ jsx(StatCard, {
								title: "Video Views",
								value: "4.8k",
								icon: Video,
								trend: "+28.4%",
								trendUp: true,
								glowColor: "text-pink-500"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ jsx(StatCard, {
								title: "Alerts Sent",
								value: "158",
								icon: Bell,
								trend: "+5.2%",
								trendUp: true,
								glowColor: "text-indigo-500"
							})
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
								children: "Delivery Analytics"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground",
								children: "Monitor student engagement, video consumption, and submissions."
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
											id: "colorEngagement",
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
											id: "colorViews",
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
											borderRadius: "12px",
											boxShadow: "var(--shadow-elegant)"
										} }),
										/* @__PURE__ */ jsx(Area, {
											type: "monotone",
											dataKey: "engagement",
											name: "Active Hours",
											stroke: "oklch(0.38 0.14 335)",
											strokeWidth: 2.5,
											fillOpacity: 1,
											fill: "url(#colorEngagement)"
										}),
										/* @__PURE__ */ jsx(Area, {
											type: "monotone",
											dataKey: "views",
											name: "Video Views",
											stroke: "oklch(0.78 0.14 200)",
											strokeWidth: 2,
											fillOpacity: 1,
											fill: "url(#colorViews)"
										})
									]
								})
							})
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-between border-t border-border/40 pt-4 mt-4 gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-primary" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground font-semibold",
										children: "Active Hours"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", { className: "h-3 w-3 rounded-full bg-accent" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground font-semibold",
										children: "Video Lessons Views"
									})]
								})]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground italic",
								children: "Updated real-time via university SSO logs."
							})]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "glass rounded-2xl p-6 flex flex-col justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-lg font-bold text-foreground",
									children: "Schedules & Calendar"
								}), /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-primary" })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-center text-xs font-bold text-muted-foreground mb-3 px-1",
								children: [/* @__PURE__ */ jsx("span", { children: "JUNE 2026" }), /* @__PURE__ */ jsx("span", {
									className: "text-primary font-semibold",
									children: "3 Sessions Marked"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-7 gap-1.5 text-center text-xs mb-4",
								children: [[
									"S",
									"M",
									"T",
									"W",
									"T",
									"F",
									"S"
								].map((d, idx) => /* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-bold text-muted-foreground/60 py-1",
									children: d
								}, idx)), [
									{
										day: 21,
										dateStr: "2026-06-21",
										isCurrentMonth: true
									},
									{
										day: 22,
										dateStr: "2026-06-22",
										isCurrentMonth: true
									},
									{
										day: 23,
										dateStr: "2026-06-23",
										isCurrentMonth: true
									},
									{
										day: 24,
										dateStr: "2026-06-24",
										isCurrentMonth: true,
										hasSessions: true
									},
									{
										day: 25,
										dateStr: "2026-06-25",
										isCurrentMonth: true,
										hasSessions: true
									},
									{
										day: 26,
										dateStr: "2026-06-26",
										isCurrentMonth: true
									},
									{
										day: 27,
										dateStr: "2026-06-27",
										isCurrentMonth: true
									},
									{
										day: 28,
										dateStr: "2026-06-28",
										isCurrentMonth: true,
										hasSessions: true
									},
									{
										day: 29,
										dateStr: "2026-06-29",
										isCurrentMonth: true
									},
									{
										day: 30,
										dateStr: "2026-06-30",
										isCurrentMonth: true
									}
								].map((day) => {
									const isSelected = selectedDate === day.dateStr;
									return /* @__PURE__ */ jsxs("button", {
										onClick: () => setSelectedDate(day.dateStr),
										className: `h-8 rounded-lg flex flex-col items-center justify-center relative transition-all cursor-pointer font-bold ${isSelected ? "bg-primary text-primary-foreground font-extrabold shadow" : "hover:bg-secondary/40 text-foreground bg-card/25"}`,
										children: [/* @__PURE__ */ jsx("span", { children: day.day }), day.hasSessions && !isSelected && /* @__PURE__ */ jsx("span", { className: "absolute bottom-1 h-1.5 w-1.5 rounded-full bg-accent" })]
									}, day.day);
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2 border-t border-border/40 pt-4",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "text-xs font-bold text-muted-foreground",
									children: ["Sessions on June ", selectedDate.split("-")[2]]
								}), mockSessions[selectedDate] ? mockSessions[selectedDate].map((session) => /* @__PURE__ */ jsxs("div", {
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
											className: "text-sm font-semibold text-foreground mt-1 line-clamp-1",
											children: session.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground mt-0.5",
											children: session.batch
										})
									]
								}, session.id)) : /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 p-4 rounded-xl bg-secondary/20 border border-dashed border-border text-center justify-center",
									children: [/* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground",
										children: "No sessions scheduled on this date."
									})]
								})]
							})
						] }), /* @__PURE__ */ jsxs("button", {
							onClick: () => setActiveModal("batch"),
							className: "w-full mt-4 btn-hero py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5",
							children: [/* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }), " Launch Live Session"]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-2 glass rounded-2xl p-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "text-lg font-bold text-foreground",
								children: "Recent Activity Stream"
							}), /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4 text-accent" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-4",
							children: mockActivities.map((act) => /* @__PURE__ */ jsx("div", {
								className: "flex items-start justify-between gap-4 p-3 rounded-xl bg-card/45 hover:bg-card/90 transition-colors border border-border/30",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx("span", { className: `w-2 h-2 rounded-full mt-2 ${act.type === "submission" ? "bg-purple-500" : act.type === "discussion" ? "bg-cyan-500" : act.type === "upload" ? "bg-blue-500" : "bg-teal-500"}` }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
										className: "text-sm font-medium text-foreground",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "font-semibold text-primary",
												children: act.user
											}),
											" ",
											act.detail
										]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[10px] text-muted-foreground block mt-0.5",
										children: act.time
									})] })]
								})
							}, act.id))
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "glass rounded-2xl p-6 flex flex-col justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-foreground mb-4",
							children: "Pending Evaluations"
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-3",
							children: [
								{
									student: "Alice Johnson",
									task: "Docker Architecture Essay",
									deadline: "Today, 5 PM",
									delay: "critical"
								},
								{
									student: "Bob Smith",
									task: "Next.js Static Paths Lab",
									deadline: "Tomorrow",
									delay: "warning"
								},
								{
									student: "Clara Oswald",
									task: "Spring Boot OAuth Quiz",
									deadline: "In 2 days",
									delay: "normal"
								}
							].map((task, idx) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between p-3 rounded-xl bg-card border border-border/40",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
									className: "text-sm font-semibold text-foreground",
									children: task.student
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground mt-0.5 line-clamp-1",
									children: task.task
								})] }), /* @__PURE__ */ jsx("div", {
									className: "text-right",
									children: /* @__PURE__ */ jsx("span", {
										className: `text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${task.delay === "critical" ? "bg-red-500/10 text-red-500" : task.delay === "warning" ? "bg-amber-500/10 text-amber-500" : "bg-secondary text-muted-foreground"}`,
										children: task.deadline
									})
								})]
							}, idx))
						})] }), /* @__PURE__ */ jsx("button", {
							onClick: () => toast.info("Redirecting to assessments evaluation workflow..."),
							className: "w-full mt-4 bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-2 rounded-xl text-xs transition-colors",
							children: "Open Evaluation Queue"
						})]
					})]
				}),
				/* @__PURE__ */ jsx(AnimatePresence, { children: activeModal && /* @__PURE__ */ jsx(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-md",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							scale: .95,
							y: 20
						},
						animate: {
							scale: 1,
							y: 0
						},
						exit: {
							scale: .95,
							y: 20
						},
						className: "w-full max-w-lg glass rounded-2xl p-6 relative shadow-elegant border-primary/20",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => setActiveModal(null),
								className: "absolute top-4 right-4 h-8 w-8 rounded-full border bg-card hover:bg-secondary grid place-items-center cursor-pointer transition-colors",
								children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
							}),
							activeModal === "course" && /* @__PURE__ */ jsxs("form", {
								onSubmit: (e) => handleQuickAction(e, "Course created"),
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold font-display text-foreground mb-4",
									children: "Quick Create Course"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Course Title"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: "e.g. Intro to Docker & K8s",
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Subject Code"
											}), /* @__PURE__ */ jsx("input", {
												required: true,
												type: "text",
												placeholder: "e.g. CS-301",
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Duration (Hours)"
											}), /* @__PURE__ */ jsx("input", {
												required: true,
												type: "number",
												placeholder: "e.g. 15",
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] })]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Assigned Scope / University"
										}), /* @__PURE__ */ jsxs("select", {
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [
												/* @__PURE__ */ jsx("option", { children: "University of Technology" }),
												/* @__PURE__ */ jsx("option", { children: "Central Engineering Academy" }),
												/* @__PURE__ */ jsx("option", { children: "Corporate Learning Hub" })
											]
										})] }),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: loadingAction,
											className: "w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center",
											children: loadingAction ? "Creating course..." : "Generate Course Outline"
										})
									]
								})]
							}),
							activeModal === "content" && /* @__PURE__ */ jsxs("form", {
								onSubmit: (e) => handleQuickAction(e, "Asset uploaded"),
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold font-display text-foreground mb-4",
									children: "Upload Asset to Library"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Asset Name"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: "e.g. Cloud Deployments Cheat Sheet",
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Asset Type"
											}), /* @__PURE__ */ jsxs("select", {
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
												children: [
													/* @__PURE__ */ jsx("option", { children: "PDF Document" }),
													/* @__PURE__ */ jsx("option", { children: "PPT Presentation" }),
													/* @__PURE__ */ jsx("option", { children: "Comparison Grid" }),
													/* @__PURE__ */ jsx("option", { children: "Video Lesson" })
												]
											})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Subject Tags"
											}), /* @__PURE__ */ jsx("input", {
												type: "text",
												placeholder: "e.g. Cloud, Docker",
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] })]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "File Upload"
										}), /* @__PURE__ */ jsxs("div", {
											className: "border-2 border-dashed border-border/60 hover:bg-secondary/20 transition-all rounded-xl p-8 text-center cursor-pointer",
											children: [
												/* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-primary mx-auto mb-2" }),
												/* @__PURE__ */ jsx("span", {
													className: "text-xs font-bold text-foreground",
													children: "Click to select files"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-[10px] text-muted-foreground mt-0.5",
													children: "PDF, MP4, PPTX up to 1GB"
												})
											]
										})] }),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: loadingAction,
											className: "w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center",
											children: loadingAction ? "Uploading to Cloud..." : "Add to Library"
										})
									]
								})]
							}),
							activeModal === "student" && /* @__PURE__ */ jsxs("form", {
								onSubmit: (e) => handleQuickAction(e, "Student profiles imported"),
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold font-display text-foreground mb-4",
									children: "Enroll New Student"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Full Name"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: "e.g. Clara Oswald",
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Email Address"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "email",
											placeholder: "clara@example.com",
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Select Batch"
											}), /* @__PURE__ */ jsxs("select", {
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
												children: [/* @__PURE__ */ jsx("option", { children: "Spring Boot Jan 2026" }), /* @__PURE__ */ jsx("option", { children: "React Advanced Cohort" })]
											})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Roll / UID"
											}), /* @__PURE__ */ jsx("input", {
												required: true,
												type: "text",
												placeholder: "e.g. UID-9844",
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] })]
										}),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: loadingAction,
											className: "w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center",
											children: loadingAction ? "Enrolling..." : "Enroll Student"
										})
									]
								})]
							}),
							activeModal === "assessment" && /* @__PURE__ */ jsxs("form", {
								onSubmit: (e) => handleQuickAction(e, "Assessment published"),
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold font-display text-foreground mb-4",
									children: "Construct Assessment"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Title"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: "e.g. Middleware Orchestration Lab",
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Assessment Type"
											}), /* @__PURE__ */ jsxs("select", {
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
												children: [
													/* @__PURE__ */ jsx("option", { children: "Practical Lab" }),
													/* @__PURE__ */ jsx("option", { children: "Theoretical Essay" }),
													/* @__PURE__ */ jsx("option", { children: "Theoretical MCQ Test" })
												]
											})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Total Marks"
											}), /* @__PURE__ */ jsx("input", {
												required: true,
												type: "number",
												placeholder: "100",
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] })]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Submission Deadline"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "datetime-local",
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: loadingAction,
											className: "w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center",
											children: loadingAction ? "Deploying Assessment..." : "Publish Assessment"
										})
									]
								})]
							}),
							activeModal === "notification" && /* @__PURE__ */ jsxs("form", {
								onSubmit: (e) => handleQuickAction(e, "Broadcasting notification"),
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold font-display text-foreground mb-4",
									children: "Broadcast Notification Alert"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Select Audience"
										}), /* @__PURE__ */ jsxs("select", {
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [
												/* @__PURE__ */ jsx("option", { children: "All Enrolled Students (University Scope)" }),
												/* @__PURE__ */ jsx("option", { children: "Spring Boot Jan 2026 Batch" }),
												/* @__PURE__ */ jsx("option", { children: "React Advanced Cohort Batch" })
											]
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Message Content"
										}), /* @__PURE__ */ jsx("textarea", {
											required: true,
											rows: 4,
											placeholder: "Write announcement details...",
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Channels"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex gap-4",
											children: [
												/* @__PURE__ */ jsxs("label", {
													className: "flex items-center gap-1.5 text-xs font-bold cursor-pointer",
													children: [/* @__PURE__ */ jsx("input", {
														defaultChecked: true,
														type: "checkbox",
														className: "rounded border-borderaccent/40"
													}), " Email Alert"]
												}),
												/* @__PURE__ */ jsxs("label", {
													className: "flex items-center gap-1.5 text-xs font-bold cursor-pointer",
													children: [/* @__PURE__ */ jsx("input", {
														defaultChecked: true,
														type: "checkbox",
														className: "rounded border-borderaccent/40"
													}), " SMS Text"]
												}),
												/* @__PURE__ */ jsxs("label", {
													className: "flex items-center gap-1.5 text-xs font-bold cursor-pointer",
													children: [/* @__PURE__ */ jsx("input", {
														type: "checkbox",
														className: "rounded border-borderaccent/40"
													}), " WhatsApp"]
												})
											]
										})] }),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: loadingAction,
											className: "w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center",
											children: loadingAction ? "Broadcasting..." : "Send Announcement"
										})
									]
								})]
							}),
							activeModal === "batch" && /* @__PURE__ */ jsxs("form", {
								onSubmit: (e) => handleQuickAction(e, "Cohort Batch scheduled"),
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold font-display text-foreground mb-4",
									children: "Launch Batch & Schedule"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Batch Name"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: "e.g. NextJS Summer 2026",
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Associate Course"
										}), /* @__PURE__ */ jsxs("select", {
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [
												/* @__PURE__ */ jsx("option", { children: "Advanced React & Next.js" }),
												/* @__PURE__ */ jsx("option", { children: "Enterprise Architecture Patterns" }),
												/* @__PURE__ */ jsx("option", { children: "Microservices with Spring Boot" })
											]
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Session Timing"
											}), /* @__PURE__ */ jsx("input", {
												required: true,
												type: "time",
												defaultValue: "10:00",
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
											})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Virtual Room"
											}), /* @__PURE__ */ jsxs("select", {
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
												children: [
													/* @__PURE__ */ jsx("option", { children: "Virtual Room 1" }),
													/* @__PURE__ */ jsx("option", { children: "Virtual Room 2" }),
													/* @__PURE__ */ jsx("option", { children: "Virtual Room 3" })
												]
											})] })]
										}),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: loadingAction,
											className: "w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center",
											children: loadingAction ? "Setting up Calendars..." : "Initialize Batch"
										})
									]
								})]
							}),
							activeModal === "report" && /* @__PURE__ */ jsxs("form", {
								onSubmit: (e) => handleQuickAction(e, "Report compilation dispatched"),
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-xl font-bold font-display text-foreground mb-4",
									children: "Export Performance Report"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Report Category"
										}), /* @__PURE__ */ jsxs("select", {
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [
												/* @__PURE__ */ jsx("option", { children: "Student Performance & Grades" }),
												/* @__PURE__ */ jsx("option", { children: "Engagement & Attendance Logs" }),
												/* @__PURE__ */ jsx("option", { children: "Course Completion Logs" }),
												/* @__PURE__ */ jsx("option", { children: "Video Views Heatmaps Summary" })
											]
										})] }),
										/* @__PURE__ */ jsxs("div", {
											className: "grid grid-cols-2 gap-4",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Scope"
											}), /* @__PURE__ */ jsxs("select", {
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
												children: [
													/* @__PURE__ */ jsx("option", { children: "All Batches" }),
													/* @__PURE__ */ jsx("option", { children: "Spring Boot Jan 2026" }),
													/* @__PURE__ */ jsx("option", { children: "React Advanced Cohort" })
												]
											})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
												className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
												children: "Export Format"
											}), /* @__PURE__ */ jsxs("select", {
												className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
												children: [
													/* @__PURE__ */ jsx("option", { children: "Excel Worksheet (.xlsx)" }),
													/* @__PURE__ */ jsx("option", { children: "CSV Raw File (.csv)" }),
													/* @__PURE__ */ jsx("option", { children: "Acrobat Document (.pdf)" })
												]
											})] })]
										}),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											disabled: loadingAction,
											className: "w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center",
											children: loadingAction ? "Gathering data fields..." : "Compile & Download File"
										})
									]
								})]
							})
						]
					})
				}) })
			]
		})
	});
}
//#endregion
//#region src/routes/manager/index.js
var $$splitComponentImporter$31 = () => import("./manager-B3RLh3tf.js");
var Route$31 = createFileRoute("/manager/")({
	head: () => ({ meta: [{ title: "Dashboard Overview — Xebia Enterprise LMS" }, {
		name: "description",
		content: "Manager dashboard with key metrics, trends, and recent activity."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
//#endregion
//#region src/routes/admin/index.jsx
var $$splitComponentImporter$30 = () => import("./admin-BxsGtYB7.js");
var Route$30 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$30, "component") });
//#endregion
//#region src/routes/student/results.jsx
var $$splitComponentImporter$29 = () => import("./results-DO94JHwC.js");
var Route$29 = createFileRoute("/student/results")({ component: lazyRouteComponent($$splitComponentImporter$29, "component") });
//#endregion
//#region src/routes/student/profile.jsx
var $$splitComponentImporter$28 = () => import("./profile-BqEZgh7D.js");
var Route$28 = createFileRoute("/student/profile")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
//#endregion
//#region src/routes/student/notifications.jsx
var $$splitComponentImporter$27 = () => import("./notifications-DVyEc-gY.js");
var Route$27 = createFileRoute("/student/notifications")({ component: lazyRouteComponent($$splitComponentImporter$27, "component") });
//#endregion
//#region src/routes/student/feedback.jsx
var $$splitComponentImporter$26 = () => import("./feedback-B5nRJp8D.js");
var Route$26 = createFileRoute("/student/feedback")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
//#endregion
//#region src/routes/student/courses.jsx
var $$splitComponentImporter$25 = () => import("./courses-BhDkh2xO.js");
var Route$25 = createFileRoute("/student/courses")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
//#endregion
//#region src/routes/student/batches.jsx
var $$splitComponentImporter$24 = () => import("./batches-BlBrW9My.js");
var Route$24 = createFileRoute("/student/batches")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
//#endregion
//#region src/routes/student/assessments.jsx
var $$splitComponentImporter$23 = () => import("./assessments-BQpvdmSd.js");
var Route$23 = createFileRoute("/student/assessments")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
//#endregion
//#region src/routes/manager/users.js
var $$splitComponentImporter$22 = () => import("./users-DKIhRU-N.js");
var Route$22 = createFileRoute("/manager/users")({
	head: () => ({ meta: [{ title: "User Management — Xebia Enterprise LMS" }, {
		name: "description",
		content: "Manage universities, trainers, and students in the LMS."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
//#endregion
//#region src/routes/manager/feedback.js
var $$splitComponentImporter$21 = () => import("./feedback-DkrS5IOP.js");
var Route$21 = createFileRoute("/manager/feedback")({
	head: () => ({ meta: [{ title: "Feedback — Xebia Enterprise LMS" }, {
		name: "description",
		content: "View and analyze student feedback across courses."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
//#endregion
//#region src/routes/manager/approvals.js
var $$splitComponentImporter$20 = () => import("./approvals-Cg0QitAL.js");
var Route$20 = createFileRoute("/manager/approvals")({
	head: () => ({ meta: [{ title: "Approval Workflow — Xebia Enterprise LMS" }, {
		name: "description",
		content: "Review and manage pending approval requests."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
//#endregion
//#region src/routes/manager/analytics.js
var $$splitComponentImporter$19 = () => import("./analytics-DA7Z3hrM.js");
var Route$19 = createFileRoute("/manager/analytics")({
	head: () => ({ meta: [{ title: "Analytics — Xebia Enterprise LMS" }, {
		name: "description",
		content: "Course performance, enrollment trends, and learning analytics."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
//#endregion
//#region src/routes/trainer/students/index.jsx
var $$splitComponentImporter$18 = () => import("./students-DkL7sdi8.js");
var Route$18 = createFileRoute("/trainer/students/")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
//#endregion
//#region src/routes/trainer/reports/index.jsx
var $$splitComponentImporter$17 = () => import("./reports-DcQNTPFM.js");
var Route$17 = createFileRoute("/trainer/reports/")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
//#endregion
//#region src/routes/trainer/notifications/index.jsx
var $$splitComponentImporter$16 = () => import("./notifications-CyaZM3gq.js");
var Route$16 = createFileRoute("/trainer/notifications/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
//#endregion
//#region src/routes/trainer/discussions/index.jsx
var $$splitComponentImporter$15 = () => import("./discussions-nNGDtOwz.js");
var Route$15 = createFileRoute("/trainer/discussions/")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
//#endregion
//#region src/routes/trainer/courses/index.jsx
var $$splitComponentImporter$14 = () => import("./courses-DUTFPmWZ.js");
var Route$14 = createFileRoute("/trainer/courses/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
//#endregion
//#region src/routes/trainer/batches/index.jsx
var $$splitComponentImporter$13 = () => import("./batches-BA-W0C3o.js");
var Route$13 = createFileRoute("/trainer/batches/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
//#endregion
//#region src/routes/trainer/assessments/index.jsx
var $$splitComponentImporter$12 = () => import("./assessments-D7ddF6SU.js");
var Route$12 = createFileRoute("/trainer/assessments/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
//#endregion
//#region src/routes/organiser/video-lessons/index.jsx
var $$splitComponentImporter$11 = () => import("./video-lessons-YBUBk9xZ.js");
var Route$11 = createFileRoute("/organiser/video-lessons/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
//#endregion
//#region src/routes/organiser/students/index.jsx
var $$splitComponentImporter$10 = () => import("./students-CmmyiKSk.js");
var Route$10 = createFileRoute("/organiser/students/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
//#endregion
//#region src/routes/organiser/settings/index.jsx
var $$splitComponentImporter$9 = () => import("./settings-BC1guDLT.js");
var Route$9 = createFileRoute("/organiser/settings/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
//#endregion
//#region src/routes/organiser/reports/index.jsx
var $$splitComponentImporter$8 = () => import("./reports-C9IVeIKX.js");
var Route$8 = createFileRoute("/organiser/reports/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
//#endregion
//#region src/routes/organiser/notifications/index.jsx
var $$splitComponentImporter$7 = () => import("./notifications-DJQhJAlc.js");
var Route$7 = createFileRoute("/organiser/notifications/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
//#endregion
//#region src/routes/organiser/discussions/index.jsx
var $$splitComponentImporter$6 = () => import("./discussions-GYCzg_8o.js");
var Route$6 = createFileRoute("/organiser/discussions/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
//#endregion
//#region src/routes/organiser/courses/index.jsx
var $$splitComponentImporter$5 = () => import("./courses-7qwufPxL.js");
var Route$5 = createFileRoute("/organiser/courses/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/organiser/content-library/index.jsx
var $$splitComponentImporter$4 = () => import("./content-library-B37MZ1K4.js");
var Route$4 = createFileRoute("/organiser/content-library/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/organiser/batches/index.jsx
var $$splitComponentImporter$3 = () => import("./batches-N2lcQCIA.js");
var Route$3 = createFileRoute("/organiser/batches/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/organiser/assessments/index.jsx
var $$splitComponentImporter$2 = () => import("./assessments-EauHjUmk.js");
var Route$2 = createFileRoute("/organiser/assessments/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/manager/courses/index.jsx
var $$splitComponentImporter$1 = () => import("./courses-DJ3MkuyJ.js");
var Route$1 = createFileRoute("/manager/courses/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/admin/courses/builder.jsx
var $$splitComponentImporter = () => import("./builder-CIacHoep.js");
var Route = createFileRoute("/admin/courses/builder")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var TrainerRoute = Route$41.update({
	id: "/trainer",
	path: "/trainer",
	getParentRoute: () => Route$42
});
var StudentRoute = Route$40.update({
	id: "/student",
	path: "/student",
	getParentRoute: () => Route$42
});
var OrganiserRoute = Route$39.update({
	id: "/organiser",
	path: "/organiser",
	getParentRoute: () => Route$42
});
var LoginRoute = Route$38.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$42
});
var AdminRoute = Route$37.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$42
});
var ManagerRouteRoute = Route$36.update({
	id: "/manager",
	path: "/manager",
	getParentRoute: () => Route$42
});
var IndexRoute = Route$35.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$42
});
var TrainerIndexRoute = Route$34.update({
	id: "/",
	path: "/",
	getParentRoute: () => TrainerRoute
});
var StudentIndexRoute = Route$33.update({
	id: "/",
	path: "/",
	getParentRoute: () => StudentRoute
});
var OrganiserIndexRoute = Route$32.update({
	id: "/",
	path: "/",
	getParentRoute: () => OrganiserRoute
});
var ManagerIndexRoute = Route$31.update({
	id: "/",
	path: "/",
	getParentRoute: () => ManagerRouteRoute
});
var AdminIndexRoute = Route$30.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var StudentResultsRoute = Route$29.update({
	id: "/results",
	path: "/results",
	getParentRoute: () => StudentRoute
});
var StudentProfileRoute = Route$28.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => StudentRoute
});
var StudentNotificationsRoute = Route$27.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => StudentRoute
});
var StudentFeedbackRoute = Route$26.update({
	id: "/feedback",
	path: "/feedback",
	getParentRoute: () => StudentRoute
});
var StudentCoursesRoute = Route$25.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => StudentRoute
});
var StudentBatchesRoute = Route$24.update({
	id: "/batches",
	path: "/batches",
	getParentRoute: () => StudentRoute
});
var StudentAssessmentsRoute = Route$23.update({
	id: "/assessments",
	path: "/assessments",
	getParentRoute: () => StudentRoute
});
var ManagerUsersRoute = Route$22.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => ManagerRouteRoute
});
var ManagerFeedbackRoute = Route$21.update({
	id: "/feedback",
	path: "/feedback",
	getParentRoute: () => ManagerRouteRoute
});
var ManagerApprovalsRoute = Route$20.update({
	id: "/approvals",
	path: "/approvals",
	getParentRoute: () => ManagerRouteRoute
});
var ManagerAnalyticsRoute = Route$19.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => ManagerRouteRoute
});
var TrainerStudentsIndexRoute = Route$18.update({
	id: "/students/",
	path: "/students/",
	getParentRoute: () => TrainerRoute
});
var TrainerReportsIndexRoute = Route$17.update({
	id: "/reports/",
	path: "/reports/",
	getParentRoute: () => TrainerRoute
});
var TrainerNotificationsIndexRoute = Route$16.update({
	id: "/notifications/",
	path: "/notifications/",
	getParentRoute: () => TrainerRoute
});
var TrainerDiscussionsIndexRoute = Route$15.update({
	id: "/discussions/",
	path: "/discussions/",
	getParentRoute: () => TrainerRoute
});
var TrainerCoursesIndexRoute = Route$14.update({
	id: "/courses/",
	path: "/courses/",
	getParentRoute: () => TrainerRoute
});
var TrainerBatchesIndexRoute = Route$13.update({
	id: "/batches/",
	path: "/batches/",
	getParentRoute: () => TrainerRoute
});
var TrainerAssessmentsIndexRoute = Route$12.update({
	id: "/assessments/",
	path: "/assessments/",
	getParentRoute: () => TrainerRoute
});
var OrganiserVideoLessonsIndexRoute = Route$11.update({
	id: "/video-lessons/",
	path: "/video-lessons/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserStudentsIndexRoute = Route$10.update({
	id: "/students/",
	path: "/students/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserSettingsIndexRoute = Route$9.update({
	id: "/settings/",
	path: "/settings/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserReportsIndexRoute = Route$8.update({
	id: "/reports/",
	path: "/reports/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserNotificationsIndexRoute = Route$7.update({
	id: "/notifications/",
	path: "/notifications/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserDiscussionsIndexRoute = Route$6.update({
	id: "/discussions/",
	path: "/discussions/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserCoursesIndexRoute = Route$5.update({
	id: "/courses/",
	path: "/courses/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserContentLibraryIndexRoute = Route$4.update({
	id: "/content-library/",
	path: "/content-library/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserBatchesIndexRoute = Route$3.update({
	id: "/batches/",
	path: "/batches/",
	getParentRoute: () => OrganiserRoute
});
var OrganiserAssessmentsIndexRoute = Route$2.update({
	id: "/assessments/",
	path: "/assessments/",
	getParentRoute: () => OrganiserRoute
});
var ManagerCoursesIndexRoute = Route$1.update({
	id: "/courses/",
	path: "/courses/",
	getParentRoute: () => ManagerRouteRoute
});
var TrainerCoursesCourseIdRoute = Route$43.update({
	id: "/courses/$courseId",
	path: "/courses/$courseId",
	getParentRoute: () => TrainerRoute
});
var StudentCourseCourseIdRoute = Route$44.update({
	id: "/course/$courseId",
	path: "/course/$courseId",
	getParentRoute: () => StudentRoute
});
var OrganiserCoursesCourseIdRoute = Route$45.update({
	id: "/courses/$courseId",
	path: "/courses/$courseId",
	getParentRoute: () => OrganiserRoute
});
var AdminCoursesBuilderRoute = Route.update({
	id: "/courses/builder",
	path: "/courses/builder",
	getParentRoute: () => AdminRoute
});
var ManagerRouteRouteChildren = {
	ManagerAnalyticsRoute,
	ManagerApprovalsRoute,
	ManagerFeedbackRoute,
	ManagerUsersRoute,
	ManagerIndexRoute,
	ManagerCoursesIndexRoute
};
var ManagerRouteRouteWithChildren = ManagerRouteRoute._addFileChildren(ManagerRouteRouteChildren);
var AdminRouteChildren = {
	AdminIndexRoute,
	AdminCoursesBuilderRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var OrganiserRouteChildren = {
	OrganiserIndexRoute,
	OrganiserCoursesCourseIdRoute,
	OrganiserAssessmentsIndexRoute,
	OrganiserBatchesIndexRoute,
	OrganiserContentLibraryIndexRoute,
	OrganiserCoursesIndexRoute,
	OrganiserDiscussionsIndexRoute,
	OrganiserNotificationsIndexRoute,
	OrganiserReportsIndexRoute,
	OrganiserSettingsIndexRoute,
	OrganiserStudentsIndexRoute,
	OrganiserVideoLessonsIndexRoute
};
var OrganiserRouteWithChildren = OrganiserRoute._addFileChildren(OrganiserRouteChildren);
var StudentRouteChildren = {
	StudentAssessmentsRoute,
	StudentBatchesRoute,
	StudentCoursesRoute,
	StudentFeedbackRoute,
	StudentNotificationsRoute,
	StudentProfileRoute,
	StudentResultsRoute,
	StudentIndexRoute,
	StudentCourseCourseIdRoute
};
var StudentRouteWithChildren = StudentRoute._addFileChildren(StudentRouteChildren);
var TrainerRouteChildren = {
	TrainerIndexRoute,
	TrainerCoursesCourseIdRoute,
	TrainerAssessmentsIndexRoute,
	TrainerBatchesIndexRoute,
	TrainerCoursesIndexRoute,
	TrainerDiscussionsIndexRoute,
	TrainerNotificationsIndexRoute,
	TrainerReportsIndexRoute,
	TrainerStudentsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	ManagerRouteRoute: ManagerRouteRouteWithChildren,
	AdminRoute: AdminRouteWithChildren,
	LoginRoute,
	OrganiserRoute: OrganiserRouteWithChildren,
	StudentRoute: StudentRouteWithChildren,
	TrainerRoute: TrainerRoute._addFileChildren(TrainerRouteChildren)
};
var routeTree = Route$42._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.js
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
