import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService, CategoryService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { BookOpen, Tag, FileCheck, FileEdit, Users, Globe, Building2, MapPin, Network, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/coverage')({
  component: LearningCoverage,
});

function LearningCoverage() {
  const { filters } = useAnalyticsFilters();

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: CourseService.getCourses,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: CategoryService.getCategories,
  });

  if (coursesLoading || categoriesLoading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Learning Coverage</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Analyzing the reach and availability of curriculum</p>
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
  const categoryList = categories || [];

  const totalCourses = courseList.length;
  const publishedCourses = courseList.filter(c => c.published || c.isPublished).length;
  const draftCourses = totalCourses - publishedCourses;
  const totalCategories = categoryList.length;

  // Frontend Aggregation for "Courses per Category"
  const categoryCountMap = {};
  courseList.forEach(course => {
    const catName = course.category?.name || 'Uncategorized';
    categoryCountMap[catName] = (categoryCountMap[catName] || 0) + 1;
  });

  const categoryBarData = Object.entries(categoryCountMap)
    .map(([name, count]) => ({ category: name, courses: count }))
    .sort((a, b) => b.courses - a.courses);

  const topCategories = categoryBarData.slice(0, 5);
  const topCategoryName = topCategories.length > 0 ? topCategories[0].category : 'N/A';

  const publishedDistribution = [
    { name: 'Available to Learners (Published)', value: publishedCourses, color: '#01AC9F' },
    { name: 'In Development (Drafts)', value: draftCourses, color: '#F59E0B' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 mb-3 px-3 py-1">Coverage Analytics</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Learning Coverage</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1 max-w-2xl">
            Analyze the breadth of your learning library and track curriculum distribution. Note: Employee demographic coverage is pending HR integration.
          </p>
        </div>
      </div>

      {/* SECTION 1: Coverage Overview KPI Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> Content Availability
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Total Learning Programs" 
            value={totalCourses} 
            icon={BookOpen} 
            description="Total courses in system"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Published Coverage" 
            value={publishedCourses} 
            icon={FileCheck} 
            description="Active to learners"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Draft Pipeline" 
            value={draftCourses} 
            icon={FileEdit} 
            description="Content in development"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Learning Domains" 
            value={totalCategories} 
            icon={Tag} 
            description="Active categories"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Coverage Charts & Distribution */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" /> Curriculum Distribution
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart 
              title="Coverage by Category"
              description="Number of courses available per learning domain"
              data={topCategories}
              xAxisKey="category"
              bars={[{ dataKey: 'courses', name: 'Total Courses', color: '#84117C' }]}
              className="shadow-md h-full"
            />
          </div>
          <div className="lg:col-span-1">
            <DonutChart 
              title="Publication Readiness"
              description="Ratio of available vs developing content"
              data={publishedDistribution}
              className="shadow-md h-full"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Coverage Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" /> Coverage Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="p-5 bg-primary/5 border-primary/20 shadow-sm flex flex-col justify-center">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Top Coverage Domain</p>
            <p className="text-xl font-black text-foreground">{topCategoryName}</p>
            <p className="text-xs text-muted-foreground mt-2">This category holds the most active courses.</p>
          </Card>
          <Card className="p-5 border-border/50 shadow-sm flex flex-col justify-center bg-card/50">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Filter Context</p>
            <p className="text-lg font-bold text-foreground">{filters.organization.region}</p>
            <p className="text-xs text-muted-foreground mt-2">Selected global region filter.</p>
          </Card>
          <Card className="p-5 border-border/50 shadow-sm flex flex-col justify-center bg-card/50">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Platform Readiness</p>
            <p className="text-lg font-bold text-foreground">{totalCourses > 0 ? 'Operational' : 'Needs Content'}</p>
            <p className="text-xs text-muted-foreground mt-2">Based on existing curriculum catalog.</p>
          </Card>
        </div>
      </div>

      {/* SECTION 5: Backend Pending Enterprise Coverage */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Enterprise Demographic Coverage
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl mb-4">
          The following geographic and organizational coverage visualizations require the deployment of the Employee Master Directory synchronization via HRMS integration.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EmptyState 
            title="Region Coverage Heatmap" 
            description="This visualization requires Employee Region mappings (e.g., APAC, EMEA, NA) which are not yet available in the current backend telemetry." 
          />
          <EmptyState 
            title="Business Unit Penetration" 
            description="Tracking learning reach across specific Business Units requires organizational matrix synchronization with the core LMS database." 
          />
          <EmptyState 
            title="Project-wise Participation" 
            description="Mapping active learning hours to specific billing codes or Project IDs requires future integration with your timesheet system." 
          />
          <EmptyState 
            title="Grade-wise Coverage" 
            description="Analyzing learning adoption by Employee Grade (e.g., L1, L2, Managerial) requires HR hierarchical data." 
          />
          <EmptyState 
            title="Location Distribution" 
            description="Office-level or city-level coverage insights are pending the rollout of the demographic enrichment API." 
          />
          <EmptyState 
            title="Department Analytics" 
            description="Departmental learning coverage (e.g., Engineering vs Sales) relies on organizational mapping data currently absent from the database." 
          />
        </div>
      </div>

    </div>
  );
}
