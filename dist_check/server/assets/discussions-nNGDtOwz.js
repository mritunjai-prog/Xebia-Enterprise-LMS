import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { MessageSquare, Users } from "lucide-react";
import { toast } from "sonner";
//#region src/routes/trainer/discussions/index.jsx?tsr-split=component
function DiscussionsView() {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ jsx(ModuleHeroBanner, {
			breadcrumb: "Dashboard / Discussions",
			title: "Course Discussions",
			subtitle: "Manage forums, answer student queries, and monitor active threads.",
			actions: /* @__PURE__ */ jsxs("button", {
				onClick: () => toast.info("Opening New Thread Dialog..."),
				className: "btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer",
				children: [/* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4" }), " Start New Thread"]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border border-border/40",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-muted-foreground",
					children: /* @__PURE__ */ jsx(Users, { className: "w-8 h-8" })
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-xl font-bold text-foreground",
					children: "No active discussions"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground max-w-md mt-2 text-sm leading-relaxed",
					children: "Your batches haven't started any discussion threads yet. Create an introductory thread to get the conversation going!"
				})
			]
		})]
	});
}
//#endregion
export { DiscussionsView as component };
