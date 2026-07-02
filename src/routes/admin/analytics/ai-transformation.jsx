import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Sparkles, BrainCircuit, Bot, Zap, Code2, LineChart, Network, GraduationCap, ShieldCheck, Database, Activity, Server, Users, Timer } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
      
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-8 sm:p-10 text-white shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <BrainCircuit className="w-64 h-64 text-white" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-indigo-500/30 text-indigo-200 border-indigo-400/30 mb-4 px-3 py-1 backdrop-blur-md">
            <Sparkles className="w-3 h-3 inline-block mr-1.5" /> Phase 2 Initiative
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">AI Transformation Hub</h1>
          <p className="mt-3 text-indigo-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Monitor organizational AI readiness and upskilling metrics across departments.
          </p>
        </div>
      </div>

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
        
        <Card className="shadow-sm border-border/50 bg-white dark:bg-[#15151f]">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-500" /> Top AI/GenAI Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {topAICourses.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 rounded-lg transition-colors">
                  <div>
                    <p className="text-sm font-bold text-foreground">{course.name}</p>
                    <p className="text-xs text-muted-foreground">{course.category}</p>
                  </div>
                  <Badge variant="secondary" className="font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">{course.learners} Learners</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
