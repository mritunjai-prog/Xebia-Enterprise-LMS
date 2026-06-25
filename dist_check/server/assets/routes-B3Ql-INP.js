import { t as ThemeToggle } from "./theme-toggle-BYe0BfPx.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, ArrowUp, Award, BarChart3, Bell, BookOpen, Briefcase, Building2, Calendar, CheckCircle2, ChevronDown, ClipboardCheck, Cloud, Code, Cpu, Database, Download, FileCheck, FileText, GitBranch, Globe, Globe2, GraduationCap, Hash, Layers, Lock, Mail, Menu, MessageSquare, Network, Play, PlayCircle, Quote, Search, Server, Settings2, Shield, Smartphone, Sparkles, Star, UserCircle2, UserCog, Users, Video, Workflow, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/navbar.js
var logoPurple = "/logo-purple.png";
var NAV = [
	{
		label: "Features",
		href: "#features"
	},
	{
		label: "Solutions",
		href: "#solutions"
	},
	{
		label: "Modules",
		href: "#modules"
	},
	{
		label: "Architecture",
		href: "#architecture"
	},
	{
		label: "Pricing",
		href: "#pricing"
	},
	{
		label: "Resources",
		href: "#resources"
	},
	{
		label: "Contact",
		href: "#contact"
	}
];
function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return jsx("header", {
		className: `fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`,
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsxs("nav", {
				className: `glass rounded-2xl flex items-center gap-3 px-3 sm:px-4 py-2.5 ${scrolled ? "shadow-lg" : ""}`,
				"aria-label": "Primary",
				children: [
					jsxs(Link, {
						to: "/",
						className: "flex items-center gap-2 shrink-0",
						children: [jsx("img", {
							suppressHydrationWarning: true,
							src: logoPurple,
							alt: "Xebia",
							className: "h-9 w-9 rounded-full dark:brightness-0 dark:invert"
						}), jsxs("span", {
							className: "hidden sm:block font-display font-bold text-sm leading-tight",
							children: [
								"Xebia",
								jsx("br", {}),
								jsx("span", {
									className: "text-[10px] font-medium text-muted-foreground",
									children: "Enterprise LMS"
								})
							]
						})]
					}),
					jsx("ul", {
						className: "hidden lg:flex items-center gap-1 ml-4",
						children: NAV.map((n) => jsx("li", { children: jsx("a", {
							href: n.href,
							className: "ring-focus rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition",
							children: n.label
						}) }, n.label))
					}),
					jsxs("div", {
						className: "ml-auto flex items-center gap-1.5",
						children: [
							jsx("button", {
								"aria-label": "Search",
								className: "ring-focus hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition",
								children: jsx(Search, { className: "h-4 w-4" })
							}),
							jsx("button", {
								"aria-label": "Language",
								className: "ring-focus hidden md:grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition",
								children: jsx(Globe, { className: "h-4 w-4" })
							}),
							jsxs("button", {
								"aria-label": "Notifications",
								className: "ring-focus hidden md:grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition relative",
								children: [jsx(Bell, { className: "h-4 w-4" }), jsx("span", { className: "absolute top-2 right-2 h-2 w-2 rounded-full bg-primary-glow" })]
							}),
							jsx(ThemeToggle, {}),
							jsx(Link, {
								to: "/login",
								className: "ring-focus hidden md:inline-flex h-10 items-center rounded-full px-4 text-sm font-medium hover:bg-secondary transition",
								children: "Sign In"
							}),
							jsx("a", {
								href: "#cta",
								className: "ring-focus btn-hero hidden sm:inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold",
								children: "Get Started"
							}),
							jsx("button", {
								"aria-label": open ? "Close menu" : "Open menu",
								onClick: () => setOpen(!open),
								className: "ring-focus lg:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-secondary",
								children: open ? jsx(X, { className: "h-5 w-5" }) : jsx(Menu, { className: "h-5 w-5" })
							})
						]
					})
				]
			}), jsx(AnimatePresence, { children: open && jsx(motion.div, {
				initial: {
					opacity: 0,
					y: -8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -8
				},
				className: "lg:hidden mt-2 glass rounded-2xl p-3",
				children: jsxs("ul", {
					className: "grid gap-1",
					children: [NAV.map((n) => jsx("li", { children: jsx("a", {
						onClick: () => setOpen(false),
						href: n.href,
						className: "block rounded-xl px-4 py-3 font-medium hover:bg-secondary",
						children: n.label
					}) }, n.label)), jsxs("li", {
						className: "grid grid-cols-2 gap-2 pt-2",
						children: [jsx(Link, {
							to: "/login",
							className: "ring-focus h-11 grid place-items-center rounded-xl border font-medium",
							children: "Sign In"
						}), jsx("a", {
							href: "#cta",
							className: "ring-focus btn-hero h-11 grid place-items-center rounded-xl font-semibold",
							children: "Get Started"
						})]
					})]
				})
			}) })]
		})
	});
}
//#endregion
//#region src/components/lms-sections.js
function Hero() {
	return jsxs("section", {
		className: "relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28",
		children: [
			jsx("div", { className: "absolute inset-0 bg-mesh -z-10" }),
			jsx("div", { className: "absolute -z-10 top-20 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" }),
			jsx("div", {
				className: "absolute -z-10 bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-blob",
				style: { animationDelay: "4s" }
			}),
			jsx("div", {
				className: "mx-auto max-w-7xl px-4",
				children: jsxs("div", {
					className: "grid lg:grid-cols-2 gap-12 items-center",
					children: [jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .7 },
						children: [
							jsxs("div", {
								className: "inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-medium mb-6",
								children: [jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), "Multi-tenant • Enterprise grade • Event driven"]
							}),
							jsxs("h1", {
								className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight",
								children: [
									"One Platform for ",
									jsx("span", {
										className: "text-gradient",
										children: "Universities, Organisations"
									}),
									" and Enterprise Learning"
								]
							}),
							jsx("p", {
								className: "mt-6 text-base sm:text-lg text-muted-foreground max-w-xl",
								children: "Manage identity, courses, assessments, video learning, notifications and reporting on a single multi-tenant platform built for scale."
							}),
							jsxs("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [
									jsxs("a", {
										href: "#cta",
										className: "ring-focus btn-hero inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold",
										children: ["Start Learning ", jsx(ArrowRight, { className: "h-4 w-4" })]
									}),
									jsxs("a", {
										href: "#cta",
										className: "ring-focus glass inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold hover:scale-[1.02] transition",
										children: [jsx(Play, { className: "h-4 w-4" }), " Book Demo"]
									}),
									jsx("a", {
										href: "#features",
										className: "ring-focus inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold border hover:bg-secondary transition",
										children: "Explore Platform"
									})
								]
							}),
							jsx("div", {
								className: "mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground",
								children: [
									"SOC2 Ready",
									"WCAG AA",
									"99.5% Uptime",
									"GDPR Compliant"
								].map((t) => jsxs("div", {
									className: "flex items-center gap-1.5",
									children: [
										jsx(CheckCircle2, { className: "h-3.5 w-3.5 text-primary" }),
										" ",
										t
									]
								}, t))
							})
						]
					}), jsx(HeroDashboard, {})]
				})
			})
		]
	});
}
function HeroDashboard() {
	const roles = [
		{
			label: "Admin",
			icon: Shield
		},
		{
			label: "Manager",
			icon: Briefcase
		},
		{
			label: "Trainer",
			icon: GraduationCap
		},
		{
			label: "Organiser",
			icon: Calendar
		},
		{
			label: "Student",
			icon: UserCircle2
		}
	];
	const tiles = [
		{
			label: "Courses",
			icon: BookOpen,
			hue: "from-primary to-primary-glow"
		},
		{
			label: "Assessments",
			icon: ClipboardCheck,
			hue: "from-accent to-accent-2"
		},
		{
			label: "Video",
			icon: PlayCircle,
			hue: "from-primary-glow to-accent"
		},
		{
			label: "Notifications",
			icon: Bell,
			hue: "from-accent-2 to-primary"
		},
		{
			label: "Reports",
			icon: BarChart3,
			hue: "from-primary to-accent"
		},
		{
			label: "Analytics",
			icon: Cpu,
			hue: "from-accent to-primary-glow"
		}
	];
	return jsx(motion.div, {
		initial: {
			opacity: 0,
			scale: .95
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		transition: {
			duration: .8,
			delay: .2
		},
		className: "relative",
		children: jsxs("div", {
			className: "glass-strong rounded-3xl p-5 sm:p-6 shadow-[var(--shadow-elegant)]",
			children: [
				jsxs("div", {
					className: "flex items-center justify-between mb-4",
					children: [jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-destructive/60" }),
							jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-400/70" }),
							jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-400/70" })
						]
					}), jsx("span", {
						className: "text-[10px] font-mono text-muted-foreground",
						children: "lms.xebia.app/dashboard"
					})]
				}),
				jsx("div", {
					className: "grid grid-cols-5 gap-2 mb-4",
					children: roles.map((r) => jsxs("div", {
						className: "glass rounded-xl p-2 grid place-items-center text-center",
						children: [jsx(r.icon, { className: "h-4 w-4 text-primary mb-1" }), jsx("span", {
							className: "text-[10px] font-medium truncate w-full",
							children: r.label
						})]
					}, r.label))
				}),
				jsx("div", {
					className: "grid grid-cols-3 gap-3",
					children: tiles.map((t, i) => jsxs(motion.div, {
						animate: { y: [
							0,
							-6,
							0
						] },
						transition: {
							duration: 4 + i * .3,
							repeat: Infinity,
							ease: "easeInOut"
						},
						className: "glass rounded-2xl p-3 sm:p-4",
						children: [
							jsx("div", {
								className: `h-9 w-9 rounded-xl bg-gradient-to-br ${t.hue} grid place-items-center mb-3 shadow-[var(--shadow-glow)]`,
								children: jsx(t.icon, { className: "h-4 w-4 text-primary-foreground" })
							}),
							jsx("div", {
								className: "text-xs font-semibold",
								children: t.label
							}),
							jsx("div", {
								className: "mt-1 h-1.5 w-full rounded-full bg-secondary overflow-hidden",
								children: jsx("div", {
									className: "h-full bg-gradient-to-r from-primary to-accent",
									style: { width: `${40 + i * 9}%` }
								})
							})
						]
					}, t.label))
				}),
				jsxs("div", {
					className: "mt-4 glass rounded-2xl p-4 flex items-center justify-between",
					children: [jsxs("div", { children: [jsx("div", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "This week"
					}), jsx("div", {
						className: "font-display font-bold text-xl",
						children: "12,480 sessions"
					})] }), jsx(Sparkline, {})]
				})
			]
		})
	});
}
function Sparkline() {
	const pts = [
		8,
		14,
		10,
		18,
		16,
		24,
		22,
		30,
		28,
		36
	];
	const max = Math.max(...pts);
	const d = pts.map((p, i) => `${i / (pts.length - 1) * 160},${40 - p / max * 36}`).join(" ");
	return jsxs("svg", {
		viewBox: "0 0 160 40",
		className: "h-10 w-40",
		children: [jsx("defs", { children: jsxs("linearGradient", {
			id: "sp",
			x1: "0",
			x2: "1",
			children: [jsx("stop", {
				offset: "0%",
				stopColor: "oklch(0.55 0.22 320)"
			}), jsx("stop", {
				offset: "100%",
				stopColor: "oklch(0.78 0.14 200)"
			})]
		}) }), jsx("polyline", {
			fill: "none",
			stroke: "url(#sp)",
			strokeWidth: "2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			points: d
		})]
	});
}
var STATS = [
	{
		value: 500,
		suffix: "+",
		label: "Universities"
	},
	{
		value: 1e3,
		suffix: "+",
		label: "Trainers"
	},
	{
		value: 100,
		suffix: "K+",
		label: "Students"
	},
	{
		value: 1,
		suffix: "M+",
		label: "Learning Sessions"
	},
	{
		value: 99.5,
		suffix: "%",
		label: "Availability"
	},
	{
		value: 50,
		suffix: "+",
		label: "Enterprise Clients"
	}
];
function Counter({ to, suffix }) {
	const [n, setN] = useState(0);
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				const start = performance.now();
				const dur = 1400;
				const tick = (t) => {
					const p = Math.min(1, (t - start) / dur);
					setN(to * (1 - Math.pow(1 - p, 3)));
					if (p < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
				io.disconnect();
			}
		});
		io.observe(el);
		return () => io.disconnect();
	}, [to]);
	return jsxs("div", {
		ref,
		className: "font-display font-bold text-3xl sm:text-4xl text-gradient",
		children: [to % 1 === 0 ? Math.round(n).toLocaleString() : n.toFixed(1), suffix]
	});
}
function Stats() {
	return jsx("section", {
		className: "py-16 sm:py-24",
		children: jsx("div", {
			className: "mx-auto max-w-7xl px-4",
			children: jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4",
				children: STATS.map((s) => jsxs("div", {
					className: "glass rounded-2xl p-5 text-center hover:-translate-y-1 transition",
					children: [jsx(Counter, {
						to: s.value,
						suffix: s.suffix
					}), jsx("div", {
						className: "mt-1 text-xs sm:text-sm text-muted-foreground font-medium",
						children: s.label
					})]
				}, s.label))
			})
		})
	});
}
function Heading({ eyebrow, title, sub }) {
	return jsxs("div", {
		className: "max-w-2xl mx-auto text-center mb-12 sm:mb-16",
		children: [
			jsxs("div", {
				className: "inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary",
				children: [
					jsx(Sparkles, { className: "h-3 w-3" }),
					" ",
					eyebrow
				]
			}),
			jsx("h2", {
				className: "mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
				children: title
			}),
			sub && jsx("p", {
				className: "mt-4 text-muted-foreground",
				children: sub
			})
		]
	});
}
var FEATURES = [
	{
		icon: Shield,
		t: "Dynamic RBAC",
		d: "Granular permissions assignable per tenant, role and module."
	},
	{
		icon: Layers,
		t: "Multi-Tenant Architecture",
		d: "Isolated data planes with shared services for scale."
	},
	{
		icon: Building2,
		t: "Organisation Management",
		d: "Hierarchies, departments, cohorts and policies."
	},
	{
		icon: UserCog,
		t: "User Provisioning",
		d: "SCIM, SSO and bulk lifecycle automation."
	},
	{
		icon: GitBranch,
		t: "Governance Workflow",
		d: "Multi-step approvals with audit trails."
	},
	{
		icon: BookOpen,
		t: "Course Management",
		d: "Versioned content, prerequisites and outcomes."
	},
	{
		icon: Users,
		t: "Batch Management",
		d: "Cohorts, schedules and enrolments at scale."
	},
	{
		icon: ClipboardCheck,
		t: "Assessments",
		d: "Theory, practical and online evaluations."
	},
	{
		icon: PlayCircle,
		t: "Adaptive Video",
		d: "HLS streaming with signed URLs and continue-watching."
	},
	{
		icon: Bell,
		t: "Notifications",
		d: "Email, SMS, WhatsApp and documents with retry."
	},
	{
		icon: BarChart3,
		t: "Analytics & Reporting",
		d: "Cohort, course and learner insight dashboards."
	},
	{
		icon: Settings2,
		t: "Administration",
		d: "Per-tenant configuration and feature flags."
	}
];
function Features() {
	return jsx("section", {
		id: "features",
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Core features",
				title: "Everything you need to run learning at scale",
				sub: "Twelve enterprise capabilities, deeply integrated and configurable per tenant."
			}), jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5",
				children: FEATURES.map((f, i) => jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 24
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: .5,
						delay: i % 3 * .08
					},
					whileHover: { y: -6 },
					className: "group glass rounded-2xl p-6 relative overflow-hidden",
					children: [jsx("div", { className: "absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" }), jsxs("div", {
						className: "relative",
						children: [
							jsx("div", {
								className: "h-11 w-11 rounded-xl glass grid place-items-center mb-4",
								children: jsx(f.icon, { className: "h-5 w-5 text-primary" })
							}),
							jsx("h3", {
								className: "font-display font-semibold text-lg",
								children: f.t
							}),
							jsx("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: f.d
							}),
							jsxs("a", {
								href: "#",
								className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary ring-focus rounded-md",
								children: ["Learn more ", jsx(ArrowRight, { className: "h-3.5 w-3.5 transition group-hover:translate-x-0.5" })]
							})
						]
					})]
				}, f.t))
			})]
		})
	});
}
var ROLES = [
	{
		name: "Admin",
		icon: Shield,
		color: "from-primary to-primary-glow",
		resp: "Platform configuration, tenants, policies",
		perms: [
			"Full access",
			"Manage tenants",
			"Audit logs"
		],
		modules: ["IAM", "All Modules"],
		actions: ["Approve users", "Configure SSO"]
	},
	{
		name: "Manager",
		icon: Briefcase,
		color: "from-primary-glow to-accent",
		resp: "Department learning programs",
		perms: ["Approve requests", "Assign cohorts"],
		modules: ["Org", "Reports"],
		actions: ["Approve enrolment", "Review reports"]
	},
	{
		name: "Trainer",
		icon: GraduationCap,
		color: "from-accent to-accent-2",
		resp: "Course delivery and evaluation",
		perms: ["Create content", "Grade"],
		modules: ["Courses", "Assessments"],
		actions: ["Publish course", "Grade exam"]
	},
	{
		name: "Organiser",
		icon: Calendar,
		color: "from-accent-2 to-primary",
		resp: "Batch scheduling and operations",
		perms: ["Manage batches", "Notify"],
		modules: ["Batches", "Notifications"],
		actions: ["Create batch", "Send notice"]
	},
	{
		name: "Student",
		icon: UserCircle2,
		color: "from-primary to-accent",
		resp: "Learning, assessment, certification",
		perms: ["Enrol", "Submit"],
		modules: [
			"Courses",
			"Video",
			"Tests"
		],
		actions: ["Resume video", "Take quiz"]
	}
];
function Roles() {
	const [active, setActive] = useState(0);
	const r = ROLES[active];
	return jsx("section", {
		id: "solutions",
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Role based platform",
				title: "Tailored experiences for every persona"
			}), jsxs("div", {
				className: "grid lg:grid-cols-[1fr_1.4fr] gap-6",
				children: [jsx("div", {
					className: "grid sm:grid-cols-2 lg:grid-cols-1 gap-3",
					children: ROLES.map((rr, i) => jsxs("button", {
						onClick: () => setActive(i),
						className: `ring-focus text-left glass rounded-2xl p-4 flex items-center gap-3 transition ${active === i ? "ring-2 ring-primary shadow-[var(--shadow-glow)]" : "hover:-translate-y-0.5"}`,
						children: [jsx("div", {
							className: `h-10 w-10 rounded-xl bg-gradient-to-br ${rr.color} grid place-items-center shrink-0`,
							children: jsx(rr.icon, { className: "h-5 w-5 text-primary-foreground" })
						}), jsxs("div", {
							className: "min-w-0",
							children: [jsx("div", {
								className: "font-semibold truncate",
								children: rr.name
							}), jsx("div", {
								className: "text-xs text-muted-foreground truncate",
								children: rr.resp
							})]
						})]
					}, rr.name))
				}), jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .4 },
					className: "glass-strong rounded-3xl p-6 sm:p-8",
					children: [jsxs("div", {
						className: "flex items-center gap-3 mb-6",
						children: [jsx("div", {
							className: `h-12 w-12 rounded-2xl bg-gradient-to-br ${r.color} grid place-items-center`,
							children: jsx(r.icon, { className: "h-6 w-6 text-primary-foreground" })
						}), jsxs("div", { children: [jsx("div", {
							className: "font-display text-2xl font-bold",
							children: r.name
						}), jsx("div", {
							className: "text-sm text-muted-foreground",
							children: r.resp
						})] })]
					}), jsxs("div", {
						className: "grid sm:grid-cols-3 gap-4",
						children: [
							jsx(RoleBlock, {
								title: "Permissions",
								items: r.perms
							}),
							jsx(RoleBlock, {
								title: "Modules",
								items: r.modules
							}),
							jsx(RoleBlock, {
								title: "Quick actions",
								items: r.actions
							})
						]
					})]
				}, r.name)]
			})]
		})
	});
}
function RoleBlock({ title, items }) {
	return jsxs("div", {
		className: "glass rounded-2xl p-4",
		children: [jsx("div", {
			className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2",
			children: title
		}), jsx("ul", {
			className: "space-y-1.5",
			children: items.map((i) => jsxs("li", {
				className: "text-sm flex items-center gap-2",
				children: [jsx(CheckCircle2, { className: "h-3.5 w-3.5 text-primary shrink-0" }), i]
			}, i))
		})]
	});
}
var MODULES = [
	{
		t: "Identity & Access",
		icon: Lock,
		p: 92,
		badge: "Live"
	},
	{
		t: "Organisation",
		icon: Building2,
		p: 88,
		badge: "Live"
	},
	{
		t: "Courses & Content",
		icon: BookOpen,
		p: 95,
		badge: "Live"
	},
	{
		t: "Batches & Enrolments",
		icon: Users,
		p: 90,
		badge: "Live"
	},
	{
		t: "Assessments",
		icon: ClipboardCheck,
		p: 84,
		badge: "Live"
	},
	{
		t: "Video Learning",
		icon: Video,
		p: 78,
		badge: "Beta"
	},
	{
		t: "Engagement",
		icon: MessageSquare,
		p: 70,
		badge: "Live"
	},
	{
		t: "Notifications",
		icon: Bell,
		p: 96,
		badge: "Live"
	},
	{
		t: "Reporting",
		icon: BarChart3,
		p: 82,
		badge: "Live"
	},
	{
		t: "Administration",
		icon: Settings2,
		p: 89,
		badge: "Live"
	}
];
function Modules() {
	return jsxs("section", {
		id: "modules",
		className: "py-20 sm:py-28 relative",
		children: [jsx("div", { className: "absolute inset-0 bg-mesh opacity-60 -z-10" }), jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "LMS Modules",
				title: "Ten composable modules. One platform."
			}), jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-4",
				children: MODULES.map((m, i) => jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: {
						duration: .4,
						delay: i % 5 * .05
					},
					className: "glass rounded-2xl p-4 hover:-translate-y-1 transition",
					children: [
						jsxs("div", {
							className: "flex items-center justify-between mb-3",
							children: [jsx("div", {
								className: "h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center",
								children: jsx(m.icon, { className: "h-4 w-4 text-primary-foreground" })
							}), jsx("span", {
								className: `text-[10px] font-semibold px-2 py-0.5 rounded-full ${m.badge === "Beta" ? "bg-accent/20 text-accent-foreground" : "bg-primary/10 text-primary"}`,
								children: m.badge
							})]
						}),
						jsx("div", {
							className: "font-semibold text-sm",
							children: m.t
						}),
						jsx("div", {
							className: "mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden",
							children: jsx(motion.div, {
								initial: { width: 0 },
								whileInView: { width: `${m.p}%` },
								viewport: { once: true },
								transition: { duration: 1.1 },
								className: "h-full bg-gradient-to-r from-primary to-accent"
							})
						}),
						jsxs("div", {
							className: "mt-1 text-[10px] text-muted-foreground",
							children: [m.p, "% adoption"]
						})
					]
				}, m.t))
			})]
		})]
	});
}
var CONTENT = [
	{
		t: "Notes",
		icon: FileText
	},
	{
		t: "PDFs",
		icon: FileText
	},
	{
		t: "PPT",
		icon: FileText
	},
	{
		t: "Comparison Tables",
		icon: Layers
	},
	{
		t: "Videos",
		icon: Video
	},
	{
		t: "Assignments",
		icon: ClipboardCheck
	},
	{
		t: "Tests",
		icon: ClipboardCheck
	},
	{
		t: "Certificates",
		icon: Award
	}
];
function ContentShowcase() {
	return jsx("section", {
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Content support",
				title: "Every format your educators teach with"
			}), jsx("div", {
				className: "-mx-4 px-4 overflow-x-auto pb-4 scrollbar-hide",
				children: jsx("div", {
					className: "flex gap-4 min-w-max",
					children: CONTENT.map((c) => jsxs("div", {
						className: "glass rounded-2xl p-5 w-44 shrink-0 hover:-translate-y-1 transition",
						children: [
							jsx("div", {
								className: "h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center mb-3",
								children: jsx(c.icon, { className: "h-5 w-5 text-primary-foreground" })
							}),
							jsx("div", {
								className: "font-semibold",
								children: c.t
							}),
							jsx("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: "Native support"
							})
						]
					}, c.t))
				})
			})]
		})
	});
}
function Assessments() {
	const cards = [
		{
			t: "Theoretical",
			icon: BookOpen,
			m: "84%"
		},
		{
			t: "Practical",
			icon: Workflow,
			m: "78%"
		},
		{
			t: "Theory Based",
			icon: FileText,
			m: "91%"
		},
		{
			t: "Online Evaluation",
			icon: ClipboardCheck,
			m: "96%"
		},
		{
			t: "Marks & Results",
			icon: BarChart3,
			m: "Live"
		}
	];
	return jsx("section", {
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Assessment",
				title: "Evaluate with confidence"
			}), jsxs("div", {
				className: "grid lg:grid-cols-[1.2fr_1fr] gap-6",
				children: [jsx("div", {
					className: "grid sm:grid-cols-2 gap-4",
					children: cards.map((c) => jsxs("div", {
						className: "glass rounded-2xl p-5 flex items-center gap-4",
						children: [jsx(ProgressRing, { value: parseFloat(c.m) || 70 }), jsxs("div", { children: [jsx("div", {
							className: "text-sm text-muted-foreground",
							children: c.t
						}), jsx("div", {
							className: "font-display text-xl font-bold",
							children: c.m
						})] })]
					}, c.t))
				}), jsxs("div", {
					className: "glass-strong rounded-3xl p-6",
					children: [
						jsx("div", {
							className: "text-sm text-muted-foreground mb-1",
							children: "Cohort performance"
						}),
						jsx("div", {
							className: "font-display text-2xl font-bold mb-4",
							children: "Spring 2026 — CS401"
						}),
						jsx(BarsChart, {})
					]
				})]
			})]
		})
	});
}
function ProgressRing({ value }) {
	const r = 22, c = 2 * Math.PI * r;
	return jsxs("svg", {
		viewBox: "0 0 60 60",
		className: "h-14 w-14 -rotate-90",
		children: [
			jsx("circle", {
				cx: "30",
				cy: "30",
				r,
				stroke: "var(--color-border)",
				strokeWidth: "6",
				fill: "none"
			}),
			jsx(motion.circle, {
				cx: "30",
				cy: "30",
				r,
				stroke: "url(#pg)",
				strokeWidth: "6",
				fill: "none",
				strokeLinecap: "round",
				strokeDasharray: c,
				initial: { strokeDashoffset: c },
				whileInView: { strokeDashoffset: c - c * value / 100 },
				viewport: { once: true },
				transition: { duration: 1.2 }
			}),
			jsx("defs", { children: jsxs("linearGradient", {
				id: "pg",
				x1: "0",
				x2: "1",
				children: [jsx("stop", {
					offset: "0%",
					stopColor: "oklch(0.55 0.22 320)"
				}), jsx("stop", {
					offset: "100%",
					stopColor: "oklch(0.78 0.14 200)"
				})]
			}) })
		]
	});
}
function BarsChart() {
	const data = [
		62,
		78,
		54,
		88,
		73,
		92,
		67,
		81
	];
	const max = 100;
	return jsx("div", {
		className: "flex items-end gap-2 h-44",
		children: data.map((v, i) => jsx(motion.div, {
			initial: { height: 0 },
			whileInView: { height: `${v / max * 100}%` },
			viewport: { once: true },
			transition: {
				duration: .7,
				delay: i * .05
			},
			className: "flex-1 rounded-t-md bg-gradient-to-t from-primary to-accent"
		}, i))
	});
}
function VideoLearning() {
	return jsx("section", {
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Video learning",
				title: "Streaming built for serious learners",
				sub: "HLS adaptive quality, signed URLs and seamless continue-watching."
			}), jsx("div", {
				className: "-mx-4 px-4 overflow-x-auto pb-4 scrollbar-hide",
				children: jsx("div", {
					className: "flex gap-4 min-w-max",
					children: [
						"Calculus II",
						"Distributed Systems",
						"Product Strategy",
						"ML Foundations",
						"UX Research",
						"Cloud Native"
					].map((title, i) => jsxs("div", {
						className: "glass rounded-2xl overflow-hidden w-64 shrink-0 group hover:-translate-y-1 transition",
						children: [jsxs("div", {
							className: "relative h-36 bg-gradient-to-br from-primary via-primary-glow to-accent",
							children: [jsx("div", {
								className: "absolute inset-0 grid place-items-center",
								children: jsx("div", {
									className: "h-12 w-12 rounded-full glass grid place-items-center group-hover:scale-110 transition",
									children: jsx(Play, {
										className: "h-5 w-5 text-primary-foreground",
										fill: "currentColor"
									})
								})
							}), jsx("div", {
								className: "absolute bottom-2 left-2 right-2 h-1 rounded-full bg-white/30 overflow-hidden",
								children: jsx("div", {
									className: "h-full bg-white",
									style: { width: `${20 + i * 12}%` }
								})
							})]
						}), jsxs("div", {
							className: "p-4",
							children: [jsx("div", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Continue watching"
							}), jsx("div", {
								className: "font-semibold",
								children: title
							})]
						})]
					}, title))
				})
			})]
		})
	});
}
function Notifications() {
	const channels = [
		{
			icon: Mail,
			t: "Email",
			d: "Templated, branded"
		},
		{
			icon: MessageSquare,
			t: "WhatsApp",
			d: "Verified templates"
		},
		{
			icon: Smartphone,
			t: "SMS",
			d: "DLT compliant"
		},
		{
			icon: FileCheck,
			t: "Documents",
			d: "Signed delivery"
		}
	];
	return jsx("section", {
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Notifications",
				title: "Reach every learner on every channel"
			}), jsxs("div", {
				className: "grid lg:grid-cols-2 gap-6",
				children: [jsx("div", {
					className: "grid sm:grid-cols-2 gap-4",
					children: channels.map((c, i) => jsxs(motion.div, {
						initial: {
							opacity: 0,
							x: -20
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: { delay: i * .08 },
						className: "glass rounded-2xl p-5",
						children: [
							jsx("div", {
								className: "h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center mb-3",
								children: jsx(c.icon, { className: "h-4 w-4 text-primary-foreground" })
							}),
							jsx("div", {
								className: "font-semibold",
								children: c.t
							}),
							jsx("div", {
								className: "text-xs text-muted-foreground",
								children: c.d
							}),
							jsxs("div", {
								className: "mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400",
								children: [jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }), " Delivered"]
							})
						]
					}, c.t))
				}), jsxs("div", {
					className: "glass-strong rounded-3xl p-6",
					children: [jsx("div", {
						className: "font-display font-bold text-xl mb-4",
						children: "Delivery audit"
					}), jsx("ul", {
						className: "space-y-3",
						children: [
							{
								t: "Welcome email queued",
								s: "queued"
							},
							{
								t: "WhatsApp template approved",
								s: "ok"
							},
							{
								t: "SMS retry (1/3)",
								s: "warn"
							},
							{
								t: "Certificate signed",
								s: "ok"
							}
						].map((l) => jsxs("li", {
							className: "glass rounded-xl p-3 flex items-center justify-between",
							children: [jsx("span", {
								className: "text-sm",
								children: l.t
							}), jsx("span", {
								className: `text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${l.s === "ok" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : l.s === "warn" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : "bg-primary/15 text-primary"}`,
								children: l.s
							})]
						}, l.t))
					})]
				})]
			})]
		})
	});
}
var WF = [
	"Manager Request",
	"Pending Approval",
	"Admin Review",
	"Approve / Reject",
	"Audit Trail"
];
function Governance() {
	return jsx("section", {
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Governance",
				title: "Approval workflow with a paper trail"
			}), jsx("div", {
				className: "glass-strong rounded-3xl p-6 sm:p-10",
				children: jsx("ol", {
					className: "grid md:grid-cols-5 gap-4 relative",
					children: WF.map((step, i) => jsxs(motion.li, {
						initial: {
							opacity: 0,
							y: 16
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: i * .1 },
						className: "relative",
						children: [jsxs("div", {
							className: "glass rounded-2xl p-5 text-center",
							children: [jsx("div", {
								className: "mx-auto h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-bold text-sm mb-2 shadow-[var(--shadow-glow)]",
								children: i + 1
							}), jsx("div", {
								className: "font-semibold text-sm",
								children: step
							})]
						}), i < WF.length - 1 && jsx("div", { className: "hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-primary to-accent" })]
					}, step))
				})
			})]
		})
	});
}
var ARCH = [
	{
		t: "Next.js Frontend",
		icon: Globe2
	},
	{
		t: "Spring Cloud Gateway",
		icon: Network
	},
	{
		t: "Spring Boot Services",
		icon: Server
	},
	{
		t: "Apache Kafka",
		icon: Zap
	},
	{
		t: "IAM Service",
		icon: Lock
	},
	{
		t: "Course Service",
		icon: BookOpen
	},
	{
		t: "Assessment Service",
		icon: ClipboardCheck
	},
	{
		t: "Notification Service",
		icon: Bell
	},
	{
		t: "Media Service",
		icon: Video
	},
	{
		t: "Approval Service",
		icon: GitBranch
	},
	{
		t: "Reporting Service",
		icon: BarChart3
	},
	{
		t: "Data & Storage",
		icon: Database
	}
];
function Architecture() {
	return jsx("section", {
		id: "architecture",
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Architecture",
				title: "Event-driven microservices on a modern stack"
			}), jsx("div", {
				className: "glass-strong rounded-3xl p-6 sm:p-10",
				children: jsx("div", {
					className: "grid sm:grid-cols-3 lg:grid-cols-4 gap-3",
					children: ARCH.map((a, i) => jsxs(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						whileInView: {
							opacity: 1,
							scale: 1
						},
						viewport: { once: true },
						transition: { delay: i * .04 },
						className: "glass rounded-xl p-4 flex items-center gap-3 hover:-translate-y-0.5 transition",
						children: [jsx("div", {
							className: "h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shrink-0",
							children: jsx(a.icon, { className: "h-4 w-4 text-primary-foreground" })
						}), jsx("span", {
							className: "text-sm font-semibold truncate",
							children: a.t
						})]
					}, a.t))
				})
			})]
		})
	});
}
var WHY = [
	{
		t: "Secure",
		icon: Lock
	},
	{
		t: "Scalable",
		icon: Zap
	},
	{
		t: "Configurable",
		icon: Settings2
	},
	{
		t: "Multi-Tenant",
		icon: Layers
	},
	{
		t: "Responsive",
		icon: Smartphone
	},
	{
		t: "Extensible",
		icon: GitBranch
	},
	{
		t: "Event Driven",
		icon: Network
	},
	{
		t: "Enterprise Ready",
		icon: Shield
	}
];
function WhyChoose() {
	return jsx("section", {
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Why our LMS",
				title: "Built for the enterprise. Loved by learners."
			}), jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: WHY.map((w) => jsxs("div", {
					className: "glass rounded-2xl p-6 text-center hover:-translate-y-1 transition",
					children: [jsx("div", {
						className: "mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center mb-3",
						children: jsx(w.icon, { className: "h-5 w-5 text-primary-foreground" })
					}), jsx("div", {
						className: "font-semibold",
						children: w.t
					})]
				}, w.t))
			})]
		})
	});
}
var TESTIMONIALS = [
	{
		name: "Dr. Priya Menon",
		role: "Dean, Indus University",
		q: "Xebia LMS helped us onboard 30,000 students across 12 departments in a single semester. The multi-tenant architecture is exceptional."
	},
	{
		name: "Rahul Verma",
		role: "L&D Director, FinCorp",
		q: "We replaced three tools with one. Governance approvals are now traceable end-to-end, and our compliance team finally sleeps at night."
	},
	{
		name: "Anika Shah",
		role: "Senior Trainer",
		q: "Authoring once and delivering everywhere — including signed PDFs and WhatsApp — has been a game changer for our training programs."
	},
	{
		name: "Daniel Okafor",
		role: "Computer Science Student",
		q: "Continue-watching, mobile video, instant marks. Studying actually feels modern for the first time."
	}
];
function Testimonials() {
	const [i, setI] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 5e3);
		return () => clearInterval(id);
	}, []);
	return jsx("section", {
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-4xl px-4",
			children: [
				jsx(Heading, {
					eyebrow: "Testimonials",
					title: "Trusted across universities and enterprises"
				}),
				jsx("div", {
					className: "relative h-64 sm:h-56",
					children: TESTIMONIALS.map((t, idx) => jsxs(motion.div, {
						animate: {
							opacity: idx === i ? 1 : 0,
							y: idx === i ? 0 : 10
						},
						transition: { duration: .5 },
						className: `absolute inset-0 glass-strong rounded-3xl p-8 ${idx === i ? "pointer-events-auto" : "pointer-events-none"}`,
						children: [
							jsx(Quote, { className: "h-8 w-8 text-primary/40 mb-3" }),
							jsx("p", {
								className: "text-lg sm:text-xl font-medium leading-relaxed",
								children: t.q
							}),
							jsxs("div", {
								className: "mt-6 flex items-center gap-3",
								children: [
									jsx("div", {
										className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-bold",
										children: t.name[0]
									}),
									jsxs("div", { children: [jsx("div", {
										className: "font-semibold text-sm",
										children: t.name
									}), jsx("div", {
										className: "text-xs text-muted-foreground",
										children: t.role
									})] }),
									jsx("div", {
										className: "ml-auto flex",
										children: [...Array(5)].map((_, s) => jsx(Star, { className: "h-4 w-4 fill-primary text-primary" }, s))
									})
								]
							})
						]
					}, t.name))
				}),
				jsx("div", {
					className: "flex justify-center gap-2 mt-4",
					children: TESTIMONIALS.map((_, idx) => jsx("button", {
						onClick: () => setI(idx),
						"aria-label": `Show testimonial ${idx + 1}`,
						className: `h-2 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-2 bg-border"}`
					}, idx))
				})
			]
		})
	});
}
var PLANS = [
	{
		name: "Starter",
		price: "$0",
		desc: "For pilots & evaluation",
		features: [
			"Up to 100 learners",
			"Core LMS modules",
			"Email support"
		],
		cta: "Start free"
	},
	{
		name: "Professional",
		price: "$499",
		desc: "For growing institutions",
		features: [
			"Up to 10K learners",
			"All modules",
			"SSO + RBAC",
			"Priority support"
		],
		cta: "Start trial",
		featured: true
	},
	{
		name: "Enterprise",
		price: "Custom",
		desc: "For universities & enterprises",
		features: [
			"Unlimited learners",
			"Dedicated tenancy",
			"SLA 99.9%",
			"24/7 white-glove"
		],
		cta: "Contact sales"
	}
];
function Pricing() {
	return jsx("section", {
		id: "pricing",
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-7xl px-4",
			children: [jsx(Heading, {
				eyebrow: "Pricing",
				title: "Plans that scale with your programs"
			}), jsx("div", {
				className: "grid md:grid-cols-3 gap-5",
				children: PLANS.map((p) => jsxs("div", {
					className: `relative rounded-3xl p-8 ${p.featured ? "glass-strong ring-2 ring-primary shadow-[var(--shadow-glow)]" : "glass"}`,
					children: [
						p.featured && jsx("div", {
							className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] font-bold uppercase tracking-wider",
							children: "Most popular"
						}),
						jsx("div", {
							className: "font-display font-bold text-xl",
							children: p.name
						}),
						jsx("div", {
							className: "mt-2 text-sm text-muted-foreground",
							children: p.desc
						}),
						jsxs("div", {
							className: "mt-6 flex items-baseline gap-1",
							children: [jsx("span", {
								className: "font-display font-bold text-4xl",
								children: p.price
							}), p.price !== "Custom" && jsx("span", {
								className: "text-sm text-muted-foreground",
								children: "/mo"
							})]
						}),
						jsx("ul", {
							className: "mt-6 space-y-2",
							children: p.features.map((f) => jsxs("li", {
								className: "text-sm flex items-center gap-2",
								children: [jsx(CheckCircle2, { className: "h-4 w-4 text-primary" }), f]
							}, f))
						}),
						jsx("a", {
							href: "#cta",
							className: `mt-8 inline-flex w-full h-11 items-center justify-center rounded-full font-semibold ring-focus ${p.featured ? "btn-hero" : "border hover:bg-secondary"}`,
							children: p.cta
						})
					]
				}, p.name))
			})]
		})
	});
}
var FAQS = [
	{
		q: "How dynamic are roles and permissions?",
		a: "Roles are fully configurable per tenant. Admins can define permissions across every module, with inheritance and overrides."
	},
	{
		q: "What assessment formats are supported?",
		a: "Theoretical, practical, and theory-based assessments with online evaluation, automated grading and manual review."
	},
	{
		q: "How does video streaming work?",
		a: "Adaptive HLS with signed URLs, encrypted segments, progress tracking and continue-watching across devices."
	},
	{
		q: "Which notification channels are supported?",
		a: "Email, SMS, WhatsApp and official document delivery with retries, audit logs and delivery analytics."
	},
	{
		q: "What reports are available?",
		a: "Cohort, course, learner and tenant-level dashboards with export to CSV, PDF and BI tools."
	},
	{
		q: "How do integrations work?",
		a: "REST APIs, webhooks, SCIM provisioning, SSO via OIDC/SAML, and Kafka event streaming."
	},
	{
		q: "Is the platform secure?",
		a: "Encrypted at rest and in transit, role-based access control, audit logs, and SOC2-ready posture."
	},
	{
		q: "How does multi-tenancy work?",
		a: "Logical isolation per tenant with separate configurations, branding, RBAC and reporting."
	}
];
function FAQ() {
	const [open, setOpen] = useState(0);
	return jsx("section", {
		id: "resources",
		className: "py-20 sm:py-28",
		children: jsxs("div", {
			className: "mx-auto max-w-3xl px-4",
			children: [jsx(Heading, {
				eyebrow: "FAQ",
				title: "Answers to common questions"
			}), jsx("div", {
				className: "space-y-3",
				children: FAQS.map((f, i) => jsxs("div", {
					className: "glass rounded-2xl overflow-hidden",
					children: [jsxs("button", {
						onClick: () => setOpen(open === i ? null : i),
						"aria-expanded": open === i,
						className: "ring-focus w-full flex items-center justify-between gap-4 p-5 text-left",
						children: [jsx("span", {
							className: "font-semibold",
							children: f.q
						}), jsx(ChevronDown, { className: `h-4 w-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}` })]
					}), jsx(motion.div, {
						initial: false,
						animate: {
							height: open === i ? "auto" : 0,
							opacity: open === i ? 1 : 0
						},
						className: "overflow-hidden",
						children: jsx("div", {
							className: "px-5 pb-5 text-sm text-muted-foreground",
							children: f.a
						})
					})]
				}, f.q))
			})]
		})
	});
}
function CTA() {
	return jsx("section", {
		id: "cta",
		className: "py-20 sm:py-28",
		children: jsx("div", {
			className: "mx-auto max-w-6xl px-4",
			children: jsxs("div", {
				className: "relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center glass-strong",
				children: [
					jsx("div", { className: "absolute -z-10 inset-0 bg-mesh opacity-90" }),
					jsx("div", { className: "absolute -z-10 -top-20 left-1/2 -translate-x-1/2 h-80 w-[640px] bg-gradient-to-r from-primary via-primary-glow to-accent opacity-30 blur-3xl rounded-full" }),
					jsxs("h2", {
						className: "font-display text-3xl sm:text-5xl font-bold tracking-tight",
						children: [
							"Ready to ",
							jsx("span", {
								className: "text-gradient",
								children: "transform"
							}),
							" learning management?"
						]
					}),
					jsx("p", {
						className: "mt-4 text-muted-foreground max-w-xl mx-auto",
						children: "Bring identity, content, video, assessments and reporting together on one trusted platform."
					}),
					jsxs("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [
							jsxs("a", {
								href: "#",
								className: "ring-focus btn-hero inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold",
								children: ["Book Demo ", jsx(ArrowRight, { className: "h-4 w-4" })]
							}),
							jsx("a", {
								href: "#",
								className: "ring-focus inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold glass",
								children: "Start Free Trial"
							}),
							jsx("a", {
								href: "#",
								className: "ring-focus inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold border hover:bg-secondary transition",
								children: "Contact Sales"
							})
						]
					})
				]
			})
		})
	});
}
var FOOTER = {
	Company: [
		"About",
		"Customers",
		"Careers",
		"Press"
	],
	Features: [
		"RBAC",
		"Courses",
		"Video",
		"Notifications"
	],
	Solutions: [
		"Universities",
		"Enterprises",
		"Trainers"
	],
	Resources: [
		"Docs",
		"Blog",
		"Guides",
		"Webinars"
	],
	Developers: [
		"API",
		"SDK",
		"Webhooks",
		"Status"
	],
	Legal: [
		"Privacy",
		"Terms",
		"Security",
		"DPA"
	]
};
function Footer() {
	return jsx("footer", {
		id: "contact",
		className: "pt-20 pb-10",
		children: jsx("div", {
			className: "mx-auto max-w-7xl px-4",
			children: jsxs("div", {
				className: "glass-strong rounded-3xl p-8 sm:p-12",
				children: [jsxs("div", {
					className: "grid lg:grid-cols-[1.5fr_3fr] gap-10",
					children: [jsxs("div", { children: [
						jsxs("div", {
							className: "flex items-center gap-3 mb-4",
							children: [jsx("div", {
								className: "h-10 w-10 rounded-full bg-primary grid place-items-center text-primary-foreground font-display font-bold",
								children: "X"
							}), jsxs("div", { children: [jsx("div", {
								className: "font-display font-bold",
								children: "Xebia"
							}), jsx("div", {
								className: "text-xs text-muted-foreground",
								children: "Enterprise LMS"
							})] })]
						}),
						jsx("p", {
							className: "text-sm text-muted-foreground max-w-sm",
							children: "One multi-tenant platform for learning identity, content, video, assessments and analytics."
						}),
						jsxs("form", {
							className: "mt-5 flex gap-2 max-w-sm",
							onSubmit: (e) => e.preventDefault(),
							children: [jsx("input", {
								type: "email",
								required: true,
								"aria-label": "Email address",
								placeholder: "you@company.com",
								className: "ring-focus flex-1 h-11 rounded-full px-4 bg-background border text-sm"
							}), jsx("button", {
								className: "ring-focus btn-hero h-11 px-5 rounded-full font-semibold text-sm",
								type: "submit",
								children: "Subscribe"
							})]
						}),
						jsx("div", {
							className: "mt-5 flex gap-2",
							children: [
								Globe,
								Code,
								Hash,
								Play
							].map((I, i) => jsx("a", {
								href: "#",
								"aria-label": "social",
								className: "ring-focus h-10 w-10 grid place-items-center rounded-full glass hover:scale-110 transition",
								children: jsx(I, { className: "h-4 w-4" })
							}, i))
						})
					] }), jsx("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6",
						children: Object.entries(FOOTER).map(([k, v]) => jsxs("div", { children: [jsx("div", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3",
							children: k
						}), jsx("ul", {
							className: "space-y-2",
							children: v.map((l) => jsx("li", { children: jsx("a", {
								href: "#",
								className: "text-sm hover:text-primary",
								children: l
							}) }, l))
						})] }, k))
					})]
				}), jsxs("div", {
					className: "mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground",
					children: [jsxs("div", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Xebia. All rights reserved."
					] }), jsxs("div", {
						className: "flex items-center gap-4",
						children: [
							jsxs("span", {
								className: "inline-flex items-center gap-1",
								children: [jsx(Cloud, { className: "h-3.5 w-3.5" }), " Status: Operational"]
							}),
							jsx("a", {
								href: "#",
								className: "hover:text-primary",
								children: "Cookies"
							}),
							jsxs("a", {
								href: "#",
								className: "hover:text-primary",
								children: [jsx(Download, { className: "inline h-3.5 w-3.5 mr-1" }), "Brochure"]
							})
						]
					})]
				})]
			})
		})
	});
}
//#endregion
//#region src/routes/index.js?tsr-split=component
function Index() {
	return jsxs("div", {
		className: "min-h-dvh",
		children: [
			jsx(Navbar, {}),
			jsxs("main", { children: [
				jsx(Hero, {}),
				jsx(Stats, {}),
				jsx(Features, {}),
				jsx(Roles, {}),
				jsx(Modules, {}),
				jsx(ContentShowcase, {}),
				jsx(Assessments, {}),
				jsx(VideoLearning, {}),
				jsx(Notifications, {}),
				jsx(Governance, {}),
				jsx(Architecture, {}),
				jsx(WhyChoose, {}),
				jsx(Testimonials, {}),
				jsx(Pricing, {}),
				jsx(FAQ, {}),
				jsx(CTA, {})
			] }),
			jsx(Footer, {}),
			jsx(BackToTop, {})
		]
	});
}
function BackToTop() {
	const [show, setShow] = useState(false);
	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > 600);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	if (!show) return null;
	return jsx("button", {
		onClick: () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}),
		"aria-label": "Back to top",
		className: "ring-focus fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full btn-hero grid place-items-center",
		children: jsx(ArrowUp, { className: "h-5 w-5" })
	});
}
//#endregion
export { Index as component };
