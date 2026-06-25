import { g as IconRoles, h as IconReports, p as IconOrganizations, r as IconAssessments, s as IconCourses, t as IconAdd, u as IconExport, v as IconSettings, y as IconUsers } from "./Icons-BfXeOMgI.js";
import { t as useAppStore } from "./useAppStore-B_rgJZsS.js";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Activity, BookMarked, BookOpen, CheckCircle, ChevronRight, Clock, Cpu, Edit3, Eye, FolderCode, Globe, Image, Layers, PlayCircle, Search, Settings, ShieldAlert, Star, TrendingUp, Users, Video, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
//#region src/admin/pages/Dashboard/KpiGrid.jsx
var KpiCard = ({ icon, color, badge, title, value, isNegativeMode = false }) => {
	const isDown = !(badge.isNegative ? false : true);
	return /* @__PURE__ */ jsxs("div", {
		className: "kpi-card",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "kpi-header",
				children: [/* @__PURE__ */ jsx("div", {
					className: clsx("kpi-icon", color),
					children: icon
				}), /* @__PURE__ */ jsxs("span", {
					className: clsx("kpi-badge", isDown && "down", !isDown && "up"),
					children: [
						isDown ? "↓" : "↑",
						" ",
						Math.abs(badge.value),
						"%"
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "kpi-value",
				children: value.toLocaleString()
			}),
			/* @__PURE__ */ jsx("div", {
				className: "kpi-label",
				children: title
			})
		]
	});
};
var KpiGrid = ({ data }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: "kpi-grid",
		children: [
			/* @__PURE__ */ jsx(KpiCard, {
				icon: /* @__PURE__ */ jsx(IconOrganizations, {}),
				color: "purple",
				title: "Total Organizations",
				value: data.orgs.total,
				badge: { value: data.orgs.change }
			}),
			/* @__PURE__ */ jsx(KpiCard, {
				icon: /* @__PURE__ */ jsx(IconUsers, {}),
				color: "purple",
				title: "Total Users",
				value: data.users.total,
				badge: { value: data.users.change }
			}),
			/* @__PURE__ */ jsx(KpiCard, {
				icon: /* @__PURE__ */ jsx(IconRoles, {}),
				color: "emerald",
				title: "Active Trainers",
				value: data.trainers.total,
				badge: { value: data.trainers.change }
			}),
			/* @__PURE__ */ jsx(KpiCard, {
				icon: /* @__PURE__ */ jsx(IconAssessments, {}),
				color: "purple",
				title: "Active Courses",
				value: data.courses.total,
				badge: { value: data.courses.change }
			}),
			/* @__PURE__ */ jsx(KpiCard, {
				icon: /* @__PURE__ */ jsx(IconCourses, {}),
				color: "purple",
				title: "Active Batches",
				value: data.batches.total,
				badge: { value: data.batches.change }
			}),
			/* @__PURE__ */ jsx(KpiCard, {
				icon: /* @__PURE__ */ jsx(IconSettings, {}),
				color: "orange",
				title: "Pending Approvals",
				value: data.approvals.total,
				badge: {
					value: data.approvals.change,
					isNegative: data.approvals.isNegative
				}
			}),
			/* @__PURE__ */ jsx(KpiCard, {
				icon: /* @__PURE__ */ jsx(IconReports, {}),
				color: "emerald",
				title: "Enrolled Students",
				value: data.students.total,
				badge: { value: data.students.change }
			}),
			/* @__PURE__ */ jsx(KpiCard, {
				icon: /* @__PURE__ */ jsx(IconAssessments, {}),
				color: "orange",
				title: "Assessments Run",
				value: data.assessments.total,
				badge: { value: data.assessments.change }
			})
		]
	});
};
//#endregion
//#region src/admin/pages/Dashboard/ChartsRow.jsx
var ChartsRow = () => {
	const [activeTab, setActiveTab] = useState("Monthly");
	const { addToast } = useAppStore();
	const handleTabClick = (tab) => {
		setActiveTab(tab);
		if (tab !== "Monthly") addToast(`${tab} data is being processed, showing latest monthly metrics.`, "info");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "charts-row",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "card",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "card-header",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "card-title",
						children: "User Growth"
					}), /* @__PURE__ */ jsx("div", {
						className: "card-meta",
						children: "New enrollments by month, 2025"
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "card-tabs",
						children: [/* @__PURE__ */ jsx("div", {
							className: `card-tab ${activeTab === "Monthly" ? "active" : ""}`,
							onClick: () => handleTabClick("Monthly"),
							children: "Monthly"
						}), /* @__PURE__ */ jsx("div", {
							className: `card-tab ${activeTab === "Quarterly" ? "active" : ""}`,
							onClick: () => handleTabClick("Quarterly"),
							children: "Quarterly"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "chart-area",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "bar-group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "55%",
									background: "#D3CCEC"
								},
								title: "Jan: 1,820"
							}), /* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "48%",
									background: "#9D92B2"
								},
								title: "Jan prev: 1,580"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bar-group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "62%",
									background: "#D3CCEC"
								}
							}), /* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "54%",
									background: "#9D92B2"
								}
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bar-group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "70%",
									background: "#D3CCEC"
								}
							}), /* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "61%",
									background: "#9D92B2"
								}
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bar-group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "82%",
									background: "#D3CCEC"
								}
							}), /* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "72%",
									background: "#9D92B2"
								}
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bar-group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "79%",
									background: "#6C1D5F"
								}
							}), /* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "68%",
									background: "#9D92B2"
								}
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bar-group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "88%",
									background: "#6C1D5F"
								}
							}), /* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "75%",
									background: "#9D92B2"
								}
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bar-group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "94%",
									background: "#6C1D5F"
								}
							}), /* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "80%",
									background: "#9D92B2"
								}
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "bar-group",
							children: [/* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "100%",
									background: "#84117C"
								}
							}), /* @__PURE__ */ jsx("div", {
								className: "bar",
								style: {
									width: "50%",
									height: "82%",
									background: "#9D92B2"
								}
							})]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "chart-labels",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "chart-label",
							children: "Jan"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "chart-label",
							children: "Feb"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "chart-label",
							children: "Mar"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "chart-label",
							children: "Apr"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "chart-label",
							children: "May"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "chart-label",
							children: "Jun"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "chart-label",
							children: "Jul"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "chart-label",
							children: "Aug"
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					style: {
						display: "flex",
						gap: "16px",
						marginTop: "12px"
					},
					children: [/* @__PURE__ */ jsxs("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: "5px",
							fontSize: "11.5px",
							color: "var(--dark-gray)"
						},
						children: [/* @__PURE__ */ jsx("div", { style: {
							width: "10px",
							height: "10px",
							borderRadius: "2px",
							background: "#6C1D5F"
						} }), "2025"]
					}), /* @__PURE__ */ jsxs("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: "5px",
							fontSize: "11.5px",
							color: "var(--dark-gray)"
						},
						children: [/* @__PURE__ */ jsx("div", { style: {
							width: "10px",
							height: "10px",
							borderRadius: "2px",
							background: "#9D92B2"
						} }), "2024"]
					})]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "card",
			children: [/* @__PURE__ */ jsx("div", {
				className: "card-header",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "card-title",
					children: "Course Distribution"
				}), /* @__PURE__ */ jsx("div", {
					className: "card-meta",
					children: "By category"
				})] })
			}), /* @__PURE__ */ jsxs("div", {
				className: "donut-wrap",
				children: [/* @__PURE__ */ jsxs("svg", {
					width: "110",
					height: "110",
					viewBox: "0 0 110 110",
					children: [
						/* @__PURE__ */ jsx("circle", {
							cx: "55",
							cy: "55",
							r: "40",
							fill: "none",
							stroke: "#6C1D5F",
							strokeWidth: "18",
							strokeDasharray: "100.5 150.8",
							strokeDashoffset: "0"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "55",
							cy: "55",
							r: "40",
							fill: "none",
							stroke: "#84117C",
							strokeWidth: "18",
							strokeDasharray: "62.8 188.5",
							strokeDashoffset: "-100.5"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "55",
							cy: "55",
							r: "40",
							fill: "none",
							stroke: "#B8AFCF",
							strokeWidth: "18",
							strokeDasharray: "47.1 204.2",
							strokeDashoffset: "-163.3"
						}),
						/* @__PURE__ */ jsx("circle", {
							cx: "55",
							cy: "55",
							r: "40",
							fill: "none",
							stroke: "#D3CCEC",
							strokeWidth: "18",
							strokeDasharray: "40.8 210.5",
							strokeDashoffset: "-210.4"
						}),
						/* @__PURE__ */ jsx("text", {
							x: "55",
							y: "51",
							textAnchor: "middle",
							fontSize: "16",
							fontWeight: "700",
							fill: "#000",
							fontFamily: "Inter",
							children: "3,461"
						}),
						/* @__PURE__ */ jsx("text", {
							x: "55",
							y: "65",
							textAnchor: "middle",
							fontSize: "10",
							fill: "#5A5A5A",
							fontFamily: "Inter",
							children: "courses"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "donut-legend",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "legend-item",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "legend-dot",
									style: { background: "#6C1D5F" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "legend-label",
									children: "Technical"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "legend-pct",
									children: "40%"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "legend-item",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "legend-dot",
									style: { background: "#84117C" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "legend-label",
									children: "Management"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "legend-pct",
									children: "25%"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "legend-item",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "legend-dot",
									style: { background: "#B8AFCF" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "legend-label",
									children: "Compliance"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "legend-pct",
									children: "19%"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "legend-item",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "legend-dot",
									style: { background: "#D3CCEC" }
								}),
								/* @__PURE__ */ jsx("div", {
									className: "legend-label",
									children: "Soft Skills"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "legend-pct",
									children: "16%"
								})
							]
						})
					]
				})]
			})]
		})]
	});
};
//#endregion
//#region src/admin/pages/Dashboard/BottomRow.jsx
var BottomRow = ({ orgs, approvals }) => {
	const { setActiveSidebarItem, addToast } = useAppStore();
	return /* @__PURE__ */ jsxs("div", {
		className: "bottom-row",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "card",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "card-header",
					children: [/* @__PURE__ */ jsx("div", {
						className: "card-title",
						children: "Recent Organizations"
					}), /* @__PURE__ */ jsx("button", {
						className: "btn-outline",
						style: {
							fontSize: "12px",
							padding: "5px 11px"
						},
						onClick: () => setActiveSidebarItem("Organizations"),
						children: "View All"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "section-tabs",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "stab active",
							children: "All"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "stab",
							onClick: () => setActiveSidebarItem("Universities"),
							children: "Universities"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "stab",
							onClick: () => setActiveSidebarItem("Companies"),
							children: "Companies"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ jsxs("table", { children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", { children: "Organization" }),
						/* @__PURE__ */ jsx("th", { children: "Type" }),
						/* @__PURE__ */ jsx("th", { children: "Status" }),
						/* @__PURE__ */ jsx("th", { children: "Actions" })
					] }) }), /* @__PURE__ */ jsx("tbody", { children: orgs.map((org) => /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", {
							className: "avatar-cell",
							children: [/* @__PURE__ */ jsx("div", {
								className: "avatar",
								style: { background: org.color },
								children: org.abbr
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "cell-name",
								children: org.name
							}), /* @__PURE__ */ jsx("div", {
								className: "cell-sub",
								children: org.domain
							})] })]
						}) }),
						/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
							style: {
								fontSize: "12px",
								color: "var(--dark-gray)"
							},
							children: org.type
						}) }),
						/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("span", {
							className: clsx("status-badge", org.status === "Active" && "status-active", org.status === "Pending" && "status-pending", org.status === "Inactive" && "status-inactive"),
							children: [/* @__PURE__ */ jsx("span", { className: "status-dot" }), org.status]
						}) }),
						/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", {
							className: "action-btns",
							children: [/* @__PURE__ */ jsx("button", {
								className: "action-btn",
								onClick: () => addToast("Opening org details...", "info"),
								children: "View"
							}), /* @__PURE__ */ jsx("button", {
								className: "action-btn",
								onClick: () => addToast("Opening org editor...", "info"),
								children: "Edit"
							})]
						}) })
					] }, org.id)) })] })
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "card",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "card-header",
				children: [/* @__PURE__ */ jsx("div", {
					className: "card-title",
					children: "Approval Queue"
				}), /* @__PURE__ */ jsxs("span", {
					style: {
						background: "rgba(255,98,0,0.1)",
						color: "var(--orange)",
						fontSize: "11.5px",
						fontWeight: 700,
						padding: "3px 9px",
						borderRadius: "20px",
						cursor: "pointer"
					},
					onClick: () => setActiveSidebarItem("Approvals"),
					children: [approvals.length, " Pending"]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "approval-list",
				children: approvals.map((req) => /* @__PURE__ */ jsxs("div", {
					className: "approval-card",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "approval-top",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "approval-title",
							children: req.title
						}), /* @__PURE__ */ jsxs("div", {
							className: "approval-sub",
							children: [
								"Requested by ",
								req.requester,
								" · ",
								req.timeAgo
							]
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "approval-sla",
							style: { color: req.isUrgent === false ? "var(--primary)" : "var(--orange)" },
							children: [
								"SLA ",
								req.slaHours,
								"h"
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "approval-actions",
						children: [
							/* @__PURE__ */ jsx("button", {
								className: "appr-btn approve",
								onClick: () => addToast("Manage approvals from the Approvals center.", "info"),
								children: "✓ Approve"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "appr-btn reject",
								onClick: () => addToast("Manage approvals from the Approvals center.", "info"),
								children: "✕ Reject"
							}),
							/* @__PURE__ */ jsx("button", {
								className: "action-btn",
								style: {
									fontSize: "11.5px",
									padding: "5px 10px"
								},
								onClick: () => addToast("Opening comments...", "info"),
								children: "Comment"
							})
						]
					})]
				}, req.id))
			})]
		})]
	});
};
//#endregion
//#region src/admin/pages/Dashboard/index.jsx
function Dashboard() {
	const { dashboardData, isLoading, fetchDashboardData, addToast, setActiveSidebarItem } = useAppStore();
	useEffect(() => {
		fetchDashboardData();
	}, [fetchDashboardData]);
	if (isLoading || !dashboardData) return /* @__PURE__ */ jsx("div", {
		className: "flex items-center justify-center h-full",
		children: /* @__PURE__ */ jsx("div", {
			className: "animate-pulse text-[var(--dark-gray)]",
			children: "Loading dashboard data..."
		})
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "page-header",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
				className: "page-title",
				children: "Admin Dashboard"
			}), /* @__PURE__ */ jsx("div", {
				className: "page-subtitle",
				children: "Platform overview — all tenants · June 2025"
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "page-actions",
				children: [/* @__PURE__ */ jsxs("button", {
					className: "btn-outline",
					onClick: () => addToast("Exporting report as PDF...", "info"),
					children: [/* @__PURE__ */ jsx(IconExport, {}), "Export Report"]
				}), /* @__PURE__ */ jsxs("button", {
					className: "btn-primary",
					onClick: () => setActiveSidebarItem("Organizations"),
					children: [/* @__PURE__ */ jsx(IconAdd, {}), "Add Organization"]
				})]
			})]
		}),
		/* @__PURE__ */ jsx(KpiGrid, { data: dashboardData.kpi }),
		/* @__PURE__ */ jsx(ChartsRow, {}),
		/* @__PURE__ */ jsx(BottomRow, {
			orgs: dashboardData.recentOrgs,
			approvals: dashboardData.approvals
		})
	] });
}
//#endregion
//#region src/admin/components/ui/Modal.jsx
var Modal = ({ isOpen, onClose, title, children }) => {
	const overlayRef = useRef(null);
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);
	if (!isOpen) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "overlay",
		ref: overlayRef,
		onClick: (e) => {
			if (e.target === overlayRef.current) onClose();
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "modal",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "modal-header",
				children: [/* @__PURE__ */ jsx("div", {
					className: "modal-title",
					children: title
				}), /* @__PURE__ */ jsx("button", {
					className: "modal-close",
					onClick: onClose,
					children: /* @__PURE__ */ jsx("svg", {
						width: "20",
						height: "20",
						viewBox: "0 0 20 20",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						children: /* @__PURE__ */ jsx("path", { d: "M5 5l10 10M15 5L5 15" })
					})
				})]
			}), /* @__PURE__ */ jsx("div", { children })]
		})
	});
};
//#endregion
//#region src/admin/pages/Organizations/index.jsx
function Organizations() {
	const { organizations, isLoadingOrgs, fetchOrganizations, createOrganization } = useAppStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("All");
	const [formData, setFormData] = useState({
		name: "",
		domain: "",
		type: "Company"
	});
	useEffect(() => {
		fetchOrganizations();
	}, [fetchOrganizations]);
	const filteredOrgs = organizations.filter((org) => {
		if (activeTab === "All") return true;
		if (activeTab === "Universities") return org.type === "University";
		return org.type === "Company";
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		await createOrganization(formData);
		setIsModalOpen(false);
		setFormData({
			name: "",
			domain: "",
			type: "Company"
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "page-header",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
				className: "page-title",
				children: "Organizations"
			}), /* @__PURE__ */ jsx("div", {
				className: "page-subtitle",
				children: "Manage universities, colleges, and enterprise clients."
			})] }), /* @__PURE__ */ jsx("div", {
				className: "page-actions",
				children: /* @__PURE__ */ jsxs("button", {
					className: "btn-primary",
					onClick: () => setIsModalOpen(true),
					children: [/* @__PURE__ */ jsx(IconAdd, {}), "Add Organization"]
				})
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "card",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "section-tabs",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: clsx("stab", activeTab === "All" && "active"),
						onClick: () => setActiveTab("All"),
						children: "All"
					}),
					/* @__PURE__ */ jsx("div", {
						className: clsx("stab", activeTab === "Universities" && "active"),
						onClick: () => setActiveTab("Universities"),
						children: "Universities"
					}),
					/* @__PURE__ */ jsx("div", {
						className: clsx("stab", activeTab === "Companies" && "active"),
						onClick: () => setActiveTab("Companies"),
						children: "Companies"
					})
				]
			}), isLoadingOrgs ? /* @__PURE__ */ jsx("div", {
				className: "p-4 text-center text-dark-gray animate-pulse",
				children: "Loading organizations..."
			}) : /* @__PURE__ */ jsx("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ jsxs("table", { children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", { children: "Organization" }),
					/* @__PURE__ */ jsx("th", { children: "Type" }),
					/* @__PURE__ */ jsx("th", { children: "Status" }),
					/* @__PURE__ */ jsx("th", { children: "Actions" })
				] }) }), /* @__PURE__ */ jsxs("tbody", { children: [filteredOrgs.map((org) => /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", {
						className: "avatar-cell",
						children: [/* @__PURE__ */ jsx("div", {
							className: "avatar",
							style: { background: org.color },
							children: org.abbr
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "cell-name",
							children: org.name
						}), /* @__PURE__ */ jsx("div", {
							className: "cell-sub",
							children: org.domain
						})] })]
					}) }),
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
						style: {
							fontSize: "12px",
							color: "var(--dark-gray)"
						},
						children: org.type
					}) }),
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("span", {
						className: clsx("status-badge", org.status === "Active" && "status-active", org.status === "Pending" && "status-pending", org.status === "Inactive" && "status-inactive"),
						children: [/* @__PURE__ */ jsx("span", { className: "status-dot" }), org.status]
					}) }),
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", {
						className: "action-btns",
						children: [/* @__PURE__ */ jsx("button", {
							className: "action-btn",
							onClick: () => useAppStore.getState().addToast("Opening org details...", "info"),
							children: "View"
						}), /* @__PURE__ */ jsx("button", {
							className: "action-btn",
							onClick: () => useAppStore.getState().addToast("Opening org editor...", "info"),
							children: "Edit"
						})]
					}) })
				] }, org.id)), filteredOrgs.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
					colSpan: 4,
					className: "text-center py-6 text-dark-gray",
					children: "No organizations found."
				}) })] })] })
			})]
		}),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: isModalOpen,
			onClose: () => setIsModalOpen(false),
			title: "Add Organization",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label",
							children: "Organization Name"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							className: "form-input",
							placeholder: "e.g. Acme Corp",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label",
							children: "Domain Name"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							className: "form-input",
							placeholder: "e.g. acme.com",
							value: formData.domain,
							onChange: (e) => setFormData({
								...formData,
								domain: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label",
							children: "Organization Type"
						}), /* @__PURE__ */ jsxs("select", {
							className: "form-select",
							value: formData.type,
							onChange: (e) => setFormData({
								...formData,
								type: e.target.value
							}),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "Company",
									children: "Company"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "University",
									children: "University"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "College",
									children: "College"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "modal-footer",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn-outline",
							onClick: () => setIsModalOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "btn-primary",
							children: "Create Organization"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
//#region src/admin/pages/Users/index.jsx
function Users$1() {
	const { users, isLoadingUsers, fetchUsers, createUser } = useAppStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "Student",
		tenant: "Global"
	});
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await createUser(formData);
		setIsModalOpen(false);
		setFormData({
			name: "",
			email: "",
			role: "Student",
			tenant: "Global"
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "page-header",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
				className: "page-title",
				children: "Users & Access"
			}), /* @__PURE__ */ jsx("div", {
				className: "page-subtitle",
				children: "Manage users, roles, and tenant assignments."
			})] }), /* @__PURE__ */ jsx("div", {
				className: "page-actions",
				children: /* @__PURE__ */ jsxs("button", {
					className: "btn-primary",
					onClick: () => setIsModalOpen(true),
					children: [/* @__PURE__ */ jsx(IconAdd, {}), "Create User"]
				})
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "card",
			children: isLoadingUsers ? /* @__PURE__ */ jsx("div", {
				className: "p-4 text-center text-dark-gray animate-pulse",
				children: "Loading users..."
			}) : /* @__PURE__ */ jsx("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ jsxs("table", { children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("th", { children: "User" }),
					/* @__PURE__ */ jsx("th", { children: "Role" }),
					/* @__PURE__ */ jsx("th", { children: "Tenant" }),
					/* @__PURE__ */ jsx("th", { children: "Status" }),
					/* @__PURE__ */ jsx("th", { children: "Last Login" }),
					/* @__PURE__ */ jsx("th", { children: "Actions" })
				] }) }), /* @__PURE__ */ jsx("tbody", { children: users.map((user) => /* @__PURE__ */ jsxs("tr", { children: [
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("div", {
						className: "avatar-cell",
						children: [/* @__PURE__ */ jsx("div", {
							className: "avatar",
							style: { background: user.avatarColor },
							children: user.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "cell-name",
							children: user.name
						}), /* @__PURE__ */ jsx("div", {
							className: "cell-sub",
							children: user.email
						})] })]
					}) }),
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
						style: {
							fontSize: "12.5px",
							fontWeight: 500,
							color: "var(--primary)"
						},
						children: user.role
					}) }),
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
						style: {
							fontSize: "12px",
							color: "var(--dark-gray)"
						},
						children: user.tenant
					}) }),
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs("span", {
						className: clsx("status-badge", user.status === "Active" && "status-active", user.status === "Inactive" && "status-inactive"),
						children: [/* @__PURE__ */ jsx("span", { className: "status-dot" }), user.status]
					}) }),
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", {
						style: {
							fontSize: "12px",
							color: "var(--dark-gray)"
						},
						children: user.lastLogin
					}) }),
					/* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("div", {
						className: "action-btns",
						children: /* @__PURE__ */ jsx("button", {
							className: "action-btn",
							onClick: () => useAppStore.getState().addToast("Opening user editor...", "info"),
							children: "Edit"
						})
					}) })
				] }, user.id)) })] })
			})
		}),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: isModalOpen,
			onClose: () => setIsModalOpen(false),
			title: "Create User",
			children: /* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label",
							children: "Full Name"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							className: "form-input",
							placeholder: "e.g. John Doe",
							value: formData.name,
							onChange: (e) => setFormData({
								...formData,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label",
							children: "Email Address"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "email",
							className: "form-input",
							placeholder: "e.g. john@example.com",
							value: formData.email,
							onChange: (e) => setFormData({
								...formData,
								email: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label",
							children: "Role Definition"
						}), /* @__PURE__ */ jsxs("select", {
							className: "form-select",
							value: formData.role,
							onChange: (e) => setFormData({
								...formData,
								role: e.target.value
							}),
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "Admin",
									children: "Admin"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Manager",
									children: "Manager"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Trainer",
									children: "Trainer"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Organiser",
									children: "Organiser"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Student",
									children: "Student"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "form-group",
						children: [/* @__PURE__ */ jsx("label", {
							className: "form-label",
							children: "Tenant Scope"
						}), /* @__PURE__ */ jsx("input", {
							type: "text",
							className: "form-input",
							placeholder: "e.g. Global",
							value: formData.tenant,
							onChange: (e) => setFormData({
								...formData,
								tenant: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "modal-footer",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn-outline",
							onClick: () => setIsModalOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "btn-primary",
							children: "Provision User"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
//#region src/admin/pages/Courses/index.jsx
var mockCourses = [
	{
		id: "C491",
		title: "Enterprise Architecture Patterns",
		category: "Architecture",
		level: "Advanced",
		language: "English",
		duration: "12h 30m",
		totalViews: 1400,
		isPublished: true,
		isActive: true,
		enrollments: 124,
		modules: 8,
		submodules: 22,
		lessons: 41,
		rating: 4.8,
		language: "English",
		icon: "🏗️",
		color: "#6C1D5F",
		slug: "enterprise-architecture-patterns",
		shortDescription: "Master large-scale distributed systems design. Learn patterns used by top tech companies to build resilient, scalable enterprise software.",
		courseHighlights: "✅ 12+ real-world architecture case studies\n✅ Domain-Driven Design (DDD) deep dive\n✅ Event-driven architecture patterns\n✅ CQRS and Event Sourcing\n✅ Certificate of completion",
		learningOutcomes: "• Design and evaluate enterprise-grade architecture\n• Apply microservices decomposition strategies\n• Implement distributed transactions with Sagas\n• Build event-driven systems using Kafka",
		prerequisites: "• 3+ years of software development experience\n• Familiarity with REST APIs and databases\n• Basic understanding of cloud platforms (AWS/GCP/Azure)",
		careerOpportunities: "🚀 Solutions Architect\n🚀 Principal Engineer\n🚀 Enterprise Architect\n🚀 Technical Lead",
		targetAudience: "Senior developers and tech leads looking to transition into architecture roles or deepen their system design expertise."
	},
	{
		id: "C812",
		title: "Advanced React & Next.js",
		category: "Programming",
		level: "Intermediate",
		language: "English",
		duration: "8h 15m",
		totalViews: 320,
		isPublished: false,
		isActive: true,
		enrollments: 0,
		modules: 6,
		submodules: 18,
		lessons: 34,
		rating: 4.5,
		icon: "⚛️",
		color: "#3B82F6",
		slug: "advanced-react-nextjs",
		shortDescription: "Go beyond the basics. Build production-ready React applications with Next.js 15, covering SSR, server components, and performance optimization.",
		courseHighlights: "✅ React 19 + Next.js 15 App Router\n✅ Server Components & Server Actions\n✅ Full-stack data fetching patterns\n✅ Performance profiling & optimization\n✅ Deployment to Vercel / Docker",
		learningOutcomes: "• Build full-stack apps with the Next.js App Router\n• Implement authentication with NextAuth.js\n• Optimize Core Web Vitals\n• Use Zustand and React Query effectively",
		prerequisites: "• Solid JavaScript (ES2020+) knowledge\n• Working experience with React hooks\n• Basic knowledge of Node.js",
		careerOpportunities: "🚀 Frontend Engineer\n🚀 Full-Stack Developer\n🚀 React Specialist",
		targetAudience: "Mid-level developers comfortable with React who want to master modern full-stack development."
	},
	{
		id: "C102",
		title: "Microservices with Spring Boot",
		category: "Architecture",
		level: "Advanced",
		language: "English",
		duration: "15h 0m",
		totalViews: 4500,
		isPublished: true,
		isActive: true,
		enrollments: 89,
		modules: 12,
		submodules: 30,
		lessons: 58,
		rating: 4.9,
		icon: "🍃",
		color: "#10B981",
		slug: "microservices-spring-boot",
		shortDescription: "Build production-ready microservices from the ground up using Spring Boot, Spring Cloud, Docker, and Kubernetes.",
		courseHighlights: "✅ 15 hours of hands-on content\n✅ Service discovery, API Gateway, Circuit Breaker\n✅ Docker Compose & Kubernetes deployment\n✅ Observability with Prometheus & Grafana",
		learningOutcomes: "• Design and build a microservices ecosystem\n• Implement service discovery with Eureka\n• Set up API Gateway with Spring Cloud Gateway\n• Deploy to Kubernetes with Helm charts",
		prerequisites: "• Java 17+ proficiency\n• Experience with Spring Boot basics\n• Understanding of REST and SQL databases",
		careerOpportunities: "🚀 Backend Engineer (Java/Spring)\n🚀 Microservices Architect\n🚀 Cloud Engineer",
		targetAudience: "Java developers who want to build and deploy modern cloud-native backend systems."
	}
];
function Courses() {
	const { addToast } = useAppStore();
	const router = useRouter();
	const [courses, setCourses] = useState(() => {
		const saved = localStorage.getItem("lms_courses_v1");
		if (saved) try {
			return JSON.parse(saved);
		} catch (e) {}
		return mockCourses;
	});
	useEffect(() => {
		localStorage.setItem("lms_courses_v1", JSON.stringify(courses));
	}, [courses]);
	const [activeTab, setActiveTab] = useState("All");
	const [search, setSearch] = useState("");
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [editorTab, setEditorTab] = useState("basic");
	const [isEditMode, setIsEditMode] = useState(false);
	const [viewCourse, setViewCourse] = useState(null);
	const [detailTab, setDetailTab] = useState("overview");
	const [formData, setFormData] = useState({
		id: "",
		title: "",
		slug: "",
		description: "",
		shortDescription: "",
		level: "Beginner",
		language: "English",
		duration: "",
		icon: "",
		color: "#3B82F6",
		thumbnail: "",
		bannerImage: "",
		isActive: true,
		isFeatured: false,
		metaTitle: "",
		metaDescription: "",
		primaryKeyword: "",
		canonicalUrl: "",
		secondaryKeywords: "",
		focusKeywords: "",
		robots: "index, follow",
		author: "",
		seoCategory: "",
		seoTags: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: "",
		ogUrl: "",
		ogType: "website",
		twitterTitle: "",
		twitterDescription: "",
		twitterImage: "",
		twitterCard: "summary_large_image",
		searchIntent: "",
		semanticKeywords: "",
		relatedTopics: "",
		searchSynonyms: "",
		faqContent: "",
		customHeadScript: "",
		customBodyScript: "",
		prerequisites: "",
		courseHighlights: "",
		careerOpportunities: "",
		youtubeVideoUrl: "",
		targetAudience: "",
		learningOutcomes: "",
		isPublished: false,
		allowIndexing: true,
		showInSearch: true
	});
	const filteredCourses = courses.filter((c) => {
		const matchesTab = activeTab === "All" ? true : activeTab === "Active" ? c.isPublished : !c.isPublished;
		const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
		return matchesTab && matchesSearch;
	});
	const handleCreateNew = () => {
		setFormData({
			id: "",
			title: "",
			slug: "",
			description: "",
			shortDescription: "",
			level: "Beginner",
			language: "English",
			duration: "",
			icon: "",
			color: "#3B82F6",
			thumbnail: "",
			bannerImage: "",
			isActive: true,
			isFeatured: false,
			metaTitle: "",
			metaDescription: "",
			primaryKeyword: "",
			canonicalUrl: "",
			secondaryKeywords: "",
			focusKeywords: "",
			robots: "index, follow",
			author: "",
			seoCategory: "",
			seoTags: "",
			ogTitle: "",
			ogDescription: "",
			ogImage: "",
			ogUrl: "",
			ogType: "website",
			twitterTitle: "",
			twitterDescription: "",
			twitterImage: "",
			twitterCard: "summary_large_image",
			searchIntent: "",
			semanticKeywords: "",
			relatedTopics: "",
			searchSynonyms: "",
			faqContent: "",
			customHeadScript: "",
			customBodyScript: "",
			prerequisites: "",
			courseHighlights: "",
			careerOpportunities: "",
			youtubeVideoUrl: "",
			targetAudience: "",
			learningOutcomes: "",
			isPublished: false,
			allowIndexing: true,
			showInSearch: true
		});
		setIsEditMode(false);
		setEditorTab("basic");
		setIsEditorOpen(true);
	};
	const handleEdit = (course) => {
		setFormData({
			...formData,
			...course
		});
		setIsEditMode(true);
		setEditorTab("basic");
		setIsEditorOpen(true);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.title || !formData.slug || !formData.category || !formData.icon || !formData.color) {
			addToast("Please fill out all required fields in the Basic Info tab.", "error");
			setEditorTab("basic");
			return;
		}
		if (isEditMode) {
			setCourses(courses.map((c) => c.id === formData.id ? {
				...formData,
				enrollments: c.enrollments
			} : c));
			addToast(`Course "${formData.title}" updated.`, "success");
		} else {
			const newCourse = {
				...formData,
				id: `C${Math.floor(Math.random() * 900) + 100}`,
				enrollments: 0,
				totalViews: 0
			};
			setCourses([newCourse, ...courses]);
			addToast(`Course "${newCourse.title}" created.`, "success");
		}
		setIsEditorOpen(false);
	};
	const navigateToBuilder = (courseId) => {
		router.navigate({
			to: `/admin/courses/builder`,
			search
		});
	};
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .4 },
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-black p-8 border border-white/10 shadow-2xl",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute top-0 right-0 p-8 opacity-10 pointer-events-none",
					children: /* @__PURE__ */ jsx(BookOpen, { className: "w-48 h-48 text-blue-400" })
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 mb-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold uppercase tracking-widest text-blue-400",
									children: "Curriculum Engine"
								}),
								/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-500/50" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold uppercase tracking-widest text-white/50",
									children: "Tenant Scoped"
								})
							]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "text-3xl font-bold text-white mb-2 font-display",
							children: "Course Registry"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-blue-200/80 max-w-xl text-sm",
							children: "Manage the master catalog of courses. Configure deep SEO metadata, media assets, marketing copy, and launch structural hierarchy builders."
						})
					] }), /* @__PURE__ */ jsxs("button", {
						onClick: handleCreateNew,
						className: "shrink-0 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 cursor-pointer",
						children: [/* @__PURE__ */ jsx(IconAdd, { className: "w-5 h-5" }), " Create Course"]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-3 glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between border border-border/40 shadow-sm",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex bg-secondary/50 p-1 rounded-xl w-full sm:w-auto",
						children: [
							"All",
							"Active",
							"Drafts"
						].map((tab) => /* @__PURE__ */ jsx("button", {
							onClick: () => setActiveTab(tab),
							className: clsx("px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer flex-1 sm:flex-none", activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
							children: tab
						}, tab))
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative w-full sm:max-w-xs",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							placeholder: "Search ID or title...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-5 border border-border/40 shadow-sm flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center",
						children: /* @__PURE__ */ jsx(Activity, { className: "w-6 h-6 text-blue-500" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
						children: "Total Catalog"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-2xl font-black text-foreground",
						children: courses.length
					})] })]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "glass rounded-2xl overflow-hidden border border-border/40 shadow-sm",
				children: /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
							className: "border-b border-border/40 bg-secondary/30",
							children: [
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider min-w-[260px]",
									children: "Course"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Category"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Level"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Language"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Duration"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center",
									children: "Modules"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider",
									children: "Visibility"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ jsxs("tbody", {
							className: "divide-y divide-border/20",
							children: [filteredCourses.map((course) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-secondary/10 transition-colors group",
								children: [
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-12 h-12 rounded-xl shrink-0 overflow-hidden border border-border/30 shadow-sm",
												style: { background: course.color ? course.color + "22" : "#3B82F622" },
												children: course.thumbnail ? /* @__PURE__ */ jsx("img", {
													src: course.thumbnail,
													alt: "",
													className: "w-full h-full object-cover"
												}) : course.icon && course.icon.startsWith("http") ? /* @__PURE__ */ jsx("img", {
													src: course.icon,
													alt: "",
													className: "w-full h-full object-cover"
												}) : /* @__PURE__ */ jsx("div", {
													className: "w-full h-full flex items-center justify-center text-xl",
													children: course.icon || "📚"
												})
											}), /* @__PURE__ */ jsxs("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ jsx("p", {
													onClick: () => setViewCourse(course),
													className: "font-bold text-sm text-foreground hover:text-purple-500 cursor-pointer transition-colors truncate max-w-[200px]",
													children: course.title
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: course.id
												})]
											})]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsx("span", {
											className: "bg-secondary/80 px-2.5 py-1 rounded-lg text-xs font-semibold text-foreground border border-border/50",
											children: course.category || "—"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsx("span", {
											className: clsx("px-2.5 py-1 rounded-lg text-xs font-bold border", course.level === "Beginner" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", course.level === "Intermediate" && "bg-blue-500/10 text-blue-600 border-blue-500/20", course.level === "Advanced" && "bg-purple-500/10 text-purple-600 border-purple-500/20", ![
												"Beginner",
												"Intermediate",
												"Advanced"
											].includes(course.level) && "bg-secondary text-muted-foreground border-border/50"),
											children: course.level || "—"
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-xs text-muted-foreground font-medium",
										children: course.language || "English"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 text-xs font-semibold text-foreground",
											children: [/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground" }), course.duration || "—"]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-center",
										children: /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 text-xs font-bold text-foreground",
											children: [/* @__PURE__ */ jsx(Layers, { className: "w-3.5 h-3.5 text-indigo-500" }), course.modules || 0]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: /* @__PURE__ */ jsxs("span", {
											className: clsx("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", course.isActive !== false ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"),
											children: [/* @__PURE__ */ jsx("span", { className: clsx("w-1.5 h-1.5 rounded-full", course.isActive !== false ? "bg-emerald-500" : "bg-red-500") }), course.isActive !== false ? "Active" : "Inactive"]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4",
										children: course.isPublished ? /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/20",
											children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }), " Published"]
										}) : /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20",
											children: [/* @__PURE__ */ jsx(ShieldAlert, { className: "w-3 h-3" }), " Draft"]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "p-4 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [/* @__PURE__ */ jsxs("button", {
												onClick: () => navigateToBuilder(course.id),
												className: "px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm",
												style: { background: "var(--primary, #6C1D5F)" },
												children: ["Content ", /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5" })]
											}), /* @__PURE__ */ jsx("button", {
												onClick: () => handleEdit(course),
												className: "h-8 w-8 rounded-lg bg-secondary border border-border/50 hover:bg-secondary/80 grid place-items-center text-foreground transition-colors cursor-pointer",
												title: "Edit",
												children: /* @__PURE__ */ jsx(Edit3, { className: "w-4 h-4" })
											})]
										})
									})
								]
							}, course.id)), filteredCourses.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 5,
								className: "text-center py-12 text-muted-foreground",
								children: "No courses found matching criteria."
							}) })]
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isEditorOpen && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: { scale: .95 },
					animate: { scale: 1 },
					exit: { scale: .95 },
					className: "w-full max-w-4xl max-h-[90vh] glass rounded-2xl overflow-hidden flex flex-col border border-border/40 shadow-2xl",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "px-6 py-4 border-b border-border/40 bg-secondary/30 flex items-center justify-between shrink-0",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-bold font-display text-foreground",
								children: isEditMode ? "Edit Course Properties" : "Create New Course"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Configure deep schemas, marketing copy, and metadata for the catalog."
							})] }), /* @__PURE__ */ jsx("button", {
								onClick: () => setIsEditorOpen(false),
								className: "h-8 w-8 rounded-full border border-border/50 hover:bg-secondary grid place-items-center cursor-pointer",
								children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-1 overflow-hidden",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-48 border-r border-border/40 bg-secondary/10 p-3 flex flex-col gap-1 shrink-0",
								children: [
									{
										id: "basic",
										label: "Basic Info",
										icon: BookOpen
									},
									{
										id: "media",
										label: "Media & Landing",
										icon: Image
									},
									{
										id: "seo",
										label: "SEO & Meta",
										icon: Globe
									},
									{
										id: "advanced",
										label: "Settings",
										icon: Settings
									}
								].map((tab) => /* @__PURE__ */ jsxs("button", {
									onClick: () => setEditorTab(tab.id),
									type: "button",
									className: clsx("w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer text-left", editorTab === tab.id ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"),
									children: [
										/* @__PURE__ */ jsx(tab.icon, { className: "w-4 h-4" }),
										" ",
										tab.label
									]
								}, tab.id))
							}), /* @__PURE__ */ jsx("div", {
								className: "flex-1 overflow-y-auto p-6 relative",
								children: /* @__PURE__ */ jsxs("form", {
									id: "course-form",
									onSubmit: handleSubmit,
									className: "space-y-6 pb-20",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: clsx(editorTab !== "basic" && "hidden"),
											children: [/* @__PURE__ */ jsxs("h3", {
												className: "text-lg font-bold text-foreground mb-4 flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5 text-blue-500" }), " Core Information"]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-5",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "grid grid-cols-2 gap-5",
														children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
															className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
															children: "Course Title"
														}), /* @__PURE__ */ jsx("input", {
															type: "text",
															className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500",
															value: formData.title,
															onChange: (e) => setFormData({
																...formData,
																title: e.target.value
															})
														})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
															className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
															children: "URL Slug"
														}), /* @__PURE__ */ jsx("input", {
															type: "text",
															className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 font-mono",
															value: formData.slug,
															onChange: (e) => setFormData({
																...formData,
																slug: e.target.value
															})
														})] })]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "grid grid-cols-1 md:grid-cols-3 gap-5",
														children: [
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "Category"
															}), /* @__PURE__ */ jsxs("select", {
																className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer",
																value: formData.category || "",
																onChange: (e) => setFormData({
																	...formData,
																	category: e.target.value
																}),
																children: [
																	/* @__PURE__ */ jsx("option", {
																		value: "",
																		disabled: true,
																		children: "Select Category"
																	}),
																	/* @__PURE__ */ jsx("option", {
																		value: "Programming",
																		children: "Programming"
																	}),
																	/* @__PURE__ */ jsx("option", {
																		value: "Architecture",
																		children: "Architecture"
																	}),
																	/* @__PURE__ */ jsx("option", {
																		value: "Cloud & DevOps",
																		children: "Cloud & DevOps"
																	}),
																	/* @__PURE__ */ jsx("option", {
																		value: "Data Science",
																		children: "Data Science"
																	})
																]
															})] }),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "Course Icon (Emoji or URL)"
															}), /* @__PURE__ */ jsxs("div", {
																className: "flex gap-2",
																children: [/* @__PURE__ */ jsx("input", {
																	type: "text",
																	placeholder: "e.g. 💻 or https://...",
																	className: "flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500",
																	value: formData.icon,
																	onChange: (e) => setFormData({
																		...formData,
																		icon: e.target.value
																	})
																}), /* @__PURE__ */ jsxs("label", {
																	className: "shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold",
																	title: "Upload Image",
																	children: [/* @__PURE__ */ jsx("svg", {
																		className: "w-4 h-4",
																		fill: "none",
																		stroke: "currentColor",
																		viewBox: "0 0 24 24",
																		children: /* @__PURE__ */ jsx("path", {
																			strokeLinecap: "round",
																			strokeLinejoin: "round",
																			strokeWidth: 2,
																			d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
																		})
																	}), /* @__PURE__ */ jsx("input", {
																		type: "file",
																		className: "hidden",
																		accept: "image/*",
																		onChange: (e) => {
																			if (e.target.files && e.target.files[0]) {
																				const reader = new FileReader();
																				reader.onload = (ev) => setFormData({
																					...formData,
																					icon: ev.target.result
																				});
																				reader.readAsDataURL(e.target.files[0]);
																			}
																		}
																	})]
																})]
															})] }),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "Brand Color"
															}), /* @__PURE__ */ jsxs("div", {
																className: "flex gap-3 h-[42px] items-center px-3 bg-background border border-border/50 rounded-xl focus-within:border-blue-500 transition-colors",
																children: [/* @__PURE__ */ jsx("input", {
																	type: "color",
																	className: "h-6 w-6 rounded cursor-pointer border-0 p-0 bg-transparent",
																	value: formData.color || "#3B82F6",
																	onChange: (e) => setFormData({
																		...formData,
																		color: e.target.value
																	})
																}), /* @__PURE__ */ jsx("span", {
																	className: "text-sm font-mono text-foreground font-semibold",
																	children: formData.color || "#3B82F6"
																})]
															})] })
														]
													}),
													/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
														className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
														children: "Short Description"
													}), /* @__PURE__ */ jsx("textarea", {
														rows: 2,
														className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 resize-none",
														value: formData.shortDescription,
														onChange: (e) => setFormData({
															...formData,
															shortDescription: e.target.value
														})
													})] }),
													/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
														className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
														children: "Full Marketing Description"
													}), /* @__PURE__ */ jsx("textarea", {
														rows: 4,
														className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 resize-none",
														value: formData.description,
														onChange: (e) => setFormData({
															...formData,
															description: e.target.value
														})
													})] }),
													/* @__PURE__ */ jsxs("div", {
														className: "grid grid-cols-3 gap-5",
														children: [
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "Level"
															}), /* @__PURE__ */ jsxs("select", {
																className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer",
																value: formData.level,
																onChange: (e) => setFormData({
																	...formData,
																	level: e.target.value
																}),
																children: [
																	/* @__PURE__ */ jsx("option", { children: "Beginner" }),
																	/* @__PURE__ */ jsx("option", { children: "Intermediate" }),
																	/* @__PURE__ */ jsx("option", { children: "Advanced" })
																]
															})] }),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "Language"
															}), /* @__PURE__ */ jsx("input", {
																type: "text",
																className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500",
																value: formData.language,
																onChange: (e) => setFormData({
																	...formData,
																	language: e.target.value
																})
															})] }),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "Est. Duration"
															}), /* @__PURE__ */ jsx("input", {
																type: "text",
																placeholder: "e.g. 10h 30m",
																className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500",
																value: formData.duration,
																onChange: (e) => setFormData({
																	...formData,
																	duration: e.target.value
																})
															})] })
														]
													})
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: clsx(editorTab !== "media" && "hidden"),
											children: [/* @__PURE__ */ jsxs("h3", {
												className: "text-lg font-bold text-foreground mb-4 flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Image, { className: "w-5 h-5 text-indigo-500" }), " Media & Landing Assets"]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-5",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "grid grid-cols-2 gap-5",
														children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
															className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
															children: "Thumbnail URL"
														}), /* @__PURE__ */ jsxs("div", {
															className: "flex gap-2",
															children: [/* @__PURE__ */ jsx("input", {
																type: "text",
																className: "flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500",
																value: formData.thumbnail,
																onChange: (e) => setFormData({
																	...formData,
																	thumbnail: e.target.value
																})
															}), /* @__PURE__ */ jsxs("label", {
																className: "shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold",
																title: "Upload Thumbnail Image",
																children: [/* @__PURE__ */ jsx("svg", {
																	className: "w-4 h-4",
																	fill: "none",
																	stroke: "currentColor",
																	viewBox: "0 0 24 24",
																	children: /* @__PURE__ */ jsx("path", {
																		strokeLinecap: "round",
																		strokeLinejoin: "round",
																		strokeWidth: 2,
																		d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
																	})
																}), /* @__PURE__ */ jsx("input", {
																	type: "file",
																	className: "hidden",
																	accept: "image/*",
																	onChange: (e) => {
																		if (e.target.files && e.target.files[0]) {
																			const reader = new FileReader();
																			reader.onload = (ev) => setFormData({
																				...formData,
																				thumbnail: ev.target.result
																			});
																			reader.readAsDataURL(e.target.files[0]);
																		}
																	}
																})]
															})]
														})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
															className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
															children: "Banner Image URL"
														}), /* @__PURE__ */ jsxs("div", {
															className: "flex gap-2",
															children: [/* @__PURE__ */ jsx("input", {
																type: "text",
																className: "flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500",
																value: formData.bannerImage,
																onChange: (e) => setFormData({
																	...formData,
																	bannerImage: e.target.value
																})
															}), /* @__PURE__ */ jsxs("label", {
																className: "shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold",
																title: "Upload Banner Image",
																children: [/* @__PURE__ */ jsx("svg", {
																	className: "w-4 h-4",
																	fill: "none",
																	stroke: "currentColor",
																	viewBox: "0 0 24 24",
																	children: /* @__PURE__ */ jsx("path", {
																		strokeLinecap: "round",
																		strokeLinejoin: "round",
																		strokeWidth: 2,
																		d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
																	})
																}), /* @__PURE__ */ jsx("input", {
																	type: "file",
																	className: "hidden",
																	accept: "image/*",
																	onChange: (e) => {
																		if (e.target.files && e.target.files[0]) {
																			const reader = new FileReader();
																			reader.onload = (ev) => setFormData({
																				...formData,
																				bannerImage: ev.target.result
																			});
																			reader.readAsDataURL(e.target.files[0]);
																		}
																	}
																})]
															})]
														})] })]
													}),
													/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
														className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
														children: "Preview Video URL (YouTube or Direct)"
													}), /* @__PURE__ */ jsxs("div", {
														className: "relative",
														children: [/* @__PURE__ */ jsx(PlayCircle, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" }), /* @__PURE__ */ jsx("input", {
															type: "text",
															className: "w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500",
															value: formData.youtubeVideoUrl,
															onChange: (e) => setFormData({
																...formData,
																youtubeVideoUrl: e.target.value
															})
														})]
													})] }),
													/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
														className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
														children: "Target Audience"
													}), /* @__PURE__ */ jsx("textarea", {
														rows: 2,
														className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none",
														value: formData.targetAudience,
														onChange: (e) => setFormData({
															...formData,
															targetAudience: e.target.value
														})
													})] }),
													/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
														className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
														children: "Learning Outcomes"
													}), /* @__PURE__ */ jsx("textarea", {
														rows: 3,
														placeholder: "List outcomes separated by newlines...",
														className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none",
														value: formData.learningOutcomes,
														onChange: (e) => setFormData({
															...formData,
															learningOutcomes: e.target.value
														})
													})] }),
													/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
														className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
														children: "Prerequisites"
													}), /* @__PURE__ */ jsx("textarea", {
														rows: 3,
														placeholder: "e.g. Basic programming knowledge, HTML/CSS...",
														className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none",
														value: formData.prerequisites || "",
														onChange: (e) => setFormData({
															...formData,
															prerequisites: e.target.value
														})
													})] }),
													/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
														className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
														children: "Course Highlights"
													}), /* @__PURE__ */ jsx("textarea", {
														rows: 3,
														placeholder: "Key highlights shown on the course landing page...",
														className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none",
														value: formData.courseHighlights || "",
														onChange: (e) => setFormData({
															...formData,
															courseHighlights: e.target.value
														})
													})] }),
													/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
														className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
														children: "Career Opportunities"
													}), /* @__PURE__ */ jsx("textarea", {
														rows: 3,
														placeholder: "What career paths does this course unlock?",
														className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none",
														value: formData.careerOpportunities || "",
														onChange: (e) => setFormData({
															...formData,
															careerOpportunities: e.target.value
														})
													})] })
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: clsx(editorTab !== "seo" && "hidden"),
											children: [/* @__PURE__ */ jsxs("h3", {
												className: "text-lg font-bold text-foreground mb-4 flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Globe, { className: "w-5 h-5 text-emerald-500" }), " Search Engine Optimization"]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-6",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "space-y-4",
														children: [
															/* @__PURE__ */ jsx("h4", {
																className: "text-xs font-bold uppercase tracking-widest text-emerald-500",
																children: "Core SEO"
															}),
															/* @__PURE__ */ jsxs("div", { children: [
																/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Meta Title"
																}),
																/* @__PURE__ */ jsx("input", {
																	type: "text",
																	maxLength: 70,
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500",
																	value: formData.metaTitle || "",
																	onChange: (e) => setFormData({
																		...formData,
																		metaTitle: e.target.value
																	})
																}),
																/* @__PURE__ */ jsxs("p", {
																	className: "text-[10px] text-muted-foreground mt-1 text-right",
																	children: [(formData.metaTitle || "").length, "/70 chars"]
																})
															] }),
															/* @__PURE__ */ jsxs("div", { children: [
																/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Meta Description"
																}),
																/* @__PURE__ */ jsx("textarea", {
																	rows: 2,
																	maxLength: 320,
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500 resize-none",
																	value: formData.metaDescription || "",
																	onChange: (e) => setFormData({
																		...formData,
																		metaDescription: e.target.value
																	})
																}),
																/* @__PURE__ */ jsxs("p", {
																	className: "text-[10px] text-muted-foreground mt-1 text-right",
																	children: [(formData.metaDescription || "").length, "/320 chars"]
																})
															] }),
															/* @__PURE__ */ jsxs("div", {
																className: "grid grid-cols-2 gap-4",
																children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Primary Keyword"
																}), /* @__PURE__ */ jsx("input", {
																	type: "text",
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500",
																	value: formData.primaryKeyword || "",
																	onChange: (e) => setFormData({
																		...formData,
																		primaryKeyword: e.target.value
																	})
																})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Canonical URL"
																}), /* @__PURE__ */ jsx("input", {
																	type: "url",
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500",
																	value: formData.canonicalUrl || "",
																	onChange: (e) => setFormData({
																		...formData,
																		canonicalUrl: e.target.value
																	})
																})] })]
															})
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "border-t border-border/50 pt-5 space-y-4",
														children: [
															/* @__PURE__ */ jsx("h4", {
																className: "text-xs font-bold uppercase tracking-widest text-blue-400",
																children: "Advanced SEO"
															}),
															/* @__PURE__ */ jsxs("div", {
																className: "grid grid-cols-2 gap-4",
																children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Secondary Keywords"
																}), /* @__PURE__ */ jsx("textarea", {
																	rows: 2,
																	placeholder: "Comma separated...",
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500 resize-none",
																	value: formData.secondaryKeywords || "",
																	onChange: (e) => setFormData({
																		...formData,
																		secondaryKeywords: e.target.value
																	})
																})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Focus Keywords"
																}), /* @__PURE__ */ jsx("textarea", {
																	rows: 2,
																	placeholder: "Comma separated...",
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500 resize-none",
																	value: formData.focusKeywords || "",
																	onChange: (e) => setFormData({
																		...formData,
																		focusKeywords: e.target.value
																	})
																})] })]
															}),
															/* @__PURE__ */ jsxs("div", {
																className: "grid grid-cols-3 gap-4",
																children: [
																	/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																		className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																		children: "Author"
																	}), /* @__PURE__ */ jsx("input", {
																		type: "text",
																		className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500",
																		value: formData.author || "",
																		onChange: (e) => setFormData({
																			...formData,
																			author: e.target.value
																		})
																	})] }),
																	/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																		className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																		children: "SEO Category"
																	}), /* @__PURE__ */ jsx("input", {
																		type: "text",
																		className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500",
																		value: formData.seoCategory || "",
																		onChange: (e) => setFormData({
																			...formData,
																			seoCategory: e.target.value
																		})
																	})] }),
																	/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																		className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																		children: "Robots"
																	}), /* @__PURE__ */ jsx("input", {
																		type: "text",
																		className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500",
																		value: formData.robots || "index, follow",
																		onChange: (e) => setFormData({
																			...formData,
																			robots: e.target.value
																		})
																	})] })
																]
															}),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "SEO Tags"
															}), /* @__PURE__ */ jsx("input", {
																type: "text",
																placeholder: "Comma separated tags...",
																className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500",
																value: formData.seoTags || "",
																onChange: (e) => setFormData({
																	...formData,
																	seoTags: e.target.value
																})
															})] })
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "border-t border-border/50 pt-5 space-y-4",
														children: [
															/* @__PURE__ */ jsx("h4", {
																className: "text-xs font-bold uppercase tracking-widest text-indigo-400",
																children: "Open Graph (Facebook / LinkedIn)"
															}),
															/* @__PURE__ */ jsxs("div", {
																className: "grid grid-cols-2 gap-4",
																children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "OG Title"
																}), /* @__PURE__ */ jsx("input", {
																	type: "text",
																	maxLength: 150,
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500",
																	value: formData.ogTitle || "",
																	onChange: (e) => setFormData({
																		...formData,
																		ogTitle: e.target.value
																	})
																})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "OG URL"
																}), /* @__PURE__ */ jsx("input", {
																	type: "url",
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500",
																	value: formData.ogUrl || "",
																	onChange: (e) => setFormData({
																		...formData,
																		ogUrl: e.target.value
																	})
																})] })]
															}),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "OG Description"
															}), /* @__PURE__ */ jsx("textarea", {
																rows: 2,
																maxLength: 500,
																className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none",
																value: formData.ogDescription || "",
																onChange: (e) => setFormData({
																	...formData,
																	ogDescription: e.target.value
																})
															})] }),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "OG Image URL"
															}), /* @__PURE__ */ jsxs("div", {
																className: "flex gap-2",
																children: [/* @__PURE__ */ jsx("input", {
																	type: "text",
																	placeholder: "https://...",
																	className: "flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500",
																	value: formData.ogImage || "",
																	onChange: (e) => setFormData({
																		...formData,
																		ogImage: e.target.value
																	})
																}), /* @__PURE__ */ jsxs("label", {
																	className: "shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer border border-border/50",
																	title: "Upload OG Image",
																	children: [/* @__PURE__ */ jsx("svg", {
																		className: "w-4 h-4",
																		fill: "none",
																		stroke: "currentColor",
																		viewBox: "0 0 24 24",
																		children: /* @__PURE__ */ jsx("path", {
																			strokeLinecap: "round",
																			strokeLinejoin: "round",
																			strokeWidth: 2,
																			d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
																		})
																	}), /* @__PURE__ */ jsx("input", {
																		type: "file",
																		className: "hidden",
																		accept: "image/*",
																		onChange: (e) => {
																			if (e.target.files && e.target.files[0]) (() => {
																				const r = new FileReader();
																				r.onload = (ev) => setFormData({
																					...formData,
																					ogImage: ev.target.result
																				});
																				r.readAsDataURL(e.target.files[0]);
																			})();
																		}
																	})]
																})]
															})] })
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "border-t border-border/50 pt-5 space-y-4",
														children: [
															/* @__PURE__ */ jsx("h4", {
																className: "text-xs font-bold uppercase tracking-widest text-sky-400",
																children: "Twitter / X Card"
															}),
															/* @__PURE__ */ jsxs("div", {
																className: "grid grid-cols-2 gap-4",
																children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Twitter Title"
																}), /* @__PURE__ */ jsx("input", {
																	type: "text",
																	maxLength: 150,
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-sky-500",
																	value: formData.twitterTitle || "",
																	onChange: (e) => setFormData({
																		...formData,
																		twitterTitle: e.target.value
																	})
																})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Twitter Image URL"
																}), /* @__PURE__ */ jsxs("div", {
																	className: "flex gap-2",
																	children: [/* @__PURE__ */ jsx("input", {
																		type: "text",
																		className: "flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-sky-500",
																		value: formData.twitterImage || "",
																		onChange: (e) => setFormData({
																			...formData,
																			twitterImage: e.target.value
																		})
																	}), /* @__PURE__ */ jsxs("label", {
																		className: "shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer border border-border/50",
																		children: [/* @__PURE__ */ jsx("svg", {
																			className: "w-4 h-4",
																			fill: "none",
																			stroke: "currentColor",
																			viewBox: "0 0 24 24",
																			children: /* @__PURE__ */ jsx("path", {
																				strokeLinecap: "round",
																				strokeLinejoin: "round",
																				strokeWidth: 2,
																				d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
																			})
																		}), /* @__PURE__ */ jsx("input", {
																			type: "file",
																			className: "hidden",
																			accept: "image/*",
																			onChange: (e) => {
																				if (e.target.files && e.target.files[0]) (() => {
																					const r = new FileReader();
																					r.onload = (ev) => setFormData({
																						...formData,
																						twitterImage: ev.target.result
																					});
																					r.readAsDataURL(e.target.files[0]);
																				})();
																			}
																		})]
																	})]
																})] })]
															}),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "Twitter Description"
															}), /* @__PURE__ */ jsx("textarea", {
																rows: 2,
																maxLength: 500,
																className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-sky-500 resize-none",
																value: formData.twitterDescription || "",
																onChange: (e) => setFormData({
																	...formData,
																	twitterDescription: e.target.value
																})
															})] })
														]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "border-t border-border/50 pt-5 space-y-4",
														children: [/* @__PURE__ */ jsx("h4", {
															className: "text-xs font-bold uppercase tracking-widest text-purple-400",
															children: "Programmatic SEO"
														}), /* @__PURE__ */ jsxs("div", {
															className: "grid grid-cols-2 gap-4",
															children: [
																/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Search Intent"
																}), /* @__PURE__ */ jsx("textarea", {
																	rows: 2,
																	placeholder: "e.g. informational, navigational...",
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-purple-500 resize-none",
																	value: formData.searchIntent || "",
																	onChange: (e) => setFormData({
																		...formData,
																		searchIntent: e.target.value
																	})
																})] }),
																/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Semantic Keywords"
																}), /* @__PURE__ */ jsx("textarea", {
																	rows: 2,
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-purple-500 resize-none",
																	value: formData.semanticKeywords || "",
																	onChange: (e) => setFormData({
																		...formData,
																		semanticKeywords: e.target.value
																	})
																})] }),
																/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Related Topics"
																}), /* @__PURE__ */ jsx("textarea", {
																	rows: 2,
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-purple-500 resize-none",
																	value: formData.relatedTopics || "",
																	onChange: (e) => setFormData({
																		...formData,
																		relatedTopics: e.target.value
																	})
																})] }),
																/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Search Synonyms"
																}), /* @__PURE__ */ jsx("textarea", {
																	rows: 2,
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-purple-500 resize-none",
																	value: formData.searchSynonyms || "",
																	onChange: (e) => setFormData({
																		...formData,
																		searchSynonyms: e.target.value
																	})
																})] })
															]
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "border-t border-border/50 pt-5 space-y-4",
														children: [
															/* @__PURE__ */ jsx("h4", {
																className: "text-xs font-bold uppercase tracking-widest text-amber-400",
																children: "FAQ Content and Custom Scripts"
															}),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																children: "FAQ Content (JSON or plain text)"
															}), /* @__PURE__ */ jsx("textarea", {
																rows: 3,
																placeholder: "Q: ... A: ...",
																className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-amber-500 resize-none font-mono",
																value: formData.faqContent || "",
																onChange: (e) => setFormData({
																	...formData,
																	faqContent: e.target.value
																})
															})] }),
															/* @__PURE__ */ jsxs("div", {
																className: "grid grid-cols-2 gap-4",
																children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Custom Head Script"
																}), /* @__PURE__ */ jsx("textarea", {
																	rows: 3,
																	placeholder: "script tag here...",
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-amber-500 resize-none font-mono",
																	value: formData.customHeadScript || "",
																	onChange: (e) => setFormData({
																		...formData,
																		customHeadScript: e.target.value
																	})
																})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
																	className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
																	children: "Custom Body Script"
																}), /* @__PURE__ */ jsx("textarea", {
																	rows: 3,
																	placeholder: "script tag here...",
																	className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-amber-500 resize-none font-mono",
																	value: formData.customBodyScript || "",
																	onChange: (e) => setFormData({
																		...formData,
																		customBodyScript: e.target.value
																	})
																})] })]
															})
														]
													})
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: clsx(editorTab !== "advanced" && "hidden"),
											children: [/* @__PURE__ */ jsxs("h3", {
												className: "text-lg font-bold text-foreground mb-4 flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(Settings, { className: "w-5 h-5 text-amber-500" }), " Platform Settings"]
											}), /* @__PURE__ */ jsxs("div", {
												className: "space-y-5",
												children: [
													/* @__PURE__ */ jsxs("div", {
														className: "p-4 border border-border/50 rounded-xl bg-background/50 flex items-center justify-between",
														children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
															className: "text-sm font-bold text-foreground",
															children: "Publish Status"
														}), /* @__PURE__ */ jsx("p", {
															className: "text-xs text-muted-foreground",
															children: "Make this course visible to students in the catalog."
														})] }), /* @__PURE__ */ jsxs("label", {
															className: "relative inline-flex items-center cursor-pointer",
															children: [/* @__PURE__ */ jsx("input", {
																type: "checkbox",
																className: "sr-only peer",
																checked: formData.isPublished,
																onChange: (e) => setFormData({
																	...formData,
																	isPublished: e.target.checked
																})
															}), /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" })]
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "p-4 border border-border/50 rounded-xl bg-background/50 flex items-center justify-between",
														children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
															className: "text-sm font-bold text-foreground",
															children: "Search Engine Indexing"
														}), /* @__PURE__ */ jsx("p", {
															className: "text-xs text-muted-foreground",
															children: "Allow Google/Bing to index this course's public landing page."
														})] }), /* @__PURE__ */ jsxs("label", {
															className: "relative inline-flex items-center cursor-pointer",
															children: [/* @__PURE__ */ jsx("input", {
																type: "checkbox",
																className: "sr-only peer",
																checked: formData.allowIndexing,
																onChange: (e) => setFormData({
																	...formData,
																	allowIndexing: e.target.checked
																})
															}), /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" })]
														})]
													}),
													/* @__PURE__ */ jsxs("div", {
														className: "p-4 border border-border/50 rounded-xl bg-background/50 flex items-center justify-between",
														children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
															className: "text-sm font-bold text-foreground",
															children: "Featured Course"
														}), /* @__PURE__ */ jsx("p", {
															className: "text-xs text-muted-foreground",
															children: "Pin this course to the top of the category browsing page."
														})] }), /* @__PURE__ */ jsxs("label", {
															className: "relative inline-flex items-center cursor-pointer",
															children: [/* @__PURE__ */ jsx("input", {
																type: "checkbox",
																className: "sr-only peer",
																checked: formData.isFeatured,
																onChange: (e) => setFormData({
																	...formData,
																	isFeatured: e.target.checked
																})
															}), /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" })]
														})]
													})
												]
											})]
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-6 py-4 border-t border-border/40 bg-secondary/30 flex items-center justify-end gap-3 shrink-0",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setIsEditorOpen(false),
								className: "px-5 py-2.5 rounded-xl text-sm font-semibold border border-border/50 hover:bg-secondary transition-colors cursor-pointer",
								children: "Discard Draft"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								form: "course-form",
								className: "px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all cursor-pointer",
								children: isEditMode ? "Save Complete Profile" : "Initialize Course Entity"
							})]
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: viewCourse && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm",
				onClick: () => setViewCourse(null),
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
					className: "w-full max-w-4xl max-h-[90vh] glass rounded-2xl overflow-hidden flex flex-col border border-border/40 shadow-2xl",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "relative h-48 shrink-0 overflow-hidden rounded-t-2xl",
							children: [
								viewCourse.bannerImage ? /* @__PURE__ */ jsx("img", {
									src: viewCourse.bannerImage,
									className: "absolute inset-0 w-full h-full object-cover",
									alt: "banner"
								}) : /* @__PURE__ */ jsx("div", {
									className: "absolute inset-0",
									style: { background: `linear-gradient(135deg,${viewCourse.color || "#6C1D5F"}dd,${viewCourse.color || "#6C1D5F"}88)` }
								}),
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute top-4 left-4 flex flex-wrap gap-1.5",
									children: [
										viewCourse.isActive !== false && /* @__PURE__ */ jsx("span", {
											className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white uppercase tracking-wider",
											children: "Active"
										}),
										viewCourse.isPublished && /* @__PURE__ */ jsx("span", {
											className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500 text-white uppercase tracking-wider",
											children: "Published"
										}),
										viewCourse.category && /* @__PURE__ */ jsx("span", {
											className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/40 text-white backdrop-blur-sm uppercase tracking-wider",
											children: viewCourse.category
										}),
										viewCourse.level && /* @__PURE__ */ jsxs("span", {
											className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/40 text-white backdrop-blur-sm uppercase tracking-wider",
											children: ["Level: ", viewCourse.level]
										})
									]
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => setViewCourse(null),
									className: "absolute top-4 right-4 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm grid place-items-center hover:bg-black/60 cursor-pointer z-10",
									children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-white" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute bottom-0 left-0 right-0 p-5 flex items-end gap-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-14 h-14 rounded-2xl shrink-0 overflow-hidden border-2 border-white/25 shadow-xl bg-black/20 backdrop-blur-sm flex items-center justify-center text-3xl",
										children: viewCourse.thumbnail ? /* @__PURE__ */ jsx("img", {
											src: viewCourse.thumbnail,
											className: "w-full h-full object-cover",
											alt: ""
										}) : viewCourse.icon && viewCourse.icon.startsWith("http") ? /* @__PURE__ */ jsx("img", {
											src: viewCourse.icon,
											className: "w-full h-full object-cover",
											alt: ""
										}) : viewCourse.icon || "📚"
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ jsx("h2", {
											className: "text-xl font-bold text-white leading-tight",
											children: viewCourse.title
										}), /* @__PURE__ */ jsxs("p", {
											className: "text-xs text-white/60 mt-0.5",
											children: [
												viewCourse.language || "English",
												" · ",
												viewCourse.duration || "—"
											]
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-secondary/20 shrink-0",
							children: [
								/* @__PURE__ */ jsxs("button", {
									onClick: () => {
										setViewCourse(null);
										handleEdit(viewCourse);
									},
									className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border border-border/50 bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer",
									children: [/* @__PURE__ */ jsx(Edit3, { className: "w-3.5 h-3.5" }), " Edit Course"]
								}),
								/* @__PURE__ */ jsxs("button", {
									onClick: () => navigateToBuilder(viewCourse.id),
									className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer",
									style: { background: "var(--primary,#6C1D5F)" },
									children: [/* @__PURE__ */ jsx(Layers, { className: "w-3.5 h-3.5" }), " Curriculum"]
								}),
								!viewCourse.isPublished && /* @__PURE__ */ jsxs("button", {
									className: "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/40 text-emerald-600 bg-emerald-500/8 hover:bg-emerald-500/15 transition-colors cursor-pointer",
									children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5" }), " Publish"]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "ml-auto flex items-center gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(Users, { className: "w-3.5 h-3.5" }), viewCourse.enrollments || 0]
									}), /* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5" }), viewCourse.totalViews || 0]
									})]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-4 divide-x divide-border/40 border-b border-border/40 shrink-0",
							children: [
								{
									icon: Layers,
									label: "Modules",
									value: viewCourse.modules || 0,
									color: "text-indigo-500"
								},
								{
									icon: BookMarked,
									label: "Submodules",
									value: viewCourse.submodules || 0,
									color: "text-purple-500"
								},
								{
									icon: Video,
									label: "Lessons",
									value: viewCourse.lessons || 0,
									color: "text-pink-500"
								},
								{
									icon: Clock,
									label: "Duration",
									value: viewCourse.duration || "—",
									color: "text-blue-500"
								}
							].map((stat) => /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center justify-center py-3 gap-0.5",
								children: [
									/* @__PURE__ */ jsx(stat.icon, { className: "w-4 h-4 " + stat.color }),
									/* @__PURE__ */ jsx("span", {
										className: "text-lg font-black text-foreground leading-tight",
										children: stat.value
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold",
										children: stat.label
									})
								]
							}, stat.label))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex border-b border-border/40 shrink-0 px-2",
							children: [
								"overview",
								"media",
								"seo"
							].map((tab) => /* @__PURE__ */ jsx("button", {
								onClick: () => setDetailTab(tab),
								className: "px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer capitalize " + (detailTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"),
								children: tab
							}, tab))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex-1 overflow-y-auto",
							children: [
								detailTab === "overview" && /* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-3 gap-0 h-full",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "col-span-2 p-5 space-y-5 border-r border-border/40 overflow-y-auto",
										children: [
											/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
												className: "text-sm font-bold text-foreground mb-2",
												children: "General Information"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-muted-foreground leading-relaxed",
												children: viewCourse.shortDescription || viewCourse.description || /* @__PURE__ */ jsx("span", {
													className: "italic",
													children: "No description added yet."
												})
											})] }),
											/* @__PURE__ */ jsxs("div", {
												className: "border-t border-border/40 pt-4",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2 mb-3",
													children: [/* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-emerald-500" }), /* @__PURE__ */ jsx("h3", {
														className: "text-sm font-bold text-foreground",
														children: "Learning Outcomes"
													})]
												}), viewCourse.learningOutcomes ? /* @__PURE__ */ jsx("div", {
													className: "space-y-2",
													children: viewCourse.learningOutcomes.split("\n").map((item, i) => /* @__PURE__ */ jsxs("div", {
														className: "flex items-start gap-2 text-sm text-foreground",
														children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 mt-0.5 shrink-0" }), /* @__PURE__ */ jsx("span", { children: item.replace(/^[•-]s*/, "") })]
													}, i))
												}) : /* @__PURE__ */ jsx("p", {
													className: "text-sm text-muted-foreground italic",
													children: "Not added yet."
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "border-t border-border/40 pt-4",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2 mb-3",
													children: [/* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-amber-500" }), /* @__PURE__ */ jsx("h3", {
														className: "text-sm font-bold text-foreground",
														children: "Course Highlights"
													})]
												}), viewCourse.courseHighlights ? /* @__PURE__ */ jsx("div", {
													className: "space-y-1.5",
													children: viewCourse.courseHighlights.split("\n").map((item, i) => /* @__PURE__ */ jsxs("div", {
														className: "flex items-start gap-2 text-sm text-foreground",
														children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-amber-500 mt-0.5 shrink-0" }), /* @__PURE__ */ jsx("span", { children: item.replace(/^[✅•-]s*/, "") })]
													}, i))
												}) : /* @__PURE__ */ jsx("p", {
													className: "text-sm text-muted-foreground italic",
													children: "Not added yet."
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "border-t border-border/40 pt-4",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2 mb-3",
													children: [/* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-blue-500" }), /* @__PURE__ */ jsx("h3", {
														className: "text-sm font-bold text-foreground",
														children: "Prerequisites"
													})]
												}), viewCourse.prerequisites ? /* @__PURE__ */ jsx("div", {
													className: "space-y-1.5",
													children: viewCourse.prerequisites.split("\n").map((item, i) => /* @__PURE__ */ jsxs("div", {
														className: "flex items-start gap-2 text-sm text-foreground",
														children: [/* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" }), /* @__PURE__ */ jsx("span", { children: item.replace(/^[•-]s*/, "") })]
													}, i))
												}) : /* @__PURE__ */ jsx("p", {
													className: "text-sm text-muted-foreground italic",
													children: "No prerequisites — open to all levels."
												})]
											}),
											viewCourse.careerOpportunities && /* @__PURE__ */ jsxs("div", {
												className: "border-t border-border/40 pt-4",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2 mb-3",
													children: [/* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-purple-500" }), /* @__PURE__ */ jsx("h3", {
														className: "text-sm font-bold text-foreground",
														children: "Career Opportunities"
													})]
												}), /* @__PURE__ */ jsx("div", {
													className: "flex flex-wrap gap-2",
													children: viewCourse.careerOpportunities.split("\n").map((item, i) => /* @__PURE__ */ jsx("span", {
														className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/20",
														children: item.replace(/^[🚀•-]s*/, "")
													}, i))
												})]
											})
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "p-4 space-y-4 overflow-y-auto",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "rounded-xl border border-border/50 overflow-hidden",
												children: [/* @__PURE__ */ jsx("div", {
													className: "px-4 py-3 border-b border-border/40 bg-secondary/30 flex items-center justify-between",
													children: /* @__PURE__ */ jsx("span", {
														className: "text-xs font-bold text-foreground uppercase tracking-wider",
														children: "Course Status"
													})
												}), /* @__PURE__ */ jsx("div", {
													className: "divide-y divide-border/30",
													children: [
														{
															label: "Enrollments",
															value: (viewCourse.enrollments || 0).toLocaleString(),
															icon: Users,
															color: "text-blue-500"
														},
														{
															label: "Avg. Rating",
															value: viewCourse.rating ? viewCourse.rating + " / 5" : "N/A",
															icon: Star,
															color: "text-amber-500"
														},
														{
															label: "Profile Views",
															value: (viewCourse.totalViews || 0).toLocaleString(),
															icon: Eye,
															color: "text-indigo-500"
														}
													].map((stat) => /* @__PURE__ */ jsxs("div", {
														className: "flex items-center justify-between px-4 py-3",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "flex items-center gap-2 text-xs text-muted-foreground",
															children: [/* @__PURE__ */ jsx(stat.icon, { className: "w-3.5 h-3.5 " + stat.color }), stat.label]
														}), /* @__PURE__ */ jsx("span", {
															className: "text-sm font-bold text-foreground",
															children: stat.value
														})]
													}, stat.label))
												})]
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "rounded-xl border border-border/50 overflow-hidden",
												children: [/* @__PURE__ */ jsx("div", {
													className: "px-4 py-3 border-b border-border/40 bg-secondary/30",
													children: /* @__PURE__ */ jsx("span", {
														className: "text-xs font-bold text-foreground uppercase tracking-wider",
														children: "Instructor"
													})
												}), /* @__PURE__ */ jsxs("div", {
													className: "p-4",
													children: [/* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-3 mb-3",
														children: [/* @__PURE__ */ jsx("div", {
															className: "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0",
															style: { background: "var(--primary,#6C1D5F)" },
															children: (viewCourse.author || "A").charAt(0).toUpperCase()
														}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
															className: "text-sm font-bold text-foreground",
															children: viewCourse.author || "Author TBD"
														}), /* @__PURE__ */ jsx("p", {
															className: "text-xs text-muted-foreground",
															children: viewCourse.seoCategory || "Instructor"
														})] })]
													}), /* @__PURE__ */ jsxs("div", {
														className: "grid grid-cols-2 gap-2 text-xs",
														children: [/* @__PURE__ */ jsxs("div", {
															className: "text-center p-2 rounded-lg bg-secondary/50",
															children: [/* @__PURE__ */ jsx("p", {
																className: "font-bold text-foreground",
																children: viewCourse.modules || 0
															}), /* @__PURE__ */ jsx("p", {
																className: "text-muted-foreground",
																children: "Modules"
															})]
														}), /* @__PURE__ */ jsxs("div", {
															className: "text-center p-2 rounded-lg bg-secondary/50",
															children: [/* @__PURE__ */ jsx("p", {
																className: "font-bold text-foreground",
																children: viewCourse.rating || "—"
															}), /* @__PURE__ */ jsx("p", {
																className: "text-muted-foreground",
																children: "Rating"
															})]
														})]
													})]
												})]
											}),
											viewCourse.targetAudience && /* @__PURE__ */ jsxs("div", {
												className: "rounded-xl border border-border/50 overflow-hidden",
												children: [/* @__PURE__ */ jsx("div", {
													className: "px-4 py-3 border-b border-border/40 bg-secondary/30",
													children: /* @__PURE__ */ jsx("span", {
														className: "text-xs font-bold text-foreground uppercase tracking-wider",
														children: "Target Audience"
													})
												}), /* @__PURE__ */ jsx("p", {
													className: "p-4 text-xs text-muted-foreground leading-relaxed",
													children: viewCourse.targetAudience
												})]
											})
										]
									})]
								}),
								detailTab === "media" && /* @__PURE__ */ jsxs("div", {
									className: "p-6 space-y-4",
									children: [
										viewCourse.bannerImage && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2",
											children: "Banner Image"
										}), /* @__PURE__ */ jsx("img", {
											src: viewCourse.bannerImage,
											className: "w-full h-40 object-cover rounded-xl border border-border/40",
											alt: "banner"
										})] }),
										viewCourse.thumbnail && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2",
											children: "Thumbnail"
										}), /* @__PURE__ */ jsx("img", {
											src: viewCourse.thumbnail,
											className: "w-40 h-40 object-cover rounded-xl border border-border/40",
											alt: "thumbnail"
										})] }),
										viewCourse.youtubeVideoUrl && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2",
											children: "Preview Video"
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border/40 text-sm text-foreground",
											children: [/* @__PURE__ */ jsx(PlayCircle, { className: "w-4 h-4 text-red-500 shrink-0" }), viewCourse.youtubeVideoUrl]
										})] }),
										!viewCourse.bannerImage && !viewCourse.thumbnail && !viewCourse.youtubeVideoUrl && /* @__PURE__ */ jsx("p", {
											className: "text-sm text-muted-foreground italic text-center py-10",
											children: "No media uploaded yet. Edit the course to add media."
										})
									]
								}),
								detailTab === "seo" && /* @__PURE__ */ jsxs("div", {
									className: "p-6 space-y-3",
									children: [[
										{
											label: "Meta Title",
											value: viewCourse.metaTitle
										},
										{
											label: "Meta Description",
											value: viewCourse.metaDescription
										},
										{
											label: "Primary Keyword",
											value: viewCourse.primaryKeyword
										},
										{
											label: "Canonical URL",
											value: viewCourse.canonicalUrl
										},
										{
											label: "Robots",
											value: viewCourse.robots
										}
									].map((f) => f.value && /* @__PURE__ */ jsxs("div", {
										className: "rounded-xl border border-border/50 overflow-hidden",
										children: [/* @__PURE__ */ jsx("div", {
											className: "px-4 py-2 bg-secondary/30 border-b border-border/40",
											children: /* @__PURE__ */ jsx("span", {
												className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
												children: f.label
											})
										}), /* @__PURE__ */ jsx("p", {
											className: "px-4 py-2.5 text-sm text-foreground",
											children: f.value
										})]
									}, f.label)), !viewCourse.metaTitle && !viewCourse.metaDescription && /* @__PURE__ */ jsx("p", {
										className: "text-sm text-muted-foreground italic text-center py-10",
										children: "No SEO data added yet. Edit the course → SEO tab."
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-5 py-3.5 border-t border-border/40 bg-secondary/10 flex items-center justify-between shrink-0",
							children: [/* @__PURE__ */ jsx("button", {
								onClick: () => setViewCourse(null),
								className: "text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
								children: "Close"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setViewCourse(null),
								className: "px-6 py-2 rounded-xl text-sm font-bold text-white transition-all cursor-pointer shadow-lg",
								style: {
									background: viewCourse.color || "#6C1D5F",
									boxShadow: "0 4px 14px " + (viewCourse.color || "#6C1D5F") + "55"
								},
								children: "Enroll Now"
							})]
						})
					]
				})
			}) })
		]
	});
}
//#endregion
//#region src/admin/pages/Categories/index.jsx
var initialCategories = [
	{
		id: "cat-1",
		name: "Programming & Software Development",
		icon: "💻",
		color: "#3B82F6",
		description: "Core programming languages and engineering principles.",
		status: "Active",
		count: 12
	},
	{
		id: "cat-2",
		name: "Cloud & DevOps Architecture",
		icon: "☁️",
		color: "#10B981",
		description: "Cloud infrastructure, CI/CD, and site reliability.",
		status: "Active",
		count: 8
	},
	{
		id: "cat-3",
		name: "Data Science & Machine Learning",
		icon: "🧠",
		color: "#8B5CF6",
		description: "AI, big data, analytics, and ML models.",
		status: "Active",
		count: 5
	},
	{
		id: "cat-4",
		name: "Cybersecurity & Compliance",
		icon: "🛡️",
		color: "#EF4444",
		description: "Network security, cryptography, and risk management.",
		status: "Inactive",
		count: 0
	}
];
function Categories() {
	const { addToast } = useAppStore();
	const [categories, setCategories] = useState(() => {
		const saved = localStorage.getItem("lms_categories_v1");
		if (saved) try {
			return JSON.parse(saved);
		} catch (e) {}
		return initialCategories;
	});
	useEffect(() => {
		localStorage.setItem("lms_categories_v1", JSON.stringify(categories));
	}, [categories]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [activeTab, setActiveTab] = useState("All");
	const [search, setSearch] = useState("");
	const [formData, setFormData] = useState({
		id: "",
		name: "",
		icon: "",
		color: "#3B82F6",
		description: "",
		status: "Active"
	});
	const filteredCategories = categories.filter((cat) => {
		const matchesTab = activeTab === "All" ? true : cat.status === activeTab;
		const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
		return matchesTab && matchesSearch;
	});
	const handleEdit = (category) => {
		setFormData(category);
		setIsEditMode(true);
		setIsModalOpen(true);
	};
	const handleCreateNew = () => {
		setFormData({
			id: "",
			name: "",
			icon: "📚",
			color: "#3B82F6",
			description: "",
			status: "Active"
		});
		setIsEditMode(false);
		setIsModalOpen(true);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isEditMode) {
			setCategories(categories.map((c) => c.id === formData.id ? {
				...formData,
				count: c.count
			} : c));
			addToast(`Category "${formData.name}" updated successfully.`, "success");
		} else {
			const newCategory = {
				...formData,
				id: `cat-${Math.floor(Math.random() * 9e3) + 1e3}`,
				count: 0
			};
			setCategories([newCategory, ...categories]);
			addToast(`Category "${newCategory.name}" created successfully.`, "success");
		}
		setIsModalOpen(false);
	};
	return /* @__PURE__ */ jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .4 },
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-8 border border-white/10 shadow-2xl",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute top-0 right-0 p-8 opacity-10 pointer-events-none",
					children: /* @__PURE__ */ jsx(FolderCode, { className: "w-48 h-48 text-indigo-400" })
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 mb-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold uppercase tracking-widest text-indigo-400",
									children: "Global Settings"
								}),
								/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500/50" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold uppercase tracking-widest text-white/50",
									children: "Curriculum"
								})
							]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "text-3xl font-bold text-white mb-2 font-display",
							children: "Category Management"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-indigo-200/80 max-w-xl text-sm",
							children: "Configure top-level learning domains and course groupings. These categories dictate the primary taxonomy of the entire platform catalog."
						})
					] }), /* @__PURE__ */ jsxs("button", {
						onClick: handleCreateNew,
						className: "shrink-0 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25 cursor-pointer",
						children: [/* @__PURE__ */ jsx(IconAdd, { className: "w-5 h-5" }), " Create Category"]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-3 glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between border border-border/40 shadow-sm",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex bg-secondary/50 p-1 rounded-xl w-full sm:w-auto",
						children: [
							"All",
							"Active",
							"Inactive"
						].map((tab) => /* @__PURE__ */ jsx("button", {
							onClick: () => setActiveTab(tab),
							className: clsx("px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer flex-1 sm:flex-none", activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
							children: tab
						}, tab))
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative w-full sm:max-w-xs",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							placeholder: "Search domains...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors"
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-5 border border-border/40 shadow-sm flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center",
						children: /* @__PURE__ */ jsx(Cpu, { className: "w-6 h-6 text-indigo-500" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
						children: "Total Domains"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-2xl font-black text-foreground",
						children: categories.length
					})] })]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ jsx(AnimatePresence, { children: filteredCategories.map((cat, index) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .95
					},
					transition: {
						duration: .2,
						delay: index * .05
					},
					className: "glass border border-border/40 rounded-2xl overflow-hidden hover:border-border/80 transition-all group",
					children: [/* @__PURE__ */ jsx("div", {
						className: "h-2 w-full",
						style: { backgroundColor: cat.color }
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between mb-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm",
									style: {
										backgroundColor: `${cat.color}15`,
										border: `1px solid ${cat.color}30`
									},
									children: cat.icon
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsxs("span", {
										className: clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", cat.status === "Active" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-red-500/10 text-red-600 border border-red-500/20"),
										children: [cat.status === "Active" ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(ShieldAlert, { className: "w-3 h-3" }), cat.status]
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => handleEdit(cat),
										className: "h-8 w-8 rounded-lg hover:bg-secondary grid place-items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer opacity-0 group-hover:opacity-100",
										children: /* @__PURE__ */ jsx(Edit3, { className: "w-4 h-4" })
									})]
								})]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-lg font-bold text-foreground mb-1 line-clamp-1",
								children: cat.name
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground font-mono mb-3",
								children: cat.id
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground line-clamp-2 h-10 mb-5",
								children: cat.description
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between pt-4 border-t border-border/40",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Courses Attached"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm font-bold text-foreground bg-secondary/80 px-2.5 py-0.5 rounded-md",
									children: cat.count
								})]
							})
						]
					})]
				}, cat.id)) }), filteredCategories.length === 0 && /* @__PURE__ */ jsxs("div", {
					className: "col-span-full py-12 flex flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4",
							children: /* @__PURE__ */ jsx(Search, { className: "w-8 h-8 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-bold text-foreground",
							children: "No Categories Found"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground max-w-sm mt-1",
							children: "Try adjusting your search or filters to find what you're looking for."
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(Modal, {
				isOpen: isModalOpen,
				onClose: () => setIsModalOpen(false),
				title: isEditMode ? "Edit Domain Category" : "Create New Category",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "mt-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
								children: "Category Name"
							}), /* @__PURE__ */ jsx("input", {
								required: true,
								type: "text",
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors",
								placeholder: "e.g. Cloud & DevOps",
								value: formData.name,
								onChange: (e) => setFormData({
									...formData,
									name: e.target.value
								})
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-5",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
									children: "Icon (Emoji or URL)"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										className: "flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors",
										placeholder: "e.g. ☁️ or https://...",
										value: formData.icon,
										onChange: (e) => setFormData({
											...formData,
											icon: e.target.value
										})
									}), /* @__PURE__ */ jsxs("label", {
										className: "shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold",
										title: "Upload Image",
										children: [/* @__PURE__ */ jsx("svg", {
											className: "w-4 h-4",
											fill: "none",
											stroke: "currentColor",
											viewBox: "0 0 24 24",
											children: /* @__PURE__ */ jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
											})
										}), /* @__PURE__ */ jsx("input", {
											type: "file",
											className: "hidden",
											accept: "image/*",
											onChange: (e) => {
												if (e.target.files && e.target.files[0]) {
													const reader = new FileReader();
													reader.onload = (ev) => setFormData({
														...formData,
														icon: ev.target.result
													});
													reader.readAsDataURL(e.target.files[0]);
												}
											}
										})]
									})]
								})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
									children: "Theme Color"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-3 h-[42px] items-center px-3 bg-background border border-border/50 rounded-xl focus-within:border-indigo-500 transition-colors",
									children: [/* @__PURE__ */ jsx("input", {
										required: true,
										type: "color",
										className: "h-6 w-6 rounded cursor-pointer border-0 p-0 bg-transparent",
										value: formData.color,
										onChange: (e) => setFormData({
											...formData,
											color: e.target.value
										})
									}), /* @__PURE__ */ jsx("span", {
										className: "text-sm font-mono text-foreground font-semibold",
										children: formData.color
									})]
								})] })]
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
								children: "Description"
							}), /* @__PURE__ */ jsx("textarea", {
								required: true,
								rows: 3,
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors resize-none",
								placeholder: "Brief description of the learning domain...",
								value: formData.description,
								onChange: (e) => setFormData({
									...formData,
									description: e.target.value
								})
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5",
								children: "Status"
							}), /* @__PURE__ */ jsxs("select", {
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors cursor-pointer appearance-none",
								value: formData.status,
								onChange: (e) => setFormData({
									...formData,
									status: e.target.value
								}),
								children: [/* @__PURE__ */ jsx("option", {
									value: "Active",
									children: "🟢 Active (Visible in Catalog)"
								}), /* @__PURE__ */ jsx("option", {
									value: "Inactive",
									children: "🔴 Inactive (Hidden)"
								})]
							})] })
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-3 mt-8",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border/50 hover:bg-secondary transition-colors cursor-pointer",
							onClick: () => setIsModalOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition-colors cursor-pointer shadow-lg shadow-indigo-500/20",
							children: isEditMode ? "Save Changes" : "Create Category"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/admin/pages/GenericPage.jsx
function GenericPage({ title, subtitle }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: "page-header",
		children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
			className: "page-title",
			children: title
		}), subtitle && /* @__PURE__ */ jsx("div", {
			className: "page-subtitle",
			children: subtitle
		})] })
	}), /* @__PURE__ */ jsxs("div", {
		className: "card",
		style: {
			padding: "60px 20px",
			textAlign: "center"
		},
		children: [
			/* @__PURE__ */ jsxs("svg", {
				width: "48",
				height: "48",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "var(--border)",
				strokeWidth: "1.5",
				style: { margin: "0 auto 16px" },
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "3",
						y: "3",
						width: "18",
						height: "18",
						rx: "2",
						ry: "2"
					}),
					/* @__PURE__ */ jsx("line", {
						x1: "3",
						y1: "9",
						x2: "21",
						y2: "9"
					}),
					/* @__PURE__ */ jsx("line", {
						x1: "9",
						y1: "21",
						x2: "9",
						y2: "9"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				style: {
					fontSize: "18px",
					fontWeight: 600,
					color: "var(--black)",
					marginBottom: "8px"
				},
				children: "Module Under Construction"
			}),
			/* @__PURE__ */ jsx("div", {
				style: {
					fontSize: "14px",
					color: "var(--dark-gray)"
				},
				children: "This module is currently being built and will be available in the next release."
			})
		]
	})] });
}
//#endregion
//#region src/routes/admin/index.jsx?tsr-split=component
function AdminViewContainer() {
	const { activeSidebarItem } = useAppStore();
	switch (activeSidebarItem) {
		case "Dashboard": return /* @__PURE__ */ jsx(Dashboard, {});
		case "Organizations":
		case "Universities":
		case "Colleges":
		case "Companies": return /* @__PURE__ */ jsx(Organizations, {});
		case "Users": return /* @__PURE__ */ jsx(Users$1, {});
		case "Categories": return /* @__PURE__ */ jsx(Categories, {});
		case "Courses":
		case "Course List": return /* @__PURE__ */ jsx(Courses, {});
		default: return /* @__PURE__ */ jsx(GenericPage, { title: activeSidebarItem });
	}
}
//#endregion
export { AdminViewContainer as component };
