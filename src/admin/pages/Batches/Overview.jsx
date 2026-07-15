import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  GraduationCap,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Building2,
  Calendar,
  BarChart3,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { AllocationService, UserService, BatchService, CourseService } from "@/services/api";
import { useRouter } from "@tanstack/react-router";
import { clsx } from "clsx";

const KpiCard = ({ title, value, icon: Icon, color, bg, trend, trendValue, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-6 hover:shadow-md transition-all group"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
          {title}
        </p>
        <p className="text-3xl font-black text-gray-900 dark:text-white leading-none mb-1">
          {value}
        </p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className={clsx("w-3 h-3", trendValue?.startsWith("-") ? "text-red-500" : "text-[#01AC9F]")} />
            <span className={clsx("text-xs font-bold", trendValue?.startsWith("-") ? "text-red-500" : "text-[#01AC9F]")}>
              {trendValue}
            </span>
            <span className="text-[10px] text-gray-400">vs last month</span>
          </div>
        )}
      </div>
      <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", bg)}>
        <Icon className={clsx("w-6 h-6", color)} />
      </div>
    </div>
  </motion.div>
);

const QuickAction = ({ title, description, icon: Icon, color, onClick, delay = 0 }) => (
  <motion.button
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    onClick={onClick}
    className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-5 text-left hover:shadow-md hover:border-[#6C1D5F]/30 dark:hover:border-[#84117C]/30 transition-all group"
  >
    <div className="flex items-center gap-4">
      <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", color)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#6C1D5F] group-hover:translate-x-1 transition-all" />
    </div>
  </motion.button>
);

export default function BatchesOverview() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTrainers: 0,
    activeBatches: 0,
    coursesAssigned: 0,
    pendingAllocations: 0,
    activeUniversities: 0,
    totalAllocations: 0,
  });
  const [recentAllocations, setRecentAllocations] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [allocations, users, batchData, courseData] = await Promise.all([
        AllocationService.getAllocations().catch(() => []),
        UserService.getUsers("teacher").catch(() => []),
        BatchService.getBatches().catch(() => []),
        CourseService.getCourses().catch(() => []),
      ]);

      const trainerList = Array.isArray(users) ? users : [];
      const batchList = Array.isArray(batchData) ? batchData : [];
      const courseList = Array.isArray(courseData) ? courseData : [];
      const allocList = Array.isArray(allocations) ? allocations : [];

      setTrainers(trainerList);
      setBatches(batchList);
      setCourses(courseList);
      setRecentAllocations(allocList.slice(0, 5));

      const activeAllocations = allocList.filter((a) => a.status === "active");
      const pendingAllocations = allocList.filter((a) => a.status === "pending" || !a.startDate);

      setStats({
        totalTrainers: trainerList.length,
        activeBatches: batchList.filter((b) => b.status === "active").length,
        coursesAssigned: new Set(activeAllocations.map((a) => a.courseId)).size,
        pendingAllocations: pendingAllocations.length,
        totalAllocations: allocList.length,
      });
    } catch (err) {
      console.error("Failed to load batch overview:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-6 animate-pulse">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Batch Management
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Overview of all batches, trainer allocations, and course assignments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#1a1a24] hover:bg-gray-200 dark:hover:bg-[#252535] text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl transition-colors"
          >
            <RefreshCw className={clsx("w-4 h-4", loading && "animate-spin")} />
            Refresh
          </button>
          <button
            onClick={() => router.navigate({ to: "/admin/batches/allocate" })}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6C1D5F] hover:bg-[#5a184f] text-white text-sm font-bold rounded-xl transition-all shadow-[0_2px_10px_-2px_rgba(108,29,95,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(108,29,95,0.5)] hover:-translate-y-0.5"
          >
            <GraduationCap className="w-4 h-4" />
            Allocate Course
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Total Trainers"
          value={stats.totalTrainers}
          icon={Users}
          color="text-[#6C1D5F] dark:text-[#84117C]"
          bg="bg-[#6C1D5F]/10 dark:bg-[#84117C]/10"
          trend
          trendValue="+2"
          delay={0}
        />
        <KpiCard
          title="Active Batches"
          value={stats.activeBatches}
          icon={BookOpen}
          color="text-[#01AC9F]"
          bg="bg-[#01AC9F]/10"
          trend
          trendValue="+5"
          delay={0.05}
        />
        <KpiCard
          title="Courses Assigned"
          value={stats.coursesAssigned}
          icon={GraduationCap}
          color="text-[#FF6200]"
          bg="bg-[#FF6200]/10"
          trend
          trendValue="+3"
          delay={0.1}
        />
        <KpiCard
          title="Universities"
          value={stats.activeUniversities}
          icon={Building2}
          color="text-[#84117C] dark:text-[#D3CCEC]"
          bg="bg-[#84117C]/10 dark:bg-[#D3CCEC]/10"
          trend
          trendValue="+1"
          delay={0.15}
        />
        <KpiCard
          title="Total Allocations"
          value={stats.totalAllocations}
          icon={BarChart3}
          color="text-[#01AC9F]"
          bg="bg-[#01AC9F]/10"
          trend
          trendValue="+8"
          delay={0.2}
        />
        <KpiCard
          title="Pending"
          value={stats.pendingAllocations}
          icon={Clock}
          color="text-yellow-600 dark:text-yellow-400"
          bg="bg-yellow-50 dark:bg-yellow-500/10"
          trend={stats.pendingAllocations > 0}
          trendValue={stats.pendingAllocations > 0 ? "Needs attention" : "All clear"}
          delay={0.25}
        />
      </div>

      {/* Batches Grid */}
      {batches.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Batches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {batches.map((batch, index) => {
              const batchColor = batch.status === "active" ? "#01AC9F" : "#6B7280";
              return (
                <motion.div
                  key={batch.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  onClick={() => router.navigate({ to: `/admin/batches/${batch.id}` })}
                  className="group bg-white dark:bg-[#15151f] rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 relative cursor-pointer border-[3px]"
                  style={{
                    borderColor: `${batchColor}50`,
                    boxShadow: `0 4px 20px -5px ${batchColor}40`,
                  }}
                  whileHover={{
                    y: -5,
                    borderColor: batchColor,
                    boxShadow: `0 15px 45px -5px ${batchColor}99, 0 0 20px 0 ${batchColor}60`,
                  }}
                >
                  <div
                    className="w-full h-32 shrink-0 overflow-hidden relative flex items-center justify-center"
                    style={{ backgroundColor: `${batchColor}15` }}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ backgroundColor: batchColor }}></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full" style={{ backgroundColor: batchColor }}></div>
                    </div>
                    <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: batchColor }}>
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className={clsx(
                        "text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm",
                        batch.status === "active" ? "bg-[#01AC9F] text-white" : "bg-gray-500 text-white"
                      )}>
                        {batch.status === "active" ? "Active" : batch.status || "Draft"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col cursor-pointer p-6 pt-5 bg-white dark:bg-[#15151f]">
                    <div className="mb-auto">
                      <span className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors leading-tight block mb-2 line-clamp-2">
                        {batch.name || batch.batchName || "Untitled Batch"}
                      </span>
                      {batch.course && (
                        <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                          {batch.course}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-[#2e2e3e] mt-2">
                      <div className="flex items-center gap-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span>{batch.students?.length || batch.studentCount || 0}</span>
                        </div>
                        {batch.createdByName && (
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            <span className="whitespace-nowrap">
                              {batch.createdByName.length > 10 ? batch.createdByName.substring(0, 10) + "..." : batch.createdByName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            title="Allocate Course"
            description="Assign a course to a trainer and batch"
            icon={GraduationCap}
            color="bg-[#6C1D5F]"
            onClick={() => router.navigate({ to: "/admin/batches/allocate" })}
            delay={0}
          />
          <QuickAction
            title="View Allocations"
            description="See all active allocations"
            icon={BarChart3}
            color="bg-[#01AC9F]"
            onClick={() => router.navigate({ to: "/admin/batches/allocations" })}
            delay={0.05}
          />
          <QuickAction
            title="Trainer Workload"
            description="Monitor trainer capacity and assignments"
            icon={Users}
            color="bg-[#FF6200]"
            onClick={() => router.navigate({ to: "/admin/batches/trainers" })}
            delay={0.1}
          />
          <QuickAction
            title="Analytics"
            description="View detailed allocation analytics"
            icon={TrendingUp}
            color="bg-[#84117C]"
            onClick={() => router.navigate({ to: "/admin/batches/analytics" })}
            delay={0.15}
          />
        </div>
      </div>

      {/* Recent Allocations */}
      <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2e2e3e] flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Recent Allocations
          </h3>
          <button
            onClick={() => router.navigate({ to: "/admin/batches/allocations" })}
            className="text-xs font-bold text-[#6C1D5F] dark:text-[#84117C] hover:underline"
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-[#2e2e3e]">
          {recentAllocations.length > 0 ? (
            recentAllocations.map((alloc, idx) => (
              <motion.div
                key={alloc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6C1D5F]/10 dark:bg-[#84117C]/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#6C1D5F] dark:text-[#84117C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {alloc.academicSession || "No Session"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Trainer ID: {alloc.trainerId?.substring(0, 8)}... | Course ID: {alloc.courseId?.substring(0, 8)}...
                  </p>
                </div>
                <span
                  className={clsx(
                    "text-[10px] font-bold px-2.5 py-1 rounded-md",
                    alloc.status === "active"
                      ? "bg-[#01AC9F]/10 text-[#01AC9F]"
                      : alloc.status === "completed"
                        ? "bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400"
                        : "bg-gray-100 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400"
                  )}
                >
                  {alloc.status}
                </span>
              </motion.div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No allocations yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Create your first allocation to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
