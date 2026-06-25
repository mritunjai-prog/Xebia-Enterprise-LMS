import { t as Route } from "./_courseId-fKepfA_a.js";
import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft, ChevronDown, ChevronUp, Code, Edit3, FileSpreadsheet, FileText, HelpCircle, Layers, Plus, Save, Target, Trash2, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/organiser/courses/$courseId.jsx?tsr-split=component
var initialSyllabus = [{
	id: "m1",
	title: "Module 1: Monolith vs Microservices",
	objectives: "Understand microservices core principles, identify service boundaries, and compare orchestration patterns.",
	submodules: [{
		id: "s1",
		title: "Submodule 1.1: Core Principles",
		contents: [{
			id: "c1",
			type: "video",
			title: "Video: Journey of Monoliths to Services",
			duration: "18 mins"
		}, {
			id: "c2",
			type: "text",
			title: "Reading: Domain Driven Design Patterns",
			size: "1200 words"
		}]
	}, {
		id: "s2",
		title: "Submodule 1.2: Boundary Design",
		contents: [{
			id: "c3",
			type: "test",
			title: "Practical: Service Boundaries Designing Lab",
			questions: 5
		}]
	}]
}, {
	id: "m2",
	title: "Module 2: Inter-Service Communications",
	objectives: "Learn synchronous REST/gRPC vs asynchronous messaging using RabbitMQ and Apache Kafka.",
	submodules: [{
		id: "s3",
		title: "Submodule 2.1: Synchronous Patterns",
		contents: [{
			id: "c4",
			type: "video",
			title: "Video: gRPC Protocols in High-Performance Apps",
			duration: "25 mins"
		}, {
			id: "c6",
			type: "table",
			title: "Grid: REST vs gRPC vs GraphQL Tradeoffs",
			rows: 12
		}]
	}]
}];
function CourseBuilderView() {
	const { courseId } = Route.useParams();
	const [syllabus, setSyllabus] = useState(initialSyllabus);
	const [activeModuleId, setActiveModuleId] = useState(null);
	const [activeSubmoduleId, setActiveSubmoduleId] = useState(null);
	const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
	const [isAddSubmoduleOpen, setIsAddSubmoduleOpen] = useState(false);
	const [isAddContentOpen, setIsAddContentOpen] = useState(false);
	const [isEditingObjectives, setIsEditingObjectives] = useState(false);
	const [moduleTitle, setModuleTitle] = useState("");
	const [moduleObjectives, setModuleObjectives] = useState("");
	const [submoduleTitle, setSubmoduleTitle] = useState("");
	const [contentName, setContentName] = useState("");
	const [contentType, setContentType] = useState("video");
	const [contentDetail, setContentDetail] = useState("");
	const [saveLoading, setSaveLoading] = useState(false);
	const handleSaveSyllabus = () => {
		setSaveLoading(true);
		setTimeout(() => {
			setSaveLoading(false);
			toast.success("Syllabus hierarchy saved successfully!");
		}, 1500);
	};
	const addModule = (e) => {
		e.preventDefault();
		if (!moduleTitle) return;
		const newMod = {
			id: `m${Date.now()}`,
			title: `Module ${syllabus.length + 1}: ${moduleTitle}`,
			objectives: moduleObjectives || "Define target learning objectives.",
			submodules: []
		};
		setSyllabus([...syllabus, newMod]);
		setModuleTitle("");
		setModuleObjectives("");
		setIsAddModuleOpen(false);
		toast.success("New module added!");
	};
	const deleteModule = (modId) => {
		setSyllabus(syllabus.filter((m) => m.id !== modId));
		toast.error("Module removed");
	};
	const addSubmodule = (e) => {
		e.preventDefault();
		if (!submoduleTitle || !activeModuleId) return;
		setSyllabus(syllabus.map((mod) => {
			if (mod.id === activeModuleId) {
				const newSub = {
					id: `s${Date.now()}`,
					title: `Submodule: ${submoduleTitle}`,
					contents: []
				};
				return {
					...mod,
					submodules: [...mod.submodules, newSub]
				};
			}
			return mod;
		}));
		setSubmoduleTitle("");
		setIsAddSubmoduleOpen(false);
		toast.success("Submodule created!");
	};
	const deleteSubmodule = (modId, subId) => {
		setSyllabus(syllabus.map((mod) => {
			if (mod.id === modId) return {
				...mod,
				submodules: mod.submodules.filter((s) => s.id !== subId)
			};
			return mod;
		}));
		toast.error("Submodule removed");
	};
	const addContent = (e) => {
		e.preventDefault();
		if (!contentName || !activeModuleId || !activeSubmoduleId) return;
		setSyllabus(syllabus.map((mod) => {
			if (mod.id === activeModuleId) return {
				...mod,
				submodules: mod.submodules.map((sub) => {
					if (sub.id === activeSubmoduleId) {
						const newContent = {
							id: `c${Date.now()}`,
							type: contentType,
							title: `${contentType.toUpperCase()}: ${contentName}`
						};
						if (contentType === "video") newContent.duration = contentDetail || "10 mins";
						else if (contentType === "pdf") newContent.size = contentDetail || "1.5 MB";
						else if (contentType === "ppt") newContent.slides = parseInt(contentDetail) || 15;
						else if (contentType === "test") newContent.questions = parseInt(contentDetail) || 10;
						else if (contentType === "text" || contentType === "code") newContent.size = contentDetail || "Snippet";
						return {
							...sub,
							contents: [...sub.contents, newContent]
						};
					}
					return sub;
				})
			};
			return mod;
		}));
		setContentName("");
		setContentDetail("");
		setIsAddContentOpen(false);
		toast.success("Content attached to submodule!");
	};
	const deleteContent = (modId, subId, contentId) => {
		setSyllabus(syllabus.map((mod) => {
			if (mod.id === modId) return {
				...mod,
				submodules: mod.submodules.map((sub) => {
					if (sub.id === subId) return {
						...sub,
						contents: sub.contents.filter((c) => c.id !== contentId)
					};
					return sub;
				})
			};
			return mod;
		}));
		toast.error("Content block removed");
	};
	const moveModule = (index, direction) => {
		if (direction === "up" && index === 0) return;
		if (direction === "down" && index === syllabus.length - 1) return;
		const newIndex = direction === "up" ? index - 1 : index + 1;
		const nextSyllabus = [...syllabus];
		const temp = nextSyllabus[index];
		nextSyllabus[index] = nextSyllabus[newIndex];
		nextSyllabus[newIndex] = temp;
		setSyllabus(nextSyllabus.map((m, idx) => {
			const parts = m.title.split(": ");
			const coreTitle = parts.slice(1).join(": ");
			return {
				...m,
				title: `Module ${idx + 1}: ${coreTitle || parts[0]}`
			};
		}));
		toast.info("Hierarchy updated");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(ModuleHeroBanner, {
				breadcrumb: "Dashboard / Courses / Builder",
				title: "Course Syllabus Builder",
				subtitle: `Course ID: ${courseId} — Full Hierarchy Structure`,
				actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
					to: "/organiser/courses",
					className: "h-10 w-10 rounded-xl border bg-card/80 hover:bg-secondary grid place-items-center transition-colors cursor-pointer",
					children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-5 h-5 text-muted-foreground" })
				}), /* @__PURE__ */ jsxs("button", {
					onClick: handleSaveSyllabus,
					disabled: saveLoading,
					className: "btn-hero px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer",
					children: [
						/* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
						" ",
						saveLoading ? "Saving Changes..." : "Commit Structure"
					]
				})] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-2 glass rounded-2xl p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between mb-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-foreground",
							children: "Syllabus Structure"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Manage Modules, Submodules, and atomic Content blocks."
						})] }), /* @__PURE__ */ jsxs("button", {
							onClick: () => setIsAddModuleOpen(true),
							className: "text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer",
							children: [/* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }), " Add Module"]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-4",
						children: syllabus.map((mod, index) => /* @__PURE__ */ jsxs("div", {
							className: "border border-border/40 rounded-xl overflow-hidden glass-strong",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 p-4 bg-secondary/20 border-b border-border/30",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1",
										children: [/* @__PURE__ */ jsx("button", {
											onClick: () => moveModule(index, "up"),
											disabled: index === 0,
											className: "text-muted-foreground hover:text-foreground disabled:opacity-20 cursor-pointer",
											children: /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4" })
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => moveModule(index, "down"),
											disabled: index === syllabus.length - 1,
											className: "text-muted-foreground hover:text-foreground disabled:opacity-20 cursor-pointer",
											children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "font-bold text-sm text-foreground truncate",
											children: mod.title
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 mt-1",
											children: [/* @__PURE__ */ jsx(Target, { className: "w-3 h-3 text-primary" }), /* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground line-clamp-1 italic",
												children: mod.objectives
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("button", {
											onClick: () => {
												setActiveModuleId(mod.id);
												setModuleObjectives(mod.objectives);
												setIsEditingObjectives(true);
											},
											className: "h-8 w-8 rounded-lg hover:bg-secondary grid place-items-center text-muted-foreground hover:text-foreground cursor-pointer",
											title: "Edit objectives",
											children: /* @__PURE__ */ jsx(Edit3, { className: "w-4 h-4" })
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => deleteModule(mod.id),
											className: "h-8 w-8 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 grid place-items-center cursor-pointer",
											title: "Remove module",
											children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
										})]
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-3 space-y-3 bg-card/30",
								children: [mod.submodules.map((sub) => /* @__PURE__ */ jsxs("div", {
									className: "border border-primary/20 rounded-lg p-3 bg-background/50",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between mb-3 border-b border-border/30 pb-2",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 text-sm font-semibold text-foreground",
											children: [/* @__PURE__ */ jsx(Layers, { className: "w-4 h-4 text-primary" }), sub.title]
										}), /* @__PURE__ */ jsx("button", {
											onClick: () => deleteSubmodule(mod.id, sub.id),
											className: "text-muted-foreground hover:text-red-500 transition-colors cursor-pointer",
											children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-2 pl-4 border-l-2 border-primary/10 ml-2",
										children: [sub.contents.length > 0 ? sub.contents.map((content) => /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between p-2 rounded-lg glass border border-border/30 group",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [
													content.type === "video" && /* @__PURE__ */ jsx(Video, { className: "w-4 h-4 text-pink-500" }),
													content.type === "pdf" && /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-blue-500" }),
													content.type === "ppt" && /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-4 h-4 text-amber-500" }),
													content.type === "test" && /* @__PURE__ */ jsx(HelpCircle, { className: "w-4 h-4 text-cyan-500" }),
													content.type === "text" && /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-gray-500" }),
													content.type === "code" && /* @__PURE__ */ jsx(Code, { className: "w-4 h-4 text-emerald-500" }),
													/* @__PURE__ */ jsx("span", {
														className: "text-xs font-semibold text-foreground",
														children: content.title
													}),
													/* @__PURE__ */ jsx("span", {
														className: "text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded",
														children: content.duration || content.size || `${content.slides} slides` || `${content.questions} Qs`
													})
												]
											}), /* @__PURE__ */ jsx("button", {
												onClick: () => deleteContent(mod.id, sub.id, content.id),
												className: "h-6 w-6 rounded bg-secondary opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 grid place-items-center transition-all cursor-pointer",
												children: /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })
											})]
										}, content.id)) : /* @__PURE__ */ jsx("p", {
											className: "text-xs text-muted-foreground/60 italic",
											children: "No content blocks added."
										}), /* @__PURE__ */ jsxs("button", {
											onClick: () => {
												setActiveModuleId(mod.id);
												setActiveSubmoduleId(sub.id);
												setIsAddContentOpen(true);
											},
											className: "text-[11px] font-bold text-primary hover:text-primary/80 flex items-center gap-1 mt-2 cursor-pointer",
											children: [/* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }), " Add Content Block"]
										})]
									})]
								}, sub.id)), /* @__PURE__ */ jsxs("button", {
									onClick: () => {
										setActiveModuleId(mod.id);
										setIsAddSubmoduleOpen(true);
									},
									className: "w-full py-2 border border-dashed border-border/50 hover:border-primary/55 rounded-lg text-xs font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-background/20",
									children: [/* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }), " Add Submodule"]
								})]
							})]
						}, mod.id))
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "glass rounded-2xl p-6",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-bold text-foreground mb-4",
							children: "Course Properties"
						}), /* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-[10px] font-bold text-muted-foreground uppercase",
									children: "Cover Thumbnail"
								}), /* @__PURE__ */ jsx("div", {
									className: "h-28 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 border flex items-center justify-center text-white font-extrabold uppercase text-lg shadow-sm mt-1",
									children: "CS-COVER"
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-bold text-muted-foreground uppercase",
										children: "Status"
									}), /* @__PURE__ */ jsx("span", {
										className: "block text-sm font-semibold text-foreground mt-0.5",
										children: "Published Draft"
									})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-bold text-muted-foreground uppercase",
										children: "University"
									}), /* @__PURE__ */ jsx("span", {
										className: "block text-sm font-semibold text-foreground mt-0.5",
										children: "Central Academy"
									})] })]
								}),
								/* @__PURE__ */ jsx("hr", { className: "border-border/40" }),
								/* @__PURE__ */ jsx("h3", {
									className: "text-xs font-bold text-muted-foreground uppercase",
									children: "Schema Guidelines"
								}),
								/* @__PURE__ */ jsxs("ul", {
									className: "text-xs text-muted-foreground space-y-2 list-disc pl-4",
									children: [
										/* @__PURE__ */ jsx("li", { children: "Schema: Course → Module → Submodule → Content." }),
										/* @__PURE__ */ jsx("li", { children: "Content blocks are atomic (video, text, code, file)." }),
										/* @__PURE__ */ jsx("li", { children: "Each submodule acts as a specific topic lesson." })
									]
								})
							]
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isAddModuleOpen && /* @__PURE__ */ jsx(motion.div, {
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
							onClick: () => setIsAddModuleOpen(false),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display mb-4",
							children: "Add Module"
						}),
						/* @__PURE__ */ jsx("form", {
							onSubmit: addModule,
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Module Title"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										value: moduleTitle,
										onChange: (e) => setModuleTitle(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Learning Objectives"
									}), /* @__PURE__ */ jsx("textarea", {
										rows: 3,
										value: moduleObjectives,
										onChange: (e) => setModuleObjectives(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsx("button", {
										type: "submit",
										className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer",
										children: "Add Module"
									})
								]
							})
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isAddSubmoduleOpen && /* @__PURE__ */ jsx(motion.div, {
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
							onClick: () => setIsAddSubmoduleOpen(false),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display mb-4",
							children: "Add Submodule"
						}),
						/* @__PURE__ */ jsx("form", {
							onSubmit: addSubmodule,
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
									children: "Submodule Title"
								}), /* @__PURE__ */ jsx("input", {
									required: true,
									type: "text",
									placeholder: "e.g. Introduction to Topic",
									value: submoduleTitle,
									onChange: (e) => setSubmoduleTitle(e.target.value),
									className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
								})] }), /* @__PURE__ */ jsx("button", {
									type: "submit",
									className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer",
									children: "Create Submodule"
								})]
							})
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isAddContentOpen && /* @__PURE__ */ jsx(motion.div, {
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
							onClick: () => setIsAddContentOpen(false),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display mb-4",
							children: "Attach Content Block"
						}),
						/* @__PURE__ */ jsx("form", {
							onSubmit: addContent,
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Content Title"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										placeholder: "e.g. Eureka Registration flow",
										value: contentName,
										onChange: (e) => setContentName(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Block Type"
										}), /* @__PURE__ */ jsxs("select", {
											value: contentType,
											onChange: (e) => setContentType(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "video",
													children: "Video"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "text",
													children: "Text/Reading"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "code",
													children: "Code Snippet"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "pdf",
													children: "PDF Ebook"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "ppt",
													children: "PPT Slide Deck"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "test",
													children: "Quiz/Test"
												})
											]
										})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Metadata Metric"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: "e.g. 15 mins or 10 Qs",
											value: contentDetail,
											onChange: (e) => setContentDetail(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] })]
									}),
									/* @__PURE__ */ jsx("button", {
										type: "submit",
										className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer",
										children: "Attach Content"
									})
								]
							})
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isEditingObjectives && /* @__PURE__ */ jsx(motion.div, {
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
							onClick: () => setIsEditingObjectives(false),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display mb-4",
							children: "Edit Objectives"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ jsx("textarea", {
								rows: 4,
								value: moduleObjectives,
								onChange: (e) => setModuleObjectives(e.target.value),
								className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => {
									setSyllabus(syllabus.map((m) => m.id === activeModuleId ? {
										...m,
										objectives: moduleObjectives
									} : m));
									setIsEditingObjectives(false);
									toast.success("Objectives updated!");
								},
								className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer",
								children: "Save Objectives"
							})]
						})
					]
				})
			}) })
		]
	});
}
//#endregion
export { CourseBuilderView as component };
