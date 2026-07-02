import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { Clock, BookOpen, Presentation, GraduationCap, Timer, PlayCircle, BarChart, Server } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/hours')({
  component: LearningHours,
});

function LearningHours() {
  const { filters } = useAnalyticsFilters();

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: CourseService.getCourses,
  });

  if (coursesLoading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Learning Hours</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Analyzing organizational investment in learning time</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-[120px] rounded-2xl" />
          <Skeleton className="h-[120px] rounded-2xl" />
          <Skeleton className="h-[120px] rounded-2xl" />
          <Skeleton className="h-[120px] rounded-2xl" />
        </div>
      </div>
    );
  }

  const courseList = courses || [];
  const totalCourses = courseList.length;

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 mb-3 px-3 py-1">Investment Analytics</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Learning Hours Analytics</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1 max-w-2xl">
            Track organizational learning investment and content engagement durations. Telemetry integration pending for accurate time-spent tracking.
          </p>
        </div>
      </div>

      {/* SECTION 1: Learning Hours Overview KPI Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" /> Investment Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Total Active Courses" 
            value={totalCourses} 
            icon={BookOpen} 
            description="Available for learning"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Total Learning Hours" 
            value="--" 
            icon={Timer} 
            description="Telemetry Pending"
            className="shadow-sm border-border/50 bg-muted/20" 
          />
          <MetricCard 
            title="Avg. Hours per Learner" 
            value="--" 
            icon={GraduationCap} 
            description="Telemetry Pending"
            className="shadow-sm border-border/50 bg-muted/20" 
          />
          <MetricCard 
            title="Curriculum Density" 
            value="--" 
            icon={Server} 
            description="N+1 Aggregation Pending"
            className="shadow-sm border-border/50 bg-muted/20" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Hours Distribution Charts */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BarChart className="w-5 h-5 text-primary" /> Hours Distribution
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmptyState 
            title="Learning Hours by Category" 
            description="Visualizing the distribution of hours spent across learning domains requires extending the ContentProgress entity to track exact session durations (time_spent_seconds)." 
          />
          <EmptyState 
            title="Engagement by Content Type" 
            description="Analyzing time spent on Videos vs PDFs requires client-side heartbeat telemetry to be implemented in the CourseViewer component." 
          />
        </div>
      </div>

      {/* SECTION 4: Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-primary" /> Curriculum Insights
        </h2>
        <Card className="p-8 bg-card/50 border-border/50 shadow-md">
          <div className="flex flex-col items-center justify-center text-center gap-4 py-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Server className="w-8 h-8 opacity-60" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-foreground">Global Curriculum Aggregation Required</h3>
              <p className="text-sm font-medium text-muted-foreground max-w-xl mx-auto mt-2 leading-relaxed">
                Calculating insights such as the <strong>Largest Curriculum</strong>, <strong>Most Content Rich Course</strong>, or <strong>Maximum Modules</strong> using current APIs would require iterating an N+1 fetching loop across all {totalCourses} courses on the client side. 
                A dedicated aggregation query must be built on the Spring Boot backend to support this securely and performantly.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION 5: Enterprise Learning Hours (ILT / Sessions) */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Presentation className="w-5 h-5 text-primary" /> Enterprise Live Training
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl mb-4">
          The following instructor-led training (ILT) metrics require the deployment of a new scheduling architecture as the current LMS design primarily supports self-paced e-learning.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EmptyState 
            title="Total Sessions Conducted" 
            description="Requires the creation of a 'TrainingSession' entity to map instructors, timeslots, and meeting links to courses." 
          />
          <EmptyState 
            title="Total Live Attendees" 
            description="Requires an 'Attendance' tracking system tied to live webinar or classroom rosters." 
          />
          <EmptyState 
            title="Instructor Contact Hours" 
            description="Instructor effort tracking relies on a timesheet or session duration aggregation model currently absent from the database." 
          />
        </div>
      </div>

    </div>
  );
}
