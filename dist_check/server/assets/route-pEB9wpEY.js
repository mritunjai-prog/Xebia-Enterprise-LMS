import { n as AvatarFallback, t as Avatar } from "./avatar-DYANspD-.js";
import { a as SidebarGroupContent, c as SidebarInset, d as SidebarMenuItem, f as SidebarProvider, i as SidebarGroup, l as SidebarMenu, m as useSidebar, n as SidebarContent, o as SidebarGroupLabel, p as SidebarTrigger, r as SidebarFooter, s as SidebarHeader, t as Sidebar, u as SidebarMenuButton } from "./sidebar-CraPKcTm.js";
import { t as Toaster } from "./sonner-Bf0BYLzR.js";
import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { BarChart3, LayoutDashboard, LogOut, MessageSquareText, PanelLeftClose, ShieldCheck, Users } from "lucide-react";
//#region src/components/manager/sidebar/manager-sidebar.js
var navItems = [
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		href: "/manager"
	},
	{
		title: "Users",
		icon: Users,
		href: "/manager/users"
	},
	{
		title: "Approvals",
		icon: ShieldCheck,
		href: "/manager/approvals"
	},
	{
		title: "Feedback",
		icon: MessageSquareText,
		href: "/manager/feedback"
	},
	{
		title: "Analytics",
		icon: BarChart3,
		href: "/manager/analytics"
	}
];
function ManagerSidebar() {
	const matchRoute = useMatchRoute();
	const { toggleSidebar } = useSidebar();
	return jsxs(Sidebar, {
		collapsible: "offcanvas",
		className: "border-r border-[#6C1D5F]/10 shadow-lg [&_[data-sidebar=sidebar]]:bg-gradient-to-b [&_[data-sidebar=sidebar]]:from-[#5B1850] [&_[data-sidebar=sidebar]]:to-[#6C1D5F]",
		children: [
			jsx(SidebarHeader, {
				className: "px-6 pb-4 pt-6 border-b border-white/10",
				children: jsxs("div", {
					className: "flex items-center justify-between",
					children: [jsx(Link, {
						to: "/manager",
						className: "flex items-center gap-3 transition-opacity hover:opacity-80",
						children: jsxs("div", {
							className: "flex items-center gap-3",
							children: [jsx("img", {
								src: "/logo-white.png",
								alt: "Xebia LMS",
								className: "h-8 w-8 shrink-0 object-contain drop-shadow-md"
							}), jsxs("div", {
								className: "flex flex-col",
								children: [jsx("span", {
									className: "text-sm font-bold tracking-wide text-white drop-shadow-sm",
									children: "Xebia LMS"
								}), jsx("span", {
									className: "text-[10px] font-medium uppercase tracking-widest text-white/50",
									children: "Manager Portal"
								})]
							})]
						})
					}), jsx("button", {
						onClick: toggleSidebar,
						className: "hidden rounded-md p-1.5 text-white/40 transition-colors hover:!bg-white/10 hover:!text-white md:block",
						"aria-label": "Toggle sidebar",
						children: jsx(PanelLeftClose, { className: "h-4 w-4" })
					})]
				})
			}),
			jsx(SidebarContent, {
				className: "px-4 pt-4",
				children: jsxs(SidebarGroup, { children: [jsx(SidebarGroupLabel, {
					className: "mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40",
					children: "Navigation"
				}), jsx(SidebarGroupContent, { children: jsx(SidebarMenu, {
					className: "space-y-1.5",
					children: navItems.map((item) => {
						const isActive = item.href === "/manager" ? matchRoute({
							to: "/manager",
							fuzzy: false
						}) : matchRoute({
							to: item.href,
							fuzzy: true
						});
						return jsx(SidebarMenuItem, { children: jsx(SidebarMenuButton, {
							asChild: true,
							isActive: !!isActive,
							tooltip: item.title,
							size: "lg",
							className: `
                          relative rounded-xl font-medium transition-all duration-300
                          !text-white/70 hover:!bg-white/10 hover:!text-white
                          data-[active=true]:!bg-white/10 data-[active=true]:!text-white
                          data-[active=true]:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.1)]
                          data-[active=true]:ring-1 data-[active=true]:ring-white/10
                        `,
							children: jsxs(Link, {
								to: item.href,
								className: "flex items-center gap-3.5 px-1 py-0.5",
								children: [jsx(item.icon, { className: `h-[18px] w-[18px] shrink-0 transition-colors duration-300 ${isActive ? "!text-[#00A99D] drop-shadow-[0_0_8px_rgba(0,169,157,0.5)]" : ""}` }), jsx("span", {
									className: `text-[14px] ${isActive ? "font-semibold" : ""}`,
									children: item.title
								})]
							})
						}) }, item.href);
					})
				}) })] })
			}),
			jsx(SidebarFooter, {
				className: "px-4 pb-6 pt-4 border-t border-white/10",
				children: jsxs("div", {
					className: "flex items-center gap-3 rounded-xl bg-black/10 p-3 ring-1 ring-white/5 transition-colors hover:bg-black/20",
					children: [
						jsx(Avatar, {
							className: "h-9 w-9 shrink-0 ring-2 ring-white/10",
							children: jsx(AvatarFallback, {
								className: "bg-gradient-to-br from-[#8A177D] to-[#4A1E47] text-xs font-semibold text-white",
								children: "RM"
							})
						}),
						jsxs("div", {
							className: "flex flex-1 flex-col overflow-hidden",
							children: [jsx("span", {
								className: "truncate text-sm font-semibold text-white/90",
								children: "Rajesh Manager"
							}), jsx("span", {
								className: "truncate text-[11px] font-medium text-white/50",
								children: "rajesh@xebia.com"
							})]
						}),
						jsx("button", {
							className: "shrink-0 rounded-lg p-1.5 text-white/40 transition-colors hover:!bg-white/10 hover:!text-white",
							"aria-label": "Sign out",
							children: jsx(LogOut, { className: "h-[18px] w-[18px]" })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/manager/shared/dashboard-shell.js
function DashboardShell({ children }) {
	return jsxs(SidebarProvider, {
		defaultOpen: true,
		children: [jsx(ManagerSidebar, {}), jsxs(SidebarInset, {
			className: "bg-[#F7F7F8]",
			children: [jsx("div", {
				className: "sticky top-0 z-30 flex h-16 w-full shrink-0 items-center bg-[#F7F7F8]/80 px-4 backdrop-blur-md sm:px-6 lg:px-8",
				children: jsx(SidebarTrigger, { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#6C1D5F] shadow-sm border border-[#EDEDED] transition-all hover:bg-[#6C1D5F]/5 hover:text-[#4A1E47]" })
			}), jsx("div", {
				className: "mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8 pt-2 sm:pt-2 lg:pt-2",
				children
			})]
		})]
	});
}
//#endregion
//#region src/routes/manager/route.js?tsr-split=component
function ManagerLayout() {
	return jsxs(DashboardShell, { children: [jsx(Outlet, {}), jsx(Toaster, {
		richColors: true,
		position: "bottom-right"
	})] });
}
//#endregion
export { ManagerLayout as component };
