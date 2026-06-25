import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, CalendarCheck, CheckCircle, FileSpreadsheet, GraduationCap, Plus, Search, TrendingUp, Upload, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
//#region src/routes/organiser/students/index.jsx?tsr-split=component
var initialStudents = [
	{
		id: "s1",
		name: "Alice Johnson",
		email: "alice@example.com",
		batch: "Spring Boot Jan 2026",
		progress: 85,
		attendance: 95,
		gpa: 3.8,
		lastActive: "2 hours ago",
		scores: [
			{
				name: "Quiz 1",
				score: 85
			},
			{
				name: "Quiz 2",
				score: 90
			},
			{
				name: "Assignment 1",
				score: 80
			},
			{
				name: "Lab Exam",
				score: 85
			}
		]
	},
	{
		id: "s2",
		name: "Bob Smith",
		email: "bob@example.com",
		batch: "React Advanced Cohort",
		progress: 42,
		attendance: 80,
		gpa: 2.9,
		lastActive: "1 day ago",
		scores: [
			{
				name: "Quiz 1",
				score: 65
			},
			{
				name: "Quiz 2",
				score: 70
			},
			{
				name: "Assignment 1",
				score: 60
			},
			{
				name: "Lab Exam",
				score: 42
			}
		]
	},
	{
		id: "s3",
		name: "Charlie Davis",
		email: "charlie@example.com",
		batch: "Spring Boot Jan 2026",
		progress: 95,
		attendance: 98,
		gpa: 3.95,
		lastActive: "Just now",
		scores: [
			{
				name: "Quiz 1",
				score: 98
			},
			{
				name: "Quiz 2",
				score: 95
			},
			{
				name: "Assignment 1",
				score: 92
			},
			{
				name: "Lab Exam",
				score: 95
			}
		]
	}
];
var parsedCsvPreview = [
	{
		name: "Clara Oswald",
		email: "clara@example.com",
		batch: "Spring Boot Jan 2026",
		status: "Valid",
		error: null
	},
	{
		name: "Danny Pink",
		email: "danny@example.com",
		batch: "React Advanced Cohort",
		status: "Valid",
		error: null
	},
	{
		name: "Dave Archer",
		email: "dave-invalid-email",
		batch: "Spring Boot Jan 2026",
		status: "Invalid",
		error: "Invalid email format"
	},
	{
		name: "Amy Pond",
		email: "",
		batch: "React Advanced Cohort",
		status: "Invalid",
		error: "Missing email address"
	}
];
function StudentsView() {
	const [students, setStudents] = useState(initialStudents);
	const [search, setSearch] = useState("");
	const [selectedBatch, setSelectedBatch] = useState("All");
	const [activeStudent, setActiveStudent] = useState(null);
	const [isImportOpen, setIsImportOpen] = useState(false);
	const [isAddOpen, setIsAddOpen] = useState(false);
	const [csvFile, setCsvFile] = useState(null);
	const [csvLoading, setCsvLoading] = useState(false);
	const [csvParsed, setCsvParsed] = useState(false);
	const [addName, setAddName] = useState("");
	const [addEmail, setAddEmail] = useState("");
	const [addBatch, setAddBatch] = useState("Spring Boot Jan 2026");
	const handleFileUpload = (e) => {
		setCsvLoading(true);
		setCsvFile(e.target.files[0]?.name || "students_enrolment.csv");
		setTimeout(() => {
			setCsvLoading(false);
			setCsvParsed(true);
			toast.info("CSV file uploaded and pre-parsed. Please review validation warnings below.");
		}, 1500);
	};
	const handleImportValid = () => {
		const validRows = parsedCsvPreview.filter((r) => r.status === "Valid").map((row, idx) => ({
			id: `s-csv-${Date.now()}-${idx}`,
			name: row.name,
			email: row.email,
			batch: row.batch,
			progress: Math.floor(Math.random() * 30),
			attendance: 100,
			gpa: 4,
			lastActive: "Never",
			scores: [{
				name: "Quiz 1",
				score: 0
			}]
		}));
		setStudents([...students, ...validRows]);
		setIsImportOpen(false);
		setCsvParsed(false);
		setCsvFile(null);
		toast.success(`Successfully imported ${validRows.length} valid student profiles!`);
	};
	const handleAddStudent = (e) => {
		e.preventDefault();
		if (!addName || !addEmail) return;
		setStudents([{
			id: `s${Date.now()}`,
			name: addName,
			email: addEmail,
			batch: addBatch,
			progress: 0,
			attendance: 100,
			gpa: 4,
			lastActive: "Never",
			scores: []
		}, ...students]);
		setIsAddOpen(false);
		setAddName("");
		setAddEmail("");
		toast.success(`${addName} added successfully.`);
	};
	const filteredStudents = students.filter((s) => {
		const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
		const matchesBatch = selectedBatch === "All" || s.batch === selectedBatch;
		return matchesSearch && matchesBatch;
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(ModuleHeroBanner, {
				breadcrumb: "Dashboard / Students",
				title: "Student Directory & Performance",
				subtitle: "Monitor attendance logs, score sheets, and import student directories via CSV.",
				actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("button", {
					onClick: () => setIsImportOpen(true),
					className: "border hover:bg-secondary flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer transition-colors",
					children: [/* @__PURE__ */ jsx(Upload, { className: "w-4 h-4 text-primary" }), " Import CSV List"]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: () => setIsAddOpen(true),
					className: "btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer",
					children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), " Add Student"]
				})] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative w-full md:max-w-xs",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
						type: "text",
						placeholder: "Search student name or email...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background",
					children: /* @__PURE__ */ jsxs("select", {
						value: selectedBatch,
						onChange: (e) => setSelectedBatch(e.target.value),
						className: "bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "All",
								children: "All Batches"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "Spring Boot Jan 2026",
								children: "Spring Boot Jan 2026"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "React Advanced Cohort",
								children: "React Advanced Cohort"
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "glass rounded-2xl overflow-hidden border-border/40",
				children: /* @__PURE__ */ jsx("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ jsxs("table", {
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-secondary/40 text-muted-foreground border-b border-border/30 text-xs font-bold uppercase tracking-wider",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4",
									children: "Student Name"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4 hidden sm:table-cell",
									children: "Email Address"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4",
									children: "Batch Scope"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4 text-center",
									children: "Attendance"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4 text-center",
									children: "GPA"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-5 py-4 text-right",
									children: "Course Progress"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "divide-y divide-border/30 font-medium",
							children: filteredStudents.map((student) => /* @__PURE__ */ jsxs("tr", {
								onClick: () => setActiveStudent(student),
								className: "hover:bg-secondary/20 transition-all cursor-pointer group",
								children: [
									/* @__PURE__ */ jsxs("td", {
										className: "px-5 py-4 text-foreground font-bold group-hover:text-primary transition-colors flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("div", {
											className: "h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-extrabold text-primary",
											children: student.name.split(" ").map((n) => n[0]).join("")
										}), /* @__PURE__ */ jsx("span", { children: student.name })]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4 text-muted-foreground hidden sm:table-cell",
										children: student.email
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4",
										children: /* @__PURE__ */ jsx("span", {
											className: "bg-secondary/60 border border-border/40 px-2 py-0.5 rounded text-xs",
											children: student.batch
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4 text-center font-bold",
										children: /* @__PURE__ */ jsxs("span", {
											className: student.attendance >= 90 ? "text-emerald-500" : "text-amber-500",
											children: [student.attendance, "%"]
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4 text-center font-bold",
										children: /* @__PURE__ */ jsx("span", {
											className: "text-primary",
											children: student.gpa.toFixed(2)
										})
									}),
									/* @__PURE__ */ jsx("td", {
										className: "px-5 py-4 text-right",
										children: /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-end gap-2",
											children: [/* @__PURE__ */ jsx("div", {
												className: "w-16 h-1.5 bg-secondary rounded-full overflow-hidden hidden md:block",
												children: /* @__PURE__ */ jsx("div", {
													className: "h-full bg-primary",
													style: { width: `${student.progress}%` }
												})
											}), /* @__PURE__ */ jsxs("span", {
												className: "font-bold text-foreground",
												children: [student.progress, "%"]
											})]
										})
									})
								]
							}, student.id))
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isImportOpen && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: { scale: .95 },
					animate: { scale: 1 },
					exit: { scale: .95 },
					className: "w-full max-w-2xl glass rounded-2xl p-6 relative overflow-y-auto max-h-[90vh]",
					children: [
						/* @__PURE__ */ jsx("button", {
							onClick: () => {
								setIsImportOpen(false);
								setCsvParsed(false);
								setCsvFile(null);
							},
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "text-xl font-bold font-display mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-5 h-5 text-primary" }), " Import Student Directory CSV"]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground mb-4",
							children: "Bulk-enroll student profiles associated with university scopes."
						}),
						!csvParsed ? /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "border-2 border-dashed border-border/50 rounded-xl p-12 text-center hover:bg-secondary/20 transition-all cursor-pointer relative",
								children: [
									/* @__PURE__ */ jsx("input", {
										type: "file",
										accept: ".csv",
										onChange: handleFileUpload,
										className: "absolute inset-0 opacity-0 cursor-pointer"
									}),
									/* @__PURE__ */ jsx(Upload, { className: "w-10 h-10 text-primary mx-auto mb-2" }),
									/* @__PURE__ */ jsx("span", {
										className: "text-sm font-bold block",
										children: "Drag & drop students CSV here"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: "Columns required: Name, Email, Batch"
									})
								]
							}), csvLoading && /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-center gap-2 py-4",
								children: [/* @__PURE__ */ jsx("div", { className: "h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" }), /* @__PURE__ */ jsx("span", {
									className: "text-xs font-semibold text-muted-foreground",
									children: "Parsing CSV data structure..."
								})]
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "space-y-4 animate-in fade-in duration-300",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "bg-secondary/25 border border-border/30 rounded-xl p-3.5 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "font-bold text-foreground",
										children: ["File: ", csvFile]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-muted-foreground font-semibold",
										children: "4 Records Scanned"
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "border rounded-xl overflow-hidden bg-card/45",
									children: /* @__PURE__ */ jsxs("table", {
										className: "w-full text-xs text-left",
										children: [/* @__PURE__ */ jsx("thead", {
											className: "bg-secondary/20 text-muted-foreground border-b border-border/30 font-bold uppercase",
											children: /* @__PURE__ */ jsxs("tr", { children: [
												/* @__PURE__ */ jsx("th", {
													className: "px-3 py-2",
													children: "Name"
												}),
												/* @__PURE__ */ jsx("th", {
													className: "px-3 py-2",
													children: "Email"
												}),
												/* @__PURE__ */ jsx("th", {
													className: "px-3 py-2",
													children: "Status"
												}),
												/* @__PURE__ */ jsx("th", {
													className: "px-3 py-2",
													children: "Issue / Warning"
												})
											] })
										}), /* @__PURE__ */ jsx("tbody", {
											className: "divide-y divide-border/30 font-semibold",
											children: parsedCsvPreview.map((row, rIdx) => /* @__PURE__ */ jsxs("tr", {
												className: row.status === "Invalid" ? "bg-red-500/5 text-red-400" : "text-foreground",
												children: [
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-2",
														children: row.name
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-2",
														children: row.email || "(Missing)"
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-2",
														children: /* @__PURE__ */ jsx("span", {
															className: `px-2 py-0.5 rounded text-[10px] font-bold ${row.status === "Valid" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`,
															children: row.status
														})
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-2 text-muted-foreground text-[10px]",
														children: row.error ? /* @__PURE__ */ jsxs("span", {
															className: "flex items-center gap-1 text-red-400",
															children: [
																/* @__PURE__ */ jsx(AlertTriangle, { className: "w-3 h-3" }),
																" ",
																row.error
															]
														}) : /* @__PURE__ */ jsxs("span", {
															className: "text-emerald-500 flex items-center gap-0.5",
															children: [/* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }), " Ready"]
														})
													})
												]
											}, rIdx))
										})]
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex gap-2 justify-end mt-4",
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => setCsvParsed(false),
										className: "border hover:bg-secondary text-foreground text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer",
										children: "Upload Another"
									}), /* @__PURE__ */ jsx("button", {
										onClick: handleImportValid,
										className: "btn-hero text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer",
										children: "Import Valid Rows"
									})]
								})
							]
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isAddOpen && /* @__PURE__ */ jsx(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: { scale: .95 },
					animate: { scale: 1 },
					exit: { scale: .95 },
					className: "w-full max-w-md glass rounded-2xl p-6 relative",
					children: [
						/* @__PURE__ */ jsx("button", {
							onClick: () => setIsAddOpen(false),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display mb-4",
							children: "Enroll New Student Profile"
						}),
						/* @__PURE__ */ jsx("form", {
							onSubmit: handleAddStudent,
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Full Name"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										placeholder: "e.g. Danny Pink",
										value: addName,
										onChange: (e) => setAddName(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Email Address"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "email",
										placeholder: "danny@example.com",
										value: addEmail,
										onChange: (e) => setAddEmail(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Enrolment Cohort Batch"
									}), /* @__PURE__ */ jsxs("select", {
										value: addBatch,
										onChange: (e) => setAddBatch(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
										children: [/* @__PURE__ */ jsx("option", { children: "Spring Boot Jan 2026" }), /* @__PURE__ */ jsx("option", { children: "React Advanced Cohort" })]
									})] }),
									/* @__PURE__ */ jsx("button", {
										type: "submit",
										className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer",
										children: "Enroll Student Profile"
									})
								]
							})
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: activeStudent && /* @__PURE__ */ jsxs(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-40 bg-background/40 backdrop-blur-sm flex justify-end",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0",
					onClick: () => setActiveStudent(null)
				}), /* @__PURE__ */ jsxs(motion.div, {
					initial: { x: "100%" },
					animate: { x: 0 },
					exit: { x: "100%" },
					transition: {
						type: "spring",
						damping: 25,
						stiffness: 220
					},
					className: "w-full max-w-md bg-card/95 border-l border-border/50 shadow-elegant h-full z-50 p-6 flex flex-col justify-between overflow-y-auto",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between border-b border-border/30 pb-4 mb-5",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "text-lg font-bold text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-primary" }), " Student Details"]
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => setActiveStudent(null),
								className: "h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer transition-colors",
								children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4 mb-6",
							children: [/* @__PURE__ */ jsx("div", {
								className: "h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center font-extrabold text-lg text-primary shadow-sm",
								children: activeStudent.name.split(" ").map((n) => n[0]).join("")
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "font-bold text-lg text-foreground",
								children: activeStudent.name
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: activeStudent.email
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-3 gap-3 mb-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "p-3 bg-secondary/30 rounded-xl border border-border/30 text-center",
									children: [
										/* @__PURE__ */ jsx(CalendarCheck, { className: "w-4 h-4 text-primary mx-auto mb-1" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold",
											children: "Attendance"
										}),
										/* @__PURE__ */ jsxs("strong", {
											className: "block text-sm text-foreground mt-0.5",
											children: [activeStudent.attendance, "%"]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-3 bg-secondary/30 rounded-xl border border-border/30 text-center",
									children: [
										/* @__PURE__ */ jsx(GraduationCap, { className: "w-4 h-4 text-accent mx-auto mb-1" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold",
											children: "Avg GPA"
										}),
										/* @__PURE__ */ jsx("strong", {
											className: "block text-sm text-foreground mt-0.5",
											children: activeStudent.gpa.toFixed(2)
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-3 bg-secondary/30 rounded-xl border border-border/30 text-center",
									children: [
										/* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4 text-teal-500 mx-auto mb-1" }),
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-muted-foreground uppercase font-semibold",
											children: "Progress"
										}),
										/* @__PURE__ */ jsxs("strong", {
											className: "block text-sm text-foreground mt-0.5",
											children: [activeStudent.progress, "%"]
										})
									]
								})
							]
						}),
						activeStudent.scores.length > 0 && /* @__PURE__ */ jsxs("div", {
							className: "space-y-2 mb-6",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Assessment Performance"
							}), /* @__PURE__ */ jsx("div", {
								className: "h-44 w-full bg-secondary/25 border border-border/30 rounded-xl p-2",
								children: /* @__PURE__ */ jsx(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ jsxs(LineChart, {
										data: activeStudent.scores,
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
												dataKey: "name",
												stroke: "var(--muted-foreground)",
												fontSize: 9
											}),
											/* @__PURE__ */ jsx(YAxis, {
												stroke: "var(--muted-foreground)",
												fontSize: 9,
												domain: [0, 100]
											}),
											/* @__PURE__ */ jsx(Tooltip, {}),
											/* @__PURE__ */ jsx(Line, {
												type: "monotone",
												dataKey: "score",
												stroke: "oklch(0.38 0.14 335)",
												strokeWidth: 2.5,
												activeDot: { r: 6 }
											})
										]
									})
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
								children: "Submitted Scores"
							}), /* @__PURE__ */ jsx("div", {
								className: "space-y-2",
								children: activeStudent.scores.length > 0 ? activeStudent.scores.map((s, idx) => /* @__PURE__ */ jsxs("div", {
									className: "flex justify-between items-center p-2.5 rounded-lg bg-secondary/25 border border-border/30 text-xs",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-foreground",
										children: s.name
									}), /* @__PURE__ */ jsxs("span", {
										className: `font-bold px-2 py-0.5 rounded ${s.score >= 80 ? "bg-emerald-500/10 text-emerald-400" : s.score >= 60 ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`,
										children: [s.score, " / 100"]
									})]
								}, idx)) : /* @__PURE__ */ jsx("p", {
									className: "text-xs text-muted-foreground italic text-center py-4",
									children: "No assessments submitted yet."
								})
							})]
						})
					] }), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-3 border-t border-border/30 pt-4 mt-6",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => toast.success(`Alert notification dispatched to ${activeStudent.name}`),
							className: "flex-1 bg-secondary hover:bg-secondary/85 text-foreground py-2 rounded-xl text-xs font-semibold cursor-pointer",
							children: "Send Notice"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => toast.success(`SSO credentials sync requested for ${activeStudent.name}`),
							className: "flex-1 btn-hero py-2 rounded-xl text-xs font-semibold cursor-pointer",
							children: "Sync SSO Profile"
						})]
					})]
				})]
			}) })
		]
	});
}
//#endregion
export { StudentsView as component };
