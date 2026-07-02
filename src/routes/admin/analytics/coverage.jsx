import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Users, Globe, Building2, MapPin, Network, Activity, BarChart3, TrendingUp, Layers } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/coverage')({
  component: LearningCoverage,
});

function LearningCoverage() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 2: Learning Coverage & Participation
  const metrics = {
    overallCoverage: 63.3,
    activeRegions: 8,
    activeProjects: 45,
    coveredGrades: 12
  };

  const regionCoverageData = [
    { region: 'North America', coverage: 82 },
    { region: 'Europe', coverage: 76 },
    { region: 'APAC', coverage: 65 },
    { region: 'LATAM', coverage: 54 },
    { region: 'MENA', coverage: 42 }
  ];

  const gradeCoverageData = [
    { name: 'L1 - Entry', value: 88, color: '#01AC9F' },
    { name: 'L2 - Mid', value: 75, color: '#8b5cf6' },
    { name: 'L3 - Senior', value: 62, color: '#f59e0b' },
    { name: 'L4 - Lead', value: 55, color: '#ec4899' },
    { name: 'L5 - Exec', value: 35, color: '#64748b' }
  ];

  const quarterlyTrendData = [
    { quarter: 'Q1', participation: 25 },
    { quarter: 'Q2', participation: 45 },
    { quarter: 'Q3', participation: 58 },
    { quarter: 'Q4', participation: 75 }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 mb-3 px-3 py-1">Coverage & Participation</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Learning Coverage</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1 max-w-2xl">
            "How effectively are we reaching employees across the organization?"
          </p>
        </div>
      </div>

      {/* SECTION 1: Coverage Metrics */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" /> Core Coverage Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Overall Coverage" 
            value={`${metrics.overallCoverage}%`} 
            icon={Users} 
            description="Enterprise-wide reach"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Region Coverage" 
            value={metrics.activeRegions} 
            icon={Globe} 
            description="Active geographical hubs"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Project Coverage" 
            value={metrics.activeProjects} 
            icon={Network} 
            description="Projects with active learners"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Grade Coverage" 
            value={metrics.coveredGrades} 
            icon={Layers} 
            description="Unique employee grades trained"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Coverage Visualizations */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" /> Coverage Distribution
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart 
              title="Region-wise Coverage Chart"
              description="Learning coverage percentage broken down by geographic region."
              data={regionCoverageData}
              xAxisKey="region"
              bars={[{ dataKey: 'coverage', name: 'Coverage %', color: '#84117C' }]}
              className="shadow-md h-full"
            />
          </div>
          <div className="lg:col-span-1">
            <DonutChart 
              title="Learning Coverage by Employee Grade"
              description="Distribution of learning participation across hierarchy levels."
              data={gradeCoverageData}
              className="shadow-md h-full"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Trends & Heatmaps */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" /> Trends & Participation
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComparisonChart 
            title="Quarterly Participation Trend"
            description="Growth in employee participation over the current year."
            data={quarterlyTrendData}
            xAxisKey="quarter"
            bars={[{ dataKey: 'participation', name: 'Participation %', color: '#059669' }]}
            className="shadow-md"
          />
          
          {/* Mock Heatmap equivalent */}
          <Card className="p-6 border border-border/50 shadow-md flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/20">
            <div className="mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-500" /> Coverage Heatmap
              </h3>
              <p className="text-sm text-muted-foreground">Density of trained employees by location</p>
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 25 }).map((_, i) => {
                  const intensity = Math.floor(Math.random() * 5); // 0-4
                  const bgClass = ['bg-indigo-50 dark:bg-indigo-950/20', 'bg-indigo-200 dark:bg-indigo-900/40', 'bg-indigo-400 dark:bg-indigo-700/60', 'bg-indigo-600 dark:bg-indigo-500/80', 'bg-indigo-800 dark:bg-indigo-400'][intensity];
                  return (
                    <div key={i} className={`h-8 rounded-sm ${bgClass} transition-colors duration-500`} title={`Location ${i+1}`} />
                  )
                })}
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-muted-foreground mt-2">
                <span>Low Coverage</span>
                <span>High Coverage</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Filter Context Indicator */}
      <div className="flex items-center gap-3 mt-4 text-xs font-medium text-muted-foreground bg-primary/5 border border-primary/10 w-fit px-4 py-2 rounded-lg">
        <Building2 className="w-4 h-4 text-primary" />
        <span>Currently viewing data for Business Unit: <strong>{filters.organization.businessUnit}</strong></span>
      </div>

    </div>
  );
}
