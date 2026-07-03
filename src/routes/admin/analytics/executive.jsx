import { createFileRoute, Link } from "@tanstack/react-router";
import { MetricCard } from "@/admin/features/analytics/components/metrics/MetricCard";
import { DonutChart } from "@/admin/features/analytics/components/charts/DonutChart";
import { PremiumPageHeader } from "@/admin/features/analytics/components/layout/PremiumPageHeader";
import {
  Users,
  Activity,
  FileCheck,
  GraduationCap,
  Server,
  CheckCircle2,
  ChevronRight,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  BookOpen,
  Star,
  TrendingUp,
  Presentation,
  PieChart,
} from "lucide-react";

export const Route = createFileRoute("/admin/analytics/executive")({
  component: ExecutiveSummary,
});

function ExecutiveSummary() {
  // Enterprise Mock Data for KPIs
  const metrics = {
    reach: {
      totalEmployees: 4500,
      employeesNominated: 3200,
      employeesTrained: 2850,
      learningCoverage: 63.3,
    },
    delivery: {
      totalSessions: 420,
      totalAttendees: 15400,
      totalNominations: 18200,
      totalLearningHours: 46200,
      avgHoursPerSession: 3.5,
    },
    certification: {
      totalCompleted: 1250,
      growthPct: 18.4,
    },
    aiReadiness: {
      trained: 850,
      certified: 320,
      learningHours: 4250,
    },
    effectiveness: {
      feedbackRating: 4.6,
      satisfactionScore: 92,
      recommendationPct: 88,
    },
  };

  // Chart Data
  const reachData = [
    { name: "Trained", value: metrics.reach.employeesTrained, color: "#059669" },
    {
      name: "Untrained",
      value: metrics.reach.totalEmployees - metrics.reach.employeesTrained,
      color: "#94a3b8",
    },
  ];

  const aiData = [
    { name: "Trained in AI", value: metrics.aiReadiness.trained, color: "#8b5cf6" },
    {
      name: "Not Trained",
      value: metrics.reach.totalEmployees - metrics.aiReadiness.trained,
      color: "#cbd5e1",
    },
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      <PremiumPageHeader
        title="Enterprise Learning Overview"
        description="High-level snapshot of organization-wide learning performance, AI readiness, and training effectiveness."
        icon={PieChart}
        badgeText="Executive Summary"
        badgeColor="purple"
      />

      {/* 2. Key Metrics: Learning Reach */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Learning Reach
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Total Employees"
            value={metrics.reach.totalEmployees.toLocaleString()}
            icon={Users}
            description="Active workforce"
          />
          <MetricCard
            title="Employees Nominated"
            value={metrics.reach.employeesNominated.toLocaleString()}
            icon={FileCheck}
            description="Enrolled in programs"
          />
          <MetricCard
            title="Employees Trained"
            value={metrics.reach.employeesTrained.toLocaleString()}
            icon={GraduationCap}
            description="Completed training"
          />
          <MetricCard
            title="Learning Coverage"
            value={`${metrics.reach.learningCoverage}%`}
            icon={Activity}
            description="Trained / Total Employees"
            className="border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20"
          />
        </div>
      </div>

      {/* 3. Learning Delivery & Effectiveness */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Presentation className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Learning Delivery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          <MetricCard
            title="Sessions Conducted"
            value={metrics.delivery.totalSessions}
            icon={Calendar}
            description="Total sessions"
          />
          <MetricCard
            title="Total Attendees"
            value={metrics.delivery.totalAttendees.toLocaleString()}
            icon={Users}
            description="Across all sessions"
          />
          <MetricCard
            title="Total Nominations"
            value={metrics.delivery.totalNominations.toLocaleString()}
            icon={FileCheck}
            description="Total enrollments"
          />
          <MetricCard
            title="Learning Hours"
            value={metrics.delivery.totalLearningHours.toLocaleString()}
            icon={Clock}
            description="Total hours invested"
          />
          <MetricCard
            title="Avg Hrs/Session"
            value={metrics.delivery.avgHoursPerSession}
            icon={Activity}
            description="Average duration"
          />
        </div>
      </div>

      {/* 4. Strategic Categories (Certs, AI, Effectiveness) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Certifications & AI */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> Certification Summary
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Total certifications achieved across the enterprise.
              </p>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-4xl font-black">
                    {metrics.certification.totalCompleted.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-emerald-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4" /> +{metrics.certification.growthPct}% Growth
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-violet-500" /> AI Readiness Summary
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Enterprise preparedness for AI transformation.
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-muted-foreground">Employees Trained in AI</span>
                  <span className="font-bold">{metrics.aiReadiness.trained}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-muted-foreground">AI Certifications</span>
                  <span className="font-bold">{metrics.aiReadiness.certified}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-muted-foreground">AI Learning Hours</span>
                  <span className="font-bold">{metrics.aiReadiness.learningHours}h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Effectiveness */}
        <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
          <div className="absolute -inset-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-amber-500" /> Training Effectiveness
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Overall quality and satisfaction of learning programs.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Feedback Rating</span>
                <span className="text-sm font-bold text-amber-600">
                  {metrics.effectiveness.feedbackRating} / 5.0
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(metrics.effectiveness.feedbackRating / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Satisfaction Score</span>
                <span className="text-sm font-bold text-blue-600">
                  {metrics.effectiveness.satisfactionScore}%
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${metrics.effectiveness.satisfactionScore}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Recommendation %</span>
                <span className="text-sm font-bold text-emerald-600">
                  {metrics.effectiveness.recommendationPct}%
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${metrics.effectiveness.recommendationPct}%` }}
                ></div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>

      {/* 5. Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutChart
          title="Enterprise Learning Reach"
          description="Proportion of workforce trained"
          data={reachData}
          className="shadow-md"
        />
        <DonutChart
          title="AI Readiness Distribution"
          description="Proportion of workforce trained in AI"
          data={aiData}
          className="shadow-md"
        />
      </div>
    </div>
  );
}
