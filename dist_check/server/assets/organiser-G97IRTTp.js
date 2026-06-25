import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-B_U50RxE.js";
import { t as Toaster } from "./sonner-Bf0BYLzR.js";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, BarChart2, Bell, BookOpen, Calendar, CalendarCheck, CheckCheck, ClipboardList, FolderOpen, GraduationCap, Info, LayoutDashboard, LogOut, Menu, MessageSquare, Moon, Search, Settings, Sun, User, Users, Video, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/organiser-sidebar.jsx
var sidebarItems = [
	{
		name: "Dashboard",
		href: "/organiser",
		icon: LayoutDashboard
	},
	{
		name: "Courses",
		href: "/organiser/courses",
		icon: BookOpen
	},
	{
		name: "Content Library",
		href: "/organiser/content-library",
		icon: FolderOpen
	},
	{
		name: "Batches & Enrolments",
		href: "/organiser/batches",
		icon: Calendar
	},
	{
		name: "Students",
		href: "/organiser/students",
		icon: Users
	},
	{
		name: "Assessments",
		href: "/organiser/assessments",
		icon: ClipboardList
	},
	{
		name: "Video Lessons",
		href: "/organiser/video-lessons",
		icon: Video
	},
	{
		name: "Engagement",
		href: "/organiser/discussions",
		icon: MessageSquare
	},
	{
		name: "Notifications",
		href: "/organiser/notifications",
		icon: Bell
	},
	{
		name: "Reports",
		href: "/organiser/reports",
		icon: BarChart2
	},
	{
		name: "Profile",
		href: "/organiser/settings",
		search: { tab: "profile" },
		icon: User
	},
	{
		name: "Settings",
		href: "/organiser/settings",
		search: { tab: "settings" },
		icon: Settings
	},
	{
		name: "Logout",
		href: "/",
		icon: LogOut,
		isLogout: true
	}
];
function OrganiserSidebar({ isCollapsed, setIsCollapsed, isMobile }) {
	const location = useLocation();
	const currentPath = location.pathname;
	return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(motion.aside, {
		animate: {
			width: isCollapsed ? isMobile ? 0 : 80 : 280,
			opacity: isCollapsed && isMobile ? 0 : 1
		},
		transition: {
			duration: .3,
			ease: "easeInOut"
		},
		className: "h-full flex flex-col border-r border-border/30 bg-card/65 backdrop-blur-xl shrink-0 overflow-hidden relative z-40 select-none",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex h-[4.5rem] shrink-0 items-center justify-between px-4 border-b border-border/30 gap-2",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3 overflow-hidden",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: "/logo-white.png",
						className: "hidden dark:block h-11 w-11 rounded-xl object-contain shrink-0 drop-shadow-md",
						alt: "Xebia logo"
					}),
					/* @__PURE__ */ jsx("img", {
						src: "/logo-purple.png",
						className: "block dark:hidden h-11 w-11 rounded-xl object-contain shrink-0 drop-shadow-sm",
						alt: "Xebia logo"
					}),
					!isCollapsed && /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							x: -10
						},
						animate: {
							opacity: 1,
							x: 0
						},
						exit: {
							opacity: 0,
							x: -10
						},
						className: "flex flex-col text-left justify-center overflow-hidden",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-display font-extrabold text-sm leading-tight tracking-wider text-foreground",
							children: "Xebia"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none",
							children: "Organiser portal"
						})]
					})
				]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex-1 py-4 overflow-y-hidden px-3 space-y-1.5",
			children: [sidebarItems.filter((item) => !item.isLogout).map((item) => {
				const isActive = item.name === "Profile" ? currentPath === "/organiser/settings" && (location.search?.tab === "profile" || !location.search?.tab) : item.name === "Settings" ? currentPath === "/organiser/settings" && location.search?.tab === "settings" : currentPath === item.href || item.href !== "/organiser" && currentPath.startsWith(item.href);
				return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Tooltip, {
					delayDuration: 150,
					children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsxs(Link, {
							to: item.href,
							search: item.search,
							className: `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${isActive ? "bg-primary/10 text-primary font-bold shadow-sm border-l-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"}`,
							children: [/* @__PURE__ */ jsx(item.icon, { className: `h-4.5 w-4.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}` }), !isCollapsed && /* @__PURE__ */ jsx(motion.span, {
								initial: {
									opacity: 0,
									x: -10
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: -10
								},
								className: "text-xs font-semibold truncate",
								children: item.name
							})]
						})
					}), isCollapsed && /* @__PURE__ */ jsx(TooltipContent, {
						side: "right",
						className: "bg-card/95 backdrop-blur text-foreground border border-border/40 shadow-elegant font-bold text-xs rounded-lg p-2.5",
						children: item.name
					})]
				}) }, item.name);
			}), /* @__PURE__ */ jsxs("div", {
				className: "pt-2 pb-1",
				children: [/* @__PURE__ */ jsx("div", { className: "border-t border-border/30 mb-2" }), /* @__PURE__ */ jsxs(Tooltip, {
					delayDuration: 150,
					children: [/* @__PURE__ */ jsx(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/",
							className: "flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-red-500/80 hover:text-red-500 hover:bg-red-500/10 font-semibold",
							children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4.5 w-4.5 shrink-0" }), !isCollapsed && /* @__PURE__ */ jsx(motion.span, {
								initial: {
									opacity: 0,
									x: -10
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: -10
								},
								className: "text-xs font-semibold truncate",
								children: "Logout"
							})]
						})
					}), isCollapsed && /* @__PURE__ */ jsx(TooltipContent, {
						side: "right",
						className: "bg-card/95 backdrop-blur text-red-500 border border-border/40 shadow-elegant font-bold text-xs rounded-lg p-2.5",
						children: "Logout"
					})]
				})]
			})]
		})]
	}) });
}
//#endregion
//#region src/routes/organiser.jsx?tsr-split=component
var SEARCH_DATA = [
	{
		id: 1,
		type: "Course",
		icon: BookOpen,
		label: "Cloud Architecture Masterclass",
		sub: "CS-308 • Published",
		href: "/organiser/courses"
	},
	{
		id: 2,
		type: "Course",
		icon: BookOpen,
		label: "Spring Boot Middleware Patterns",
		sub: "CS-210 • Draft",
		href: "/organiser/courses"
	},
	{
		id: 3,
		type: "Course",
		icon: BookOpen,
		label: "React Query In-Depth",
		sub: "CS-402 • Published",
		href: "/organiser/courses"
	},
	{
		id: 4,
		type: "Student",
		icon: GraduationCap,
		label: "Aryan Mehta",
		sub: "aryan.m@techuni.edu",
		href: "/organiser/students"
	},
	{
		id: 5,
		type: "Student",
		icon: GraduationCap,
		label: "Priya Sharma",
		sub: "priya.s@techuni.edu",
		href: "/organiser/students"
	},
	{
		id: 6,
		type: "Student",
		icon: GraduationCap,
		label: "Rohit Kumar",
		sub: "rohit.k@central.edu",
		href: "/organiser/students"
	},
	{
		id: 7,
		type: "Batch",
		icon: CalendarCheck,
		label: "Spring Boot Jan 2026",
		sub: "42 students • Active",
		href: "/organiser/batches"
	},
	{
		id: 8,
		type: "Batch",
		icon: CalendarCheck,
		label: "React Advanced Cohort",
		sub: "28 students • Active",
		href: "/organiser/batches"
	},
	{
		id: 9,
		type: "Assessment",
		icon: ClipboardList,
		label: "Midterm MCQ — Cloud Architecture",
		sub: "Pending 12 submissions",
		href: "/organiser/assessments"
	},
	{
		id: 10,
		type: "Assessment",
		icon: ClipboardList,
		label: "React Practical Exam",
		sub: "Graded • 84% avg",
		href: "/organiser/assessments"
	}
];
var INITIAL_NOTIFS = [
	{
		id: 1,
		read: false,
		icon: AlertCircle,
		color: "text-red-500",
		bg: "bg-red-500/10",
		title: "Submission Deadline Missed",
		body: "4 students missed the React Exam submission.",
		time: "2 min ago"
	},
	{
		id: 2,
		read: false,
		icon: Zap,
		color: "text-amber-500",
		bg: "bg-amber-500/10",
		title: "Batch Sync Required",
		body: "Spring Boot Jan 2026 timetable needs confirmation.",
		time: "18 min ago"
	},
	{
		id: 3,
		read: false,
		icon: Info,
		color: "text-blue-500",
		bg: "bg-blue-500/10",
		title: "New Student Enrolled",
		body: "Aryan Mehta joined Cloud Architecture Masterclass.",
		time: "1 hr ago"
	},
	{
		id: 4,
		read: true,
		icon: CheckCheck,
		color: "text-emerald-500",
		bg: "bg-emerald-500/10",
		title: "Report Export Ready",
		body: "Your June analytics PDF is ready to download.",
		time: "3 hr ago"
	},
	{
		id: 5,
		read: true,
		icon: BookOpen,
		color: "text-primary",
		bg: "bg-primary/10",
		title: "Course Published",
		body: "Spring Boot Middleware Patterns is now live.",
		time: "Yesterday"
	}
];
var TYPE_COLORS = {
	Course: "text-purple-500 bg-purple-500/10",
	Student: "text-cyan-500   bg-cyan-500/10",
	Batch: "text-teal-500   bg-teal-500/10",
	Assessment: "text-pink-500   bg-pink-500/10"
};
function OrganiserLayout() {
	const [dark, setDark] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef(null);
	const [notifOpen, setNotifOpen] = useState(false);
	const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
	const unreadCount = notifs.filter((n) => !n.read).length;
	useEffect(() => {
		const handler = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setSearchOpen((v) => !v);
			}
			if (e.key === "Escape") {
				setSearchOpen(false);
				setNotifOpen(false);
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);
	useEffect(() => {
		if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 80);
		else setSearchQuery("");
	}, [searchOpen]);
	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			if (mobile) setIsCollapsed(true);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);
	useEffect(() => {
		const stored = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const isDark = stored ? stored === "dark" : prefersDark;
		setDark(isDark);
		document.documentElement.classList.toggle("dark", isDark);
	}, []);
	const toggleTheme = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("theme", next ? "dark" : "light");
	};
	const filteredResults = searchQuery.trim().length > 0 ? SEARCH_DATA.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()) || item.sub.toLowerCase().includes(searchQuery.toLowerCase())) : SEARCH_DATA;
	const markAllRead = () => setNotifs((prev) => prev.map((n) => ({
		...n,
		read: true
	})));
	const markRead = (id) => setNotifs((prev) => prev.map((n) => n.id === id ? {
		...n,
		read: true
	} : n));
	return /* @__PURE__ */ jsxs("div", {
		className: "flex h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-300",
		children: [
			/* @__PURE__ */ jsx(OrganiserSidebar, {
				isCollapsed,
				setIsCollapsed,
				isMobile
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col flex-1 h-full overflow-hidden relative",
				children: [
					/* @__PURE__ */ jsxs("header", {
						className: "flex h-16 shrink-0 items-center gap-2 border-b border-border/30 px-4 glass backdrop-blur-md sticky top-0 z-30 justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("button", {
								onClick: () => setIsCollapsed(!isCollapsed),
								"aria-label": "Toggle Sidebar",
								className: "h-9 w-9 rounded-full border border-border/40 bg-card hover:bg-secondary grid place-items-center cursor-pointer transition-colors",
								children: /* @__PURE__ */ jsx(Menu, { className: "h-4.5 w-4.5 text-muted-foreground" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 font-bold text-xl text-primary",
								children: [/* @__PURE__ */ jsx("span", { children: "Xebia" }), /* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium text-muted-foreground mt-1 hidden sm:block",
									children: "Enterprise LMS"
								})]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 sm:gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "hidden md:flex items-center gap-2 text-sm border border-border/40 rounded-full px-3.5 py-1.5 bg-secondary/50 backdrop-blur-sm",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-muted-foreground",
										children: "Scope:"
									}), /* @__PURE__ */ jsxs("select", {
										className: "bg-secondary/0 border-none outline-none font-semibold text-foreground cursor-pointer text-xs [color-scheme:inherit]",
										style: { background: "transparent" },
										children: [/* @__PURE__ */ jsx("option", {
											style: {
												backgroundColor: "var(--card)",
												color: "var(--foreground)"
											},
											children: "University of Technology"
										}), /* @__PURE__ */ jsx("option", {
											style: {
												backgroundColor: "var(--card)",
												color: "var(--foreground)"
											},
											children: "Corporate Training Corp"
										})]
									})]
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setSearchOpen(true),
									"aria-label": "Open global search",
									className: "h-9 w-9 rounded-full border border-border/40 bg-card hover:bg-secondary grid place-items-center cursor-pointer transition-colors",
									children: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-muted-foreground" })
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: toggleTheme,
									"aria-label": dark ? "Switch to light mode" : "Switch to dark mode",
									className: "h-9 w-9 rounded-full border border-border/40 bg-card hover:bg-secondary grid place-items-center cursor-pointer transition-colors",
									children: dark ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 text-muted-foreground" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4 text-muted-foreground" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsxs("button", {
										onClick: () => {
											setNotifOpen((v) => !v);
											setIsDropdownOpen(false);
										},
										"aria-label": "Open notifications",
										className: "h-9 w-9 rounded-full border border-border/40 bg-card hover:bg-secondary grid place-items-center relative cursor-pointer transition-colors",
										children: [/* @__PURE__ */ jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(AnimatePresence, { children: unreadCount > 0 && /* @__PURE__ */ jsx(motion.span, {
											initial: { scale: 0 },
											animate: { scale: 1 },
											exit: { scale: 0 },
											className: "absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center",
											children: unreadCount
										}) })]
									}), /* @__PURE__ */ jsx(AnimatePresence, { children: notifOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
										className: "fixed inset-0 z-40",
										onClick: () => setNotifOpen(false)
									}), /* @__PURE__ */ jsxs(motion.div, {
										initial: {
											opacity: 0,
											y: 10,
											scale: .95
										},
										animate: {
											opacity: 1,
											y: 0,
											scale: 1
										},
										exit: {
											opacity: 0,
											y: 10,
											scale: .95
										},
										transition: { duration: .2 },
										className: "absolute right-0 top-11 w-80 rounded-2xl glass-strong border border-border/40 shadow-elegant z-50 overflow-hidden",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between px-4 py-3 border-b border-border/30",
												children: [/* @__PURE__ */ jsx("span", {
													className: "font-bold text-sm text-foreground",
													children: "Notifications"
												}), /* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2",
													children: [unreadCount > 0 && /* @__PURE__ */ jsx("button", {
														onClick: markAllRead,
														className: "text-[10px] font-bold text-primary hover:underline cursor-pointer",
														children: "Mark all read"
													}), /* @__PURE__ */ jsx("button", {
														onClick: () => setNotifOpen(false),
														className: "cursor-pointer",
														children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground hover:text-foreground" })
													})]
												})]
											}),
											/* @__PURE__ */ jsx("div", {
												className: "max-h-80 overflow-y-auto divide-y divide-border/20",
												children: notifs.map((n) => /* @__PURE__ */ jsxs(motion.div, {
													layout: true,
													onClick: () => markRead(n.id),
													className: `flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-secondary/30 ${!n.read ? "bg-primary/[0.04]" : ""}`,
													children: [/* @__PURE__ */ jsx("div", {
														className: `shrink-0 h-8 w-8 rounded-xl flex items-center justify-center ${n.bg}`,
														children: /* @__PURE__ */ jsx(n.icon, { className: `w-3.5 h-3.5 ${n.color}` })
													}), /* @__PURE__ */ jsxs("div", {
														className: "flex-1 min-w-0",
														children: [
															/* @__PURE__ */ jsxs("div", {
																className: "flex items-start justify-between gap-1",
																children: [/* @__PURE__ */ jsx("p", {
																	className: `text-xs font-bold truncate ${!n.read ? "text-foreground" : "text-muted-foreground"}`,
																	children: n.title
																}), !n.read && /* @__PURE__ */ jsx("span", { className: "shrink-0 h-1.5 w-1.5 rounded-full bg-primary mt-1" })]
															}),
															/* @__PURE__ */ jsx("p", {
																className: "text-[10px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2",
																children: n.body
															}),
															/* @__PURE__ */ jsx("p", {
																className: "text-[9px] text-muted-foreground/60 mt-1 font-semibold",
																children: n.time
															})
														]
													})]
												}, n.id))
											}),
											/* @__PURE__ */ jsx("div", {
												className: "px-4 py-2.5 border-t border-border/30 text-center",
												children: /* @__PURE__ */ jsx(Link, {
													to: "/organiser/notifications",
													onClick: () => setNotifOpen(false),
													className: "text-[11px] font-bold text-primary hover:underline cursor-pointer",
													children: "View all in Notifications →"
												})
											})
										]
									})] }) })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsxs("button", {
										onClick: () => {
											setIsDropdownOpen(!isDropdownOpen);
											setNotifOpen(false);
										},
										className: "flex flex-col items-center justify-center cursor-pointer group select-none",
										children: [/* @__PURE__ */ jsx("img", {
											src: "/avatar.png",
											className: "h-9 w-9 rounded-full border border-border/40 object-cover hover:scale-105 transition-transform shadow-sm",
											alt: "Avatar"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[9px] text-muted-foreground font-bold mt-0.5 group-hover:text-primary transition-colors",
											children: "Organiser"
										})]
									}), /* @__PURE__ */ jsx(AnimatePresence, { children: isDropdownOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
										className: "fixed inset-0 z-40",
										onClick: () => setIsDropdownOpen(false)
									}), /* @__PURE__ */ jsxs(motion.div, {
										initial: {
											opacity: 0,
											y: 10,
											scale: .95
										},
										animate: {
											opacity: 1,
											y: 0,
											scale: 1
										},
										exit: {
											opacity: 0,
											y: 10,
											scale: .95
										},
										transition: { duration: .2 },
										className: "absolute right-0 mt-2 w-48 rounded-2xl glass-strong border border-border/40 shadow-elegant z-50 py-1.5 p-2 text-sm",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex flex-col items-center justify-center py-3 border-b border-border/30 mb-2",
												children: [
													/* @__PURE__ */ jsx("img", {
														src: "/avatar.png",
														className: "h-12 w-12 rounded-full border border-primary/30 object-cover mb-1.5 shadow",
														alt: "Avatar"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "font-bold text-foreground text-xs",
														children: "Vikram Dev"
													}),
													/* @__PURE__ */ jsx("span", {
														className: "text-[9px] uppercase font-bold text-primary tracking-widest mt-0.5",
														children: "Organiser"
													})
												]
											}),
											/* @__PURE__ */ jsxs(Link, {
												to: "/organiser/settings",
												search: { tab: "profile" },
												onClick: () => setIsDropdownOpen(false),
												className: "w-full text-left px-3 py-2 hover:bg-secondary/60 rounded-xl font-semibold text-xs text-foreground flex items-center gap-2 cursor-pointer transition-colors",
												children: [/* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }), " Profile"]
											}),
											/* @__PURE__ */ jsxs(Link, {
												to: "/organiser/settings",
												search: { tab: "settings" },
												onClick: () => setIsDropdownOpen(false),
												className: "w-full text-left px-3 py-2 hover:bg-secondary/60 rounded-xl font-semibold text-xs text-foreground flex items-center gap-2 cursor-pointer transition-colors",
												children: [/* @__PURE__ */ jsx(Settings, { className: "w-3.5 h-3.5 text-muted-foreground" }), " Settings"]
											}),
											/* @__PURE__ */ jsxs(Link, {
												to: "/organiser/notifications",
												onClick: () => setIsDropdownOpen(false),
												className: "w-full text-left px-3 py-2 hover:bg-secondary/60 rounded-xl font-semibold text-xs text-foreground flex items-center gap-2 cursor-pointer transition-colors",
												children: [/* @__PURE__ */ jsx(Bell, { className: "w-3.5 h-3.5 text-muted-foreground" }), " Notifications"]
											}),
											/* @__PURE__ */ jsx("hr", { className: "my-1.5 border-border/30" }),
											/* @__PURE__ */ jsxs(Link, {
												to: "/",
												onClick: () => setIsDropdownOpen(false),
												className: "w-full text-left px-3 py-2 hover:bg-red-500/10 text-red-500 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors",
												children: [/* @__PURE__ */ jsx(LogOut, { className: "w-3.5 h-3.5" }), " Logout"]
											})
										]
									})] }) })]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx(AnimatePresence, { children: searchOpen && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						className: "fixed inset-0 z-50 bg-background/60 backdrop-blur-sm",
						onClick: () => setSearchOpen(false)
					}), /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							scale: .97,
							y: -20
						},
						animate: {
							opacity: 1,
							scale: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							scale: .97,
							y: -20
						},
						transition: {
							duration: .2,
							ease: "easeOut"
						},
						className: "fixed top-[12vh] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4",
						children: /* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl glass-strong border border-border/40 shadow-elegant overflow-hidden",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3 px-4 py-3.5 border-b border-border/30",
									children: [
										/* @__PURE__ */ jsx(Search, { className: "w-4.5 h-4.5 text-muted-foreground shrink-0" }),
										/* @__PURE__ */ jsx("input", {
											ref: searchInputRef,
											type: "text",
											value: searchQuery,
											onChange: (e) => setSearchQuery(e.target.value),
											placeholder: "Search courses, students, batches, assessments…",
											className: "flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ jsx("kbd", {
												className: "hidden sm:block text-[9px] font-bold px-1.5 py-0.5 rounded border border-border/50 text-muted-foreground bg-secondary/50",
												children: "ESC"
											}), /* @__PURE__ */ jsx("button", {
												onClick: () => setSearchOpen(false),
												className: "cursor-pointer",
												children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground hover:text-foreground" })
											})]
										})
									]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "max-h-72 overflow-y-auto py-2",
									children: filteredResults.length === 0 ? /* @__PURE__ */ jsxs("p", {
										className: "text-center text-xs text-muted-foreground py-8",
										children: [
											"No results found for \"",
											/* @__PURE__ */ jsx("span", {
												className: "font-semibold text-foreground",
												children: searchQuery
											}),
											"\""
										]
									}) : filteredResults.map((item) => /* @__PURE__ */ jsxs(Link, {
										to: item.href,
										onClick: () => setSearchOpen(false),
										className: "flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/40 cursor-pointer transition-colors group",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: `h-8 w-8 shrink-0 rounded-xl flex items-center justify-center text-xs font-bold ${TYPE_COLORS[item.type]}`,
												children: /* @__PURE__ */ jsx(item.icon, { className: "w-3.5 h-3.5" })
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ jsx("p", {
													className: "text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors",
													children: item.label
												}), /* @__PURE__ */ jsx("p", {
													className: "text-[10px] text-muted-foreground",
													children: item.sub
												})]
											}),
											/* @__PURE__ */ jsx("span", {
												className: `text-[9px] font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[item.type]}`,
												children: item.type
											})
										]
									}, item.id))
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "px-4 py-2 border-t border-border/20 flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "text-[10px] text-muted-foreground",
										children: [
											filteredResults.length,
											" result",
											filteredResults.length !== 1 ? "s" : ""
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-[10px] text-muted-foreground",
										children: [
											/* @__PURE__ */ jsx("kbd", {
												className: "px-1.5 py-0.5 rounded border border-border/50 bg-secondary/50 font-bold",
												children: "↑↓"
											}),
											" navigate",
											/* @__PURE__ */ jsx("kbd", {
												className: "px-1.5 py-0.5 rounded border border-border/50 bg-secondary/50 font-bold",
												children: "↵"
											}),
											" open",
											/* @__PURE__ */ jsx("kbd", {
												className: "px-1.5 py-0.5 rounded border border-border/50 bg-secondary/50 font-bold",
												children: "Ctrl K"
											}),
											" toggle"
										]
									})]
								})
							]
						})
					})] }) }),
					/* @__PURE__ */ jsxs("main", {
						className: "flex-1 overflow-auto relative p-4 sm:p-6 min-h-[calc(100vh-4rem)]",
						style: { background: "var(--color-background)" },
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0 pointer-events-none dark:opacity-0 transition-opacity duration-500 -z-10",
								style: { background: "radial-gradient(ellipse 80% 60% at 20% 0%, oklch(0.92 0.06 320 / 0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, oklch(0.9 0.07 200 / 0.35) 0%, transparent 60%)" }
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500 -z-10",
								style: { background: "radial-gradient(ellipse 70% 50% at 10% 0%, oklch(0.22 0.08 310 / 0.5) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, oklch(0.2 0.07 200 / 0.4) 0%, transparent 60%)" }
							}),
							/* @__PURE__ */ jsx("div", { className: "absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-blob pointer-events-none -z-10" }),
							/* @__PURE__ */ jsx("div", {
								className: "absolute bottom-10 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px] animate-blob pointer-events-none -z-10",
								style: { animationDelay: "4s" }
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full pointer-events-none -z-10 animate-blob",
								style: {
									background: "oklch(0.76 0.14 165 / 0.07)",
									filter: "blur(90px)",
									animationDelay: "8s"
								}
							}),
							/* @__PURE__ */ jsx(Outlet, {})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(Toaster, {})
		]
	});
}
//#endregion
export { OrganiserLayout as component };
