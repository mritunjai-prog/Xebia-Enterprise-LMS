import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconAdd } from '../../components/Icons';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Clock, Users, ShieldAlert, Edit3, Globe, Settings, BarChart3, Image as ImageIcon, CheckCircle, ChevronRight, X, PlayCircle, Eye, Activity } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';

const mockCourses = [
  { id: 'C491', title: 'Enterprise Architecture Patterns', category: 'Architecture', level: 'Advanced', language: 'English', duration: '12h 30m', totalViews: 1400, isPublished: true, enrollments: 124 },
  { id: 'C812', title: 'Advanced React & Next.js', category: 'Programming', level: 'Intermediate', language: 'English', duration: '8h 15m', totalViews: 320, isPublished: false, enrollments: 0 },
  { id: 'C102', title: 'Microservices with Spring Boot', category: 'Architecture', level: 'Advanced', language: 'English', duration: '15h 0m', totalViews: 4500, isPublished: true, enrollments: 89 },
];

export default function Courses() {
  const { addToast } = useAppStore();
  const router = useRouter();
  const [courses, setCourses] = useState(mockCourses);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState('basic'); // basic, media, seo, advanced
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '', title: '', slug: '', description: '', shortDescription: '', level: 'Beginner', language: 'English', duration: '',
    icon: '', color: '#3B82F6', thumbnail: '', bannerImage: '', isActive: true, isFeatured: false,
    metaTitle: '', metaDescription: '', primaryKeyword: '', canonicalUrl: '',
    youtubeVideoUrl: '', targetAudience: '', learningOutcomes: '',
    isPublished: false, allowIndexing: true
  });

  const filteredCourses = courses.filter(c => {
    const matchesTab = activeTab === 'All' ? true : activeTab === 'Active' ? c.isPublished : !c.isPublished;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCreateNew = () => {
    setFormData({
      id: '', title: '', slug: '', description: '', shortDescription: '', level: 'Beginner', language: 'English', duration: '',
      icon: '', color: '#3B82F6', thumbnail: '', bannerImage: '', isActive: true, isFeatured: false,
      metaTitle: '', metaDescription: '', primaryKeyword: '', canonicalUrl: '',
      youtubeVideoUrl: '', targetAudience: '', learningOutcomes: '',
      isPublished: false, allowIndexing: true
    });
    setIsEditMode(false);
    setEditorTab('basic');
    setIsEditorOpen(true);
  };

  const handleEdit = (course) => {
    setFormData({ ...formData, ...course });
    setIsEditMode(true);
    setEditorTab('basic');
    setIsEditorOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setCourses(courses.map(c => c.id === formData.id ? { ...formData, enrollments: (c ).enrollments } : c));
      addToast(`Course "${formData.title}" updated.`, 'success');
    } else {
      const newCourse = { ...formData, id: `C${Math.floor(Math.random() * 900) + 100}`, enrollments: 0, totalViews: 0 };
      setCourses([newCourse, ...courses]);
      addToast(`Course "${newCourse.title}" created.`, 'success');
    }
    setIsEditorOpen(false);
  };

  const navigateToBuilder = (courseId) => {
    router.navigate({ to: `/admin/courses/builder`, search } );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-black p-8 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <BookOpen className="w-48 h-48 text-blue-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Curriculum Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">Tenant Scoped</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-display">Course Registry</h1>
            <p className="text-blue-200/80 max-w-xl text-sm">
              Manage the master catalog of courses. Configure deep SEO metadata, media assets, marketing copy, and launch structural hierarchy builders.
            </p>
          </div>
          <button onClick={handleCreateNew} className="shrink-0 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 cursor-pointer">
            <IconAdd className="w-5 h-5" /> Create Course
          </button>
        </div>
      </div>

      {/* Controls & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between border border-border/40 shadow-sm">
          <div className="flex bg-secondary/50 p-1 rounded-xl w-full sm:w-auto">
            {['All', 'Active', 'Drafts'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={clsx("px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer flex-1 sm:flex-none", activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search ID or title..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors" />
          </div>
        </div>
        <div className="glass rounded-2xl p-5 border border-border/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Catalog</p>
            <p className="text-2xl font-black text-foreground">{courses.length}</p>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="glass rounded-2xl overflow-hidden border border-border/40 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 bg-secondary/30">
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Course ID & Title</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Delivery Stats</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-secondary/10 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        {course.id}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{course.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration} &bull; {course.level}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-secondary px-2.5 py-1 rounded-md text-xs font-semibold text-muted-foreground border border-border/50">
                      {course.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                      <span className="flex items-center gap-1" title="Enrollments"><Users className="w-3.5 h-3.5 text-blue-500" /> {course.enrollments}</span>
                      <span className="flex items-center gap-1" title="Total Views (SEO)"><Eye className="w-3.5 h-3.5 text-indigo-500" /> {course.totalViews || 0}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {course.isPublished ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        <ShieldAlert className="w-3 h-3" /> Draft Mode
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigateToBuilder(course.id)} className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-sm">
                        Manage Content <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleEdit(course)} className="h-8 w-8 rounded-lg border border-border/50 hover:bg-secondary grid place-items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Edit Course Properties">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-muted-foreground">No courses found matching criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Editor Modal for CourseEntity */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-4xl max-h-[90vh] glass rounded-2xl overflow-hidden flex flex-col border border-border/40 shadow-2xl">
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-border/40 bg-secondary/30 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-xl font-bold font-display text-foreground">{isEditMode ? "Edit Course Properties" : "Create New Course"}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Configure deep schemas, marketing copy, and metadata for the catalog.</p>
                </div>
                <button onClick={() => setIsEditorOpen(false)} className="h-8 w-8 rounded-full border border-border/50 hover:bg-secondary grid place-items-center cursor-pointer">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Editor Layout */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Tabs */}
                <div className="w-48 border-r border-border/40 bg-secondary/10 p-3 flex flex-col gap-1 shrink-0">
                  {[
                    { id: 'basic', label: 'Basic Info', icon: BookOpen },
                    { id: 'media', label: 'Media & Landing', icon: ImageIcon },
                    { id: 'seo', label: 'SEO & Meta', icon: Globe },
                    { id: 'advanced', label: 'Settings', icon: Settings },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setEditorTab(tab.id)}
                      type="button"
                      className={clsx(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer text-left",
                        editorTab === tab.id ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      )}
                    >
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                  ))}
                </div>

                {/* Form Content Area */}
                <div className="flex-1 overflow-y-auto p-6 relative">
                  <form id="course-form" onSubmit={handleSubmit} className="space-y-6 pb-20">
                    
                    {/* Basic Info Tab */}
                    <div className={clsx(editorTab !== 'basic' && "hidden")}>
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-500" /> Core Information</h3>
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Course Title</label>
                            <input required type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">URL Slug</label>
                            <input required type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 font-mono" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Category</label>
                            <select required className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer" value={(formData ).category || ''} onChange={e => setFormData({...formData, category: e.target.value} )}>
                              <option value="" disabled>Select Category</option>
                              <option value="Programming">Programming</option>
                              <option value="Architecture">Architecture</option>
                              <option value="Cloud & DevOps">Cloud & DevOps</option>
                              <option value="Data Science">Data Science</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Course Icon (Emoji or URL)</label>
                            <div className="flex gap-2">
                              <input required type="text" placeholder="e.g. 💻 or https://..." className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
                              <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold" title="Upload Image">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                  if(e.target.files && e.target.files[0]) {
                                    const url = URL.createObjectURL(e.target.files[0]);
                                    setFormData({...formData, icon: url});
                                  }
                                }} />
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Brand Color</label>
                            <div className="flex gap-3 h-[42px] items-center px-3 bg-background border border-border/50 rounded-xl focus-within:border-blue-500 transition-colors">
                              <input required type="color" className="h-6 w-6 rounded cursor-pointer border-0 p-0 bg-transparent" value={(formData ).color || '#3B82F6'} onChange={e => setFormData({...formData, color: e.target.value} )} />
                              <span className="text-sm font-mono text-foreground font-semibold">{(formData ).color || '#3B82F6'}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Short Description</label>
                          <textarea rows={2} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 resize-none" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Full Marketing Description</label>
                          <textarea rows={4} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Level</label>
                            <select className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer" value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})}>
                              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Language</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Est. Duration</label>
                            <input type="text" placeholder="e.g. 10h 30m" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Media Tab */}
                    <div className={clsx(editorTab !== 'media' && "hidden")}>
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-indigo-500" /> Media & Landing Assets</h3>
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Thumbnail URL</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Banner Image URL</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.bannerImage} onChange={e => setFormData({...formData, bannerImage: e.target.value})} />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Preview Video URL (YouTube or Direct)</label>
                          <div className="relative">
                            <PlayCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                            <input type="text" className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.youtubeVideoUrl} onChange={e => setFormData({...formData, youtubeVideoUrl: e.target.value})} />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Target Audience</label>
                          <textarea rows={2} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none" value={formData.targetAudience} onChange={e => setFormData({...formData, targetAudience: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Learning Outcomes</label>
                          <textarea rows={3} placeholder="List outcomes separated by newlines..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none" value={formData.learningOutcomes} onChange={e => setFormData({...formData, learningOutcomes: e.target.value})} />
                        </div>
                      </div>
                    </div>

                    {/* SEO Tab */}
                    <div className={clsx(editorTab !== 'seo' && "hidden")}>
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-emerald-500" /> Search Engine Optimization</h3>
                      <div className="space-y-5">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Meta Title</label>
                          <input type="text" maxLength={70} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} />
                          <p className="text-[10px] text-muted-foreground mt-1 text-right">{formData.metaTitle.length}/70 chars</p>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Meta Description</label>
                          <textarea rows={2} maxLength={320} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500 resize-none" value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} />
                          <p className="text-[10px] text-muted-foreground mt-1 text-right">{formData.metaDescription.length}/320 chars</p>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Primary Keyword</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.primaryKeyword} onChange={e => setFormData({...formData, primaryKeyword: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Canonical URL</label>
                            <input type="url" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.canonicalUrl} onChange={e => setFormData({...formData, canonicalUrl: e.target.value})} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Settings Tab */}
                    <div className={clsx(editorTab !== 'advanced' && "hidden")}>
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-amber-500" /> Platform Settings</h3>
                      <div className="space-y-5">
                        <div className="p-4 border border-border/50 rounded-xl bg-background/50 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-foreground">Publish Status</p>
                            <p className="text-xs text-muted-foreground">Make this course visible to students in the catalog.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} />
                            <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>
                        <div className="p-4 border border-border/50 rounded-xl bg-background/50 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-foreground">Search Engine Indexing</p>
                            <p className="text-xs text-muted-foreground">Allow Google/Bing to index this course's public landing page.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={formData.allowIndexing} onChange={e => setFormData({...formData, allowIndexing: e.target.checked})} />
                            <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>
                        <div className="p-4 border border-border/50 rounded-xl bg-background/50 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-foreground">Featured Course</p>
                            <p className="text-xs text-muted-foreground">Pin this course to the top of the category browsing page.</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} />
                            <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                  </form>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-border/40 bg-secondary/30 flex items-center justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsEditorOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-border/50 hover:bg-secondary transition-colors cursor-pointer">
                  Discard Draft
                </button>
                <button type="submit" form="course-form" className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all cursor-pointer">
                  {isEditMode ? "Save Complete Profile" : "Initialize Course Entity"}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
