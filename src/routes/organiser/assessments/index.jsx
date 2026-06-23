import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Plus,
  Search,
  CheckCircle,
  FileText,
  Clock,
  User,
  GraduationCap,
  Percent,
  Check,
  X,
  Edit2,
  FileCode,
  Sliders,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/assessments/")({
  component: AssessmentsView,
});

const initialAssessments = [
  { id: "as1", title: "Docker Integration & Registry Lab", type: "Practical", course: "Microservices Boot", marks: 100, submissions: 42, pending: 3, deadline: "2026-06-25" },
  { id: "as2", title: "Spring Cloud Gateway Config Essay", type: "Theory", course: "Microservices Boot", marks: 50, submissions: 38, pending: 1, deadline: "2026-06-20" },
  { id: "as3", title: "Advanced React Context & Portals Exam", type: "Theory-Based MCQ", course: "Advanced React", marks: 100, submissions: 32, pending: 0, deadline: "2026-06-18" },
];

const initialSubmissions = [
  { id: "sub1", student: "Alice Johnson", assessment: "Docker Integration & Registry Lab", submittedAt: "2 hours ago", status: "Submitted", codeSnippet: "FROM openjdk:17-alpine\nCOPY target/*.jar app.jar\nENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"]", rubrics: { logic: 25, coverage: 20, execution: 40 } },
  { id: "sub2", student: "Bob Smith", assessment: "Docker Integration & Registry Lab", submittedAt: "1 day ago", status: "Submitted", codeSnippet: "FROM openjdk:17\nCOPY target/*.jar app.jar\nCMD java -jar app.jar", rubrics: { logic: 15, coverage: 10, execution: 20 } },
  { id: "sub3", student: "Clara Oswald", assessment: "Spring Cloud Gateway Config Essay", submittedAt: "3 hours ago", status: "Submitted", textAnswer: "Spring Cloud Gateway uses Netty as the underlying server. Routing is configured using predicates and filters...", rubrics: { logic: 35, coverage: 10 } },
];

const mockAnalytics = [
  { grade: "A (90-100)", count: 18, color: "oklch(0.38 0.14 335)" },
  { grade: "B (80-89)", count: 12, color: "oklch(0.78 0.14 200)" },
  { grade: "C (70-79)", count: 8, color: "oklch(0.76 0.14 165)" },
  { grade: "D (60-69)", count: 4, color: "oklch(0.55 0.22 320)" },
  { grade: "F (<60)", count: 0, color: "oklch(0.65 0.22 25)" },
];

function AssessmentsView() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [activeTab, setActiveTab] = useState("tests"); // tests, queue, stats
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null); // grading workflow dialog
  
  // Grading Rubrics State
  const [logicScore, setLogicScore] = useState(30);
  const [coverageScore, setCoverageScore] = useState(30);
  const [executionScore, setExecutionScore] = useState(40);
  const [feedback, setFeedback] = useState("");
  const [gradeLoading, setGradeLoading] = useState(false);

  // New Assessment Form
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Practical");
  const [newCourse, setNewCourse] = useState("Microservices Boot");
  const [newMarks, setNewMarks] = useState(100);
  const [newDeadline, setNewDeadline] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreateAssessment = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    setCreateLoading(true);

    setTimeout(() => {
      const newAss = {
        id: `as${Date.now()}`,
        title: newTitle,
        type: newType,
        course: newCourse,
        marks: parseInt(newMarks) || 100,
        submissions: 0,
        pending: 0,
        deadline: newDeadline || "2026-06-30",
      };

      setAssessments([newAss, ...assessments]);
      setCreateLoading(false);
      setIsCreateOpen(false);

      // Reset
      setNewTitle("");
      toast.success("Assessment published successfully!");
    }, 1200);
  };

  const handleOpenGrading = (sub) => {
    setSelectedSub(sub);
    setLogicScore(sub.rubrics?.logic || 30);
    setCoverageScore(sub.rubrics?.coverage || 30);
    setExecutionScore(sub.rubrics?.execution || 40);
    setFeedback("");
  };

  const handleSaveGrade = () => {
    setGradeLoading(true);
    const finalScore = logicScore + coverageScore + (selectedSub.rubrics?.execution ? executionScore : 0);

    setTimeout(() => {
      setSubmissions(submissions.filter(s => s.id !== selectedSub.id));
      setGradeLoading(false);
      setSelectedSub(null);
      
      // Update assessment metrics
      setAssessments(assessments.map(ass => {
        if (ass.title === selectedSub.assessment) {
          return { ...ass, pending: Math.max(0, ass.pending - 1) };
        }
        return ass;
      }));

      toast.success(`Grades committed! Final Score: ${finalScore} marks.`);
    }, 1200);
  };

  const filteredAssessments = assessments.filter(ass =>
    ass.title.toLowerCase().includes(search.toLowerCase()) ||
    ass.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <ModuleHeroBanner
        breadcrumb="Dashboard / Assessments"
        title="Assessments & Gradebook"
        subtitle="Deploy MCQ tests, evaluate code submissions using rubrics, and inspect score spreads."
        actions={
          <>
            <div className="flex border border-border/40 rounded-xl overflow-hidden p-0.5 bg-secondary/30">
              <button
                onClick={() => setActiveTab("tests")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  activeTab === "tests" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Assessments List
              </button>
              <button
                onClick={() => setActiveTab("queue")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  activeTab === "queue" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Evaluation Queue ({submissions.length})
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  activeTab === "stats" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Grade Spread
              </button>
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" /> Create Test
            </button>
          </>
        }
      />

      {/* Main Tab Renderings */}
      {activeTab === "tests" && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-xs">
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

          {/* Test cards list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((ass) => (
              <motion.div
                key={ass.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-5 border-border/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase font-bold bg-secondary px-2 py-0.5 rounded text-muted-foreground">
                      {ass.type}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Due {ass.deadline}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground mt-3 leading-snug">{ass.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">Syllabus: {ass.course}</p>
                </div>

                <div className="mt-5 space-y-4 pt-3 border-t border-border/30">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-secondary/35 rounded-lg">
                      <span className="text-[10px] text-muted-foreground block font-bold">Marks</span>
                      <strong className="text-foreground text-sm font-extrabold">{ass.marks}</strong>
                    </div>
                    <div className="p-2 bg-secondary/35 rounded-lg">
                      <span className="text-[10px] text-muted-foreground block font-bold">Submissions</span>
                      <strong className="text-foreground text-sm font-extrabold">{ass.submissions}</strong>
                    </div>
                    <div className="p-2 bg-secondary/35 rounded-lg">
                      <span className="text-[10px] text-muted-foreground block font-bold">Pending</span>
                      <strong className="text-red-500 text-sm font-extrabold">{ass.pending}</strong>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (ass.pending > 0) {
                          setActiveTab("queue");
                        } else {
                          toast.info("No pending submissions require evaluation.");
                        }
                      }}
                      className="flex-1 btn-hero py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Evaluate Queue
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "queue" && (
        <div className="glass rounded-2xl overflow-hidden border-border/40">
          {submissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/40 text-muted-foreground border-b border-border/30 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-4">Student</th>
                    <th className="px-5 py-4">Assessment Task</th>
                    <th className="px-5 py-4">Submitted At</th>
                    <th className="px-5 py-4 text-center">Status</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 font-medium">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-secondary/20 transition-all">
                      <td className="px-5 py-4 text-foreground font-bold flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-extrabold text-primary">
                          {sub.student.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span>{sub.student}</span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{sub.assessment}</td>
                      <td className="px-5 py-4 text-muted-foreground text-xs">{sub.submittedAt}</td>
                      <td className="px-5 py-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/25 text-amber-300">
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleOpenGrading(sub)}
                          className="bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors"
                        >
                          Grade Script
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center border-dashed">
              <ClipboardList className="w-12 h-12 text-muted-foreground/60 mb-3" />
              <h3 className="text-lg font-bold text-foreground">Evaluation Queue Empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You have evaluated all submissions! Great job.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "stats" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Grade Spread Distribution</h2>
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalytics} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                    <XAxis dataKey="grade" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                    <RechartsTooltip />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {mockAnalytics.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex justify-between items-center border-t border-border/30 pt-4 text-xs text-muted-foreground">
              <span>N = 42 Students</span>
              <span>Class GPA Average: 3.52 / 4.0</span>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Gradebook Insights</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border/30">
                <GraduationCap className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase block">Highest Performer</span>
                  <strong className="text-xs text-foreground font-bold">Charlie Davis (Grade A+)</strong>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border/30">
                <Percent className="w-5 h-5 text-accent" />
                <div>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase block">Average Retention</span>
                  <strong className="text-xs text-foreground font-bold">85% Passing Rate</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Construct Test Modal */}
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

              <h2 className="text-xl font-bold font-display mb-4">Construct Assessment Task</h2>
              <form onSubmit={handleCreateAssessment}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Assessment Title</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. JWT Auth Security Audit Lab"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Assessment Type</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary"
                      >
                        <option value="Practical">Practical Lab</option>
                        <option value="Theory">Theory Essay</option>
                        <option value="Theory-Based MCQ">Theory-Based MCQ</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Total Marks</label>
                      <input
                        required
                        type="number"
                        placeholder="100"
                        value={newMarks}
                        onChange={(e) => setNewMarks(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Due Deadline</label>
                    <input
                      required
                      type="date"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                    />
                  </div>
                  <button type="submit" disabled={createLoading} className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer">
                    {createLoading ? "Deploying test..." : "Publish Assessment"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grading workflow dialog */}
      <AnimatePresence>
        {selectedSub && (
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
              className="w-full max-w-3xl glass rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedSub(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Student response panel */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Student Script</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground">{selectedSub.student}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-3 block">Task: {selectedSub.assessment}</p>

                  <div className="mt-4 p-4 rounded-xl bg-secondary/40 border border-border/30 h-64 overflow-auto font-mono text-xs">
                    {selectedSub.codeSnippet ? (
                      <pre className="whitespace-pre-wrap">{selectedSub.codeSnippet}</pre>
                    ) : (
                      <p className="font-sans text-xs text-foreground italic leading-relaxed">{selectedSub.textAnswer}</p>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground font-semibold">Verification logs: SSO checked, no plagiarism detected.</span>
              </div>

              {/* Grading rubrics side */}
              <div className="space-y-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-1">
                    <Sliders className="w-4 h-4 text-accent" /> Rubric Evaluation
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Move sliders to configure rubric scores.</p>
                </div>

                <div className="space-y-4">
                  {/* Logic slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-foreground">Logic & Principles</span>
                      <span className="text-primary">{logicScore} / 40 pts</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={logicScore}
                      onChange={(e) => setLogicScore(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Coverage Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-foreground">Code Coverage / Structure</span>
                      <span className="text-primary">{coverageScore} / 30 pts</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={coverageScore}
                      onChange={(e) => setCoverageScore(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Execution (if Practical) */}
                  {selectedSub.rubrics?.execution !== undefined && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-foreground">Runtime Execution / Lab Criteria</span>
                        <span className="text-primary">{executionScore} / 30 pts</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={executionScore}
                        onChange={(e) => setExecutionScore(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  )}

                  {/* Dynamic Sum display */}
                  <div className="p-3 bg-secondary/30 rounded-xl border border-border/30 text-center font-bold text-sm">
                    Total Summed Mark: <span className="text-primary">{logicScore + coverageScore + (selectedSub.rubrics?.execution ? executionScore : 0)} / {selectedSub.rubrics?.execution ? 100 : 70}</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Feedback Remarks</label>
                    <textarea
                      rows={2}
                      placeholder="Excellent implementation, write detailed feedback..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg bg-background outline-none text-xs focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveTable}
                  onClick={handleSaveGrade}
                  disabled={gradeLoading}
                  className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer flex items-center justify-center"
                >
                  {gradeLoading ? "Saving score sheet..." : "Commit Grade Sheet"}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
