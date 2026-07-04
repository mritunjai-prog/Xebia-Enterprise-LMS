import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { upcomingAssessments as mockAssessments } from "@/features/student/mocks/dummy-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Clock, CheckCircle, Search, FileText, Calendar, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export const Route = createFileRoute("/student/assessments")({
  component: AssessmentsPage,
});

function AssessmentsPage() {
  const [upcomingAssessments, setUpcomingAssessments] = useState(mockAssessments);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredAssessments = upcomingAssessments.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.course.toLowerCase().includes(search.toLowerCase())
  );

  const pending = filteredAssessments.filter(a => a.status === "Pending");
  const upcoming = filteredAssessments.filter(a => a.status === "Upcoming");
  const completed = filteredAssessments.filter(a => a.status === "Completed");

  const getStatusConfig = (status) => {
    switch (status) {
      case "Completed": return { bg: "bg-[#01AC9F]", icon: CheckCircle, label: "Completed" };
      case "Upcoming": return { bg: "bg-[#6C1D5F]", icon: Calendar, label: "Upcoming" };
      case "Pending": return { bg: "bg-[#FF6200]", icon: Clock, label: "Action Required" };
      default: return { bg: "bg-gray-500", icon: FileText, label: status };
    }
  };

  const AssessmentCard = ({ assessment, idx }) => {
    const config = getStatusConfig(assessment.status);
    const Icon = config.icon;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, delay: idx * 0.04 }}
        className="group bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-2xl flex flex-col overflow-hidden hover:border-[#6C1D5F] dark:hover:border-[#D3CCEC] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
      >
        {/* Top Banner Area */}
        <div className="relative h-32 bg-muted overflow-hidden shrink-0 p-4 flex items-start justify-between border-b border-border">
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600 z-0">
            <span className="text-4xl font-black opacity-20 uppercase">{assessment.course.substring(0, 2)}</span>
          </div>
          {assessment.image && (
            <img
              src={assessment.image}
              alt={assessment.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10 pointer-events-none" />
          
          <div className="relative z-20">
            <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold text-white shadow-sm", config.bg)}>
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </span>
          </div>
          
          <div className="relative z-20 bg-black/50 backdrop-blur-md rounded-lg px-3 py-1.5 flex flex-col items-center justify-center shadow-sm border border-white/10">
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider leading-none mb-0.5">Time</span>
            <span className="text-xs font-black text-white leading-none">{assessment.time}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-xs font-bold text-primary dark:text-[#b44e9f] uppercase tracking-wider mb-1 line-clamp-1">
            {assessment.course}
          </p>
          <h2 className="text-lg font-extrabold text-foreground leading-tight mb-4 line-clamp-2 transition-colors">
            {assessment.name}
          </h2>

          <div className="mt-auto space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
              <Calendar className="w-4 h-4 shrink-0 text-gray-400" />
              <span>Scheduled for <strong className="text-foreground">{assessment.date}</strong></span>
            </div>

            {/* CTA Button */}
            {assessment.status === "Completed" ? (
              <Link to="/student/results" className="block w-full">
                <button className="w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#252535] text-foreground hover:bg-gray-200 dark:hover:bg-[#2e2e3e]">
                  <Award className="w-4 h-4" /> View Results
                </button>
              </Link>
            ) : assessment.status === "Upcoming" ? (
              <button disabled className="w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-muted text-gray-400 dark:text-gray-500 cursor-not-allowed">
                <Clock className="w-4 h-4" /> Starts on {assessment.date}
              </button>
            ) : (
              <Link to={`/student/assessment/${assessment.id}`} className="block w-full">
                <button className="w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 bg-primary hover:bg-[#5a184f] text-white shadow-[0_2px_10px_-2px_rgba(108,29,95,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(108,29,95,0.5)] hover:-translate-y-0.5">
                  <PlayCircle className="w-4 h-4" /> Start Assessment
                </button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const AssessmentGrid = ({ items }) => {
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-card rounded-2xl border border-border shadow-sm">
          <FileText className="w-12 h-12 mb-4 text-gray-200 dark:text-gray-700" />
          <p className="text-lg font-bold text-foreground mb-1">No assessments found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">You're all caught up!</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {items.map((assessment, idx) => (
            <AssessmentCard key={assessment.id} assessment={assessment} idx={idx} />
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Assessments</h1>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">
              {pending.length} action required · {upcoming.length} upcoming
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assessments..."
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-foreground placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-primary transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-8 h-auto p-1.5 bg-gray-100 dark:bg-[#15151f] border border-transparent dark:border-[#2e2e3e] w-full sm:w-auto justify-start overflow-x-auto rounded-xl">
          {[
            { value: "all", label: `All (${filteredAssessments.length})` },
            { value: "pending", label: `Action Required (${pending.length})` },
            { value: "upcoming", label: `Upcoming (${upcoming.length})` },
            { value: "completed", label: `Completed (${completed.length})` },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-5 py-2 rounded-lg font-bold text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#252535] data-[state=active]:text-primary dark:data-[state=active]:text-white data-[state=active]:shadow-sm text-muted-foreground whitespace-nowrap transition-all"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0 outline-none"><AssessmentGrid items={filteredAssessments} /></TabsContent>
        <TabsContent value="pending" className="mt-0 outline-none"><AssessmentGrid items={pending} /></TabsContent>
        <TabsContent value="upcoming" className="mt-0 outline-none"><AssessmentGrid items={upcoming} /></TabsContent>
        <TabsContent value="completed" className="mt-0 outline-none"><AssessmentGrid items={completed} /></TabsContent>
      </Tabs>
    </div>
  );
}
