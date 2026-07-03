import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { PremiumPageHeader } from '@/admin/features/analytics/components/layout/PremiumPageHeader';
import { Target, Star, FileText, CheckCircle2, TrendingUp, Award, Brain, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/training-effectiveness')({
  component: TrainingEffectivenessDashboard,
});

function TrainingEffectivenessDashboard() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 9: Training Effectiveness
  const metrics = {
    csatScore: 4.6, // out of 5
    preAssessmentAvg: 58,
    postAssessmentAvg: 85,
    applicationToProjects: 72 // percentage
  };

  const assessmentData = [
    { module: 'Cloud Native', preScore: 60, postScore: 88 },
    { module: 'Generative AI', preScore: 45, postScore: 82 },
    { module: 'Data Eng', preScore: 55, postScore: 84 },
    { module: 'Agile', preScore: 65, postScore: 90 },
    { module: 'Security', preScore: 50, postScore: 85 }
  ];

  const feedbackDistribution = [
    { name: '5 Stars', value: 65, color: '#10b981' },
    { name: '4 Stars', value: 25, color: '#3b82f6' },
    { name: '3 Stars', value: 7, color: '#f59e0b' },
    { name: 'Below 3', value: 3, color: '#ef4444' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      <PremiumPageHeader
        title="Training Effectiveness"
        description="Evaluate the impact of learning programs through satisfaction scores, assessment improvements, and practical application to projects."
        icon={Award}
        badgeText="Quality & Impact"
        badgeColor="emerald"
      />

      {/* SECTION 1: Executive KPIs */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Effectiveness KPIs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Average CSAT Score" 
            value={`${metrics.csatScore} / 5.0`} 
            icon={Star} 
            description="Overall Learner Satisfaction"
            className="shadow-sm border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20" 
          />
          <MetricCard 
            title="Pre-Training Avg Score" 
            value={`${metrics.preAssessmentAvg}%`} 
            icon={FileText} 
            description="Baseline Knowledge"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Post-Training Avg Score" 
            value={`${metrics.postAssessmentAvg}%`} 
            icon={CheckCircle2} 
            description="Knowledge Retained"
            className="shadow-sm border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20" 
          />
          <MetricCard 
            title="Application to Projects" 
            value={`${metrics.applicationToProjects}%`} 
            icon={Briefcase} 
            description="Learnings Applied on Job"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2: Assessment Improvements & Feedback */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Knowledge Acquisition
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart 
              title="Pre vs Post Assessment Scores"
              description="Improvement across key learning modules"
              data={assessmentData}
              xAxisKey="module"
              bars={[
                { dataKey: 'preScore', name: 'Pre-Assessment', color: '#94a3b8' },
                { dataKey: 'postScore', name: 'Post-Assessment', color: '#059669' }
              ]}
              className="shadow-md h-full border-border/50"
            />
          </div>
          <div className="lg:col-span-1">
            <DonutChart 
              title="Feedback Distribution"
              description="Learner CSAT breakdown"
              data={feedbackDistribution}
              className="shadow-md h-full border-border/50"
            />
          </div>
        </div>
      </div>
      
      {/* SECTION 3: Application Impact Highlights */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Application Impact
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="relative group p-5 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 border-l-4 border-l-emerald-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Highest Improvement</p>
              <div>
                <p className="font-bold text-gray-900 dark:text-white truncate">Generative AI</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">+37% Score Increase</p>
              </div>
            </div>
          </div>
          
          <div className="relative group p-5 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 border-l-4 border-l-blue-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Most Practical Application</p>
              <div>
                <p className="font-bold text-gray-900 dark:text-white truncate">Cloud Native Architecture</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">85% applied to active projects</p>
              </div>
            </div>
          </div>
          
          <div className="relative group p-5 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 border-l-4 border-l-fuchsia-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Top Rated Module</p>
              <div>
                <p className="font-bold text-gray-900 dark:text-white truncate">Agile Leadership</p>
                <p className="text-sm text-fuchsia-600 dark:text-fuchsia-400 font-medium mt-1">4.8 / 5.0 Average CSAT</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
