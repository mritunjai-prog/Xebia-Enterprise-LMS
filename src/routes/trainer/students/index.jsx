import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Mail, Filter, CheckCircle, MoreVertical, Shield, User, Download, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/trainer/students/")({
  component: StudentsView,
});

const mockStudents = [
  { id: "S101", name: "Alice Johnson", email: "alice@student.tech", batch: "Spring Boot Jan 2026", progress: 85, status: "Active" },
  { id: "S102", name: "Bob Smith", email: "bob@student.tech", batch: "Spring Boot Jan 2026", progress: 42, status: "At Risk" },
  { id: "S103", name: "Clara Oswald", email: "clara@student.tech", batch: "React Advanced Cohort", progress: 95, status: "Excellent" },
  { id: "S104", name: "David Kim", email: "david@student.tech", batch: "React Advanced Cohort", progress: 68, status: "Active" },
  { id: "S105", name: "Emma Watson", email: "emma@student.tech", batch: "Enterprise Architecture Q2", progress: 12, status: "Inactive" },
];

function StudentsView() {
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.batch.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <ModuleHeroBanner
        breadcrumb="Dashboard / Students"
        title="Student Roster"
        subtitle="Track student progress, monitor engagement, and manage your cohorts."
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => toast.success("Exporting student data...")}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer bg-secondary text-foreground hover:bg-secondary/80 border border-border/50"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={() => toast.info("Opening Message Dialog...")}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
            >
              <Mail className="w-4 h-4" /> Message Batch
            </button>
          </div>
        }
      />

      <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students by name, ID, or batch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <button className="flex items-center gap-2 border border-border/50 rounded-xl px-4 py-2.5 bg-background hover:bg-secondary transition-colors text-sm font-semibold cursor-pointer">
            <Filter className="w-4 h-4 text-muted-foreground" /> Filter List
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/40 border-b border-border/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground w-16">ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Student Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Batch / Cohort</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Course Progress</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-secondary/20 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-muted-foreground">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium bg-secondary px-2.5 py-1 rounded-md text-foreground">{student.batch}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-full max-w-[120px] bg-secondary rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${student.progress > 80 ? 'bg-emerald-500' : student.progress > 40 ? 'bg-primary' : 'bg-amber-500'}`} 
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      student.status === 'Excellent' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      student.status === 'At Risk' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      student.status === 'Inactive' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      'bg-primary/10 text-primary border-primary/20'
                    }`}>
                      {student.status === 'Excellent' && <CheckCircle className="w-3 h-3" />}
                      {student.status === 'At Risk' && <Shield className="w-3 h-3" />}
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)}
                      className="h-8 w-8 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground inline-flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    <AnimatePresence>
                      {activeMenuId === student.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            className="absolute right-12 top-2 mt-1 w-48 rounded-xl glass-strong border shadow-lg z-20 py-1.5"
                          >
                            <button
                              onClick={() => { setActiveMenuId(null); toast.info("Opening Profile..."); }}
                              className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer"
                            >
                              <User className="w-3.5 h-3.5 text-primary" />
                              View Full Profile
                            </button>
                            <button
                              onClick={() => { setActiveMenuId(null); toast.info("Composing Message..."); }}
                              className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer"
                            >
                              <Mail className="w-3.5 h-3.5 text-blue-500" />
                              Direct Message
                            </button>
                            <hr className="my-1 border-border/40" />
                            <button
                              onClick={() => { setActiveMenuId(null); toast.info("Generating Report..."); }}
                              className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5 text-amber-500" />
                              Generate Report
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground font-medium">No students found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
