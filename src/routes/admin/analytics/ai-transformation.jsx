import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { Sparkles, BrainCircuit, Bot, Zap, Code2, LineChart, Network, GraduationCap, ShieldCheck, Database } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/ai-transformation')({
  component: AITransformation,
});

function AITransformation() {
  const { filters } = useAnalyticsFilters();

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: CourseService.getCourses,
  });

  if (coursesLoading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">AI Transformation</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Enterprise AI adoption and upskilling metrics</p>
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

  // Frontend Aggregation (Category B): Count AI-related courses
  const aiCourses = courseList.filter(c => {
    const text = `${c.title} ${c.category?.name}`.toLowerCase();
    return text.includes('ai') || text.includes('artificial intelligence') || text.includes('machine learning') || text.includes('prompt') || text.includes('copilot') || text.includes('gpt');
  });

  const totalAICourses = aiCourses.length;

  // Breakdown of AI skills (Heuristics)
  let genAI = 0;
  let ml = 0;
  let promptEng = 0;

  aiCourses.forEach(c => {
    const text = `${c.title} ${c.category?.name}`.toLowerCase();
    if (text.includes('generative') || text.includes('gpt') || text.includes('llm')) genAI++;
    else if (text.includes('machine learning') || text.includes('data')) ml++;
    else promptEng++; // Fallback/General
  });

  const aiSkillsData = [
    { name: 'Generative AI', value: genAI, color: '#8b5cf6' },
    { name: 'Machine Learning', value: ml, color: '#ec4899' },
    { name: 'Prompt Engineering', value: promptEng, color: '#0ea5e9' }
  ].filter(d => d.value > 0);

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
            Monitor organizational AI readiness, Copilot telemetry, and learning adoption. Deep telemetry visualizations are pending integration with the Enterprise AI Gateway.
          </p>
        </div>
      </div>

      {/* SECTION 1: AI Transformation Overview (KPIs) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Transformation Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="AI Learning Curriculum" 
            value={totalAICourses} 
            icon={GraduationCap} 
            description="Active AI-focused courses"
            className="shadow-sm border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20" 
          />
          <MetricCard 
            title="Copilot Adoption" 
            value="--" 
            icon={Bot} 
            description="Telemetry Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
          <MetricCard 
            title="Azure AI Consumption" 
            value="--" 
            icon={Database} 
            description="Telemetry Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
          <MetricCard 
            title="Enterprise AI Readiness" 
            value="--" 
            icon={Zap} 
            description="Telemetry Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Learning Adoption & Readiness */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <LineChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Adoption & Readiness
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-8 border-border/50 shadow-md bg-card/50 backdrop-blur-sm">
             <EmptyState 
              title="AI Learning Adoption Timeline" 
              description="This metric requires employee-level AI platform activity and LMS progress data which is not currently aggregated in the backend." 
              icon={<LineChart className="w-10 h-10 text-muted-foreground/30 mb-4" />}
            />
          </Card>
          <Card className="p-8 border-border/50 shadow-md bg-card/50 backdrop-blur-sm">
             <EmptyState 
              title="Organizational AI Readiness %" 
              description="Calculating the enterprise AI Readiness score requires fusing HR employee metadata together with AI tool telemetry (GitHub Copilot, Azure OpenAI)." 
              icon={<ShieldCheck className="w-10 h-10 text-muted-foreground/30 mb-4" />}
            />
          </Card>
        </div>
      </div>

      {/* SECTION 4: AI Skills Distribution */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> AI Skills Distribution
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            {aiSkillsData.length > 0 ? (
              <DonutChart 
                title="AI Curriculum Taxonomy"
                description="Breakdown of AI-related courses"
                data={aiSkillsData}
                className="shadow-md h-full border-indigo-500/10"
              />
            ) : (
              <Card className="p-8 h-full bg-card/50 border-border/50 shadow-md flex items-center justify-center">
                <EmptyState 
                  title="No AI Courses Detected" 
                  description="Currently, no courses match the AI taxonomy keywords. Publish GenAI or Machine Learning content to populate this chart." 
                />
              </Card>
            )}
          </div>
          <div className="lg:col-span-2">
             <Card className="p-8 h-full bg-card/50 border-border/50 shadow-md">
               <EmptyState 
                  title="Employee Skill Verification" 
                  description="Displaying the distribution of certified AI skills across the workforce requires integration with the upcoming Assessment and External Certification modules." 
                  icon={<Code2 className="w-10 h-10 text-muted-foreground/30 mb-4" />}
                />
             </Card>
          </div>
        </div>
      </div>

      {/* SECTION 5: Future Enterprise AI Metrics */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Future AI Telemetry Integration
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl mb-6">
          The following visualizations require enterprise AI telemetry collected directly from Microsoft Copilot, Azure OpenAI, or equivalent corporate AI gateways.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EmptyState 
            title="Copilot Engagement" 
            description="Requires an API bridge to the Microsoft 365 Graph API to track organizational Copilot utilization and prompt frequencies." 
            icon={<Bot className="w-8 h-8 text-indigo-500/30 mb-4" />}
          />
          <EmptyState 
            title="OpenAI Token Consumption" 
            description="Requires billing and telemetry sync with the Azure OpenAI Gateway to map token usage back to specific Business Units." 
            icon={<Database className="w-8 h-8 text-pink-500/30 mb-4" />}
          />
          <EmptyState 
            title="AI Productivity Gains" 
            description="Correlating AI tool adoption with developer velocity requires integration with Jira/GitHub metrics pipelines." 
            icon={<Zap className="w-8 h-8 text-amber-500/30 mb-4" />}
          />
        </div>
      </div>

    </div>
  );
}
