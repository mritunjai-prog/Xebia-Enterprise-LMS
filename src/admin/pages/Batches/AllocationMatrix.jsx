import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Download, Trash2, Edit3, Eye, ChevronLeft, ChevronRight,
  MoreVertical, CheckCircle, XCircle, Clock, Building2, Users, BookOpen,
} from "lucide-react";
import { AllocationService } from "@/services/api";
import { useRouter } from "@tanstack/react-router";
import { clsx } from "clsx";

const ITEMS_PER_PAGE = 12;

const statusColors = {
  active: "bg-[#01AC9F]/10 text-[#01AC9F]",
  completed: "bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400",
  cancelled: "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function AllocationMatrix() {
  const router = useRouter();
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortField, setSortField] = useState("assignedAt");
  const [sortDir, setSortDir] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    setLoading(true);
    try {
      const data = await AllocationService.getAllocations();
      setAllocations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load allocations:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return allocations.filter((a) => {
      if (filterStatus !== "All" && a.status !== filterStatus.toLowerCase()) return false;
      if (search) {
        const s = search.toLowerCase();
        return (
          (a.trainerId || "").toLowerCase().includes(s) ||
          (a.batchId || "").toLowerCase().includes(s) ||
          (a.courseId || "").toLowerCase().includes(s) ||
          (a.academicSession || "").toLowerCase().includes(s)
        );
      }
      return true;
    }).sort((a, b) => {
      const aVal = a[sortField] || "";
      const bVal = b[sortField] || "";
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [allocations, filterStatus, search, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleSelectAll = () => {
    if (selectedRows.size === paginated.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginated.map((a) => a.id)));
    }
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this allocation?")) return;
    try {
      await AllocationService.deleteAllocation(id);
      setAllocations((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedRows.size} allocations?`)) return;
    try {
      for (const id of selectedRows) {
        await AllocationService.deleteAllocation(id);
      }
      setAllocations((prev) => prev.filter((a) => !selectedRows.has(a.id)));
      setSelectedRows(new Set());
    } catch (err) {
      console.error("Bulk delete failed:", err);
    }
  };

  const exportCSV = () => {
    const headers = ["Trainer", "Batch", "Course", "Session", "Status", "Start Date", "End Date"];
    const rows = filtered.map((a) => [
      a.trainerId, a.batchId, a.courseId, a.academicSession, a.status, a.startDate, a.endDate,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "allocations.csv";
    a.click();
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-6 h-[400px] animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-6"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Allocation Matrix
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Manage and monitor all trainer-course-batch allocations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#1a1a24] hover:bg-gray-200 dark:hover:bg-[#252535] text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => router.navigate({ to: "/admin/batches/allocate" })} className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6C1D5F] hover:bg-[#5a184f] text-white text-sm font-bold rounded-xl transition-all shadow-[0_2px_10px_-2px_rgba(108,29,95,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(108,29,95,0.5)] hover:-translate-y-0.5">
            + New Allocation
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-2xl shadow-sm p-2 flex flex-col lg:flex-row items-center gap-2">
        <div className="relative flex-1 w-full min-w-[240px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by trainer, batch, course..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-0"
          />
        </div>
        <div className="w-px h-8 bg-gray-200 dark:bg-[#2e2e3e] hidden lg:block mx-2"></div>
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="appearance-none pl-4 pr-9 py-2 bg-gray-50 dark:bg-[#1a1a24] border border-transparent dark:border-[#2e2e3e] rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 outline-none cursor-pointer min-w-[120px]">
            {["All", "Active", "Completed", "Cancelled"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        {selectedRows.size > 0 && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs font-bold text-[#6C1D5F]">{selectedRows.size} selected</span>
            <button onClick={handleBulkDelete} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-[#1e1e2d] border-b border-gray-200 dark:border-[#2e2e3e]">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={selectedRows.size === paginated.length && paginated.length > 0} onChange={toggleSelectAll} className="rounded" />
                </th>
                {["Trainer", "Batch", "Course", "Session", "Status", "Start Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#2e2e3e]">
              <AnimatePresence>
                {paginated.map((alloc) => (
                  <motion.tr
                    key={alloc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selectedRows.has(alloc.id)} onChange={() => toggleRow(alloc.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{alloc.trainerId?.substring(0, 12)}...</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">{alloc.batchId?.substring(0, 8)}...</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">{alloc.courseId?.substring(0, 8)}...</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{alloc.academicSession}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx("text-[10px] font-bold px-2.5 py-1 rounded-md", statusColors[alloc.status] || statusColors.active)}>
                        {alloc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500">{alloc.startDate || "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 relative">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#252535] text-gray-500">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden z-20">
                          <button onClick={() => router.navigate({ to: "/admin/batches/$batchId", params: { batchId: alloc.batchId } })} className="px-4 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-[#252535]">
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                          <button onClick={() => handleDelete(alloc.id)} className="px-4 py-2 text-xs font-bold text-red-600 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {paginated.length === 0 && (
          <div className="px-6 py-16 text-center text-gray-400 text-sm">
            No allocations found. Try adjusting your search or filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Showing {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} allocations
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-1 shadow-sm">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-[#252535] disabled:opacity-40 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)} className={clsx("w-8 h-8 rounded-lg text-sm font-bold transition-colors mx-0.5", p === currentPage ? "bg-[#6C1D5F] text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#252535]")}>
                  {p}
                </button>
              ))}
            </div>
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-[#252535] disabled:opacity-40 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
