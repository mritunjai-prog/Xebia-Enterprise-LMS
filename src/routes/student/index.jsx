import { createFileRoute } from "@tanstack/react-router";
import {
  enrolledCourses,
  upcomingAssessments,
  notifications,
  chartData,
} from "@/features/student/mocks/dummy-data";
import { BookOpen, Calendar, Award, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Feature components
import { WelcomeBanner } from "@/features/student/components/dashboard/WelcomeBanner";
import { StatCard } from "@/features/student/components/dashboard/StatCard";
import { ContinueLearning } from "@/features/student/components/dashboard/ContinueLearning";
import { LearningActivityChart } from "@/features/student/components/charts/LearningActivityChart";
import { SubjectPerformanceChart } from "@/features/student/components/charts/SubjectPerformanceChart";

export const Route = createFileRoute("/student/")(
  { component: DashboardHome }
);

function DashboardHome() {
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Enrolled Courses"
          value={enrolledCourses.length}
          icon={BookOpen}
          trend="+2 this month"
          trendUp={true}
        />
        <StatCard
          title="Upcoming Assessments"
          value={upcomingAssessments.length}
          icon={Calendar}
          trend="Next: Tomorrow"
          trendUp={false}
        />
        <StatCard
          title="Completed Courses"
          value={enrolledCourses.filter((c) => c.progress === 100).length}
          icon={Award}
          trend="Great job!"
          trendUp={true}
        />
        <StatCard
          title="Unread Notifications"
          value={unreadNotifications}
          icon={Bell}
          trend="Check your inbox"
          trendUp={false}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Learning Activity</CardTitle>
            <CardDescription>Hours spent learning over the past few months</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <LearningActivityChart data={chartData.courseProgress} />
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Assessment scores across key subject areas</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SubjectPerformanceChart data={chartData.assessmentPerformance} />
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <ContinueLearning courses={enrolledCourses} />
    </div>
  );
}
