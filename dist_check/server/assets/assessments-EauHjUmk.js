import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ClipboardList, Clock, GraduationCap, Percent, Plus, Search, Sliders, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Bar, BarChart as BarChart$1, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
//#region src/routes/organiser/assessments/index.jsx?tsr-split=component
var initialAssessments = [
	{
		id: "as1",
		title: "Docker Integration & Registry Lab",
		type: "Practical",
		course: "Microservices Boot",
		marks: 100,
		submissions: 42,
		pending: 3,
		deadline: "2026-06-25"
	},
	{
		id: "as2",
		title: "Spring Cloud Gateway Config Essay",
		type: "Theory",
		course: "Microservices Boot",
		marks: 50,
		submissions: 38,
		pending: 1,
		deadline: "2026-06-20"
	},
	{
		id: "as3",
		title: "Advanced React Context & Portals Exam",
		type: "Theory-Based MCQ",
		course: "Advanced React",
		marks: 100,
		submissions: 32,
		pending: 0,
		deadline: "2026-06-18"
	}
];
var initialSubmissions = [
	{
		id: "sub1",
		student: "Alice Johnson",
		assessment: "Docker Integration & Registry Lab",
		submittedAt: "2 hours ago",
		status: "Submitted",
		codeSnippet: "FROM openjdk:17-alpine\nCOPY target/*.jar app.jar\nENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"]",
		rubrics: {
			logic: 25,
			coverage: 20,
			execution: 40
		}
	},
	{
		id: "sub2",
		student: "Bob Smith",
		assessment: "Docker Integration & Registry Lab",
		submittedAt: "1 day ago",
		status: "Submitted",
		codeSnippet: "FROM openjdk:17\nCOPY target/*.jar app.jar\nCMD java -jar app.jar",
		rubrics: {
			logic: 15,
			coverage: 10,
			execution: 20
		}
	},
	{
		id: "sub3",
		student: "Clara Oswald",
		assessment: "Spring Cloud Gateway Config Essay",
		submittedAt: "3 hours ago",
		status: "Submitted",
		textAnswer: "Spring Cloud Gateway uses Netty as the underlying server. Routing is configured using predicates and filters...",
		rubrics: {
			logic: 35,
			coverage: 10
		}
	}
];
var mockAnalytics = [
	{
		grade: "A (90-100)",
		count: 18,
		color: "oklch(0.38 0.14 335)"
	},
	{
		grade: "B (80-89)",
		count: 12,
		color: "oklch(0.78 0.14 200)"
	},
	{
		grade: "C (70-79)",
		count: 8,
		color: "oklch(0.76 0.14 165)"
	},
	{
		grade: "D (60-69)",
		count: 4,
		color: "oklch(0.55 0.22 320)"
	},
	{
		grade: "F (<60)",
		count: 0,
		color: "oklch(0.65 0.22 25)"
	}
];
function AssessmentsView() {
	const [assessments, setAssessments] = useState(initialAssessments);
	const [submissions, setSubmissions] = useState(initialSubmissions);
	const [activeTab, setActiveTab] = useState("tests");
	const [search, setSearch] = useState("");
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [selectedSub, setSelectedSub] = useState(null);
	const [logicScore, setLogicScore] = useState(30);
	const [coverageScore, setCoverageScore] = useState(30);
	const [executionScore, setExecutionScore] = useState(40);
	const [feedback, setFeedback] = useState("");
	const [gradeLoading, setGradeLoading] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newType, setNewType] = useState("Practical");
	const [newCourse, setNewCourse] = useState("Microservices Boot");
	const [newMarks, setNewMarks] = useState(100);
	const [newDeadline, setNewDeadline] = useState("");
	const [createLoading, setCreateLoading] = useState(false);
	const handleCreateAssessment = (e) => {
		e.preventDefault();
		if (!newTitle) return;
		setCreateLoading(true);
		setTimeout(() => {
			setAssessments([{
				id: `as${Date.now()}`,
				title: newTitle,
				type: newType,
				course: newCourse,
				marks: parseInt(newMarks) || 100,
				submissions: 0,
				pending: 0,
				deadline: newDeadline || "2026-06-30"
			}, ...assessments]);
			setCreateLoading(false);
			setIsCreateOpen(false);
			setNewTitle("");
			toast.success("Assessment published successfully!");
		}, 1200);
	};
	const handleOpenGrading = (sub) => {
		setSelectedSub(sub);
		setLogicScore(sub.rubrics?.logic || 30);
		setCoverageScore(sub.rubrics?.coverage || 30);
		setExecutionScore(sub.rubrics?.execution || 40);
		setFeedback("");
	};
	const handleSaveGrade = () => {
		setGradeLoading(true);
		const finalScore = logicScore + coverageScore + (selectedSub.rubrics?.execution ? executionScore : 0);
		setTimeout(() => {
			setSubmissions(submissions.filter((s) => s.id !== selectedSub.id));
			setGradeLoading(false);
			setSelectedSub(null);
			setAssessments(assessments.map((ass) => {
				if (ass.title === selectedSub.assessment) return {
					...ass,
					pending: Math.max(0, ass.pending - 1)
				};
				return ass;
			}));
			toast.success(`Grades committed! Final Score: ${finalScore} marks.`);
		}, 1200);
	};
	const filteredAssessments = assessments.filter((ass) => ass.title.toLowerCase().includes(search.toLowerCase()) || ass.course.toLowerCase().includes(search.toLowerCase()));
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(ModuleHeroBanner, {
				breadcrumb: "Dashboard / Assessments",
				title: "Assessments & Gradebook",
				subtitle: "Deploy MCQ tests, evaluate code submissions using rubrics, and inspect score spreads.",
				actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					className: "flex border border-border/40 rounded-xl overflow-hidden p-0.5 bg-secondary/30",
					children: [
						/* @__PURE__ */ jsx("button", {
							onClick: () => setActiveTab("tests"),
							className: `px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${activeTab === "tests" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: "Assessments List"
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: () => setActiveTab("queue"),
							className: `px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${activeTab === "queue" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [
								"Evaluation Queue (",
								submissions.length,
								")"
							]
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setActiveTab("stats"),
							className: `px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${activeTab === "stats" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: "Grade Spread"
						})
					]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: () => setIsCreateOpen(true),
					className: "btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer shrink-0",
					children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), " Create Test"]
				})] })
			}),
			activeTab === "tests" && /* @__PURE__ */ jsxs("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative w-full md:max-w-xs",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							type: "text",
							placeholder: "Search assessments...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
						})]
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: filteredAssessments.map((ass) => /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "glass rounded-2xl p-5 border-border/40 flex flex-col justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-start",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[9px] uppercase font-bold bg-secondary px-2 py-0.5 rounded text-muted-foreground",
									children: ass.type
								}), /* @__PURE__ */ jsxs("span", {
									className: "text-xs text-muted-foreground font-semibold flex items-center gap-1",
									children: [
										/* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
										" Due ",
										ass.deadline
									]
								})]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "font-bold text-sm text-foreground mt-3 leading-snug",
								children: ass.title
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground mt-1 font-medium",
								children: ["Syllabus: ", ass.course]
							})
						] }), /* @__PURE__ */ jsxs("div", {
							className: "mt-5 space-y-4 pt-3 border-t border-border/30",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-3 gap-2 text-center text-xs",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "p-2 bg-secondary/35 rounded-lg",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground block font-bold",
											children: "Marks"
										}), /* @__PURE__ */ jsx("strong", {
											className: "text-foreground text-sm font-extrabold",
											children: ass.marks
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "p-2 bg-secondary/35 rounded-lg",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground block font-bold",
											children: "Submissions"
										}), /* @__PURE__ */ jsx("strong", {
											className: "text-foreground text-sm font-extrabold",
											children: ass.submissions
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "p-2 bg-secondary/35 rounded-lg",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground block font-bold",
											children: "Pending"
										}), /* @__PURE__ */ jsx("strong", {
											className: "text-red-500 text-sm font-extrabold",
											children: ass.pending
										})]
									})
								]
							}), /* @__PURE__ */ jsx("div", {
								className: "flex gap-2",
								children: /* @__PURE__ */ jsx("button", {
									onClick: () => {
										if (ass.pending > 0) setActiveTab("queue");
										else toast.info("No pending submissions require evaluation.");
									},
									className: "flex-1 btn-hero py-1.5 rounded-xl text-xs font-semibold cursor-pointer",
									children: "Evaluate Queue"
								})
							})]
						})]
					}, ass.id))
				})]
			}),
			activeTab === "queue" && /* @__PURE__ */ jsx("div", {
				className: "glass rounded-2xl overflow-hidden border-border/40",
				children: submissions.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-secondary/40 text-muted-foreground border-b border-border/30 text-xs font-bold uppercase tracking-wider",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4",
									children: "Student"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4",
									children: "Assessment Task"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4",
									children: "Submitted At"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4 text-center",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4 text-right",
									children: "Action"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-border/30 font-medium",
							children: submissions.map((sub) => /* @__PURE__ */ jsxs("tr", {
								className: "hover:bg-secondary/20 transition-all",
								children: [
									/* @__PURE__ */ jsxs("td", {
										className: "px-5 py-4 text-foreground font-bold flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-extrabold text-primary",
											children: sub.student.split(" ").map((n) => n[0]).join("")
										}), /* @__PURE__ */ jsx("span", { children: sub.student })]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4 text-muted-foreground",
										children: sub.assessment
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4 text-muted-foreground text-xs",
										children: sub.submittedAt
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4 text-center",
										children: /* @__PURE__ */ jsx("span", {
											className: "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/25 text-amber-300",
											children: sub.status
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4 text-right",
										children: /* @__PURE__ */ jsx("button", {
											onClick: () => handleOpenGrading(sub),
											className: "bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors",
											children: "Grade Script"
										})
									})
								]
							}, sub.id))
						})]
					})
				}) : /* @__PURE__ */ jsxs("div", {
					className: "p-12 text-center flex flex-col items-center justify-center border-dashed",
					children: [
						/* @__PURE__ */ jsx(ClipboardList, { className: "w-12 h-12 text-muted-foreground/60 mb-3" }),
						/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-bold text-foreground",
							children: "Evaluation Queue Empty"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: "You have evaluated all submissions! Great job."
						})
					]
				})
			}),
			activeTab === "stats" && /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-2 glass rounded-2xl p-6 flex flex-col justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-bold text-foreground mb-4",
						children: "Grade Spread Distribution"
					}), /* @__PURE__ */ jsx("div", {
						className: "h-72 w-full mt-4",
						children: /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(BarChart$1, {
								data: mockAnalytics,
								margin: {
									top: 10,
									right: 10,
									left: -25,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ jsx(CartesianGrid, {
										strokeDasharray: "3 3",
										vertical: false,
										opacity: .2
									}),
									/* @__PURE__ */ jsx(XAxis, {
										dataKey: "grade",
										stroke: "var(--muted-foreground)",
										fontSize: 11,
										tickLine: false
									}),
									/* @__PURE__ */ jsx(YAxis, {
										stroke: "var(--muted-foreground)",
										fontSize: 11,
										tickLine: false
									}),
									/* @__PURE__ */ jsx(Tooltip, {}),
									/* @__PURE__ */ jsx(Bar, {
										dataKey: "count",
										radius: [
											8,
											8,
											0,
											0
										],
										children: mockAnalytics.map((entry, idx) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${idx}`))
									})
								]
							})
						})
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center border-t border-border/30 pt-4 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ jsx("span", { children: "N = 42 Students" }), /* @__PURE__ */ jsx("span", { children: "Class GPA Average: 3.52 / 4.0" })]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "glass rounded-2xl p-6 space-y-4",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-lg font-bold text-foreground",
						children: "Gradebook Insights"
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border/30",
							children: [/* @__PURE__ */ jsx(GraduationCap, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-muted-foreground font-bold uppercase block",
								children: "Highest Performer"
							}), /* @__PURE__ */ jsx("strong", {
								className: "text-xs text-foreground font-bold",
								children: "Charlie Davis (Grade A+)"
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border/30",
							children: [/* @__PURE__ */ jsx(Percent, { className: "w-5 h-5 text-accent" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-muted-foreground font-bold uppercase block",
								children: "Average Retention"
							}), /* @__PURE__ */ jsx("strong", {
								className: "text-xs text-foreground font-bold",
								children: "85% Passing Rate"
							})] })]
						})]
					})]
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
							children: "Construct Assessment Task"
						}),
						/* @__PURE__ */ jsx("form", {
							onSubmit: handleCreateAssessment,
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Assessment Title"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										placeholder: "e.g. JWT Auth Security Audit Lab",
										value: newTitle,
										onChange: (e) => setNewTitle(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Assessment Type"
										}), /* @__PURE__ */ jsxs("select", {
											value: newType,
											onChange: (e) => setNewType(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "Practical",
													children: "Practical Lab"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Theory",
													children: "Theory Essay"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Theory-Based MCQ",
													children: "Theory-Based MCQ"
												})
											]
										})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Total Marks"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "number",
											placeholder: "100",
											value: newMarks,
											onChange: (e) => setNewMarks(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Due Deadline"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "date",
										value: newDeadline,
										onChange: (e) => setNewDeadline(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsx("button", {
										type: "submit",
										disabled: createLoading,
										className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer",
										children: createLoading ? "Deploying test..." : "Publish Assessment"
									})
								]
							})
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: selectedSub && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: { scale: .95 },
					animate: { scale: 1 },
					exit: { scale: .95 },
					className: "w-full max-w-3xl glass rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-6",
					children: [
						/* @__PURE__ */ jsx("button", {
							onClick: () => setSelectedSub(null),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 flex flex-col justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold text-foreground",
									children: "Student Script"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 mt-1",
									children: [/* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5 text-primary" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs font-semibold text-muted-foreground",
										children: selectedSub.student
									})]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-[10px] text-muted-foreground uppercase font-bold mt-3 block",
									children: ["Task: ", selectedSub.assessment]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-4 p-4 rounded-xl bg-secondary/40 border border-border/30 h-64 overflow-auto font-mono text-xs",
									children: selectedSub.codeSnippet ? /* @__PURE__ */ jsx("pre", {
										className: "whitespace-pre-wrap",
										children: selectedSub.codeSnippet
									}) : /* @__PURE__ */ jsx("p", {
										className: "font-sans text-xs text-foreground italic leading-relaxed",
										children: selectedSub.textAnswer
									})
								})
							] }), /* @__PURE__ */ jsx("span", {
								className: "text-[10px] text-muted-foreground font-semibold",
								children: "Verification logs: SSO checked, no plagiarism detected."
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-5 flex flex-col justify-between",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h3", {
									className: "text-lg font-bold text-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ jsx(Sliders, { className: "w-4 h-4 text-accent" }), " Rubric Evaluation"]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Move sliders to configure rubric scores."
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex justify-between text-xs font-bold",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-foreground",
													children: "Logic & Principles"
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-primary",
													children: [logicScore, " / 40 pts"]
												})]
											}), /* @__PURE__ */ jsx("input", {
												type: "range",
												min: "0",
												max: "40",
												value: logicScore,
												onChange: (e) => setLogicScore(parseInt(e.target.value)),
												className: "w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex justify-between text-xs font-bold",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-foreground",
													children: "Code Coverage / Structure"
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-primary",
													children: [coverageScore, " / 30 pts"]
												})]
											}), /* @__PURE__ */ jsx("input", {
												type: "range",
												min: "0",
												max: "30",
												value: coverageScore,
												onChange: (e) => setCoverageScore(parseInt(e.target.value)),
												className: "w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
											})]
										}),
										selectedSub.rubrics?.execution !== void 0 && /* @__PURE__ */ jsxs("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex justify-between text-xs font-bold",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-foreground",
													children: "Runtime Execution / Lab Criteria"
												}), /* @__PURE__ */ jsxs("span", {
													className: "text-primary",
													children: [executionScore, " / 30 pts"]
												})]
											}), /* @__PURE__ */ jsx("input", {
												type: "range",
												min: "0",
												max: "30",
												value: executionScore,
												onChange: (e) => setExecutionScore(parseInt(e.target.value)),
												className: "w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "p-3 bg-secondary/30 rounded-xl border border-border/30 text-center font-bold text-sm",
											children: ["Total Summed Mark: ", /* @__PURE__ */ jsxs("span", {
												className: "text-primary",
												children: [
													logicScore + coverageScore + (selectedSub.rubrics?.execution ? executionScore : 0),
													" / ",
													selectedSub.rubrics?.execution ? 100 : 70
												]
											})]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-[10px] font-bold text-muted-foreground uppercase block mb-1",
											children: "Feedback Remarks"
										}), /* @__PURE__ */ jsx("textarea", {
											rows: 2,
											placeholder: "Excellent implementation, write detailed feedback...",
											value: feedback,
											onChange: (e) => setFeedback(e.target.value),
											className: "w-full px-3 py-1.5 border rounded-lg bg-background outline-none text-xs focus:border-primary"
										})] })
									]
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: handleSaveTable,
									onClick: handleSaveGrade,
									disabled: gradeLoading,
									className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer flex items-center justify-center",
									children: gradeLoading ? "Saving score sheet..." : "Commit Grade Sheet"
								})
							]
						})
					]
				})
			}) })
		]
	});
}
//#endregion
export { AssessmentsView as component };
