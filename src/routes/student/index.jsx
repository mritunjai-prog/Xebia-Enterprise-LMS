import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  upcomingAssessments,
  notifications,
  chartData,
  enrolledCourses as mockCourses,
} from "@/lib/dummy-data";
import { BookOpen, Calendar, Award, Bell, Play, FileText, BarChart3, Star } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

// Feature components
import { WelcomeBanner } from "@/features/dashboard/WelcomeBanner";
import { StatCard } from "@/features/dashboard/StatCard";
import { ContinueLearning } from "@/features/dashboard/ContinueLearning";
import { LearningActivityChart } from "@/features/charts/LearningActivityChart";
import { SubjectPerformanceChart } from "@/features/charts/SubjectPerformanceChart";

export const Route = createFileRoute("/student/")(
  { component: DashboardHome }
);

function DashboardHome() {
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate backend fetch
    setTimeout(() => {
      setEnrolledCourses(mockCourses);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/student/courses" className="group">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6C1D5F] to-purple-900 p-6 sm:p-8 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 border border-[#6C1D5F]/50">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform group-hover:scale-110" />
            <div className="relative z-10">
              <p className="text-purple-200 text-sm font-bold tracking-wider uppercase mb-1">Jump Back In</p>
              <h3 className="text-white text-2xl font-extrabold">Resume Last Course</h3>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:bg-white/20">
              <Play className="w-5 h-5 fill-white" />
            </div>
          </div>
        </Link>

        <Link to="/student/assessments" className="group">
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#15151f] p-6 sm:p-8 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-[#2e2e3e]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#6C1D5F]/5 dark:bg-purple-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform group-hover:scale-110" />
            <div className="relative z-10">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wider uppercase mb-1">Action Required</p>
              <h3 className="text-gray-900 dark:text-white text-2xl font-extrabold group-hover:text-[#6C1D5F] dark:group-hover:text-purple-400 transition-colors">Take Assessment</h3>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#1a1a24] flex items-center justify-center text-gray-700 dark:text-gray-300 transition-transform group-hover:scale-110 group-hover:bg-[#6C1D5F]/10 group-hover:text-[#6C1D5F] dark:group-hover:bg-purple-500/10 dark:group-hover:text-purple-400 border border-transparent dark:border-[#2e2e3e]">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Row */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            index={0}
            title="Enrolled Courses"
            value={enrolledCourses.length}
            icon={BookOpen}
            trend="+2 this month"
            trendUp={true}
          />
          <StatCard
            index={1}
            title="Pending Assessments"
            value={upcomingAssessments.length}
            icon={Calendar}
            trend="Next: Tomorrow"
            trendUp={false}
          />
          <StatCard
            index={2}
            title="Completed Courses"
            value={enrolledCourses.filter((c) => c.progress === 100).length}
            icon={Award}
            trend="Great job!"
            trendUp={true}
          />
          <StatCard
            index={3}
            title="Unread Notifications"
            value={unreadNotifications}
            icon={Bell}
            trend="Check your inbox"
            trendUp={false}
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-3xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Learning Activity</h2>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hours spent learning</p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <LearningActivityChart data={chartData.courseProgress} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-3xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Subject Performance</h2>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Assessment scores</p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <SubjectPerformanceChart data={chartData.assessmentPerformance} />
          </div>
        </motion.div>
      </div>

      {/* Continue Learning */}
      {!loading && enrolledCourses.length > 0 && (
        <ContinueLearning courses={enrolledCourses} />
      )}
    </div>
  );
}
