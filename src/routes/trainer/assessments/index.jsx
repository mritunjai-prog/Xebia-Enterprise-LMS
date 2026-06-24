import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Clock, FileText, CheckCircle, MoreVertical, Edit2, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/trainer/assessments/")({
  component: AssessmentsView,
});

const initialAssessments = [
  {
    id: "a1",
    title: "Mid-Term Architecture Essay",
    course: "Enterprise Architecture Patterns",
    type: "Essay",
    due: "Today, 5:00 PM",
    submissions: 112,
    totalStudents: 120,
    status: "Active",
    gradient: "from-rose-500 to-red-600"
  },
  {
    id: "a2",
    title: "React Hooks Lab",
    course: "Advanced React & Next.js",
    type: "Practical",
    due: "Tomorrow, 11:59 PM",
    submissions: 15,
    totalStudents: 32,
    status: "Active",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: "a3",
    title: "Spring Boot Authentication Quiz",
    course: "Microservices with Spring Boot",
    type: "Quiz",
    due: "June 30, 2026",
    submissions: 0,
    totalStudents: 45,
    status: "Draft",
    gradient: "from-amber-500 to-orange-600"
  }
];

function AssessmentsView() {
  const [search, setSearch] = useState("");
  const [assessments, setAssessments] = useState(initialAssessments);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const filteredAssessments = assessments.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.course.toLowerCase().includes(search.toLowerCase())
  );

  const deleteAssessment = (id) => {
    if(confirm("Are you sure you want to delete this assessment?")) {
      setAssessments(assessments.filter(a => a.id !== id));
      toast.error("Assessment deleted.");
    }
    setActiveMenuId(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <ModuleHeroBanner
        breadcrumb="Dashboard / Assessments"
        title="Assessments & Quizzes"
        subtitle="Create assignments, manage submissions, and grade student work."
        actions={
          <button
            onClick={() => toast.info("Opening Assessment Creator...")}
            className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Assessment
          </button>
        }
      />

      <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assessments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group glass border border-border/40 rounded-2xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className={`h-24 bg-gradient-to-r ${assessment.gradient} p-4 flex flex-col justify-between relative`}>
              <div className="flex items-start justify-between relative z-10">
                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                  {assessment.type}
                </span>
                
                <div className="relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === assessment.id ? null : assessment.id)}
                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white grid place-items-center cursor-pointer transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {activeMenuId === assessment.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="absolute right-0 mt-1 w-48 rounded-xl glass-strong border shadow-lg z-20 py-1.5"
                        >
                          <button
                            onClick={() => { setActiveMenuId(null); toast.info("Opening Editor..."); }}
                            className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                            Edit Rubric/Details
                          </button>
                          <hr className="my-1 border-border/40" />
                          <button
                            onClick={() => deleteAssessment(assessment.id)}
                            className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete Assessment
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {assessment.title}
                  </h3>
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-1 line-clamp-1">
                  {assessment.course}
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-secondary/30 p-3 rounded-xl border border-border/40 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-xs font-semibold">Submissions</span>
                    <span className="font-bold text-foreground">
                      {assessment.submissions} <span className="text-muted-foreground font-medium">/ {assessment.totalStudents}</span>
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full ${assessment.submissions === assessment.totalStudents ? 'bg-emerald-500' : 'bg-primary'}`} 
                      style={{ width: `${(assessment.submissions / assessment.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium bg-red-500/5 text-red-500 p-2.5 rounded-xl border border-red-500/20">
                  <Clock className="w-4 h-4" />
                  <span>Due: {assessment.due}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border/40">
                <button onClick={() => toast.info("Opening Submissions Viewer")} className="w-full btn-hero py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Grade Submissions
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
