import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2, Users, BookOpen, GraduationCap, Calendar, Clock, ArrowLeft,
  Edit3, Trash2, BarChart3, CheckCircle, AlertCircle,
} from "lucide-react";
import { AllocationService, BatchService } from "@/services/api";
import { useRouter, useParams } from "@tanstack/react-router";
import { clsx } from "clsx";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#6C1D5F", "#01AC9F", "#FF6200", "#84117C", "#4A1E47"];

export default function BatchDetailAdmin() {
  const router = useRouter();
  const { batchId } = useParams({ strict: false });
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState(null);
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    fetchData();
  }, [batchId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [batchData, allocData] = await Promise.all([
        BatchService.getBatches().catch(() => []),
        AllocationService.getBatchAllocations(batchId).catch(() => []),
      ]);
      const batchList = Array.isArray(batchData) ? batchData : [];
      const found = batchList.find((b) => b.id === batchId);
      setBatch(found || null);
      setAllocations(Array.isArray(allocData) ? allocData : []);
    } catch (err) {
      console.error("Failed to load batch details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-6 h-[200px] animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-6 h-[300px] animate-pulse"></div>
          <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-6 h-[300px] animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Batch Not Found</h2>
          <p className="text-sm text-gray-500 mb-4">The batch you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => router.navigate({ to: "/admin/batches" })} className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6C1D5F] hover:bg-[#5a184f] text-white text-sm font-bold rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Batches
          </button>
        </div>
      </div>
    );
  }

  const courseDistribution = {};
  allocations.forEach((a) => {
    if (!courseDistribution[a.courseId]) courseDistribution[a.courseId] = { name: a.courseId.substring(0, 8), value: 0 };
    courseDistribution[a.courseId].value++;
  });
  const courseChartData = Object.values(courseDistribution);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Back Button */}
      <button onClick={() => router.navigate({ to: "/admin/batches" })} className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Batches
      </button>

      {/* Batch Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{batch.icon || "📚"}</span>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{batch.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                {batch.academicSession && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500">
                    <Calendar className="w-3.5 h-3.5" /> {batch.academicSession}
                  </span>
                )}
                <span className={clsx("text-[10px] font-bold px-2.5 py-1 rounded-md", batch.status === "active" ? "bg-[#01AC9F]/10 text-[#01AC9F]" : "bg-gray-100 text-gray-500")}>
                  {batch.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#252535] text-gray-500">
              <Edit3 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Students", value: batch.studentCount || batch.students?.length || 0, icon: Users, color: "text-[#6C1D5F]", bg: "bg-[#6C1D5F]/10" },
          { label: "Allocations", value: allocations.length, icon: GraduationCap, color: "text-[#01AC9F]", bg: "bg-[#01AC9F]/10" },
          { label: "Courses", value: new Set(allocations.map((a) => a.courseId)).size, icon: BookOpen, color: "text-[#FF6200]", bg: "bg-[#FF6200]/10" },
          { label: "Trainers", value: new Set(allocations.map((a) => a.trainerId)).size, icon: GraduationCap, color: "text-[#84117C]", bg: "bg-[#84117C]/10" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-5"
          >
            <div className="flex items-center gap-3">
              <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={clsx("w-5 h-5", stat.color)} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts + Allocations Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Distribution Chart */}
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Course Distribution</h3>
          <div className="h-[250px]">
            {courseChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={courseChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                    {courseChartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-400">No allocation data</div>
            )}
          </div>
        </div>

        {/* Allocations List */}
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2e2e3e]">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Allocations</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-[#2e2e3e] max-h-[300px] overflow-y-auto">
            {allocations.length > 0 ? allocations.map((alloc) => (
              <div key={alloc.id} className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#6C1D5F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">Trainer: {alloc.trainerId?.substring(0, 12)}...</p>
                  <p className="text-[10px] text-gray-500">Course: {alloc.courseId?.substring(0, 12)}... | {alloc.academicSession}</p>
                </div>
                <span className={clsx("text-[10px] font-bold px-2 py-1 rounded-md", alloc.status === "active" ? "bg-[#01AC9F]/10 text-[#01AC9F]" : "bg-gray-100 text-gray-500")}>
                  {alloc.status}
                </span>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-gray-400 text-sm">No allocations yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
