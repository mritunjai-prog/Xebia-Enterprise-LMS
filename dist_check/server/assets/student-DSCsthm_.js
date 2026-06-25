import { t as ThemeToggle } from "./theme-toggle-BYe0BfPx.js";
import { t as cn } from "./utils-_lkLOWLq.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { t as Input } from "./input-C2txYJdq.js";
import { o as notifications, s as studentProfile } from "./dummy-data-CD87CTHp.js";
import { t as useDarkMode } from "./use-dark-mode-CINeHm2i.js";
import * as React from "react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Award, Bell, BookOpen, CalendarDays, Check, ChevronRight, Circle, ClipboardCheck, LayoutDashboard, LogOut, Menu, MessageSquare, Search, User } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
//#region src/components/layout/student-sidebar.jsx
var navItems = [
	{
		name: "Dashboard",
		href: "/student",
		icon: LayoutDashboard
	},
	{
		name: "My Courses",
		href: "/student/courses",
		icon: BookOpen
	},
	{
		name: "My Batches",
		href: "/student/batches",
		icon: CalendarDays
	},
	{
		name: "Assessments",
		href: "/student/assessments",
		icon: ClipboardCheck
	},
	{
		name: "Results",
		href: "/student/results",
		icon: Award
	},
	{
		name: "Notifications",
		href: "/student/notifications",
		icon: Bell
	},
	{
		name: "Feedback",
		href: "/student/feedback",
		icon: MessageSquare
	}
];
function StudentSidebar({ isCollapsed, isMobileOpen, setIsMobileOpen }) {
	const currentPath = useLocation().pathname;
	const isDark = useDarkMode();
	const initials = studentProfile.name.split(" ").map((n) => n[0]).join("").toUpperCase();
	return /* @__PURE__ */ jsxs("aside", {
		className: `fixed left-0 top-0 z-40 flex h-screen flex-col bg-card border-r border-border shadow-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`,
		children: [
			/* @__PURE__ */ jsx("div", {
				className: `flex items-center py-5 ${isCollapsed ? "justify-center px-2" : "px-5"}`,
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/student",
					className: "flex items-center gap-3 group",
					style: { textDecoration: "none" },
					children: [/* @__PURE__ */ jsx("img", {
						src: isDark ? "/logo-white.png" : "/logo-purple.png",
						alt: "Xebia Logo",
						className: `${isCollapsed ? "h-6 max-w-[40px]" : "h-8 max-w-[120px]"} w-auto object-contain transition-all duration-300`
					}), !isCollapsed && /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col leading-tight transition-all duration-300",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-base font-bold tracking-wide text-foreground",
							children: "Xebia LMS"
						}), /* @__PURE__ */ jsx("span", {
							className: "text-[10px] font-semibold uppercase tracking-widest mt-0.5 text-muted-foreground",
							children: "Student Portal"
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", { className: "mx-4 mb-5 h-px bg-border/50" }),
			/* @__PURE__ */ jsx("nav", {
				className: "flex-1 overflow-y-auto px-3 space-y-1.5",
				children: navItems.map((item) => {
					const isActive = currentPath === item.href || item.href !== "/student" && currentPath.startsWith(item.href);
					return /* @__PURE__ */ jsxs(Link, {
						to: item.href,
						title: isCollapsed ? item.name : void 0,
						onClick: () => setIsMobileOpen(false),
						className: `flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-200 group ${isCollapsed ? "justify-center px-0" : "px-3"} ${isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1"}`,
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${isActive ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30" : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/10 group-hover:text-foreground"}`,
								children: /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" })
							}),
							!isCollapsed && /* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: item.name
							}),
							!isCollapsed && isActive && /* @__PURE__ */ jsx("div", { className: "ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary shadow-sm shadow-primary/50" })
						]
					}, item.name);
				})
			}),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("div", { className: "mx-4 my-3 h-px bg-border/50" }),
				/* @__PURE__ */ jsxs(Link, {
					to: "/student/profile",
					title: isCollapsed ? `${studentProfile.name} - View Profile` : void 0,
					onClick: () => setIsMobileOpen(false),
					className: `mx-3 mb-1 flex items-center rounded-xl py-2.5 transition-all duration-200 group ${isCollapsed ? "justify-center px-0" : "gap-3 px-3"} text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1`,
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-sm shadow-primary/30 group-hover:shadow-md",
						children: initials || /* @__PURE__ */ jsx(User, { className: "h-4 w-4" })
					}), !isCollapsed && /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col min-w-0",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors",
							children: studentProfile.name
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs truncate text-muted-foreground",
							children: "View Profile"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					title: isCollapsed ? "Logout" : void 0,
					className: `mx-3 mb-4 flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 group ${isCollapsed ? "justify-center px-0" : "gap-3 px-3"} text-destructive hover:bg-destructive/10 hover:translate-x-1`,
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-destructive/10 group-hover:bg-destructive/20 text-destructive transition-colors",
						children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" })
					}), !isCollapsed && /* @__PURE__ */ jsx("span", { children: "Logout" })]
				})
			] })
		]
	});
}
//#endregion
//#region src/components/ui/dropdown-menu.js
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, jsx(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => jsx(DropdownMenuPrimitive.Portal, { children: jsx(DropdownMenuPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: jsx(DropdownMenuPrimitive.ItemIndicator, { children: jsx(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: jsx(DropdownMenuPrimitive.ItemIndicator, { children: jsx(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return jsx("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region src/components/layout/student-navbar.jsx
function StudentNavbar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
	const unreadCount = notifications.filter((n) => !n.read).length;
	const isDark = useDarkMode();
	const initials = studentProfile.name.split(" ").map((n) => n[0]).join("").toUpperCase();
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md transition-all sm:px-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 mr-4",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => {
						if (window.innerWidth < 768) setIsMobileOpen(!isMobileOpen);
						else setIsCollapsed(!isCollapsed);
					},
					className: "flex h-10 w-10 items-center justify-center rounded-full glass hover:scale-105 transition-transform focus:outline-none",
					"aria-label": "Toggle Sidebar",
					children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
				}), /* @__PURE__ */ jsx("div", {
					className: "flex md:hidden items-center gap-2",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/student",
						className: "flex items-center gap-2",
						style: { textDecoration: "none" },
						children: [/* @__PURE__ */ jsx("img", {
							src: isDark ? "/logo-white.png" : "/logo-purple.png",
							alt: "Xebia Logo",
							className: "h-8 w-auto object-contain"
						}), /* @__PURE__ */ jsx("span", {
							className: "font-bold tracking-wide text-sm text-foreground",
							children: "Xebia LMS"
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-1 items-center justify-start max-w-md hidden md:flex",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative w-full",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
						type: "search",
						placeholder: "Search courses, modules...",
						className: "w-full rounded-full bg-muted/50 pl-8 focus-visible:ring-primary/50"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "ml-auto flex items-center gap-3 sm:gap-4",
				children: [
					/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsxs("button", {
							className: "relative flex h-10 w-10 items-center justify-center rounded-full glass hover:scale-105 transition-transform ring-focus",
							"aria-label": "Notifications",
							children: [/* @__PURE__ */ jsx(Bell, { className: "h-5 w-5" }), unreadCount > 0 && /* @__PURE__ */ jsx(Badge, {
								className: "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0 text-[10px]",
								children: unreadCount
							})]
						})
					}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
						align: "end",
						className: "w-80",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "px-3 py-2 font-semibold text-sm",
								children: "Notifications"
							}),
							/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
							notifications.slice(0, 3).map((notification) => /* @__PURE__ */ jsxs(DropdownMenuItem, {
								className: "flex flex-col items-start gap-1 p-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex w-full items-center justify-between gap-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-sm",
										children: notification.title
									}), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground",
										children: notification.timestamp
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground line-clamp-2",
									children: notification.message
								})]
							}, notification.id)),
							/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
							/* @__PURE__ */ jsx(DropdownMenuItem, {
								asChild: true,
								className: "cursor-pointer justify-center",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/student/notifications",
									className: "w-full text-center text-sm font-medium text-primary",
									children: "View all notifications"
								})
							})
						]
					})] }),
					/* @__PURE__ */ jsx(ThemeToggle, {}),
					/* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsxs("button", {
							className: "flex items-center gap-2 rounded-full outline-none ring-focus p-1 hover:bg-muted/50 transition-all hover:shadow-sm",
							"aria-label": "User menu",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-9 w-9 flex items-center justify-center rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-sm shadow-primary/30",
								children: initials || /* @__PURE__ */ jsx(User, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "hidden flex-col items-start text-sm sm:flex mr-2 text-left",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-semibold leading-none text-foreground",
									children: studentProfile.name
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground mt-1 leading-none",
									children: studentProfile.role
								})]
							})]
						})
					}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
						align: "end",
						className: "w-48",
						children: [
							/* @__PURE__ */ jsx(DropdownMenuItem, {
								asChild: true,
								className: "cursor-pointer",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/student/profile",
									className: "w-full",
									children: "My Profile"
								})
							}),
							/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
							/* @__PURE__ */ jsx(DropdownMenuItem, {
								asChild: true,
								className: "text-destructive focus:bg-destructive/10 cursor-pointer",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									className: "w-full",
									children: "Log out"
								})
							})
						]
					})] })
				]
			})
		]
	});
}
//#endregion
//#region src/routes/student.jsx?tsr-split=component
function StudentLayout() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex h-screen bg-background overflow-hidden",
		children: [
			isMobileOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300",
				onClick: () => setIsMobileOpen(false)
			}),
			/* @__PURE__ */ jsx(StudentSidebar, {
				isCollapsed,
				setIsCollapsed,
				isMobileOpen,
				setIsMobileOpen
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `flex flex-1 flex-col overflow-hidden transition-all duration-300 ml-0 ${isCollapsed ? "md:ml-20" : "md:ml-64"}`,
				children: [/* @__PURE__ */ jsx(StudentNavbar, {
					isCollapsed,
					setIsCollapsed,
					isMobileOpen,
					setIsMobileOpen
				}), /* @__PURE__ */ jsx("main", {
					className: "flex-1 overflow-auto p-4 sm:p-6 lg:p-8",
					children: /* @__PURE__ */ jsx(Outlet, {})
				})]
			})
		]
	});
}
//#endregion
export { StudentLayout as component };
