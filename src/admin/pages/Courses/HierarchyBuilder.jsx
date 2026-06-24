import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, Settings, Video, FileText, Code, Link as LinkIcon, Trash2, GripVertical, CheckCircle2, Save, X, Layers, Image as ImageIcon, Globe } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { useAppStore } from '../../store/useAppStore';

// Initial Mock Hierarchy Mapping to Java Entities
const initialModules = [
  {
    id: 'm1',
    title: 'Module 1: Introduction to Architecture',
    description: 'Foundational concepts of enterprise scale systems.',
    orderIndex: 1,
    submodules: [
      {
        id: 'sm1',
        title: 'The Monolith vs Microservices',
        description: 'Analyzing the trade-offs of monolithic design.',
        metaTitle: 'Monolith vs Microservices | Architecture',
        metaDescription: 'Learn the core differences.',
        canonicalUrl: '/learn/architecture/monolith',
        contentBlocks: [
          { id: 'c1', type: 'VIDEO', title: 'Video Lecture', videoUrl: 'https://youtube.com/watch?v=123', orderIndex: 1 },
          { id: 'c2', type: 'PDF', title: 'Architecture Diagram PDF', documentUrl: '/docs/arch.pdf', orderIndex: 2 }
        ]
      }
    ]
  }
];

export default function HierarchyBuilder() {
  const router = useRouter();
  const { addToast } = useAppStore();
  const [modules, setModules] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lms_hierarchy_v1');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialModules;
  });

  useEffect(() => {
    localStorage.setItem('lms_hierarchy_v1', JSON.stringify(modules));
  }, [modules]);
  const [expandedModules, setExpandedModules] = useState(['m1']);
  const [expandedSubmodules, setExpandedSubmodules] = useState(['sm1']);

  // Modals State
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isSubmoduleModalOpen, setIsSubmoduleModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  
  // Target IDs for adding children
  const [targetModuleId, setTargetModuleId] = useState(null);
  const [targetSubmoduleId, setTargetSubmoduleId] = useState(null);

  // Form States mapping to Entity logic
  const [moduleForm, setModuleForm] = useState({ title: '', description: '', orderIndex: 1, isActive: true, slug: '' });
  const [submoduleForm, setSubmoduleForm] = useState({ title: '', description: '', slug: '', metaTitle: '', metaDescription: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImage: '', submoduleOrder: 1, isActive: true });
  const [contentForm, setContentForm] = useState({ type: 'VIDEO', title: '', videoUrl: '', textContent: '', documentUrl: '' });

  const toggleModule = (id) => {
    setExpandedModules(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSubmodule = (id) => {
    setExpandedSubmodules(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
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
    addToast('Module Created Successfully', 'success');
  };

  const handleAddSubmodule = (e) => {
    e.preventDefault();
    if (!targetModuleId) return;
    
    const newSubmodule = {
      id: `sm${Date.now()}`,
      ...submoduleForm,
      contentBlocks: []
    };

    setModules(modules.map(mod => {
      if (mod.id === targetModuleId) {
        return { ...mod, submodules: [...mod.submodules, newSubmodule] };
      }
      return mod;
    }));
    
    setExpandedSubmodules([...expandedSubmodules, newSubmodule.id]);
    setIsSubmoduleModalOpen(false);
    addToast('Submodule Initialized with SEO Metadata', 'success');
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    if (!targetModuleId || !targetSubmoduleId) return;
    
    const newContent = {
      id: `c${Date.now()}`,
      ...contentForm,
      orderIndex: 1 // Naive ordering for demo
    };

    setModules(modules.map(mod => {
      if (mod.id === targetModuleId) {
        return {
          ...mod,
          submodules: mod.submodules.map(sub => {
            if (sub.id === targetSubmoduleId) {
              return { ...sub, contentBlocks: [...sub.contentBlocks, newContent] };
            }
            return sub;
          })
        };
      }
      return mod;
    }));
    
    setIsContentModalOpen(false);
    addToast('Content Block Attached to Submodule', 'success');
  };

  const getContentIcon = (type) => {
    switch(type) {
      case 'VIDEO': return <Video className="w-4 h-4 text-red-500" />;
      case 'TEXT': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'CODE': return <Code className="w-4 h-4 text-purple-500" />;
      case 'PDF': return <ImageIcon className="w-4 h-4 text-amber-500" />;
      default: return <LinkIcon className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in slide-in-from-bottom-8 duration-500">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-border/40 bg-secondary/30 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => router.history.back()} className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer group">
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Course Hierarchy Builder</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin Mode</span>
            </div>
            <h1 className="text-lg font-bold text-foreground">Enterprise Architecture Patterns</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl text-sm font-semibold border border-border/50 bg-background hover:bg-secondary transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
            <Settings className="w-4 h-4" /> Builder Settings
          </button>
          <button className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition-colors flex items-center gap-2 cursor-pointer">
            <CheckCircle2 className="w-4 h-4" /> Publish Curriculum
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Hierarchy Workspace */}
        <div className="flex-1 overflow-y-auto p-8 relative bg-[#f8fafc] dark:bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto space-y-6 pb-32">
            
            {modules.map((module, mIdx) => (
              <motion.div key={module.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl border border-indigo-500/20 overflow-hidden shadow-sm">
                {/* Module Header */}
                <div 
                  className="p-5 flex items-center justify-between bg-indigo-500/5 border-b border-indigo-500/10 cursor-pointer hover:bg-indigo-500/10 transition-colors"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="cursor-grab text-muted-foreground hover:text-foreground" onClick={e => e.stopPropagation()}><GripVertical className="w-5 h-5" /></div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">M{mIdx + 1}</div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">{module.title}</h2>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => {
                        setTargetModuleId(module.id);
                      setSubmoduleForm({ title: '', description: '', slug: '', metaTitle: '', metaDescription: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImage: '', submoduleOrder: module.submodules.length + 1, isActive: true });
                        setIsSubmoduleModalOpen(true);
                      }} 
                      className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 font-bold text-xs hover:bg-indigo-500/20 transition-colors cursor-pointer"
                    >
                      + Add Submodule
                    </button>
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Submodules Container */}
                <AnimatePresence>
                  {expandedModules.includes(module.id) && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-4 space-y-4 bg-background">
                        {module.submodules.length === 0 ? (
                          <div className="p-6 border-2 border-dashed border-border/50 rounded-xl text-center">
                            <Layers className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm font-semibold text-foreground">No submodules yet</p>
                            <p className="text-xs text-muted-foreground">Add a submodule to start building the lesson structure.</p>
                          </div>
                        ) : (
                          module.submodules.map((submod, smIdx) => (
                            <div key={submod.id} className="border border-border/60 rounded-xl overflow-hidden shadow-sm">
                              {/* Submodule Header */}
                              <div 
                                className="p-4 flex items-center justify-between bg-secondary/30 cursor-pointer hover:bg-secondary/50 transition-colors"
                                onClick={() => toggleSubmodule(submod.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="cursor-grab text-muted-foreground hover:text-foreground" onClick={e => e.stopPropagation()}><GripVertical className="w-4 h-4" /></div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-sm font-bold text-foreground">{mIdx + 1}.{smIdx + 1} {submod.title}</h3>
                                      <span className="bg-amber-500/10 text-amber-600 text-[10px] px-1.5 py-0.5 rounded font-bold border border-amber-500/20" title="SEO Canonical Path">{submod.canonicalUrl}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">{submod.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                  <button 
                                    onClick={() => {
                                      setTargetModuleId(module.id);
                                      setTargetSubmoduleId(submod.id);
                                      setContentForm({ type: 'VIDEO', title: '', videoUrl: '', textContent: '', documentUrl: '' });
                                      setIsContentModalOpen(true);
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-border/60 bg-background text-xs font-bold hover:bg-secondary transition-colors cursor-pointer"
                                  >
                                    + Attach Content Block
                                  </button>
                                  <button className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </div>

                              {/* Content Blocks */}
                              <AnimatePresence>
                                {expandedSubmodules.includes(submod.id) && (
                                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                    <div className="p-3 bg-background/50 border-t border-border/50 flex flex-col gap-2">
                                      {submod.contentBlocks.length === 0 ? (
                                        <p className="text-xs text-center py-4 text-muted-foreground">No content blocks attached. This submodule is empty.</p>
                                      ) : (
                                        submod.contentBlocks.map((content) => (
                                          <div key={content.id} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/50 shadow-sm group">
                                            <div className="flex items-center gap-3">
                                              <div className="cursor-grab text-muted-foreground hover:text-foreground"><GripVertical className="w-4 h-4" /></div>
                                              <div className="w-8 h-8 rounded-md bg-secondary/80 flex items-center justify-center">
                                                {getContentIcon(content.type)}
                                              </div>
                                              <div>
                                                <p className="text-sm font-semibold text-foreground">{content.title}</p>
                                                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{content.type}</p>
                                              </div>
                                            </div>
                                            <button className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-red-500 transition-all cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                                          </div>
                                        ))
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <button 
              onClick={() => { setModuleForm({ title: '', description: '', orderIndex: modules.length + 1 }); setIsModuleModalOpen(true); }}
              className="w-full py-6 rounded-2xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 text-indigo-600 font-bold hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-5 h-5" /> Add New Module
            </button>

          </div>
        </div>
      </div>

      {/* --- Modals for Entities --- */}

      {/* Module Modal */}
      <AnimatePresence>
        {isModuleModalOpen && (
          <div className="fixed inset-0 z-[110] bg-background/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg glass rounded-2xl border border-border/40 shadow-2xl flex flex-col max-h-[90vh]">
              {/* Sticky Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-border/40 shrink-0">
                <div>
                  <h2 className="text-xl font-bold font-display text-foreground">Create Module</h2>
                  <p className="text-xs text-muted-foreground">Maps to ModuleEntity. Top-level course chapter.</p>
                </div>
                <button onClick={() => setIsModuleModalOpen(false)} className="h-8 w-8 rounded-full hover:bg-secondary grid place-items-center"><X className="w-4 h-4" /></button>
              </div>
              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
              <form id="module-form" onSubmit={handleAddModule} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Module Title <span className="text-red-500">*</span></label>
                    <input required type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-indigo-500 outline-none" value={moduleForm.title} onChange={e => {
                      const t = e.target.value;
                      setModuleForm({...moduleForm, title: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')});
                    }} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Description</label>
                    <textarea rows={2} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-indigo-500 outline-none resize-none" value={moduleForm.description} onChange={e => setModuleForm({...moduleForm, description: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Slug (auto)</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none font-mono text-muted-foreground" value={moduleForm.slug} onChange={e => setModuleForm({...moduleForm, slug: e.target.value})} placeholder="module-slug" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Module Order</label>
                    <input type="number" min={1} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-indigo-500 outline-none" value={moduleForm.orderIndex} onChange={e => setModuleForm({...moduleForm, orderIndex: parseInt(e.target.value)||1})} />
                  </div>
                  <div className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/50">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Active Status</p>
                      <p className="text-xs text-muted-foreground">Maps to isActive in ModuleEntity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={moduleForm.isActive} onChange={e => setModuleForm({...moduleForm, isActive: e.target.checked})} />
                      <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                    </label>
                  </div>
                </div>
              </form>
              </div>
              {/* Sticky Footer */}
              <div className="px-6 py-4 border-t border-border/40 bg-secondary/10 shrink-0">
                <button form="module-form" type="submit" className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/20">Save Module → ModuleEntity</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Submodule Modal */}
      <AnimatePresence>
        {isSubmoduleModalOpen && (
          <div className="fixed inset-0 z-[110] bg-background/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-xl glass rounded-2xl border border-border/40 shadow-2xl flex flex-col max-h-[90vh]">
              {/* Sticky Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-border/40 shrink-0">
                <div>
                  <h2 className="text-xl font-bold font-display text-foreground">Create Submodule</h2>
                  <p className="text-xs text-muted-foreground">Maps to SubmoduleEntity. Contains SEO + Open Graph metadata.</p>
                </div>
                <button onClick={() => setIsSubmoduleModalOpen(false)} className="h-8 w-8 rounded-full hover:bg-secondary grid place-items-center"><X className="w-4 h-4" /></button>
              </div>
              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
              <form id="submodule-form" onSubmit={handleAddSubmodule} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Submodule Title <span className="text-red-500">*</span></label>
                    <input required type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none" value={submoduleForm.title} onChange={e => {
                      const t = e.target.value;
                      setSubmoduleForm({...submoduleForm, title: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')});
                    }} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Brief Description</label>
                    <textarea rows={2} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none resize-none" value={submoduleForm.description} onChange={e => setSubmoduleForm({...submoduleForm, description: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Slug <span className="text-red-500">*</span> <span className="text-muted-foreground normal-case font-normal">(unique)</span></label>
                    <input required type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none font-mono" value={submoduleForm.slug} onChange={e => setSubmoduleForm({...submoduleForm, slug: e.target.value})} placeholder="submodule-slug" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Order Index</label>
                    <input type="number" min={1} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none" value={submoduleForm.submoduleOrder} onChange={e => setSubmoduleForm({...submoduleForm, submoduleOrder: parseInt(e.target.value)||1})} />
                  </div>

                  {/* SEO Section */}
                  <div className="col-span-2 border-t border-border/50 pt-3 mt-1">
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Core SEO</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Canonical URL <span className="text-red-500">*</span></label>
                    <input required type="text" placeholder="/learn/topic-name" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none font-mono" value={submoduleForm.canonicalUrl} onChange={e => setSubmoduleForm({...submoduleForm, canonicalUrl: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Meta Title <span className="text-xs text-muted-foreground font-normal normal-case">(max 70)</span></label>
                    <input type="text" maxLength={70} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none" value={submoduleForm.metaTitle} onChange={e => setSubmoduleForm({...submoduleForm, metaTitle: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Meta Description <span className="text-xs text-muted-foreground font-normal normal-case">(max 320)</span></label>
                    <input type="text" maxLength={320} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-amber-500 outline-none" value={submoduleForm.metaDescription} onChange={e => setSubmoduleForm({...submoduleForm, metaDescription: e.target.value})} />
                  </div>

                  {/* Open Graph Section */}
                  <div className="col-span-2 border-t border-border/50 pt-3 mt-1">
                    <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> Open Graph (ogTitle, ogDescription, ogImage)</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">OG Title</label>
                    <input type="text" maxLength={150} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-indigo-500 outline-none" value={submoduleForm.ogTitle} onChange={e => setSubmoduleForm({...submoduleForm, ogTitle: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">OG Description</label>
                    <input type="text" maxLength={500} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-indigo-500 outline-none" value={submoduleForm.ogDescription} onChange={e => setSubmoduleForm({...submoduleForm, ogDescription: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">OG Image</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="https://..." className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-indigo-500 outline-none" value={submoduleForm.ogImage} onChange={e => setSubmoduleForm({...submoduleForm, ogImage: e.target.value})} />
                      <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer border border-border/50">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        <input type="file" className="hidden" accept="image/*" onChange={e => {
                          if(e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = ev => setSubmoduleForm({...submoduleForm, ogImage: ev.target.result});
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }} />
                      </label>
                    </div>
                    {submoduleForm.ogImage && <img src={submoduleForm.ogImage} className="mt-2 w-full h-24 object-cover rounded-lg border border-border/50" alt="OG preview" />}
                  </div>

                  {/* isActive toggle */}
                  <div className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/50">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Active Status</p>
                      <p className="text-xs text-muted-foreground">Maps to isActive in SubmoduleEntity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={submoduleForm.isActive} onChange={e => setSubmoduleForm({...submoduleForm, isActive: e.target.checked})} />
                      <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>
                </div>
              </form>
              </div>
              <div className="px-6 py-4 border-t border-border/40 bg-secondary/10 shrink-0">
                <button form="submodule-form" type="submit" className="w-full py-3 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20">Save Submodule → SubmoduleEntity</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Content Block Modal */}
      <AnimatePresence>
        {isContentModalOpen && (
          <div className="fixed inset-0 z-[110] bg-background/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md glass rounded-2xl p-6 border border-border/40 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold font-display text-foreground">Attach Content Block</h2>
                  <p className="text-xs text-muted-foreground">Maps to ContentEntity. The atomic learning material.</p>
                </div>
                <button onClick={() => setIsContentModalOpen(false)} className="h-8 w-8 rounded-full hover:bg-secondary grid place-items-center"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAddContent} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Content Asset Type</label>
                  <select className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none cursor-pointer" value={contentForm.type} onChange={e => setContentForm({...contentForm, type: e.target.value})}>
                    <option value="VIDEO">▶️ Video Lecture (YouTube/Direct)</option>
                    <option value="TEXT">📝 Rich Text Article</option>
                    <option value="PDF">📄 PDF Document</option>
                    <option value="CODE">💻 Code Playground / Snippet</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Content Block Title</label>
                  <input required type="text" placeholder="e.g. Setting up the environment" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none" value={contentForm.title} onChange={e => setContentForm({...contentForm, title: e.target.value})} />
                </div>
                
                {contentForm.type === 'VIDEO' && (
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Video URL</label>
                    <input required type="url" placeholder="https://youtube.com/..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none" value={contentForm.videoUrl} onChange={e => setContentForm({...contentForm, videoUrl: e.target.value})} />
                  </div>
                )}
                
                {contentForm.type === 'TEXT' && (
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Text Content (Markdown Support)</label>
                    <textarea required rows={5} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none resize-none" value={contentForm.textContent} onChange={e => setContentForm({...contentForm, textContent: e.target.value})} />
                  </div>
                )}

                {(contentForm.type === 'PDF' || contentForm.type === 'CODE') && (
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Document / Repo Link</label>
                    <div className="flex gap-2">
                      <input required type="text" placeholder={contentForm.type === 'PDF' ? "https://.../doc.pdf" : "https://github.com/..."} className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm focus:border-emerald-500 outline-none" value={contentForm.documentUrl} onChange={e => setContentForm({...contentForm, documentUrl: e.target.value})} />
                      <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold" title="Upload File">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        <input type="file" className="hidden" accept={contentForm.type === 'PDF' ? ".pdf" : "*"} onChange={(e) => {
                          if(e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = ev => setContentForm({...contentForm, documentUrl: ev.target.result});
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }} />
                      </label>
                    </div>
                  </div>
                )}

                <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 mt-4">Attach Content Asset</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
