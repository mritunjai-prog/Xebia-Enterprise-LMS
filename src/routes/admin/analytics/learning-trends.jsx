import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { TrendingUp, Clock, Calendar, BarChart3, ArrowUpRight, LineChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/learning-trends')({
  component: LearningTrendsDashboard,
});

function LearningTrendsDashboard() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 8: Learning Trends
  const metrics = {
    yoyGrowth: 34.5,
    qoqGrowth: 12.8,
    momGrowth: 4.2
  };

  const topTrends = [
    { trend: 'Generative AI Applications', growth: 145, description: 'Surge in Copilot and Prompt Engineering' },
    { trend: 'Cloud Native Architecture', growth: 85, description: 'Kubernetes and Microservices adoption' },
    { trend: 'Data Engineering', growth: 64, description: 'Databricks and Snowflake upskilling' },
    { trend: 'Agile Leadership', growth: 42, description: 'Scrum Master and Product Owner certifications' },
    { trend: 'Cybersecurity', growth: 38, description: 'Zero Trust and Cloud Security fundamentals' }
  ];

  const historicalGrowthData = [
    { period: 'Q1', growth: 8 },
    { period: 'Q2', growth: 12 },
    { period: 'Q3', growth: 15 },
    { period: 'Q4', growth: 22 },
    { period: 'Q1 (Current)', growth: 28 }
  ];

  const trendDistributionData = [
    { name: 'Generative AI', value: 145, color: '#8b5cf6' },
    { name: 'Cloud Native', value: 85, color: '#3b82f6' },
    { name: 'Data Eng', value: 64, color: '#10b981' },
    { name: 'Leadership', value: 42, color: '#f59e0b' },
    { name: 'Security', value: 38, color: '#ef4444' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-8 sm:p-10 text-white shadow-2xl border border-indigo-500/10">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <TrendingUp className="w-64 h-64 text-indigo-400" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-indigo-500/30 text-indigo-200 border-indigo-400/30 mb-4 px-3 py-1 backdrop-blur-md">
            Growth Analytics
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Learning Trends</h1>
          <p className="mt-3 text-indigo-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Monitor Year-over-Year, Quarter-over-Quarter, and Month-over-Month growth metrics alongside top learning trends.
          </p>
        </div>
      </div>

      {/* SECTION 1: Growth KPIs */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Organizational Growth
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <MetricCard 
            title="Year-over-Year Growth" 
            value={`+${metrics.yoyGrowth}%`} 
            icon={TrendingUp} 
            description="Compared to last year"
            className="shadow-sm border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20" 
          />
          <MetricCard 
            title="Quarter-over-Quarter Growth" 
            value={`+${metrics.qoqGrowth}%`} 
            icon={Calendar} 
            description="Compared to last quarter"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Month-over-Month Growth" 
            value={`+${metrics.momGrowth}%`} 
            icon={Clock} 
            description="Compared to last month"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Historical Trend & Trend Categories */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <LineChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Platform Velocity
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart 
              title="Historical Growth Trend"
              description="Platform engagement growth over time"
              data={historicalGrowthData}
              xAxisKey="period"
              bars={[{ dataKey: 'growth', name: 'Growth %', color: '#6366f1' }]}
              className="shadow-md h-full border-border/50"
            />
          </div>
          <div className="lg:col-span-1">
            <DonutChart 
              title="Emerging Categories"
              description="Distribution of fastest growing trends"
              data={trendDistributionData}
              className="shadow-md h-full border-border/50"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Top 5 Learning Trends */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Top 5 Learning Trends
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {topTrends.map((trend, idx) => (
            <Card key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm border-border/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-sm shrink-0">
                  #{idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base">{trend.trend}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{trend.description}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:text-right flex items-center sm:block gap-2">
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 whitespace-nowrap">
                  <ArrowUpRight className="w-3 h-3 mr-1 inline-block" />
                  {trend.growth}% Growth
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
