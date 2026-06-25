import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Award, Pin, Search, Send, Star, ThumbsUp } from "lucide-react";
import "framer-motion";
import { toast } from "sonner";
//#region src/routes/organiser/discussions/index.jsx?tsr-split=component
var initialThreads = [{
	id: "d1",
	student: "Alice Johnson",
	course: "Advanced React & Next.js",
	module: "Hooks Overview",
	message: "Can you explain how useEffect cleanup works? Specifically when dealing with WebSocket connections inside dynamic routes. I keep seeing memory leaks.",
	time: "2 hours ago",
	unread: true,
	replies: [{
		id: "r1",
		user: "Vikram Dev (TA)",
		message: "Check if you are closing the connection inside the return statement of useEffect. Example: return () => socket.close();",
		time: "1 hour ago"
	}]
}, {
	id: "d2",
	student: "Bob Smith",
	course: "Microservices with Spring Boot",
	module: "Kafka Event Broker",
	message: "Is the dead-letter queue auto-configured or do we have to manually set the listener container factories for retries? The logs show message dropoffs.",
	time: "1 day ago",
	unread: false,
	replies: []
}];
var mockSurveys = [{
	id: "s1",
	course: "Advanced React & Next.js",
	rating: 4.8,
	count: 48,
	recommend: 96,
	comment: "Excellent practical hands-on labs. The dashboard code examples were very complete!"
}, {
	id: "s2",
	course: "Microservices with Spring Boot",
	rating: 4.5,
	count: 32,
	recommend: 90,
	comment: "Great content on Kafka, but would love more visual deployment architecture guides."
}];
function DiscussionsView() {
	const [threads, setThreads] = useState(initialThreads);
	const [selectedThread, setSelectedThread] = useState(initialThreads[0]);
	const [search, setSearch] = useState("");
	const [discussionsTab, setDiscussionsTab] = useState("forum");
	const [newReply, setNewReply] = useState("");
	const handlePostReply = (e) => {
		e.preventDefault();
		if (!newReply.trim()) return;
		const newReplyObj = {
			id: `r-${Date.now()}`,
			user: "You (Organiser)",
			message: newReply,
			time: "Just now"
		};
		const updatedThread = {
			...selectedThread,
			unread: false,
			replies: [...selectedThread.replies, newReplyObj]
		};
		setSelectedThread(updatedThread);
		setThreads(threads.map((t) => t.id === selectedThread.id ? updatedThread : t));
		setNewReply("");
		toast.success("Response posted to thread.");
	};
	const handleResolveThread = (id) => {
		toast.success("Thread marked as resolved and closed.");
		setThreads(threads.map((t) => t.id === id ? {
			...t,
			unread: false
		} : t));
	};
	const handlePinAnnouncement = () => {
		toast.success("Broadcasting announcement to all batch feeds!");
	};
	const filteredThreads = threads.filter((t) => t.student.toLowerCase().includes(search.toLowerCase()) || t.course.toLowerCase().includes(search.toLowerCase()) || t.message.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [/* @__PURE__ */ jsx(ModuleHeroBanner, {
			breadcrumb: "Dashboard / Engagement",
			title: "Learner Engagement & Forums",
			subtitle: "Moderate student threads, broadcast pinned announcements, and analyze course survey feedback.",
			actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
				className: "flex border border-border/40 rounded-xl p-0.5 bg-secondary/35",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => setDiscussionsTab("forum"),
					className: `px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${discussionsTab === "forum" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: "Q&A Forums"
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => setDiscussionsTab("surveys"),
					className: `px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${discussionsTab === "surveys" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
					children: "Surveys Feedback"
				})]
			}), /* @__PURE__ */ jsxs("button", {
				onClick: handlePinAnnouncement,
				className: "btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer shrink-0",
				children: [/* @__PURE__ */ jsx(Pin, { className: "w-4 h-4 animate-bounce" }), " Pin Announcement"]
			})] })
		}), discussionsTab === "forum" ? /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl flex flex-col overflow-hidden border-border/40 h-[500px]",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "p-4 border-b border-border/30 bg-secondary/20 flex flex-col gap-3",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-bold text-sm text-foreground",
						children: "Discussions Inbox"
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							placeholder: "Search comments...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full pl-8 pr-3 py-1.5 bg-background border border-border/40 rounded-lg text-xs outline-none focus:border-primary"
						})]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex-1 overflow-y-auto divide-y divide-border/30",
					children: filteredThreads.map((thread) => /* @__PURE__ */ jsxs("button", {
						onClick: () => setSelectedThread(thread),
						className: `w-full text-left p-4 hover:bg-secondary/40 transition-colors flex flex-col gap-1.5 ${selectedThread.id === thread.id ? "bg-primary/5 border-l-2 border-primary" : ""}`,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-bold text-foreground",
									children: thread.student
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] text-muted-foreground",
									children: thread.time
								})]
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "text-[10px] font-bold text-primary",
								children: [
									thread.course,
									" • ",
									thread.module
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
								children: thread.message
							})
						]
					}, thread.id))
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "lg:col-span-2 glass rounded-2xl flex flex-col overflow-hidden border-border/40 h-[500px] justify-between",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "p-4 border-b border-border/30 bg-secondary/20 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-sm text-foreground",
							children: selectedThread.module
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-[10px] text-muted-foreground font-semibold",
							children: [
								selectedThread.student,
								" • ",
								selectedThread.course
							]
						})] }), /* @__PURE__ */ jsx("button", {
							onClick: () => handleResolveThread(selectedThread.id),
							className: "text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded hover:bg-emerald-500/25 transition-all cursor-pointer",
							children: "Mark Resolved"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 p-5 overflow-y-auto space-y-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex gap-3.5 items-start max-w-[85%]",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs shrink-0",
								children: selectedThread.student.split(" ").map((n) => n[0]).join("")
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-3 bg-card border border-border/40 rounded-2xl rounded-tl-none space-y-1.5 shadow-sm",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs text-foreground font-medium leading-relaxed",
									children: selectedThread.message
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[9px] text-muted-foreground block",
									children: selectedThread.time
								})]
							})]
						}), selectedThread.replies.map((rep) => /* @__PURE__ */ jsxs("div", {
							className: "flex gap-3.5 items-start max-w-[85%] ml-auto justify-end",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "p-3 bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-none space-y-1.5 shadow-sm text-right",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-[9px] font-extrabold text-primary block",
										children: rep.user
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-foreground font-medium leading-relaxed",
										children: rep.message
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[9px] text-muted-foreground block",
										children: rep.time
									})
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-extrabold text-xs shrink-0",
								children: rep.user.includes("TA") ? "TA" : "OR"
							})]
						}, rep.id))]
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handlePostReply,
						className: "p-4 border-t border-border/30 bg-background flex gap-2",
						children: [/* @__PURE__ */ jsx("input", {
							type: "text",
							placeholder: "Type your instruction or reply...",
							value: newReply,
							onChange: (e) => setNewReply(e.target.value),
							className: "flex-1 px-3 py-2 border rounded-xl bg-card outline-none text-xs focus:border-primary"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "h-8.5 w-8.5 bg-primary text-primary-foreground rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary/95 transition-colors",
							children: /* @__PURE__ */ jsx(Send, { className: "w-3.5 h-3.5" })
						})]
					})
				]
			})]
		}) : /* @__PURE__ */ jsx("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-6",
			children: mockSurveys.map((survey) => /* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-5 border-border/40 flex flex-col justify-between space-y-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-sm text-foreground",
							children: survey.course
						}), /* @__PURE__ */ jsxs("span", {
							className: "text-[10px] text-muted-foreground font-semibold",
							children: [
								"N = ",
								survey.count,
								" Surveys"
							]
						})]
					}),
					/* @__PURE__ */ jsx("hr", { className: "my-3 border-border/30" }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "p-2 bg-secondary/35 rounded-xl border text-center",
								children: [
									/* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-amber-500 mx-auto mb-1" }),
									/* @__PURE__ */ jsx("span", {
										className: "text-[9px] text-muted-foreground uppercase font-bold block",
										children: "Avg Rating"
									}),
									/* @__PURE__ */ jsxs("strong", {
										className: "text-sm font-extrabold text-foreground",
										children: [survey.rating, " / 5.0"]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-2 bg-secondary/35 rounded-xl border text-center",
								children: [
									/* @__PURE__ */ jsx(ThumbsUp, { className: "w-4 h-4 text-emerald-500 mx-auto mb-1" }),
									/* @__PURE__ */ jsx("span", {
										className: "text-[9px] text-muted-foreground uppercase font-bold block",
										children: "Recommend"
									}),
									/* @__PURE__ */ jsxs("strong", {
										className: "text-sm font-extrabold text-foreground",
										children: [survey.recommend, "%"]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-2 bg-secondary/35 rounded-xl border text-center",
								children: [
									/* @__PURE__ */ jsx(Award, { className: "w-4 h-4 text-purple-500 mx-auto mb-1" }),
									/* @__PURE__ */ jsx("span", {
										className: "text-[9px] text-muted-foreground uppercase font-bold block",
										children: "Lab Quality"
									}),
									/* @__PURE__ */ jsx("strong", {
										className: "text-sm font-extrabold text-foreground",
										children: "High"
									})
								]
							})
						]
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "p-3 bg-card border border-border/40 rounded-xl space-y-1",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-[9px] text-muted-foreground font-bold uppercase block",
						children: "Latest Feedback Text"
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-xs text-foreground italic leading-relaxed",
						children: [
							"\"",
							survey.comment,
							"\""
						]
					})]
				})]
			}, survey.id))
		})]
	});
}
//#endregion
export { DiscussionsView as component };
