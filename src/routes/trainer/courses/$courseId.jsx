import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Save, Plus, GripVertical, FileText, Video, MoreVertical, Edit2, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/trainer/courses/$courseId")({
  component: CourseBuilderView,
});

const initialModules = [
  {
    id: 1,
    title: "Module 1: Introduction to Microservices",
    items: [
      { id: 101, type: "video", title: "Video: Monolith to Microservice Journey" },
      { id: 102, type: "pdf", title: "PDF: Architecture Cheat Sheet" }
    ]
  },
  {
    id: 2,
    title: "Module 2: Event-Driven Patterns",
    items: []
  },
];

function CourseBuilderView() {
  const { courseId } = Route.useParams();
  const [modules, setModules] = useState(initialModules);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const deleteModule = (id) => {
    if(confirm("Are you sure you want to delete this module?")) {
      setModules(modules.filter(m => m.id !== id));
      toast.error("Module deleted successfully.");
    }
    setActiveMenuId(null);
  };

  const deleteItem = (moduleId, itemId) => {
    if(confirm("Delete this content item?")) {
      setModules(modules.map(m => {
        if (m.id === moduleId) {
          return { ...m, items: m.items.filter(item => item.id !== itemId) };
        }
        return m;
      }));
      toast.error("Content item removed.");
    }
    setActiveMenuId(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner upgraded from plain header */}
      <ModuleHeroBanner
        breadcrumb={`Dashboard / Courses / ${courseId}`}
        title="Course Content Builder"
        subtitle="Construct modules, rearrange syllabus, and manage assets for this course."
        actions={
          <div className="flex gap-3">
            <Link
              to="/trainer/courses"
              className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer bg-secondary text-foreground hover:bg-secondary/80 border border-border/50"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </Link>
            <button
              onClick={() => toast.success("Draft saved!")}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Draft
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Outline */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-display text-foreground">Course Outline</h2>
            <button onClick={() => toast.info("Add Module Dialog...")} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Module
            </button>
          </div>
          
          <div className="space-y-4">
            {modules.map((mod) => (
              <div key={mod.id} className="border border-border/50 rounded-xl overflow-hidden bg-card/50 hover:border-primary/30 transition-colors duration-300">
                <div className="flex items-center gap-3 p-3.5 bg-secondary/30 hover:bg-secondary/50 transition-colors relative">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <h3 className="font-bold text-sm flex-1 text-foreground">{mod.title}</h3>
                  <span className="text-xs font-semibold text-muted-foreground bg-background px-2.5 py-1 rounded-md border border-border/40">
                    {mod.items.length} items
                  </span>
                  
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === `mod-${mod.id}` ? null : `mod-${mod.id}`)}
                      className="h-8 w-8 rounded-full hover:bg-background grid place-items-center transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4 text-foreground" />
                    </button>
                    <AnimatePresence>
                      {activeMenuId === `mod-${mod.id}` && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="absolute right-0 mt-1 w-40 rounded-xl glass-strong border shadow-lg z-20 py-1.5"
                          >
                            <button
                              onClick={() => { setActiveMenuId(null); toast.info("Edit module name"); }}
                              className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                              Edit Module
                            </button>
                            <hr className="my-1 border-border/40" />
                            <button
                              onClick={() => deleteModule(mod.id)}
                              className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              Delete Module
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {mod.items.length > 0 && (
                  <div className="p-2.5 space-y-1 bg-background/30">
                    {mod.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/60 group transition-colors border border-transparent hover:border-border/40">
                        <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-grab" />
                        {item.type === 'video' ? <Video className="w-4 h-4 text-pink-500" /> : <FileText className="w-4 h-4 text-blue-500" />}
                        <span className="text-sm font-medium flex-1 text-foreground/90">{item.title}</span>
                        
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === `item-${item.id}` ? null : `item-${item.id}`)}
                            className="h-6 w-6 rounded hover:bg-background grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                          <AnimatePresence>
                            {activeMenuId === `item-${item.id}` && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  className="absolute right-0 mt-1 w-36 rounded-xl glass-strong border shadow-lg z-20 py-1.5"
                                >
                                  <button
                                    onClick={() => deleteItem(mod.id, item.id)}
                                    className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2 cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                    Delete Item
                                  </button>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-2 border-t border-border/30 bg-background/30">
                  <button className="text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary/50 flex items-center gap-1.5 p-2 w-full justify-center border border-dashed border-border/60 rounded-lg transition-colors cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Library Panel */}
        <div className="glass rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold font-display text-foreground mb-4">Upload Content</h2>
          <div className="border-2 border-dashed border-border/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 hover:border-primary/40 transition-colors cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Drag & drop files here</h3>
            <p className="text-xs font-medium text-muted-foreground">Video, PDF, PPT, DOCX up to 2GB</p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border/40">
            <h3 className="text-sm font-bold text-foreground mb-3">Or select from Library</h3>
            <button className="w-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer">
              Browse Content Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
