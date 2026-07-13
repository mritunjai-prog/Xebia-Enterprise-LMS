import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

import {
  Tag, BookOpen, Clock, ArrowLeft, Users, Star,
  ChevronRight, Check, Edit3, Archive, CheckCircle,
  Activity, Award, AlertCircle, Cloud, Eye, MoreVertical,
  TrendingUp, Globe, FileText, Sparkles, Trash2
} from 'lucide-react';
import { CategoryService, CourseService } from '../../../services/api';
import { Link, useParams, useNavigate } from '@tanstack/react-router';
import { useAppStore } from '../../store/useAppStore';
import CreateCategory from './CreateCategory';

// Category-specific icon mapping
const CATEGORY_ICONS = {
  cloud: Cloud,
  devops: Activity,
  programming: FileText,
  data: TrendingUp,
  security: Eye,
  default: Tag,
};

function getCategoryIcon(name = '') {
  const lower = name.toLowerCase();
  if (lower.includes('cloud')) return Cloud;
  if (lower.includes('devops') || lower.includes('ops')) return Activity;
  if (lower.includes('data') || lower.includes('analytics') || lower.includes('ai') || lower.includes('ml')) return TrendingUp;
  if (lower.includes('security') || lower.includes('cyber')) return Eye;
  if (lower.includes('program') || lower.includes('develop') || lower.includes('web') || lower.includes('mobile') || lower.includes('java') || lower.includes('react') || lower.includes('python')) return FileText;
  return Tag;
}

export default function CategoryDetail() {
  const { categorySlug } = useParams({ strict: false });
  const navigate = useNavigate();
  const { addToast } = useAppStore();
  const [category, setCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);

  async function loadCategoryDetails() {
      try {
        const [catData, allCourses] = await Promise.all([
          CategoryService.getCategoryBySlug(categorySlug),
          CourseService.getCourses()
        ]);

        setCategory(catData);

        // Filter courses belonging to this category
        const filteredCourses = (allCourses || []).filter(course =>
          course.categoryId === catData.id ||
          (course.categoryName && course.categoryName.toLowerCase() === catData.name.toLowerCase())
        );
        setCourses(filteredCourses);
      } catch (err) {
        console.error(err);
        addToast('Failed to load category details.', 'error');
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    loadCategoryDetails();
  }, [categorySlug, addToast]);

  const handleStatusToggle = async () => {
    if (!category) return;
    const nextActiveState = !category.active;
    try {
      const updated = await CategoryService.updateCategory(category.id, {
        ...category,
        isActive: nextActiveState
      });
      setCategory(updated || { ...category, active: nextActiveState });
      addToast(
        `Category "${category.name}" ${nextActiveState ? 'activated' : 'archived'}.`,
        'success'
      );
    } catch (err) {
      console.error(err);
      addToast('Failed to update category status.', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the category "${category.name}"? This action cannot be undone.`)) {
      try {
        await CategoryService.deleteCategory(category.id);
        addToast(`Category "${category.name}" deleted successfully`, 'success');
        navigate({ to: '/admin/categories' });
      } catch (err) {
        addToast('Failed to delete category', 'error');
        console.error(err);
      }
    }
  };

  if (isEditing && category) {
    return (
      <CreateCategory
        editData={category}
        onBack={() => {
          setIsEditing(false);
          loadCategoryDetails();
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 dark:text-gray-400">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6C1D5F] dark:border-[#84117C] mb-4"></div>
        <span className="text-sm font-medium">Loading category details...</span>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-16 bg-white dark:bg-[#151515] rounded-2xl border border-gray-200 dark:border-[#333]">
        <AlertCircle className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Category Not Found</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">The category you are trying to view does not exist or has been removed.</p>
        <Link to="/admin/categories" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6C1D5F] hover:bg-[#5a1850] text-white font-semibold rounded-xl text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </Link>
      </div>
    );
  }

  const publishedCourses = courses.filter(c => c.published || c.isPublished).length;
  const draftCourses = courses.length - publishedCourses;
  // Calculate total students from actual courses (default to 0 if none)
  const totalStudents = courses.reduce((acc, c) => acc + (c.enrollmentsCount || 0), 0);
  const completionRate = 0; // Backend doesn't provide this yet
  const avgRating = 0; // Backend doesn't provide this yet
  const color = category.color || '#6C1D5F';
  const CategoryIcon = getCategoryIcon(category.name);
  const slug = category.slug || (category.name || '').toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* Back Navigation */}
      <Link
        to="/categories"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-[#6C1D5F] dark:hover:text-[#84117C] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Category List
      </Link>

      {/* ─── Hero Header Section ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#151515] border border-gray-200 dark:border-[#333] shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 relative z-10">
          {/* Left: Icon + Title */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Category Full Icon Image */}
            <div className="flex items-center justify-center shrink-0">
              {category.icon && !category.icon.startsWith('http') && !category.icon.startsWith('blob:') && !category.icon.startsWith('data:') ? (
                <div 
                  className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] flex items-center justify-center shadow-sm overflow-hidden rounded-[20px] relative"
                  style={{ backgroundColor: category.color, border: `4px solid ${category.color}` }}
                >
                  <span className="text-[200px] sm:text-[250px] leading-none absolute flex items-center justify-center w-full h-full">{category.icon}</span>
                </div>
              ) : category.icon ? (
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="max-w-[140px] sm:max-w-[180px] max-h-[140px] sm:max-h-[180px] w-auto h-auto object-contain rounded-[20px] shadow-sm bg-white dark:bg-[#151515]"
                  style={{ border: `4px solid ${category.color}` }}
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/180x180/f8fafc/94a3b8?text=${encodeURIComponent(category.name)}`; }} 
                />
              ) : (
                <div 
                  className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] flex items-center justify-center shadow-sm overflow-hidden rounded-[20px]"
                  style={{ backgroundColor: `${category.color}15`, border: `4px solid ${category.color}` }}
                >
                  <CategoryIcon className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 dark:text-gray-600" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                  {category.name}
                </h1>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full text-white ${
                    category.active
                      ? 'bg-accent-2'
                      : 'bg-destructive'
                  }`}>
                    {category.active ? 'Active' : 'Inactive'}
                  </span>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <Sparkles className="w-3.5 h-3.5 text-[#6C1D5F] dark:text-[#84117C]" />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Created {category.createdAt ? new Date(category.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 mt-2 sm:mt-0">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 border-[#6C1D5F] dark:border-primary text-[#6C1D5F] dark:text-primary hover:bg-[#6C1D5F] dark:hover:bg-primary hover:text-white dark:hover:text-[#15151f] transition-all"
            >
              <Edit3 className="w-4 h-4" /> Edit Category
            </button>

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition-all"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>

            <button
              onClick={handleStatusToggle}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all shadow-sm hover:shadow-md ${
                category.active
                  ? 'border-gray-200 dark:border-[#444] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#222]'
                  : 'border-accent-2 text-accent-2 hover:bg-accent-2/10'
              }`}
            >
              {category.active ? <Archive className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              {category.active ? 'Archive' : 'Activate'}
            </button>
          </div>
        </div>
      </div>

      {/* ─── Stats Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Courses */}
        <motion.div 
          className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-5 relative overflow-hidden perspective-1000"
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-xl bg-primary/10 dark:bg-primary">
              <BookOpen className="w-5 h-5 text-primary dark:text-primary" />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mt-3 uppercase tracking-wider">Total Courses</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">{courses.length}</h3>
        </motion.div>

        {/* Published */}
        <motion.div 
          className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-5 relative overflow-hidden perspective-1000"
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-xl bg-accent-2/10 dark:bg-accent-2">
              <CheckCircle className="w-5 h-5 text-accent-2 dark:text-accent-2" />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mt-3 uppercase tracking-wider">Published</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">{publishedCourses}</h3>
        </motion.div>

        {/* Draft */}
        <motion.div 
          className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-5 relative overflow-hidden perspective-1000"
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-start justify-between">
            <div className="p-2.5 rounded-xl bg-destructive/10 dark:bg-destructive">
              <Edit3 className="w-5 h-5 text-destructive dark:text-destructive" />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mt-3 uppercase tracking-wider">Draft</p>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">{draftCourses}</h3>
        </motion.div>
      </div>

      {/* ─── Tab Navigation ─── */}
      <div className="border-b border-gray-200 dark:border-[#333]">
        <div className="flex gap-6">
          {['Overview', 'Courses', 'Activity Log'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-semibold text-sm transition-all border-b-2 -mb-[2px] ${
                activeTab === tab
                  ? 'border-[#6C1D5F] dark:border-[#84117C] text-[#6C1D5F] dark:text-[#84117C]'
                  : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Tab Content ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── Overview Tab ── */}
          {activeTab === 'Overview' && (
            <>
              {/* General Information */}
              <motion.div 
                className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-6 perspective-1000"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.01, rotateX: 1, rotateY: 1 }}
              >
                <h3 className="text-lg font-bold text-[#6C1D5F] dark:text-[#84117C] mb-5">General Information</h3>

                <div className="grid grid-cols-1 gap-5 mb-5">
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Visibility</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.active ? 'Public - All Students' : 'Hidden - Admin Only'}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-[#222]">
                  <span className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Marketing Description</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {category.description || `This category encompasses all modules related to ${category.name}. Courses cover fundamental concepts as well as advanced topics, providing a comprehensive learning experience for enterprise teams.`}
                  </p>
                </div>
              </motion.div>

              {/* Recent Courses in Overview */}
              <motion.div 
                className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-6 perspective-1000"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ scale: 1.01, rotateX: -1, rotateY: 1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#6C1D5F] dark:text-[#84117C]">Recent Courses</h3>
                  <button
                    onClick={() => setActiveTab('Courses')}
                    className="text-xs font-semibold text-[#6C1D5F] dark:text-[#84117C] hover:underline flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {courses.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">No courses linked to this category yet.</div>
                ) : (
                  <div className="space-y-3">
                    {courses.slice(0, 4).map((course, idx) => {
                      const isPublished = course.published || course.isPublished;
                      const students = course.enrollmentsCount || 0;
                      const courseSlug = course.slug || (course.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      return (
                        <Link
                          key={course.id}
                          to={`/courses/${courseSlug}`}
                          className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-black/10 hover:border-[#6C1D5F]/30 dark:hover:border-[#84117C]/30 hover:bg-[#6C1D5F]/5 dark:hover:bg-[#84117C]/5 transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-[#6C1D5F]/10 dark:bg-[#84117C]/10 text-[#6C1D5F] dark:text-[#84117C] flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                              {course.title ? course.title.substring(0, 2) : 'CO'}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors truncate">
                                {course.title}
                              </h4>
                              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                                {students} Students
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              isPublished
                                ? 'bg-accent-2/10 dark:bg-accent-2 text-accent-2'
                                : 'bg-destructive/10 dark:bg-destructive text-destructive'
                            }`}>
                              {isPublished ? 'Published' : 'Draft'}
                            </span>
                            <button className="p-1 text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* Animated AreaChart for Enrollment Growth */}
              <motion.div 
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-6 perspective-1000 mt-6"
              >
                <h3 className="text-lg font-bold text-[#6C1D5F] dark:text-[#84117C] mb-4">Enrollment Growth</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { name: 'Jan', students: 400 },
                      { name: 'Feb', students: 600 },
                      { name: 'Mar', students: 800 },
                      { name: 'Apr', students: 1200 },
                      { name: 'May', students: 1500 },
                      { name: 'Jun', students: 2000 },
                    ]}>
                      <defs>
                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: '#6C1D5F', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="students" stroke="#6C1D5F" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </>
          )}

          {/* ── Courses Tab ── */}
          {activeTab === 'Courses' && (
            <div className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">All Courses in {category.name}</h3>
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{courses.length} total</span>
              </div>

              {courses.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">
                  <BookOpen className="w-8 h-8 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  No courses linked to this category.
                </div>
              ) : (
                <div className="space-y-3">
                  {courses.map((course, idx) => {
                    const isPublished = course.published || course.isPublished;
                    const duration = course.duration || (course.durationHours ? `${course.durationHours} hrs` : 'N/A');
                    const level = course.difficultyLevel || course.level || 'Beginner';
                    const students = course.enrollmentsCount || 0;
                    const courseSlug = course.slug || (course.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                      <Link
                        key={course.id}
                        to={`/courses/${courseSlug}`}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-gray-100 dark:border-[#222] bg-gray-50/50 dark:bg-black/10 hover:border-[#6C1D5F]/30 dark:hover:border-[#84117C]/30 hover:bg-[#6C1D5F]/5 dark:hover:bg-[#84117C]/5 transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-[#6C1D5F]/10 dark:bg-[#84117C]/10 text-[#6C1D5F] dark:text-[#84117C] flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                            {course.title ? course.title.substring(0, 2) : 'CO'}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors truncate">
                              {course.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500 mt-1 font-medium">
                              <span className="font-mono">{course.courseCode || 'No Code'}</span>
                              <span>·</span>
                              <span>{duration}</span>
                              <span>·</span>
                              <span className="capitalize">{level}</span>
                              <span>·</span>
                              <span>{students} Students</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            isPublished
                              ? 'bg-accent-2/10 dark:bg-accent-2 text-accent-2'
                              : 'bg-destructive/10 dark:bg-destructive text-destructive'
                          }`}>
                            {isPublished ? 'Published' : 'Draft'}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── Activity Log Tab ── */}
          {activeTab === 'Activity Log' && (
            <div className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Activity Log</h3>
              <div className="space-y-5">
                {[
                  { time: '3 hours ago', action: 'Category detail metrics regenerated', user: 'System Task', icon: Activity },
                  { time: '1 day ago', action: `New course added to "${category.name}"`, user: 'Admin User', icon: BookOpen },
                  { time: '2 days ago', action: 'Category description updated', user: 'Admin User', icon: Edit3 },
                  { time: '5 days ago', action: 'Visibility set to Public - All Students', user: 'Admin User', icon: Eye },
                  { time: '1 week ago', action: 'Category created and initialized', user: 'System Initializer', icon: Sparkles },
                ].map((act, idx) => (
                  <div key={idx} className="flex gap-3.5">
                    <div className="mt-0.5 shrink-0">
                      <div className="w-7 h-7 rounded-full bg-[#6C1D5F]/10 dark:bg-[#84117C]/10 flex items-center justify-center">
                        <act.icon className="w-3.5 h-3.5 text-[#6C1D5F] dark:text-[#84117C]" />
                      </div>
                    </div>
                    <div className="flex-1 pb-5 border-b border-gray-100 dark:border-[#222] last:border-0 last:pb-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{act.action}</p>
                      <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">{act.time} · by {act.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          {/* Category Health Card */}
          <div className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-6">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-5">Category Health</h3>

            <div className="space-y-5">
              {/* Completion Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Completion Rate</span>
                  <span className="text-sm font-black text-[#6C1D5F] dark:text-[#84117C]">{completionRate}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${completionRate}%`,
                      background: `linear-gradient(90deg, #6C1D5F, #01AC9F)`
                    }}
                  />
                </div>
              </div>

              {/* Average Rating */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#222]">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Rating</span>
                <span className="flex items-center gap-1 text-sm font-bold">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-[#FF6200]">{avgRating}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Category Info Card */}
          <div className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-6">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Quick Info</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Category Color</span>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-[#444]" style={{ backgroundColor: color }} />
                  <span className="font-mono text-gray-700 dark:text-gray-300 uppercase">{color}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Linked Courses</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">{courses.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Total Learners</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">{totalStudents.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Animated Donut PieChart for Content Distribution */}
          <motion.div 
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-[#333] shadow-sm p-6 perspective-1000 mt-6"
          >
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Content Composition</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Video Lectures', value: 45 },
                      { name: 'Quizzes', value: 25 },
                      { name: 'Assignments', value: 20 },
                      { name: 'Reading Material', value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[
                      { name: 'Video Lectures', value: 45 },
                      { name: 'Quizzes', value: 25 },
                      { name: 'Assignments', value: 20 },
                      { name: 'Reading Material', value: 10 },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#6C1D5F', '#01AC9F', '#FF6200', '#F59E0B'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {['Videos', 'Quizzes', 'Tasks', 'Reading'].map((label, idx) => (
                <div key={idx} className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#6C1D5F', '#01AC9F', '#FF6200', '#F59E0B'][idx] }} />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
