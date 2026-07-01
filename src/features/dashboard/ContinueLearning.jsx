import { Link } from "@tanstack/react-router";
import { Clock, PlayCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

/**
 * "Continue Learning" section – shows in-progress courses with resume CTA.
 * @param {{ courses: Array }} props
 */
export function ContinueLearning({ courses }) {
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Continue Learning</h2>
        <Button variant="ghost" className="text-[#6C1D5F] dark:text-purple-400 hover:text-[#5a184f] dark:hover:text-purple-300 font-bold" asChild>
          <Link to="/student/courses">View All</Link>
        </Button>
      </div>

      {inProgress.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm">
          <BookOpen className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">No courses in progress</p>
          <p className="text-sm">Start a new course to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {inProgress.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="group bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-2xl flex flex-col h-full overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
              >
                {/* Thumbnail Area */}
                <div className="relative h-44 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 z-0">
                    <span className="text-4xl font-bold opacity-30 uppercase tracking-wider">{course.title ? course.title.substring(0, 2) : 'CO'}</span>
                  </div>
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                    />
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm bg-blue-500 text-white">
                      In Progress
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col relative">
                  <div className="mb-2">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors leading-tight block mb-1 line-clamp-2">
                      {course.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      By {course.trainer}
                    </span>
                  </div>

                  <div className="mt-auto space-y-4">
                    <div>
                      <div className="flex justify-between text-[13px] font-bold mb-1.5">
                        <span className="text-gray-500 dark:text-gray-400">
                          {course.modulesCompleted}/{course.totalModules} Modules
                        </span>
                        <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-start gap-2 bg-gray-50 dark:bg-[#1a1a24] p-3 rounded-xl border border-gray-100 dark:border-[#2e2e3e]">
                      <PlayCircle className="w-5 h-5 text-[#6C1D5F] dark:text-purple-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                          Resume from
                        </p>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300 line-clamp-1">{course.lastWatched}</p>
                      </div>
                    </div>

                    <Link to={`/student/course/${course.id}`} className="block w-full">
                      <button
                        className="w-full py-2.5 rounded-xl font-bold text-sm transition-all bg-[#6C1D5F] hover:bg-[#5a184f] text-white shadow-[0_2px_10px_-2px_rgba(108,29,95,0.4)] hover:shadow-[0_4px_14px_-2px_rgba(108,29,95,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        Continue Learning
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
