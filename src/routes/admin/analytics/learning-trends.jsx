import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { PremiumPageHeader } from '@/admin/features/analytics/components/layout/PremiumPageHeader';
import { TrendingUp, Clock, Calendar, BarChart3, ArrowUpRight, LineChart } from 'lucide-react';
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
      
      <PremiumPageHeader
        title="Learning Trends"
        description="Monitor Year-over-Year, Quarter-over-Quarter, and Month-over-Month growth metrics alongside top learning trends."
        icon={TrendingUp}
        badgeText="Growth Analytics"
        badgeColor="indigo"
      />

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
            <div key={idx} className="relative group p-4 flex flex-col sm:flex-row sm:items-center justify-between bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-sm shrink-0 group-hover:scale-110 transition-transform duration-500 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                  #{idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">{trend.trend}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{trend.description}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 sm:text-right flex items-center sm:block gap-2 relative z-10">
                <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 whitespace-nowrap shadow-sm border border-emerald-100 dark:border-emerald-800/50">
                  <ArrowUpRight className="w-3 h-3 mr-1 inline-block" />
                  {trend.growth}% Growth
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
