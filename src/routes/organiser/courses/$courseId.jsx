import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Plus,
  GripVertical,
  FileText,
  Video,
  ChevronDown,
  ChevronUp,
  X,
  Target,
  FileSpreadsheet,
  HelpCircle,
  Trash2,
  Edit3,
  Layers,
  Code
} from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/courses/$courseId")({
  component: CourseBuilderView,
});

const initialSyllabus = [
  {
    id: "m1",
    title: "Module 1: Monolith vs Microservices",
    objectives: "Understand microservices core principles, identify service boundaries, and compare orchestration patterns.",
    submodules: [
      {
        id: "s1",
        title: "Submodule 1.1: Core Principles",
        contents: [
          { id: "c1", type: "video", title: "Video: Journey of Monoliths to Services", duration: "18 mins" },
          { id: "c2", type: "text", title: "Reading: Domain Driven Design Patterns", size: "1200 words" },
        ]
      },
      {
        id: "s2",
        title: "Submodule 1.2: Boundary Design",
        contents: [
          { id: "c3", type: "test", title: "Practical: Service Boundaries Designing Lab", questions: 5 },
        ]
      }
    ],
  },
  {
    id: "m2",
    title: "Module 2: Inter-Service Communications",
    objectives: "Learn synchronous REST/gRPC vs asynchronous messaging using RabbitMQ and Apache Kafka.",
    submodules: [
      {
        id: "s3",
        title: "Submodule 2.1: Synchronous Patterns",
        contents: [
          { id: "c4", type: "video", title: "Video: gRPC Protocols in High-Performance Apps", duration: "25 mins" },
          { id: "c6", type: "table", title: "Grid: REST vs gRPC vs GraphQL Tradeoffs", rows: 12 },
        ]
      }
    ]
  },
];

function CourseBuilderView() {
  const { courseId } = Route.useParams();
  const [syllabus, setSyllabus] = useState(initialSyllabus);
  
  const [activeModuleId, setActiveModuleId] = useState(null); 
  const [activeSubmoduleId, setActiveSubmoduleId] = useState(null);
  
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddSubmoduleOpen, setIsAddSubmoduleOpen] = useState(false);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [isEditingObjectives, setIsEditingObjectives] = useState(false);

  // Forms State
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

  // Module Actions
  const addModule = (e) => {
    e.preventDefault();
    if (!moduleTitle) return;
    const newMod = {
      id: `m${Date.now()}`,
      title: `Module ${syllabus.length + 1}: ${moduleTitle}`,
      objectives: moduleObjectives || "Define target learning objectives.",
      submodules: [],
    };
    setSyllabus([...syllabus, newMod]);
    setModuleTitle("");
    setModuleObjectives("");
    setIsAddModuleOpen(false);
    toast.success("New module added!");
  };

  const deleteModule = (modId) => {
    setSyllabus(syllabus.filter(m => m.id !== modId));
    toast.error("Module removed");
  };

  // Submodule Actions
  const addSubmodule = (e) => {
    e.preventDefault();
    if (!submoduleTitle || !activeModuleId) return;
    setSyllabus(syllabus.map(mod => {
      if (mod.id === activeModuleId) {
        const newSub = {
          id: `s${Date.now()}`,
          title: `Submodule: ${submoduleTitle}`,
          contents: []
        };
        return { ...mod, submodules: [...mod.submodules, newSub] };
      }
      return mod;
    }));
    setSubmoduleTitle("");
    setIsAddSubmoduleOpen(false);
    toast.success("Submodule created!");
  };

  const deleteSubmodule = (modId, subId) => {
    setSyllabus(syllabus.map(mod => {
      if (mod.id === modId) {
        return { ...mod, submodules: mod.submodules.filter(s => s.id !== subId) };
      }
      return mod;
    }));
    toast.error("Submodule removed");
  };

  // Content Actions
  const addContent = (e) => {
    e.preventDefault();
    if (!contentName || !activeModuleId || !activeSubmoduleId) return;

    setSyllabus(syllabus.map(mod => {
      if (mod.id === activeModuleId) {
        return {
          ...mod,
          submodules: mod.submodules.map(sub => {
            if (sub.id === activeSubmoduleId) {
              const newContent = {
                id: `c${Date.now()}`,
                type: contentType,
                title: `${contentType.toUpperCase()}: ${contentName}`,
              };
              if (contentType === "video") newContent.duration = contentDetail || "10 mins";
              else if (contentType === "pdf") newContent.size = contentDetail || "1.5 MB";
              else if (contentType === "ppt") newContent.slides = parseInt(contentDetail) || 15;
              else if (contentType === "test") newContent.questions = parseInt(contentDetail) || 10;
              else if (contentType === "text" || contentType === "code") newContent.size = contentDetail || "Snippet";

              return { ...sub, contents: [...sub.contents, newContent] };
            }
            return sub;
          })
        };
      }
      return mod;
    }));

    setContentName("");
    setContentDetail("");
    setIsAddContentOpen(false);
    toast.success("Content attached to submodule!");
  };

  const deleteContent = (modId, subId, contentId) => {
    setSyllabus(syllabus.map(mod => {
      if (mod.id === modId) {
        return {
          ...mod,
          submodules: mod.submodules.map(sub => {
            if (sub.id === subId) {
              return { ...sub, contents: sub.contents.filter(c => c.id !== contentId) };
            }
            return sub;
          })
        };
      }
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
    
    const updatedSyllabus = nextSyllabus.map((m, idx) => {
      const parts = m.title.split(": ");
      const coreTitle = parts.slice(1).join(": ");
      return { ...m, title: `Module ${idx + 1}: ${coreTitle || parts[0]}` };
    });

    setSyllabus(updatedSyllabus);
    toast.info("Hierarchy updated");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <ModuleHeroBanner
        breadcrumb="Dashboard / Courses / Builder"
        title="Course Syllabus Builder"
        subtitle={`Course ID: ${courseId} — Full Hierarchy Structure`}
        actions={
          <>
            <Link to="/organiser/courses" className="h-10 w-10 rounded-xl border bg-card/80 hover:bg-secondary grid place-items-center transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button onClick={handleSaveSyllabus} disabled={saveLoading} className="btn-hero px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer">
              <Save className="w-4 h-4" /> {saveLoading ? "Saving Changes..." : "Commit Structure"}
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Syllabus Structure</h2>
              <p className="text-xs text-muted-foreground">Manage Modules, Submodules, and atomic Content blocks.</p>
            </div>
            <button onClick={() => setIsAddModuleOpen(true)} className="text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Module
            </button>
          </div>

          <div className="space-y-4">
            {syllabus.map((mod, index) => (
              <div key={mod.id} className="border border-border/40 rounded-xl overflow-hidden glass-strong">
                {/* Module Header */}
                <div className="flex items-center gap-3 p-4 bg-secondary/20 border-b border-border/30">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveModule(index, "up")} disabled={index === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-20 cursor-pointer">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => moveModule(index, "down")} disabled={index === syllabus.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-20 cursor-pointer">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-foreground truncate">{mod.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Target className="w-3 h-3 text-primary" />
                      <p className="text-xs text-muted-foreground line-clamp-1 italic">{mod.objectives}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setActiveModuleId(mod.id); setModuleObjectives(mod.objectives); setIsEditingObjectives(true); }} className="h-8 w-8 rounded-lg hover:bg-secondary grid place-items-center text-muted-foreground hover:text-foreground cursor-pointer" title="Edit objectives">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteModule(mod.id)} className="h-8 w-8 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 grid place-items-center cursor-pointer" title="Remove module">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Submodules Loop */}
                <div className="p-3 space-y-3 bg-card/30">
                  {mod.submodules.map((sub) => (
                    <div key={sub.id} className="border border-primary/20 rounded-lg p-3 bg-background/50">
                      <div className="flex items-center justify-between mb-3 border-b border-border/30 pb-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <Layers className="w-4 h-4 text-primary" />
                          {sub.title}
                        </div>
                        <button onClick={() => deleteSubmodule(mod.id, sub.id)} className="text-muted-foreground hover:text-red-500 transition-colors cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content Loop */}
                      <div className="space-y-2 pl-4 border-l-2 border-primary/10 ml-2">
                        {sub.contents.length > 0 ? (
                          sub.contents.map((content) => (
                            <div key={content.id} className="flex items-center justify-between p-2 rounded-lg glass border border-border/30 group">
                              <div className="flex items-center gap-3">
                                {content.type === "video" && <Video className="w-4 h-4 text-pink-500" />}
                                {content.type === "pdf" && <FileText className="w-4 h-4 text-blue-500" />}
                                {content.type === "ppt" && <FileSpreadsheet className="w-4 h-4 text-amber-500" />}
                                {content.type === "test" && <HelpCircle className="w-4 h-4 text-cyan-500" />}
                                {content.type === "text" && <FileText className="w-4 h-4 text-gray-500" />}
                                {content.type === "code" && <Code className="w-4 h-4 text-emerald-500" />}
                                <span className="text-xs font-semibold text-foreground">{content.title}</span>
                                <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                                  {content.duration || content.size || `${content.slides} slides` || `${content.questions} Qs`}
                                </span>
                              </div>
                              <button onClick={() => deleteContent(mod.id, sub.id, content.id)} className="h-6 w-6 rounded bg-secondary opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 grid place-items-center transition-all cursor-pointer">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-muted-foreground/60 italic">No content blocks added.</p>
                        )}
                        <button onClick={() => { setActiveModuleId(mod.id); setActiveSubmoduleId(sub.id); setIsAddContentOpen(true); }} className="text-[11px] font-bold text-primary hover:text-primary/80 flex items-center gap-1 mt-2 cursor-pointer">
                          <Plus className="w-3 h-3" /> Add Content Block
                        </button>
                      </div>
                    </div>
                  ))}

                  <button onClick={() => { setActiveModuleId(mod.id); setIsAddSubmoduleOpen(true); }} className="w-full py-2 border border-dashed border-border/50 hover:border-primary/55 rounded-lg text-xs font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-background/20">
                    <Plus className="w-3.5 h-3.5" /> Add Submodule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Course Properties</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Cover Thumbnail</label>
                <div className="h-28 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 border flex items-center justify-center text-white font-extrabold uppercase text-lg shadow-sm mt-1">CS-COVER</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Status</span>
                  <span className="block text-sm font-semibold text-foreground mt-0.5">Published Draft</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">University</span>
                  <span className="block text-sm font-semibold text-foreground mt-0.5">Central Academy</span>
                </div>
              </div>
              <hr className="border-border/40" />
              <h3 className="text-xs font-bold text-muted-foreground uppercase">Schema Guidelines</h3>
              <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                <li>Schema: Course &rarr; Module &rarr; Submodule &rarr; Content.</li>
                <li>Content blocks are atomic (video, text, code, file).</li>
                <li>Each submodule acts as a specific topic lesson.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Add Module Modal */}
      <AnimatePresence>
        {isAddModuleOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-lg glass rounded-2xl p-6 relative">
              <button onClick={() => setIsAddModuleOpen(false)} className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              <h2 className="text-xl font-bold font-display mb-4">Add Module</h2>
              <form onSubmit={addModule}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Module Title</label>
                    <input required type="text" value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Learning Objectives</label>
                    <textarea rows={3} value={moduleObjectives} onChange={(e) => setModuleObjectives(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                  </div>
                  <button type="submit" className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer">Add Module</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Submodule Modal */}
      <AnimatePresence>
        {isAddSubmoduleOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-lg glass rounded-2xl p-6 relative">
              <button onClick={() => setIsAddSubmoduleOpen(false)} className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              <h2 className="text-xl font-bold font-display mb-4">Add Submodule</h2>
              <form onSubmit={addSubmodule}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Submodule Title</label>
                    <input required type="text" placeholder="e.g. Introduction to Topic" value={submoduleTitle} onChange={(e) => setSubmoduleTitle(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                  </div>
                  <button type="submit" className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer">Create Submodule</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Content Modal */}
      <AnimatePresence>
        {isAddContentOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-lg glass rounded-2xl p-6 relative">
              <button onClick={() => setIsAddContentOpen(false)} className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"><X className="w-4 h-4 text-muted-foreground" /></button>
              <h2 className="text-xl font-bold font-display mb-4">Attach Content Block</h2>
              <form onSubmit={addContent}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Content Title</label>
                    <input required type="text" placeholder="e.g. Eureka Registration flow" value={contentName} onChange={(e) => setContentName(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Block Type</label>
                      <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                        <option value="video">Video</option>
                        <option value="text">Text/Reading</option>
                        <option value="code">Code Snippet</option>
                        <option value="pdf">PDF Ebook</option>
                        <option value="ppt">PPT Slide Deck</option>
                        <option value="test">Quiz/Test</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Metadata Metric</label>
                      <input required type="text" placeholder="e.g. 15 mins or 10 Qs" value={contentDetail} onChange={(e) => setContentDetail(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                    </div>
                  </div>
                  <button type="submit" className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer">Attach Content</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Objectives Modal */}
      <AnimatePresence>
        {isEditingObjectives && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-lg glass rounded-2xl p-6 relative">
              <button onClick={() => setIsEditingObjectives(false)} className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"><X className="w-4 h-4 text-muted-foreground" /></button>
              <h2 className="text-xl font-bold font-display mb-4">Edit Objectives</h2>
              <div className="space-y-4">
                <textarea rows={4} value={moduleObjectives} onChange={(e) => setModuleObjectives(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                <button onClick={() => { setSyllabus(syllabus.map(m => m.id === activeModuleId ? { ...m, objectives: moduleObjectives } : m)); setIsEditingObjectives(false); toast.success("Objectives updated!"); }} className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer">Save Objectives</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
