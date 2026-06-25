import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Bell, Clock, Mail, MessageSquare, Search, Send, Smartphone } from "lucide-react";
import "framer-motion";
import { toast } from "sonner";
//#region src/routes/organiser/notifications/index.jsx?tsr-split=component
var initialLogs = [
	{
		id: "l1",
		subject: "Syllabus Outline Update: Docker Practice",
		batch: "Spring Boot Jan 2026",
		channels: ["email", "whatsapp"],
		date: "2026-06-22",
		sent: 45,
		delivery: 100,
		open: 92
	},
	{
		id: "l2",
		subject: "Rescheduled: Advanced React Hooks Session",
		batch: "React Advanced Cohort",
		channels: ["email", "sms"],
		date: "2026-06-20",
		sent: 32,
		delivery: 98,
		open: 88
	},
	{
		id: "l3",
		subject: "Final Practical Examination Details Released",
		batch: "Spring Boot Jan 2026",
		channels: [
			"email",
			"whatsapp",
			"sms"
		],
		date: "2026-06-15",
		sent: 45,
		delivery: 100,
		open: 96
	}
];
function NotificationsView() {
	const [logs, setLogs] = useState(initialLogs);
	const [channels, setChannels] = useState({
		email: true,
		whatsapp: true,
		sms: false
	});
	const [selectedAudience, setSelectedAudience] = useState("Spring Boot Jan 2026");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [sending, setSending] = useState(false);
	const [search, setSearch] = useState("");
	const handleSendNotification = (e) => {
		e.preventDefault();
		if (!subject || !message) return;
		setSending(true);
		const activeChannels = Object.keys(channels).filter((k) => channels[k]);
		if (activeChannels.length === 0) {
			toast.error("Please select at least one delivery channel.");
			setSending(false);
			return;
		}
		setTimeout(() => {
			setLogs([{
				id: `l-${Date.now()}`,
				subject,
				batch: selectedAudience,
				channels: activeChannels,
				date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
				sent: selectedAudience.includes("Spring") ? 45 : 32,
				delivery: 100,
				open: 0
			}, ...logs]);
			setSending(false);
			setSubject("");
			setMessage("");
			toast.success("Broadcast dispatched across selected provider gateways!");
		}, 1500);
	};
	const toggleChannel = (channel) => {
		setChannels({
			...channels,
			[channel]: !channels[channel]
		});
	};
	const filteredLogs = logs.filter((l) => l.subject.toLowerCase().includes(search.toLowerCase()) || l.batch.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ jsx(ModuleHeroBanner, {
			breadcrumb: "Dashboard / Notifications",
			title: "Broadcast Notifications & Logs",
			subtitle: "Compose multi-channel alerts and review delivery, click, and read logs."
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-1 glass rounded-2xl p-5 border-border/40 flex flex-col justify-between",
				children: [/* @__PURE__ */ jsxs("form", {
					onSubmit: handleSendNotification,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsxs("h2", {
							className: "text-base font-bold text-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(Bell, { className: "w-4 h-4 text-primary" }), " Alert Composer"]
						}),
						/* @__PURE__ */ jsx("hr", { className: "border-border/30" }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
							children: "Select Cohort / Batch"
						}), /* @__PURE__ */ jsxs("select", {
							value: selectedAudience,
							onChange: (e) => setSelectedAudience(e.target.value),
							className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs cursor-pointer focus:border-primary",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "Spring Boot Jan 2026",
									children: "Spring Boot Jan 2026 Batch"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "React Advanced Cohort",
									children: "React Advanced Cohort Batch"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "All active students",
									children: "All Active Batches"
								})
							]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
							children: "Alert Subject"
						}), /* @__PURE__ */ jsx("input", {
							required: true,
							type: "text",
							placeholder: "e.g. Schedule Change: Room 4",
							value: subject,
							onChange: (e) => setSubject(e.target.value),
							className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs focus:border-primary"
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
							children: "Channels Gateway"
						}), /* @__PURE__ */ jsx("div", {
							className: "flex gap-2",
							children: [
								{
									id: "email",
									label: "Email",
									icon: Mail,
									color: "text-blue-500 bg-blue-500/10 border-blue-500/30"
								},
								{
									id: "whatsapp",
									label: "WhatsApp",
									icon: Smartphone,
									color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
								},
								{
									id: "sms",
									label: "SMS",
									icon: MessageSquare,
									color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30"
								}
							].map((item) => {
								const active = channels[item.id];
								return /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => toggleChannel(item.id),
									className: `flex-1 flex items-center justify-center gap-1 py-1.5 border rounded-lg text-[10px] font-bold cursor-pointer transition-all ${active ? `${item.color} ring-1 ring-primary` : "bg-card text-muted-foreground border-border/40 hover:bg-secondary/40"}`,
									children: [/* @__PURE__ */ jsx(item.icon, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ jsx("span", { children: item.label })]
								}, item.id);
							})
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
							children: "Message Body"
						}), /* @__PURE__ */ jsx("textarea", {
							required: true,
							rows: 4,
							placeholder: "Enter alert copy... Support Markdown & template keywords like {{student_name}}.",
							value: message,
							onChange: (e) => setMessage(e.target.value),
							className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs focus:border-primary"
						})] }),
						/* @__PURE__ */ jsxs("button", {
							type: "submit",
							disabled: sending,
							className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer mt-2",
							children: [
								/* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
								" ",
								sending ? "Broadcasting..." : "Dispatch Broadcast"
							]
						})
					]
				}), /* @__PURE__ */ jsx("span", {
					className: "text-[9px] text-muted-foreground text-center block mt-3 font-semibold",
					children: "Messages are automatically routed via SMTP/WhatsApp APIs."
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "lg:col-span-2 glass rounded-2xl p-5 border-border/40 flex flex-col justify-between h-[500px]",
				children: /* @__PURE__ */ jsxs("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/30 pb-3",
						children: [/* @__PURE__ */ jsxs("h2", {
							className: "text-base font-bold text-foreground flex items-center gap-1.5",
							children: [/* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-accent" }), " Transmission History Logs"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative w-full sm:max-w-xs",
							children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
								type: "text",
								placeholder: "Search logs...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "w-full pl-8 pr-3 py-1 bg-background border border-border/40 rounded-lg text-xs outline-none focus:border-primary"
							})]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "overflow-y-auto max-h-[360px] pr-1",
						children: /* @__PURE__ */ jsxs("table", {
							className: "w-full text-xs text-left",
							children: [/* @__PURE__ */ jsx("thead", {
								className: "bg-secondary/40 text-muted-foreground border-b border-border/30 text-[10px] font-bold uppercase tracking-wider",
								children: /* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("th", {
										className: "px-3 py-2",
										children: "Subject / Batch"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-3 py-2 text-center",
										children: "Gateways"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-3 py-2 text-center",
										children: "Delivered"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-3 py-2 text-center",
										children: "Open Rate"
									}),
									/* @__PURE__ */ jsx("th", {
										className: "px-3 py-2 text-right",
										children: "Status"
									})
								] })
							}), /* @__PURE__ */ jsx("tbody", {
								className: "divide-y divide-border/30 font-medium",
								children: filteredLogs.map((log) => /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-secondary/15 transition-all",
									children: [
										/* @__PURE__ */ jsxs("td", {
											className: "px-3 py-3",
											children: [/* @__PURE__ */ jsx("h4", {
												className: "font-bold text-foreground truncate max-w-xs",
												children: log.subject
											}), /* @__PURE__ */ jsxs("span", {
												className: "text-[10px] text-muted-foreground",
												children: [
													log.batch,
													" • ",
													log.date
												]
											})]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-3 py-3 text-center",
											children: /* @__PURE__ */ jsx("div", {
												className: "flex gap-1 justify-center",
												children: log.channels.map((chan) => /* @__PURE__ */ jsxs("span", {
													className: "p-1 rounded bg-secondary text-muted-foreground",
													title: chan,
													children: [
														chan === "email" && /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 text-blue-500" }),
														chan === "whatsapp" && /* @__PURE__ */ jsx(Smartphone, { className: "w-3.5 h-3.5 text-emerald-500" }),
														chan === "sms" && /* @__PURE__ */ jsx(MessageSquare, { className: "w-3.5 h-3.5 text-cyan-500" })
													]
												}, chan))
											})
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "px-3 py-3 text-center font-bold",
											children: [
												log.sent,
												" / ",
												log.sent
											]
										}),
										/* @__PURE__ */ jsxs("td", {
											className: "px-3 py-3 text-center font-bold text-primary",
											children: [log.open, "%"]
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-3 py-3 text-right",
											children: /* @__PURE__ */ jsx("span", {
												className: "text-[9px] uppercase font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded",
												children: "Success"
											})
										})
									]
								}, log.id))
							})]
						})
					})]
				})
			})]
		})]
	});
}
//#endregion
export { NotificationsView as component };
