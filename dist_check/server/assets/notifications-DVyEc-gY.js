import { n as CardContent, t as Card } from "./card-DtCIqy0P.js";
import { o as notifications } from "./dummy-data-CD87CTHp.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Award, Bell, BookOpen, ClipboardCheck, MessageSquare } from "lucide-react";
//#region src/routes/student/notifications.jsx?tsr-split=component
function NotificationsPage() {
	const getIcon = (type) => {
		switch (type) {
			case "course": return /* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5 text-blue-500" });
			case "assessment": return /* @__PURE__ */ jsx(ClipboardCheck, { className: "w-5 h-5 text-orange-500" });
			case "comment": return /* @__PURE__ */ jsx(MessageSquare, { className: "w-5 h-5 text-purple-500" });
			case "result": return /* @__PURE__ */ jsx(Award, { className: "w-5 h-5 text-green-500" });
			default: return /* @__PURE__ */ jsx(Bell, { className: "w-5 h-5 text-primary" });
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex items-center justify-between",
			children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Notifications"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground mt-1",
				children: "Stay updated with your courses and assessments."
			})] })
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-4",
			children: notifications.map((notification) => /* @__PURE__ */ jsx(Card, {
				className: `glass overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${!notification.read ? "border-primary/50 bg-primary/5" : ""}`,
				children: /* @__PURE__ */ jsxs(CardContent, {
					className: "p-4 flex items-start gap-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: `p-3 rounded-full shrink-0 ${!notification.read ? "bg-background shadow-sm" : "bg-muted/50"}`,
							children: getIcon(notification.type)
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-2 mb-1",
								children: [/* @__PURE__ */ jsx("h3", {
									className: `font-semibold text-base truncate ${!notification.read ? "text-foreground" : "text-muted-foreground"}`,
									children: notification.title
								}), /* @__PURE__ */ jsx("span", {
									className: "text-xs text-muted-foreground whitespace-nowrap shrink-0 pt-1",
									children: notification.timestamp
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: `text-sm ${!notification.read ? "text-foreground/90" : "text-muted-foreground"}`,
								children: notification.message
							})]
						}),
						!notification.read && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary shrink-0 mt-2" })
					]
				})
			}, notification.id))
		})]
	});
}
//#endregion
export { NotificationsPage as component };
