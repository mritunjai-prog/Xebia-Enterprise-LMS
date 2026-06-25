import { t as cn } from "./utils-_lkLOWLq.js";
import { n as CardContent, t as Card } from "./card-DtCIqy0P.js";
import { c as useStudents, f as PageHeader, l as useTrainers, u as useUniversities } from "./manager-data-B87DN6xf.js";
import { t as Skeleton } from "./skeleton-BSi1XvLP.js";
import { t as Button } from "./button-DQGSKKzh.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BN2i4N-k.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DYANspD-.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-KUoqVIMu.js";
import { t as Progress } from "./progress-DkDHPJkx.js";
import { t as Input } from "./input-C2txYJdq.js";
import { t as Separator } from "./separator-p56coiDe.js";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table$1 } from "./table-grI7xhag.js";
import * as React from "react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Search, UserPlus, X } from "lucide-react";
import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
//#region src/components/manager/users/user-filters.js
function UserFilters({ onSearchChange, onStatusChange, onRoleChange, activeTab }) {
	return jsxs("div", {
		className: "flex flex-col gap-3 sm:flex-row sm:items-center",
		children: [jsxs("div", {
			className: "relative flex-1",
			children: [jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A5A5A]" }), jsx(Input, {
				placeholder: `Search ${activeTab || "users"}...`,
				className: "h-10 border-[#EDEDED] bg-white pl-10 text-sm shadow-sm focus-visible:ring-[#6C1D5F]/30",
				onChange: (e) => onSearchChange?.(e.target.value)
			})]
		}), jsxs(Select, {
			onValueChange: (value) => onStatusChange?.(value),
			defaultValue: "all",
			children: [jsx(SelectTrigger, {
				className: "h-10 w-full border-[#EDEDED] bg-white shadow-sm sm:w-[150px]",
				children: jsx(SelectValue, { placeholder: "Status" })
			}), jsxs(SelectContent, { children: [
				jsx(SelectItem, {
					value: "all",
					children: "All Status"
				}),
				jsx(SelectItem, {
					value: "active",
					children: "Active"
				}),
				jsx(SelectItem, {
					value: "inactive",
					children: "Inactive"
				}),
				jsx(SelectItem, {
					value: "pending",
					children: "Pending"
				}),
				jsx(SelectItem, {
					value: "at-risk",
					children: "At Risk"
				})
			] })]
		})]
	});
}
//#endregion
//#region src/components/ui/dialog.js
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => jsxs(DialogPortal, { children: [jsx(DialogOverlay, {}), jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [jsx(X, { className: "h-4 w-4" }), jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/manager/users/user-details-dialog.js
var statusColors$1 = {
	active: "bg-[#00A99D]/10 text-[#00A99D] border-[#00A99D]/20",
	inactive: "bg-gray-100 text-gray-500 border-gray-200",
	pending: "bg-[#FF6A00]/10 text-[#FF6A00] border-[#FF6A00]/20",
	"at-risk": "bg-red-50 text-red-500 border-red-200"
};
function UserDetailsDialog({ user, open, onOpenChange, type }) {
	if (!user) return null;
	return jsx(Dialog, {
		open,
		onOpenChange,
		children: jsxs(DialogContent, {
			className: "max-w-md border-0 bg-white shadow-xl",
			children: [jsx(DialogHeader, { children: jsx(DialogTitle, {
				className: "text-lg font-semibold text-[#000000]",
				children: "User Details"
			}) }), jsxs("div", {
				className: "space-y-6",
				children: [
					jsxs("div", {
						className: "flex items-center gap-4",
						children: [jsx(Avatar, {
							className: "h-14 w-14 border-2 border-[#6C1D5F]/10",
							children: jsx(AvatarFallback, {
								className: "bg-[#6C1D5F]/8 text-base font-semibold text-[#6C1D5F]",
								children: user.avatar || user.logo || user.name?.slice(0, 2)
							})
						}), jsxs("div", { children: [
							jsx("h3", {
								className: "font-semibold text-[#000000]",
								children: user.name
							}),
							user.email && jsx("p", {
								className: "text-sm text-[#5A5A5A]",
								children: user.email
							}),
							user.location && jsx("p", {
								className: "text-sm text-[#5A5A5A]",
								children: user.location
							}),
							jsx(Badge, {
								variant: "outline",
								className: `mt-1 text-[10px] font-medium uppercase ${statusColors$1[user.status] || ""}`,
								children: user.status
							})
						] })]
					}),
					jsx(Separator, {}),
					jsx("div", {
						className: "grid grid-cols-2 gap-4",
						children: (() => {
							const details = [];
							if (type === "universities") details.push({
								label: "Students",
								value: user.students?.toLocaleString()
							}, {
								label: "Courses",
								value: user.courses
							});
							else if (type === "trainers") details.push({
								label: "Specialization",
								value: user.specialization,
								span: true
							}, {
								label: "Rating",
								value: `${user.rating} / 5.0`
							}, {
								label: "Courses",
								value: user.courses
							}, {
								label: "Students",
								value: user.students?.toLocaleString()
							});
							else details.push({
								label: "University",
								value: user.university,
								span: true
							}, {
								label: "Courses Enrolled",
								value: user.coursesEnrolled
							}, {
								label: "Status",
								value: user.status
							});
							return details.map((d) => jsxs("div", {
								className: d.span ? "col-span-2" : "",
								children: [jsx("p", {
									className: "text-xs font-medium uppercase text-[#5A5A5A]",
									children: d.label
								}), jsx("p", {
									className: "mt-0.5 text-sm font-semibold text-[#000000]",
									children: d.value
								})]
							}, d.label));
						})()
					}),
					{ ...type === "students" && user.progress != null ? jsxs("div", { children: [jsxs("div", {
						className: "flex items-center justify-between text-sm",
						children: [jsx("span", {
							className: "font-medium text-[#5A5A5A]",
							children: "Overall Progress"
						}), jsx("span", {
							className: "font-semibold text-[#000000]",
							children: `${user.progress}%`
						})]
					}), jsx(Progress, {
						value: user.progress,
						className: "mt-2 h-2 bg-[#EDEDED]"
					})] }) : jsx("span", {}) }
				]
			})]
		})
	});
}
//#endregion
//#region src/components/manager/users/user-table.js
var statusColors = {
	active: "bg-[#00A99D]/10 text-[#00A99D] border-[#00A99D]/20",
	inactive: "bg-gray-100 text-gray-500 border-gray-200",
	pending: "bg-[#FF6A00]/10 text-[#FF6A00] border-[#FF6A00]/20",
	"at-risk": "bg-red-50 text-red-500 border-red-200"
};
function UserTable() {
	const [activeTab, setActiveTab] = useState("universities");
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [selectedUser, setSelectedUser] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const { data: universities, isLoading: uniLoading } = useUniversities();
	const { data: trainersData, isLoading: trainerLoading } = useTrainers();
	const { data: studentsData, isLoading: studentLoading } = useStudents();
	const filterData = (data) => {
		if (!data) return [];
		let filtered = data;
		if (search) {
			const q = search.toLowerCase();
			filtered = filtered.filter((item) => item.name?.toLowerCase().includes(q) || item.email?.toLowerCase().includes(q) || item.location?.toLowerCase().includes(q) || item.university?.toLowerCase().includes(q) || item.specialization?.toLowerCase().includes(q));
		}
		if (statusFilter !== "all") filtered = filtered.filter((item) => item.status === statusFilter);
		return filtered;
	};
	const handleRowClick = (user) => {
		setSelectedUser(user);
		setDialogOpen(true);
	};
	return jsxs(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .4 },
		children: [jsxs(Tabs, {
			value: activeTab,
			onValueChange: setActiveTab,
			className: "space-y-5",
			children: [
				jsxs(TabsList, {
					className: "h-11 bg-[#EDEDED] p-1",
					children: [
						jsx(TabsTrigger, {
							value: "universities",
							className: "text-sm data-[state=active]:bg-white data-[state=active]:text-[#6C1D5F] data-[state=active]:shadow-sm",
							children: "Universities"
						}),
						jsx(TabsTrigger, {
							value: "trainers",
							className: "text-sm data-[state=active]:bg-white data-[state=active]:text-[#6C1D5F] data-[state=active]:shadow-sm",
							children: "Trainers"
						}),
						jsx(TabsTrigger, {
							value: "students",
							className: "text-sm data-[state=active]:bg-white data-[state=active]:text-[#6C1D5F] data-[state=active]:shadow-sm",
							children: "Students"
						})
					]
				}),
				jsx(UserFilters, {
					activeTab,
					onSearchChange: setSearch,
					onStatusChange: setStatusFilter
				}),
				jsx(TabsContent, {
					value: "universities",
					children: jsx(Card, {
						className: "border-0 bg-white shadow-sm",
						children: jsx(CardContent, {
							className: "p-0",
							children: uniLoading ? jsx(TableSkeleton, { cols: 5 }) : jsx(Table$1, { children: [jsx(TableHeader, { children: jsxs(TableRow, {
								className: "border-[#EDEDED] hover:bg-transparent",
								children: [
									jsx(TableHead, {
										className: "pl-6 font-semibold text-[#5A5A5A]",
										children: "University"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Location"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Students"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Courses"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Status"
									})
								]
							}) }), jsx(TableBody, { children: filterData(universities).map((uni) => jsxs(TableRow, {
								className: "cursor-pointer border-[#EDEDED] transition-colors hover:bg-[#EDEDED]/40",
								onClick: () => handleRowClick(uni),
								children: [
									jsx(TableCell, {
										className: "pl-6",
										children: jsxs("div", {
											className: "flex items-center gap-3",
											children: [jsx(Avatar, {
												className: "h-9 w-9 border border-[#EDEDED]",
												children: jsx(AvatarFallback, {
													className: "bg-[#6C1D5F]/8 text-xs font-semibold text-[#6C1D5F]",
													children: uni.logo
												})
											}), jsx("span", {
												className: "font-medium text-[#000000]",
												children: uni.name
											})]
										})
									}),
									jsx(TableCell, {
										className: "text-[#5A5A5A]",
										children: uni.location
									}),
									jsx(TableCell, {
										className: "font-medium",
										children: uni.students.toLocaleString()
									}),
									jsx(TableCell, {
										className: "font-medium",
										children: uni.courses
									}),
									jsx(TableCell, { children: jsx(Badge, {
										variant: "outline",
										className: `text-[10px] font-medium uppercase ${statusColors[uni.status] || ""}`,
										children: uni.status
									}) })
								]
							}, uni.id)) })] })
						})
					})
				}),
				jsx(TabsContent, {
					value: "trainers",
					children: jsx(Card, {
						className: "border-0 bg-white shadow-sm",
						children: jsx(CardContent, {
							className: "p-0",
							children: trainerLoading ? jsx(TableSkeleton, { cols: 6 }) : jsx(Table$1, { children: [jsx(TableHeader, { children: jsxs(TableRow, {
								className: "border-[#EDEDED] hover:bg-transparent",
								children: [
									jsx(TableHead, {
										className: "pl-6 font-semibold text-[#5A5A5A]",
										children: "Trainer"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Specialization"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Rating"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Courses"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Students"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Status"
									})
								]
							}) }), jsx(TableBody, { children: filterData(trainersData).map((trainer) => jsxs(TableRow, {
								className: "cursor-pointer border-[#EDEDED] transition-colors hover:bg-[#EDEDED]/40",
								onClick: () => handleRowClick(trainer),
								children: [
									jsx(TableCell, {
										className: "pl-6",
										children: jsxs("div", {
											className: "flex items-center gap-3",
											children: [jsx(Avatar, {
												className: "h-9 w-9 border border-[#EDEDED]",
												children: jsx(AvatarFallback, {
													className: "bg-[#8A177D]/8 text-xs font-semibold text-[#8A177D]",
													children: trainer.avatar
												})
											}), jsxs("div", { children: [jsx("p", {
												className: "font-medium text-[#000000]",
												children: trainer.name
											}), jsx("p", {
												className: "text-xs text-[#5A5A5A]",
												children: trainer.email
											})] })]
										})
									}),
									jsx(TableCell, {
										className: "text-[#5A5A5A]",
										children: trainer.specialization
									}),
									jsx(TableCell, { children: jsxs("div", {
										className: "flex items-center gap-1",
										children: [jsx("span", {
											className: "text-sm text-[#FF6A00]",
											children: "★"
										}), jsx("span", {
											className: "font-medium",
											children: trainer.rating
										})]
									}) }),
									jsx(TableCell, {
										className: "font-medium",
										children: trainer.courses
									}),
									jsx(TableCell, {
										className: "font-medium",
										children: trainer.students.toLocaleString()
									}),
									jsx(TableCell, { children: jsx(Badge, {
										variant: "outline",
										className: `text-[10px] font-medium uppercase ${statusColors[trainer.status] || ""}`,
										children: trainer.status
									}) })
								]
							}, trainer.id)) })] })
						})
					})
				}),
				jsx(TabsContent, {
					value: "students",
					children: jsx(Card, {
						className: "border-0 bg-white shadow-sm",
						children: jsx(CardContent, {
							className: "p-0",
							children: studentLoading ? jsx(TableSkeleton, { cols: 5 }) : jsx(Table$1, { children: [jsx(TableHeader, { children: jsxs(TableRow, {
								className: "border-[#EDEDED] hover:bg-transparent",
								children: [
									jsx(TableHead, {
										className: "pl-6 font-semibold text-[#5A5A5A]",
										children: "Student"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "University"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Progress"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Courses"
									}),
									jsx(TableHead, {
										className: "font-semibold text-[#5A5A5A]",
										children: "Status"
									})
								]
							}) }), jsx(TableBody, { children: filterData(studentsData).map((student) => jsxs(TableRow, {
								className: "cursor-pointer border-[#EDEDED] transition-colors hover:bg-[#EDEDED]/40",
								onClick: () => handleRowClick(student),
								children: [
									jsx(TableCell, {
										className: "pl-6",
										children: jsxs("div", {
											className: "flex items-center gap-3",
											children: [jsx(Avatar, {
												className: "h-9 w-9 border border-[#EDEDED]",
												children: jsx(AvatarFallback, {
													className: "bg-[#00A99D]/8 text-xs font-semibold text-[#00A99D]",
													children: student.avatar
												})
											}), jsxs("div", { children: [jsx("p", {
												className: "font-medium text-[#000000]",
												children: student.name
											}), jsx("p", {
												className: "text-xs text-[#5A5A5A]",
												children: student.email
											})] })]
										})
									}),
									jsx(TableCell, {
										className: "text-[#5A5A5A] text-sm",
										children: student.university
									}),
									jsx(TableCell, { children: jsxs("div", {
										className: "flex items-center gap-3",
										children: [jsx(Progress, {
											value: student.progress,
											className: "h-2 w-20 bg-[#EDEDED]"
										}), jsxs("span", {
											className: "text-sm font-medium text-[#000000]",
											children: [student.progress, "%"]
										})]
									}) }),
									jsx(TableCell, {
										className: "font-medium",
										children: student.coursesEnrolled
									}),
									jsx(TableCell, { children: jsx(Badge, {
										variant: "outline",
										className: `text-[10px] font-medium uppercase ${statusColors[student.status] || ""}`,
										children: student.status
									}) })
								]
							}, student.id)) })] })
						})
					})
				})
			]
		}), jsx(UserDetailsDialog, {
			user: selectedUser,
			open: dialogOpen,
			onOpenChange: setDialogOpen,
			type: activeTab
		})]
	});
}
function TableSkeleton({ cols = 5 }) {
	return jsx("div", {
		className: "p-4 space-y-3",
		children: Array.from({ length: 5 }).map((_, i) => jsx("div", {
			className: "flex gap-4",
			children: Array.from({ length: cols }).map((_, j) => jsx(Skeleton, { className: "h-8 flex-1 rounded" }, j))
		}, i))
	});
}
//#endregion
//#region src/routes/manager/users.js?tsr-split=component
function UsersPage() {
	return jsxs("div", {
		className: "space-y-6",
		children: [jsx(PageHeader, {
			title: "User Management",
			description: "Manage universities, trainers, and students across the platform.",
			children: jsxs(Button, {
				className: "bg-[#FF6A00] text-white shadow-sm hover:bg-[#FF6A00]/90",
				children: [jsx(UserPlus, { className: "mr-2 h-4 w-4" }), "Add User"]
			})
		}), jsx(UserTable, {})]
	});
}
//#endregion
export { UsersPage as component };
