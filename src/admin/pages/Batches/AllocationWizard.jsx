import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BookOpen, GraduationCap, CheckCircle, ArrowRight, ArrowLeft,
  Search, Sparkles, User,
} from "lucide-react";
import { AllocationService, UserService, BatchService, CourseService } from "@/services/api";
import { useRouter } from "@tanstack/react-router";
import { clsx } from "clsx";

const STEPS = [
  { id: 1, title: "Select Batch", icon: BookOpen, description: "Choose a batch" },
  { id: 2, title: "Select Trainer", icon: Users, description: "Assign a trainer" },
  { id: 3, title: "Select Course", icon: GraduationCap, description: "Choose course(s)" },
  { id: 4, title: "Review & Assign", icon: CheckCircle, description: "Confirm allocation" },
];

export default function AllocationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Data
  const [batches, setBatches] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [courses, setCourses] = useState([]);

  // Selections
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [academicSession, setAcademicSession] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [batchData, trainerData, courseData] = await Promise.all([
        BatchService.getBatches().catch(() => []),
        UserService.getUsers("teacher").catch(() => []),
        CourseService.getCourses().catch(() => []),
      ]);

      setBatches(Array.isArray(batchData) ? batchData : []);
      setTrainers(Array.isArray(trainerData) ? trainerData : []);
      setCourses(Array.isArray(courseData) ? courseData : []);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBatches = batches.filter((b) => {
    if (search) return (b.name || "").toLowerCase().includes(search.toLowerCase());
    return true;
  });

  const filteredTrainers = trainers.filter((t) => {
    if (search) return (t.name || "").toLowerCase().includes(search.toLowerCase()) || (t.email || "").toLowerCase().includes(search.toLowerCase());
    return true;
  });

  const filteredCourses = courses.filter((c) => {
    if (search) return (c.title || "").toLowerCase().includes(search.toLowerCase());
    return true;
  });

  // Find trainer from batch createdBy
  const batchCreatorTrainer = selectedBatch?.createdBy
    ? trainers.find((t) => t.id === selectedBatch.createdBy) || null
    : null;

  const toggleCourseSelection = (course) => {
    setSelectedCourses((prev) => {
      const exists = prev.find((c) => c.id === course.id);
      if (exists) return prev.filter((c) => c.id !== course.id);
      return [...prev, course];
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!selectedBatch;
      case 2: return !!selectedTrainer;
      case 3: return selectedCourses.length > 0;
      case 4: return !!academicSession;
      default: return false;
    }
  };

  const handleAssign = async () => {
    setSubmitting(true);
    try {
      const allocations = selectedCourses.map((course) => ({
        trainerId: selectedTrainer.id,
        batchId: selectedBatch.id,
        courseId: course.id,
        academicSession,
        startDate,
        endDate,
        status: "active",
        notes,
        assignedAt: new Date().toISOString(),
      }));

      await AllocationService.createBulkAllocations(allocations);
      router.navigate({ to: "/admin/batches/allocations" });
    } catch (err) {
      console.error("Failed to create allocations:", err);
      alert("Failed to create allocations. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] p-6 h-[400px] animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-6"></div>
          <div className="h-full bg-gray-100 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Course Allocation Wizard
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Assign courses to trainers and batches in a few simple steps.
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-6">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                className={clsx(
                  "flex items-center gap-3 transition-all",
                  step.id <= currentStep ? "opacity-100" : "opacity-40",
                  step.id === currentStep && "scale-105"
                )}
              >
                <div className={clsx(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all",
                  step.id < currentStep ? "bg-[#01AC9F] text-white" :
                  step.id === currentStep ? "bg-[#6C1D5F] text-white shadow-lg" :
                  "bg-gray-100 dark:bg-[#1a1a24] text-gray-400"
                )}>
                  {step.id < currentStep ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <div className="hidden sm:block text-left">
                  <p className={clsx("text-xs font-bold", step.id === currentStep ? "text-[#6C1D5F]" : "text-gray-500")}>
                    Step {step.id}
                  </p>
                  <p className={clsx("text-sm font-bold", step.id === currentStep ? "text-gray-900 dark:text-white" : "text-gray-400")}>
                    {step.title}
                  </p>
                </div>
              </button>
              {idx < STEPS.length - 1 && (
                <div className={clsx("flex-1 h-0.5 mx-2 rounded", step.id < currentStep ? "bg-[#01AC9F]" : "bg-gray-200 dark:bg-[#2e2e3e]")} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-100 dark:border-[#2e2e3e] shadow-sm p-6"
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${STEPS[currentStep - 1].title.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
            />
          </div>

          {/* Step 1: Select Batch */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select a batch created by a trainer in the trainer portal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBatches.length > 0 ? filteredBatches.map((batch) => (
                  <button
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className={clsx(
                      "p-5 rounded-xl border-2 text-left transition-all hover:shadow-md",
                      selectedBatch?.id === batch.id
                        ? "border-[#6C1D5F] bg-[#6C1D5F]/5 shadow-[0_0_20px_rgba(108,29,95,0.15)]"
                        : "border-gray-200 dark:border-[#2e2e3e] hover:border-[#6C1D5F]/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-1">{batch.icon || "📚"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{batch.name}</p>
                        <p className="text-xs text-gray-500 truncate">{batch.course || "No course focus"}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {batch.createdByName && (
                            <span className="inline-flex items-center gap-1 text-xs text-[#6C1D5F] bg-[#6C1D5F]/10 px-2 py-0.5 rounded-full">
                              <User className="w-3 h-3" />
                              {batch.createdByName}
                            </span>
                          )}
                          <span className="text-xs text-gray-400">{batch.studentCount || 0} students</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )) : (
                  <div className="col-span-full text-center py-12 text-gray-400">
                    <BookOpen className="w-8 h-8 mx-auto mb-3" />
                    <p>No batches found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Select Trainer */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {batchCreatorTrainer ? (
                <div className="bg-[#01AC9F]/5 border border-[#01AC9F]/20 rounded-xl p-4">
                  <p className="text-sm font-bold text-[#01AC9F] mb-1">Batch Creator</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    This batch was created by <span className="font-bold text-gray-900 dark:text-white">{batchCreatorTrainer.name}</span>.
                    You can confirm this selection or choose a different trainer below.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Select a trainer to assign to this batch.
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Auto-detected batch creator first */}
                {batchCreatorTrainer && (
                  <button
                    key={batchCreatorTrainer.id}
                    onClick={() => setSelectedTrainer(batchCreatorTrainer)}
                    className={clsx(
                      "p-5 rounded-xl border-2 text-left transition-all hover:shadow-md",
                      selectedTrainer?.id === batchCreatorTrainer.id
                        ? "border-[#01AC9F] bg-[#01AC9F]/5 shadow-[0_0_20px_rgba(1,172,159,0.15)]"
                        : "border-[#01AC9F]/30 hover:border-[#01AC9F]/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#01AC9F]/20 flex items-center justify-center text-[#01AC9F] font-bold text-sm">
                        {batchCreatorTrainer.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{batchCreatorTrainer.name}</p>
                        <p className="text-xs text-gray-500">{batchCreatorTrainer.email}</p>
                        <p className="text-xs text-[#01AC9F] font-bold mt-0.5">Batch Creator</p>
                      </div>
                    </div>
                  </button>
                )}
                {/* Other trainers */}
                {filteredTrainers.filter((t) => !batchCreatorTrainer || t.id !== batchCreatorTrainer.id).map((trainer) => (
                  <button
                    key={trainer.id}
                    onClick={() => setSelectedTrainer(trainer)}
                    className={clsx(
                      "p-5 rounded-xl border-2 text-left transition-all hover:shadow-md",
                      selectedTrainer?.id === trainer.id
                        ? "border-[#6C1D5F] bg-[#6C1D5F]/5 shadow-[0_0_20px_rgba(108,29,95,0.15)]"
                        : "border-gray-200 dark:border-[#2e2e3e] hover:border-[#6C1D5F]/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F] font-bold text-sm">
                        {trainer.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{trainer.name}</p>
                        <p className="text-xs text-gray-500">{trainer.email}</p>
                        <p className="text-xs text-gray-400">{trainer.department || "No department"}</p>
                      </div>
                    </div>
                  </button>
                ))}
                {filteredTrainers.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-400">
                    <Users className="w-8 h-8 mx-auto mb-3" />
                    <p>No trainers found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Select Course */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.length > 0 ? filteredCourses.map((course) => {
                const isSelected = selectedCourses.find((c) => c.id === course.id);
                return (
                  <button
                    key={course.id}
                    onClick={() => toggleCourseSelection(course)}
                    className={clsx(
                      "p-5 rounded-xl border-2 text-left transition-all hover:shadow-md",
                      isSelected
                        ? "border-[#01AC9F] bg-[#01AC9F]/5 shadow-[0_0_20px_rgba(1,172,159,0.15)]"
                        : "border-gray-200 dark:border-[#2e2e3e] hover:border-[#01AC9F]/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={clsx("w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5", isSelected ? "border-[#01AC9F] bg-[#01AC9F] text-white" : "border-gray-300 dark:border-gray-600")}>
                        {isSelected && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{course.title}</p>
                        <p className="text-xs text-gray-500">{course.difficultyLevel || "Beginner"} · {course.language || "English"}</p>
                      </div>
                    </div>
                  </button>
                );
              }) : (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <GraduationCap className="w-8 h-8 mx-auto mb-3" />
                  <p>No courses found</p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Allocation Summary + Schedule side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Allocation Summary */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Allocation Summary</h3>
                  <div className="bg-gray-50 dark:bg-[#1a1a24] rounded-xl p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-20 shrink-0">Batch</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedBatch?.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-20 shrink-0">Trainer</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedTrainer?.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-20 shrink-0">Courses</span>
                        <span className="text-sm font-bold text-[#01AC9F]">{selectedCourses.length} selected</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Schedule */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Schedule</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">Academic Session *</label>
                      <input type="text" value={academicSession} onChange={(e) => setAcademicSession(e.target.value)} placeholder="e.g., 2023-2027" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F]" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F]" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F]" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 mb-1 block">Notes</label>
                      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes..." rows={2} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] resize-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Courses List */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Selected Courses</h3>
                <div className="space-y-2">
                  {selectedCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1a1a24] rounded-xl">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-4 h-4 text-[#01AC9F]" />
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{course.title}</span>
                      </div>
                      <button onClick={() => toggleCourseSelection(course)} className="text-xs text-red-500 hover:underline">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          disabled={currentStep === 1}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-100 dark:bg-[#1a1a24] hover:bg-gray-200 dark:hover:bg-[#252535] text-sm font-bold text-gray-700 dark:text-gray-300 rounded-xl transition-colors disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}
            disabled={!canProceed()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6C1D5F] hover:bg-[#5a184f] text-white text-sm font-bold rounded-xl transition-all shadow-[0_2px_10px_-2px_rgba(108,29,95,0.4)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleAssign}
            disabled={!canProceed() || submitting}
            className="inline-flex items-center gap-2 px-8 py-2.5 bg-[#01AC9F] hover:bg-[#009989] text-white text-sm font-bold rounded-xl transition-all shadow-[0_2px_10px_-2px_rgba(1,172,159,0.4)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Assign {selectedCourses.length} Course{selectedCourses.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
