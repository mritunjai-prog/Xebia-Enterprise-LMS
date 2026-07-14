import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CourseService, EnrollmentService } from "@/services/api";
import { BookOpen, Calendar, Award, Bell, Play, FileText, BarChart3, Star } from "lucide-react";
import { useLMS } from "@/context/LMSContext";

import { clsx } from "clsx";

// Feature components
import { WelcomeBanner } from "@/features/student/components/dashboard/WelcomeBanner";
import { StatCard } from "@/features/student/components/dashboard/StatCard";
import { ContinueLearning } from "@/features/student/components/dashboard/ContinueLearning";
import { LearningActivityChart } from "@/features/student/components/charts/LearningActivityChart";
import { SubjectPerformanceChart } from "@/features/student/components/charts/SubjectPerformanceChart";

export const Route = createFileRoute("/student/")({ component: DashboardHome });

function DashboardHome() {
  const { notifications, assessments, submissions, batches, currentUser } = useLMS();
  
  const unreadNotifications = (notifications || []).filter((n) => !n.read).length;

  const studentBatchIds = Array.from(
    new Set([
      ...(currentUser?.batches || []),
      ...(batches || []).filter((b) => (b.students || []).includes(currentUser?.id)).map((b) => b.id),
    ])
  );

  const assignedAssessments = (assessments || []).filter(
    (a) => a.status === "published" && a.batches?.some((bId) => studentBatchIds.includes(bId)),
  );

  const nowStr = new Date().toISOString().split("T")[0];
  const upcomingAssessments = assignedAssessments.filter((a) => a.startDate > nowStr);

  const studentSubmissions = (submissions || []).filter(
    (s) => s.studentId === currentUser?.id && s.status === "submitted"
  );

  // Real data fetch for enrolled courses
  const { data: coursesData, isLoading: loading } = useQuery({
    queryKey: ["student-enrolled-courses"],
    queryFn: EnrollmentService.getMyCourses,
  });

  const enrolledCourses = coursesData || [];

  const learningData = [
    { name: "Mon", hours: 2 },
    { name: "Tue", hours: 4 },
    { name: "Wed", hours: 3 },
    { name: "Thu", hours: 5 },
    { name: "Fri", hours: 2 },
    { name: "Sat", hours: 6 },
    { name: "Sun", hours: 4 },
  ];
  
  const assessmentData = studentSubmissions.length > 0 
    ? studentSubmissions.slice(0, 5).map(s => {
        const a = assessments.find(as => as.id === s.assessmentId);
        return { subject: a?.title?.substring(0, 10) || "Test", score: s.percentage };
      })
    : [
        { subject: "React", score: 85 },
        { subject: "Architecture", score: 65 },
        { subject: "UI/UX", score: 95 },
      ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/student/courses" className="group">
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#15151f] p-6 sm:p-8 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#6C1D5F]/5 dark:bg-[#D3CCEC]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform group-hover:scale-110" />
            <div className="relative z-10">
              <p className="text-muted-foreground text-sm font-bold tracking-wider uppercase mb-1">
                Jump Back In
              </p>
              <h3 className="text-foreground text-2xl font-extrabold group-hover:text-[#6C1D5F] dark:group-hover:text-[#D3CCEC] transition-colors">
                Resume Last Course
              </h3>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-foreground transition-transform group-hover:scale-110 group-hover:bg-[#6C1D5F]/10 group-hover:text-[#6C1D5F] dark:group-hover:bg-[#D3CCEC]/10 dark:group-hover:text-[#D3CCEC] border border-transparent dark:border-[#2e2e3e]">
              <Play className="w-5 h-5 fill-current" />
            </div>
          </div>
        </Link>

        <Link to="/student/assessments" className="group">
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#15151f] p-6 sm:p-8 flex items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform group-hover:scale-110" />
            <div className="relative z-10">
              <p className="text-muted-foreground text-sm font-bold tracking-wider uppercase mb-1">
                Action Required
              </p>
              <h3 className="text-foreground text-2xl font-extrabold group-hover:text-[#6C1D5F] dark:group-hover:text-[#D3CCEC] transition-colors">
                Take Assessment
              </h3>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-foreground transition-transform group-hover:scale-110 group-hover:bg-[#6C1D5F]/10 group-hover:text-[#6C1D5F] dark:group-hover:bg-[#D3CCEC]/10 dark:group-hover:text-[#D3CCEC] border border-transparent dark:border-[#2e2e3e]">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Row */}
      <div>
        <h2 className="text-xl font-bold text-foreground tracking-tight mb-4">Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            index={0}
            title="Enrolled Courses"
            value={enrolledCourses.length}
            icon={BookOpen}
            trend="Total active"
            trendUp={false}
            colorClass="text-[#6C1D5F]"
            bgClass="bg-[#6C1D5F]/10"
          />
          <StatCard
            index={1}
            title="Pending Assessments"
            value={upcomingAssessments.length}
            icon={Calendar}
            trend="Action required"
            trendUp={false}
            colorClass="text-[#FF6200]"
            bgClass="bg-[#FF6200]/10"
          />
          <StatCard
            index={2}
            title="Completed Courses"
            value={enrolledCourses.filter((c) => c.progress === 100).length}
            icon={Award}
            trend="Finished courses"
            trendUp={false}
            colorClass="text-[#01AC9F]"
            bgClass="bg-[#01AC9F]/10"
          />
          <StatCard
            index={3}
            title="Unread Notifications"
            value={unreadNotifications}
            icon={Bell}
            trend="New alerts"
            trendUp={false}
            colorClass="text-[#84117C] dark:text-[#D3CCEC]"
            bgClass="bg-[#84117C]/10 dark:bg-[#D3CCEC]/10"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:shadow-glow hover:border-[#6C1D5F] dark:hover:border-[#D3CCEC] transition-all duration-300 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6200]/10 flex items-center justify-center text-[#FF6200] shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                Learning Activity
              </h2>
              <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hours spent learning
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <LearningActivityChart data={learningData} />
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:shadow-glow hover:border-[#6C1D5F] dark:hover:border-[#D3CCEC] transition-all duration-300 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#01AC9F]/10 flex items-center justify-center text-[#01AC9F] shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">
                Subject Performance
              </h2>
              <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Assessment scores
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <SubjectPerformanceChart data={assessmentData} />
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      {!loading && enrolledCourses.length > 0 && <ContinueLearning courses={enrolledCourses} />}
    </div>
  );
}
