import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Calendar as CalendarIcon,
  Users,
  Video,
  Clock,
  MapPin,
  CheckCircle,
  X,
  BookOpen,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/batches/")({
  component: BatchesView,
});

const initialBatches = [
  {
    id: "b1",
    name: "Spring Boot Jan 2026",
    course: "Microservices with Spring Boot",
    students: 45,
    schedule: "Mon, Wed, Fri • 10:00 AM",
    room: "Virtual Room 1",
    university: "University of Technology",
    status: "Active",
    progress: 75,
  },
  {
    id: "b2",
    name: "React Advanced Cohort",
    course: "Advanced React & Next.js",
    students: 32,
    schedule: "Tue, Thu • 02:00 PM",
    room: "Virtual Room 3",
    university: "University of Technology",
    status: "Active",
    progress: 42,
  },
  {
    id: "b3",
    name: "Enterprise Architecture B",
    course: "Enterprise Architecture Patterns",
    students: 28,
    schedule: "Wed • 09:00 AM",
    room: "Offline Lab 3",
    university: "Central Engineering Academy",
    status: "Upcoming",
    progress: 0,
  },
];

const mockWeeklySlots = [
  { day: "Monday", time: "10:00 AM", batch: "Spring Boot Jan 2026", course: "Microservices Boot", room: "Virtual Room 1" },
  { day: "Tuesday", time: "02:00 PM", batch: "React Advanced Cohort", course: "Advanced React", room: "Virtual Room 3" },
  { day: "Wednesday", time: "09:00 AM", batch: "Enterprise Architecture B", course: "Enterprise Arch", room: "Offline Lab 3" },
  { day: "Wednesday", time: "10:00 AM", batch: "Spring Boot Jan 2026", course: "Microservices Boot", room: "Virtual Room 1" },
  { day: "Thursday", time: "02:00 PM", batch: "React Advanced Cohort", course: "Advanced React", room: "Virtual Room 3" },
  { day: "Friday", time: "10:00 AM", batch: "Spring Boot Jan 2026", course: "Microservices Boot", room: "Virtual Room 1" },
];

function BatchesView() {
  const [batches, setBatches] = useState(initialBatches);
  const [search, setSearch] = useState("");
  const [universityFilter, setUniversityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSchedulerView, setIsSchedulerView] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // New Batch Form State
  const [batchName, setBatchName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Microservices with Spring Boot");
  const [associatedUni, setAssociatedUni] = useState("University of Technology");
  const [sessionTime, setSessionTime] = useState("10:00 AM");
  const [selectedRoom, setSelectedRoom] = useState("Virtual Room 1");
  const [scheduleDays, setScheduleDays] = useState(["Mon"]);

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!batchName) return;
    setSubmitLoading(true);

    setTimeout(() => {
      const newBatch = {
        id: `b${Date.now()}`,
        name: batchName,
        course: selectedCourse,
        students: 0,
        schedule: `${scheduleDays.join(", ")} • ${sessionTime}`,
        room: selectedRoom,
        university: associatedUni,
        status: "Upcoming",
        progress: 0,
      };

      setBatches([newBatch, ...batches]);
      setSubmitLoading(false);
      setIsCreateOpen(false);

      // Reset
      setBatchName("");
      setScheduleDays(["Mon"]);
      toast.success("Cohort batch launched successfully!");
    }, 1200);
  };

  const handleToggleDay = (day) => {
    if (scheduleDays.includes(day)) {
      setScheduleDays(scheduleDays.filter(d => d !== day));
    } else {
      setScheduleDays([...scheduleDays, day]);
    }
  };

  const filteredBatches = batches.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || 
                          b.course.toLowerCase().includes(search.toLowerCase());
    const matchesUni = universityFilter === "All" || b.university === universityFilter;
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesUni && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <ModuleHeroBanner
        breadcrumb="Dashboard / Batches & Enrolments"
        title="Batches & Enrolment Scheduling"
        subtitle="Launch university cohorts, select curriculum, and configure weekly timetables."
        actions={
          <>
            <div className="flex border border-border/40 rounded-xl overflow-hidden p-0.5 bg-secondary/30">
              <button
                onClick={() => setIsSchedulerView(false)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  !isSchedulerView ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Cohort List
              </button>
              <button
                onClick={() => setIsSchedulerView(true)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  isSchedulerView ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Timetable Grid
              </button>
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> Launch Cohort
            </button>
          </>
        }
      />

      {/* Filter Options */}
      {!isSchedulerView && (
        <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by cohort or course name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background">
              <Building className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={universityFilter}
                onChange={(e) => setUniversityFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground"
              >
                <option value="All">All Universities Scope</option>
                <option value="University of Technology">University of Tech</option>
                <option value="Central Engineering Academy">Central Academy</option>
              </select>
            </div>

            <div className="flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      {!isSchedulerView ? (
        filteredBatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-5 border-border/40 flex flex-col justify-between hover:border-primary/20 transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-foreground leading-snug">{batch.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Building className="w-3 h-3 text-primary" /> {batch.university}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      batch.status === "Active" ? "bg-emerald-500/25 text-emerald-300" : "bg-blue-500/25 text-blue-300"
                    }`}>
                      {batch.status}
                    </span>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-card border border-border/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="font-semibold text-foreground line-clamp-1">{batch.course}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{batch.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Video className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <span className="font-bold text-foreground">{batch.room}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4 pt-3 border-t border-border/30">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3.5 h-3.5 text-primary" /> Enrolled: <strong className="text-foreground">{batch.students}</strong>
                    </span>
                    <span className="text-muted-foreground font-bold">{batch.progress}% complete</span>
                  </div>

                  {batch.status === "Active" && (
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${batch.progress}%` }} />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => toast.success("Configuring weekly schedule slots...")}
                      className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Timetable
                    </button>
                    <button
                      onClick={() => toast.success("Redirecting to student directory with batch filters...")}
                      className="flex-1 border hover:bg-secondary text-foreground text-xs font-semibold py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Enrol Students
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center border-dashed">
            <CalendarIcon className="w-12 h-12 text-muted-foreground/60 mb-3" />
            <h3 className="text-lg font-bold text-foreground">No Cohorts Scheduled</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-1">
              Configure and launch a new student batch to manage class timetables.
            </p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="btn-hero px-4 py-2 rounded-xl text-xs font-bold mt-4 cursor-pointer"
            >
              Launch First Cohort
            </button>
          </div>
        )
      ) : (
        /* Weekly Timetable Grid */
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Active Weekly Slot Grid</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => {
              const slots = mockWeeklySlots.filter(s => s.day === day);
              return (
                <div key={day} className="border border-border/40 rounded-xl p-3.5 bg-card/65 space-y-3">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-primary border-b border-border/30 pb-1.5">
                    {day}
                  </h3>
                  {slots.length > 0 ? (
                    slots.map((slot, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-background border border-border/30 space-y-1 hover:border-primary/20 transition-all">
                        <span className="text-[10px] font-bold text-accent">{slot.time}</span>
                        <h4 className="text-xs font-bold text-foreground line-clamp-1 leading-snug">{slot.batch}</h4>
                        <p className="text-[9px] text-muted-foreground truncate">{slot.course}</p>
                        <span className="text-[8px] bg-secondary font-bold px-1 py-0.5 rounded text-muted-foreground">
                          {slot.room}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-muted-foreground/50 italic text-center py-4">No sessions</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Batch Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-lg glass rounded-2xl p-6 relative"
            >
              <button
                onClick={() => setIsCreateOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold font-display mb-4">Launch New Cohort Batch</h2>
              <form onSubmit={handleCreateBatch}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Batch / Cohort Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Next.js Spring Semester 2026"
                      value={batchName}
                      onChange={(e) => setBatchName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Select Course Syllabus</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary"
                    >
                      <option>Microservices with Spring Boot</option>
                      <option>Advanced React & Next.js</option>
                      <option>Enterprise Architecture Patterns</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">University Partner</label>
                      <select
                        value={associatedUni}
                        onChange={(e) => setAssociatedUni(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary"
                      >
                        <option>University of Technology</option>
                        <option>Central Engineering Academy</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Virtual Room / Location</label>
                      <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary"
                      >
                        <option>Virtual Room 1</option>
                        <option>Virtual Room 2</option>
                        <option>Virtual Room 3</option>
                        <option>Offline Lecture Hall C</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Session Timing</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. 10:00 AM"
                        value={sessionTime}
                        onChange={(e) => setSessionTime(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Weekly Frequency</label>
                      <div className="flex gap-1.5 flex-wrap mt-1">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
                          const active = scheduleDays.includes(day);
                          return (
                            <button
                              type="button"
                              key={day}
                              onClick={() => handleToggleDay(day)}
                              className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer transition-all ${
                                active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-4 flex items-center justify-center cursor-pointer"
                  >
                    {submitLoading ? "Synchronizing slots..." : "Schedule Cohort & Launch"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
