import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Users, Calendar, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clsx } from "clsx";
import { motion } from "framer-motion";

import { useLMS } from "@/context/LMSContext";

export const Route = createFileRoute("/student/batches")({
  component: BatchesPage,
});

function BatchesPage() {
  const { batches, currentUser } = useLMS();
  const navigate = useNavigate();
  const studentBatchIds = Array.from(
    new Set([
      ...(currentUser?.batches || []),
      ...(batches || []).filter((b) => (b.students || []).includes(currentUser?.id)).map((b) => b.id),
    ])
  );

  const myBatches = (batches || []).filter((b) => studentBatchIds.includes(b.id));

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Batches</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
            Track your batch schedules, progress, and cohort details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myBatches.map((batch, idx) => {
          const isActive = batch.status === "active" || batch.status === "Active";
          const studentCount = (batch.students || []).length;

          return (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-3xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#D3CCEC] transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              {/* Status badge */}
              <div className="absolute top-0 right-0 p-6">
                <Badge
                  className={clsx(
                    "px-3 py-1 font-bold text-xs rounded-full",
                    isActive
                      ? "bg-[#01AC9F]/10 text-[#01AC9F] border border-[#01AC9F]/20"
                      : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300 border border-gray-200 dark:border-white/10",
                  )}
                  variant="outline"
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#01AC9F] inline-block mr-2 animate-pulse" />
                  )}
                  {batch.status
                    ? batch.status.charAt(0).toUpperCase() + batch.status.slice(1)
                    : "Unknown"}
                </Badge>
              </div>

              {/* Batch icon + name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F] shrink-0 border border-[#6C1D5F]/20 text-2xl">
                  {batch.icon || "📚"}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {batch.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#6C1D5F] mt-1">{batch.course}</p>
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-8 flex-1">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Start Date</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      {batch.createdAt || batch.startDate || "Not set"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Enrolled</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      {studentCount} student{studentCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Status</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 capitalize">
                      {batch.status || "Unknown"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-bold text-gray-700 dark:text-gray-300">Course</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 truncate max-w-[120px]">
                      {batch.course || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-start mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center border border-white dark:border-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300">
                    +{studentCount}
                  </div>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Classmates
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {myBatches.length === 0 && (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F] mb-4">
              <Users className="w-8 h-8" />
            </div>
            <p className="text-lg font-bold text-gray-700 dark:text-gray-300">No batches found</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You haven't been enrolled in any batch yet. Ask your trainer to add you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
