import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useLMS } from "@/context/LMSContext";
import { clsx } from "clsx";
import {
  Clock,
  ArrowRight,
  LayoutGrid,
  List,
  ListIcon,
  Search,
  Filter,
  X,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Clock3,
  BookOpen,
  PlayCircle,
  Award
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/student/assessments")({
  component: AssessmentsPage,
});

function AssessmentsPage() {
  const { currentUser, assessments, submissions, batches } = useLMS();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [viewMode, setViewMode] = useState("grid");

  if (!currentUser) return null;

  const studentBatchIds = Array.from(
    new Set([
      ...(currentUser.batches || []),
      ...(batches || []).filter((b) => (b.students || []).includes(currentUser.id)).map((b) => b.id),
    ])
  );

  // Student specific submissions
  const studentSubmissions = (submissions || []).filter((s) => s.studentId === currentUser.id);

  // All assessments assigned to the student's batch(es)
  const studentAssessments = (assessments || []).filter((a) => {
    return (
      a.status === "published" &&
      a.batches &&
      a.batches.some((bId) => studentBatchIds.includes(bId))
    );
  });

  const now = new Date();

  // Map each assessment with its computed status for the student
  const mappedAssessments = studentAssessments.map((a) => {
    const subs = studentSubmissions.filter((s) => s.assessmentId === a.id);
    const completedSubs = subs.filter((s) => s.status === "submitted");
    const maxAttempts = Number(a.maxAttempts || a.attemptsAllowed || 1);

    let computedStatus = "Active";

    const startDateTime = new Date(`${a.startDate}T${a.startTime || "00:00"}`);
    const endDateTime = a.endDate
      ? new Date(`${a.endDate}T${a.endTime || "23:59"}`)
      : new Date("2099-12-31");

    if (now > endDateTime) {
      computedStatus = "Completed";
    } else if (now < startDateTime) {
      computedStatus = "Upcoming";
    } else if (completedSubs.length >= maxAttempts) {
      computedStatus = "Completed";
    }

    return {
      ...a,
      computedStatus,
      attemptsMade: completedSubs.length,
      studentSubmission: completedSubs[completedSubs.length - 1],
      maxAttempts,
    };
  });

  // Filter and Sort logic
  let filteredAssessments = mappedAssessments.filter((a) => {
    const matchesSearch = (a.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || a.computedStatus === statusFilter;
    const matchesType = typeFilter === "All" || a.type === typeFilter;
    const matchesDifficulty = difficultyFilter === "All" || a.difficulty === difficultyFilter;
    return matchesSearch && matchesStatus && matchesType && matchesDifficulty;
  });

  filteredAssessments.sort((a, b) => {
    if (sortBy === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "A-Z") return (a.title || "").localeCompare(b.title || "");
    if (sortBy === "Z-A") return (b.title || "").localeCompare(a.title || "");
    return 0;
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setTypeFilter("All");
    setDifficultyFilter("All");
    setSortBy("Newest");
  };

  const handleStartAttempt = (id) => {
    const as = (assessments || []).find((x) => x.id === id);
    if (!as) return;
    const slug = as.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "assessment";
    if (as.type === "coding") {
      navigate({ to: `/student/take-coding/${slug}` });
    } else {
      navigate({ to: `/student/take/${slug}` });
    }
  };

  const handleViewResult = (sId) => {
    const sub = studentSubmissions.find((s) => s.id === sId);
    if (!sub) return;
    const as = (assessments || []).find((a) => a.id === sub.assessmentId);
    const slug = as ? as.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "results";
    navigate({ to: `/student/results/${slug}/${sId}` });
  };

  return (
    <div className="space-y-6 w-full pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              My Assessments
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-0.5">
              View and manage your assigned assessments and tests
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#6C1D5F] hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-5 flex flex-col shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[13px] font-bold text-gray-500 dark:text-gray-400">
              Assigned Assessments
            </h3>
            <div className="w-10 h-10 rounded-xl bg-[#f8f5f8] dark:bg-[#1a1a24] flex items-center justify-center text-[#6C1D5F]">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
              {mappedAssessments.length}
            </h2>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Total assessments</p>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#FF6200] dark:hover:border-[#FF6200] hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-5 flex flex-col shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[13px] font-bold text-gray-500 dark:text-gray-400">In Progress</h3>
            <div className="w-10 h-10 rounded-xl bg-[#fff6f0] dark:bg-[#1a1a24] flex items-center justify-center text-[#FF6200]">
              <PlayCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
              {mappedAssessments.filter((a) => a.computedStatus === "Active").length}
            </h2>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Ongoing assessments</p>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-5 flex flex-col shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-[13px] font-bold text-gray-500 dark:text-gray-400">
              Completed Assessments
            </h3>
            <div className="w-10 h-10 rounded-xl bg-[#effaf9] dark:bg-[#1a1a24] flex items-center justify-center text-[#01AC9F]">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
              {mappedAssessments.filter((a) => a.computedStatus === "Completed").length}
            </h2>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Finished assessments</p>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-2xl p-3 flex flex-col xl:flex-row items-center justify-between gap-3">
        {/* Left Group */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto overflow-x-auto hide-scrollbar">
          {/* Search */}
          <div className="relative w-full sm:w-64 shrink-0 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#6C1D5F] transition-colors" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assessments..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#1a1a24] border border-transparent rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:bg-white dark:focus:bg-[#15151f] focus:border-[#6C1D5F] focus:ring-4 focus:ring-[#6C1D5F]/10 transition-all"
            />
          </div>

          <div className="w-px h-8 bg-gray-200 dark:bg-[#2e2e3e] hidden sm:block mx-1 shrink-0"></div>

          {/* Grid/List Toggle */}
          <div className="flex bg-gray-100 dark:bg-[#1a1a24] rounded-xl p-1 shrink-0 ml-1">
            <button
              onClick={() => setViewMode("grid")}
              className={clsx(
                "p-2 rounded-lg transition-all",
                viewMode === "grid"
                  ? "bg-white dark:bg-[#252535] text-[#6C1D5F] dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={clsx(
                "p-2 rounded-lg transition-all",
                viewMode === "list"
                  ? "bg-white dark:bg-[#252535] text-[#6C1D5F] dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
              )}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Group */}
        <div className="flex items-center gap-2 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 hide-scrollbar shrink-0 justify-start xl:justify-end">
          <div className="w-px h-8 bg-gray-200 dark:bg-[#2e2e3e] hidden xl:block mx-1 shrink-0"></div>

          {[
            {
              label: "Status",
              value: statusFilter,
              set: setStatusFilter,
              opts: ["All", "Active", "Upcoming", "Completed"],
            },
            {
              label: "Type",
              value: typeFilter,
              set: setTypeFilter,
              opts: ["All", "mcq", "coding", "true_false", "multi_select", "short_answer", "file_upload"],
            },
            {
              label: "Difficulty",
              value: difficultyFilter,
              set: setDifficultyFilter,
              opts: ["All", "Easy", "Medium", "Hard"],
            },
            {
              label: "Sort",
              value: sortBy,
              set: setSortBy,
              opts: ["Newest", "Oldest", "A-Z", "Z-A"],
            },
          ].map((filter, i) => (
            <div key={i} className="shrink-0">
              <Select value={filter.value} onValueChange={filter.set}>
                <SelectTrigger className="w-[140px] h-9 px-3 text-xs bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 focus:ring-0 focus:ring-offset-0 transition-colors hover:bg-gray-100 dark:hover:bg-[#333333] rounded-xl outline-none">
                  <div className="flex items-center gap-1.5">
                    <span>
                      {filter.value === filter.opts[0]
                        ? filter.label
                        : (filter.value === "mcq" ? "MCQ" : filter.value === "true_false" ? "True/False" : filter.value.replace("_", " "))}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#1a1a24] border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg">
                  {filter.opts.map((o) => (
                    <SelectItem
                      key={o}
                      value={o}
                      className="text-xs focus:bg-[#f4ebf4] dark:focus:bg-[#252535] focus:text-gray-900 dark:focus:text-white cursor-pointer rounded-md mx-1 my-0.5 [&>.absolute]:hidden !pr-2 capitalize"
                    >
                      {o === "mcq" ? "MCQ" : o.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {(searchQuery || statusFilter !== "All" || typeFilter !== "All" || difficultyFilter !== "All" || sortBy !== "Newest") && (
            <button
              onClick={handleClearFilters}
              className="shrink-0 flex items-center justify-center w-9 h-9 ml-1 rounded-xl bg-gray-100 hover:bg-red-50 dark:bg-[#1a1a24] dark:hover:bg-red-950/30 text-gray-500 hover:text-red-500 transition-colors"
              title="Clear Filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {filteredAssessments.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-16 text-center text-neutral-500 shadow-sm flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-full">
            <Search className="w-8 h-8 text-neutral-400" />
          </div>
          <div>
            <p className="font-bold text-lg text-neutral-700 dark:text-neutral-300">
              No assessments found
            </p>
            <p className="text-sm mt-1">
              {studentAssessments.length === 0
                ? "You have no assessments assigned to your batch yet."
                : "Try adjusting your filters or search terms."}
            </p>
          </div>
        </div>
      ) : viewMode === "list" ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
              <thead className="bg-neutral-50 dark:bg-[#1a1a24] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-bold rounded-tl-2xl">Assessment Title</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Difficulty</th>
                  <th className="px-6 py-4 font-bold text-center">Status</th>
                  <th className="px-6 py-4 text-center font-bold">Marks / Duration</th>
                  <th className="px-6 py-4 text-center font-bold rounded-tr-2xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2e2e3e]">
                {filteredAssessments.map((as) => {
                  const statusBadge = {
                    Active: { label: "Active", className: "bg-[#6C1D5F] text-white" },
                    Upcoming: { label: "Upcoming", className: "bg-[#5A5A5A] text-white" },
                    Completed: { label: "Completed", className: "bg-[#01AC9F] text-white" },
                  }[as.computedStatus];

                  return (
                    <tr
                      key={as.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors group border-l-4 border-transparent hover:border-l-[#6C1D5F]"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="max-w-[250px] sm:max-w-xs md:max-w-md">
                            <h4 className="font-bold text-neutral-900 dark:text-white truncate">
                              {as.title}
                            </h4>
                            <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mt-1 truncate max-w-[250px]">
                              {as.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-neutral-600 dark:text-neutral-300">
                        {(as.type || "").toUpperCase() === "MCQ"
                          ? "MCQ"
                          : (as.type || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={clsx(
                            "inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md text-white shadow-sm",
                            as.difficulty === "Easy"
                              ? "bg-[#01AC9F]"
                              : as.difficulty === "Medium"
                                ? "bg-[#84117C]"
                                : "bg-[#FF6200]"
                          )}
                        >
                          {as.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={clsx(
                            "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold shadow-sm uppercase tracking-wider",
                            statusBadge?.className
                          )}
                        >
                          {as.computedStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="font-bold text-neutral-900 dark:text-white">
                          {as.marks} Marks
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {as.duration} mins
                        </div>
                        <div className="text-[10px] text-[#01AC9F] mt-1 font-bold">
                          Attempts: {as.attemptsMade}/{as.maxAttempts}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {as.computedStatus === "Active" ? (
                          <button
                            onClick={() => handleStartAttempt(as.id)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#6C1D5F] hover:bg-[#5a184f] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
                          >
                            <PlayCircle className="w-3.5 h-3.5" />{" "}
                            {as.attemptsMade >= as.maxAttempts ? "Assessment Locked" : "Start Assessment"}
                          </button>
                        ) : as.computedStatus === "Completed" ? (
                          <button
                            onClick={() =>
                              as.studentSubmission && handleViewResult(as.studentSubmission.id)
                            }
                            disabled={!as.studentSubmission}
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#01AC9F] hover:bg-[#019388] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all ${!as.studentSubmission ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <Award className="w-3.5 h-3.5" />{" "}
                            {as.studentSubmission
                              ? "View Result"
                              : as.attemptsMade >= as.maxAttempts
                                ? "Locked"
                                : "Expired"}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-300 dark:bg-neutral-700 text-neutral-500 font-bold text-xs shadow-sm cursor-not-allowed"
                          >
                            Locked
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredAssessments.map((as) => {
            const statusBadge = {
              Active: { label: "Active", className: "bg-[#6C1D5F] text-white" },
              Upcoming: { label: "Upcoming", className: "bg-[#5A5A5A] text-white" },
              Completed: { label: "Completed", className: "bg-[#01AC9F] text-white" },
            }[as.computedStatus];

            return (
              <div
                key={as.id}
                className="group bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] hover:border-[#6C1D5F] dark:hover:border-[#D3CCEC] rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 ease-out cursor-pointer flex flex-col h-full hover:-translate-y-1"
                onClick={() => {
                  if (as.computedStatus === "Active" && as.attemptsMade < as.maxAttempts) {
                    handleStartAttempt(as.id);
                  } else if (as.computedStatus === "Completed" && as.studentSubmission) {
                    handleViewResult(as.studentSubmission.id);
                  }
                }}
              >
                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Title */}
                  <div className="mb-2">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white transition-colors leading-tight block mb-2 line-clamp-2">
                      {as.title}
                    </span>
                  </div>

                  {/* Meta Top (Level & Status) */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={clsx(
                        "inline-flex items-center text-sm font-bold px-4 py-1.5 rounded-lg text-white shadow-md tracking-wide",
                        as.difficulty === "Easy"
                          ? "bg-[#01AC9F] shadow-[0_0_15px_rgba(1,172,159,0.4)]"
                          : as.difficulty === "Medium"
                            ? "bg-[#84117C] shadow-[0_0_15px_rgba(132,17,124,0.4)]"
                            : "bg-[#FF6200] shadow-[0_0_15px_rgba(255,98,0,0.4)]",
                      )}
                    >
                      {as.difficulty}
                    </span>
                    <span
                      className={clsx(
                        "text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm",
                        statusBadge?.className
                      )}
                    >
                      {statusBadge?.label || as.computedStatus}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4 font-medium">
                    {as.description || "No description provided."}
                  </p>

                  {/* Progress / Attempts Info */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] font-bold mb-1.5">
                      <span className="text-gray-500">Attempts Used</span>
                      <span className="font-extrabold text-gray-900 dark:text-white">
                        {as.attemptsMade} / {as.maxAttempts}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${as.attemptsMade >= as.maxAttempts ? "bg-[#FF6200]" : "bg-[#01AC9F]"}`}
                        style={{ width: `${Math.min((as.attemptsMade / as.maxAttempts) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Meta Stats */}
                  <div className="mt-auto flex items-center gap-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-[#2e2e3e] pt-4 mb-4">
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                      {String(as.duration || "").replace(" mins", "")} mins
                    </span>
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <span className="text-gray-400 dark:text-gray-500">Marks:</span>
                      {as.marks}
                    </span>
                    <span className="flex items-center gap-1 whitespace-nowrap ml-auto">
                      <span className="text-gray-400 dark:text-gray-500">Type:</span>
                      {(as.type || "").toUpperCase() === "MCQ"
                        ? "MCQ"
                        : (as.type || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </div>

                  {/* CTA Button */}
                  {as.computedStatus === "Active" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartAttempt(as.id);
                      }}
                      disabled={as.attemptsMade >= as.maxAttempts}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${as.attemptsMade >= as.maxAttempts ? "bg-neutral-400 text-white cursor-not-allowed" : "bg-[#6C1D5F] hover:bg-[#5a184f] text-white shadow-[0_2px_10px_-2px_rgba(108,29,95,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(108,29,95,0.5)] hover:-translate-y-0.5"}`}
                    >
                      {as.attemptsMade >= as.maxAttempts ? "Locked" : "Start Assessment"}
                    </button>
                  ) : as.computedStatus === "Completed" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (as.studentSubmission) handleViewResult(as.studentSubmission.id);
                      }}
                      disabled={!as.studentSubmission}
                      className="w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-[#01AC9F] hover:bg-[#019388] text-white shadow-[0_2px_10px_-2px_rgba(1,172,159,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(1,172,159,0.5)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Award className="w-4 h-4" /> View Result
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 bg-neutral-300 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed"
                    >
                      Locked
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
