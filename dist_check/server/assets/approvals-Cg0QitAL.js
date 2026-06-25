import { n as CardContent, t as Card } from "./card-DtCIqy0P.js";
import { d as useUpdateApproval, f as PageHeader, t as useApprovals } from "./manager-data-B87DN6xf.js";
import { t as Skeleton } from "./skeleton-BSi1XvLP.js";
import { t as Button } from "./button-DQGSKKzh.js";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BN2i4N-k.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-DYANspD-.js";
import { t as Badge } from "./badge-Dm7BeJpE.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Check, CheckCircle2, Clock, ListFilter, X, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/components/manager/approvals/approval-card.js
var statusConfig = {
	pending: {
		color: "bg-[#FF6A00]/10 text-[#FF6A00] border-[#FF6A00]/20",
		icon: Clock,
		label: "Pending"
	},
	approved: {
		color: "bg-[#00A99D]/10 text-[#00A99D] border-[#00A99D]/20",
		icon: Check,
		label: "Approved"
	},
	rejected: {
		color: "bg-red-50 text-red-500 border-red-200",
		icon: X,
		label: "Rejected"
	}
};
var priorityConfig = {
	high: "bg-red-50 text-red-600 border-red-200",
	medium: "bg-[#FF6A00]/10 text-[#FF6A00] border-[#FF6A00]/20",
	low: "bg-blue-50 text-blue-600 border-blue-200"
};
function ApprovalCard({ approval, onApprove, onReject, index = 0 }) {
	const status = statusConfig[approval.status] || statusConfig.pending;
	const isPending = approval.status === "pending";
	const dateStr = new Date(approval.date).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
	return jsx(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			x: -20,
			height: 0
		},
		transition: {
			duration: .3,
			delay: index * .05
		},
		layout: true,
		children: jsx(Card, {
			className: `
          border-0 bg-white shadow-sm transition-all duration-200
          hover:shadow-md ${isPending ? "border-l-[3px] border-l-[#FF6A00]" : ""}
        `,
			children: jsx(CardContent, {
				className: "p-5",
				children: jsxs("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
					children: [jsxs("div", {
						className: "flex items-start gap-4 flex-1",
						children: [jsx(Avatar, {
							className: "h-10 w-10 shrink-0 border border-[#EDEDED]",
							children: jsx(AvatarFallback, {
								className: "bg-[#6C1D5F]/8 text-xs font-semibold text-[#6C1D5F]",
								children: approval.requesterAvatar
							})
						}), jsxs("div", {
							className: "min-w-0 flex-1",
							children: [
								jsxs("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										jsx("h4", {
											className: "text-sm font-semibold text-[#000000]",
											children: approval.type
										}),
										jsx(Badge, {
											variant: "outline",
											className: `text-[10px] font-medium ${priorityConfig[approval.priority] || ""}`,
											children: approval.priority
										}),
										jsx(Badge, {
											variant: "outline",
											className: `text-[10px] font-medium uppercase ${status.color}`,
											children: status.label
										})
									]
								}),
								jsx("p", {
									className: "mt-1 text-sm text-[#5A5A5A]",
									children: approval.description
								}),
								jsxs("p", {
									className: "mt-1 text-xs text-[#5A5A5A]/70",
									children: [
										"Requested by ",
										jsx("span", {
											className: "font-medium text-[#5A5A5A]",
											children: approval.requester
										}),
										" · ",
										dateStr
									]
								})
							]
						})]
					}), isPending && jsxs("div", {
						className: "flex shrink-0 gap-2",
						children: [jsxs(Button, {
							size: "sm",
							className: "bg-[#00A99D] text-white hover:bg-[#00A99D]/90 shadow-sm",
							onClick: () => onApprove?.(approval.id),
							children: [jsx(Check, { className: "mr-1.5 h-3.5 w-3.5" }), "Approve"]
						}), jsxs(Button, {
							size: "sm",
							variant: "outline",
							className: "border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600",
							onClick: () => onReject?.(approval.id),
							children: [jsx(X, { className: "mr-1.5 h-3.5 w-3.5" }), "Reject"]
						})]
					})]
				})
			})
		})
	});
}
//#endregion
//#region src/components/manager/approvals/approval-list.js
function ApprovalList() {
	const [filter, setFilter] = useState("all");
	const { data: approvals, isLoading } = useApprovals();
	const updateApproval = useUpdateApproval();
	const handleApprove = (id) => {
		updateApproval.mutate({
			id,
			status: "approved"
		}, { onSuccess: () => toast.success("Request approved successfully") });
	};
	const handleReject = (id) => {
		updateApproval.mutate({
			id,
			status: "rejected"
		}, { onSuccess: () => toast.success("Request rejected") });
	};
	const filteredApprovals = approvals ? filter === "all" ? approvals : approvals.filter((a) => a.status === filter) : [];
	const counts = approvals ? {
		all: approvals.length,
		pending: approvals.filter((a) => a.status === "pending").length,
		approved: approvals.filter((a) => a.status === "approved").length,
		rejected: approvals.filter((a) => a.status === "rejected").length
	} : {
		all: 0,
		pending: 0,
		approved: 0,
		rejected: 0
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
		className: "space-y-6",
		children: [jsx("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				{
					label: "Total Requests",
					value: counts.all,
					icon: ListFilter,
					color: "text-[#6C1D5F]",
					bg: "bg-[#6C1D5F]/8"
				},
				{
					label: "Pending",
					value: counts.pending,
					icon: Clock,
					color: "text-[#FF6A00]",
					bg: "bg-[#FF6A00]/8"
				},
				{
					label: "Approved",
					value: counts.approved,
					icon: CheckCircle2,
					color: "text-[#00A99D]",
					bg: "bg-[#00A99D]/8"
				},
				{
					label: "Rejected",
					value: counts.rejected,
					icon: XCircle,
					color: "text-red-500",
					bg: "bg-red-50"
				}
			].map((stat) => jsx(Card, {
				className: "border-0 bg-white shadow-sm",
				children: jsxs(CardContent, {
					className: "flex items-center gap-3 p-4",
					children: [jsx("div", {
						className: `flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`,
						children: jsx(stat.icon, { className: `h-5 w-5 ${stat.color}` })
					}), jsxs("div", { children: [jsx("p", {
						className: "text-2xl font-bold text-[#000000]",
						children: isLoading ? "—" : stat.value
					}), jsx("p", {
						className: "text-xs text-[#5A5A5A]",
						children: stat.label
					})] })]
				})
			}, stat.label))
		}), jsxs(Tabs, {
			value: filter,
			onValueChange: setFilter,
			children: [jsxs(TabsList, {
				className: "h-11 bg-[#EDEDED] p-1",
				children: [
					jsxs(TabsTrigger, {
						value: "all",
						className: "text-sm data-[state=active]:bg-white data-[state=active]:text-[#6C1D5F] data-[state=active]:shadow-sm",
						children: [
							"All (",
							counts.all,
							")"
						]
					}),
					jsxs(TabsTrigger, {
						value: "pending",
						className: "text-sm data-[state=active]:bg-white data-[state=active]:text-[#FF6A00] data-[state=active]:shadow-sm",
						children: [
							"Pending (",
							counts.pending,
							")"
						]
					}),
					jsxs(TabsTrigger, {
						value: "approved",
						className: "text-sm data-[state=active]:bg-white data-[state=active]:text-[#00A99D] data-[state=active]:shadow-sm",
						children: [
							"Approved (",
							counts.approved,
							")"
						]
					}),
					jsxs(TabsTrigger, {
						value: "rejected",
						className: "text-sm data-[state=active]:bg-white data-[state=active]:text-red-500 data-[state=active]:shadow-sm",
						children: [
							"Rejected (",
							counts.rejected,
							")"
						]
					})
				]
			}), jsx("div", {
				className: "mt-4",
				children: isLoading ? jsx("div", {
					className: "space-y-3",
					children: Array.from({ length: 4 }).map((_, i) => jsx(Skeleton, { className: "h-28 w-full rounded-xl" }, i))
				}) : jsx(AnimatePresence, {
					mode: "popLayout",
					children: filteredApprovals.length === 0 ? jsx(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "rounded-xl bg-white p-12 text-center shadow-sm",
						children: jsxs("div", { children: [jsx(CheckCircle2, { className: "mx-auto h-12 w-12 text-[#00A99D]/40" }), jsx("p", {
							className: "mt-3 text-sm font-medium text-[#5A5A5A]",
							children: "No approvals in this category"
						})] })
					}) : jsx("div", {
						className: "space-y-3",
						children: filteredApprovals.map((approval, index) => jsx(ApprovalCard, {
							approval,
							onApprove: handleApprove,
							onReject: handleReject,
							index
						}, approval.id))
					})
				})
			})]
		})]
	});
}
//#endregion
//#region src/routes/manager/approvals.js?tsr-split=component
function ApprovalsPage() {
	return jsxs("div", {
		className: "space-y-6",
		children: [jsx(PageHeader, {
			title: "Approvals",
			description: "Review course creation, user registrations, and content updates."
		}), jsx(ApprovalList, {})]
	});
}
//#endregion
export { ApprovalsPage as component };
