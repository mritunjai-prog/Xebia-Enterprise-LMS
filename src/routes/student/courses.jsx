import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Clock, PlayCircle, CheckCircle, BookOpen, Search, Award, Printer, X
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { enrolledCourses as mockCourses, studentProfile } from "@/lib/dummy-data";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { toast } from "sonner";
// jsPDF and html2canvas loaded dynamically to avoid SSR issues

export const Route = createFileRoute("/student/courses")({
  component: MyCourses,
});

const BRAND = "#6C1D5F";
const TEAL = "#01AC9F";

function CertificateModal({ course, onClose }) {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const completionDate = new Date().toLocaleDateString("en-US", {
    day: "numeric", month: "long", year: "numeric",
  });
  const certId = `XEB-${course.id.toUpperCase()}-2026-${studentProfile.id}`;

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm print:bg-transparent print:p-0">
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Hide everything by default */
          body * {
            visibility: hidden !important;
          }
          
          /* Show only the certificate and its children */
          #certificate-print-area, #certificate-print-area * {
            visibility: visible !important;
          }
          
          /* Position the certificate to fill the entire printed page */
          #certificate-print-area {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            background: white !important;
            transform: none !important;
            max-width: none !important;
            z-index: 9999 !important;
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#2e2e3e] bg-white dark:bg-[#15151f] shrink-0">
          <div>
            <h3 className="font-extrabold text-gray-900 dark:text-white">Certificate of Completion</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Issued by Xebia · {completionDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6C1D5F] hover:bg-[#5a184f] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-all shadow-sm"
            >
              <Printer className="w-4 h-4" />
              {isDownloading ? "Preparing..." : "Print Certificate"}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-200 dark:bg-gray-900 flex items-center justify-center p-6 sm:p-10 print:bg-white print:p-0">
          <div
            id="certificate-print-area"
            ref={certificateRef}
            className="w-full max-h-full bg-white relative overflow-hidden shadow-2xl print:shadow-none"
            style={{ maxWidth: "794px", aspectRatio: "1.414 / 1", fontFamily: "'Georgia','Times New Roman',serif", containerType: "inline-size" }}
          >
            {/* Gold accent bars */}
            <div className="absolute top-0 left-0 right-0 h-[7px]" style={{ background: "linear-gradient(90deg,#6C1D5F,#B48C3C,#01AC9F,#B48C3C,#6C1D5F)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-[7px]" style={{ background: "linear-gradient(90deg,#6C1D5F,#B48C3C,#01AC9F,#B48C3C,#6C1D5F)" }} />

            {/* Borders */}
            <div className="absolute inset-[10px]" style={{ border: `1.5px solid ${BRAND}`, borderRadius: "2px" }} />
            <div className="absolute inset-[15px]" style={{ border: `0.5px solid ${TEAL}40`, borderRadius: "2px" }} />

            {/* Corner ornaments */}
            {[{cls:"top-[18px] left-[18px]",rot:"0"},{cls:"top-[18px] right-[18px]",rot:"90"},{cls:"bottom-[18px] right-[18px]",rot:"180"},{cls:"bottom-[18px] left-[18px]",rot:"270"}].map(({cls,rot},i) => (
              <div key={i} className={`absolute ${cls}`} style={{ transform:`rotate(${rot}deg)`, width:28, height:28 }}>
                <svg viewBox="0 0 28 28" fill="none"><path d="M1 1 L10 1 L10 3 L3 3 L3 10 L1 10 Z" fill={BRAND} /><path d="M1 1 L7 1 L7 2 L2 2 L2 7 L1 7 Z" fill="#B48C3C" opacity="0.7" /></svg>
              </div>
            ))}

            {/* Dot watermark */}
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage:`radial-gradient(${BRAND} 1px,transparent 1px)`, backgroundSize:"20px 20px" }} />

            <div className="absolute inset-0 z-10 flex flex-col justify-between px-16 pt-10 pb-8 text-center">

              {/* ── TOP: Logo + Tagline ── */}
              <div className="flex flex-col items-center gap-2">
                <img src="/logo-purple.png" alt="Xebia" className="h-[36px] object-contain" onError={(e)=>{e.currentTarget.style.display="none";}} />
                <div className="w-[180px] h-px" style={{ background:"linear-gradient(to right,transparent,#B48C3C,transparent)" }} />
                <p className="font-extrabold uppercase" style={{ color:TEAL, fontSize:"1.15cqw", letterSpacing:"0.28em" }}>Enterprise Learning Management System</p>
                <p className="font-extrabold uppercase mt-1 text-[#1f2937]" style={{ fontSize:"2.1cqw", letterSpacing:"0.35em" }}>Certificate of Completion</p>
              </div>

              {/* ── MIDDLE: Name + Course ── */}
              <div className="flex flex-col items-center gap-3 my-auto py-6">
                <p className="italic text-gray-500 font-serif" style={{ fontSize:"1.6cqw" }}>This is to proudly certify that</p>
                <div>
                  <h2 className="font-bold italic leading-none text-[#6C1D5F] font-serif" style={{ fontSize:"6.5cqw" }}>{studentProfile.name}</h2>
                  <div className="mx-auto mt-2" style={{ height:"2px", width:"55%", background:"linear-gradient(to right,transparent,#B48C3C 25%,#B48C3C 75%,transparent)" }} />
                </div>
                <p className="italic text-gray-500 font-serif" style={{ fontSize:"1.6cqw" }}>has successfully completed</p>
                <h3 className="font-bold text-gray-800 leading-snug font-sans" style={{ fontSize:"2.8cqw", maxWidth:"85%" }}>{course.title}</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="font-bold uppercase tracking-widest rounded-sm" style={{ background:`${TEAL}12`, color:TEAL, border:`1px solid ${TEAL}35`, fontSize:"1.2cqw", padding:"0.4em 1.2em" }}>{course.duration}</span>
                  <span className="font-bold uppercase tracking-widest rounded-sm" style={{ background:`${BRAND}08`, color:BRAND, border:`1px solid ${BRAND}25`, fontSize:"1.2cqw", padding:"0.4em 1.2em" }}>Xebia Certified</span>
                </div>
              </div>

              {/* ── BOTTOM: Date + ID + Signature ── */}
              <div className="w-full flex items-end justify-between pt-3" style={{ borderTop:"1px solid #e2e8f0" }}>
                <div className="text-left">
                  <p className="font-bold text-gray-700" style={{ fontSize:"1.4cqw" }}>{completionDate}</p>
                  <p className="uppercase text-gray-400 mt-0.5" style={{ fontSize:"0.95cqw", letterSpacing:"0.22em" }}>Date of Issue</p>
                </div>
                <p className="text-gray-300 uppercase" style={{ fontSize:"0.95cqw", letterSpacing:"0.15em" }}>ID: {certId}</p>
                <div className="text-right">
                  <div className="h-px ml-auto mb-1.5" style={{ width:"12cqw", background:"#aaa" }} />
                  <p className="font-bold italic text-gray-700 font-serif" style={{ fontSize:"1.5cqw" }}>Anand Sahay</p>
                  <p className="uppercase text-gray-400 mt-0.5" style={{ fontSize:"0.95cqw", letterSpacing:"0.2em" }}>Global CEO, Xebia</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [certCourse, setCertCourse] = useState(null); // course to show certificate for

  useEffect(() => {
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-[#6C1D5F]/20 border-t-[#6C1D5F] animate-spin" />
        <p className="text-sm font-medium text-gray-400 dark:text-gray-500">Loading your courses…</p>
      </div>
    );
  }

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );
  const inProgress = filteredCourses.filter((c) => c.progress > 0 && c.progress < 100);
  const completed = filteredCourses.filter((c) => c.progress === 100);
  const notStarted = filteredCourses.filter((c) => c.progress === 0);

  const statusBadge = (course) => {
    if (course.progress === 100) return { label: "Completed", className: "bg-emerald-500 text-white" };
    if (course.progress > 0) return { label: "In Progress", className: "bg-blue-500 text-white" };
    return { label: "Not Started", className: "bg-gray-500 dark:bg-gray-600 text-white" };
  };

  const CourseCard = ({ course, idx }) => {
    const badge = statusBadge(course);
    return (
      <motion.div
        key={course.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, delay: idx * 0.04 }}
        className="group bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-2xl flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
      >
        {/* Thumbnail */}
        <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600 z-0">
            <span className="text-5xl font-black opacity-20 uppercase">{course.title.substring(0, 2)}</span>
          </div>
          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
          {/* Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className={clsx("text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5", badge.className)}>
              {course.progress === 100 && <CheckCircle className="w-3.5 h-3.5" />}
              {badge.label}
            </span>
          </div>
          {/* Duration chip */}
          <div className="absolute bottom-3 right-3 z-20">
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-black/60 text-white flex items-center gap-1">
              <Clock className="w-3 h-3" /> {course.duration}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors leading-tight mb-1 line-clamp-2">
            {course.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
            By {course.trainer}
          </p>

          {/* Progress */}
          <div className="mt-auto space-y-4">
            <div>
              <div className="flex justify-between text-[13px] font-bold mb-1.5">
                <span className="text-gray-500 dark:text-gray-400">{course.modulesCompleted}/{course.totalModules} Modules</span>
                <span className={clsx("font-extrabold", course.progress === 100 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white")}>{course.progress}%</span>
              </div>
              <Progress
                value={course.progress}
                className={clsx("h-2", course.progress === 100 ? "[&>div]:bg-emerald-500" : "[&>div]:bg-[#6C1D5F]")}
              />
            </div>

            {/* Last watched chip — in-progress only */}
            {course.progress > 0 && course.progress < 100 && (
              <div className="flex items-start gap-2 bg-gray-50 dark:bg-[#1a1a24] p-3 rounded-xl border border-gray-100 dark:border-[#2e2e3e]">
                <PlayCircle className="w-4 h-4 text-[#6C1D5F] dark:text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Resume from</p>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-300 line-clamp-1">{course.lastWatched}</p>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {course.progress === 100 ? (
              <button
                onClick={() => setCertCourse(course)}
                className="w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-[#01AC9F] text-white shadow-[0_2px_10px_-2px_rgba(1,172,159,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(1,172,159,0.5)] hover:-translate-y-0.5"
              >
                <Award className="w-4 h-4" /> View Certificate
              </button>
            ) : (
              <Link to={`/student/course/${course.id}`} className="block w-full">
                <button className="w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 bg-[#6C1D5F] hover:bg-[#5a184f] text-white shadow-[0_2px_10px_-2px_rgba(108,29,95,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(108,29,95,0.5)] hover:-translate-y-0.5">
                  {course.progress === 0 ? "Start Course" : "Continue Learning"}
                </button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const CourseGrid = ({ items }) => {
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm">
          <BookOpen className="w-12 h-12 mb-4 text-gray-200 dark:text-gray-700" />
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">No courses found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search filters.</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {items.map((course, idx) => <CourseCard key={course.id} course={course} idx={idx} />)}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#6C1D5F]/10 dark:bg-purple-500/10 rounded-xl flex items-center justify-center text-[#6C1D5F] dark:text-purple-400 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Courses</h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
              {courses.length} courses enrolled · {completed.length} completed
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search my courses…"
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 h-auto p-1.5 bg-gray-100 dark:bg-[#15151f] border border-transparent dark:border-[#2e2e3e] w-full sm:w-auto justify-start overflow-x-auto rounded-xl">
          {[
            { value: "all", label: `All (${filteredCourses.length})` },
            { value: "in-progress", label: `In Progress (${inProgress.length})` },
            { value: "not-started", label: `Not Started (${notStarted.length})` },
            { value: "completed", label: `Completed (${completed.length})` },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-5 py-2 rounded-lg font-bold text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-[#252535] data-[state=active]:text-[#6C1D5F] dark:data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0 outline-none"><CourseGrid items={filteredCourses} /></TabsContent>
        <TabsContent value="in-progress" className="mt-0 outline-none"><CourseGrid items={inProgress} /></TabsContent>
        <TabsContent value="not-started" className="mt-0 outline-none"><CourseGrid items={notStarted} /></TabsContent>
        <TabsContent value="completed" className="mt-0 outline-none"><CourseGrid items={completed} /></TabsContent>
      </Tabs>

      {/* Certificate Modal */}
      <AnimatePresence>
        {certCourse && <CertificateModal course={certCourse} onClose={() => setCertCourse(null)} />}
      </AnimatePresence>
    </div>
  );
}
