import { t as useAppStore } from "./useAppStore-B_rgJZsS.js";
import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, ChevronLeft, Code, FileText, Globe, GripVertical, Image, Layers, Link as Link$1, Plus, Settings, Trash2, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//#region src/admin/pages/Courses/HierarchyBuilder.jsx
var initialModules = [{
	id: "m1",
	title: "Module 1: Introduction to Architecture",
	description: "Foundational concepts of enterprise scale systems.",
	orderIndex: 1,
	submodules: [{
		id: "sm1",
		title: "The Monolith vs Microservices",
		description: "Analyzing the trade-offs of monolithic design.",
		metaTitle: "Monolith vs Microservices | Architecture",
		metaDescription: "Learn the core differences.",
		canonicalUrl: "/learn/architecture/monolith",
		contentBlocks: [{
			id: "c1",
			type: "VIDEO",
			title: "Video Lecture",
			videoUrl: "https://youtube.com/watch?v=123",
			orderIndex: 1
		}, {
			id: "c2",
			type: "PDF",
			title: "Architecture Diagram PDF",
			documentUrl: "/docs/arch.pdf",
			orderIndex: 2
		}]
	}]
}];
function HierarchyBuilder() {
	const router = useRouter();
	const { addToast } = useAppStore();
	const [modules, setModules] = useState(() => {
		const saved = localStorage.getItem("lms_hierarchy_v1");
		if (saved) try {
			return JSON.parse(saved);
		} catch (e) {}
		return initialModules;
	});
	useEffect(() => {
		localStorage.setItem("lms_hierarchy_v1", JSON.stringify(modules));
	}, [modules]);
	const [expandedModules, setExpandedModules] = useState(["m1"]);
	const [expandedSubmodules, setExpandedSubmodules] = useState(["sm1"]);
	const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
	const [isSubmoduleModalOpen, setIsSubmoduleModalOpen] = useState(false);
	const [isContentModalOpen, setIsContentModalOpen] = useState(false);
	const [targetModuleId, setTargetModuleId] = useState(null);
	const [targetSubmoduleId, setTargetSubmoduleId] = useState(null);
	const [moduleForm, setModuleForm] = useState({
		title: "",
		description: "",
		orderIndex: 1
	});
	const [submoduleForm, setSubmoduleForm] = useState({
		title: "",
		description: "",
		metaTitle: "",
		metaDescription: "",
		canonicalUrl: ""
	});
	const [contentForm, setContentForm] = useState({
		type: "VIDEO",
		title: "",
		videoUrl: "",
		textContent: "",
		documentUrl: ""
	});
	const toggleModule = (id) => {
		setExpandedModules((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
	};
	const toggleSubmodule = (id) => {
		setExpandedSubmodules((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
	};
	const handleAddModule = (e) => {
		e.preventDefault();
		const newModule = {
			id: `m${Date.now()}`,
			...moduleForm,
			submodules: []
		};
		setModules([...modules, newModule]);
		setExpandedModules([...expandedModules, newModule.id]);
		setIsModuleModalOpen(false);
		addToast("Module Created Successfully", "success");
	};
	const handleAddSubmodule = (e) => {
		e.preventDefault();
		if (!targetModuleId) return;
		const newSubmodule = {
			id: `sm${Date.now()}`,
			...submoduleForm,
			contentBlocks: []
		};
		setModules(modules.map((mod) => {
			if (mod.id === targetModuleId) return {
				...mod,
				submodules: [...mod.submodules, newSubmodule]
			};
			return mod;
		}));
		setExpandedSubmodules([...expandedSubmodules, newSubmodule.id]);
		setIsSubmoduleModalOpen(false);
		addToast("Submodule Initialized with SEO Metadata", "success");
	};
	const handleAddContent = (e) => {
		e.preventDefault();
		if (!targetModuleId || !targetSubmoduleId) return;
		const newContent = {
			id: `c${Date.now()}`,
			...contentForm,
			orderIndex: 1
		};
		setModules(modules.map((mod) => {
			if (mod.id === targetModuleId) return {
				...mod,
				submodules: mod.submodules.map((sub) => {
					if (sub.id === targetSubmoduleId) return {
						...sub,
						contentBlocks: [...sub.contentBlocks, newContent]
					};
					return sub;
				})
			};
			return mod;
		}));
		setIsContentModalOpen(false);
		addToast("Content Block Attached to Submodule", "success");
	};
	const getContentIcon = (type) => {
		switch (type) {
			case "VIDEO": return /* @__PURE__ */ jsx(Video, { className: "w-4 h-4 text-red-500" });
			case "TEXT": return /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-blue-500" });
			case "CODE": return /* @__PURE__ */ jsx(Code, { className: "w-4 h-4 text-purple-500" });
			case "PDF": return /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 text-amber-500" });
			default: return /* @__PURE__ */ jsx(Link$1, { className: "w-4 h-4 text-emerald-500" });
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-[100] bg-background flex flex-col animate-in slide-in-from-bottom-8 duration-500",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "h-16 border-b border-border/40 bg-secondary/30 flex items-center justify-between px-6 shrink-0",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => router.history.back(),
						className: "h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer group",
						children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5 text-muted-foreground group-hover:text-foreground" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold uppercase tracking-widest text-indigo-500",
								children: "Course Hierarchy Builder"
							}),
							/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500/50" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
								children: "Admin Mode"
							})
						]
					}), /* @__PURE__ */ jsx("h1", {
						className: "text-lg font-bold text-foreground",
						children: "Enterprise Architecture Patterns"
					})] })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsxs("button", {
						className: "px-4 py-2 rounded-xl text-sm font-semibold border border-border/50 bg-background hover:bg-secondary transition-colors flex items-center gap-2 cursor-pointer shadow-sm",
						children: [/* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" }), " Builder Settings"]
					}), /* @__PURE__ */ jsxs("button", {
						className: "px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-colors flex items-center gap-2 cursor-pointer",
						children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }), " Publish Curriculum"]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex-1 flex overflow-hidden",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex-1 overflow-y-auto p-8 relative bg-[#f8fafc] dark:bg-[#0a0a0a]",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-4xl mx-auto space-y-6 pb-32",
						children: [modules.map((module, mIdx) => /* @__PURE__ */ jsxs(motion.div, {
							layout: true,
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "glass rounded-2xl border border-indigo-500/20 overflow-hidden shadow-sm",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "p-5 flex items-center justify-between bg-indigo-500/5 border-b border-indigo-500/10 cursor-pointer hover:bg-indigo-500/10 transition-colors",
								onClick: () => toggleModule(module.id),
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "cursor-grab text-muted-foreground hover:text-foreground",
											onClick: (e) => e.stopPropagation(),
											children: /* @__PURE__ */ jsx(GripVertical, { className: "w-5 h-5" })
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20",
											children: ["M", mIdx + 1]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
											className: "text-lg font-bold text-foreground",
											children: module.title
										}), /* @__PURE__ */ jsx("p", {
											className: "text-sm text-muted-foreground",
											children: module.description
										})] })
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									onClick: (e) => e.stopPropagation(),
									children: [/* @__PURE__ */ jsx("button", {
										onClick: () => {
											setTargetModuleId(module.id);
											setSubmoduleForm({
												title: "",
												description: "",
												metaTitle: "",
												metaDescription: "",
												canonicalUrl: ""
											});
											setIsSubmoduleModalOpen(true);
										},
										className: "px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 font-bold text-xs hover:bg-indigo-500/20 transition-colors cursor-pointer",
										children: "+ Add Submodule"
									}), /* @__PURE__ */ jsx("button", {
										className: "p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer",
										children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
									})]
								})]
							}), /* @__PURE__ */ jsx(AnimatePresence, { children: expandedModules.includes(module.id) && /* @__PURE__ */ jsx(motion.div, {
								initial: { height: 0 },
								animate: { height: "auto" },
								exit: { height: 0 },
								className: "overflow-hidden",
								children: /* @__PURE__ */ jsx("div", {
									className: "p-4 space-y-4 bg-background",
									children: module.submodules.length === 0 ? /* @__PURE__ */ jsxs("div", {
										className: "p-6 border-2 border-dashed border-border/50 rounded-xl text-center",
										children: [
											/* @__PURE__ */ jsx(Layers, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm font-semibold text-foreground",
												children: "No submodules yet"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-xs text-muted-foreground",
												children: "Add a submodule to start building the lesson structure."
											})
										]
									}) : module.submodules.map((submod, smIdx) => /* @__PURE__ */ jsxs("div", {
										className: "border border-border/60 rounded-xl overflow-hidden shadow-sm",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "p-4 flex items-center justify-between bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors",
											onClick: () => toggleSubmodule(submod.id),
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ jsx("div", {
													className: "cursor-grab text-muted-foreground hover:text-foreground",
													onClick: (e) => e.stopPropagation(),
													children: /* @__PURE__ */ jsx(GripVertical, { className: "w-4 h-4" })
												}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ jsxs("h3", {
														className: "text-sm font-bold text-foreground",
														children: [
															mIdx + 1,
															".",
															smIdx + 1,
															" ",
															submod.title
														]
													}), /* @__PURE__ */ jsx("span", {
														className: "bg-amber-500/10 text-amber-600 text-[10px] px-1.5 py-0.5 rounded font-bold border border-amber-500/20",
														title: "SEO Canonical Path",
														children: submod.canonicalUrl
													})]
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xs text-muted-foreground mt-0.5",
													children: submod.description
												})] })]
											}), /* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2",
												onClick: (e) => e.stopPropagation(),
												children: [/* @__PURE__ */ jsx("button", {
													onClick: () => {
														setTargetModuleId(module.id);
														setTargetSubmoduleId(submod.id);
														setContentForm({
															type: "VIDEO",
															title: "",
															videoUrl: "",
															textContent: "",
															documentUrl: ""
														});
														setIsContentModalOpen(true);
													},
													className: "px-3 py-1.5 rounded-lg border border-border/60 bg-background text-xs font-bold hover:bg-secondary transition-colors cursor-pointer",
													children: "+ Attach Content Block"
												}), /* @__PURE__ */ jsx("button", {
													className: "p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer",
													children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
												})]
											})]
										}), /* @__PURE__ */ jsx(AnimatePresence, { children: expandedSubmodules.includes(submod.id) && /* @__PURE__ */ jsx(motion.div, {
											initial: { height: 0 },
											animate: { height: "auto" },
											exit: { height: 0 },
											className: "overflow-hidden",
											children: /* @__PURE__ */ jsx("div", {
												className: "p-3 bg-background/50 border-t border-border/50 flex flex-col gap-2",
												children: submod.contentBlocks.length === 0 ? /* @__PURE__ */ jsx("p", {
													className: "text-xs text-center py-4 text-muted-foreground",
													children: "No content blocks attached. This submodule is empty."
												}) : submod.contentBlocks.map((content) => /* @__PURE__ */ jsxs("div", {
													className: "flex items-center justify-between p-3 rounded-lg bg-background border border-border/50 shadow-sm group",
													children: [/* @__PURE__ */ jsxs("div", {
														className: "flex items-center gap-3",
														children: [
															/* @__PURE__ */ jsx("div", {
																className: "cursor-grab text-muted-foreground hover:text-foreground",
																children: /* @__PURE__ */ jsx(GripVertical, { className: "w-4 h-4" })
															}),
															/* @__PURE__ */ jsx("div", {
																className: "w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center",
																children: getContentIcon(content.type)
															}),
															/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
																className: "text-sm font-semibold text-foreground",
																children: content.title
															}), /* @__PURE__ */ jsx("p", {
																className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest",
																children: content.type
															})] })
														]
													}), /* @__PURE__ */ jsx("button", {
														className: "opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-500 transition-all cursor-pointer",
														children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
													})]
												}, content.id))
											})
										}) })]
									}, submod.id))
								})
							}) })]
						}, module.id)), /* @__PURE__ */ jsxs("button", {
							onClick: () => {
								setModuleForm({
									title: "",
									description: "",
									orderIndex: modules.length + 1
								});
								setIsModuleModalOpen(true);
							},
							className: "w-full py-6 rounded-2xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 text-indigo-600 font-bold hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm",
							children: [/* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }), " Add New Module"]
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isModuleModalOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[110] bg-background/50 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						scale: .95,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .95,
						opacity: 0
					},
					className: "w-full max-w-lg glass rounded-2xl p-6 border border-border/40 shadow-2xl",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center mb-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display text-foreground",
							children: "Create Module"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Maps to ModuleEntity. Top-level course chapter."
						})] }), /* @__PURE__ */ jsx("button", {
							onClick: () => setIsModuleModalOpen(false),
							className: "h-8 w-8 rounded-full hover:bg-secondary grid place-items-center",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleAddModule,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
								children: "Module Title"
							}), /* @__PURE__ */ jsx("input", {
								required: true,
								type: "text",
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-indigo-500 outline-none",
								value: moduleForm.title,
								onChange: (e) => setModuleForm({
									...moduleForm,
									title: e.target.value
								})
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
								children: "Description"
							}), /* @__PURE__ */ jsx("textarea", {
								rows: 3,
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-indigo-500 outline-none resize-none",
								value: moduleForm.description,
								onChange: (e) => setModuleForm({
									...moduleForm,
									description: e.target.value
								})
							})] }),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "w-full py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20 mt-4",
								children: "Save Module"
							})
						]
					})]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isSubmoduleModalOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[110] bg-background/50 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						scale: .95,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .95,
						opacity: 0
					},
					className: "w-full max-w-xl glass rounded-2xl p-6 border border-border/40 shadow-2xl",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center mb-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display text-foreground",
							children: "Create Submodule"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Maps to SubmoduleEntity. Contains intense SEO configurations."
						})] }), /* @__PURE__ */ jsx("button", {
							onClick: () => setIsSubmoduleModalOpen(false),
							className: "h-8 w-8 rounded-full hover:bg-secondary grid place-items-center",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleAddSubmodule,
						className: "space-y-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "col-span-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
										children: "Submodule Topic Title"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none",
										value: submoduleForm.title,
										onChange: (e) => setSubmoduleForm({
											...submoduleForm,
											title: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "col-span-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
										children: "Brief Description"
									}), /* @__PURE__ */ jsx("textarea", {
										rows: 2,
										className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none resize-none",
										value: submoduleForm.description,
										onChange: (e) => setSubmoduleForm({
											...submoduleForm,
											description: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "col-span-2 border-t border-border/50 pt-4 mt-2",
									children: /* @__PURE__ */ jsxs("p", {
										className: "text-xs font-bold text-amber-500 uppercase tracking-widest mb-4 flex items-center gap-2",
										children: [/* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5" }), " SEO Metadata Wrapper"]
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "col-span-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
										children: "Canonical URL Slug"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										placeholder: "/learn/topic-name",
										className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none font-mono",
										value: submoduleForm.canonicalUrl,
										onChange: (e) => setSubmoduleForm({
											...submoduleForm,
											canonicalUrl: e.target.value
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
									children: "Meta Title"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none",
									value: submoduleForm.metaTitle,
									onChange: (e) => setSubmoduleForm({
										...submoduleForm,
										metaTitle: e.target.value
									})
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
									children: "Meta Description"
								}), /* @__PURE__ */ jsx("input", {
									type: "text",
									className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none",
									value: submoduleForm.metaDescription,
									onChange: (e) => setSubmoduleForm({
										...submoduleForm,
										metaDescription: e.target.value
									})
								})] })
							]
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "w-full py-3 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 mt-4",
							children: "Save Submodule Container"
						})]
					})]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isContentModalOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-[110] bg-background/50 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						scale: .95,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .95,
						opacity: 0
					},
					className: "w-full max-w-md glass rounded-2xl p-6 border border-border/40 shadow-2xl",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between items-center mb-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display text-foreground",
							children: "Attach Content Block"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground",
							children: "Maps to ContentEntity. The atomic learning material."
						})] }), /* @__PURE__ */ jsx("button", {
							onClick: () => setIsContentModalOpen(false),
							className: "h-8 w-8 rounded-full hover:bg-secondary grid place-items-center",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
						})]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleAddContent,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
								children: "Content Asset Type"
							}), /* @__PURE__ */ jsxs("select", {
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none cursor-pointer",
								value: contentForm.type,
								onChange: (e) => setContentForm({
									...contentForm,
									type: e.target.value
								}),
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "VIDEO",
										children: "▶️ Video Lecture (YouTube/Direct)"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "TEXT",
										children: "📝 Rich Text Article"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "PDF",
										children: "📄 PDF Document"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "CODE",
										children: "💻 Code Playground / Snippet"
									})
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
								children: "Content Block Title"
							}), /* @__PURE__ */ jsx("input", {
								required: true,
								type: "text",
								placeholder: "e.g. Setting up the environment",
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none",
								value: contentForm.title,
								onChange: (e) => setContentForm({
									...contentForm,
									title: e.target.value
								})
							})] }),
							contentForm.type === "VIDEO" && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
								children: "Video URL"
							}), /* @__PURE__ */ jsx("input", {
								required: true,
								type: "url",
								placeholder: "https://youtube.com/...",
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none",
								value: contentForm.videoUrl,
								onChange: (e) => setContentForm({
									...contentForm,
									videoUrl: e.target.value
								})
							})] }),
							contentForm.type === "TEXT" && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
								children: "Text Content (Markdown Support)"
							}), /* @__PURE__ */ jsx("textarea", {
								required: true,
								rows: 5,
								className: "w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none resize-none",
								value: contentForm.textContent,
								onChange: (e) => setContentForm({
									...contentForm,
									textContent: e.target.value
								})
							})] }),
							(contentForm.type === "PDF" || contentForm.type === "CODE") && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
								children: "Document / Repo Link"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									required: true,
									type: "text",
									placeholder: contentForm.type === "PDF" ? "https://.../doc.pdf" : "https://github.com/...",
									className: "flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none",
									value: contentForm.documentUrl,
									onChange: (e) => setContentForm({
										...contentForm,
										documentUrl: e.target.value
									})
								}), /* @__PURE__ */ jsxs("label", {
									className: "shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold",
									title: "Upload File",
									children: [/* @__PURE__ */ jsx("svg", {
										className: "w-4 h-4",
										fill: "none",
										stroke: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ jsx("path", {
											strokeLinecap: "round",
											strokeLinejoin: "round",
											strokeWidth: 2,
											d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
										})
									}), /* @__PURE__ */ jsx("input", {
										type: "file",
										className: "hidden",
										accept: contentForm.type === "PDF" ? ".pdf" : "*",
										onChange: (e) => {
											if (e.target.files && e.target.files[0]) {
												new FileReader().readAsDataURL(e.target.files[0]);
												setContentForm({
													...contentForm,
													documentUrl: url
												});
											}
										}
									})]
								})]
							})] }),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "w-full py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 mt-4",
								children: "Attach Content Asset"
							})
						]
					})]
				})
			}) })
		]
	});
}
//#endregion
//#region src/routes/admin/courses/builder.jsx?tsr-split=component
var SplitComponent = HierarchyBuilder;
//#endregion
export { SplitComponent as component };
