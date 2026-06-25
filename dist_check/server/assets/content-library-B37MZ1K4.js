import { t as ModuleHeroBanner } from "./module-hero-banner-BcJnneqz.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Download, FileSpreadsheet, FileText, FolderOpen, Plus, Search, Table, Trash2, Video, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
//#region src/routes/organiser/content-library/index.jsx?tsr-split=component
var initialAssets = [
	{
		id: "a1",
		type: "pdf",
		title: "Domain Driven Design Guide",
		size: "4.2 MB",
		course: "Enterprise Architecture",
		scope: "University of Tech",
		date: "2026-06-18"
	},
	{
		id: "a2",
		type: "video",
		title: "Monolith to Microservices Journey",
		duration: "18:40",
		course: "Microservices Boot",
		scope: "All",
		date: "2026-06-20"
	},
	{
		id: "a3",
		type: "ppt",
		title: "Event Sourcing Architecture Layout",
		slides: 32,
		course: "Enterprise Architecture",
		scope: "University of Tech",
		date: "2026-06-12"
	},
	{
		id: "a4",
		type: "table",
		title: "gRPC vs REST Benchmarks",
		rows: 6,
		course: "Microservices Boot",
		scope: "All",
		date: "2026-06-22"
	},
	{
		id: "a5",
		type: "notes",
		title: "Sagas Orchestration Checklist",
		words: 850,
		course: "Microservices Boot",
		scope: "Central Academy",
		date: "2026-06-15"
	}
];
function ContentLibraryView() {
	const [assets, setAssets] = useState(initialAssets);
	const [activeTab, setActiveTab] = useState("all");
	const [search, setSearch] = useState("");
	const [isUploadOpen, setIsUploadOpen] = useState(false);
	const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);
	const [uploadTitle, setUploadTitle] = useState("");
	const [uploadType, setUploadType] = useState("pdf");
	const [uploadDetail, setUploadDetail] = useState("");
	const [uploadScope, setUploadScope] = useState("All");
	const [tableName, setTableName] = useState("Technology Comparison");
	const [headers, setHeaders] = useState([
		"Feature",
		"Option A",
		"Option B"
	]);
	const [rows, setRows] = useState([[
		"Performance",
		"Fast execution, moderate memory",
		"Extremely fast, high memory footprint"
	], [
		"Ease of Use",
		"Steep learning curve, rich guides",
		"Simple configuration, plug-and-play"
	]]);
	const [newRowData, setNewRowData] = useState([
		"",
		"",
		""
	]);
	const [generatorLoading, setGeneratorLoading] = useState(false);
	const handleUpload = (e) => {
		e.preventDefault();
		if (!uploadTitle) return;
		setUploadLoading(true);
		setTimeout(() => {
			const newAsset = {
				id: `a${Date.now()}`,
				type: uploadType,
				title: uploadTitle,
				scope: uploadScope,
				course: "General Library",
				date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
			};
			if (uploadType === "pdf") newAsset.size = uploadDetail || "2.1 MB";
			if (uploadType === "video") newAsset.duration = uploadDetail || "12:30";
			if (uploadType === "ppt") newAsset.slides = parseInt(uploadDetail) || 18;
			if (uploadType === "notes") newAsset.words = parseInt(uploadDetail) || 500;
			if (uploadType === "table") newAsset.rows = parseInt(uploadDetail) || 5;
			setAssets([newAsset, ...assets]);
			setUploadLoading(false);
			setIsUploadOpen(false);
			setUploadTitle("");
			setUploadDetail("");
			toast.success("Material asset synced to Content Library!");
		}, 1200);
	};
	const deleteAsset = (id) => {
		setAssets(assets.filter((a) => a.id !== id));
		toast.error("Asset deleted from library");
	};
	const handleAddRow = () => {
		if (newRowData.some((cell) => cell.trim() === "")) {
			toast.warning("Please fill all cells in the row before adding");
			return;
		}
		setRows([...rows, newRowData]);
		setNewRowData([
			"",
			"",
			""
		]);
	};
	const handleSaveTable = () => {
		setGeneratorLoading(true);
		setTimeout(() => {
			setAssets([{
				id: `a${Date.now()}`,
				type: "table",
				title: tableName,
				rows: rows.length,
				scope: "All",
				course: "Comparison Library",
				date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
			}, ...assets]);
			setGeneratorLoading(false);
			setIsGeneratorOpen(false);
			setRows([[
				"Performance",
				"Fast execution, moderate memory",
				"Extremely fast, high memory footprint"
			], [
				"Ease of Use",
				"Steep learning curve, rich guides",
				"Simple configuration, plug-and-play"
			]]);
			setTableName("Technology Comparison");
			toast.success("Comparison table generated and added to library!");
		}, 1200);
	};
	const filteredAssets = assets.filter((a) => {
		const matchesTab = activeTab === "all" || a.type === activeTab;
		const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.course.toLowerCase().includes(search.toLowerCase());
		return matchesTab && matchesSearch;
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
		children: [
			/* @__PURE__ */ jsx(ModuleHeroBanner, {
				breadcrumb: "Dashboard / Content Library",
				title: "Content Library",
				subtitle: "Upload lecture notes, slides, PDFs, comparison sheets, and organize learning materials.",
				actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("button", {
					onClick: () => setIsGeneratorOpen(true),
					className: "border hover:bg-secondary flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer transition-colors",
					children: [/* @__PURE__ */ jsx(Table, { className: "w-4 h-4 text-accent" }), " Matrix Table Generator"]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: () => setIsUploadOpen(true),
					className: "btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer",
					children: [/* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }), " Upload Material"]
				})] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex flex-wrap gap-1.5 p-1 rounded-xl bg-secondary/60 border border-border/40 w-full md:w-auto",
					children: [
						{
							id: "all",
							label: "All Items",
							icon: FolderOpen
						},
						{
							id: "pdf",
							label: "PDF Documents",
							icon: FileText
						},
						{
							id: "ppt",
							label: "Slides PPT",
							icon: FileSpreadsheet
						},
						{
							id: "video",
							label: "Videos",
							icon: Video
						},
						{
							id: "table",
							label: "Matrix Tables",
							icon: Table
						},
						{
							id: "notes",
							label: "Notes",
							icon: FileText
						}
					].map((tab) => /* @__PURE__ */ jsxs("button", {
						onClick: () => setActiveTab(tab.id),
						className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-card/30"}`,
						children: [/* @__PURE__ */ jsx(tab.icon, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ jsx("span", { children: tab.label })]
					}, tab.id))
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative w-full md:max-w-xs",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
						type: "text",
						placeholder: "Search assets by title...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
					})]
				})]
			}),
			filteredAssets.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: filteredAssets.map((asset) => /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						scale: .96
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					className: "glass rounded-xl p-5 border-border/40 flex flex-col justify-between hover:border-primary/20 transition-all duration-200 group",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex items-start justify-between",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: `p-2.5 rounded-xl border border-border/40 bg-card ${asset.type === "pdf" ? "text-blue-500" : asset.type === "video" ? "text-pink-500" : asset.type === "ppt" ? "text-amber-500" : asset.type === "table" ? "text-accent" : "text-purple-500"}`,
								children: [
									asset.type === "pdf" && /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }),
									asset.type === "video" && /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
									asset.type === "ppt" && /* @__PURE__ */ jsx(FileSpreadsheet, { className: "w-5 h-5" }),
									asset.type === "table" && /* @__PURE__ */ jsx(Table, { className: "w-5 h-5" }),
									asset.type === "notes" && /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" })
								]
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-bold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors",
								children: asset.title
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-[10px] text-muted-foreground uppercase font-semibold",
								children: [
									asset.type,
									" • ",
									asset.size || asset.duration || `${asset.slides} slides` || `${asset.words} words` || `${asset.rows} rows`
								]
							})] })]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-3 mt-4 pt-3 border-t border-border/30",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between items-center text-[10px] text-muted-foreground font-semibold",
							children: [/* @__PURE__ */ jsxs("span", { children: ["Scope: ", asset.scope] }), /* @__PURE__ */ jsxs("span", { children: ["Uploaded ", asset.date] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ jsx("button", {
									onClick: () => toast.success("Asset attached to course outline!"),
									className: "flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold py-1.5 rounded-lg transition-colors cursor-pointer",
									children: "Attach to Course"
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => toast.success("Simulated downloading file..."),
									className: "h-8 w-8 rounded-lg border hover:bg-secondary text-muted-foreground hover:text-foreground grid place-items-center cursor-pointer transition-colors",
									children: /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" })
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: () => deleteAsset(asset.id),
									className: "h-8 w-8 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 grid place-items-center cursor-pointer transition-colors",
									children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
								})
							]
						})]
					})]
				}, asset.id))
			}) : /* @__PURE__ */ jsxs("div", {
				className: "glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed",
				children: [
					/* @__PURE__ */ jsx(FolderOpen, { className: "w-12 h-12 text-muted-foreground/60 mb-3" }),
					/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-bold text-foreground",
						children: "No Materials Found"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground max-w-sm mt-1",
						children: "There are no documents or videos inside this category matching your query."
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setIsUploadOpen(true),
						className: "btn-hero px-4 py-2 rounded-xl text-xs font-bold mt-4 cursor-pointer",
						children: "Upload First Asset"
					})
				]
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isUploadOpen && /* @__PURE__ */ jsx(motion.div, {
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
							onClick: () => setIsUploadOpen(false),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-bold font-display mb-4",
							children: "Upload Study Material"
						}),
						/* @__PURE__ */ jsx("form", {
							onSubmit: handleUpload,
							children: /* @__PURE__ */ jsxs("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "Asset Title"
									}), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										placeholder: "e.g. Sagas Patterns Design Layout",
										value: uploadTitle,
										onChange: (e) => setUploadTitle(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Asset Type"
										}), /* @__PURE__ */ jsxs("select", {
											value: uploadType,
											onChange: (e) => setUploadType(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "pdf",
													children: "PDF Ebook"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "ppt",
													children: "PPT Slide Deck"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "video",
													children: "Video Lecture"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "notes",
													children: "Notes / Text"
												})
											]
										})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Metric Detail"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											placeholder: uploadType === "pdf" ? "e.g. 2.4 MB" : uploadType === "video" ? "e.g. 15:45" : uploadType === "ppt" ? "e.g. 24 slides" : "e.g. 800 words",
											value: uploadDetail,
											onChange: (e) => setUploadDetail(e.target.value),
											className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
										})] })]
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "University Compatibility"
									}), /* @__PURE__ */ jsxs("select", {
										value: uploadScope,
										onChange: (e) => setUploadScope(e.target.value),
										className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "All",
												children: "All Scopes"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "University of Tech",
												children: "University of Tech"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "Central Academy",
												children: "Central Academy"
											})
										]
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
										children: "File Target"
									}), /* @__PURE__ */ jsxs("div", {
										className: "border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:bg-secondary/20 transition-all cursor-pointer",
										children: [
											/* @__PURE__ */ jsx(FolderOpen, { className: "w-8 h-8 text-primary mx-auto mb-2 animate-bounce" }),
											/* @__PURE__ */ jsx("span", {
												className: "text-xs font-bold",
												children: "Select PDF, PPTX or MP4"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-[10px] text-muted-foreground mt-0.5",
												children: "Files are automatically virus scanned & encrypted"
											})
										]
									})] }),
									/* @__PURE__ */ jsx("button", {
										type: "submit",
										disabled: uploadLoading,
										className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer",
										children: uploadLoading ? "Uploading to Cloud Library..." : "Sync Asset Material"
									})
								]
							})
						})
					]
				})
			}) }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isGeneratorOpen && /* @__PURE__ */ jsx(motion.div, {
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
							onClick: () => setIsGeneratorOpen(false),
							className: "absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted-foreground" })
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "text-xl font-bold font-display mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Table, { className: "w-5 h-5 text-accent" }), " Comparison Matrix Constructor"]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground mb-4",
							children: "Create side-by-side matrices comparing technologies or theories."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
									children: "Matrix Title"
								}), /* @__PURE__ */ jsx("input", {
									required: true,
									type: "text",
									placeholder: "e.g. gRPC vs REST API Models",
									value: tableName,
									onChange: (e) => setTableName(e.target.value),
									className: "w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary font-bold"
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Col 1 Header (Feature)"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											value: headers[0],
											onChange: (e) => setHeaders([
												e.target.value,
												headers[1],
												headers[2]
											]),
											className: "w-full px-3 py-1.5 border rounded-lg bg-background outline-none text-xs focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Col 2 Header (Option A)"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											value: headers[1],
											onChange: (e) => setHeaders([
												headers[0],
												e.target.value,
												headers[2]
											]),
											className: "w-full px-3 py-1.5 border rounded-lg bg-background outline-none text-xs focus:border-primary"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs font-bold text-muted-foreground uppercase block mb-1",
											children: "Col 3 Header (Option B)"
										}), /* @__PURE__ */ jsx("input", {
											required: true,
											type: "text",
											value: headers[2],
											onChange: (e) => setHeaders([
												headers[0],
												headers[1],
												e.target.value
											]),
											className: "w-full px-3 py-1.5 border rounded-lg bg-background outline-none text-xs focus:border-primary"
										})] })
									]
								}),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-bold text-muted-foreground uppercase block mb-1.5",
									children: "Row Points"
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-2 max-h-40 overflow-y-auto pr-1",
									children: rows.map((row, rIdx) => /* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-12 gap-2 items-center bg-secondary/35 p-2 rounded-lg border border-border/30",
										children: [
											/* @__PURE__ */ jsx("span", {
												className: "col-span-3 text-xs font-bold text-foreground line-clamp-1",
												children: row[0]
											}),
											/* @__PURE__ */ jsx("span", {
												className: "col-span-4 text-xs text-muted-foreground line-clamp-1",
												children: row[1]
											}),
											/* @__PURE__ */ jsx("span", {
												className: "col-span-4 text-xs text-muted-foreground line-clamp-1",
												children: row[2]
											}),
											/* @__PURE__ */ jsx("button", {
												onClick: () => setRows(rows.filter((_, i) => i !== rIdx)),
												className: "col-span-1 h-6 w-6 rounded bg-card hover:bg-red-500/10 hover:text-red-500 grid place-items-center text-muted-foreground cursor-pointer transition-colors",
												children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
											})
										]
									}, rIdx))
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "border border-dashed p-3.5 rounded-xl space-y-2 bg-background/40",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[10px] font-bold text-muted-foreground uppercase",
										children: "Append Row Data"
									}), /* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-12 gap-2",
										children: [
											/* @__PURE__ */ jsx("input", {
												type: "text",
												placeholder: "Comparison Point",
												value: newRowData[0],
												onChange: (e) => setNewRowData([
													e.target.value,
													newRowData[1],
													newRowData[2]
												]),
												className: "col-span-3 px-2 py-1.5 border rounded bg-background outline-none text-xs focus:border-primary"
											}),
											/* @__PURE__ */ jsx("input", {
												type: "text",
												placeholder: `Detail for ${headers[1]}`,
												value: newRowData[1],
												onChange: (e) => setNewRowData([
													newRowData[0],
													e.target.value,
													newRowData[2]
												]),
												className: "col-span-4 px-2 py-1.5 border rounded bg-background outline-none text-xs focus:border-primary"
											}),
											/* @__PURE__ */ jsx("input", {
												type: "text",
												placeholder: `Detail for ${headers[2]}`,
												value: newRowData[2],
												onChange: (e) => setNewRowData([
													newRowData[0],
													newRowData[1],
													e.target.value
												]),
												className: "col-span-4 px-2 py-1.5 border rounded bg-background outline-none text-xs focus:border-primary"
											}),
											/* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: handleAddRow,
												className: "col-span-1 h-7.5 w-full bg-primary text-primary-foreground rounded grid place-items-center cursor-pointer hover:opacity-90",
												children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "border border-border/50 rounded-xl overflow-hidden bg-card/45",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "bg-secondary/40 border-b border-border/30 p-2.5 text-center font-bold text-xs",
										children: ["LIVE PREVIEW: ", tableName]
									}), /* @__PURE__ */ jsxs("table", {
										className: "w-full text-[11px] text-left",
										children: [/* @__PURE__ */ jsx("thead", {
											className: "bg-secondary/20 text-muted-foreground border-b border-border/30",
											children: /* @__PURE__ */ jsx("tr", { children: headers.map((h, idx) => /* @__PURE__ */ jsx("th", {
												className: "px-3 py-2 font-bold",
												children: h
											}, idx)) })
										}), /* @__PURE__ */ jsx("tbody", {
											className: "divide-y divide-border/30 font-medium",
											children: rows.map((row, rIdx) => /* @__PURE__ */ jsxs("tr", {
												className: "hover:bg-secondary/10",
												children: [
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-2 text-foreground font-bold",
														children: row[0]
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-2 text-muted-foreground",
														children: row[1]
													}),
													/* @__PURE__ */ jsx("td", {
														className: "px-3 py-2 text-muted-foreground",
														children: row[2]
													})
												]
											}, rIdx))
										})]
									})]
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: handleSaveTable,
									disabled: generatorLoading || rows.length === 0,
									className: "w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer flex items-center justify-center",
									children: generatorLoading ? "Saving table in library..." : "Compile & Save Comparison Matrix"
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
export { ContentLibraryView as component };
