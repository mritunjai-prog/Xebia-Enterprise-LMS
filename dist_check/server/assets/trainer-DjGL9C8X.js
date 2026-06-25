import { a as SidebarGroupContent, c as SidebarInset, d as SidebarMenuItem, f as SidebarProvider, i as SidebarGroup, l as SidebarMenu, n as SidebarContent, o as SidebarGroupLabel, p as SidebarTrigger, t as Sidebar, u as SidebarMenuButton } from "./sidebar-CraPKcTm.js";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { BarChart2, Bell, BookOpen, Calendar, ClipboardList, LayoutDashboard, MessageSquare, Search, Users } from "lucide-react";
import { jsxDEV } from "react/jsx-dev-runtime";
//#region src/components/trainer-sidebar.js
var navItems = [
	{
		name: "Dashboard",
		href: "/trainer",
		icon: LayoutDashboard
	},
	{
		name: "Courses",
		href: "/trainer/courses",
		icon: BookOpen
	},
	{
		name: "Batches",
		href: "/trainer/batches",
		icon: Calendar
	},
	{
		name: "Students",
		href: "/trainer/students",
		icon: Users
	},
	{
		name: "Assessments",
		href: "/trainer/assessments",
		icon: ClipboardList
	},
	{
		name: "Discussions",
		href: "/trainer/discussions",
		icon: MessageSquare
	},
	{
		name: "Notifications",
		href: "/trainer/notifications",
		icon: Bell
	},
	{
		name: "Reports",
		href: "/trainer/reports",
		icon: BarChart2
	}
];
function TrainerSidebar() {
	const currentPath = useLocation().pathname;
	return /*#__PURE__*/ jsxDEV(Sidebar, {
		variant: "inset",
		children: /*#__PURE__*/ jsxDEV(SidebarContent, { children: /*#__PURE__*/ jsxDEV(SidebarGroup, { children: [/*#__PURE__*/ jsxDEV(SidebarGroupLabel, { children: "Trainer Portal" }, void 0, false), /*#__PURE__*/ jsxDEV(SidebarGroupContent, { children: /*#__PURE__*/ jsxDEV(SidebarMenu, { children: navItems.map((item) => {
			return /*#__PURE__*/ jsxDEV(SidebarMenuItem, { children: /*#__PURE__*/ jsxDEV(SidebarMenuButton, {
				asChild: true,
				isActive: currentPath === item.href || item.href !== "/trainer" && currentPath.startsWith(item.href),
				tooltip: item.name,
				children: /*#__PURE__*/ jsxDEV(Link, {
					to: item.href,
					children: [/*#__PURE__*/ jsxDEV(item.icon, {}, void 0, false), /*#__PURE__*/ jsxDEV("span", { children: item.name }, void 0, false)]
				}, void 0, true)
			}, void 0, false) }, item.name, false);
		}) }, void 0, false) }, void 0, false)] }, void 0, true) }, void 0, false)
	}, void 0, false);
}
//#endregion
//#region src/routes/trainer.js?tsr-split=component
function TrainerLayout() {
	return jsx(SidebarProvider, { children: [jsx(TrainerSidebar, {}), jsxs(SidebarInset, { children: [jsxs("header", {
		className: "flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background",
		children: [jsx(SidebarTrigger, { className: "-ml-1" }), jsxs("div", {
			className: "w-full flex justify-between items-center ml-2",
			children: [jsxs("div", {
				className: "flex items-center gap-2 font-bold text-xl text-primary",
				children: [jsx("span", { children: "Xebia" }), jsx("span", {
					className: "text-sm font-medium text-muted-foreground mt-1 hidden sm:block",
					children: "Enterprise LMS"
				})]
			}), jsxs("div", {
				className: "flex items-center gap-2 sm:gap-4",
				children: [
					jsxs("div", {
						className: "hidden md:flex items-center gap-2 text-sm border rounded-full px-3 py-1.5 bg-secondary/50",
						children: [jsx("span", {
							className: "text-muted-foreground",
							children: "Scope:"
						}), jsxs("select", {
							className: "bg-transparent border-none outline-none font-medium text-foreground cursor-pointer",
							children: [jsx("option", { children: "University of Technology" }), jsx("option", { children: "Corporate Training Corp" })]
						})]
					}),
					jsx("button", {
						className: "h-9 w-9 rounded-full hover:bg-secondary grid place-items-center",
						children: jsx(Search, { className: "h-4 w-4 text-muted-foreground" })
					}),
					jsxs("button", {
						className: "h-9 w-9 rounded-full hover:bg-secondary grid place-items-center relative",
						children: [jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }), jsx("span", { className: "absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" })]
					}),
					jsx("div", {
						className: "h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary",
						children: "TR"
					})
				]
			})]
		})]
	}), jsx("main", {
		className: "flex-1 overflow-auto bg-background p-4 sm:p-6",
		children: jsx(Outlet, {})
	})] })] });
}
//#endregion
export { TrainerLayout as component };
