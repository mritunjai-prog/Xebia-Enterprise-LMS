import { createFileRoute } from "@tanstack/react-router";
import { enrolledCourses, commentsData, studentProfile } from "@/lib/dummy-data";
import {
  PlayCircle, MessageSquare, Send, CheckCircle2, ArrowLeft, Play,
  Clock, ChevronDown, Lock, Printer, X, BookOpen, Star, FileText, Award
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export const Route = createFileRoute("/student/course/$courseId")({
  component: CourseVideoPlayer,
});

const mockCurriculum = [
  {
    id: "m1",
    title: "Introduction to the Course",
    submodules: [
      { id: "s1", title: "Welcome & Overview", type: "VIDEO", completed: true, duration: "5:12" },
      { id: "s2", title: "Course Requirements", type: "TEXT", completed: true, duration: "3:00" },
    ],
  },
  {
    id: "m2",
    title: "Core Concepts",
    submodules: [
      { id: "s3", title: "Understanding the Architecture", type: "VIDEO", completed: true, duration: "12:45" },
      { id: "s4", title: "State Management Deep Dive", type: "VIDEO", active: true, duration: "18:30" },
      { id: "s5", title: "Quiz: Core Concepts", type: "QUIZ", completed: false, duration: "10:00" },
    ],
  },
  {
    id: "m3",
    title: "Advanced Patterns",
    submodules: [
      { id: "s6", title: "Performance Optimization", type: "VIDEO", completed: false, duration: "15:22" },
      { id: "s7", title: "Security Best Practices", type: "TEXT", completed: false, duration: "8:10" },
      { id: "s8", title: "Final Project Overview", type: "VIDEO", completed: false, duration: "20:00" },
    ],
  },
];

const BRAND = "#6C1D5F";
const TEAL = "#01AC9F";
const GOLD = "#B48C3C";

function CourseVideoPlayer() {
  const { courseId } = Route.useParams();
  const course = enrolledCourses.find((c) => c.id === courseId) || enrolledCourses[0];
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState("comments");
  const [expandedModules, setExpandedModules] = useState(["m1", "m2"]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const completionDate = new Date().toLocaleDateString("en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
  const certId = `XEB-${course.id.toUpperCase()}-2026-${studentProfile.id}`;

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    toast.success("Comment posted!");
    setCommentText("");
  };

  const toggleModule = (id) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-[1500px] mx-auto space-y-4 animate-in fade-in duration-500 pb-12">

      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/student/courses"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-[#6C1D5F] dark:hover:text-[#84117C] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to My Courses
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technology</span>
          <span className="text-gray-300 dark:text-gray-600">•</span>
          <span className="text-[#6C1D5F] dark:text-[#84117C]">{course.title}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6">

        {/* ── Left: Video + Tabs ── */}
        <div className="space-y-5 min-w-0">

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-black group shadow-xl border border-gray-200/30 dark:border-[#2e2e3e]/50"
          >
            <img
              src={course.image}
              alt="thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            <button className="absolute inset-0 m-auto z-10 h-20 w-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
              <Play className="h-8 w-8 ml-1 fill-white" />
            </button>
            <div className="absolute bottom-0 inset-x-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-white text-xs font-semibold mb-2">
                <span>04:12 / 18:30</span>
                <span className="px-2 py-0.5 bg-black/60 rounded text-[10px] tracking-wider uppercase">HD 1080p</span>
              </div>
              <div className="relative w-full h-1.5 bg-white/25 rounded-full cursor-pointer group/bar">
                <div className="h-full w-[22%] bg-gradient-to-r from-[#6C1D5F] to-[#01AC9F] rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Course Meta */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#6C1D5F]/10 dark:bg-purple-500/10 text-[#6C1D5F] dark:text-purple-400 uppercase tracking-wider">{course.trainer}</span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-gray-500 dark:text-gray-400"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500"><Star className="w-3.5 h-3.5 fill-current" /> 4.8</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">{course.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-[#6C1D5F] dark:text-purple-400" />
              Now Playing: <span className="text-gray-700 dark:text-gray-300 font-bold">{course.lastWatched}</span>
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-[#2e2e3e]">
            <div className="flex gap-6">
              {["comments", "notes", "resources"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={clsx("pb-3 text-sm font-bold capitalize transition-all border-b-2 -mb-[2px]",
                    activeTab === tab
                      ? "border-[#6C1D5F] text-[#6C1D5F] dark:border-[#84117C] dark:text-[#84117C]"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                >{tab}</button>
              ))}
            </div>
          </div>

          {/* Tab Panels */}
          <AnimatePresence mode="wait">
            {activeTab === "comments" ? (
              <motion.div key="comments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#6C1D5F] dark:text-purple-400" /> Discussion Forum
                  </h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{(commentsData || []).length} comments</span>
                </div>
                <form onSubmit={handlePostComment} className="flex gap-3 mb-8">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6C1D5F] to-[#84117C] text-white flex items-center justify-center font-bold text-sm shadow shrink-0">
                    {studentProfile.name.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <textarea
                      placeholder="Ask a question or share your thoughts..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full min-h-[90px] p-3 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] dark:text-white transition-all resize-none"
                    />
                    <div className="flex justify-end">
                      <button type="submit" disabled={!commentText.trim()}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-[#6C1D5F] hover:bg-[#5a184f] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:-translate-y-0.5"
                      >
                        <Send className="h-3.5 w-3.5" /> Post Comment
                      </button>
                    </div>
                  </div>
                </form>
                <div className="space-y-6">
                  {(commentsData || []).map((comment) => (
                    <div key={comment.id} className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-sm text-gray-600 dark:text-gray-300 shrink-0 overflow-hidden">
                          {comment.avatar ? <img src={comment.avatar} alt="" className="w-full h-full object-cover" /> : comment.author.charAt(0)}
                        </div>
                        <div className="flex-1 bg-gray-50 dark:bg-[#1a1a24] p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-[#2e2e3e]">
                          <div className="flex justify-between mb-1.5">
                            <span className="font-bold text-sm text-gray-900 dark:text-white">{comment.author}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.text}</p>
                          <div className="mt-2 flex gap-3 text-xs font-bold text-gray-400">
                            <button className="hover:text-[#6C1D5F] transition-colors">Reply</button>
                            <button className="hover:text-[#6C1D5F] transition-colors">Helpful</button>
                          </div>
                        </div>
                      </div>
                      {(comment.replies || []).map((reply) => (
                        <div key={reply.id} className="flex gap-3 ml-10">
                          <div className="w-8 h-8 rounded-full border-2 border-[#6C1D5F]/30 flex items-center justify-center shrink-0 overflow-hidden bg-[#6C1D5F]/5">
                            {reply.avatar ? <img src={reply.avatar} alt="" className="w-full h-full object-cover" /> : <span className="text-xs font-bold text-[#6C1D5F]">TR</span>}
                          </div>
                          <div className="flex-1 bg-[#6C1D5F]/5 dark:bg-[#84117C]/10 p-4 rounded-2xl rounded-tl-none border border-[#6C1D5F]/10 dark:border-[#84117C]/20">
                            <div className="flex justify-between mb-1.5">
                              <span className="font-bold text-sm text-[#6C1D5F] dark:text-[#84117C] flex items-center gap-1">{reply.author} <CheckCircle2 className="w-3.5 h-3.5" /></span>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="other" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-14 text-center"
              >
                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300 dark:text-gray-600">
                  <PlayCircle className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Coming Soon</h3>
                <p className="text-sm text-gray-400">This feature is under development.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Sidebar ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm sticky top-6 flex flex-col"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            {/* Sidebar Header */}
            <div className="p-5 border-b border-gray-100 dark:border-[#2e2e3e] shrink-0">
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-4">Course Curriculum</h3>
              <div className="bg-gray-50 dark:bg-[#1a1a24] rounded-xl p-4 border border-gray-100 dark:border-[#2e2e3e]">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                  <span className="text-[#6C1D5F] dark:text-purple-400">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2.5 mb-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{course.modulesCompleted} of {course.totalModules} modules completed</p>
              </div>
            </div>

            {/* Accordion */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {mockCurriculum.map((mod, mIdx) => {
                const isExpanded = expandedModules.includes(mod.id);
                const allDone = mod.submodules.every((s) => s.completed);
                const someActive = mod.submodules.some((s) => s.active);
                return (
                  <div key={mod.id} className="border border-gray-100 dark:border-[#2e2e3e] rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex items-center gap-3 p-3.5 bg-white dark:bg-[#15151f] hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors text-left"
                    >
                      <div className={clsx("w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0",
                        allDone ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : someActive ? "bg-[#6C1D5F]/10 dark:bg-[#84117C]/20 text-[#6C1D5F] dark:text-[#84117C]"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      )}>
                        {allDone ? <CheckCircle2 className="w-4 h-4" /> : mIdx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-900 dark:text-white leading-tight line-clamp-1">{mod.title}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{mod.submodules.length} lessons</p>
                      </div>
                      <ChevronDown className={clsx("w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300", isExpanded && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="bg-gray-50/60 dark:bg-[#1a1a24]/60 px-3 py-2 space-y-1">
                            {mod.submodules.map((sub) => (
                              <button
                                key={sub.id}
                                disabled={!sub.completed && !sub.active}
                                className={clsx(
                                  "w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-sm transition-all",
                                  sub.active ? "bg-[#6C1D5F]/10 dark:bg-[#84117C]/20 text-[#6C1D5F] dark:text-[#84117C] font-bold"
                                    : sub.completed ? "hover:bg-white dark:hover:bg-[#252535] text-gray-700 dark:text-gray-300 font-medium"
                                    : "text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60"
                                )}
                              >
                                <div className="shrink-0 w-4">
                                  {sub.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                  ) : sub.active ? (
                                    <div className="relative w-4 h-4 flex items-center justify-center">
                                      <Play className="w-3 h-3 fill-current relative z-10" />
                                      <span className="absolute inset-0 rounded-full bg-[#6C1D5F]/30 animate-ping" />
                                    </div>
                                  ) : (
                                    <Lock className="w-3.5 h-3.5" />
                                  )}
                                </div>
                                <span className="flex-1 leading-tight line-clamp-1">{sub.title}</span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {sub.type === "VIDEO" && <PlayCircle className="w-3 h-3 opacity-40" />}
                                  {sub.type === "TEXT" && <FileText className="w-3 h-3 opacity-40" />}
                                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{sub.duration}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Certificate CTA */}
            <div className="p-4 border-t border-gray-100 dark:border-[#2e2e3e] shrink-0">
              {course.progress >= 100 ? (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-[#01AC9F] shadow-[0_4px_14px_-2px_rgba(1,172,159,0.45)] hover:shadow-[0_6px_20px_-2px_rgba(1,172,159,0.65)] hover:-translate-y-0.5 transition-all"
                >
                  <Award className="w-5 h-5" />
                  View & Download Certificate
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="w-full py-3 rounded-xl font-bold text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 flex items-center justify-center gap-2 cursor-not-allowed">
                    <Lock className="w-4 h-4" /> Certificate Locked
                  </div>
                  <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">{100 - course.progress}% more to unlock your Xebia certificate</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm print:bg-transparent print:p-0">
            <style>{`
              @media print {
                @page { size: A4 landscape; margin: 0; }
                body {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  margin: 0 !important;
                }
                body * { visibility: hidden; }
                #certificate-print-area, #certificate-print-area * { visibility: visible; }
                
                /* Collapse rest of the app so it doesn't take up pages */
                #root { position: absolute; height: 0; overflow: hidden; }
                #print-modal-wrapper > div:first-child { display: none !important; }
                
                /* Strip constraints from modal ancestors */
                .fixed.inset-0 { position: static !important; }
                #print-modal-wrapper {
                  transform: none !important;
                  position: static !important;
                  overflow: visible !important;
                  max-height: none !important;
                  max-width: none !important;
                }

                #certificate-print-area {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100vw !important;
                  height: 100vh !important;
                  max-width: none !important;
                  aspect-ratio: auto !important;
                  box-shadow: none !important;
                  background: white !important;
                }
              }
            `}</style>
            <motion.div
              id="print-modal-wrapper"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#15151f] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: "92vh" }}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#2e2e3e] shrink-0">
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white">Certificate of Completion</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Issued by Xebia · {completionDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6C1D5F] hover:bg-[#5a184f] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    {isDownloading ? "Preparing..." : "Print Certificate"}
                  </button>
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="flex-1 overflow-auto bg-gray-200 dark:bg-gray-900 flex items-center justify-center p-6 sm:p-10">

                {/* Certificate Card */}
                <div
                  id="certificate-print-area"
                  className="w-full max-h-full bg-white relative overflow-hidden shadow-2xl print:shadow-none"
                  style={{ maxWidth: "794px", aspectRatio: "1.414 / 1", fontFamily: "'Georgia','Times New Roman',serif", containerType: "inline-size" }}
                >
                  {/* Gold bars */}
                  <div className="absolute top-0 left-0 right-0 h-[7px]" style={{ background: "linear-gradient(90deg,#6C1D5F,#B48C3C,#01AC9F,#B48C3C,#6C1D5F)" }} />
                  <div className="absolute bottom-0 left-0 right-0 h-[7px]" style={{ background: "linear-gradient(90deg,#6C1D5F,#B48C3C,#01AC9F,#B48C3C,#6C1D5F)" }} />

                  {/* Borders */}
                  <div className="absolute inset-[10px]" style={{ border: `1.5px solid ${BRAND}`, borderRadius: "2px" }} />
                  <div className="absolute inset-[15px]" style={{ border: `0.5px solid ${TEAL}40`, borderRadius: "2px" }} />

                  {/* Corner ornaments */}
                  {[
                    { pos: "top-[18px] left-[18px]", deg: "0deg" },
                    { pos: "top-[18px] right-[18px]", deg: "90deg" },
                    { pos: "bottom-[18px] right-[18px]", deg: "180deg" },
                    { pos: "bottom-[18px] left-[18px]", deg: "270deg" },
                  ].map(({ pos, deg }, i) => (
                    <div key={i} className={`absolute ${pos}`} style={{ transform: `rotate(${deg})`, width: 28, height: 28 }}>
                      <svg viewBox="0 0 28 28" fill="none">
                        <path d="M1 1 L10 1 L10 3 L3 3 L3 10 L1 10 Z" fill={BRAND} />
                        <path d="M1 1 L7 1 L7 2 L2 2 L2 7 L1 7 Z" fill={GOLD} opacity="0.7" />
                      </svg>
                    </div>
                  ))}

                  {/* Dot watermark */}
                  <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `radial-gradient(${BRAND} 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />

                  {/* Content — 3 sections: top / middle / bottom */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-between px-16 pt-10 pb-8 text-center">

                    {/* ── TOP: Logo + Tagline ── */}
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src="/logo-purple.png"
                        alt="Xebia"
                        className="h-[36px] object-contain"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <div className="w-[180px] h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
                      <p className="font-extrabold uppercase" style={{ color: TEAL, fontSize: "1.15cqw", letterSpacing: "0.28em" }}>
                        Enterprise Learning Management System
                      </p>
                      <p className="font-extrabold uppercase mt-1 text-[#1f2937]" style={{ fontSize: "2.1cqw", letterSpacing: "0.35em" }}>
                        Certificate of Completion
                      </p>
                    </div>

                    {/* ── MIDDLE: Name + Course ── */}
                    <div className="flex flex-col items-center gap-3 my-auto py-6">
                      <p className="italic text-gray-500 font-serif" style={{ fontSize: "1.6cqw" }}>
                        This is to proudly certify that
                      </p>
                      <div>
                        <h2 className="font-bold italic leading-none text-[#6C1D5F] font-serif" style={{ fontSize: "6.5cqw" }}>
                          {studentProfile.name}
                        </h2>
                        <div className="mx-auto mt-2" style={{ height: "2px", width: "50%", background: `linear-gradient(to right, transparent, ${GOLD} 25%, ${GOLD} 75%, transparent)` }} />
                      </div>
                      <p className="italic text-gray-500 font-serif" style={{ fontSize: "1.6cqw" }}>
                        has successfully completed
                      </p>
                      <h3 className="font-bold text-gray-800 leading-snug font-sans" style={{ fontSize: "2.8cqw", maxWidth: "85%" }}>
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="font-bold uppercase tracking-widest rounded-sm" style={{ background: `${TEAL}12`, color: TEAL, border: `1px solid ${TEAL}35`, fontSize: "1.2cqw", padding: "0.4em 1.2em" }}>
                          {course.duration}
                        </span>
                        <span className="font-bold uppercase tracking-widest rounded-sm" style={{ background: `${BRAND}08`, color: BRAND, border: `1px solid ${BRAND}25`, fontSize: "1.2cqw", padding: "0.4em 1.2em" }}>
                          Xebia Certified
                        </span>
                      </div>
                    </div>

                    {/* ── BOTTOM: Date + ID + Signature ── */}
                    <div className="w-full flex items-end justify-between pt-3" style={{ borderTop: "1px solid #e2e8f0" }}>
                      <div className="text-left">
                        <p className="font-bold text-gray-700" style={{ fontSize: "1.4cqw" }}>{completionDate}</p>
                        <p className="uppercase text-gray-400 mt-0.5" style={{ fontSize: "0.95cqw", letterSpacing: "0.22em" }}>Date of Issue</p>
                      </div>
                      <p className="text-gray-300 uppercase" style={{ fontSize: "0.95cqw", letterSpacing: "0.15em" }}>ID: {certId}</p>
                      <div className="text-right">
                        <div className="h-px ml-auto mb-1.5" style={{ width: "12cqw", background: "#aaa" }} />
                        <p className="font-bold italic text-gray-700 font-serif" style={{ fontSize: "1.5cqw" }}>Anand Sahay</p>
                        <p className="uppercase text-gray-400 mt-0.5" style={{ fontSize: "0.95cqw", letterSpacing: "0.2em" }}>Global CEO, Xebia</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
