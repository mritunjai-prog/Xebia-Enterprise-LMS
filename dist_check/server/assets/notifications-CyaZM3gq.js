import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/trainer/notifications/index.jsx?tsr-split=component
function NotificationsView() {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ jsx(ModuleHeroBanner, {
			breadcrumb: "Dashboard / Notifications",
			title: "Announcements & Alerts",
			subtitle: "Broadcast messages to your cohorts and track read receipts.",
			actions: /* @__PURE__ */ jsxs("button", {
				onClick: () => toast.success("Drafting announcement..."),
				className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
				children: [/* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }), " New Announcement"]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-4",
			children: [{
				title: "Mid-Term Exam Schedule Updated",
				batch: "All Active Batches",
				date: "June 24, 2026",
				type: "Alert"
			}, {
				title: "Welcome to React Advanced Cohort",
				batch: "React Advanced Cohort",
				date: "June 20, 2026",
				type: "Welcome"
			}].map((notif, idx) => /* @__PURE__ */ jsxs("div", {
				className: "glass p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border/40 hover:border-primary/30 transition-colors",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "mt-1 bg-secondary p-2 rounded-full text-primary",
						children: /* @__PURE__ */ jsx(Bell, { className: "w-5 h-5" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "font-bold text-foreground text-base",
						children: notif.title
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-sm text-muted-foreground mt-0.5",
						children: ["Target: ", notif.batch]
					})] })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-end gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: notif.date
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1",
						children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }), " Delivered"]
					})]
				})]
			}, idx))
		})]
	});
}
//#endregion
export { NotificationsView as component };
