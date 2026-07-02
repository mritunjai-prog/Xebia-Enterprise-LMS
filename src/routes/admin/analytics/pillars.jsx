import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Network, Laptop, Shield, Users, BrainCircuit, Activity, BarChart, Server, Star, BadgeCheck, GraduationCap, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/pillars')({
  component: LearningPillars,
});

function LearningPillars() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 4: Training Categories / Learning Pillars
  const pillarCounts = {
    'Compliance': 15,
    'Technical': 42,
    'AI & GenAI': 28,
    'Leadership': 12,
    'Upskilling': 24,
    'Certifications': 35,
    'Flagship Programs': 8
  };

  const corePillarsData = Object.entries(pillarCounts)
    .map(([name, count]) => ({ name, value: count }))
    .sort((a, b) => b.value - a.value);

  const barChartData = corePillarsData.map(item => ({ pillar: item.name, courses: item.value }));

  // Find largest pillar
  const largestPillar = corePillarsData[0];

  const pillarDetails = [
    { name: 'Compliance Learning', icon: Shield, color: 'text-rose-500', bg: 'bg-rose-500/10', count: pillarCounts['Compliance'], examples: 'POSH, PISMS, Security Awareness, Mandatory Compliance Programs' },
    { name: 'Technical Learning', icon: Laptop, color: 'text-blue-500', bg: 'bg-blue-500/10', count: pillarCounts['Technical'], examples: 'Databricks, Cloud, Data Engineering, Development Technologies' },
    { name: 'AI & GenAI Learning', icon: BrainCircuit, color: 'text-violet-500', bg: 'bg-violet-500/10', count: pillarCounts['AI & GenAI'], examples: 'Kiro, Claude, Copilot, GenAI Learning Paths' },
    { name: 'Leadership Development', icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10', count: pillarCounts['Leadership'], examples: 'YMP, Managerial Programs, People Management Programs' },
    { name: 'Upskilling & Cross-Skilling', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', count: pillarCounts['Upskilling'], examples: 'Solution Architect, Tech Lead Development, Career Transition' },
    { name: 'Certifications', icon: BadgeCheck, color: 'text-cyan-500', bg: 'bg-cyan-500/10', count: pillarCounts['Certifications'], examples: 'All external and internal certifications' },
    { name: 'Flagship Programs', icon: Star, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10', count: pillarCounts['Flagship Programs'], examples: 'Organization-wide strategic learning initiatives' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 mb-3 px-3 py-1">Taxonomy Analytics</Badge>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Learning Pillars</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1 max-w-2xl">
            Training data organized into 7 strategic enterprise learning pillars.
          </p>
        </div>
      </div>

      {/* SECTION 1: Learning Pillars Overview KPI Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Network className="w-5 h-5 text-primary" /> Strategic Pillars Breakdown
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pillarDetails.map((pillar, idx) => (
            <Card key={idx} className="p-5 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${pillar.bg} flex items-center justify-center ${pillar.color} shrink-0`}>
                  <pillar.icon className="w-5 h-5" />
                </div>
                <Badge variant="secondary" className="font-bold">{pillar.count} Programs</Badge>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">{pillar.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2" title={pillar.examples}>{pillar.examples}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION 2 & 3: Pillar Distribution */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" /> Pillar Distribution
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart 
              title="Programs by Strategic Pillar"
              description="Volume of active learning programs mapped to each pillar"
              data={barChartData}
              xAxisKey="pillar"
              bars={[{ dataKey: 'courses', name: 'Programs', color: '#01AC9F' }]}
              className="shadow-md h-full"
            />
          </div>
          <div className="lg:col-span-1">
            <DonutChart 
              title="Pillar Saturation"
              description="Distribution across the 7 strategic pillars"
              data={corePillarsData}
              className="shadow-md h-full"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Pillar Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BarChart className="w-5 h-5 text-primary" /> Strategy Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Card className="p-5 bg-primary/5 border-primary/20 shadow-sm flex flex-col justify-center">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Most Heavily Invested Pillar</p>
            <p className="text-xl font-black text-foreground">{largestPillar.name}</p>
            <p className="text-xs text-muted-foreground mt-2">{largestPillar.value} active programs.</p>
          </Card>
          <Card className="p-5 border-border/50 shadow-sm flex flex-col justify-center bg-card/50">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Strategic Programs</p>
            <p className="text-xl font-black text-foreground">{Object.values(pillarCounts).reduce((a, b) => a + b, 0)}</p>
            <p className="text-xs text-muted-foreground mt-2">Mapped across all 7 pillars.</p>
          </Card>
          <Card className="p-5 border-border/50 shadow-sm flex flex-col justify-center bg-card/50">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Taxonomy Mapping</p>
            <p className="text-xl font-black text-foreground">Complete</p>
            <p className="text-xs text-muted-foreground mt-2">100% alignment with Enterprise PDF standards.</p>
          </Card>
        </div>
      </div>

    </div>
  );
}
