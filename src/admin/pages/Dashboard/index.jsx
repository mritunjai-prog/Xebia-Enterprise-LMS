import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Tag,
  CheckCircle,
  Clock,
  Plus,
  ArrowRight,
  GraduationCap,
  Users,
} from "lucide-react";
import { CourseService, CategoryService } from "@/services/api";
import { Link } from "@tanstack/react-router";
import { useAppStore } from "../../store/useAppStore";
import { clsx } from "clsx";

const LEVEL_COLORS = {
  Beginner:
    "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/20 dark:border-emerald-500/20",
  Intermediate:
    "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-600/20 dark:border-purple-500/20",
  Advanced:
    "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-600/20 dark:border-orange-500/20",
  Expert:
    "bg-gray-100 dark:bg-gray-500/10 text-gray-800 dark:text-gray-300 border-gray-600/20 dark:border-gray-500/20",
};

export default function Dashboard() {
  const { addToast } = useAppStore();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalCategories: 0,
    publishedCourses: 0,
    draftCourses: 0,
    activeCategories: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [courses, categories] = await Promise.all([
          CourseService.getCourses(),
          CategoryService.getCategories(),
        ]);

        const courseList = courses || [];
        const categoryList = categories || [];

        const published = courseList.filter((c) => c.published || c.isPublished).length;
        const activeCats = categoryList.filter((c) => c.active).length;

        setStats({
          totalCourses: courseList.length,
          totalCategories: categoryList.length,
          publishedCourses: published,
          draftCourses: courseList.length - published,
          activeCategories: activeCats,
        });

        // Get 4 most recent courses
        const sortedCourses = [...courseList].sort((a, b) => {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        setRecentCourses(sortedCourses.slice(0, 4));
      } catch (err) {
        console.error(err);
        addToast("Failed to load dashboard metrics.", "error");
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [addToast]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6C1D5F] via-[#84117C] to-[#01AC9F] p-6 sm:p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Xebia LMS</h1>
          <p className="mt-2 text-white/95 text-sm sm:text-base font-medium leading-relaxed">
            Welcome back to the Admin Dashboard. Monitor platform metrics, manage courses and
            learning paths, and coordinate enterprise curriculum.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link
              to="/admin/courses"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#6C1D5F] hover:bg-white/90 font-semibold rounded-xl text-xs transition-colors shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Manage Courses
            </Link>
            <Link
              to="/admin/categories"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs border border-white/20 transition-colors"
            >
              <Tag className="w-3.5 h-3.5" />
              Browse Categories
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Courses",
            value: stats.totalCourses,
            icon: BookOpen,
            color: "text-[#6C1D5F] bg-[#6C1D5F]/10 dark:text-[#84117C] dark:bg-[#84117C]/10",
            description: `${stats.publishedCourses} Published, ${stats.draftCourses} Draft`,
          },
          {
            label: "Categories",
            value: stats.totalCategories,
            icon: Tag,
            color: "text-[#01AC9F] bg-[#01AC9F]/10",
            description: `${stats.activeCategories} Active categories`,
          },
          {
            label: "Published",
            value: stats.publishedCourses,
            icon: CheckCircle,
            color: "text-emerald-500 bg-emerald-500/10",
            description: "Live & available to learners",
          },
          {
            label: "Under Construction",
            value: stats.draftCourses,
            icon: Clock,
            color: "text-[#FF6200] bg-[#FF6200]/10",
            description: "Draft / In-progress courses",
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {kpi.label}
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1.5 tracking-tight">
                  {loading ? "..." : kpi.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 flex items-center gap-1 font-medium">
              {kpi.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Courses List */}
        <div className="lg:col-span-2 bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-[#2e2e3e] mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Recently Created Courses
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Latest curriculums and learning materials added
              </p>
            </div>
            <Link
              to="/admin/courses"
              className="text-xs font-semibold text-[#01AC9F] hover:text-[#009d8f] flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-gray-500">Loading courses...</div>
          ) : recentCourses.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400">
              No courses available. Create one to get started!
            </div>
          ) : (
            <div className="space-y-3.5 flex-1">
              {recentCourses.map((course) => {
                const isPublished = course.published || course.isPublished;
                const courseSlug =
                  course.slug || (course.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
                const level = course.difficultyLevel || course.level || "Beginner";
                const levelColor = LEVEL_COLORS[level] || LEVEL_COLORS.Beginner;
                return (
                  <Link
                    key={course.id}
                    to={`/courses/${courseSlug}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-[#2e2e3e] hover:border-[#6C1D5F]/30 dark:hover:border-[#84117C]/50 hover:bg-[#F7F8FC]/60 dark:hover:bg-black/20 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#84117C] flex items-center justify-center shrink-0 font-bold text-[13px] uppercase shadow-sm overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center z-0">
                        {course.title ? course.title.substring(0, 2) : "CO"}
                      </div>
                      {(course.icon || course.thumbnailImageUrl || course.thumbnail) && (
                        <img
                          src={course.icon || course.thumbnailImageUrl || course.thumbnail}
                          alt=""
                          className="w-full h-full object-contain p-1 relative z-10"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <h4 className="text-[15px] font-bold tracking-tight text-gray-900 dark:text-white truncate group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors">
                        {course.title}
                      </h4>
                      <span
                        className={clsx(
                          "text-xs font-bold px-2 py-0.5 rounded-full border shrink-0",
                          levelColor,
                        )}
                      >
                        {level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          isPublished
                            ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                        }`}
                      >
                        {isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm p-6 flex flex-col">
          <h2 className="text-base font-bold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-[#2e2e3e] mb-4">
            Quick Creator Actions
          </h2>
          <div className="space-y-3.5">
            <a
              href="/admin/categories"
              className="flex items-center gap-3.5 p-4 rounded-xl border border-[#01AC9F]/10 bg-[#01AC9F]/5 hover:bg-[#01AC9F]/10 hover:shadow-sm hover:-translate-y-0.5 text-gray-900 dark:text-white hover:text-[#01AC9F] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#01AC9F] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-extrabold text-[14px]">New Category</span>
                <span className="text-[12px] text-gray-500 dark:text-gray-400 font-medium">
                  Create course categories
                </span>
              </div>
            </a>

            <a
              href="/admin/courses"
              className="flex items-center gap-3.5 p-4 rounded-xl border border-[#6C1D5F]/10 dark:border-[#84117C]/20 bg-[#6C1D5F]/5 dark:bg-[#84117C]/5 hover:bg-[#6C1D5F]/10 dark:hover:bg-[#84117C]/10 hover:shadow-sm hover:-translate-y-0.5 text-gray-900 dark:text-white hover:text-[#6C1D5F] dark:hover:text-[#84117C] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#6C1D5F] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-extrabold text-[14px]">New Course</span>
                <span className="text-[12px] text-gray-500 dark:text-gray-400 font-medium">
                  Add a course curriculum
                </span>
              </div>
            </a>

            <Link
              to="/admin/curriculum"
              className="flex items-center gap-3.5 p-4 rounded-xl border border-orange-500/10 bg-orange-500/5 hover:bg-orange-500/10 hover:shadow-sm hover:-translate-y-0.5 text-gray-900 dark:text-white hover:text-orange-500 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF6200] text-white flex items-center justify-center shrink-0 shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-extrabold text-[14px]">Organiser</span>
                <span className="text-[12px] text-gray-500 dark:text-gray-400 font-medium">
                  Manage learning schedules
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
