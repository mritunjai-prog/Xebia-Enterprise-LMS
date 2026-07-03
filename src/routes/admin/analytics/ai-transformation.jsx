import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { PremiumPageHeader } from '@/admin/features/analytics/components/layout/PremiumPageHeader';
import { Sparkles, BrainCircuit, Bot, Zap, Code2, LineChart, Network, GraduationCap, ShieldCheck, Database, Activity, Server, Users, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/ai-transformation')({
  component: AITransformation,
});

function AITransformation() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 5: AI Transformation
  const metrics = {
    totalAITrained: 1845,
    totalAIHours: 8500,
    avgAIHours: 4.6,
    activeAICourses: 28
  };

  const deptAIData = [
    { department: 'Engineering', trained: 850 },
    { department: 'Product', trained: 320 },
    { department: 'Data & Analytics', trained: 280 },
    { department: 'Sales', trained: 150 },
    { department: 'Marketing', trained: 120 },
    { department: 'HR', trained: 75 },
    { department: 'Finance', trained: 50 }
  ];

  const topAICourses = [
    { name: 'Generative AI for Leaders', category: 'Leadership', learners: 450 },
    { name: 'GitHub Copilot Mastery', category: 'Technical', learners: 380 },
    { name: 'Prompt Engineering 101', category: 'General', learners: 350 },
    { name: 'Azure OpenAI Integration', category: 'Technical', learners: 280 },
    { name: 'AI Ethics and Security', category: 'Compliance', learners: 210 }
  ];

  const aiSkillsData = [
    { name: 'Generative AI', value: 850, color: '#8b5cf6' },
    { name: 'Machine Learning', value: 450, color: '#ec4899' },
    { name: 'Prompt Engineering', value: 350, color: '#0ea5e9' },
    { name: 'AI Governance', value: 195, color: '#10b981' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      <PremiumPageHeader
        title="AI Transformation Hub"
        description="Monitor organizational AI readiness and upskilling metrics across departments."
        icon={BrainCircuit}
        badgeText="Phase 2 Initiative"
        badgeColor="indigo"
      />

      {/* SECTION 1: AI Transformation Overview (KPIs) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> AI Adoption Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Total AI Trained" 
            value={metrics.totalAITrained} 
            icon={Users} 
            description="Employees trained on AI"
            className="shadow-sm border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20" 
          />
          <MetricCard 
            title="Total AI Hours" 
            value={metrics.totalAIHours.toLocaleString()} 
            icon={Timer} 
            description="Learning hours logged"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Avg AI Hours / Employee" 
            value={metrics.avgAIHours} 
            icon={LineChart} 
            description="Across trained employees"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Active AI Curriculum" 
            value={metrics.activeAICourses} 
            icon={GraduationCap} 
            description="AI/GenAI Courses available"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Department-wise Details & Skills Distribution */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Adoption by Department & Skill
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart 
              title="Department-wise AI Trained Details"
              description="Number of employees trained in AI/GenAI per department."
              data={deptAIData}
              xAxisKey="department"
              bars={[{ dataKey: 'trained', name: 'Employees Trained', color: '#6366f1' }]}
              className="shadow-md h-full"
            />
          </div>
          <div className="lg:col-span-1">
            <DonutChart 
              title="AI Skills Distribution"
              description="Breakdown of specific AI skills acquired"
              data={aiSkillsData}
              className="shadow-md h-full border-indigo-500/10"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Top AI Courses */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Curriculum Popularity
        </h2>
        
        <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
          <div className="absolute -inset-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-5 border-b border-gray-100 dark:border-gray-800/50 relative z-10">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-500" /> Top AI/GenAI Courses
            </h3>
          </div>
          <div className="p-5 relative z-10">
            <div className="space-y-4">
              {topAICourses.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-white/50 dark:hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-indigo-500/20">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{course.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{course.category}</p>
                  </div>
                  <Badge variant="secondary" className="font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">{course.learners} Learners</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
