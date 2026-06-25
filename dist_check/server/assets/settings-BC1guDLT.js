import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, Check, CheckCircle, Key, Lock, Mail, Shield, ShieldAlert, Smartphone, User } from "lucide-react";
import "framer-motion";
import { toast } from "sonner";
//#region src/routes/organiser/settings/index.jsx?tsr-split=component
var allowedPermissions = [
	{
		module: "Dashboard Overview",
		desc: "View metrics, live slots calendar, and activities."
	},
	{
		module: "Course Authoring",
		desc: "Construct modules, edit syllabus content, draft outlines."
	},
	{
		module: "Content Library",
		desc: "Upload and attach PDFs, PPTs, videos, comparison sheets."
	},
	{
		module: "Batches & Scheduling",
		desc: "Launch student cohorts and configure weekly slots."
	},
	{
		module: "Student Directory",
		desc: "Monitor student metrics and bulk-import CSV profiles."
	},
	{
		module: "Assessments & Marks",
		desc: "Build quizzes, evaluate scripts, and grade rubrics."
	},
	{
		module: "Video Lessons & Stats",
		desc: "Inspect video dropoffs and insert timeline checkpoint quizzes."
	},
	{
		module: "Engagement Forums",
		desc: "Respond to comments, pin notices, review survey ratings."
	},
	{
		module: "Reports Compiler",
		desc: "Customize data queries and download PDF/CSV/Excel logs."
	}
];
var restrictedPermissions = [
	{
		module: "Role & Permission Rules",
		desc: "Adjust group permissions and configure RBAC policies."
	},
	{
		module: "Tenant Administration",
		desc: "Register universities, corporate clients, configure SSO domains."
	},
	{
		module: "Approval Workflows",
		desc: "Review course content publications, override grades."
	},
	{
		module: "Audit Log Management",
		desc: "Track system access activity logs, database operations."
	},
	{
		module: "System Configurations",
		desc: "Manage server clusters, gateway integrations, and API limits."
	}
];
function ProfileSettingsView() {
	const [name, setName] = useState("Vikram Dev");
	const [email, setEmail] = useState("vikram.dev@xebia.com");
	const [bio, setBio] = useState("Enterprise Trainer & Solutions Architect. Specializing in Docker, Spring Boot, and React Core Architecture.");
	const [avatar, setAvatar] = useState("VD");
	const [ssoConnected, setSsoConnected] = useState(true);
	const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
	const [notifyEmail, setNotifyEmail] = useState(true);
	const [submitLoading, setSubmitLoading] = useState(false);
	const handleSaveProfile = (e) => {
		e.preventDefault();
		setSubmitLoading(true);
		setTimeout(() => {
			setSubmitLoading(false);
			setAvatar(name.split(" ").map((n) => n[0]).join(""));
			toast.success("Profile preferences committed successfully!");
		}, 1200);
	};
	const handleToggleSso = () => {
		setSsoConnected(!ssoConnected);
		toast.info(`SSO Connection ${!ssoConnected ? "linked" : "detached"}`);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ jsx(ModuleHeroBanner, {
			breadcrumb: "Dashboard / Settings",
			title: "Profile & Scope Settings",
			subtitle: "Modify credentials details, configure notification targets, and inspect security parameters."
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 space-y-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-5 border-border/40",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "text-base font-bold text-foreground flex items-center gap-1.5 mb-4",
						children: [/* @__PURE__ */ jsx(User, { className: "w-4.5 h-4.5 text-primary" }), " Profile Credentials"]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleSaveProfile,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 border-b border-border/30 pb-4 mb-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative h-14 w-14 shrink-0",
									children: [/* @__PURE__ */ jsx("img", {
										src: "/avatar.png",
										alt: "Profile avatar",
										className: "h-14 w-14 rounded-full object-cover border-2 border-primary/30 shadow"
									}), /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-card" })]
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "font-bold text-sm text-foreground",
									children: "Avatar Thumbnail"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] text-muted-foreground",
									children: "Male professional avatar."
								})] })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
									children: "Full Name"
								}), /* @__PURE__ */ jsx("input", {
									required: true,
									type: "text",
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs focus:border-primary font-bold text-foreground"
								})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
									children: "Email Scope"
								}), /* @__PURE__ */ jsx("input", {
									required: true,
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs focus:border-primary text-foreground"
								})] })]
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
								children: "Trainer biography"
							}), /* @__PURE__ */ jsx("textarea", {
								rows: 3,
								value: bio,
								onChange: (e) => setBio(e.target.value),
								className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs focus:border-primary text-foreground font-medium"
							})] }),
							/* @__PURE__ */ jsxs("button", {
								type: "submit",
								disabled: submitLoading,
								className: "btn-hero px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer",
								children: [
									/* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }),
									" ",
									submitLoading ? "Updating profile..." : "Save Preferences"
								]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-5 border-border/40 grid grid-cols-1 md:grid-cols-2 gap-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("h3", {
								className: "text-sm font-bold text-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx(Key, { className: "w-4 h-4 text-accent" }), " Identity SSO Sync"]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[11px] text-muted-foreground leading-relaxed",
								children: "Connect identity services using Xebia NextAuth / Active Directory."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between p-3 rounded-xl bg-card border border-border/40",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("span", { className: `h-2.5 w-2.5 rounded-full ${ssoConnected ? "bg-emerald-500" : "bg-red-500"}` }), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-bold text-foreground",
										children: "SSO Connection Status"
									})]
								}), /* @__PURE__ */ jsx("button", {
									onClick: handleToggleSso,
									className: `text-[10px] font-bold px-2.5 py-1 rounded-lg cursor-pointer ${ssoConnected ? "bg-secondary text-muted-foreground" : "bg-primary text-primary-foreground"}`,
									children: ssoConnected ? "Disconnect" : "Connect SSO"
								})]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("h3", {
								className: "text-sm font-bold text-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx(Bell, { className: "w-4 h-4 text-purple-500" }), " Notifications Routing"]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[11px] text-muted-foreground leading-relaxed",
								children: "Choose automated channels for student submissions & course reports."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("label", {
									className: "flex items-center justify-between p-2.5 border rounded-xl bg-card border-border/40 cursor-pointer text-xs font-bold text-foreground",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 text-blue-500" }), " Email Summaries"]
									}), /* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: notifyEmail,
										onChange: () => setNotifyEmail(!notifyEmail),
										className: "accent-primary h-4 w-4"
									})]
								}), /* @__PURE__ */ jsxs("label", {
									className: "flex items-center justify-between p-2.5 border rounded-xl bg-card border-border/40 cursor-pointer text-xs font-bold text-foreground",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(Smartphone, { className: "w-3.5 h-3.5 text-emerald-500" }), " WhatsApp Alerts"]
									}), /* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: notifyWhatsApp,
										onChange: () => setNotifyWhatsApp(!notifyWhatsApp),
										className: "accent-primary h-4 w-4"
									})]
								})]
							})
						]
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-5 border-border/40 space-y-4",
				children: [
					/* @__PURE__ */ jsxs("h2", {
						className: "text-base font-bold text-foreground flex items-center gap-1.5",
						children: [/* @__PURE__ */ jsx(Shield, { className: "w-4.5 h-4.5 text-primary" }), " Permitted Scope"]
					}),
					/* @__PURE__ */ jsx("hr", { className: "border-border/30" }),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-[10px] font-bold text-emerald-400 uppercase tracking-wider block",
							children: "Allowed Privileges"
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-1.5 max-h-[220px] overflow-y-auto pr-1",
							children: allowedPermissions.map((p, idx) => /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg",
								children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
									className: "text-xs font-bold text-foreground",
									children: p.module
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[9px] text-muted-foreground mt-0.5 leading-snug",
									children: p.desc
								})] })]
							}, idx))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "space-y-2 pt-2 border-t border-border/30",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider block",
								children: "Restricted Sectors"
							}), /* @__PURE__ */ jsx(ShieldAlert, { className: "h-3 w-3 text-muted-foreground/60" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "space-y-1.5 max-h-[160px] overflow-y-auto pr-1",
							children: restrictedPermissions.map((p, idx) => /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2 p-2 bg-secondary opacity-65 border border-border/30 rounded-lg select-none",
								children: [/* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
									className: "text-xs font-semibold text-muted-foreground",
									children: p.module
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[9px] text-muted-foreground mt-0.5 leading-snug",
									children: p.desc
								})] })]
							}, idx))
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { ProfileSettingsView as component };
