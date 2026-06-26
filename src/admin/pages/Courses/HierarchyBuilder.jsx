import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, Settings, Video, FileText, Code, Link as LinkIcon, Trash2, Edit3, GripVertical, CheckCircle2, X, Layers, Image as ImageIcon, Globe, MoreVertical, BookOpen, BarChart2, PieChart as PieChartIcon, ChevronRight, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { useRouter } from '@tanstack/react-router';
import { useAppStore } from '../../store/useAppStore';

const initialModules = [];

const BRAND = '#6C1D5F';
const BRAND_LIGHT = 'rgba(108,29,95,0.08)';
const BRAND_MEDIUM = 'rgba(108,29,95,0.15)';

const CONTENT_COLORS = {
  VIDEO: '#ef4444',
  TEXT: '#3b82f6',
  PDF: '#f59e0b',
  CODE: '#8b5cf6'
};

const ActionDropdown = ({ actions }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative" style={{ zIndex: 10 }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        style={{ background: 'transparent' }}
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1 w-48 bg-white border border-border shadow-xl rounded-xl z-50 overflow-hidden flex flex-col py-1"
          >
            {actions.map((a, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setOpen(false); a.onClick(); }}
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold transition-colors w-full text-left"
                style={{ color: a.danger ? '#ef4444' : '#1a1a1a' }}
                onMouseEnter={e => e.currentTarget.style.background = a.danger ? 'rgba(239,68,68,0.06)' : BRAND_LIGHT}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {a.icon} {a.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getContentIcon = (type) => {
  switch(type) {
    case 'VIDEO': return <Video className="w-4 h-4" style={{ color: CONTENT_COLORS.VIDEO }} />;
    case 'TEXT': return <FileText className="w-4 h-4" style={{ color: CONTENT_COLORS.TEXT }} />;
    case 'CODE': return <Code className="w-4 h-4" style={{ color: CONTENT_COLORS.CODE }} />;
    case 'PDF': return <ImageIcon className="w-4 h-4" style={{ color: CONTENT_COLORS.PDF }} />;
    default: return <LinkIcon className="w-4 h-4 text-emerald-500" />;
  }
};

const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="bg-white rounded-2xl border border-border p-5 flex items-center gap-4 shadow-sm">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
      {React.cloneElement(icon, { className: 'w-5 h-5', style: { color } })}
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  </div>
);

export default function HierarchyBuilder() {
  const router = useRouter();
  const { addToast } = useAppStore();
  const [modules, setModules] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lms_hierarchy_v2');
      if (saved) { try { return JSON.parse(saved); } catch (e) {} }
    }
    return initialModules;
  });

  useEffect(() => {
    localStorage.setItem('lms_hierarchy_v1', JSON.stringify(modules));
  }, [modules]);

  const [expandedModules, setExpandedModules] = useState(['m1']);
  const [expandedSubmodules, setExpandedSubmodules] = useState(['sm1']);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isSubmoduleModalOpen, setIsSubmoduleModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState(null);
  const [targetSubmoduleId, setTargetSubmoduleId] = useState(null);
  const [editModuleId, setEditModuleId] = useState(null);
  const [editSubmoduleId, setEditSubmoduleId] = useState(null);
  const [editContentId, setEditContentId] = useState(null);
  const [moduleForm, setModuleForm] = useState({ title: '', description: '', orderIndex: 1, isActive: true, slug: '' });
  const [submoduleForm, setSubmoduleForm] = useState({ title: '', description: '', slug: '', metaTitle: '', metaDescription: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImage: '', submoduleOrder: 1, isActive: true });
  const [contentForm, setContentForm] = useState({ type: 'VIDEO', title: '', videoUrl: '', textContent: '', documentUrl: '' });

  const contentStats = React.useMemo(() => {
    const counts = { VIDEO: 0, TEXT: 0, PDF: 0, CODE: 0 };
    modules.forEach(m => m.submodules.forEach(s => s.contentBlocks.forEach(c => {
      if (counts[c.type] !== undefined) counts[c.type]++;
    })));
    return [
      { name: 'Video', value: counts.VIDEO, color: CONTENT_COLORS.VIDEO },
      { name: 'Text', value: counts.TEXT, color: CONTENT_COLORS.TEXT },
      { name: 'PDF', value: counts.PDF, color: CONTENT_COLORS.PDF },
      { name: 'Code', value: counts.CODE, color: CONTENT_COLORS.CODE }
    ].filter(i => i.value > 0);
  }, [modules]);

  const moduleStats = React.useMemo(() => {
    return modules.map((m, i) => {
      let contentCount = 0;
      m.submodules.forEach(s => contentCount += s.contentBlocks.length);
      return { name: `M${i+1}`, submodules: m.submodules.length, content: contentCount };
    });
  }, [modules]);

  const totalSubmodules = React.useMemo(() => modules.reduce((a, m) => a + m.submodules.length, 0), [modules]);
  const totalContent = React.useMemo(() => modules.reduce((a, m) => a + m.submodules.reduce((b, s) => b + s.contentBlocks.length, 0), 0), [modules]);

  const toggleModule = (id) => setExpandedModules(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const toggleSubmodule = (id) => setExpandedSubmodules(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleAddModule = (e) => {
    e.preventDefault();
    if (editModuleId) {
      setModules(modules.map(mod => mod.id === editModuleId ? { ...mod, ...moduleForm } : mod));
      setEditModuleId(null); setIsModuleModalOpen(false);
      addToast('Module Updated Successfully', 'success'); return;
    }
    const newModule = { id: `m${Date.now()}`, ...moduleForm, submodules: [] };
    setModules([...modules, newModule]);
    setExpandedModules([...expandedModules, newModule.id]);
    setIsModuleModalOpen(false);
    addToast('Module Created Successfully', 'success');
  };

  const handleAddSubmodule = (e) => {
    e.preventDefault();
    if (!targetModuleId) return;
    if (editSubmoduleId) {
      setModules(modules.map(mod => {
        if (mod.id === targetModuleId) return { ...mod, submodules: mod.submodules.map(sub => sub.id === editSubmoduleId ? { ...sub, ...submoduleForm } : sub) };
        return mod;
      }));
      setEditSubmoduleId(null); setIsSubmoduleModalOpen(false);
      addToast('Submodule Updated Successfully', 'success'); return;
    }
    const newSub = { id: `sm${Date.now()}`, ...submoduleForm, contentBlocks: [] };
    setModules(modules.map(mod => mod.id === targetModuleId ? { ...mod, submodules: [...mod.submodules, newSub] } : mod));
    setExpandedSubmodules([...expandedSubmodules, newSub.id]);
    setIsSubmoduleModalOpen(false);
    addToast('Submodule Initialized with SEO Metadata', 'success');
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    if (!targetModuleId || !targetSubmoduleId) return;
    if (editContentId) {
      setModules(modules.map(mod => {
        if (mod.id === targetModuleId) return { ...mod, submodules: mod.submodules.map(sub => {
          if (sub.id === targetSubmoduleId) return { ...sub, contentBlocks: sub.contentBlocks.map(c => c.id === editContentId ? { ...c, ...contentForm } : c) };
          return sub;
        })};
        return mod;
      }));
      setEditContentId(null); setIsContentModalOpen(false);
      addToast('Content Block Updated Successfully', 'success'); return;
    }
    const newContent = { id: `c${Date.now()}`, ...contentForm, orderIndex: 1 };
    setModules(modules.map(mod => {
      if (mod.id === targetModuleId) return { ...mod, submodules: mod.submodules.map(sub => {
        if (sub.id === targetSubmoduleId) return { ...sub, contentBlocks: [...sub.contentBlocks, newContent] };
        return sub;
      })};
      return mod;
    }));
    setIsContentModalOpen(false);
    addToast('Content Block Attached to Submodule', 'success');
  };

  const handleDeleteModule = (id) => {
    if (window.confirm('Delete this module?')) { setModules(modules.filter(m => m.id !== id)); addToast('Module deleted.', 'success'); }
  };
  const handleDeleteSubmodule = (mid, sid) => {
    if (window.confirm('Delete this submodule?')) { setModules(modules.map(m => m.id === mid ? { ...m, submodules: m.submodules.filter(s => s.id !== sid) } : m)); addToast('Submodule deleted.', 'success'); }
  };
  const handleDeleteContent = (mid, sid, cid) => {
    if (window.confirm('Delete this content block?')) {
      setModules(modules.map(m => m.id === mid ? { ...m, submodules: m.submodules.map(s => s.id === sid ? { ...s, contentBlocks: s.contentBlocks.filter(c => c.id !== cid) } : s) } : m));
      addToast('Content deleted.', 'success');
    }
  };

  const inputCls = "w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none transition-colors";
  const inputFocusStyle = { borderColor: BRAND };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: '#F7F8FC' }}>

      {/* Top Navigation Bar */}
      <div className="h-14 border-b border-border bg-white flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.history.back()}
            className="h-8 w-8 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="h-5 w-px bg-border" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BRAND }}>Course Hierarchy Builder</span>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Admin Mode</span>
            </div>
            <h1 className="text-sm font-bold text-foreground">Enterprise Architecture Patterns</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-border bg-white hover:bg-background transition-colors flex items-center gap-1.5 cursor-pointer text-foreground shadow-sm">
            <Settings className="w-3.5 h-3.5" /> Settings
          </button>
          <button
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90"
            style={{ background: BRAND }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Publish Curriculum
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6 pb-24">

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <StatCard icon={<BookOpen />} label="Total Modules" value={modules.length} sub="Course chapters" color={BRAND} />
              <StatCard icon={<Layers />} label="Submodules" value={totalSubmodules} sub="Lesson sections" color="#3b82f6" />
              <StatCard icon={<FileText />} label="Content Blocks" value={totalContent} sub="Learning assets" color="#10b981" />
            </div>

            {/* Charts */}
            {(contentStats.length > 0 || modules.length > 1) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Content Distribution */}
                <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mb-4">
                    <PieChartIcon className="w-3.5 h-3.5" style={{ color: BRAND }} /> Content Distribution
                  </p>
                  <div className="h-44">
                    {contentStats.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={contentStats} cx="40%" cy="50%" innerRadius={52} outerRadius={72} paddingAngle={4} dataKey="value">
                            {contentStats.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                          </Pie>
                          <RechartsTooltip contentStyle={{ borderRadius: '10px', border: '1px solid #DADCEA', background: '#fff', color: '#000', fontSize: '12px', fontWeight: 600 }} />
                          <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs text-muted-foreground font-semibold">Add content blocks to see distribution</div>
                    )}
                  </div>
                </div>

                {/* Module Density */}
                <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 mb-4">
                    <BarChart2 className="w-3.5 h-3.5" style={{ color: '#3b82f6' }} /> Module Density
                  </p>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={moduleStats} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#888' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                        <RechartsTooltip cursor={{ fill: 'rgba(108,29,95,0.04)' }} contentStyle={{ borderRadius: '10px', border: '1px solid #DADCEA', background: '#fff', color: '#000', fontSize: '12px', fontWeight: 600 }} />
                        <Bar dataKey="submodules" name="Submodules" fill="#6C1D5F" radius={[4, 4, 0, 0]} maxBarSize={36} />
                        <Bar dataKey="content" name="Content Blocks" fill="#01AC9F" radius={[4, 4, 0, 0]} maxBarSize={36} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-foreground">Course Architecture</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{modules.length} module{modules.length !== 1 ? 's' : ''} · {totalSubmodules} submodule{totalSubmodules !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => { setEditModuleId(null); setModuleForm({ title: '', description: '', orderIndex: modules.length + 1, isActive: true, slug: '' }); setIsModuleModalOpen(true); }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90 shadow-sm"
                style={{ background: BRAND }}
              >
                <Plus className="w-3.5 h-3.5" /> Add Module
              </button>
            </div>

            {/* Modules */}
            <div className="space-y-3">
              {modules.length === 0 && (
                <div className="bg-white rounded-2xl border-2 border-dashed border-border p-12 text-center">
                  <Layers className="w-10 h-10 mx-auto mb-3" style={{ color: BRAND, opacity: 0.3 }} />
                  <p className="text-sm font-bold text-foreground">No modules yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Start by adding your first course module.</p>
                </div>
              )}

              {modules.map((module, mIdx) => (
                <motion.div key={module.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                  {/* Module Header */}
                  <div
                    className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-background transition-colors"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab p-1 text-muted-foreground hover:text-foreground" onClick={e => e.stopPropagation()}>
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-sm" style={{ background: BRAND }}>
                        M{mIdx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-bold text-foreground">{module.title}</h2>
                          {module.submodules.length > 0 && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-border text-muted-foreground bg-background">
                              {module.submodules.length} sub{module.submodules.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        {module.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{module.description}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <ActionDropdown actions={[
                        { label: 'Add Submodule', icon: <Plus className="w-3.5 h-3.5" />, onClick: () => {
                          setEditSubmoduleId(null); setTargetModuleId(module.id);
                          setSubmoduleForm({ title: '', description: '', slug: '', metaTitle: '', metaDescription: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImage: '', submoduleOrder: module.submodules.length + 1, isActive: true });
                          setIsSubmoduleModalOpen(true);
                        }},
                        { label: 'Edit Module', icon: <Edit3 className="w-3.5 h-3.5" />, onClick: () => {
                          setEditModuleId(module.id);
                          setModuleForm({ title: module.title || '', description: module.description || '', orderIndex: module.orderIndex || 1, isActive: module.isActive !== false, slug: module.slug || '' });
                          setIsModuleModalOpen(true);
                        }},
                        { label: 'Delete Module', icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, onClick: () => handleDeleteModule(module.id) }
                      ]} />
                      <div className="ml-1 text-muted-foreground pointer-events-none">
                        {expandedModules.includes(module.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Submodules */}
                  <AnimatePresence>
                    {expandedModules.includes(module.id) && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="border-t border-border px-5 py-3 space-y-2" style={{ background: '#F7F8FC' }}>
                          {module.submodules.length === 0 && (
                            <div className="py-5 text-center border-2 border-dashed border-border rounded-xl bg-white">
                              <p className="text-xs font-semibold text-muted-foreground">No submodules yet</p>
                            </div>
                          )}
                          {module.submodules.map((submod, smIdx) => (
                            <div key={submod.id} className="bg-white rounded-xl border border-border overflow-hidden">
                              {/* Submodule Header */}
                              <div
                                className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-background transition-colors"
                                onClick={() => toggleSubmodule(submod.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="cursor-grab p-0.5 text-muted-foreground" onClick={e => e.stopPropagation()}>
                                    <GripVertical className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: 'rgba(108,29,95,0.1)', color: BRAND }}>
                                    {mIdx+1}.{smIdx+1}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="text-xs font-bold text-foreground">{submod.title}</h3>
                                      {submod.canonicalUrl && (
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground hidden sm:inline-block">
                                          {submod.canonicalUrl}
                                        </span>
                                      )}
                                    </div>
                                    {submod.description && <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{submod.description}</p>}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                  <ActionDropdown actions={[
                                    { label: 'Add Content Block', icon: <Plus className="w-3.5 h-3.5" />, onClick: () => {
                                      setEditContentId(null); setTargetModuleId(module.id); setTargetSubmoduleId(submod.id);
                                      setContentForm({ type: 'VIDEO', title: '', videoUrl: '', textContent: '', documentUrl: '' });
                                      setIsContentModalOpen(true);
                                    }},
                                    { label: 'Edit Submodule', icon: <Edit3 className="w-3.5 h-3.5" />, onClick: () => {
                                      setTargetModuleId(module.id); setEditSubmoduleId(submod.id);
                                      setSubmoduleForm({ title: submod.title||'', description: submod.description||'', slug: submod.slug||'', metaTitle: submod.metaTitle||'', metaDescription: submod.metaDescription||'', canonicalUrl: submod.canonicalUrl||'', ogTitle: submod.ogTitle||'', ogDescription: submod.ogDescription||'', ogImage: submod.ogImage||'', submoduleOrder: submod.submoduleOrder||1, isActive: submod.isActive !== false });
                                      setIsSubmoduleModalOpen(true);
                                    }},
                                    { label: 'Delete Submodule', icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, onClick: () => handleDeleteSubmodule(module.id, submod.id) }
                                  ]} />
                                  <div className="ml-1 text-muted-foreground pointer-events-none">
                                    {expandedSubmodules.includes(submod.id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                                  </div>
                                </div>
                              </div>

                              {/* Content Blocks */}
                              <AnimatePresence>
                                {expandedSubmodules.includes(submod.id) && (
                                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                    <div className="border-t border-border px-4 py-3 flex flex-col gap-1.5" style={{ background: '#fafafa' }}>
                                      {submod.contentBlocks.length === 0 && (
                                        <p className="text-[11px] text-center py-3 text-muted-foreground">No content blocks. Use the menu to add one.</p>
                                      )}
                                      {submod.contentBlocks.map((content) => (
                                        <div key={content.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white border border-border group hover:border-secondary transition-colors">
                                          <div className="flex items-center gap-3">
                                            <div className="cursor-grab text-muted-foreground"><GripVertical className="w-3.5 h-3.5" /></div>
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-border bg-background">
                                              {getContentIcon(content.type)}
                                            </div>
                                            <div>
                                              <p className="text-xs font-semibold text-foreground">{content.title}</p>
                                              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{content.type}</p>
                                            </div>
                                          </div>
                                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ActionDropdown actions={[
                                              { label: 'Edit Content', icon: <Edit3 className="w-3.5 h-3.5" />, onClick: () => {
                                                setTargetModuleId(module.id); setTargetSubmoduleId(submod.id); setEditContentId(content.id);
                                                setContentForm({ type: content.type||'VIDEO', title: content.title||'', videoUrl: content.videoUrl||'', textContent: content.textContent||'', documentUrl: content.documentUrl||'' });
                                                setIsContentModalOpen(true);
                                              }},
                                              { label: 'Delete Content', icon: <Trash2 className="w-3.5 h-3.5" />, danger: true, onClick: () => handleDeleteContent(module.id, submod.id, content.id) }
                                            ]} />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- MODALS ---- */}

      {/* Module Modal */}
      <AnimatePresence>
        {isModuleModalOpen && (
          <div className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }} className="w-full max-w-lg bg-white rounded-2xl border border-border shadow-2xl flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center px-6 py-4 border-b border-border shrink-0">
                <div>
                  <h2 className="text-base font-bold text-foreground">{editModuleId ? 'Edit Module' : 'Create Module'}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Maps to ModuleEntity — top-level course chapter</p>
                </div>
                <button onClick={() => setIsModuleModalOpen(false)} className="h-8 w-8 rounded-xl hover:bg-secondary flex items-center justify-center cursor-pointer"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <form id="module-form" onSubmit={handleAddModule} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Module Title *</label>
                    <input required type="text" className={inputCls} style={{ borderColor: undefined }} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={moduleForm.title} onChange={e => { const t = e.target.value; setModuleForm({...moduleForm, title: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}); }} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Description</label>
                    <textarea rows={2} className={inputCls + ' resize-none'} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={moduleForm.description} onChange={e => setModuleForm({...moduleForm, description: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Slug (auto)</label>
                      <input type="text" className={inputCls + ' font-mono text-muted-foreground'} value={moduleForm.slug} onChange={e => setModuleForm({...moduleForm, slug: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Order</label>
                      <input type="number" min={1} className={inputCls} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={moduleForm.orderIndex} onChange={e => setModuleForm({...moduleForm, orderIndex: parseInt(e.target.value)||1})} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Active Status</p>
                      <p className="text-xs text-muted-foreground">Visible to enrolled students</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={moduleForm.isActive} onChange={e => setModuleForm({...moduleForm, isActive: e.target.checked})} />
                      <div className="w-10 h-5 bg-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all" style={{ ['--tw-peer-checked-bg']: BRAND }}
                           onMouseEnter={() => {}} ref={el => { if (el) { el.style.setProperty('--peer-checked-color', BRAND); } }}></div>
                    </label>
                  </div>
                </form>
              </div>
              <div className="px-6 py-4 border-t border-border shrink-0">
                <button form="module-form" type="submit" className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90 shadow-sm cursor-pointer" style={{ background: BRAND }}>
                  {editModuleId ? 'Update Module' : 'Create Module'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Submodule Modal */}
      <AnimatePresence>
        {isSubmoduleModalOpen && (
          <div className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }} className="w-full max-w-xl bg-white rounded-2xl border border-border shadow-2xl flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center px-6 py-4 border-b border-border shrink-0">
                <div>
                  <h2 className="text-base font-bold text-foreground">{editSubmoduleId ? 'Edit Submodule' : 'Create Submodule'}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Maps to SubmoduleEntity — contains SEO + Open Graph metadata</p>
                </div>
                <button onClick={() => setIsSubmoduleModalOpen(false)} className="h-8 w-8 rounded-xl hover:bg-secondary flex items-center justify-center cursor-pointer"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <form id="submodule-form" onSubmit={handleAddSubmodule} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Submodule Title *</label>
                    <input required type="text" className={inputCls} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.title} onChange={e => { const t = e.target.value; setSubmoduleForm({...submoduleForm, title: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}); }} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Brief Description</label>
                    <textarea rows={2} className={inputCls + ' resize-none'} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.description} onChange={e => setSubmoduleForm({...submoduleForm, description: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Slug *</label>
                      <input required type="text" className={inputCls + ' font-mono'} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.slug} onChange={e => setSubmoduleForm({...submoduleForm, slug: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Order Index</label>
                      <input type="number" min={1} className={inputCls} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.submoduleOrder} onChange={e => setSubmoduleForm({...submoduleForm, submoduleOrder: parseInt(e.target.value)||1})} />
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: BRAND }}>Core SEO</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Canonical URL *</label>
                    <input required type="text" placeholder="/learn/topic-name" className={inputCls + ' font-mono'} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.canonicalUrl} onChange={e => setSubmoduleForm({...submoduleForm, canonicalUrl: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Meta Title</label>
                      <input type="text" maxLength={70} className={inputCls} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.metaTitle} onChange={e => setSubmoduleForm({...submoduleForm, metaTitle: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Meta Description</label>
                      <input type="text" maxLength={320} className={inputCls} onFocus={e => e.target.style.borderColor = BRAND} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.metaDescription} onChange={e => setSubmoduleForm({...submoduleForm, metaDescription: e.target.value})} />
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-blue-600">Open Graph</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">OG Title</label>
                      <input type="text" className={inputCls} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.ogTitle} onChange={e => setSubmoduleForm({...submoduleForm, ogTitle: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">OG Description</label>
                      <input type="text" className={inputCls} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.ogDescription} onChange={e => setSubmoduleForm({...submoduleForm, ogDescription: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">OG Image</label>
                    <input type="text" placeholder="https://..." className={inputCls} onFocus={e => e.target.style.borderColor = '#3b82f6'} onBlur={e => e.target.style.borderColor = ''} value={submoduleForm.ogImage} onChange={e => setSubmoduleForm({...submoduleForm, ogImage: e.target.value})} />
                    {submoduleForm.ogImage && <img src={submoduleForm.ogImage} className="mt-2 w-full h-20 object-cover rounded-lg border border-border" alt="OG preview" />}
                  </div>
                </form>
              </div>
              <div className="px-6 py-4 border-t border-border shrink-0">
                <button form="submodule-form" type="submit" className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90 shadow-sm cursor-pointer" style={{ background: BRAND }}>
                  {editSubmoduleId ? 'Update Submodule' : 'Create Submodule'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Content Block Modal */}
      <AnimatePresence>
        {isContentModalOpen && (
          <div className="fixed inset-0 z-[110] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }} className="w-full max-w-md bg-white rounded-2xl border border-border shadow-2xl">
              <div className="flex justify-between items-center px-6 py-4 border-b border-border">
                <div>
                  <h2 className="text-base font-bold text-foreground">{editContentId ? 'Edit Content Block' : 'Attach Content Block'}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Maps to ContentEntity — atomic learning material</p>
                </div>
                <button onClick={() => setIsContentModalOpen(false)} className="h-8 w-8 rounded-xl hover:bg-secondary flex items-center justify-center cursor-pointer"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleAddContent} className="px-6 py-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Content Type</label>
                  <select className={inputCls + ' cursor-pointer'} value={contentForm.type} onChange={e => setContentForm({...contentForm, type: e.target.value})} onFocus={e => e.target.style.borderColor = '#10b981'} onBlur={e => e.target.style.borderColor = ''}>
                    <option value="VIDEO">▶ Video Lecture (YouTube / Direct)</option>
                    <option value="TEXT">📝 Rich Text Article</option>
                    <option value="PDF">📄 PDF Document</option>
                    <option value="CODE">💻 Code Playground / Snippet</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Content Title *</label>
                  <input required type="text" placeholder="e.g. Setting up the environment" className={inputCls} onFocus={e => e.target.style.borderColor = '#10b981'} onBlur={e => e.target.style.borderColor = ''} value={contentForm.title} onChange={e => setContentForm({...contentForm, title: e.target.value})} />
                </div>
                {contentForm.type === 'VIDEO' && (
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Video URL</label>
                    <input required type="url" placeholder="https://youtube.com/..." className={inputCls} onFocus={e => e.target.style.borderColor = '#10b981'} onBlur={e => e.target.style.borderColor = ''} value={contentForm.videoUrl} onChange={e => setContentForm({...contentForm, videoUrl: e.target.value})} />
                  </div>
                )}
                {contentForm.type === 'TEXT' && (
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Text Content (Markdown)</label>
                    <textarea required rows={5} className={inputCls + ' resize-none'} onFocus={e => e.target.style.borderColor = '#10b981'} onBlur={e => e.target.style.borderColor = ''} value={contentForm.textContent} onChange={e => setContentForm({...contentForm, textContent: e.target.value})} />
                  </div>
                )}
                {(contentForm.type === 'PDF' || contentForm.type === 'CODE') && (
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1.5">Document / Repo Link</label>
                    <input required type="text" placeholder={contentForm.type === 'PDF' ? 'https://.../doc.pdf' : 'https://github.com/...'} className={inputCls} onFocus={e => e.target.style.borderColor = '#10b981'} onBlur={e => e.target.style.borderColor = ''} value={contentForm.documentUrl} onChange={e => setContentForm({...contentForm, documentUrl: e.target.value})} />
                  </div>
                )}
                <button type="submit" className="w-full py-2.5 rounded-xl text-white text-sm font-bold mt-2 cursor-pointer hover:opacity-90 transition-opacity shadow-sm" style={{ background: '#10b981' }}>
                  {editContentId ? 'Update Content Block' : 'Attach Content Block'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
