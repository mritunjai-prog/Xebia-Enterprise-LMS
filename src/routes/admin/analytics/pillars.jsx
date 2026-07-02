import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Network, Laptop, Shield, Users, BrainCircuit, Activity, BarChart, Server, Star, BadgeCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/admin/analytics/pillars')({
  component: LearningPillars,
});

function LearningPillars() {
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: CourseService.getCourses,
  });

  if (coursesLoading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Learning Pillars</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Strategic learning classification and taxonomy</p>
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

  // Frontend Aggregation (Category B): Map categories to pseudo-pillars based on keywords
  const pillarCounts = {
    'Technology': 0,
    'Compliance': 0,
    'Leadership': 0,
    'AI & Data': 0,
    'Other': 0
  };

  courseList.forEach(course => {
    const cat = (course.category?.name || '').toLowerCase();
    
    if (cat.includes('tech') || cat.includes('cloud') || cat.includes('software') || cat.includes('engineer')) {
      pillarCounts['Technology']++;
    } else if (cat.includes('compliance') || cat.includes('security') || cat.includes('ethic') || cat.includes('policy')) {
      pillarCounts['Compliance']++;
    } else if (cat.includes('leader') || cat.includes('manage') || cat.includes('agile') || cat.includes('scrum')) {
      pillarCounts['Leadership']++;
    } else if (cat.includes('ai') || cat.includes('data') || cat.includes('machine') || cat.includes('prompt')) {
      pillarCounts['AI & Data']++;
    } else {
      pillarCounts['Other']++;
    }
  });

  // Remove 'Other' from some charts if we want to focus on core pillars
  const corePillarsData = Object.entries(pillarCounts)
    .filter(([name]) => name !== 'Other')
    .map(([name, count]) => ({ name, value: count }))
    .sort((a, b) => b.value - a.value);

  const barChartData = corePillarsData.map(item => ({ pillar: item.name, courses: item.value }));

  // Find largest pillar
  const largestPillar = corePillarsData.length > 0 && corePillarsData[0].value > 0 
    ? corePillarsData[0] 
    : { name: 'None detected', value: 0 };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 mb-3 px-3 py-1">Taxonomy Analytics</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Learning Pillars</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1 max-w-2xl">
            Analyze course distribution across strategic enterprise learning pillars using inferred category mapping.
          </p>
        </div>
      </div>

      {/* SECTION 1: Learning Pillars Overview KPI Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Network className="w-5 h-5 text-primary" /> Strategic Pillars (Inferred)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Technology Pillar" 
            value={pillarCounts['Technology']} 
            icon={Laptop} 
            description="Tech & Engineering courses"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Compliance Pillar" 
            value={pillarCounts['Compliance']} 
            icon={Shield} 
            description="Security & Policy courses"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Leadership Pillar" 
            value={pillarCounts['Leadership']} 
            icon={Users} 
            description="Management & Agile courses"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="AI & Data Pillar" 
            value={pillarCounts['AI & Data']} 
            icon={BrainCircuit} 
            description="AI & Analytics courses"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Pillar Distribution */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" /> Pillar Distribution
        </h2>
        
        {corePillarsData.some(p => p.value > 0) ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ComparisonChart 
                title="Courses by Strategic Pillar"
                description="Number of courses mapped to each learning pillar"
                data={barChartData}
                xAxisKey="pillar"
                bars={[{ dataKey: 'courses', name: 'Total Courses', color: '#01AC9F' }]}
                className="shadow-md h-full"
              />
            </div>
            <div className="lg:col-span-1">
              <DonutChart 
                title="Pillar Saturation"
                description="Distribution across top pillars"
                data={corePillarsData}
                className="shadow-md h-full"
              />
            </div>
          </div>
        ) : (
          <Card className="p-8 bg-card/50 border-border/50 shadow-md">
            <EmptyState 
              title="Insufficient Taxonomy Data" 
              description="No courses currently match the keyword heuristics required to map categories to strategic pillars (Technology, Compliance, Leadership, AI). Please categorize courses appropriately or wait for explicit pillar metadata support." 
            />
          </Card>
        )}
      </div>

      {/* SECTION 4: Pillar Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BarChart className="w-5 h-5 text-primary" /> Pillar Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="p-5 bg-primary/5 border-primary/20 shadow-sm flex flex-col justify-center">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Largest Pillar</p>
            <p className="text-xl font-black text-foreground">{largestPillar.name}</p>
            <p className="text-xs text-muted-foreground mt-2">{largestPillar.value} courses mapped.</p>
          </Card>
          <Card className="p-5 border-border/50 shadow-sm flex flex-col justify-center bg-card/50">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Unclassified Content</p>
            <p className="text-xl font-black text-foreground">{pillarCounts['Other']}</p>
            <p className="text-xs text-muted-foreground mt-2">Courses falling outside strategic pillars.</p>
          </Card>
          <Card className="p-5 border-border/50 shadow-sm flex flex-col justify-center bg-card/50">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Taxonomy Mapping</p>
            <p className="text-xl font-black text-foreground">Inferred</p>
            <p className="text-xs text-muted-foreground mt-2">Derived from category keyword matching.</p>
          </Card>
        </div>
      </div>

      {/* SECTION 5: Future Enterprise Pillars (Category C) */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Server className="w-5 h-5 text-primary" /> Advanced Taxonomy & Metadata
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl mb-4">
          Visualizing explicit Flagship Programs, External Certifications, and Upskilling Tracks requires extending the backend `Course` entity with explicit classification metadata, rather than relying on category inference.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EmptyState 
            title="Flagship Programs" 
            description="Tracking exclusive Flagship learning paths requires a new boolean `isFlagship` metadata flag on the Course or Category entity in the Spring Boot backend." 
            icon={<Star className="w-8 h-8 text-muted-foreground/30 mb-4" />}
          />
          <EmptyState 
            title="External Certifications" 
            description="Mapping courses to external vendor certifications (AWS, Azure, Zoho) requires a `certificationVendor` schema update maintained by the Learning Office." 
            icon={<BadgeCheck className="w-8 h-8 text-muted-foreground/30 mb-4" />}
          />
          <EmptyState 
            title="Upskilling Tracks" 
            description="Visualizing deliberate upskilling journeys requires the implementation of a strategic learning taxonomy matrix mapping skills to curriculum modules." 
            icon={<Activity className="w-8 h-8 text-muted-foreground/30 mb-4" />}
          />
        </div>
      </div>

    </div>
  );
}
