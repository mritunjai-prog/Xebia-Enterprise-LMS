import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useMatchRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  MessageSquareText,
  BarChart3,
  LogOut,
  PanelLeftClose,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/manager" },
  { title: "Users", icon: Users, href: "/manager/users" },
  { title: "Approvals", icon: ShieldCheck, href: "/manager/approvals" },
  { title: "Feedback", icon: MessageSquareText, href: "/manager/feedback" },
  { title: "Analytics", icon: BarChart3, href: "/manager/analytics" },
];

export function ManagerSidebar() {
  const matchRoute = useMatchRoute();
  const { toggleSidebar } = useSidebar();

  return (
    _jsxs(Sidebar, {
      collapsible: "offcanvas",
      className: "border-r-0 [&_[data-sidebar=sidebar]]:bg-[#6C1D5F]",
      children: [
        /* ── Header / Logo ── */
        _jsx(SidebarHeader, {
          className: "px-5 pb-2 pt-5",
          children: _jsxs("div", {
            className: "flex items-center justify-between",
            children: [
              _jsx(Link, {
                to: "/manager",
                className: "flex items-center gap-3 transition-opacity hover:opacity-80",
                children: _jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    _jsx("img", {
                      src: "/logo-white.png",
                      alt: "Xebia LMS",
                      className: "h-8 w-8 shrink-0 object-contain",
                    }),
                    _jsxs("div", {
                      className: "flex flex-col",
                      children: [
                        _jsx("span", {
                          className: "text-sm font-bold tracking-wide text-white",
                          children: "Xebia LMS",
                        }),
                        _jsx("span", {
                          className: "text-[10px] font-medium uppercase tracking-widest text-white/50",
                          children: "Manager Portal",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              _jsx("button", {
                onClick: toggleSidebar,
                className: "hidden rounded-md p-1.5 text-white/40 transition-colors hover:!bg-white/10 hover:!text-white md:block",
                "aria-label": "Toggle sidebar",
                children: _jsx(PanelLeftClose, { className: "h-4 w-4" }),
              }),
            ],
          }),
        }),

        _jsx(Separator, { className: "mx-4 w-auto bg-white/10" }),

        /* ── Navigation ── */
        _jsx(SidebarContent, {
          className: "px-3 pt-2",
          children: _jsxs(SidebarGroup, {
            children: [
              _jsx(SidebarGroupLabel, {
                className: "mb-1 px-3 text-[10px] uppercase tracking-widest text-white/40",
                children: "Navigation",
              }),
              _jsx(SidebarGroupContent, {
                children: _jsx(SidebarMenu, {
                  className: "space-y-1",
                  children: navItems.map((item) => {
                    const isActive =
                      item.href === "/manager"
                        ? matchRoute({ to: "/manager", fuzzy: false })
                        : matchRoute({ to: item.href, fuzzy: true });

                    return _jsx(SidebarMenuItem, {
                      children: _jsx(SidebarMenuButton, {
                        asChild: true,
                        isActive: !!isActive,
                        tooltip: item.title,
                        size: "lg",
                        className: `
                          rounded-lg font-medium transition-all duration-200
                          !text-white/70 hover:!bg-white/10 hover:!text-white
                          data-[active=true]:!bg-white/15 data-[active=true]:!text-white
                          data-[active=true]:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]
                        `,
                        children: _jsxs(Link, {
                          to: item.href,
                          className: "flex items-center gap-3",
                          children: [
                            _jsx(item.icon, {
                              className: `h-5 w-5 shrink-0 transition-colors ${
                                isActive ? "!text-[#00A99D]" : ""
                              }`,
                            }),
                            _jsx("span", {
                              className: "text-[14px]",
                              children: item.title,
                            }),
                          ],
                        }),
                      }),
                    }, item.href);
                  }),
                }),
              }),
            ],
          }),
        }),

        /* ── Footer / Profile ── */
        _jsxs(SidebarFooter, {
          className: "px-4 pb-4",
          children: [
            _jsx(Separator, { className: "mb-3 w-auto bg-white/10" }),
            _jsxs("div", {
              className: "flex items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10",
              children: [
                _jsx(Avatar, {
                  className: "h-9 w-9 shrink-0 border border-white/20",
                  children: _jsx(AvatarFallback, {
                    className: "bg-[#8A177D] text-xs font-semibold text-white",
                    children: "RM",
                  }),
                }),
                _jsxs("div", {
                  className: "flex flex-1 flex-col overflow-hidden",
                  children: [
                    _jsx("span", {
                      className: "truncate text-sm font-medium text-white",
                      children: "Rajesh Manager",
                    }),
                    _jsx("span", {
                      className: "truncate text-[11px] text-white/50",
                      children: "rajesh@xebia.com",
                    }),
                  ],
                }),
                _jsx("button", {
                  className: "shrink-0 rounded-md p-1.5 text-white/40 transition-colors hover:!bg-white/10 hover:!text-white",
                  "aria-label": "Sign out",
                  children: _jsx(LogOut, { className: "h-4 w-4" }),
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
