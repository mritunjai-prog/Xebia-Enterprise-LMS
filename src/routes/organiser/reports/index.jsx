import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  BarChart2,
  TrendingUp,
  Users,
  Settings,
  Calendar,
  Building,
  CheckCircle,
  FileText,
  FileSpreadsheet,
  AlertCircle,
  File,
} from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/reports/")({
  component: ReportsView,
});

const reportTypes = [
  { id: "grades", name: "Student Performance Gradebook", desc: "Aggregated exam, quiz, and lab task score sheets." },
  { id: "attendance", name: "Batch Attendance Logs", desc: "Detailed classroom check-in logs and absenteeism rates." },
  { id: "engagement", name: "Course Engagement Summary", desc: "Video lecture retention, library downloads, and forum rates." },
  { id: "completion", name: "Curriculum Completion Index", desc: "Tracking students who completed all module requirements." },
];

function ReportsView() {
  const [selectedReport, setSelectedReport] = useState("grades");
  const [scope, setScope] = useState("All");
  const [batch, setBatch] = useState("All");
  const [dateRange, setDateRange] = useState("30"); // 30, 90, 365 days
  const [exportColumns, setExportColumns] = useState({
    uid: true, name: true, email: true, grade: true, attendance: true, activeHours: false,
  });

  // Simulated download progress loading
  const [exportType, setExportType] = useState(null); // 'pdf', 'excel', 'csv'
  const [progress, setProgress] = useState(0);

  const handleExport = (type) => {
    if (exportType) return;
    setExportType(type);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 20;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setExportType(null);
            setProgress(0);
            toast.success(`Report compiled! Downloaded as ${selectedReport}_export.${type === 'excel' ? 'xlsx' : type}`, {
              icon: <CheckCircle className="text-emerald-500" />,
            });
          }, 400);
          return 100;
        }
        return next;
      });
    }, 250);
  };

  const toggleColumn = (col) => {
    setExportColumns({ ...exportColumns, [col]: !exportColumns[col] });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <ModuleHeroBanner
        breadcrumb="Dashboard / Reports"
        title="Analytics & Report Compiler"
        subtitle="Configure custom query schemas, select data fields, and compile exports."
        actions={
          <button
            onClick={() => handleExport("pdf")}
            disabled={!!exportType}
            className="btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4 animate-bounce" /> Generate Full Report
          </button>
        }
      />

      {/* Summary indicators cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Avg. Assessment Score", value: "82%", note: "+4.2% vs last cohort semester", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
          { label: "Classroom Attendance", value: "94%", note: "Averaged across all active batches", icon: Users, color: "text-accent", bg: "bg-accent/10" },
          { label: "Course Completion", value: "68%", note: "Passed all syllabus module checkpoints", icon: BarChart2, color: "text-blue-500", bg: "bg-blue-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6 border border-border/40 hover:border-primary/20 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</h3>
            </div>
            <div className="text-4xl font-extrabold font-display text-foreground tracking-tight">{stat.value}</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-semibold">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Compiler Console Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Selection / Configuration Panel */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 space-y-5 border-border/40">
          <h2 className="text-base font-bold text-foreground flex items-center gap-1.5">
            <Settings className="w-4.5 h-4.5 text-primary animate-spin" /> Query Configuration
          </h2>
          <hr className="border-border/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Report Categories */}
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Select Report Segment</label>
              <div className="space-y-2">
                {reportTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedReport(t.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedReport === t.id
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card border-border/40 hover:bg-secondary/40 text-foreground"
                    }`}
                  >
                    <span>{t.name}</span>
                    <span className="block text-[10px] text-muted-foreground font-medium mt-0.5">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scopes & Timelines */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">University Partner Scope</label>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs cursor-pointer focus:border-primary"
                >
                  <option value="All">All Scopes</option>
                  <option value="University of Tech">University of Tech</option>
                  <option value="Central Academy">Central Academy</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Target Batch</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs cursor-pointer focus:border-primary"
                >
                  <option value="All">All Active Batches</option>
                  <option value="Spring Boot Jan 2026">Spring Boot Jan 2026</option>
                  <option value="React Advanced Cohort">React Advanced Cohort</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Timeline Interval</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs cursor-pointer focus:border-primary"
                >
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="365">Last 365 Days</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Columns & Export Trigger Side */}
        <div className="glass rounded-2xl p-6 border-border/40 flex flex-col justify-between h-fit space-y-6">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-foreground">Include Fields</h2>
            <hr className="border-border/30" />

            <div className="space-y-2">
              {[
                { id: "uid", label: "Student UID Roll" },
                { id: "name", label: "Student Full Name" },
                { id: "email", label: "Email Address" },
                { id: "grade", label: "Assessment Grade Scores" },
                { id: "attendance", label: "Attendance Ratios" },
                { id: "activeHours", label: "Active Portal Hours Log" },
              ].map((col) => (
                <label key={col.id} className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 bg-card hover:bg-secondary/40 transition-colors cursor-pointer text-xs font-bold text-foreground">
                  <span>{col.label}</span>
                  <input
                    type="checkbox"
                    checked={exportColumns[col.id]}
                    onChange={() => toggleColumn(col.id)}
                    className="accent-primary h-4 w-4 rounded"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Compilation Buttons */}
          <div className="space-y-2.5">
            {exportType ? (
              <div className="p-3 bg-secondary/35 rounded-xl border border-border/40 text-center space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-primary">
                  <span>Compiling Export...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-card border rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleExport("pdf")}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border bg-card hover:bg-secondary/40 text-foreground transition-colors cursor-pointer"
                >
                  <File className="w-3.5 h-3.5 text-red-500" /> Export Document (.pdf)
                </button>
                <button
                  onClick={() => handleExport("excel")}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border bg-card hover:bg-secondary/40 text-foreground transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> Export Spreadsheet (.xlsx)
                </button>
                <button
                  onClick={() => handleExport("csv")}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border bg-card hover:bg-secondary/40 text-foreground transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-500" /> Export CSV Spreadsheet (.csv)
                </button>
              </>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
