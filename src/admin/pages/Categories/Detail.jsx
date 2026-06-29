import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useRouter, useParams } from '@tanstack/react-router';
import { CategoryService, CourseService } from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle, Eye, Check, Image as ImageIcon, X, BookOpen, Info, BarChart2, Upload, PieChart as PieChartIcon, Clock, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import clsx from 'clsx';

export default function CategoryDetail() {
  const { addToast } = useAppStore();
  const router = useRouter();
  const { categoryId } = useParams({ strict: false });
  const isNew = categoryId === 'new';

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    icon: '',
    color: '#6C1D5F', // Default to Tranquil Velvet
    description: '',
    status: 'Active'
  });

  const [iconMode, setIconMode] = useState('emoji'); // 'emoji', 'url', or 'upload'

  const presetColors = ['#6C1D5F', '#4A1E47', '#84117C', '#01AC9F', '#FF6200', '#5C4F61', '#91759E', '#000000'];

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function loadCategory() {
      try {
        const [catData, courseData] = await Promise.all([
          CategoryService.getCategories(),
          CourseService.getCourses().catch(() => [])
        ]);

        if (courseData && courseData.length > 0) {
          setCourses(courseData);
        }

        if (isNew) return;
        const cat = catData.find(c => c.id === categoryId);
        if (cat) {
          setFormData({
            ...cat,
            status: cat.isActive !== false ? 'Active' : 'Inactive' 
          });
          if (cat.icon && cat.icon.startsWith('http')) {
            setIconMode('url');
          } else {
            setIconMode('emoji');
          }
        } else {
          addToast("Category not found.", "error");
          router.navigate({ to: '/admin/categories' });
        }
      } catch (err) {
        console.error(err);
        addToast("Failed to fetch data.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadCategory();
  }, [categoryId]);

  const handleSubmit = async (e, asDraft = false) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name) {
      addToast("Category Name is required.", "error");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');
    
    // Status handling mapping to backend isActive
    const payload = { ...formData };
    if (asDraft) {
      payload.isActive = false;
    } else {
      payload.isActive = payload.status === 'Active';
    }

    try {
      if (!isNew) {
        await CategoryService.updateCategory(formData.id, payload);
        setSuccessMessage('Category updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const savedCat = await CategoryService.createCategory(payload);
        setSuccessMessage('Category created successfully!');
        setTimeout(() => {
          router.navigate({ to: `/admin/categories` });
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      addToast(err.message || "Failed to save category.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const mockAnalyticsData = [
    { name: 'Q1', enrollments: 1240 },
    { name: 'Q2', enrollments: 1890 },
    { name: 'Q3', enrollments: 2400 },
    { name: 'Q4', enrollments: 3100 }
  ];

  const mockPieData = [
    { name: 'Video', value: 400 },
    { name: 'Text', value: 300 },
    { name: 'Quizzes', value: 300 }
  ];

  const chartColors = ['#FF6200', '#01AC9F', '#3b82f6', '#6C1D5F'];

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24 font-sans text-[var(--black)]">
      {/* Breadcrumb Header */}
      <div className="h-16 border-b border-[var(--light-gray)] px-8 flex items-center justify-between sticky top-0 bg-[var(--white)]/90 backdrop-blur-md z-40">
        <div className="flex items-center text-sm font-medium">
          <span className="text-[var(--dark-gray)] cursor-pointer hover:text-[var(--black)] transition-colors" onClick={() => router.navigate({ to: '/admin' })}>Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-2 text-[#DEDEDE]" />
          <span className="text-[var(--dark-gray)] cursor-pointer hover:text-[var(--black)] transition-colors" onClick={() => router.navigate({ to: '/admin/categories' })}>Categories</span>
          <ChevronRight className="w-4 h-4 mx-2 text-[#DEDEDE]" />
          <span className="font-bold text-[var(--black)]">{isNew ? 'Create New Category' : formData.name || 'Edit Category'}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 bg-[var(--input-bg)] text-[var(--dark-gray)] rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-[var(--light-gray)]">
            <CheckCircle className="w-3.5 h-3.5" style={{ color: formData.color }} /> Auto-saved
          </div>
          <div className="w-8 h-8 rounded-full text-[var(--white)] flex items-center justify-center text-sm font-bold shadow-sm" style={{ backgroundColor: formData.color }}>
            SA
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] w-full mx-auto p-8 grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-10">
        
        {/* Left Area: Form Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-[32px] font-bold text-[var(--black)] tracking-tight">{isNew ? 'Create Category' : 'Category Settings'}</h1>
            <p className="text-[var(--dark-gray)] mt-2 font-medium">Manage the identity, branding, and visibility of this learning category.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] shadow-[var(--shadow)] p-8 space-y-8">
            <h2 className="text-xl font-bold text-[var(--black)] border-b border-[var(--light-gray)] pb-4 flex items-center gap-2">
               <Info className="w-5 h-5 text-[var(--dark-gray)]" /> 
               <div className="flex flex-col">
                 <span>General Information</span>
                 <span className="text-[13px] text-[var(--dark-gray)] font-medium mt-0.5">Basic details required to identify this category.</span>
               </div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[13px] font-bold text-[var(--black)] mb-2">Category Name <span className="text-[var(--orange)]">*</span></label>
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="e.g. Data Science & AI" 
                    className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--light-gray)] rounded-[12px] text-sm focus:outline-none transition-all pr-10 text-[var(--black)] placeholder:text-[#5A5A5A]"
                    style={{ '--tw-ring-color': `${formData.color}33`, '--tw-border-opacity': 1 }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--emerald)'; e.target.style.boxShadow = `0 0 0 4px rgba(1,172,159,0.15)`; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--light-gray)'; e.target.style.boxShadow = 'none'; }}
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  {formData.name && <CheckCircle className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--emerald)' }} />}
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-[var(--black)] mb-2 flex items-center gap-2">
                  URL Slug <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-[var(--white)]" style={{ backgroundColor: formData.color }}>AUTO</span>
                </label>
                <input 
                  type="text" 
                  readOnly
                  placeholder="data-science-ai" 
                  className="w-full px-4 py-3 bg-[#F0F2F5] border border-[var(--light-gray)] rounded-[12px] text-sm text-[var(--dark-gray)] font-mono shadow-inner cursor-not-allowed outline-none"
                  value={formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[var(--black)] mb-2">Description</label>
              <textarea 
                rows={4} 
                placeholder="Describe what this category covers..." 
                className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--light-gray)] rounded-[12px] text-sm focus:outline-none transition-all resize-none text-[var(--black)] placeholder:text-[#5A5A5A]"
                onFocus={(e) => { e.target.style.borderColor = 'var(--emerald)'; e.target.style.boxShadow = `0 0 0 4px rgba(1,172,159,0.15)`; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--light-gray)'; e.target.style.boxShadow = 'none'; }}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] shadow-[var(--shadow)] p-8 space-y-8">
            <h2 className="text-xl font-bold text-[var(--black)] border-b border-[var(--light-gray)] pb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[var(--dark-gray)]" />
              <div className="flex flex-col">
                 <span>Brand & Visuals</span>
                 <span className="text-[13px] text-[var(--dark-gray)] font-medium mt-0.5">Set the colors and icons for visual identity.</span>
               </div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[13px] font-bold text-[var(--black)] mb-3">Icon / Thumbnail</label>
                <div className="flex items-center gap-1 p-1 bg-[var(--input-bg)] rounded-lg w-max mb-3 border border-[var(--light-gray)]">
                  <button onClick={() => setIconMode('emoji')} className={clsx("px-4 py-1.5 rounded-md text-xs font-bold transition-all", iconMode === 'emoji' ? "bg-[var(--white)] text-[var(--black)] shadow-sm border border-[var(--light-gray)]" : "text-[var(--dark-gray)] hover:text-[var(--black)]")}>Emoji</button>
                  <button onClick={() => setIconMode('url')} className={clsx("px-4 py-1.5 rounded-md text-xs font-bold transition-all", iconMode === 'url' ? "bg-[var(--white)] text-[var(--black)] shadow-sm border border-[var(--light-gray)]" : "text-[var(--dark-gray)] hover:text-[var(--black)]")}>Image URL</button>
                  <button onClick={() => setIconMode('upload')} className={clsx("px-4 py-1.5 rounded-md text-xs font-bold transition-all", iconMode === 'upload' ? "bg-[var(--white)] text-[var(--black)] shadow-sm border border-[var(--light-gray)]" : "text-[var(--dark-gray)] hover:text-[var(--black)]")}>Upload Image</button>
                </div>
                
                {iconMode === 'upload' ? (
                  <div className="flex items-center gap-3 w-full px-4 py-2 bg-[var(--input-bg)] border border-[var(--light-gray)] rounded-[12px] border-dashed transition-all hover:border-[var(--primary)] group relative">
                    <Upload className="w-4 h-4 text-[var(--dark-gray)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({...formData, icon: reader.result});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="text-sm text-[var(--dark-gray)] file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[var(--white)] file:text-[var(--black)] hover:file:bg-gray-100 file:shadow-sm cursor-pointer w-full outline-none" 
                    />
                  </div>
                ) : (
                  <input 
                    type="text" 
                    placeholder={iconMode === 'emoji' ? "Type an emoji..." : "https://example.com/image.png"} 
                    className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--light-gray)] rounded-[12px] text-sm focus:outline-none transition-all text-[var(--black)] placeholder:text-[#5A5A5A]"
                    onFocus={(e) => { e.target.style.borderColor = 'var(--emerald)'; e.target.style.boxShadow = `0 0 0 4px rgba(1,172,159,0.15)`; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--light-gray)'; e.target.style.boxShadow = 'none'; }}
                    value={formData.icon}
                    onChange={e => setFormData({...formData, icon: e.target.value})}
                  />
                )}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[var(--black)] mb-3">Accent Color</label>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-[var(--light-gray)] shrink-0 cursor-pointer">
                    <input 
                      type="color" 
                      className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                      value={formData.color}
                      onChange={e => setFormData({...formData, color: e.target.value})}
                    />
                  </div>
                  <div className="flex-1 bg-[var(--input-bg)] border border-[var(--light-gray)] rounded-[12px] px-3 py-3 flex items-center gap-2 focus-within:border-[var(--emerald)] focus-within:ring-4 focus-within:ring-[var(--emerald)]/10 transition-all">
                    <span className="text-[#5A5A5A] font-mono text-sm">#</span>
                    <input 
                      type="text" 
                      className="bg-transparent border-none outline-none text-sm font-bold text-[var(--black)] uppercase w-full"
                      value={formData.color.replace('#', '')}
                      onChange={e => setFormData({...formData, color: `#${e.target.value}`})}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {presetColors.map(c => (
                    <button 
                      key={c}
                      onClick={(e) => { e.preventDefault(); setFormData({...formData, color: c}); }}
                      className={clsx("w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-sm border border-[var(--light-gray)]")}
                      style={{ backgroundColor: c, borderColor: formData.color === c ? 'var(--white)' : 'rgba(0,0,0,0.1)', boxShadow: formData.color === c ? `0 0 0 2px ${c}` : undefined }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] shadow-[var(--shadow)] p-8">
            <h2 className="text-xl font-bold text-[var(--black)] border-b border-[var(--light-gray)] pb-4 mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[var(--dark-gray)]" /> 
              <div className="flex flex-col">
                 <span>Access & Publishing</span>
                 <span className="text-[13px] text-[var(--dark-gray)] font-medium mt-0.5">Control the visibility of this category for learners.</span>
               </div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label 
                className="flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-colors border"
                style={{ borderColor: formData.status === 'Active' ? 'var(--emerald)' : 'var(--light-gray)', backgroundColor: formData.status === 'Active' ? `rgba(1,172,159,0.05)` : 'var(--white)' }}
                onClick={() => setFormData({...formData, status: 'Active'})}
              >
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors" style={{ borderColor: formData.status === 'Active' ? 'var(--emerald)' : '#d1d5db', backgroundColor: formData.status === 'Active' ? 'var(--emerald)' : 'transparent' }}>
                  {formData.status === 'Active' && <div className="w-2 h-2 rounded-full bg-[var(--white)]" />}
                </div>
                <div>
                  <p className="text-[13px] font-bold" style={{ color: formData.status === 'Active' ? 'var(--emerald)' : 'var(--black)' }}>Active & Visible</p>
                  <p className="text-xs text-[var(--dark-gray)] mt-1 font-medium">Visible to all learners.</p>
                </div>
              </label>

              <label 
                className="flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-colors border"
                style={{ borderColor: formData.status === 'Inactive' ? 'var(--dark-gray)' : 'var(--light-gray)', backgroundColor: formData.status === 'Inactive' ? 'var(--input-bg)' : 'var(--white)' }}
                onClick={() => setFormData({...formData, status: 'Inactive'})}
              >
                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors" style={{ borderColor: formData.status === 'Inactive' ? 'var(--dark-gray)' : '#d1d5db', backgroundColor: formData.status === 'Inactive' ? 'var(--dark-gray)' : 'transparent' }}>
                  {formData.status === 'Inactive' && <div className="w-2 h-2 rounded-full bg-[var(--white)]" />}
                </div>
                <div>
                  <p className="text-[13px] font-bold" style={{ color: formData.status === 'Inactive' ? 'var(--black)' : 'var(--dark-gray)' }}>Inactive (Hidden)</p>
                  <p className="text-xs text-[var(--dark-gray)] mt-1 font-medium">Hidden from learners.</p>
                </div>
              </label>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Area: Sidebar Previews */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          <div className="sticky top-24 space-y-6">
            
            <h3 className="text-[11px] font-bold text-[var(--dark-gray)] uppercase tracking-widest flex items-center gap-2"><Eye className="w-4 h-4" /> Live Preview</h3>
            
            {/* The Live Preview Card */}
            <motion.div 
              whileHover={{ 
                rotateX: 4, 
                rotateY: -4, 
                scale: 1.02, 
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
                y: -5
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              className="relative group"
            >
              {/* Pseudo-layers for 3D stacking effect */}
              <div className="absolute inset-0 bg-[var(--white)] rounded-[18px] border border-[var(--light-gray)] opacity-40 translate-y-3 translate-x-3 -z-20 transition-transform group-hover:translate-y-5 group-hover:translate-x-5" />
              <div className="absolute inset-0 bg-[var(--white)] rounded-[18px] border border-[var(--light-gray)] opacity-70 translate-y-1.5 translate-x-1.5 -z-10 transition-transform group-hover:translate-y-2.5 group-hover:translate-x-2.5" />

              <div className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] shadow-[var(--shadow-hover)] overflow-hidden transition-all relative z-0 flex flex-col p-0 h-full">
                {/* Top Cover Area */}
                <div 
                  className="h-32 w-full relative flex items-center justify-center overflow-hidden shrink-0"
                  style={{ backgroundColor: `${formData.color}15` }}
                >
                  <div className="absolute inset-0 opacity-20 bg-grid-pattern" style={{ backgroundImage: 'radial-gradient(var(--black) 1px, transparent 1px)', backgroundSize: '16px 16px', opacity: 0.05 }} />
                  {formData.icon && (formData.icon.startsWith('http') || formData.icon.startsWith('data:')) ? (
                    <img src={formData.icon} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                  ) : (
                    <span className="text-5xl opacity-40 mix-blend-luminosity drop-shadow-md transition-transform group-hover:scale-110 duration-700">{formData.icon || '📁'}</span>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {formData.status === 'Active' ? (
                      <span className="px-3 py-1 bg-[var(--emerald)]/90 backdrop-blur-md text-[var(--white)] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md border border-white/20">
                        Published
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-[var(--dark-gray)]/90 backdrop-blur-md text-[var(--white)] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md border border-white/20">
                        Draft
                      </span>
                    )}
                  </div>
                  
                  {/* Category ID Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-[var(--black)]/40 backdrop-blur-md text-[var(--white)] text-[10px] font-bold tracking-widest rounded-md shadow-sm border border-white/10 font-mono">
                      ID: {formData.id ? formData.id.substring(0,6).toUpperCase() : 'NEW'}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[var(--black)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">{formData.name || 'Category Name'}</h3>
                  <p className="text-[13px] text-[var(--dark-gray)] mt-1.5 line-clamp-2 min-h-[38px] leading-relaxed font-medium">Scope: {formData.description || 'Learn the fundamentals using industry-standard tools.'}</p>
                  
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-[var(--dark-gray)] uppercase tracking-wide">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#5A5A5A]" />
                      0h 0m
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#5A5A5A]" />
                      0 Students
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[var(--primary)]" />
                      {courses.filter(c => c.category === formData.name).length} Course{courses.filter(c => c.category === formData.name).length !== 1 && 's'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Field Summary Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] shadow-[var(--shadow)] p-6"
            >
              <h4 className="text-[13px] font-bold text-[var(--black)] mb-5">Field Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[var(--dark-gray)] font-medium">Name</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--black)] max-w-[140px] truncate">{formData.name || 'Not filled'}</span>
                    {formData.name ? <CheckCircle className="w-4 h-4 text-[var(--emerald)]" /> : <div className="w-4 h-4 rounded-full border border-[var(--light-gray)]" />}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-[var(--light-gray)] pt-4">
                  <span className="text-[var(--dark-gray)] font-medium">Icon</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--black)]">{iconMode === 'emoji' ? 'Emoji' : iconMode === 'upload' ? 'Uploaded' : 'Image URL'}</span>
                    {formData.icon || iconMode === 'upload' ? <CheckCircle className="w-4 h-4 text-[var(--emerald)]" /> : <div className="w-4 h-4 rounded-full border border-[var(--light-gray)]" />}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-[var(--light-gray)] pt-4">
                  <span className="text-[var(--dark-gray)] font-medium">Description</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--dark-gray)]">{formData.description ? 'Filled' : 'Not filled'}</span>
                    {formData.description ? <CheckCircle className="w-4 h-4 text-[var(--emerald)]" /> : <div className="w-4 h-4 rounded-full border border-[var(--light-gray)]" />}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-[var(--light-gray)] pt-4">
                  <span className="text-[var(--dark-gray)] font-medium">Color</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--black)] font-mono text-[11px] uppercase" style={{ color: formData.color }}>{formData.color}</span>
                    <CheckCircle className="w-4 h-4 text-[var(--emerald)]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Analytics Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] shadow-[var(--shadow)] p-6"
            >
              <h4 className="text-[13px] font-bold text-[var(--black)] mb-5 flex items-center justify-between">
                <span className="flex items-center gap-2"><BarChart2 className="w-4 h-4 text-[var(--primary)]" /> Category Insights</span>
                <span className="text-[10px] font-semibold text-[var(--emerald)] bg-[var(--emerald)]/10 px-2 py-0.5 rounded-full">+24%</span>
              </h4>
              <div className="h-40 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalyticsData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--dark-gray)', fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--dark-gray)', fontWeight: 600 }} />
                    <RechartsTooltip 
                      cursor={{ fill: 'var(--input-bg)' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid var(--light-gray)', boxShadow: 'var(--shadow-hover)', fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="enrollments" radius={[4, 4, 4, 4]}>
                      {mockAnalyticsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-[var(--dark-gray)] mt-4 font-medium text-center">Projected student enrollments for this category.</p>
            </motion.div>

            {/* Content Analytics Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] shadow-[var(--shadow)] p-6"
            >
              <h4 className="text-[13px] font-bold text-[var(--black)] mb-5 flex items-center justify-between">
                <span className="flex items-center gap-2"><PieChartIcon className="w-4 h-4 text-[var(--primary)]" /> Content Distribution</span>
              </h4>
              <div className="h-40 w-full mt-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockPieData} innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="value">
                      {mockPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--light-gray)', boxShadow: 'var(--shadow-hover)', fontSize: '12px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-5 mt-4">
                {mockPieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2 text-[11px] font-bold text-[var(--dark-gray)] uppercase tracking-wide">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                    {entry.name}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Enrolled Courses Section */}
            {!isNew && (
              <motion.div 
                variants={itemVariants}
                className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] shadow-[var(--shadow)] overflow-hidden"
              >
                <div className="p-5 border-b border-[var(--light-gray)] bg-[var(--input-bg)] flex justify-between items-center">
                  <h4 className="text-[13px] font-bold text-[var(--black)] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[var(--primary)]" /> Enrolled Courses
                  </h4>
                  <span className="px-2 py-0.5 bg-[var(--white)] text-[var(--dark-gray)] text-xs font-bold rounded-full border border-[var(--light-gray)]">
                    {courses.filter(c => c.category === formData.name).length}
                  </span>
                </div>
                <div className="divide-y divide-[var(--light-gray)] max-h-64 overflow-y-auto">
                  {courses.filter(c => c.category === formData.name).length > 0 ? (
                    courses.filter(c => c.category === formData.name).map(course => (
                      <div key={course.id} className="p-4 flex items-center justify-between hover:bg-[var(--input-bg)] transition-colors cursor-pointer" onClick={() => router.navigate({ to: `/admin/courses/${course.id}` })}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[var(--white)] border border-[var(--light-gray)] flex items-center justify-center shrink-0">
                            {course.icon && (course.icon.startsWith('http') || course.icon.startsWith('data:')) ? (
                              <img src={course.icon} alt="" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <span className="text-sm">{course.icon || '📘'}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-[13px] font-bold text-[var(--black)]">{course.title}</p>
                            <p className="text-[11px] font-medium text-[var(--dark-gray)] line-clamp-1">{course.scope || 'No Scope'}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#d1d5db]" />
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm text-[var(--dark-gray)] font-medium">No courses are enrolled in this category yet.</p>
                      <button onClick={() => router.navigate({ to: '/admin/courses/new' })} className="mt-3 text-[12px] font-bold text-[var(--primary)] hover:underline">
                        Create Course &rarr;
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>

      {/* Success Message Area */}
      <AnimatePresence>
        {successMessage && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-[var(--white)] rounded-xl px-5 py-3 flex items-center gap-3 shadow-2xl z-50">
            <CheckCircle className="w-5 h-5 text-[var(--emerald)]" />
            <span className="font-semibold text-sm">{successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="ml-2 text-[var(--dark-gray)] hover:text-[var(--white)]"><X className="w-4 h-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Sticky Action Bar */}
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.2 }}
        className="fixed bottom-0 left-[260px] right-0 border-t border-[var(--light-gray)] bg-[var(--white)]/80 backdrop-blur-xl p-4 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2 text-xs text-[var(--dark-gray)] font-medium">
             <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: formData.color }}></div>
             All changes saved locally
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.navigate({ to: '/admin/categories' })}
              className="px-6 py-2.5 rounded-xl border border-[var(--light-gray)] bg-[var(--white)] hover:bg-[var(--input-bg)] text-[var(--black)] font-bold text-sm transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button 
              onClick={(e) => handleSubmit(e, true)}
              className="px-6 py-2.5 rounded-xl border border-[var(--orange)] bg-[var(--white)] hover:bg-[var(--orange)]/5 text-[var(--orange)] font-bold text-sm transition-colors shadow-sm"
            >
              Save Draft
            </button>
            <button 
              onClick={(e) => handleSubmit(e, false)}
              disabled={isSubmitting}
              className="px-8 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-bright)] text-[var(--white)] font-bold text-sm transition-colors shadow-md flex items-center gap-2 ring-2 ring-transparent"
            >
              {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Check className="w-4 h-4" />}
              {isNew ? 'Publish Category' : 'Save Changes'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
