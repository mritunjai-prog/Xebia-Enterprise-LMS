import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconAdd } from '../../components/Icons';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Clock, Users, ShieldAlert, Edit3, Globe, Settings, BarChart3, Image as ImageIcon, CheckCircle, ChevronRight, X, PlayCircle, Eye, Activity, Layers, BookMarked, Video, Star, TrendingUp, Award, Zap, LayoutGrid, List } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';

const mockCourses = [
  {
    id: 'C491', title: 'Enterprise Architecture Patterns', category: 'Architecture', level: 'Advanced', language: 'English', duration: '12h 30m', totalViews: 1400, isPublished: true, isActive: true, enrollments: 124, modules: 8, submodules: 22, lessons: 41, rating: 4.8, language: 'English',
    icon: '🏗️', color: '#6C1D5F', slug: 'enterprise-architecture-patterns',
    shortDescription: 'Master large-scale distributed systems design. Learn patterns used by top tech companies to build resilient, scalable enterprise software.',
    courseHighlights: '✅ 12+ real-world architecture case studies\n✅ Domain-Driven Design (DDD) deep dive\n✅ Event-driven architecture patterns\n✅ CQRS and Event Sourcing\n✅ Certificate of completion',
    learningOutcomes: '• Design and evaluate enterprise-grade architecture\n• Apply microservices decomposition strategies\n• Implement distributed transactions with Sagas\n• Build event-driven systems using Kafka',
    prerequisites: '• 3+ years of software development experience\n• Familiarity with REST APIs and databases\n• Basic understanding of cloud platforms (AWS/GCP/Azure)',
    careerOpportunities: '🚀 Solutions Architect\n🚀 Principal Engineer\n🚀 Enterprise Architect\n🚀 Technical Lead',
    targetAudience: 'Senior developers and tech leads looking to transition into architecture roles or deepen their system design expertise.',
  },
  {
    id: 'C812', title: 'Advanced React & Next.js', category: 'Programming', level: 'Intermediate', language: 'English', duration: '8h 15m', totalViews: 320, isPublished: false, isActive: true, enrollments: 0, modules: 6, submodules: 18, lessons: 34, rating: 4.5,
    icon: '⚛️', color: '#3B82F6', slug: 'advanced-react-nextjs',
    shortDescription: 'Go beyond the basics. Build production-ready React applications with Next.js 15, covering SSR, server components, and performance optimization.',
    courseHighlights: '✅ React 19 + Next.js 15 App Router\n✅ Server Components & Server Actions\n✅ Full-stack data fetching patterns\n✅ Performance profiling & optimization\n✅ Deployment to Vercel / Docker',
    learningOutcomes: '• Build full-stack apps with the Next.js App Router\n• Implement authentication with NextAuth.js\n• Optimize Core Web Vitals\n• Use Zustand and React Query effectively',
    prerequisites: '• Solid JavaScript (ES2020+) knowledge\n• Working experience with React hooks\n• Basic knowledge of Node.js',
    careerOpportunities: '🚀 Frontend Engineer\n🚀 Full-Stack Developer\n🚀 React Specialist',
    targetAudience: 'Mid-level developers comfortable with React who want to master modern full-stack development.',
  },
  {
    id: 'C102', title: 'Microservices with Spring Boot', category: 'Architecture', level: 'Advanced', language: 'English', duration: '15h 0m', totalViews: 4500, isPublished: true, isActive: true, enrollments: 89, modules: 12, submodules: 30, lessons: 58, rating: 4.9,
    icon: '🍃', color: '#10B981', slug: 'microservices-spring-boot',
    shortDescription: 'Build production-ready microservices from the ground up using Spring Boot, Spring Cloud, Docker, and Kubernetes.',
    courseHighlights: '✅ 15 hours of hands-on content\n✅ Service discovery, API Gateway, Circuit Breaker\n✅ Docker Compose & Kubernetes deployment\n✅ Observability with Prometheus & Grafana',
    learningOutcomes: '• Design and build a microservices ecosystem\n• Implement service discovery with Eureka\n• Set up API Gateway with Spring Cloud Gateway\n• Deploy to Kubernetes with Helm charts',
    prerequisites: '• Java 17+ proficiency\n• Experience with Spring Boot basics\n• Understanding of REST and SQL databases',
    careerOpportunities: '🚀 Backend Engineer (Java/Spring)\n🚀 Microservices Architect\n🚀 Cloud Engineer',
    targetAudience: 'Java developers who want to build and deploy modern cloud-native backend systems.',
  },
];

export default function Courses() {
  const { addToast } = useAppStore();
  const router = useRouter();
  const [courses, setCourses] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lms_courses_v1');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return mockCourses;
  });

  useEffect(() => {
    localStorage.setItem('lms_courses_v1', JSON.stringify(courses));
  }, [courses]);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  
  // Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState('basic');
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewCourse, setViewCourse] = useState(null);
  const [detailTab, setDetailTab] = useState('overview');
  
  const [formData, setFormData] = useState({
    id: '', title: '', slug: '', description: '', shortDescription: '', level: 'Beginner', language: 'English', duration: '',
    icon: '', color: '#3B82F6', thumbnail: '', bannerImage: '', isActive: true, isFeatured: false,
    metaTitle: '', metaDescription: '', primaryKeyword: '', canonicalUrl: '',
    secondaryKeywords: '', focusKeywords: '', robots: 'index, follow', author: '', seoCategory: '', seoTags: '',
    ogTitle: '', ogDescription: '', ogImage: '', ogUrl: '', ogType: 'website',
    twitterTitle: '', twitterDescription: '', twitterImage: '', twitterCard: 'summary_large_image',
    searchIntent: '', semanticKeywords: '', relatedTopics: '', searchSynonyms: '',
    faqContent: '', customHeadScript: '', customBodyScript: '',
    prerequisites: '', courseHighlights: '', careerOpportunities: '',
    youtubeVideoUrl: '', targetAudience: '', learningOutcomes: '',
    isPublished: false, allowIndexing: true, showInSearch: true
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
      secondaryKeywords: '', focusKeywords: '', robots: 'index, follow', author: '', seoCategory: '', seoTags: '',
      ogTitle: '', ogDescription: '', ogImage: '', ogUrl: '', ogType: 'website',
      twitterTitle: '', twitterDescription: '', twitterImage: '', twitterCard: 'summary_large_image',
      searchIntent: '', semanticKeywords: '', relatedTopics: '', searchSynonyms: '',
      faqContent: '', customHeadScript: '', customBodyScript: '',
      prerequisites: '', courseHighlights: '', careerOpportunities: '',
      youtubeVideoUrl: '', targetAudience: '', learningOutcomes: '',
      isPublished: false, allowIndexing: true, showInSearch: true
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
    if (!formData.title || !formData.slug || !formData.category || !formData.icon || !formData.color) {
      addToast("Please fill out all required fields in the Basic Info tab.", "error");
      setEditorTab('basic');
      return;
    }
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
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider min-w-[260px]">Course</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Level</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Language</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Duration</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Modules</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Visibility</th>
                <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-secondary/10 transition-colors group">
                  {/* Course Title + Thumbnail */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl shrink-0 overflow-hidden border border-border/30 shadow-sm"
                        style={{ background: course.color ? course.color + '22' : '#3B82F622' }}
                      >
                        {course.thumbnail ? (
                          <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : course.icon && course.icon.startsWith('http') ? (
                          <img src={course.icon} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">{course.icon || '📚'}</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p onClick={() => setViewCourse(course)} className="font-bold text-sm text-foreground hover:text-purple-500 cursor-pointer transition-colors truncate max-w-[200px]">{course.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{course.id}</p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="p-4">
                    <span className="bg-secondary/80 px-2.5 py-1 rounded-lg text-xs font-semibold text-foreground border border-border/50">{course.category || '—'}</span>
                  </td>
                  {/* Level */}
                  <td className="p-4">
                    <span className={clsx('px-2.5 py-1 rounded-lg text-xs font-bold border',
                      course.level === 'Beginner' && 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                      course.level === 'Intermediate' && 'bg-blue-500/10 text-blue-600 border-blue-500/20',
                      course.level === 'Advanced' && 'bg-purple-500/10 text-purple-600 border-purple-500/20',
                      !['Beginner','Intermediate','Advanced'].includes(course.level) && 'bg-secondary text-muted-foreground border-border/50',
                    )}>{course.level || '—'}</span>
                  </td>
                  {/* Language */}
                  <td className="p-4 text-xs text-muted-foreground font-medium">{course.language || 'English'}</td>
                  {/* Duration */}
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-xs font-semibold text-foreground">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />{course.duration || '—'}
                    </span>
                  </td>
                  {/* Modules count */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground">
                      <Layers className="w-3.5 h-3.5 text-indigo-500" />{course.modules || 0}
                    </span>
                  </td>
                  {/* Status: Active / Inactive */}
                  <td className="p-4">
                    <span className={clsx('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border',
                      course.isActive !== false
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-500 border-red-500/20'
                    )}>
                      <span className={clsx('w-1.5 h-1.5 rounded-full', course.isActive !== false ? 'bg-emerald-500' : 'bg-red-500')} />
                      {course.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  {/* Visibility: Published / Draft */}
                  <td className="p-4">
                    {course.isPublished ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/20">
                        <CheckCircle className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20">
                        <ShieldAlert className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => navigateToBuilder(course.id)} className="px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm" style={{background:'var(--primary, #6C1D5F)'}}>
                        Content <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleEdit(course)} className="h-8 w-8 rounded-lg bg-secondary border border-border/50 hover:bg-secondary/80 grid place-items-center text-foreground transition-colors cursor-pointer" title="Edit">
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
                            <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">URL Slug</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 font-mono" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Category</label>
                            <select className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer" value={(formData ).category || ''} onChange={e => setFormData({...formData, category: e.target.value} )}>
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
                              <input type="text" placeholder="e.g. 💻 or https://..." className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-blue-500" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
                              <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold" title="Upload Image">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                  if(e.target.files && e.target.files[0]) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => setFormData({...formData, icon: ev.target.result});
                                    reader.readAsDataURL(e.target.files[0]);
                                  }
                                }} />
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Brand Color</label>
                            <div className="flex gap-3 h-[42px] items-center px-3 bg-background border border-border/50 rounded-xl focus-within:border-blue-500 transition-colors">
                              <input type="color" className="h-6 w-6 rounded cursor-pointer border-0 p-0 bg-transparent" value={(formData ).color || '#3B82F6'} onChange={e => setFormData({...formData, color: e.target.value} )} />
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
                            <div className="flex gap-2">
                              <input type="text" className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} />
                              <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold" title="Upload Thumbnail Image">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                  if(e.target.files && e.target.files[0]) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => setFormData({...formData, thumbnail: ev.target.result});
                                    reader.readAsDataURL(e.target.files[0]);
                                  }
                                }} />
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Banner Image URL</label>
                            <div className="flex gap-2">
                              <input type="text" className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.bannerImage} onChange={e => setFormData({...formData, bannerImage: e.target.value})} />
                              <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold" title="Upload Banner Image">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                  if(e.target.files && e.target.files[0]) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => setFormData({...formData, bannerImage: ev.target.result});
                                    reader.readAsDataURL(e.target.files[0]);
                                  }
                                }} />
                              </label>
                            </div>
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
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Prerequisites</label>
                          <textarea rows={3} placeholder="e.g. Basic programming knowledge, HTML/CSS..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none" value={formData.prerequisites || ''} onChange={e => setFormData({...formData, prerequisites: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Course Highlights</label>
                          <textarea rows={3} placeholder="Key highlights shown on the course landing page..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none" value={formData.courseHighlights || ''} onChange={e => setFormData({...formData, courseHighlights: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Career Opportunities</label>
                          <textarea rows={3} placeholder="What career paths does this course unlock?" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none" value={formData.careerOpportunities || ''} onChange={e => setFormData({...formData, careerOpportunities: e.target.value})} />
                        </div>
                      </div>
                    </div>

                    {/* SEO Tab */}
                    <div className={clsx(editorTab !== 'seo' && "hidden")}>
                      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-emerald-500" /> Search Engine Optimization</h3>
                      <div className="space-y-6">

                        <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-500">Core SEO</h4>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Meta Title</label>
                            <input type="text" maxLength={70} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.metaTitle || ''} onChange={e => setFormData({...formData, metaTitle: e.target.value})} />
                            <p className="text-[10px] text-muted-foreground mt-1 text-right">{(formData.metaTitle || '').length}/70 chars</p>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Meta Description</label>
                            <textarea rows={2} maxLength={320} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500 resize-none" value={formData.metaDescription || ''} onChange={e => setFormData({...formData, metaDescription: e.target.value})} />
                            <p className="text-[10px] text-muted-foreground mt-1 text-right">{(formData.metaDescription || '').length}/320 chars</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Primary Keyword</label>
                              <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.primaryKeyword || ''} onChange={e => setFormData({...formData, primaryKeyword: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Canonical URL</label>
                              <input type="url" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.canonicalUrl || ''} onChange={e => setFormData({...formData, canonicalUrl: e.target.value})} />
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-5 space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400">Advanced SEO</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Secondary Keywords</label>
                              <textarea rows={2} placeholder="Comma separated..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500 resize-none" value={formData.secondaryKeywords || ''} onChange={e => setFormData({...formData, secondaryKeywords: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Focus Keywords</label>
                              <textarea rows={2} placeholder="Comma separated..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500 resize-none" value={formData.focusKeywords || ''} onChange={e => setFormData({...formData, focusKeywords: e.target.value})} />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Author</label>
                              <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.author || ''} onChange={e => setFormData({...formData, author: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">SEO Category</label>
                              <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.seoCategory || ''} onChange={e => setFormData({...formData, seoCategory: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Robots</label>
                              <input type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.robots || 'index, follow'} onChange={e => setFormData({...formData, robots: e.target.value})} />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">SEO Tags</label>
                            <input type="text" placeholder="Comma separated tags..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-emerald-500" value={formData.seoTags || ''} onChange={e => setFormData({...formData, seoTags: e.target.value})} />
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-5 space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Open Graph (Facebook / LinkedIn)</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">OG Title</label>
                              <input type="text" maxLength={150} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.ogTitle || ''} onChange={e => setFormData({...formData, ogTitle: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">OG URL</label>
                              <input type="url" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.ogUrl || ''} onChange={e => setFormData({...formData, ogUrl: e.target.value})} />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">OG Description</label>
                            <textarea rows={2} maxLength={500} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none" value={formData.ogDescription || ''} onChange={e => setFormData({...formData, ogDescription: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">OG Image URL</label>
                            <div className="flex gap-2">
                              <input type="text" placeholder="https://..." className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500" value={formData.ogImage || ''} onChange={e => setFormData({...formData, ogImage: e.target.value})} />
                              <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer border border-border/50" title="Upload OG Image">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => { if(e.target.files && e.target.files[0]) { (() => { const r = new FileReader(); r.onload = (ev) => setFormData({...formData, ogImage: ev.target.result}); r.readAsDataURL(e.target.files[0]); })(); }}} />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-5 space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">Twitter / X Card</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Twitter Title</label>
                              <input type="text" maxLength={150} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-sky-500" value={formData.twitterTitle || ''} onChange={e => setFormData({...formData, twitterTitle: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Twitter Image URL</label>
                              <div className="flex gap-2">
                                <input type="text" className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-sky-500" value={formData.twitterImage || ''} onChange={e => setFormData({...formData, twitterImage: e.target.value})} />
                                <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer border border-border/50">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                  <input type="file" className="hidden" accept="image/*" onChange={(e) => { if(e.target.files && e.target.files[0]) { (() => { const r = new FileReader(); r.onload = (ev) => setFormData({...formData, twitterImage: ev.target.result}); r.readAsDataURL(e.target.files[0]); })(); }}} />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Twitter Description</label>
                            <textarea rows={2} maxLength={500} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-sky-500 resize-none" value={formData.twitterDescription || ''} onChange={e => setFormData({...formData, twitterDescription: e.target.value})} />
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-5 space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-purple-400">Programmatic SEO</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Search Intent</label>
                              <textarea rows={2} placeholder="e.g. informational, navigational..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-purple-500 resize-none" value={formData.searchIntent || ''} onChange={e => setFormData({...formData, searchIntent: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Semantic Keywords</label>
                              <textarea rows={2} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-purple-500 resize-none" value={formData.semanticKeywords || ''} onChange={e => setFormData({...formData, semanticKeywords: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Related Topics</label>
                              <textarea rows={2} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-purple-500 resize-none" value={formData.relatedTopics || ''} onChange={e => setFormData({...formData, relatedTopics: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Search Synonyms</label>
                              <textarea rows={2} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-purple-500 resize-none" value={formData.searchSynonyms || ''} onChange={e => setFormData({...formData, searchSynonyms: e.target.value})} />
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-5 space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">FAQ Content and Custom Scripts</h4>
                          <div>
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">FAQ Content (JSON or plain text)</label>
                            <textarea rows={3} placeholder="Q: ... A: ..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-amber-500 resize-none font-mono" value={formData.faqContent || ''} onChange={e => setFormData({...formData, faqContent: e.target.value})} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Custom Head Script</label>
                              <textarea rows={3} placeholder="script tag here..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-amber-500 resize-none font-mono" value={formData.customHeadScript || ''} onChange={e => setFormData({...formData, customHeadScript: e.target.value})} />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Custom Body Script</label>
                              <textarea rows={3} placeholder="script tag here..." className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-amber-500 resize-none font-mono" value={formData.customBodyScript || ''} onChange={e => setFormData({...formData, customBodyScript: e.target.value})} />
                            </div>
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

      {/* Course Detail View Modal (Student-facing preview) */}
      <AnimatePresence>
        {viewCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm" onClick={() => setViewCourse(null)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-4xl max-h-[90vh] glass rounded-2xl overflow-hidden flex flex-col border border-border/40 shadow-2xl" onClick={e => e.stopPropagation()}>
              {/* Hero banner */}
              {/* Hero Banner */}
              <div className="relative h-48 shrink-0 overflow-hidden rounded-t-2xl">
                {viewCourse.bannerImage
                  ? <img src={viewCourse.bannerImage} className="absolute inset-0 w-full h-full object-cover" alt="banner" />
                  : <div className="absolute inset-0" style={{background:`linear-gradient(135deg,${viewCourse.color||'#6C1D5F'}dd,${viewCourse.color||'#6C1D5F'}88)`}} />
                }
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Top-right close + status chips */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  {viewCourse.isActive !== false && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-white uppercase tracking-wider">Active</span>}
                  {viewCourse.isPublished && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500 text-white uppercase tracking-wider">Published</span>}
                  {viewCourse.category && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/40 text-white backdrop-blur-sm uppercase tracking-wider">{viewCourse.category}</span>}
                  {viewCourse.level && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/40 text-white backdrop-blur-sm uppercase tracking-wider">Level: {viewCourse.level}</span>}
                </div>
                <button onClick={() => setViewCourse(null)} className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/40 backdrop-blur-sm grid place-items-center hover:bg-black/60 cursor-pointer z-10">
                  <X className="w-4 h-4 text-white" />
                </button>
                {/* Bottom: icon + title + actions */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-3">
                  <div className="w-14 h-14 rounded-2xl shrink-0 overflow-hidden border-2 border-white/25 shadow-xl bg-black/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                    {viewCourse.thumbnail ? <img src={viewCourse.thumbnail} className="w-full h-full object-cover" alt="" />
                      : viewCourse.icon && viewCourse.icon.startsWith('http') ? <img src={viewCourse.icon} className="w-full h-full object-cover" alt="" />
                      : viewCourse.icon || '📚'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-white leading-tight">{viewCourse.title}</h2>
                    <p className="text-xs text-white/60 mt-0.5">{viewCourse.language || 'English'} · {viewCourse.duration || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40 bg-secondary/20 shrink-0">
                <button onClick={() => { setViewCourse(null); handleEdit(viewCourse); }} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border border-border/50 bg-secondary hover:bg-secondary/80 text-foreground transition-colors cursor-pointer">
                  <Edit3 className="w-3.5 h-3.5" /> Edit Course
                </button>
                <button onClick={() => navigateToBuilder(viewCourse.id)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer" style={{background:'var(--primary,#6C1D5F)'}}>
                  <Layers className="w-3.5 h-3.5" /> Curriculum
                </button>
                {!viewCourse.isPublished && (
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/40 text-emerald-600 bg-emerald-500/8 hover:bg-emerald-500/15 transition-colors cursor-pointer">
                    <CheckCircle className="w-3.5 h-3.5" /> Publish
                  </button>
                )}
                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{viewCourse.enrollments||0}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{viewCourse.totalViews||0}</span>
                </div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-4 divide-x divide-border/40 border-b border-border/40 shrink-0">
                {[
                  { icon: Layers, label: 'Modules', value: viewCourse.modules||0, color:'text-indigo-500' },
                  { icon: BookMarked, label: 'Submodules', value: viewCourse.submodules||0, color:'text-purple-500' },
                  { icon: Video, label: 'Lessons', value: viewCourse.lessons||0, color:'text-pink-500' },
                  { icon: Clock, label: 'Duration', value: viewCourse.duration||'—', color:'text-blue-500' },
                ].map(stat => (
                  <div key={stat.label} className="flex flex-col items-center justify-center py-3 gap-0.5">
                    <stat.icon className={'w-4 h-4 ' + stat.color} />
                    <span className="text-lg font-black text-foreground leading-tight">{stat.value}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border/40 shrink-0 px-2">
                {['overview','media','seo'].map(tab => (
                  <button key={tab} onClick={() => setDetailTab(tab)} className={'px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer capitalize ' + (detailTab===tab ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab body */}
              <div className="flex-1 overflow-y-auto">

                {/* Overview Tab */}
                {detailTab === 'overview' && (
                  <div className="grid grid-cols-3 gap-0 h-full">
                    {/* Left: content 2/3 */}
                    <div className="col-span-2 p-5 space-y-5 border-r border-border/40 overflow-y-auto">
                      {/* General Info */}
                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-2">General Information</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {viewCourse.shortDescription || viewCourse.description || <span className="italic">No description added yet.</span>}
                        </p>
                      </div>

                      {/* Learning Outcomes */}
                      <div className="border-t border-border/40 pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Zap className="w-4 h-4 text-emerald-500" />
                          <h3 className="text-sm font-bold text-foreground">Learning Outcomes</h3>
                        </div>
                        {viewCourse.learningOutcomes ? (
                          <div className="space-y-2">
                            {viewCourse.learningOutcomes.split('\n').map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span>{item.replace(/^[•-]s*/, '')}</span>
                              </div>
                            ))}
                          </div>
                        ) : <p className="text-sm text-muted-foreground italic">Not added yet.</p>}
                      </div>

                      {/* Course Highlights */}
                      <div className="border-t border-border/40 pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-4 h-4 text-amber-500" />
                          <h3 className="text-sm font-bold text-foreground">Course Highlights</h3>
                        </div>
                        {viewCourse.courseHighlights ? (
                          <div className="space-y-1.5">
                            {viewCourse.courseHighlights.split('\n').map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                                <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                <span>{item.replace(/^[✅•-]s*/, '')}</span>
                              </div>
                            ))}
                          </div>
                        ) : <p className="text-sm text-muted-foreground italic">Not added yet.</p>}
                      </div>

                      {/* Prerequisites */}
                      <div className="border-t border-border/40 pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-blue-500" />
                          <h3 className="text-sm font-bold text-foreground">Prerequisites</h3>
                        </div>
                        {viewCourse.prerequisites ? (
                          <div className="space-y-1.5">
                            {viewCourse.prerequisites.split('\n').map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                <span>{item.replace(/^[•-]s*/, '')}</span>
                              </div>
                            ))}
                          </div>
                        ) : <p className="text-sm text-muted-foreground italic">No prerequisites — open to all levels.</p>}
                      </div>

                      {/* Career Opportunities */}
                      {viewCourse.careerOpportunities && (
                        <div className="border-t border-border/40 pt-4">
                          <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-purple-500" />
                            <h3 className="text-sm font-bold text-foreground">Career Opportunities</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {viewCourse.careerOpportunities.split('\n').map((item, i) => (
                              <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 border border-purple-500/20">
                                {item.replace(/^[🚀•-]s*/, '')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right sidebar 1/3 */}
                    <div className="p-4 space-y-4 overflow-y-auto">
                      {/* Course Status card */}
                      <div className="rounded-xl border border-border/50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-border/40 bg-secondary/30 flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground uppercase tracking-wider">Course Status</span>
                        </div>
                        <div className="divide-y divide-border/30">
                          {[
                            { label: 'Enrollments', value: (viewCourse.enrollments||0).toLocaleString(), icon: Users, color: 'text-blue-500' },
                            { label: 'Avg. Rating', value: viewCourse.rating ? viewCourse.rating + ' / 5' : 'N/A', icon: Star, color: 'text-amber-500' },
                            { label: 'Profile Views', value: (viewCourse.totalViews||0).toLocaleString(), icon: Eye, color: 'text-indigo-500' },
                          ].map(stat => (
                            <div key={stat.label} className="flex items-center justify-between px-4 py-3">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <stat.icon className={'w-3.5 h-3.5 ' + stat.color} />
                                {stat.label}
                              </div>
                              <span className="text-sm font-bold text-foreground">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Instructor card */}
                      <div className="rounded-xl border border-border/50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-border/40 bg-secondary/30">
                          <span className="text-xs font-bold text-foreground uppercase tracking-wider">Instructor</span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{background:'var(--primary,#6C1D5F)'}}>
                              {(viewCourse.author||'A').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-foreground">{viewCourse.author || 'Author TBD'}</p>
                              <p className="text-xs text-muted-foreground">{viewCourse.seoCategory || 'Instructor'}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center p-2 rounded-lg bg-secondary/50">
                              <p className="font-bold text-foreground">{viewCourse.modules||0}</p>
                              <p className="text-muted-foreground">Modules</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-secondary/50">
                              <p className="font-bold text-foreground">{viewCourse.rating||'—'}</p>
                              <p className="text-muted-foreground">Rating</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Target Audience */}
                      {viewCourse.targetAudience && (
                        <div className="rounded-xl border border-border/50 overflow-hidden">
                          <div className="px-4 py-3 border-b border-border/40 bg-secondary/30">
                            <span className="text-xs font-bold text-foreground uppercase tracking-wider">Target Audience</span>
                          </div>
                          <p className="p-4 text-xs text-muted-foreground leading-relaxed">{viewCourse.targetAudience}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Media Tab */}
                {detailTab === 'media' && (
                  <div className="p-6 space-y-4">
                    {viewCourse.bannerImage && (
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Banner Image</p>
                        <img src={viewCourse.bannerImage} className="w-full h-40 object-cover rounded-xl border border-border/40" alt="banner" />
                      </div>
                    )}
                    {viewCourse.thumbnail && (
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Thumbnail</p>
                        <img src={viewCourse.thumbnail} className="w-40 h-40 object-cover rounded-xl border border-border/40" alt="thumbnail" />
                      </div>
                    )}
                    {viewCourse.youtubeVideoUrl && (
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Preview Video</p>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border/40 text-sm text-foreground">
                          <PlayCircle className="w-4 h-4 text-red-500 shrink-0" />{viewCourse.youtubeVideoUrl}
                        </div>
                      </div>
                    )}
                    {!viewCourse.bannerImage && !viewCourse.thumbnail && !viewCourse.youtubeVideoUrl && (
                      <p className="text-sm text-muted-foreground italic text-center py-10">No media uploaded yet. Edit the course to add media.</p>
                    )}
                  </div>
                )}

                {/* SEO Tab */}
                {detailTab === 'seo' && (
                  <div className="p-6 space-y-3">
                    {[
                      { label: 'Meta Title', value: viewCourse.metaTitle },
                      { label: 'Meta Description', value: viewCourse.metaDescription },
                      { label: 'Primary Keyword', value: viewCourse.primaryKeyword },
                      { label: 'Canonical URL', value: viewCourse.canonicalUrl },
                      { label: 'Robots', value: viewCourse.robots },
                    ].map(f => f.value && (
                      <div key={f.label} className="rounded-xl border border-border/50 overflow-hidden">
                        <div className="px-4 py-2 bg-secondary/30 border-b border-border/40">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{f.label}</span>
                        </div>
                        <p className="px-4 py-2.5 text-sm text-foreground">{f.value}</p>
                      </div>
                    ))}
                    {!viewCourse.metaTitle && !viewCourse.metaDescription && (
                      <p className="text-sm text-muted-foreground italic text-center py-10">No SEO data added yet. Edit the course → SEO tab.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 border-t border-border/40 bg-secondary/10 flex items-center justify-between shrink-0">
                <button onClick={() => setViewCourse(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Close</button>
                <button
                  onClick={() => setViewCourse(null)}
                  className="px-6 py-2 rounded-xl text-sm font-bold text-white transition-all cursor-pointer shadow-lg"
                  style={{background: viewCourse.color||'#6C1D5F', boxShadow:'0 4px 14px ' + (viewCourse.color||'#6C1D5F') + '55'}}
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
