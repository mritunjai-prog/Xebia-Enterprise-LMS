import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, Building, Calendar, Clock, Plus, Search, Users, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/organiser/batches/index.jsx?tsr-split=component
var initialBatches = [
	{
		id: "b1",
		name: "Spring Boot Jan 2026",
		course: "Microservices with Spring Boot",
		students: 45,
		schedule: "Mon, Wed, Fri • 10:00 AM",
		room: "Virtual Room 1",
		university: "University of Technology",
		status: "Active",
		progress: 75
	},
	{
		id: "b2",
		name: "React Advanced Cohort",
		course: "Advanced React & Next.js",
		students: 32,
		schedule: "Tue, Thu • 02:00 PM",
		room: "Virtual Room 3",
		university: "University of Technology",
		status: "Active",
		progress: 42
	},
	{
		id: "b3",
		name: "Enterprise Architecture B",
		course: "Enterprise Architecture Patterns",
		students: 28,
		schedule: "Wed • 09:00 AM",
		room: "Offline Lab 3",
		university: "Central Engineering Academy",
		status: "Upcoming",
		progress: 0
	}
];
var mockWeeklySlots = [
	{
		day: "Monday",
		time: "10:00 AM",
		batch: "Spring Boot Jan 2026",
		course: "Microservices Boot",
		room: "Virtual Room 1"
	},
	{
		day: "Tuesday",
		time: "02:00 PM",
		batch: "React Advanced Cohort",
		course: "Advanced React",
		room: "Virtual Room 3"
	},
	{
		day: "Wednesday",
		time: "09:00 AM",
		batch: "Enterprise Architecture B",
		course: "Enterprise Arch",
		room: "Offline Lab 3"
	},
	{
		day: "Wednesday",
		time: "10:00 AM",
		batch: "Spring Boot Jan 2026",
		course: "Microservices Boot",
		room: "Virtual Room 1"
	},
	{
		day: "Thursday",
		time: "02:00 PM",
		batch: "React Advanced Cohort",
		course: "Advanced React",
		room: "Virtual Room 3"
	},
	{
		day: "Friday",
		time: "10:00 AM",
		batch: "Spring Boot Jan 2026",
		course: "Microservices Boot",
		room: "Virtual Room 1"
	}
];
function BatchesView() {
	const [batches, setBatches] = useState(initialBatches);
	const [search, setSearch] = useState("");
	const [universityFilter, setUniversityFilter] = useState("All");
	const [statusFilter, setStatusFilter] = useState("All");
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [isSchedulerView, setIsSchedulerView] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [batchName, setBatchName] = useState("");
	const [selectedCourse, setSelectedCourse] = useState("Microservices with Spring Boot");
	const [associatedUni, setAssociatedUni] = useState("University of Technology");
	const [sessionTime, setSessionTime] = useState("10:00 AM");
	const [selectedRoom, setSelectedRoom] = useState("Virtual Room 1");
	const [scheduleDays, setScheduleDays] = useState(["Mon"]);
	const handleCreateBatch = (e) => {
		e.preventDefault();
		if (!batchName) return;
		setSubmitLoading(true);
		setTimeout(() => {
			setBatches([{
				id: `b${Date.now()}`,
				name: batchName,
				course: selectedCourse,
				students: 0,
				schedule: `${scheduleDays.join(", ")} • ${sessionTime}`,
				room: selectedRoom,
				university: associatedUni,
				status: "Upcoming",
				progress: 0
			}, ...batches]);
			setSubmitLoading(false);
			setIsCreateOpen(false);
			setBatchName("");
			setScheduleDays(["Mon"]);
			toast.success("Cohort batch launched successfully!");
		}, 1200);
	};
	const handleToggleDay = (day) => {
		if (scheduleDays.includes(day)) setScheduleDays(scheduleDays.filter((d) => d !== day));
		else setScheduleDays([...scheduleDays, day]);
	};
	const filteredBatches = batches.filter((b) => {
		const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.course.toLowerCase().includes(search.toLowerCase());
		const matchesUni = universityFilter === "All" || b.university === universityFilter;
		const matchesStatus = statusFilter === "All" || b.status === statusFilter;
		return matchesSearch && matchesUni && matchesStatus;
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(ModuleHeroBanner, {
				breadcrumb: "Dashboard / Batches & Enrolments",
				title: "Batches & Enrolment Scheduling",
				subtitle: "Launch university cohorts, select curriculum, and configure weekly timetables.",
				actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: "flex border border-border/40 rounded-xl overflow-hidden p-0.5 bg-secondary/30",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => setIsSchedulerView(false),
						className: `px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${!isSchedulerView ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: "Cohort List"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setIsSchedulerView(true),
						className: `px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isSchedulerView ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: "Timetable Grid"
					})]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: () => setIsCreateOpen(true),
					className: "btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer shrink-0",
					children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), " Launch Cohort"]
				})] })
			}),
			!isSchedulerView && /* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative w-full md:max-w-xs",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
						type: "text",
						placeholder: "Search by cohort or course name...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3 w-full md:w-auto justify-end",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background",
						children: [/* @__PURE__ */ jsx(Building, { className: "w-3.5 h-3.5 text-muted-foreground" }), /* @__PURE__ */ jsxs("select", {
							value: universityFilter,
							onChange: (e) => setUniversityFilter(e.target.value),
							className: "bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "All",
									children: "All Universities Scope"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "University of Technology",
									children: "University of Tech"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Central Engineering Academy",
									children: "Central Academy"
								})
							]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background",
						children: /* @__PURE__ */ jsxs("select", {
							value: statusFilter,
							onChange: (e) => setStatusFilter(e.target.value),
							className: "bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "All",
									children: "All Statuses"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Active",
									children: "Active"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "Upcoming",
									children: "Upcoming"
								})
							]
						})
					})]
				})]
			}),
			!isSchedulerView ? filteredBatches.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: filteredBatches.map((batch) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "glass rounded-2xl p-5 border-border/40 flex flex-col justify-between hover:border-primary/20 transition-all duration-200",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-bold text-lg text-foreground leading-snug",
							children: batch.name
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-muted-foreground mt-0.5 flex items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(Building, { className: "w-3 h-3 text-primary" }),
								" ",
								batch.university
							]
						})] }), /* @__PURE__ */ jsx("span", {
							className: `px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${batch.status === "Active" ? "bg-emerald-500/25 text-emerald-300" : "bg-blue-500/25 text-blue-300"}`,
							children: batch.status
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-4 p-3 rounded-xl bg-card border border-border/30 space-y-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5 text-primary shrink-0" }), /* @__PURE__ */ jsx("span", {
									className: "font-semibold text-foreground line-clamp-1",
									children: batch.course
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-accent shrink-0" }), /* @__PURE__ */ jsx("span", { children: batch.schedule })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ jsx(Video, { className: "w-3.5 h-3.5 text-pink-500 shrink-0" }), /* @__PURE__ */ jsx("span", {
									className: "font-bold text-foreground",
									children: batch.room
								})]
							})
						]
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "mt-5 space-y-4 pt-3 border-t border-border/30",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-center text-xs",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-1 text-muted-foreground",
									children: [
										/* @__PURE__ */ jsx(Users, { className: "w-3.5 h-3.5 text-primary" }),
										" Enrolled: ",
										/* @__PURE__ */ jsx("strong", {
											className: "text-foreground",
											children: batch.students
										})
									]
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-muted-foreground font-bold",
									children: [batch.progress, "% complete"]
								})]
							}),
							batch.status === "Active" && /* @__PURE__ */ jsx("div", {
								className: "w-full h-1.5 bg-secondary rounded-full overflow-hidden",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-full bg-primary",
									style: { width: `${batch.progress}%` }
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ jsx("button", {
									onClick: () => toast.success("Configuring weekly schedule slots..."),
									className: "flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold py-2 rounded-xl transition-colors cursor-pointer",
									children: "Timetable"
								}), /* @__PURE__ */ jsx("button", {
									onClick: () => toast.success("Redirecting to student directory with batch filters..."),
									className: "flex-1 border hover:bg-secondary text-foreground text-xs font-semibold py-2 rounded-xl transition-colors cursor-pointer",
									children: "Enrol Students"
								})]
							})
						]
					})]
				}, batch.id))
			}) : /* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed",
				children: [
					/* @__PURE__ */ jsx(Calendar, { className: "w-12 h-12 text-muted-foreground/60 mb-3" }),
					/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-bold text-foreground",
						children: "No Cohorts Scheduled"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground max-w-sm mt-1",
						children: "Configure and launch a new student batch to manage class timetables."
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setIsCreateOpen(true),
						className: "btn-hero px-4 py-2 rounded-xl text-xs font-bold mt-4 cursor-pointer",
						children: "Launch First Cohort"
					})
				]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-6",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-lg font-bold text-foreground mb-4",
					children: "Active Weekly Slot Grid"
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4",
					children: [
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday"
					].map((day) => {
						const slots = mockWeeklySlots.filter((s) => s.day === day);
						return /* @__PURE__ */ jsxs("div", {
							className: "border border-border/40 rounded-xl p-3.5 bg-card/65 space-y-3",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-extrabold text-xs uppercase tracking-wider text-primary border-b border-border/30 pb-1.5",
								children: day
							}), slots.length > 0 ? slots.map((slot, idx) => /* @__PURE__ */ jsxs("div", {
								className: "p-2.5 rounded-lg bg-background border border-border/30 space-y-1 hover:border-primary/20 transition-all",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-bold text-accent",
										children: slot.time
									}),
									/* @__PURE__ */ jsx("h4", {
										className: "text-xs font-bold text-foreground line-clamp-1 leading-snug",
										children: slot.batch
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[9px] text-muted-foreground truncate",
										children: slot.course
									}),
									/* @__PURE__ */ jsx("span", {
										className: "text-[8px] bg-secondary font-bold px-1 py-0.5 rounded text-muted-foreground",
										children: slot.room
									})
								]
							}, idx)) : /* @__PURE__ */ jsx("p", {
								className: "text-[10px] text-muted-foreground/50 italic text-center py-4",
								children: "No sessions"
							})]
						}, day);
					})
				})]
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isCreateOpen && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: { scale: .95 },
					animate: { scale: 1 },
					exit: { scale: .95 },
					className: "w-full max-w-lg glass rounded-2xl p-6 relative",
					children: [
						/* @__PURE__ */ jsx("button", {
							onClick: () => setIsCreateOpen(false),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display mb-4",
							children: "Launch New Cohort Batch"
						}),
						/* @__PURE__ */ jsx("form", {
							onSubmit: handleCreateBatch,
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Batch / Cohort Name"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										placeholder: "e.g. Next.js Spring Semester 2026",
										value: batchName,
										onChange: (e) => setBatchName(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Select Course Syllabus"
									}), /* @__PURE__ */ jsxs("select", {
										value: selectedCourse,
										onChange: (e) => setSelectedCourse(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
										children: [
											/* @__PURE__ */ jsx("option", { children: "Microservices with Spring Boot" }),
											/* @__PURE__ */ jsx("option", { children: "Advanced React & Next.js" }),
											/* @__PURE__ */ jsx("option", { children: "Enterprise Architecture Patterns" })
										]
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "University Partner"
										}), /* @__PURE__ */ jsxs("select", {
											value: associatedUni,
											onChange: (e) => setAssociatedUni(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [/* @__PURE__ */ jsx("option", { children: "University of Technology" }), /* @__PURE__ */ jsx("option", { children: "Central Engineering Academy" })]
										})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Virtual Room / Location"
										}), /* @__PURE__ */ jsxs("select", {
											value: selectedRoom,
											onChange: (e) => setSelectedRoom(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [
												/* @__PURE__ */ jsx("option", { children: "Virtual Room 1" }),
												/* @__PURE__ */ jsx("option", { children: "Virtual Room 2" }),
												/* @__PURE__ */ jsx("option", { children: "Virtual Room 3" }),
												/* @__PURE__ */ jsx("option", { children: "Offline Lecture Hall C" })
											]
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Session Timing"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: "e.g. 10:00 AM",
											value: sessionTime,
											onChange: (e) => setSessionTime(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Weekly Frequency"
										}), /* @__PURE__ */ jsx("div", {
											className: "flex gap-1.5 flex-wrap mt-1",
											children: [
												"Mon",
												"Tue",
												"Wed",
												"Thu",
												"Fri",
												"Sat"
											].map((day) => {
												return /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => handleToggleDay(day),
													className: `px-2 py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${scheduleDays.includes(day) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border"}`,
													children: day
												}, day);
											})
										})] })]
									}),
									/* @__PURE__ */ jsx("button", {
										type: "submit",
										disabled: submitLoading,
										className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-4 flex items-center justify-center cursor-pointer",
										children: submitLoading ? "Synchronizing slots..." : "Schedule Cohort & Launch"
									})
								]
							})
						})
					]
				})
			}) })
		]
	});
}
//#endregion
export { BatchesView as component };
