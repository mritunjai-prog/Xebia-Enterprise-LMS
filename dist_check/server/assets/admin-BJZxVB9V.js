import "./router-BRILKQ2f.js";
import { _ as IconSearch, a as IconBatch, c as IconDashboard, d as IconMoreHorizontal, f as IconNotifications, g as IconRoles, h as IconReports, i as IconAuditLogs, l as IconExpand, m as IconProfile, n as IconApprovals, o as IconBell, p as IconOrganizations, r as IconAssessments, s as IconCourses, t as IconAdd, v as IconSettings, y as IconUsers } from "./Icons-BfXeOMgI.js";
import { t as useAppStore } from "./useAppStore-B_rgJZsS.js";
import { useEffect, useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { clsx } from "clsx";
//#region src/admin/components/layout/Sidebar.jsx
var NavItem = ({ icon, label, badge, badgeColor, hasChildren, isActive, isOpen, onClick }) => /* @__PURE__ */ jsxs("div", {
	onClick,
	className: clsx("nav-item", isActive && "active"),
	children: [
		icon,
		label,
		badge && /* @__PURE__ */ jsx("span", {
			className: clsx("nav-badge", badgeColor === "green" && "green"),
			children: badge
		}),
		hasChildren && /* @__PURE__ */ jsx(IconExpand, { className: clsx("nav-expand", isOpen && "rotate-180") })
	]
});
var NavChild = ({ label, isActive, onClick }) => /* @__PURE__ */ jsx("div", {
	onClick,
	className: clsx("nav-child", isActive && "active"),
	children: label
});
function Sidebar() {
	const { activeSidebarItem, setActiveSidebarItem } = useAppStore();
	const [openSections, setOpenSections] = useState({
		orgs: true,
		courses: true
	});
	const toggleSection = (key, e) => {
		if (e) e.stopPropagation();
		setOpenSections((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
	};
	const handleNavClick = (label, isParent = false, key) => {
		setActiveSidebarItem(label);
		if (isParent && key) {
			if (!openSections[key]) toggleSection(key);
		}
	};
	return /* @__PURE__ */ jsxs("aside", {
		className: "sidebar",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "sidebar-brand",
				children: /* @__PURE__ */ jsxs("div", {
					className: "logo",
					children: [/* @__PURE__ */ jsx("div", {
						className: "logo-mark",
						children: /* @__PURE__ */ jsx("span", { children: "X" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "logo-text",
						children: "Xebia"
					}), /* @__PURE__ */ jsx("div", {
						className: "logo-sub",
						children: "LMS Admin"
					})] })]
				})
			}),
			/* @__PURE__ */ jsxs("nav", {
				className: "sidebar-nav",
				children: [
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconDashboard, { className: "nav-icon" }),
						label: "Dashboard",
						isActive: activeSidebarItem === "Dashboard",
						onClick: () => handleNavClick("Dashboard")
					}),
					/* @__PURE__ */ jsx("div", {
						className: "nav-section",
						children: "Organizations"
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconOrganizations, { className: "nav-icon" }),
						label: "Organizations",
						hasChildren: true,
						isOpen: openSections.orgs,
						isActive: [
							"Organizations",
							"Universities",
							"Colleges",
							"Companies"
						].includes(activeSidebarItem),
						onClick: () => handleNavClick("Organizations", true, "orgs")
					}),
					openSections.orgs && /* @__PURE__ */ jsxs("div", {
						className: "nav-children",
						children: [
							/* @__PURE__ */ jsx(NavChild, {
								label: "Universities",
								isActive: activeSidebarItem === "Universities",
								onClick: () => handleNavClick("Universities")
							}),
							/* @__PURE__ */ jsx(NavChild, {
								label: "Colleges",
								isActive: activeSidebarItem === "Colleges",
								onClick: () => handleNavClick("Colleges")
							}),
							/* @__PURE__ */ jsx(NavChild, {
								label: "Companies",
								isActive: activeSidebarItem === "Companies",
								onClick: () => handleNavClick("Companies")
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "nav-section",
						children: "Users & Access"
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconUsers, { className: "nav-icon" }),
						label: "Users",
						badge: "2.4k",
						badgeColor: "green",
						isActive: activeSidebarItem === "Users",
						onClick: () => handleNavClick("Users")
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconRoles, { className: "nav-icon" }),
						label: "Roles & Permissions",
						isActive: activeSidebarItem === "Roles & Permissions",
						onClick: () => handleNavClick("Roles & Permissions")
					}),
					/* @__PURE__ */ jsx("div", {
						className: "nav-section",
						children: "Learning"
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconCourses, { className: "nav-icon" }),
						label: "Categories",
						isActive: activeSidebarItem === "Categories",
						onClick: () => handleNavClick("Categories")
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconCourses, { className: "nav-icon" }),
						label: "Courses",
						hasChildren: true,
						isOpen: openSections.courses,
						isActive: [
							"Courses",
							"Course List",
							"Content Builder"
						].includes(activeSidebarItem),
						onClick: () => handleNavClick("Courses", true, "courses")
					}),
					openSections.courses && /* @__PURE__ */ jsxs("div", {
						className: "nav-children",
						children: [/* @__PURE__ */ jsx(NavChild, {
							label: "Course List",
							isActive: activeSidebarItem === "Course List",
							onClick: () => handleNavClick("Course List")
						}), /* @__PURE__ */ jsx(NavChild, {
							label: "Content Builder",
							isActive: activeSidebarItem === "Content Builder",
							onClick: () => handleNavClick("Content Builder")
						})]
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconBatch, { className: "nav-icon" }),
						label: "Batch & Enrollment",
						isActive: activeSidebarItem === "Batch & Enrollment",
						onClick: () => handleNavClick("Batch & Enrollment")
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconAssessments, { className: "nav-icon" }),
						label: "Assessments",
						isActive: activeSidebarItem === "Assessments",
						onClick: () => handleNavClick("Assessments")
					}),
					/* @__PURE__ */ jsx("div", {
						className: "nav-section",
						children: "Operations"
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconApprovals, { className: "nav-icon" }),
						label: "Approvals",
						badge: "14",
						isActive: activeSidebarItem === "Approvals",
						onClick: () => handleNavClick("Approvals")
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconNotifications, { className: "nav-icon" }),
						label: "Notifications",
						badge: "3",
						isActive: activeSidebarItem === "Notifications",
						onClick: () => handleNavClick("Notifications")
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconReports, { className: "nav-icon" }),
						label: "Reports",
						isActive: activeSidebarItem === "Reports",
						onClick: () => handleNavClick("Reports")
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconAuditLogs, { className: "nav-icon" }),
						label: "Audit Logs",
						isActive: activeSidebarItem === "Audit Logs",
						onClick: () => handleNavClick("Audit Logs")
					}),
					/* @__PURE__ */ jsx(NavItem, {
						icon: /* @__PURE__ */ jsx(IconSettings, { className: "nav-icon" }),
						label: "Settings",
						isActive: activeSidebarItem === "Settings",
						onClick: () => handleNavClick("Settings")
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "sidebar-footer",
				children: /* @__PURE__ */ jsxs("div", {
					className: "sidebar-user",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "user-avatar",
							children: "SA"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "user-info",
							children: [/* @__PURE__ */ jsx("div", {
								className: "user-name",
								children: "Super Admin"
							}), /* @__PURE__ */ jsx("div", {
								className: "user-role",
								children: "Platform Administrator"
							})]
						}),
						/* @__PURE__ */ jsx(IconMoreHorizontal, { className: "text-white/35" })
					]
				})
			})
		]
	});
}
//#endregion
//#region src/admin/components/layout/Header.jsx
function Header() {
	const { activeTenant, addToast, activeSidebarItem } = useAppStore();
	const [isDark, setIsDark] = useState(() => typeof window !== "undefined" && document.documentElement.classList.contains("dark"));
	const toggleDark = () => {
		const html = document.documentElement;
		if (html.classList.contains("dark")) {
			html.classList.remove("dark");
			localStorage.setItem("lms_theme", "light");
			setIsDark(false);
		} else {
			html.classList.add("dark");
			localStorage.setItem("lms_theme", "dark");
			setIsDark(true);
		}
	};
	useEffect(() => {
		const saved = localStorage.getItem("lms_theme");
		if (saved === "dark") {
			document.documentElement.classList.add("dark");
			setIsDark(true);
		} else if (saved === "light") {
			document.documentElement.classList.remove("dark");
			setIsDark(false);
		}
	}, []);
	return /* @__PURE__ */ jsxs("header", {
		className: "header",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "breadcrumb",
				children: [
					/* @__PURE__ */ jsx("span", { children: "Platform" }),
					/* @__PURE__ */ jsx("span", {
						className: "breadcrumb-sep",
						children: "›"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "breadcrumb-cur",
						children: activeSidebarItem
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "header-search",
				children: [/* @__PURE__ */ jsx(IconSearch, { className: "search-icon text-[#5A5A5A]" }), /* @__PURE__ */ jsx("input", {
					type: "text",
					placeholder: "Search organizations, users, courses…"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "header-actions",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "tenant-switcher",
						onClick: () => addToast("Tenant switching available soon.", "info"),
						children: [
							/* @__PURE__ */ jsx("span", { className: "tenant-dot" }),
							activeTenant,
							/* @__PURE__ */ jsx(IconExpand, { className: "opacity-50" })
						]
					}),
					/* @__PURE__ */ jsxs("button", {
						className: "quick-create",
						onClick: () => addToast("Opening quick creator workflow…", "info"),
						children: [/* @__PURE__ */ jsx(IconAdd, {}), "Quick Create"]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "header-btn",
						onClick: () => addToast("3 Unread notifications.", "info"),
						children: [/* @__PURE__ */ jsx(IconBell, {}), /* @__PURE__ */ jsx("span", { className: "notif-dot" })]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: toggleDark,
						className: "header-btn",
						title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
						style: { fontSize: "16px" },
						children: isDark ? "☀️" : "🌙"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "header-btn",
						onClick: () => addToast("Profile menu coming soon.", "info"),
						children: /* @__PURE__ */ jsx(IconProfile, {})
					})
				]
			})
		]
	});
}
//#endregion
//#region src/routes/admin.jsx?tsr-split=component
function AdminLayout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "shell",
		children: [/* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsxs("div", {
			className: "main",
			children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("div", {
				className: "content",
				children: /* @__PURE__ */ jsx(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AdminLayout as component };
