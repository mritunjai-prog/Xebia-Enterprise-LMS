import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { PremiumPageHeader } from '@/admin/features/analytics/components/layout/PremiumPageHeader';
import { Clock, Users, Building2, MapPin, Network, Activity, Trophy, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/hours')({
  component: LearningHours,
});

function LearningHours() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 3: Learning Hours Analytics
  const metrics = {
    orgLevel: {
      totalLearningHours: 46200,
      avgPerEmployee: 10.2
    },
    learnerLevel: {
      avgPerActiveLearner: 16.2
    }
  };

  const regionHoursData = [
    { region: 'North America', avgHours: 18.5 },
    { region: 'Europe', avgHours: 16.2 },
    { region: 'APAC', avgHours: 15.8 },
    { region: 'LATAM', avgHours: 12.4 },
    { region: 'MENA', avgHours: 9.6 }
  ];

  const projectHoursData = [
    { project: 'Project Titan', avgHours: 24.5 },
    { project: 'Cloud Migration', avgHours: 22.1 },
    { project: 'AI Transformation', avgHours: 19.8 },
    { project: 'Core Banking', avgHours: 17.5 },
    { project: 'Retail POS', avgHours: 14.2 }
  ];

  const topLearners = [
    { name: 'Sarah Jenkins', role: 'Senior Developer', hours: 145 },
    { name: 'Michael Chen', role: 'Cloud Architect', hours: 132 },
    { name: 'David Smith', role: 'Data Scientist', hours: 128 },
    { name: 'Priya Patel', role: 'DevOps Engineer', hours: 115 },
    { name: 'Emma Wilson', role: 'Product Manager', hours: 108 }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      <PremiumPageHeader
        title="Learning Hours Analytics"
        description="Visibility into organizational and individual learning time investments."
        icon={Clock}
        badgeText="Time Investment"
        badgeColor="amber"
      />

      {/* SECTION 1: Organizational & Learner Metrics */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" /> Core Investment Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <MetricCard 
            title="Total Learning Hours" 
            value={metrics.orgLevel.totalLearningHours.toLocaleString()} 
            icon={Timer} 
            description="Organization Level"
            className="shadow-sm border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20" 
          />
          <MetricCard 
            title="Avg Hours per Employee" 
            value={metrics.orgLevel.avgPerEmployee} 
            icon={Building2} 
            description="Organization Level"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Avg Hours per Active Learner" 
            value={metrics.learnerLevel.avgPerActiveLearner} 
            icon={Users} 
            description="Learner Level"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2: Region & Project Level Hours */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" /> Region & Project Demographics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComparisonChart 
            title="Average Learning Hours by Region"
            description="Region Level Time Investment"
            data={regionHoursData}
            xAxisKey="region"
            bars={[{ dataKey: 'avgHours', name: 'Avg Hours', color: '#059669' }]}
            className="shadow-md"
          />
          <ComparisonChart 
            title="Average Learning Hours by Project"
            description="Project Level Time Investment"
            data={projectHoursData}
            xAxisKey="project"
            bars={[{ dataKey: 'avgHours', name: 'Avg Hours', color: '#3b82f6' }]}
            className="shadow-md"
          />
        </div>
      </div>

      {/* SECTION 3: Additional Insights (Top 10s) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" /> Additional Insights
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Learners */}
          <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-5 border-b border-gray-100 dark:border-gray-800/50 relative z-10">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" /> Top Active Learners
              </h3>
            </div>
            <div className="p-5 relative z-10">
              <div className="space-y-4">
                {topLearners.map((learner, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                        {learner.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{learner.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{learner.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="font-bold border-gray-200 dark:border-[#2e2e3e] text-gray-700 dark:text-gray-300">{learner.hours} hrs</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Projects */}
          <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-5 border-b border-gray-100 dark:border-gray-800/50 relative z-10">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Network className="w-4 h-4 text-blue-500" /> Top Learning-Focused Projects
              </h3>
            </div>
            <div className="p-5 relative z-10">
              <div className="space-y-4">
                {projectHoursData.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{p.project}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Strategic Initiative</p>
                    </div>
                    <Badge variant="secondary" className="font-bold bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">{p.avgHours} hrs/emp</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Regions */}
          <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-5 border-b border-gray-100 dark:border-gray-800/50 relative z-10">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" /> Top Learning-Focused Regions
              </h3>
            </div>
            <div className="p-5 relative z-10">
              <div className="space-y-4">
                {regionHoursData.map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{r.region}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Global Hub</p>
                    </div>
                    <Badge variant="outline" className="font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none">{r.avgHours} hrs/emp</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
