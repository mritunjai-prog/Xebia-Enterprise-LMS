import { createFileRoute, Link } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Flag, Trophy, Target, Star, Users, Briefcase, Sparkles, Building2, TrendingUp, Lightbulb, GraduationCap, Map, BookOpen, Layers, ArrowRight, ShieldCheck, Database, Server, Clock, Activity, FileCheck, Target as TargetIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';
import { Progress } from '@/components/ui/progress';

export const Route = createFileRoute('/admin/analytics/flagship-programs')({
  component: FlagshipProgramsDashboard,
});

function FlagshipProgramsDashboard() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 7: Flagship Programs
  const metrics = {
    ongoingPrograms: 8,
    enrolledEmployees: 1450,
    averageProgress: 68
  };

  const flagshipProgramsList = [
    { name: 'Xebia Global Leadership Academy', type: 'Leadership', enrolled: 120, progress: 85, status: 'On Track' },
    { name: 'Cloud Native Excellence Bootcamp', type: 'Technical', enrolled: 350, progress: 62, status: 'At Risk' },
    { name: 'AI & Data Science Fast-Track', type: 'AI & GenAI', enrolled: 280, progress: 74, status: 'On Track' },
    { name: 'Enterprise Agile Coach Certification', type: 'Leadership', enrolled: 85, progress: 91, status: 'Ahead' },
    { name: 'Next-Gen Solutions Architect Program', type: 'Upskilling', enrolled: 150, progress: 55, status: 'On Track' },
    { name: 'Graduate Trainee Accelerator (GTA)', type: 'Onboarding', enrolled: 210, progress: 42, status: 'Behind' },
    { name: 'Secure By Design Mastery', type: 'Compliance', enrolled: 180, progress: 78, status: 'On Track' },
    { name: 'Product Management Masterclass', type: 'Upskilling', enrolled: 75, progress: 65, status: 'On Track' }
  ];

  const distributionData = [
    { program: 'Cloud Native', enrolled: 350 },
    { program: 'AI Fast-Track', enrolled: 280 },
    { program: 'GTA', enrolled: 210 },
    { program: 'Secure Design', enrolled: 180 },
    { program: 'Solutions Arch', enrolled: 150 }
  ];

  const typeDistributionData = [
    { name: 'Technical', value: 350, color: '#3b82f6' },
    { name: 'AI & GenAI', value: 280, color: '#8b5cf6' },
    { name: 'Upskilling', value: 225, color: '#10b981' },
    { name: 'Leadership', value: 205, color: '#f59e0b' },
    { name: 'Onboarding', value: 210, color: '#ec4899' },
    { name: 'Compliance', value: 180, color: '#ef4444' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#701a75] via-[#4c1d95] to-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Flag className="w-64 h-64 text-white" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-fuchsia-500/30 text-fuchsia-200 border-fuchsia-400/30 mb-4 px-3 py-1 backdrop-blur-md">
            Enterprise Initiatives
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Flagship Programs</h1>
          <p className="mt-3 text-fuchsia-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Track performance, enrollment, and progress across strategic organization-wide flagship academies and learning programs.
          </p>
        </div>
      </div>

      {/* SECTION 1: Overview KPIs */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Trophy className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" /> Executive Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <MetricCard 
            title="Ongoing Flagship Programs" 
            value={metrics.ongoingPrograms} 
            icon={TargetIcon} 
            description="Active strategic initiatives"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Employees Enrolled" 
            value={metrics.enrolledEmployees.toLocaleString()} 
            icon={Users} 
            description="Across all flagships"
            className="shadow-sm border-fuchsia-500/20 bg-fuchsia-50/50 dark:bg-fuchsia-950/20" 
          />
          <MetricCard 
            title="Average Progress" 
            value={`${metrics.averageProgress}%`} 
            icon={Activity} 
            description="Overall completion rate"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Program Distribution & Types */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" /> Portfolio Distribution
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart 
              title="Top Programs by Enrollment"
              description="Number of employees enrolled in the largest flagships"
              data={distributionData}
              xAxisKey="program"
              bars={[{ dataKey: 'enrolled', name: 'Enrolled Employees', color: '#c026d3' }]}
              className="shadow-md h-full border-border/50"
            />
          </div>
          <div className="lg:col-span-1">
            <DonutChart 
              title="Program Categories"
              description="Distribution of flagship programs by type"
              data={typeDistributionData}
              className="shadow-md h-full border-border/50"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Detailed Flagship Tracking */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Star className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" /> Active Flagship Cohorts
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {flagshipProgramsList.map((program, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between shadow-sm border-border/50 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{program.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{program.type}</p>
                </div>
                <Badge variant="outline" className={
                  program.status === 'Ahead' ? "bg-green-50 text-green-700 border-green-200" :
                  program.status === 'On Track' ? "bg-blue-50 text-blue-700 border-blue-200" :
                  program.status === 'At Risk' ? "bg-amber-50 text-amber-700 border-amber-200" :
                  "bg-rose-50 text-rose-700 border-rose-200"
                }>
                  {program.status}
                </Badge>
              </div>
              
              <div className="space-y-4 mb-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Users className="w-4 h-4" /> Enrolled:</span>
                  <span className="font-bold text-foreground">{program.enrolled}</span>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Activity className="w-4 h-4" /> Cohort Progress:</span>
                    <span className="font-bold text-foreground">{program.progress}%</span>
                  </div>
                  <Progress value={program.progress} className="h-2" indicatorClassName="bg-fuchsia-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
