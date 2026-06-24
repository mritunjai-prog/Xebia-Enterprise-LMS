import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, MoreVertical, Clock, Users, BookOpen, Filter, X, Check, Edit2, Play, Eye } from "lucide-react";
import { PermissionGuard } from "@/components/auth/permission-guard";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/trainer/courses/")({
  component: TrainerCourseListView,
});

const initialCourses = [
  {
    id: "c1",
    code: "CS-402",
    title: "Enterprise Architecture Patterns",
    subject: "Software Engineering",
    university: "University of Technology",
    status: "Published",
    batches: 3,
    students: 124,
    duration: "12h 30m",
    updated: "2026-06-20",
    gradient: "from-purple-600 to-indigo-600",
    image: "/courses/enterprise_architecture.png",
  },
  {
    id: "c2",
    code: "CS-501",
    title: "Advanced React & Next.js",
    subject: "Web Development",
    university: "University of Technology",
    status: "Draft",
    batches: 0,
    students: 0,
    duration: "8h 15m",
    updated: "2026-06-22",
    gradient: "from-cyan-600 to-blue-600",
    image: "/courses/react_nextjs.png",
  },
  {
    id: "c3",
    code: "CS-308",
    title: "Microservices with Spring Boot",
    subject: "Backend Systems",
    university: "Central Engineering Academy",
    status: "Published",
    batches: 2,
    students: 89,
    duration: "15h 0m",
    updated: "2026-06-15",
    gradient: "from-emerald-600 to-teal-600",
    image: null,
  },
];

function TrainerCourseListView() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [scopeFilter, setScopeFilter] = useState("All");
  
  // Action menus
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Filter Logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                          course.code.toLowerCase().includes(search.toLowerCase()) ||
                          course.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || course.status === statusFilter;
    const matchesScope = scopeFilter === "All" || course.university === scopeFilter;
    return matchesSearch && matchesStatus && matchesScope;
  });

  const togglePublish = (id) => {
    setCourses(courses.map(c => {
      if (c.id === id) {
        const newStatus = c.status === "Published" ? "Draft" : "Published";
        toast.success(`Course "${c.title}" is now ${newStatus}`);
        return { ...c, status: newStatus };
      }
      return c;
    }));
    setActiveMenuId(null);
  };

  const deleteCourse = (id) => {
    const courseToDelete = courses.find(c => c.id === id);
    if(confirm(`Are you sure you want to delete ${courseToDelete.title}?`)) {
      setCourses(courses.filter(c => c.id !== id));
      toast.error(`Course "${courseToDelete.title}" deleted.`);
    }
    setActiveMenuId(null);
  };

  return (
    <PermissionGuard required="course.read">
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Hero Banner */}
        <ModuleHeroBanner
          breadcrumb="Dashboard / Trainer Courses"
          title="Assigned Courses & Content"
          subtitle="Manage the syllabus, course outlines, and modules for the classes you teach."
          actions={
            <button
              onClick={() => toast.info("Opening Course Creator...")}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create Course
            </button>
          }
        />

        {/* Filter Bar Panel */}
        <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search code, title or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={scopeFilter}
                onChange={(e) => setScopeFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground"
              >
                <option value="All" className="bg-card text-foreground" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}>All Universities</option>
                <option value="University of Technology" className="bg-card text-foreground" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}>University of Technology</option>
                <option value="Central Engineering Academy" className="bg-card text-foreground" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}>Central Engineering Academy</option>
              </select>
            </div>

            <div className="flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground"
              >
                <option value="All" className="bg-card text-foreground" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}>All Statuses</option>
                <option value="Published" className="bg-card text-foreground" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}>Published</option>
                <option value="Draft" className="bg-card text-foreground" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }}>Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Catalog Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group glass border border-border/40 rounded-2xl overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Course Banner */}
                <div
                  className={`h-32 bg-cover bg-center p-4 flex flex-col justify-between relative ${course.image ? "" : `bg-gradient-to-r ${course.gradient}`}`}
                  style={course.image ? {
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${course.image})`
                  } : undefined}
                >
                  <div className="flex items-start justify-between">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                      {course.code}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === course.id ? null : course.id)}
                        className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white grid place-items-center cursor-pointer transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Options */}
                      <AnimatePresence>
                        {activeMenuId === course.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              className="absolute right-0 mt-1 w-44 rounded-xl glass-strong border shadow-lg z-20 py-1.5"
                            >
                              <button
                                onClick={() => togglePublish(course.id)}
                                className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                {course.status === "Published" ? "Make Draft" : "Publish Course"}
                              </button>
                              <Link
                                to="/trainer/courses/$courseId"
                                params={{ courseId: course.id }}
                                className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-semibold text-foreground flex items-center gap-2"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-blue-500" />
                                Edit Modules
                              </Link>
                              <hr className="my-1 border-border/40" />
                              <button
                                onClick={() => deleteCourse(course.id)}
                                className="w-full text-left px-3 py-1.5 hover:bg-secondary text-xs font-bold text-red-500 flex items-center gap-2"
                              >
                                <X className="w-3.5 h-3.5" />
                                Delete Course
                              </button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-bold text-white/95 uppercase tracking-wide">
                      {course.subject}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      course.status === "Published" ? "bg-emerald-500/25 text-emerald-300" : "bg-amber-500/25 text-amber-300"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>

                {/* Course Metadata Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      Scope: {course.university}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground bg-secondary/30 p-2.5 rounded-xl border border-border/40">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span className="font-semibold">{course.students}</span> Enrolled
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                        <span className="font-semibold">{course.batches}</span> Batches
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-semibold">{course.duration}</span> estimated time
                      </div>
                    </div>
                    
                    <div className="pt-3 flex items-center justify-between border-t border-border/40">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        Updated {course.updated}
                      </span>
                      <Link
                        to="/trainer/courses/$courseId"
                        params={{ courseId: course.id }}
                        className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                      >
                        Manage <Plus className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="h-16 w-16 bg-secondary rounded-full grid place-items-center mb-4">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No courses found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              We couldn't find any courses matching your filters. Try adjusting your search or create a new course.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setScopeFilter("All");
              }}
              className="mt-6 text-sm font-semibold text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </PermissionGuard>
  );
}
