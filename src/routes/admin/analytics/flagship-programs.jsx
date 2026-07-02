import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Flag, Trophy, Target, Star, Users, Briefcase, Sparkles, Building2, TrendingUp, Lightbulb, GraduationCap, Map, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/flagship-programs')({
  component: FlagshipProgramsDashboard,
});

function FlagshipProgramsDashboard() {
  const { filters } = useAnalyticsFilters();

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: CourseService.getCourses,
  });

  if (coursesLoading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Flagship Programs</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Strategic enterprise initiatives and premium academies</p>
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

  // Frontend Aggregation (Category B): Map known strategic keywords
  const strategicCounts = {
    'Leadership & Dev': 0,
    'Digital Transformation': 0,
    'Cloud Academies': 0,
    'Innovation & AI': 0,
    'Graduate & Bootcamp': 0
  };

  const strategicKeywords = {
    'Leadership & Dev': ['leadership', 'professional development', 'learning journey', 'upskilling'],
    'Digital Transformation': ['transformation', 'digital'],
    'Cloud Academies': ['cloud', 'academy'],
    'Innovation & AI': ['innovation', 'ai'],
    'Graduate & Bootcamp': ['graduate', 'bootcamp']
  };

  let totalFlagshipCourses = 0;

  courseList.forEach(course => {
    const text = `${course.title} ${course.category?.name}`.toLowerCase();
    let found = false;

    Object.entries(strategicKeywords).forEach(([program, keywords]) => {
      if (keywords.some(kw => text.includes(kw))) {
        strategicCounts[program]++;
        found = true;
      }
    });

    if (found) totalFlagshipCourses++;
  });

  const flagshipChartData = Object.entries(strategicCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, count]) => ({ name, value: count }))
    .sort((a, b) => b.value - a.value);

  const flagshipBarData = flagshipChartData.map(item => ({ program: item.name, courses: item.value }));

  // Future Roadmap integrations
  const roadmapInitiatives = [
    { name: 'AI Excellence Program', icon: Sparkles, desc: 'Enterprise-wide AI certification' },
    { name: 'Cloud Academy', icon: Building2, desc: 'Strategic cloud architecture upskilling' },
    { name: 'Leadership Accelerator', icon: Users, desc: 'High-potential management journey' },
    { name: 'Digital Transformation', icon: TrendingUp, desc: 'Cross-functional digital enablement' },
    { name: 'Women in Technology', icon: Trophy, desc: 'Diversity and inclusion tech tracks' },
    { name: 'Graduate Excellence', icon: GraduationCap, desc: 'Campus-to-corporate acceleration' },
    { name: 'Enterprise Upskilling', icon: Target, desc: 'Continuous learning paths' },
    { name: 'Innovation Labs', icon: Lightbulb, desc: 'R&D and emerging tech incubators' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#701a75] via-[#4c1d95] to-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Flag className="w-64 h-64 text-white" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-fuchsia-500/30 text-fuchsia-200 border-fuchsia-400/30 mb-4 px-3 py-1 backdrop-blur-md">
            Phase 4 Initiative
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Flagship Programs</h1>
          <p className="mt-3 text-fuchsia-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Monitor strategic enterprise initiatives and premium learning academies. Business ROI tracking and executive sponsorship telemetry are pending deployment.
          </p>
        </div>
      </div>

      {/* SECTION 1: Executive Overview (KPIs) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" /> Executive Overview
          </h2>
          <Badge variant="outline" className="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 dark:border-fuchsia-800">
            Inferred from Course Catalog
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Strategic Courses" 
            value={totalFlagshipCourses} 
            icon={BookOpen} 
            description="Identified via keywords"
            className="shadow-sm border-fuchsia-500/20 bg-fuchsia-50/50 dark:bg-fuchsia-950/20" 
          />
          <MetricCard 
            title="Active Cohorts" 
            value="--" 
            icon={Users} 
            description="Integration Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
          <MetricCard 
            title="Program Budgets" 
            value="--" 
            icon={Briefcase} 
            description="Integration Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
          <MetricCard 
            title="Business ROI" 
            value="--" 
            icon={TrendingUp} 
            description="Integration Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Program Portfolio & Distribution */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Target className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" /> Strategic Portfolio Distribution
          </h2>
          <Badge variant="outline" className="bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 dark:border-fuchsia-800">
            Inferred from Course Catalog
          </Badge>
        </div>
        
        {flagshipChartData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ComparisonChart 
                title="Strategic Focus Areas"
                description="Number of courses inferred per flagship program category"
                data={flagshipBarData}
                xAxisKey="program"
                bars={[{ dataKey: 'courses', name: 'Strategic Courses', color: '#c026d3' }]}
                className="shadow-md h-full border-fuchsia-500/10"
              />
            </div>
            <div className="lg:col-span-1">
              <DonutChart 
                title="Program Distribution"
                description="Share of strategic content by area"
                data={flagshipChartData}
                className="shadow-md h-full border-fuchsia-500/10"
              />
            </div>
          </div>
        ) : (
          <Card className="p-8 bg-card/50 border-border/50 shadow-md">
            <EmptyState 
              title="No Strategic Initiatives Detected" 
              description="Could not infer any flagship program courses based on catalog keywords (e.g., Academy, Bootcamp, Leadership, Digital)." 
            />
          </Card>
        )}
      </div>

      {/* SECTION 4: Strategic Learning Initiatives (Category C) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Star className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" /> Enterprise Impact Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <EmptyState 
            title="Strategic Impact & ROI" 
            description="Tracking Business ROI and Outcomes requires external data integration from ERP/HRMS systems to map learning to performance." 
            icon={<TrendingUp className="w-8 h-8 text-fuchsia-500/30 mb-4" />}
          />
          <EmptyState 
            title="Cohort & Participation Tracking" 
            description="Employee Participation, Organization Adoption, and Cohort Tracking require a dedicated Cohort Management entity in the Spring Boot backend." 
            icon={<Users className="w-8 h-8 text-indigo-500/30 mb-4" />}
          />
          <EmptyState 
            title="Sponsorship & Funding" 
            description="Monitoring Executive Sponsors and Program Budgets relies on financial taxonomy currently absent from the LMS database." 
            icon={<Briefcase className="w-8 h-8 text-amber-500/30 mb-4" />}
          />
        </div>
      </div>

      {/* SECTION 5: Enterprise Roadmap */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Map className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" /> Executive Program Roadmap
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl mb-6">
          The following flagship academies and premium learning journeys are planned for Phase 4 deployment once strategic funding and cohort metadata models are established.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roadmapInitiatives.map((initiative, idx) => {
            const Icon = initiative.icon;
            return (
              <Card key={idx} className="p-5 border-dashed border-2 border-fuchsia-500/20 bg-fuchsia-50/30 dark:bg-fuchsia-950/20 flex flex-col gap-3 relative overflow-hidden group hover:border-fuchsia-500/50 transition-colors">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-fuchsia-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 relative z-10">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    {initiative.name}
                  </h3>
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0 mt-1.5 w-max bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300">Future Enterprise Initiative</Badge>
                  <p className="text-xs font-medium text-muted-foreground mt-2 leading-relaxed">
                    {initiative.desc}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

    </div>
  );
}
