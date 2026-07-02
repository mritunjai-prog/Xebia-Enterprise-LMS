import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { Target, Star, FileText, CheckCircle2, TrendingUp, Award, Brain, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
      
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-emerald-500/10">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Award className="w-64 h-64 text-emerald-400" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/30 mb-4 px-3 py-1 backdrop-blur-md">
            Quality & Impact
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Training Effectiveness</h1>
          <p className="mt-3 text-emerald-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Evaluate the impact of learning programs through satisfaction scores, assessment improvements, and practical application to projects.
          </p>
        </div>
      </div>

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
          <Card className="p-5 border-l-4 border-l-emerald-500 shadow-sm border-border/50">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Highest Improvement</p>
            <div>
              <p className="font-bold text-foreground truncate">Generative AI</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">+37% Score Increase</p>
            </div>
          </Card>
          
          <Card className="p-5 border-l-4 border-l-blue-500 shadow-sm border-border/50">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Most Practical Application</p>
            <div>
              <p className="font-bold text-foreground truncate">Cloud Native Architecture</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">85% applied to active projects</p>
            </div>
          </Card>
          
          <Card className="p-5 border-l-4 border-l-fuchsia-500 shadow-sm border-border/50">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Top Rated Module</p>
            <div>
              <p className="font-bold text-foreground truncate">Agile Leadership</p>
              <p className="text-sm text-fuchsia-600 dark:text-fuchsia-400 font-medium mt-1">4.8 / 5.0 Average CSAT</p>
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
