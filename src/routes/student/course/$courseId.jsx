import { createFileRoute, Link } from "@tanstack/react-router";
import { commentsData, studentProfile } from "@/features/student/mocks/dummy-data";
import { useQuery } from "@tanstack/react-query";
import { CourseService, EnrollmentService, ProgressService } from "@/services/api";
import {
  ArrowLeft, ArrowRight, BookOpen, Clock, ChevronDown, CheckCircle2,
  FileText, PlayCircle, Image as ImageIcon, Code, Link as LinkIcon, File, Play, X
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

export const Route = createFileRoute("/student/course/$courseId")({
  component: CourseViewer,
});

function ContentRenderer({ block }) {
  const type = block.type || "NOTE";
  let parsedData = {};
  
  try {
    if (block.storageRef) {
      parsedData = JSON.parse(block.storageRef);
    } else if (block.contentData) {
      parsedData = { text: block.contentData, uiType: type };
    }
  } catch (e) {
    parsedData = { text: block.storageRef, uiType: type };
  }

  const uiType = parsedData.uiType || type;
  
  let dataToRender = "";
  if (uiType === 'Video' || uiType === 'VIDEO_REFERENCE' || uiType === 'VIDEO') {
    dataToRender = parsedData.videoUrl || block.contentData || "";
  } else if (uiType === 'PDF' || uiType === 'DOCUMENT' || uiType === 'PPT') {
    dataToRender = parsedData.pdfUrl || block.contentData || "";
  } else if (uiType === 'Image' || uiType === 'IMAGE') {
    dataToRender = parsedData.imageUrl || block.contentData || "";
  } else if (uiType === 'Code' || uiType === 'CODE') {
    dataToRender = parsedData.code || block.contentData || "";
  } else {
    dataToRender = parsedData.text || block.contentData || "";
  }

  switch (uiType) {
    case "Video":
    case "VIDEO_REFERENCE":
    case "VIDEO":
      return (
        <div className="w-full bg-black rounded-2xl overflow-hidden aspect-video shadow-xl border border-border flex items-center justify-center">
          {dataToRender ? (
            <iframe
              src={dataToRender}
              className="w-full h-full"
              allowFullScreen
              title="Video Content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <Play className="w-16 h-16 opacity-50 mb-2" />
              <p>Video Not Available</p>
            </div>
          )}
        </div>
      );
    case "PDF":
    case "DOCUMENT":
    case "PPT":
      return (
        <div className="w-full aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden shadow-lg border border-border bg-gray-50 dark:bg-card">
          {dataToRender ? (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(dataToRender)}&embedded=true`}
              className="w-full h-full"
              title="Document Viewer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <File className="w-12 h-12 mb-2 opacity-50" />
              <p>Document Not Available</p>
            </div>
          )}
        </div>
      );
    case "Code":
    case "CODE":
      return (
        <div className="rounded-2xl overflow-hidden shadow-md border border-border bg-[#1e1e1e] p-6 text-sm text-gray-300 overflow-x-auto">
          <pre><code>{dataToRender}</code></pre>
        </div>
      );
    case "Image":
    case "IMAGE":
      return (
        <div className="rounded-2xl overflow-hidden shadow-lg border border-border flex justify-center bg-gray-100 dark:bg-card p-4">
          {dataToRender ? (
            <img src={dataToRender} alt="Lesson Content" className="max-w-full h-auto rounded-lg" />
          ) : (
            <ImageIcon className="w-12 h-12 text-gray-300" />
          )}
        </div>
      );
    case "LINK":
      return (
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center">
          <LinkIcon className="w-12 h-12 text-primary mb-3" />
          <h3 className="text-lg font-bold text-foreground mb-2">External Resource</h3>
          <a href={dataToRender} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow hover:bg-primary-glow transition-all">
            Open Link <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      );
    case "Heading": {
      const HeadingTag = `h${parsedData.headingLevel || 1}`;
      return (
        <HeadingTag className="font-extrabold text-foreground my-4">
          {dataToRender}
        </HeadingTag>
      );
    }
    case "Callout":
      return (
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100">
          <div dangerouslySetInnerHTML={{ __html: dataToRender }} />
        </div>
      );
    case "Table":
    case "Text":
    case "NOTE":
    case "TEXT":
    default:
      return (
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-extrabold prose-a:text-primary hover:prose-a:text-primary-glow">
          <div dangerouslySetInnerHTML={{ __html: dataToRender }} />
        </div>
      );
  }
}

function CourseViewer() {
  const { courseId } = Route.useParams();
  const { data: courseHierarchy, isLoading: loading, isError } = useQuery({
    queryKey: ['student-course-hierarchy', courseId],
    queryFn: () => CourseService.getCourseHierarchy(courseId)
  });

  const { data: enrollmentStatus, isLoading: loadingEnrollment } = useQuery({
    queryKey: ['student-enrollment-status', courseId],
    queryFn: () => EnrollmentService.getStatus(courseId)
  });

  const { data: progressData, isLoading: loadingProgress, refetch: refetchProgress } = useQuery({
    queryKey: ['student-progress', courseId],
    queryFn: () => ProgressService.getCourseProgress(courseId),
    enabled: !!enrollmentStatus?.isEnrolled
  });

  const isEnrolled = enrollmentStatus?.isEnrolled || false;

  const course = courseHierarchy || {};
  const modules = useMemo(() => courseHierarchy?.modules || [], [courseHierarchy]);

  const handleEnroll = async () => {
    try {
      await EnrollmentService.enroll(courseId);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  // Flatten submodules for navigation
  const flatSubmodules = useMemo(() => {
    return modules.reduce((acc, mod) => acc.concat(mod.submodules || []), []);
  }, [modules]);

  const [activeSubmoduleId, setActiveSubmoduleId] = useState(null);

  const [expandedModules, setExpandedModules] = useState([]);

  // Auto-select first lesson and expand its module
  useEffect(() => {
    if (flatSubmodules.length > 0 && modules.length > 0 && !loadingProgress && isEnrolled) {
      if (!activeSubmoduleId) {
        if (progressData?.lastAccessedSubmoduleId) {
          setActiveSubmoduleId(progressData.lastAccessedSubmoduleId);
        } else {
          setActiveSubmoduleId(flatSubmodules[0].id);
        }
      }
      
      const currentActive = progressData?.lastAccessedSubmoduleId || flatSubmodules[0].id;
      // Expand the module containing the active submodule
      const mod = modules.find(m => (m.submodules || []).some(s => s.id === currentActive));
      if (mod) {
        setExpandedModules(prev => {
          if (!prev.includes(mod.id)) {
            return [...prev, mod.id];
          }
          return prev;
        });
      }
    }
  }, [flatSubmodules, modules, progressData, loadingProgress, isEnrolled]);

  // Persist access to backend when active changes
  useEffect(() => {
    if (activeSubmoduleId && activeSubmoduleId !== progressData?.lastAccessedSubmoduleId && isEnrolled) {
      const activeIndex = flatSubmodules.findIndex(s => s.id === activeSubmoduleId);
      const activeSubmodule = activeIndex !== -1 ? flatSubmodules[activeIndex] : null;
      if (activeSubmodule && activeSubmodule.contentBlocks?.length > 0) {
        ProgressService.updateAccess(courseId, activeSubmoduleId, activeSubmodule.contentBlocks[0].id);
      }
    }
  }, [activeSubmoduleId, courseId, isEnrolled, flatSubmodules, progressData]);

  const activeIndex = flatSubmodules.findIndex(s => s.id === activeSubmoduleId);
  const activeSubmodule = activeIndex !== -1 ? flatSubmodules[activeIndex] : null;

  const handleNext = () => {
    if (activeIndex < flatSubmodules.length - 1) {
      setActiveSubmoduleId(flatSubmodules[activeIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveSubmoduleId(flatSubmodules[activeIndex - 1].id);
    }
  };

  const toggleModule = (id) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleMarkComplete = async () => {
    if (!activeSubmoduleId) return;
    try {
      await ProgressService.markComplete(courseId, activeSubmoduleId);
      await refetchProgress();
      handleNext();
    } catch (e) {
      console.error(e);
    }
  };

  // Local Progress Indicator
  const totalLessons = progressData?.totalLessons || flatSubmodules.length;
  const completedLessons = progressData?.completedLessons || 0;
  const progressPercent = progressData?.progressPercentage || 0;
  const completedSubmoduleIds = progressData?.completedSubmoduleIds || [];

  if (loading || loadingEnrollment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground font-medium">Loading course workspace...</p>
      </div>
    );
  }

  if (isError || !course.title) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-2">
          <X className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Course Unavailable</h2>
        <p className="text-muted-foreground text-sm">We couldn't load the course content. It may have been moved or you might be offline.</p>
        <Link to="/student/courses" className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-glow transition-colors">
          Return to My Courses
        </Link>
      </div>
    );
  }

  // Pre-enrollment Preview State
  if (!isEnrolled) {
    return (
      <div className="max-w-[1200px] mx-auto pb-12 h-full flex flex-col animate-in fade-in duration-500">
        <div className="mb-6">
          <Link
            to="/student/courses"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                <BookOpen className="w-4 h-4" /> Course Preview
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {course.description || "Join this course to unlock premium learning materials and enhance your skills."}
              </p>
              
              <div className="flex flex-wrap gap-4 py-4 border-y border-border">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <Clock className="w-4 h-4 text-muted-foreground" /> {course.duration || "Self Paced"}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <BookOpen className="w-4 h-4 text-muted-foreground" /> {totalLessons} Lessons
                </div>
              </div>
              
              <button 
                onClick={handleEnroll}
                className="w-full sm:w-auto px-10 py-4 bg-primary text-white text-lg font-bold rounded-xl shadow-lg hover:bg-primary-glow hover:-translate-y-1 transition-all"
              >
                Enroll Now
              </button>
            </div>
            
            <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative bg-muted">
              {course.image ? (
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-20 h-20 text-gray-300" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto pb-12 h-full flex flex-col animate-in fade-in duration-500">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/student/courses"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" /> Course
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight line-clamp-1">{course.title}</h1>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 bg-card px-5 py-2.5 rounded-2xl border border-border shadow-sm">
          <div className="text-right">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Your Progress</p>
            <p className="text-sm font-extrabold text-foreground leading-none">{progressPercent}%</p>
          </div>
          <div className="w-32">
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </div>

      {/* ── Main Workspace ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Content Area (Left/Main) ── */}
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
            {activeSubmodule ? (
              <>
                <div className="p-6 sm:p-10 flex-1 space-y-8 bg-white dark:bg-[#121212]">
                  <div className="space-y-2 mb-8">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                      Lesson {activeIndex + 1} of {totalLessons}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-foreground">{activeSubmodule.title}</h2>
                  </div>
                  
                  {/* Render Content Blocks */}
                  {(activeSubmodule.contentBlocks || []).length > 0 ? (
                    <div className="space-y-10">
                      {[...activeSubmodule.contentBlocks].sort((a, b) => a.sequenceOrder - b.sequenceOrder).map((block) => (
                        <ContentRenderer key={block.id} block={block} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Empty Lesson</h3>
                      <p className="text-muted-foreground mt-1">No content has been added to this lesson yet.</p>
                    </div>
                  )}
                </div>

                {/* Navigation Bar */}
                <div className="p-4 bg-gray-50 dark:bg-card border-t border-border flex items-center justify-between shrink-0">
                  <button
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#1a1a1a] border border-border text-foreground text-sm font-bold rounded-xl transition-all shadow-sm hover:-translate-x-1 disabled:opacity-50 disabled:hover:translate-x-0"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-muted-foreground hidden sm:block mb-2">
                      {activeIndex + 1} / {totalLessons}
                    </span>
                    {!completedSubmoduleIds.includes(activeSubmoduleId) ? (
                      <button 
                        onClick={handleMarkComplete}
                        className="px-4 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-lg text-sm font-bold hover:bg-green-500 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Mark Complete
                      </button>
                    ) : (
                      <span className="px-4 py-1.5 text-green-600 dark:text-green-400 text-sm font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Completed
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={activeIndex === totalLessons - 1}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-glow text-white text-sm font-bold rounded-xl transition-all shadow hover:translate-x-1 disabled:opacity-50 disabled:hover:translate-x-0"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-12 text-center">
                <div>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">No Lessons Available</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">This course doesn't have any published curriculum yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Curriculum Sidebar (Right) ── */}
        <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0">
          <div className="bg-card border border-border rounded-3xl shadow-lg lg:sticky lg:top-6 overflow-hidden flex flex-col" style={{ maxHeight: "calc(100vh - 48px)" }}>
            <div className="p-6 border-b border-border bg-gray-50/50 dark:bg-black/20 shrink-0">
              <h3 className="text-lg font-extrabold text-foreground">Curriculum</h3>
              <p className="text-xs font-medium text-muted-foreground mt-1">{modules.length} Modules • {totalLessons} Lessons</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {modules.length > 0 ? modules.map((mod, mIdx) => {
                const isExpanded = expandedModules.includes(mod.id);
                const modSubmodules = mod.submodules || [];
                const isActiveModule = modSubmodules.some(s => s.id === activeSubmoduleId);
                
                return (
                  <div key={mod.id} className={clsx("rounded-2xl overflow-hidden transition-all duration-300", 
                    isActiveModule ? "border-primary/30 shadow-md ring-1 ring-primary/20" : "border border-border"
                  )}>
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className={clsx("w-full flex items-center gap-3 p-4 transition-colors text-left",
                        isActiveModule ? "bg-primary/5 dark:bg-primary/10" : "bg-card hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                      )}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <p className={clsx("font-extrabold text-sm leading-tight line-clamp-2", isActiveModule ? "text-primary" : "text-foreground")}>
                          <span className="opacity-50 font-normal mr-2">{(mIdx + 1).toString().padStart(2, '0')}</span>
                          {mod.title}
                        </p>
                        <p className="text-[11px] font-bold text-muted-foreground mt-1.5 uppercase tracking-wider">
                          {modSubmodules.length} Lessons
                        </p>
                      </div>
                      <ChevronDown className={clsx("w-4 h-4 shrink-0 transition-transform duration-300", isActiveModule ? "text-primary" : "text-gray-400", isExpanded && "rotate-180")} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden bg-card"
                        >
                          <div className="px-3 py-2 space-y-1 border-t border-border/50">
                            {modSubmodules.map((sub) => {
                              const isActive = sub.id === activeSubmoduleId;
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => setActiveSubmoduleId(sub.id)}
                                  className={clsx(
                                    "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all group",
                                    isActive 
                                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-[0.98]"
                                      : "hover:bg-muted text-foreground"
                                  )}
                                >
                                  <div className="shrink-0 flex items-center justify-center">
                                    {completedSubmoduleIds.includes(sub.id) ? (
                                      <CheckCircle2 className={clsx("w-5 h-5", isActive ? "text-white" : "text-green-500")} />
                                    ) : isActive ? (
                                      <PlayCircle className="w-4 h-4 text-white animate-pulse" />
                                    ) : (
                                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:scale-150 transition-transform" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={clsx("text-sm line-clamp-2", isActive ? "font-bold" : "font-medium")}>
                                      {sub.title}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">Curriculum not available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
