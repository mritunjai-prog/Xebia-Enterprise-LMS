import React, { useState, useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Clock,
  Users,
  ShieldAlert,
  Edit3,
  Trash2,
  Globe,
  Settings,
  BarChart3,
  Image as ImageIcon,
  CheckCircle,
  ChevronRight,
  X,
  PlayCircle,
  Eye,
  Activity,
  Layers,
  BookMarked,
  Video,
  Star,
  TrendingUp,
  Award,
  Zap,
  LayoutGrid,
  List,
  Save,
  ArrowLeft,
  BarChart2,
} from "lucide-react";
import { useRouter, useParams } from "@tanstack/react-router";
import { CourseService, CategoryService } from "../../../services/api";

export default function CourseDetail() {
  const { addToast } = useAppStore();
  const router = useRouter();
  const { courseSlug } = useParams({ strict: false });

  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(courseSlug !== "new");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorTab, setEditorTab] = useState("basic");

  const defaultFormData = {
    id: "",
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    level: "Beginner",
    language: "English",
    duration: "",
    icon: "",
    color: "#3B82F6",
    thumbnail: "",
    bannerImage: "",
    isActive: true,
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
    primaryKeyword: "",
    canonicalUrl: "",
    secondaryKeywords: "",
    focusKeywords: "",
    robots: "index, follow",
    author: "",
    seoCategory: "",
    seoTags: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    ogType: "website",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
    twitterCard: "summary_large_image",
    searchIntent: "",
    semanticKeywords: "",
    relatedTopics: "",
    searchSynonyms: "",
    faqContent: "",
    customHeadScript: "",
    customBodyScript: "",
    prerequisites: "",
    courseHighlights: "",
    careerOpportunities: "",
    youtubeVideoUrl: "",
    targetAudience: "",
    learningOutcomes: "",
    published: false,
    isPublished: false,
    allowIndexing: true,
    showInSearch: true,
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    async function loadCourse() {
      if (courseSlug === "new") return;
      try {
        const data = await CourseService.getCourseBySlug(courseSlug);
        // Important: merge data into defaultFormData so all keys exist!
        setFormData({ ...defaultFormData, ...data });
      } catch (err) {
        console.error("Failed to load course", err);
        addToast("Failed to fetch course details.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    async function loadCategories() {
      try {
        const catData = await CategoryService.getCategories();
        if (catData && catData.length > 0) {
          setCategories(catData);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    loadCourse();
    loadCategories();
  }, [courseSlug]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!formData.title) {
      addToast("Course Title is required.", "error");
      setEditorTab("basic");
      return;
    }

    setIsSubmitting(true);
    try {
      if (courseSlug !== "new") {
        const updatedCourse = await CourseService.updateCourse(formData.id, formData);
        setFormData({ ...defaultFormData, ...updatedCourse });
        addToast(`Course updated successfully!`, "success");
      } else {
        const newCoursePayload = { ...formData, enrollments: 0, totalViews: 0 };
        const savedCourse = await CourseService.createCourse(newCoursePayload);
        addToast(`Course created successfully!`, "success");
        router.navigate({ to: `/admin/courses/${savedCourse.slug}` });
      }
    } catch (err) {
      console.error("Backend save failed.", err);
      addToast("Failed to save course to backend API.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Activity className="w-10 h-10 text-indigo-600 animate-spin" />
        <h2 className="text-xl font-bold text-gray-900">Loading Course Workspace...</h2>
      </div>
    );
  }

  // Handle fallback gracefully if backend title is blank for some reason
  const displayTitle = formData.title || "Untitled Course";

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-24 font-sans text-[var(--black)]">
      {/* Breadcrumb Header */}
      <div className="h-16 border-b border-[var(--light-gray)] px-8 flex items-center justify-between sticky top-0 bg-[var(--white)]/90 backdrop-blur-md z-40">
        <div className="flex items-center text-sm font-medium">
          <span
            className="text-[var(--dark-gray)] cursor-pointer hover:text-[var(--black)] transition-colors"
            onClick={() => router.navigate({ to: "/admin" })}
          >
            Dashboard
          </span>
          <ChevronRight className="w-4 h-4 mx-2 text-[#DEDEDE]" />
          <span
            className="text-[var(--dark-gray)] cursor-pointer hover:text-[var(--black)] transition-colors"
            onClick={() => router.navigate({ to: "/admin/courses" })}
          >
            Courses
          </span>
          <ChevronRight className="w-4 h-4 mx-2 text-[#DEDEDE]" />
          <span className="font-bold text-[var(--black)]">
            {courseSlug === "new" ? "New Course Setup" : displayTitle}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {courseSlug !== "new" && (
            <button
              onClick={() => router.navigate({ to: `/admin/curriculum/${formData.id}` })}
              className="px-5 py-2 rounded-lg border border-[var(--light-gray)] bg-[var(--white)] hover:bg-[var(--input-bg)] font-bold text-[13px] text-[var(--black)] transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" /> Curriculum Engine
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg text-white font-bold text-[13px] transition-all flex items-center gap-2 shadow-sm"
            style={{ backgroundColor: formData.color || "#3b82f6" }}
          >
            {isSubmitting ? (
              <Activity className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Course
          </button>
        </div>
      </div>

      <div className="max-w-[1800px] w-full mx-auto p-8 space-y-10">
        {/* Massive Hero Dashboard */}
        <div className="relative overflow-hidden rounded-[24px] p-10 flex flex-col md:flex-row gap-8 items-center md:items-start mb-10 shadow-[var(--shadow)] border border-[var(--light-gray)] bg-[var(--white)] transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 duration-500 group min-h-[300px]">
          {/* Banner Image or Thumbnail as Background */}
          <div
            className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 group-hover:scale-105"
            style={{
              backgroundImage: `url(${formData.bannerImage || formData.thumbnail || ""})`,
              opacity: formData.bannerImage || formData.thumbnail ? 0.35 : 0,
            }}
          ></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[var(--white)] via-[var(--white)]/90 to-transparent"></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--white)] via-transparent to-transparent"></div>

          <div
            className="absolute inset-0 opacity-10 bg-grid-pattern z-0"
            style={{
              backgroundImage: "radial-gradient(var(--black) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>
          <div
            className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 z-0"
            style={{ backgroundColor: formData.color || "#3b82f6" }}
          ></div>

          <div className="w-36 h-36 rounded-[24px] flex items-center justify-center text-6xl shrink-0 overflow-hidden shadow-xl border-4 border-[var(--white)] relative z-10 bg-[var(--white)]">
            {formData.icon &&
            (formData.icon.toLowerCase().startsWith("http") ||
              formData.icon.toLowerCase().startsWith("data:image")) ? (
              <img
                src={formData.icon}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <span className="group-hover:scale-110 transition-transform duration-700 drop-shadow-sm">
                {formData.icon || "📚"}
              </span>
            )}
          </div>

          <div className="flex-1 relative z-10 text-center md:text-left self-center">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
              <span className="px-3 py-1.5 rounded-xl bg-[var(--white)]/80 backdrop-blur-md shadow-sm border border-[var(--white)] text-[var(--dark-gray)] text-xs font-black uppercase tracking-widest">
                {formData.category || "NO CATEGORY"}
              </span>
              <span
                className="px-3 py-1.5 rounded-xl shadow-sm border text-xs font-black uppercase tracking-widest"
                style={{
                  backgroundColor: `${formData.color || "#3b82f6"}15`,
                  color: formData.color || "#3b82f6",
                  borderColor: `${formData.color || "#3b82f6"}30`,
                }}
              >
                {formData.level || "BEGINNER"}
              </span>
              {formData.isFeatured && (
                <span className="px-3 py-1.5 rounded-xl bg-destructive/10 text-destructive shadow-sm border border-destructive/20 text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" /> Featured
                </span>
              )}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[var(--black)] tracking-tight leading-tight mb-3 drop-shadow-sm">
              {displayTitle}
            </h2>
            <p className="text-lg text-[var(--dark-gray)] max-w-3xl font-medium leading-relaxed">
              {formData.shortDescription ||
                "Enter a short, captivating description that summarizes what students will learn."}
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {/* Left Column: Form Content */}
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-3xl border border-white/50 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row min-h-[700px] transition-all hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)]">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-56 shrink-0 bg-white/40 border-r border-white/30 p-6 space-y-2">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-3">
                  Configuration
                </h3>
                {[
                  { id: "basic", label: "Core Details", icon: BookOpen },
                  { id: "media", label: "Visual Assets", icon: ImageIcon },
                  { id: "marketing", label: "Marketing Copy", icon: Globe },
                  { id: "seo", label: "Search & SEO", icon: Search },
                  { id: "settings", label: "Advanced Settings", icon: Settings },
                  { id: "analytics", label: "Analytics Insights", icon: BarChart2 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setEditorTab(tab.id)}
                    className={clsx(
                      "w-full flex items-center justify-between px-4 py-3.5 rounded-[12px] text-sm font-bold transition-all cursor-pointer group",
                      editorTab === tab.id
                        ? "bg-white shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-white text-[#6C1D5F]"
                        : "text-gray-500 hover:bg-white/50 hover:text-gray-900 border border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon
                        className={clsx(
                          "w-5 h-5 transition-colors",
                          editorTab === tab.id
                            ? "text-[#6C1D5F]"
                            : "text-gray-400 group-hover:text-gray-700",
                        )}
                      />
                      {tab.label}
                    </div>
                    {editorTab === tab.id && <ChevronRight className="w-4 h-4 text-[#6C1D5F]" />}
                  </button>
                ))}
              </div>

              {/* Form Area */}
              <div className="flex-1 p-8 md:p-10 relative overflow-y-auto bg-gradient-to-br from-white/30 to-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={editorTab}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="space-y-8 pb-20 mt-4">
                      {/* Basic Info Tab */}
                      <div className={clsx(editorTab !== "basic" && "hidden")}>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-indigo-600" /> Core Information
                        </h3>
                        <div className="space-y-5">
                          <div className="grid grid-cols-1 gap-5">
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Course Title
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500"
                                value={formData.title || ""}
                                onChange={(e) => {
                                  const title = e.target.value;
                                  const slug = title
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-")
                                    .replace(/(^-|-$)/g, "");
                                  setFormData({ ...formData, title, slug });
                                }}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Category
                              </label>
                              <select
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 cursor-pointer"
                                value={formData.category || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, category: e.target.value })
                                }
                              >
                                <option value="" disabled>
                                  Select Category
                                </option>
                                {categories.map((c) => (
                                  <option key={c.id} value={c.name}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Course Icon Upload
                              </label>
                              <div className="flex gap-2 h-[42px]">
                                {formData.icon &&
                                formData.icon.toLowerCase().startsWith("data:image") ? (
                                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                    <img
                                      src={formData.icon}
                                      alt="Icon Preview"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : formData.icon && formData.icon.startsWith("http") ? (
                                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                                    <img
                                      src={formData.icon}
                                      alt="Icon Preview"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : null}
                                <label
                                  className="flex-1 bg-white hover:bg-gray-100/50 flex items-center justify-center px-4 rounded-[12px] cursor-pointer transition-colors border border-gray-200 border-dashed text-xs font-bold text-gray-500"
                                  title="Upload Image"
                                >
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                  </svg>
                                  Upload Icon
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) =>
                                          setFormData({ ...formData, icon: ev.target.result });
                                        reader.readAsDataURL(e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Brand Color
                              </label>
                              <div className="flex gap-3 h-[42px] items-center px-3 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] focus-within:border-indigo-500 transition-colors">
                                <input
                                  type="color"
                                  className="h-6 w-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                                  value={formData.color || "#3B82F6"}
                                  onChange={(e) =>
                                    setFormData({ ...formData, color: e.target.value })
                                  }
                                />
                                <span className="text-sm font-mono text-gray-900 font-semibold">
                                  {formData.color || "#3B82F6"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Short Description
                            </label>
                            <textarea
                              rows={2}
                              className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 resize-none"
                              value={formData.shortDescription || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, shortDescription: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Full Marketing Description
                            </label>
                            <textarea
                              rows={4}
                              className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 resize-none"
                              value={formData.description || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                              }
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Level
                              </label>
                              <select
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 cursor-pointer"
                                value={formData.level || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, level: e.target.value })
                                }
                              >
                                <option value="" disabled>
                                  Select Level
                                </option>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Language
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500"
                                value={formData.language || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, language: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Est. Duration
                              </label>
                              <div className="flex gap-2">
                                <select
                                  className="w-1/2 px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 cursor-pointer"
                                  value={formData.duration?.match(/(\d+)h/)?.[1] || "0"}
                                  onChange={(e) => {
                                    const h = e.target.value;
                                    const m = formData.duration?.match(/(\d+)m/)?.[1] || "0";
                                    setFormData({
                                      ...formData,
                                      duration:
                                        `${h !== "0" ? h + "h " : ""}${m !== "0" ? m + "m" : ""}`.trim(),
                                    });
                                  }}
                                >
                                  {[...Array(50).keys()].map((i) => (
                                    <option key={i} value={i}>
                                      {i} h
                                    </option>
                                  ))}
                                </select>
                                <select
                                  className="w-1/2 px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 cursor-pointer"
                                  value={formData.duration?.match(/(\d+)m/)?.[1] || "0"}
                                  onChange={(e) => {
                                    const h = formData.duration?.match(/(\d+)h/)?.[1] || "0";
                                    const m = e.target.value;
                                    setFormData({
                                      ...formData,
                                      duration:
                                        `${h !== "0" ? h + "h " : ""}${m !== "0" ? m + "m" : ""}`.trim(),
                                    });
                                  }}
                                >
                                  {[0, 15, 30, 45].map((i) => (
                                    <option key={i} value={i}>
                                      {i} m
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Media Tab */}
                      <div className={clsx(editorTab !== "media" && "hidden")}>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-indigo-500" /> Media & Landing Assets
                        </h3>
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-5">
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Thumbnail URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="flex-1 px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500"
                                  value={
                                    formData.thumbnail?.toLowerCase().startsWith("data:image")
                                      ? "Uploaded Local Image"
                                      : formData.thumbnail || ""
                                  }
                                  onChange={(e) =>
                                    setFormData({ ...formData, thumbnail: e.target.value })
                                  }
                                />
                                <label
                                  className="shrink-0 bg-white hover:bg-gray-50 text-gray-500 shadow-sm border-gray-300 flex items-center justify-center px-4 rounded-[12px] cursor-pointer transition-colors border border-gray-200 text-xs font-bold"
                                  title="Upload Thumbnail Image"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                  </svg>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) =>
                                          setFormData({ ...formData, thumbnail: ev.target.result });
                                        reader.readAsDataURL(e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Banner Image URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  className="flex-1 px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500"
                                  value={
                                    formData.bannerImage?.toLowerCase().startsWith("data:image")
                                      ? "Uploaded Local Image"
                                      : formData.bannerImage || ""
                                  }
                                  onChange={(e) =>
                                    setFormData({ ...formData, bannerImage: e.target.value })
                                  }
                                />
                                <label
                                  className="shrink-0 bg-white hover:bg-gray-50 text-gray-500 shadow-sm border-gray-300 flex items-center justify-center px-4 rounded-[12px] cursor-pointer transition-colors border border-gray-200 text-xs font-bold"
                                  title="Upload Banner Image"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                  </svg>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        const reader = new FileReader();
                                        reader.onload = (ev) =>
                                          setFormData({
                                            ...formData,
                                            bannerImage: ev.target.result,
                                          });
                                        reader.readAsDataURL(e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Preview Video URL (YouTube or Direct)
                            </label>
                            <div className="relative">
                              <PlayCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                              <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500"
                                value={formData.youtubeVideoUrl || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, youtubeVideoUrl: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Marketing Tab */}
                      <div className={clsx(editorTab !== "marketing" && "hidden")}>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-indigo-500" /> Marketing Copy & Audience
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Target Audience
                            </label>
                            <textarea
                              rows={2}
                              className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 resize-none"
                              value={formData.targetAudience || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, targetAudience: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Learning Outcomes
                            </label>
                            <textarea
                              rows={3}
                              placeholder="List outcomes separated by newlines..."
                              className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 resize-none"
                              value={formData.learningOutcomes || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, learningOutcomes: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Prerequisites
                            </label>
                            <textarea
                              rows={3}
                              placeholder="e.g. Basic programming knowledge, HTML/CSS..."
                              className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 resize-none"
                              value={formData.prerequisites || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, prerequisites: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Course Highlights
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Key highlights shown on the course landing page..."
                              className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 resize-none"
                              value={formData.courseHighlights || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, courseHighlights: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                              Career Opportunities
                            </label>
                            <textarea
                              rows={3}
                              placeholder="What career paths does this course unlock?"
                              className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 resize-none"
                              value={formData.careerOpportunities || ""}
                              onChange={(e) =>
                                setFormData({ ...formData, careerOpportunities: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* SEO Tab */}
                      <div className={clsx(editorTab !== "seo" && "hidden")}>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-accent-2" /> Search Engine Optimization
                        </h3>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-accent-2">
                              Core SEO
                            </h4>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Meta Title
                              </label>
                              <input
                                type="text"
                                maxLength={70}
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2"
                                value={formData.metaTitle || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, metaTitle: e.target.value })
                                }
                              />
                              <p className="text-[10px] text-gray-500 mt-1 text-right">
                                {(formData.metaTitle || "").length}/70 chars
                              </p>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Meta Description
                              </label>
                              <textarea
                                rows={2}
                                maxLength={320}
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2 resize-none"
                                value={formData.metaDescription || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, metaDescription: e.target.value })
                                }
                              />
                              <p className="text-[10px] text-gray-500 mt-1 text-right">
                                {(formData.metaDescription || "").length}/320 chars
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Primary Keyword
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2"
                                  value={formData.primaryKeyword || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, primaryKeyword: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Canonical URL
                                </label>
                                <input
                                  type="url"
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2"
                                  value={formData.canonicalUrl || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, canonicalUrl: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-5 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-accent-2">
                              Advanced SEO
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Secondary Keywords
                                </label>
                                <textarea
                                  rows={2}
                                  placeholder="Comma separated..."
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2 resize-none"
                                  value={formData.secondaryKeywords || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, secondaryKeywords: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Focus Keywords
                                </label>
                                <textarea
                                  rows={2}
                                  placeholder="Comma separated..."
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2 resize-none"
                                  value={formData.focusKeywords || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, focusKeywords: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Author
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2"
                                  value={formData.author || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, author: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  SEO Category
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2"
                                  value={formData.seoCategory || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, seoCategory: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Robots
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2"
                                  value={formData.robots || "index, follow"}
                                  onChange={(e) =>
                                    setFormData({ ...formData, robots: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                SEO Tags
                              </label>
                              <input
                                type="text"
                                placeholder="Comma separated tags..."
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-accent-2"
                                value={formData.seoTags || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, seoTags: e.target.value })
                                }
                              />
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-5 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                              Open Graph (Facebook / LinkedIn)
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  OG Title
                                </label>
                                <input
                                  type="text"
                                  maxLength={150}
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500"
                                  value={formData.ogTitle || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, ogTitle: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  OG URL
                                </label>
                                <input
                                  type="url"
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500"
                                  value={formData.ogUrl || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, ogUrl: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                OG Description
                              </label>
                              <textarea
                                rows={2}
                                maxLength={500}
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500 resize-none"
                                value={formData.ogDescription || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, ogDescription: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                OG Image URL
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="https://..."
                                  className="flex-1 px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-indigo-500"
                                  value={formData.ogImage || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, ogImage: e.target.value })
                                  }
                                />
                                <label
                                  className="shrink-0 bg-white hover:bg-gray-50 text-gray-500 shadow-sm border-gray-300 flex items-center justify-center px-4 rounded-[12px] cursor-pointer border border-gray-200"
                                  title="Upload OG Image"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                  </svg>
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        (() => {
                                          const r = new FileReader();
                                          r.onload = (ev) =>
                                            setFormData({ ...formData, ogImage: ev.target.result });
                                          r.readAsDataURL(e.target.files[0]);
                                        })();
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-5 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">
                              Twitter / X Card
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Twitter Title
                                </label>
                                <input
                                  type="text"
                                  maxLength={150}
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-sky-500"
                                  value={formData.twitterTitle || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, twitterTitle: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Twitter Image URL
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    className="flex-1 px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-sky-500"
                                    value={formData.twitterImage || ""}
                                    onChange={(e) =>
                                      setFormData({ ...formData, twitterImage: e.target.value })
                                    }
                                  />
                                  <label className="shrink-0 bg-white hover:bg-gray-50 text-gray-500 shadow-sm border-gray-300 flex items-center justify-center px-4 rounded-[12px] cursor-pointer border border-gray-200">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                      />
                                    </svg>
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          (() => {
                                            const r = new FileReader();
                                            r.onload = (ev) =>
                                              setFormData({
                                                ...formData,
                                                twitterImage: ev.target.result,
                                              });
                                            r.readAsDataURL(e.target.files[0]);
                                          })();
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                Twitter Description
                              </label>
                              <textarea
                                rows={2}
                                maxLength={500}
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-sky-500 resize-none"
                                value={formData.twitterDescription || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, twitterDescription: e.target.value })
                                }
                              />
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-5 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                              Programmatic SEO
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Search Intent
                                </label>
                                <textarea
                                  rows={2}
                                  placeholder="e.g. informational, navigational..."
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-primary resize-none"
                                  value={formData.searchIntent || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, searchIntent: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Semantic Keywords
                                </label>
                                <textarea
                                  rows={2}
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-primary resize-none"
                                  value={formData.semanticKeywords || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, semanticKeywords: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Related Topics
                                </label>
                                <textarea
                                  rows={2}
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-primary resize-none"
                                  value={formData.relatedTopics || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, relatedTopics: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Search Synonyms
                                </label>
                                <textarea
                                  rows={2}
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-primary resize-none"
                                  value={formData.searchSynonyms || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, searchSynonyms: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-5 space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-destructive">
                              FAQ Content and Custom Scripts
                            </h4>
                            <div>
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                FAQ Content (JSON or plain text)
                              </label>
                              <textarea
                                rows={3}
                                placeholder="Q: ... A: ..."
                                className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-destructive resize-none font-mono"
                                value={formData.faqContent || ""}
                                onChange={(e) =>
                                  setFormData({ ...formData, faqContent: e.target.value })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Custom Head Script
                                </label>
                                <textarea
                                  rows={3}
                                  placeholder="script tag here..."
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-destructive resize-none font-mono"
                                  value={formData.customHeadScript || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, customHeadScript: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                                  Custom Body Script
                                </label>
                                <textarea
                                  rows={3}
                                  placeholder="script tag here..."
                                  className="w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-[12px] text-sm outline-none focus:border-destructive resize-none font-mono"
                                  value={formData.customBodyScript || ""}
                                  onChange={(e) =>
                                    setFormData({ ...formData, customBodyScript: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Settings Tab */}
                      <div className={clsx(editorTab !== "settings" && "hidden")}>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <Settings className="w-5 h-5 text-destructive" /> Platform Settings
                        </h3>
                        <div className="space-y-5">
                          <div className="p-4 border border-gray-200 rounded-[12px] bg-white/50 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold text-gray-900">Publish Status</p>
                              <p className="text-xs text-gray-500">
                                Make this course visible to students in the catalog.
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.published || false}
                                onChange={(e) =>
                                  setFormData({ ...formData, published: e.target.checked })
                                }
                              />
                              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-2"></div>
                            </label>
                          </div>
                          <div className="p-4 border border-gray-200 rounded-[12px] bg-white/50 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold text-gray-900">
                                Search Engine Indexing
                              </p>
                              <p className="text-xs text-gray-500">
                                Allow Google/Bing to index this course's public landing page.
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.allowIndexing || false}
                                onChange={(e) =>
                                  setFormData({ ...formData, allowIndexing: e.target.checked })
                                }
                              />
                              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-2"></div>
                            </label>
                          </div>
                          <div className="p-4 border border-gray-200 rounded-[12px] bg-white/50 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold text-gray-900">Featured Course</p>
                              <p className="text-xs text-gray-500">
                                Pin this course to the top of the category browsing page.
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={formData.isFeatured || false}
                                onChange={(e) =>
                                  setFormData({ ...formData, isFeatured: e.target.checked })
                                }
                              />
                              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-2"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Analytics Tab */}
                      <div className={clsx(editorTab !== "analytics" && "hidden")}>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                          <BarChart2 className="w-5 h-5 text-indigo-500" /> Analytics & Insights
                        </h3>

                        {courseSlug === "new" || (!formData.published && !formData.isPublished) ? (
                          <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-gray-200 rounded-[24px] bg-white/30">
                            <BarChart2 className="w-16 h-16 text-gray-300 mb-4" />
                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                              No Data Available Yet
                            </h4>
                            <p className="text-sm text-gray-500 max-w-md">
                              Analytics will begin populating once this course is published and
                              students begin enrolling.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-8">
                            {/* Top Metric Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-[24px] shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                  Total Enrollments
                                </p>
                                <div className="flex items-end gap-3">
                                  <span className="text-4xl font-black text-gray-900">1,248</span>
                                  <span className="text-sm font-bold text-accent-2 mb-1 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-1" /> +12%
                                  </span>
                                </div>
                              </div>
                              <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-[24px] shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                  Avg. Completion Rate
                                </p>
                                <div className="flex items-end gap-3">
                                  <span className="text-4xl font-black text-gray-900">68%</span>
                                  <span className="text-sm font-bold text-accent-2 mb-1 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-1" /> +4%
                                  </span>
                                </div>
                              </div>
                              <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-[24px] shadow-sm">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                  Average Rating
                                </p>
                                <div className="flex items-end gap-3">
                                  <span className="text-4xl font-black text-gray-900">4.8</span>
                                  <div className="flex mb-2 text-destructive">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current opacity-50" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Chart Area (Bespoke CSS) */}
                            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-8 rounded-[32px] shadow-sm">
                              <h4 className="text-sm font-black text-gray-900 mb-8 uppercase tracking-widest">
                                Enrollment Trends (Last 7 Days)
                              </h4>
                              <div className="h-48 flex items-end justify-between gap-2 px-4">
                                {[35, 45, 30, 60, 80, 65, 90].map((val, i) => (
                                  <div
                                    key={i}
                                    className="relative flex-1 group h-full flex items-end"
                                  >
                                    <div
                                      className="w-full bg-gradient-to-t from-[#6C1D5F]/80 to-[#6C1D5F]/40 rounded-t-xl transition-all duration-500 group-hover:from-[#6C1D5F] group-hover:to-[#6C1D5F]/60"
                                      style={{ height: `${val}%` }}
                                    ></div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                      {val * 12}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between px-4 mt-4 text-xs font-bold text-gray-400 uppercase">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom Area Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Visibility Card */}
            <div className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] p-8 shadow-[var(--shadow)] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700 pointer-events-none">
                <svg className="w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="text-sm font-black text-gray-900 mb-8 flex items-center gap-3 tracking-widest uppercase">
                <svg
                  className="w-5 h-5 text-accent-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>{" "}
                Lifecycle Control
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between p-5 bg-white/50 rounded-[24px] border border-white/60 shadow-sm transition-all hover:bg-white/80">
                  <div>
                    <span className="text-sm font-bold text-gray-900 block mb-0.5">
                      Public Visibility
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      Visible in student catalog
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.published || formData.isPublished || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published: e.target.checked,
                          isPublished: e.target.checked,
                        })
                      }
                    />
                    <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-accent-2 shadow-inner"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-5 bg-white/50 rounded-[24px] border border-white/60 shadow-sm transition-all hover:bg-white/80">
                  <div>
                    <span className="text-sm font-bold text-gray-900 block mb-0.5">
                      Active Tracking
                    </span>
                    <span className="text-xs font-medium text-gray-500">Allow new enrollments</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.isActive || false}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#6C1D5F] shadow-inner"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Content Mix Chart Widget */}
            <div className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] p-8 shadow-[var(--shadow)] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
              <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-3 tracking-widest uppercase">
                <svg
                  className="w-5 h-5 text-[#01AC9F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>{" "}
                Content Mix
              </h3>
              <div className="flex items-center justify-center gap-8">
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: "conic-gradient(#6C1D5F 0% 45%, #01AC9F 45% 75%, #3b82f6 75% 100%)",
                  }}
                >
                  <div className="absolute inset-0 m-[12px] bg-[var(--white)] rounded-full shadow-inner"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-[#6C1D5F] shadow-sm"></span> Videos
                    (45%)
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-[#01AC9F] shadow-sm"></span> Quizzes
                    (30%)
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                    <span className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-sm"></span> Reading
                    (25%)
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Showcase Card */}
            <div className="bg-[var(--white)] border border-[var(--light-gray)] rounded-[18px] p-8 shadow-[var(--shadow)] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
              <h3 className="text-sm font-black text-gray-900 mb-2 flex items-center gap-3 tracking-widest uppercase">
                <svg
                  className="w-5 h-5 text-[#6C1D5F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>{" "}
                Catalog Thumbnail
              </h3>
              <p className="text-[11px] font-bold text-gray-500 mb-8 uppercase tracking-widest">
                This is exactly how the course will appear in search grids.
              </p>
              <div className="aspect-[16/10] bg-gray-100/50 rounded-[24px] border border-white/60 overflow-hidden relative shadow-inner group">
                {formData.thumbnail ? (
                  <img
                    src={formData.thumbnail}
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12 mb-3 opacity-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                      No Thumbnail
                    </span>
                  </div>
                )}
                {/* Simulated Card Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl p-4 border-t border-white/40 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] font-black text-[#6C1D5F] uppercase tracking-widest mb-1">
                    {formData.category || "Category"}
                  </p>
                  <p className="text-sm font-bold text-gray-900 truncate drop-shadow-sm">
                    {displayTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
