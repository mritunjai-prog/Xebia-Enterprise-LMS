import { createFileRoute } from "@tanstack/react-router";
import { assessmentResults, chartData, enrolledCourses } from "@/features/student/mocks/dummy-data";
import { Award, Trophy, ArrowRight, BookOpen, Star, Calendar, Percent, ClipboardCheck } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

// Feature chart components (shared, theme-aware)
import { LearningActivityChart } from "@/features/student/components/charts/LearningActivityChart";
import { SubjectPerformanceChart } from "@/features/student/components/charts/SubjectPerformanceChart";
import { CourseProgressChart } from "@/features/student/components/charts/CourseProgressChart";

export const Route = createFileRoute("/student/results")({
  component: ResultsPage,
});

function ResultsPage() {
  const getGradeStyle = (grade) => {
    switch(grade) {
      case 'A+':
      case 'A': return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20";
      case 'B+':
      case 'B': return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20";
      case 'C': return "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border-orange-200 dark:border-orange-500/20";
      default: return "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary dark:text-primary-foreground shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Results & Performance</h1>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">
              Track your learning progress and assessment scores
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Course Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Course Progress</h2>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Enrollment Status</p>
            </div>
          </div>
          <div className="flex-1 min-h-[250px]">
            <CourseProgressChart data={enrolledCourses} />
          </div>
        </motion.div>

        {/* Subject Performance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Subject Performance</h2>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Average Scores</p>
            </div>
          </div>
          <div className="flex-1 min-h-[250px]">
            <SubjectPerformanceChart data={chartData.assessmentPerformance} />
          </div>
        </motion.div>

        {/* Learning Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col xl:col-span-1 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Learning Activity</h2>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Time Spent Learning</p>
            </div>
          </div>
          <div className="flex-1 min-h-[250px]">
            <LearningActivityChart data={chartData.courseProgress} />
          </div>
        </motion.div>
      </div>

      {/* Recent Results Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Recent Results</h2>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Assessment</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Course</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">Score</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2e2e3e]">
                {assessmentResults.map((result, idx) => (
                  <motion.tr 
                    key={result.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    className="group hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <ClipboardCheck className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-foreground text-sm">{result.assessmentName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-muted-foreground">{result.course}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-sm font-medium">{result.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-extrabold text-foreground">
                          {result.marks} <span className="text-gray-400 font-medium">/ {result.maxMarks}</span>
                        </span>
                        <span className="text-xs font-bold text-gray-400 mt-0.5">{result.percentage}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={clsx("inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-black tracking-wide border", getGradeStyle(result.grade))}>
                        {result.grade}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
