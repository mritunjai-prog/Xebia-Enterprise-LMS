import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Calendar as CalendarIcon, Users, MoreVertical, Edit2, Play, Trash2, Video } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/trainer/batches/")({
  component: BatchesView,
});

const initialBatches = [
  {
    id: "b1",
    name: "Spring Boot Jan 2026",
    course: "Microservices with Spring Boot",
    students: 45,
    nextSession: "Tomorrow, 10:00 AM",
    status: "Active",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: "b2",
    name: "React Advanced Cohort",
    course: "Advanced React & Next.js",
    students: 32,
    nextSession: "Friday, 2:00 PM",
    status: "Active",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: "b3",
    name: "Enterprise Architecture Q2",
    course: "Enterprise Architecture Patterns",
    students: 120,
    nextSession: "Monday, 9:00 AM",
    status: "Upcoming",
    gradient: "from-emerald-600 to-teal-600",
  }
];

function BatchesView() {
  const [search, setSearch] = useState("");
  const [batches, setBatches] = useState(initialBatches);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const filteredBatches = batches.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.course.toLowerCase().includes(search.toLowerCase())
  );

  const deleteBatch = (id) => {
    if(confirm("Are you sure you want to delete this batch?")) {
      setBatches(batches.filter(b => b.id !== id));
      toast.error("Batch deleted.");
    }
    setActiveMenuId(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <ModuleHeroBanner
        breadcrumb="Dashboard / Batches"
        title="Batches & Scheduling"
        subtitle="Manage student cohorts, view schedules, and launch live sessions."
        actions={
          <button
            onClick={() => toast.info("Opening Batch Creator...")}
            className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Batch
          </button>
        }
      />

      <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search batches by name or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => (
          <motion.div
            key={batch.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group glass border border-border/40 rounded-2xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className={`h-24 bg-gradient-to-r ${batch.gradient} p-4 flex flex-col justify-between relative`}>
              <div className="flex items-start justify-between relative z-10">
                <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                  {batch.status}
                </span>
                
                <div className="relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === batch.id ? null : batch.id)}
                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white grid place-items-center cursor-pointer transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {activeMenuId === batch.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="absolute right-0 mt-1 w-48 rounded-xl glass-strong border shadow-lg z-20 py-1.5"
                        >
                          <button
                            onClick={() => { setActiveMenuId(null); toast.success("Live session launched!"); }}
                            className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 text-emerald-500" />
                            Launch Live Session
                          </button>
                          <button
                            onClick={() => { setActiveMenuId(null); toast.info("Opening Edit Dialog..."); }}
                            className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                            Edit Batch Info
                          </button>
                          <hr className="my-1 border-border/40" />
                          <button
                            onClick={() => deleteBatch(batch.id)}
                            className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete Batch
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
                <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {batch.name}
                </h3>
                <p className="text-xs font-medium text-muted-foreground mt-1 line-clamp-1">
                  Course: {batch.course}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm bg-secondary/30 p-3 rounded-xl border border-border/40">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{batch.students}</span>
                    <span className="text-xs text-muted-foreground">Students</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[8px] font-bold">
                        S{i}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium bg-primary/5 text-primary p-2.5 rounded-xl border border-primary/20">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Next: {batch.nextSession}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border/40">
                <button onClick={() => toast.info("Opening Schedule")} className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5" /> Schedule
                </button>
                <button onClick={() => toast.info("Opening Roster")} className="flex-1 border hover:bg-secondary text-foreground text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Roster
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredBatches.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">No batches found matching your search.</p>
        </div>
      )}
    </div>
  );
}
