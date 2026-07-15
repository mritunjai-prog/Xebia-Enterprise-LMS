import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, GraduationCap, TrendingUp, Search, Building2 } from "lucide-react";
import { AllocationService, UserService } from "@/services/api";
import { clsx } from "clsx";

export default function TrainerWorkload() {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [trainerData, allocData] = await Promise.all([
        UserService.getUsers("teacher").catch(() => []),
        AllocationService.getAllocations().catch(() => []),
      ]);
      setTrainers(Array.isArray(trainerData) ? trainerData : []);
      setAllocations(Array.isArray(allocData) ? allocData : []);
    } catch (err) {
      console.error("Failed to load trainer data:", err);
    } finally {
      setLoading(false);
    }
  };

  const trainerStats = trainers.map((trainer) => {
    const trainerAllocs = allocations.filter((a) => a.trainerId === trainer.id);
    const activeAllocs = trainerAllocs.filter((a) => a.status === "active");
    const uniqueBatches = new Set(activeAllocs.map((a) => a.batchId)).size;
    const uniqueCourses = new Set(activeAllocs.map((a) => a.courseId)).size;
    const utilization = Math.min(100, (activeAllocs.length / 5) * 100); // Assume max 5 allocations

    return {
      ...trainer,
      totalAllocations: trainerAllocs.length,
      activeAllocations: activeAllocs.length,
      uniqueBatches,
      uniqueCourses,
      utilization,
      allocations: trainerAllocs,
    };
  });

  const filtered = trainerStats.filter((t) => {
    if (search) {
      const s = search.toLowerCase();
      return (t.name || "").toLowerCase().includes(s) || (t.email || "").toLowerCase().includes(s);
    }
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-6 h-[200px] animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
              <div className="h-full bg-gray-100 dark:bg-gray-800 rounded"></div>
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
            Trainer Workload
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Monitor trainer capacity, assignments, and utilization across the platform.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-2xl shadow-sm p-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search trainers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Trainer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((trainer, idx) => (
          <motion.div
            key={trainer.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            onClick={() => setSelectedTrainer(selectedTrainer?.id === trainer.id ? null : trainer)}
            className={clsx(
              "bg-white dark:bg-[#15151f] rounded-2xl border-2 shadow-sm p-6 cursor-pointer transition-all hover:shadow-lg",
              selectedTrainer?.id === trainer.id
                ? "border-[#6C1D5F] shadow-[0_0_20px_rgba(108,29,95,0.15)]"
                : "border-gray-100 dark:border-[#2e2e3e] hover:border-[#6C1D5F]/30"
            )}
          >
            {/* Trainer Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F] font-bold text-lg">
                {trainer.name?.charAt(0) || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{trainer.name}</p>
                <p className="text-xs text-gray-500 truncate">{trainer.email}</p>
              </div>
            </div>

            {/* Utilization Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Utilization</span>
                <span className={clsx("text-xs font-bold", trainer.utilization > 80 ? "text-[#FF6200]" : trainer.utilization > 50 ? "text-[#01AC9F]" : "text-gray-500")}>
                  {Math.round(trainer.utilization)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-[#1a1a24] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trainer.utilization}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                  className={clsx("h-full rounded-full", trainer.utilization > 80 ? "bg-[#FF6200]" : trainer.utilization > 50 ? "bg-[#01AC9F]" : "bg-[#6C1D5F]")}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-[#1a1a24] rounded-xl p-3 text-center">
                <p className="text-lg font-black text-gray-900 dark:text-white">{trainer.activeAllocations}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Active</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#1a1a24] rounded-xl p-3 text-center">
                <p className="text-lg font-black text-gray-900 dark:text-white">{trainer.uniqueCourses}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Courses</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#1a1a24] rounded-xl p-3 text-center">
                <p className="text-lg font-black text-gray-900 dark:text-white">{trainer.uniqueBatches}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Batches</p>
              </div>
              <div className="bg-gray-50 dark:bg-[#1a1a24] rounded-xl p-3 text-center">
                <p className="text-lg font-black text-gray-900 dark:text-white">{trainer.uniqueUnis}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase">Universities</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trainer Detail Side Panel */}
      {selectedTrainer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {selectedTrainer.name} — Allocation Details
            </h3>
            <button onClick={() => setSelectedTrainer(null)} className="text-xs text-gray-500 hover:text-gray-700">Close</button>
          </div>

          {selectedTrainer.allocations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-[#2e2e3e]">
                    <th className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase">Batch</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase">Course</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase">Session</th>
                    <th className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#2e2e3e]">
                  {selectedTrainer.allocations.map((alloc) => (
                    <tr key={alloc.id} className="hover:bg-gray-50 dark:hover:bg-[#1a1a24]">
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-mono">{alloc.batchId?.substring(0, 8)}...</td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-mono">{alloc.courseId?.substring(0, 8)}...</td>
                      <td className="px-4 py-3 text-xs font-bold text-gray-600">{alloc.academicSession}</td>
                      <td className="px-4 py-3">
                        <span className={clsx("text-[10px] font-bold px-2.5 py-1 rounded-md", alloc.status === "active" ? "bg-[#01AC9F]/10 text-[#01AC9F]" : "bg-gray-100 text-gray-500")}>
                          {alloc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">No allocations for this trainer yet.</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
