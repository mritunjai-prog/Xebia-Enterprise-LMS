import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Upload,
  Plus,
  X,
  Users,
  CheckCircle,
  AlertTriangle,
  User,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  FileSpreadsheet,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/students/")({
  component: StudentsView,
});

const initialStudents = [
  {
    id: "s1",
    name: "Alice Johnson",
    email: "alice@example.com",
    batch: "Spring Boot Jan 2026",
    progress: 85,
    attendance: 95,
    gpa: 3.8,
    lastActive: "2 hours ago",
    scores: [
      { name: "Quiz 1", score: 85 },
      { name: "Quiz 2", score: 90 },
      { name: "Assignment 1", score: 80 },
      { name: "Lab Exam", score: 85 },
    ],
  },
  {
    id: "s2",
    name: "Bob Smith",
    email: "bob@example.com",
    batch: "React Advanced Cohort",
    progress: 42,
    attendance: 80,
    gpa: 2.9,
    lastActive: "1 day ago",
    scores: [
      { name: "Quiz 1", score: 65 },
      { name: "Quiz 2", score: 70 },
      { name: "Assignment 1", score: 60 },
      { name: "Lab Exam", score: 42 },
    ],
  },
  {
    id: "s3",
    name: "Charlie Davis",
    email: "charlie@example.com",
    batch: "Spring Boot Jan 2026",
    progress: 95,
    attendance: 98,
    gpa: 3.95,
    lastActive: "Just now",
    scores: [
      { name: "Quiz 1", score: 98 },
      { name: "Quiz 2", score: 95 },
      { name: "Assignment 1", score: 92 },
      { name: "Lab Exam", score: 95 },
    ],
  },
];

// Mock parsed CSV data with validation issues
const parsedCsvPreview = [
  { name: "Clara Oswald", email: "clara@example.com", batch: "Spring Boot Jan 2026", status: "Valid", error: null },
  { name: "Danny Pink", email: "danny@example.com", batch: "React Advanced Cohort", status: "Valid", error: null },
  { name: "Dave Archer", email: "dave-invalid-email", batch: "Spring Boot Jan 2026", status: "Invalid", error: "Invalid email format" },
  { name: "Amy Pond", email: "", batch: "React Advanced Cohort", status: "Invalid", error: "Missing email address" },
];

function StudentsView() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [activeStudent, setActiveStudent] = useState(null); // for details side drawer
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvParsed, setCsvParsed] = useState(false);

  // Single Add student form state
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addBatch, setAddBatch] = useState("Spring Boot Jan 2026");

  const handleFileUpload = (e) => {
    setCsvLoading(true);
    setCsvFile(e.target.files[0]?.name || "students_enrolment.csv");
    setTimeout(() => {
      setCsvLoading(false);
      setCsvParsed(true);
      toast.info("CSV file uploaded and pre-parsed. Please review validation warnings below.");
    }, 1500);
  };

  const handleImportValid = () => {
    const validRows = parsedCsvPreview.filter(r => r.status === "Valid").map((row, idx) => ({
      id: `s-csv-${Date.now()}-${idx}`,
      name: row.name,
      email: row.email,
      batch: row.batch,
      progress: Math.floor(Math.random() * 30),
      attendance: 100,
      gpa: 4.0,
      lastActive: "Never",
      scores: [{ name: "Quiz 1", score: 0 }],
    }));

    setStudents([...students, ...validRows]);
    setIsImportOpen(false);
    setCsvParsed(false);
    setCsvFile(null);
    toast.success(`Successfully imported ${validRows.length} valid student profiles!`);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!addName || !addEmail) return;

    const newStudent = {
      id: `s${Date.now()}`,
      name: addName,
      email: addEmail,
      batch: addBatch,
      progress: 0,
      attendance: 100,
      gpa: 4.0,
      lastActive: "Never",
      scores: [],
    };

    setStudents([newStudent, ...students]);
    setIsAddOpen(false);
    setAddName("");
    setAddEmail("");
    toast.success(`${addName} added successfully.`);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.email.toLowerCase().includes(search.toLowerCase());
    const matchesBatch = selectedBatch === "All" || s.batch === selectedBatch;
    return matchesSearch && matchesBatch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <ModuleHeroBanner
        breadcrumb="Dashboard / Students"
        title="Student Directory & Performance"
        subtitle="Monitor attendance logs, score sheets, and import student directories via CSV."
        actions={
          <>
            <button
              onClick={() => setIsImportOpen(true)}
              className="border hover:bg-secondary flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 text-primary" /> Import CSV List
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Student
            </button>
          </>
        }
      />

      {/* Filters */}
      <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search student name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-2 border border-border/50 rounded-xl px-3 py-1.5 bg-background">
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs font-semibold cursor-pointer text-foreground"
          >
            <option value="All">All Batches</option>
            <option value="Spring Boot Jan 2026">Spring Boot Jan 2026</option>
            <option value="React Advanced Cohort">React Advanced Cohort</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="glass rounded-2xl overflow-hidden border-border/40">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/40 text-muted-foreground border-b border-border/30 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Student Name</th>
                <th className="px-5 py-4 hidden sm:table-cell">Email Address</th>
                <th className="px-5 py-4">Batch Scope</th>
                <th className="px-5 py-4 text-center">Attendance</th>
                <th className="px-5 py-4 text-center">GPA</th>
                <th className="px-5 py-4 text-right">Course Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-medium">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setActiveStudent(student)}
                  className="hover:bg-secondary/20 transition-all cursor-pointer group"
                >
                  <td className="px-5 py-4 text-foreground font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-extrabold text-primary">
                      {student.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span>{student.name}</span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground hidden sm:table-cell">
                    {student.email}
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-secondary/60 border border-border/40 px-2 py-0.5 rounded text-xs">
                      {student.batch}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center font-bold">
                    <span className={student.attendance >= 90 ? "text-emerald-500" : "text-amber-500"}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center font-bold">
                    <span className="text-primary">{student.gpa.toFixed(2)}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden hidden md:block">
                        <div className="h-full bg-primary" style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className="font-bold text-foreground">{student.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Import Modal Overlay */}
      <AnimatePresence>
        {isImportOpen && (
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
              className="w-full max-w-2xl glass rounded-2xl p-6 relative overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => {
                  setIsImportOpen(false);
                  setCsvParsed(false);
                  setCsvFile(null);
                }}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold font-display mb-2 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary" /> Import Student Directory CSV
              </h2>
              <p className="text-xs text-muted-foreground mb-4">Bulk-enroll student profiles associated with university scopes.</p>

              {!csvParsed ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border/50 rounded-xl p-12 text-center hover:bg-secondary/20 transition-all cursor-pointer relative">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-10 h-10 text-primary mx-auto mb-2" />
                    <span className="text-sm font-bold block">Drag & drop students CSV here</span>
                    <p className="text-xs text-muted-foreground mt-1">Columns required: Name, Email, Batch</p>
                  </div>
                  {csvLoading && (
                    <div className="flex items-center justify-center gap-2 py-4">
                      <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <span className="text-xs font-semibold text-muted-foreground">Parsing CSV data structure...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-secondary/25 border border-border/30 rounded-xl p-3.5 flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">File: {csvFile}</span>
                    <span className="text-muted-foreground font-semibold">4 Records Scanned</span>
                  </div>

                  {/* Parse Preview Grid */}
                  <div className="border rounded-xl overflow-hidden bg-card/45">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-secondary/20 text-muted-foreground border-b border-border/30 font-bold uppercase">
                        <tr>
                          <th className="px-3 py-2">Name</th>
                          <th className="px-3 py-2">Email</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Issue / Warning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30 font-semibold">
                        {parsedCsvPreview.map((row, rIdx) => (
                          <tr key={rIdx} className={row.status === "Invalid" ? "bg-red-500/5 text-red-400" : "text-foreground"}>
                            <td className="px-3 py-2">{row.name}</td>
                            <td className="px-3 py-2">{row.email || "(Missing)"}</td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.status === "Valid" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-muted-foreground text-[10px]">
                              {row.error ? (
                                <span className="flex items-center gap-1 text-red-400">
                                  <AlertTriangle className="w-3 h-3" /> {row.error}
                                </span>
                              ) : (
                                <span className="text-emerald-500 flex items-center gap-0.5">
                                  <CheckCircle className="w-3 h-3" /> Ready
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      onClick={() => setCsvParsed(false)}
                      className="border hover:bg-secondary text-foreground text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Upload Another
                    </button>
                    <button
                      onClick={handleImportValid}
                      className="btn-hero text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
                    >
                      Import Valid Rows
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Single Student Modal */}
      <AnimatePresence>
        {isAddOpen && (
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
              className="w-full max-w-md glass rounded-2xl p-6 relative"
            >
              <button
                onClick={() => setIsAddOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold font-display mb-4">Enroll New Student Profile</h2>
              <form onSubmit={handleAddStudent}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Danny Pink"
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="danny@example.com"
                      value={addEmail}
                      onChange={(e) => setAddEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Enrolment Cohort Batch</label>
                    <select
                      value={addBatch}
                      onChange={(e) => setAddBatch(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary"
                    >
                      <option>Spring Boot Jan 2026</option>
                      <option>React Advanced Cohort</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer">
                    Enroll Student Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Student Slide Drawer */}
      <AnimatePresence>
        {activeStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm flex justify-end"
          >
            {/* Click backdrop to close */}
            <div className="absolute inset-0" onClick={() => setActiveStudent(null)} />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-md bg-card/95 border-l border-border/50 shadow-elegant h-full z-50 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-5">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Student Details
                  </h3>
                  <button
                    onClick={() => setActiveStudent(null)}
                    className="h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Profile Meta Cards */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center font-extrabold text-lg text-primary shadow-sm">
                    {activeStudent.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{activeStudent.name}</h4>
                    <span className="text-xs text-muted-foreground">{activeStudent.email}</span>
                  </div>
                </div>

                {/* Metrics boxes */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 bg-secondary/30 rounded-xl border border-border/30 text-center">
                    <CalendarCheck className="w-4 h-4 text-primary mx-auto mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Attendance</span>
                    <strong className="block text-sm text-foreground mt-0.5">{activeStudent.attendance}%</strong>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-xl border border-border/30 text-center">
                    <GraduationCap className="w-4 h-4 text-accent mx-auto mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Avg GPA</span>
                    <strong className="block text-sm text-foreground mt-0.5">{activeStudent.gpa.toFixed(2)}</strong>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-xl border border-border/30 text-center">
                    <TrendingUp className="w-4 h-4 text-teal-500 mx-auto mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Progress</span>
                    <strong className="block text-sm text-foreground mt-0.5">{activeStudent.progress}%</strong>
                  </div>
                </div>

                {/* Recharts progress history */}
                {activeStudent.scores.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Assessment Performance</h4>
                    <div className="h-44 w-full bg-secondary/25 border border-border/30 rounded-xl p-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={activeStudent.scores} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                          <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={9} />
                          <YAxis stroke="var(--muted-foreground)" fontSize={9} domain={[0, 100]} />
                          <RechartsTooltip />
                          <Line type="monotone" dataKey="score" stroke="oklch(0.38 0.14 335)" strokeWidth={2.5} activeDot={{ r: 6 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Score Log lists */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Submitted Scores</h4>
                  <div className="space-y-2">
                    {activeStudent.scores.length > 0 ? (
                      activeStudent.scores.map((s, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg bg-secondary/25 border border-border/30 text-xs">
                          <span className="font-semibold text-foreground">{s.name}</span>
                          <span className={`font-bold px-2 py-0.5 rounded ${
                            s.score >= 80 ? "bg-emerald-500/10 text-emerald-400" :
                            s.score >= 60 ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"
                          }`}>
                            {s.score} / 100
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground italic text-center py-4">No assessments submitted yet.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border/30 pt-4 mt-6">
                <button
                  onClick={() => toast.success(`Alert notification dispatched to ${activeStudent.name}`)}
                  className="flex-1 bg-secondary hover:bg-secondary/85 text-foreground py-2 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Send Notice
                </button>
                <button
                  onClick={() => toast.success(`SSO credentials sync requested for ${activeStudent.name}`)}
                  className="flex-1 btn-hero py-2 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Sync SSO Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
