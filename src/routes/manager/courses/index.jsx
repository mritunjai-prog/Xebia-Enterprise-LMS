import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, Clock, Users, ShieldAlert, Trash2, Check, X, Shield } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";
import { PermissionGuard } from "@/components/auth/permission-guard";

export const Route = createFileRoute("/manager/courses/")({
  component: ManagerCoursesView,
});

const mockCourses = [
  {
    id: "c1",
    code: "CS-402",
    title: "Enterprise Architecture Patterns",
    subject: "Software Engineering",
    category: "Architecture",
    status: "Published",
    duration: "12h 30m",
    students: 124,
    gradient: "from-purple-600 to-indigo-600",
    deleteRequested: false
  },
  {
    id: "c2",
    code: "CS-501",
    title: "Advanced React & Next.js",
    subject: "Web Development",
    category: "Programming",
    status: "Draft",
    duration: "8h 15m",
    students: 0,
    gradient: "from-cyan-600 to-blue-600",
    deleteRequested: true
  },
  {
    id: "c3",
    code: "CS-308",
    title: "Microservices with Spring Boot",
    subject: "Backend Systems",
    category: "Architecture",
    status: "Published",
    duration: "15h 0m",
    students: 89,
    gradient: "from-pink-600 to-rose-600",
    deleteRequested: false
  },
];

function ManagerCoursesView() {
  const [courses, setCourses] = useState(mockCourses);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Governance Workflow state
  const [governanceModalOpen, setGovernanceModalOpen] = useState(false);
  const [courseToGovern, setCourseToGovern] = useState(null);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const requestDelete = (e) => {
    e.preventDefault();
    setCourses(courses.map(c => {
      if (c.id === courseToGovern.id) {
        return { ...c, deleteRequested: true };
      }
      return c;
    }));
    toast.success("Deletion request sent to Admin for approval.");
    setGovernanceModalOpen(false);
  };

  const cancelDeleteRequest = (id) => {
    setCourses(courses.map(c => {
      if (c.id === id) return { ...c, deleteRequested: false };
      return c;
    }));
    toast.info("Deletion request cancelled.");
  };

  return (
    <PermissionGuard required="course.read">
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <ModuleHeroBanner
          breadcrumb="Dashboard / Oversight / Courses"
          title="Course Governance"
          subtitle="Oversee active curriculum, review metrics, and request governed structural changes."
          actions={
            <div className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Manager Governance Mode Active
            </div>
          }
        />

        <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search course title or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground"
            >
              <option value="All" className="bg-card text-foreground">All Categories</option>
              <option value="Architecture" className="bg-card text-foreground">Architecture</option>
              <option value="Programming" className="bg-card text-foreground">Programming</option>
            </select>
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden border border-border/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-secondary/30">
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Course</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Metrics</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Governance Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                          {course.code.split('-')[1]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">{course.title}</p>
                          <p className="text-xs text-muted-foreground">{course.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-secondary px-2.5 py-1 rounded-md text-xs font-semibold text-muted-foreground">
                        {course.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary" /> {course.duration}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-blue-500" /> {course.students}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {course.deleteRequested ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">
                          <ShieldAlert className="w-3 h-3" /> Deletion Pending
                        </span>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          course.status === "Published" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        }`}>
                          {course.status}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {course.deleteRequested ? (
                        <button onClick={() => cancelDeleteRequest(course.id)} className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer">
                          Cancel Request
                        </button>
                      ) : (
                        <button 
                          onClick={() => { setCourseToGovern(course); setGovernanceModalOpen(true); }}
                          className="h-8 w-8 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white grid place-items-center transition-all cursor-pointer ml-auto"
                          title="Request Deletion"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Governance Deletion Request Modal */}
        <AnimatePresence>
          {governanceModalOpen && courseToGovern && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="w-full max-w-md glass rounded-2xl p-6 relative border-red-500/20">
                <button onClick={() => setGovernanceModalOpen(false)} className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <h2 className="text-xl font-bold font-display mb-2">Request Course Deletion</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Destructive actions are governed by the Administrator. Submitting this request will flag <strong>{courseToGovern.title}</strong> for deletion pending an Admin's approval.
                </p>
                <form onSubmit={requestDelete}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Reason for Deletion</label>
                      <textarea required rows={3} placeholder="Please explain why this course should be removed..." className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-red-500" />
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button type="button" onClick={() => setGovernanceModalOpen(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold border hover:bg-secondary transition-colors cursor-pointer">
                        Cancel
                      </button>
                      <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer">
                        Submit Request
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PermissionGuard>
  );
}
