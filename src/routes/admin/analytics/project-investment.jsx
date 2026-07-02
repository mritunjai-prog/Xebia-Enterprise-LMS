import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService, CategoryService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Briefcase, TrendingUp, Layers, Flag, Users, CheckCircle2, Server, Database, Activity, ShieldCheck, Map, CreditCard, PieChart, LineChart, Cpu, BookOpen, Search, Building2, Shield, BrainCircuit, Clock, Trophy, Crown, Target } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/project-investment')({
  component: ProjectInvestmentDashboard,
});

function ProjectInvestmentDashboard() {
  const { filters } = useAnalyticsFilters();

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: CourseService.getCourses,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: CategoryService.getCategories,
  });

  if (coursesLoading || categoriesLoading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Project Investment & Fresher Journey</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Enterprise workforce transformation and strategic deployment</p>
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
  const categoryList = categories || [];

  // ==========================================
  // DATA POLICY: CATEGORY B (Safe Inference)
  // ==========================================
  const publishedCourses = courseList.filter(c => c.published || c.isPublished);
  
  const categoriesWithCourses = new Set();
  const categoryCounts = {};
  
  courseList.forEach(c => {
    const catId = c.category?.id || c.categoryId;
    if (catId) {
      categoriesWithCourses.add(catId);
      categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
    }
  });

  const sortedCategories = [...categoryList].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  let maxCatCount = 0;
  let largestCatId = null;
  Object.entries(categoryCounts).forEach(([id, count]) => {
    if (count > maxCatCount) {
      maxCatCount = count;
      largestCatId = id;
    }
  });
  const mostActiveDomain = categoryList.find(c => String(c.id) === String(largestCatId));

  const detectProgram = (keywords) => {
    return courseList.filter(c => {
      const text = `${c.title} ${c.description || ''} ${c.category?.name || ''}`.toLowerCase();
      return keywords.some(kw => text.includes(kw));
    });
  };

  const techCourses = detectProgram(['tech', 'code', 'software', 'develop', 'programming', 'engineering', 'java', 'react', 'spring']);
  const aiCourses = detectProgram(['ai', 'gpt', 'genai', 'artificial intelligence', 'machine learning', 'data science']);
  const leadershipCourses = detectProgram(['leadership', 'management', 'executive', 'agile', 'scrum master']);
  const complianceCourses = detectProgram(['compliance', 'security', 'gdpr', 'policy', 'ethics', 'mandatory']);
  const cloudCourses = detectProgram(['cloud', 'aws', 'azure', 'gcp', 'devops', 'kubernetes', 'docker']);

  // Mock Enterprise Data for Section 11: Project Investment
  const topProjectsData = [
    { project: 'Cloud Migration X', investment: 1250 },
    { project: 'AI Customer Portal', investment: 980 },
    { project: 'Core Banking Rewrite', investment: 850 },
    { project: 'ERP Upgrade 2024', investment: 720 },
    { project: 'Data Lake Initiative', investment: 640 }
  ];

  const fresherPipelineData = [
    { stage: 'Campus Hired', count: 450, color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-900' },
    { stage: 'Induction Completed', count: 420, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900' },
    { stage: 'Foundation Training', count: 390, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900' },
    { stage: 'Technical Learning', count: 350, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900' },
    { stage: 'Project Allocated', count: 310, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900' },
    { stage: 'Billable Deployment', count: 280, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900' }
  ];

  const projectRoadmap = [
    { name: 'Project Budget Tracking', icon: CreditCard, entity: 'ProjectBudgetEntity', api: '/api/finance/budgets', value: 'Monitor learning spend vs project allocation', phase: 'Phase 6' },
    { name: 'Learning Cost Analytics', icon: PieChart, entity: 'CostAllocationEntity', api: '/api/finance/costs', value: 'Calculate exact ROI of technical upskilling', phase: 'Phase 6' },
    { name: 'ROI Dashboard', icon: TrendingUp, entity: 'ROIEntity', api: '/api/finance/roi', value: 'Executive dashboard for enterprise learning return', phase: 'Phase 6' },
    { name: 'Utilization Reports', icon: Activity, entity: 'ResourceUtilizationEntity', api: '/api/projects/utilization', value: 'Track bench-to-billing conversion rates', phase: 'Phase 7' },
    { name: 'Billability Analytics', icon: LineChart, entity: 'BillingAnalyticsEntity', api: '/api/projects/billing', value: 'Map learning outcomes to increased billable hours', phase: 'Phase 7' },
    { name: 'Project Skill Mapping', icon: Target, entity: 'SkillRequirementEntity', api: '/api/projects/skills', value: 'Automated talent matching for upcoming projects', phase: 'Phase 7' }
  ];

  const hrRoadmap = [
    { name: 'Campus Management', icon: Users, entity: 'CampusDriveEntity', api: '/api/hr/campus', value: 'End-to-end university recruiting and onboarding', phase: 'Phase 5' },
    { name: 'SAP SuccessFactors', icon: Database, entity: 'SAPIntegrationNode', api: '/api/integrations/sap', value: 'Sync global enterprise HR data automatically', phase: 'Phase 5' },
    { name: 'Workday Integration', icon: Server, entity: 'WorkdaySyncNode', api: '/api/integrations/workday', value: 'Seamless bidirectional talent mapping', phase: 'Phase 6' },
    { name: 'Oracle HCM', icon: Building2, entity: 'OracleSyncNode', api: '/api/integrations/oracle', value: 'Core enterprise human capital management', phase: 'Phase 6' },
    { name: 'Internal Talent Marketplace', icon: Search, entity: 'TalentMarketEntity', api: '/api/hr/marketplace', value: 'Allow employees to bid on internal projects', phase: 'Phase 7' },
    { name: 'Career Path Engine', icon: Map, entity: 'CareerPathEntity', api: '/api/hr/career-paths', value: 'AI-driven long-term promotional tracking', phase: 'Phase 7' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Premium Gradient Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-indigo-500/10">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Briefcase className="w-64 h-64 text-indigo-400" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-indigo-500/30 text-indigo-200 border-indigo-400/30 px-3 py-1 backdrop-blur-md">
              Enterprise Workforce Transformation
            </Badge>
            <Badge className="bg-orange-500/30 text-orange-200 border-orange-400/30 px-3 py-1 backdrop-blur-md">
              Final Analytics Module
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Project Investment & Fresher Journey</h1>
          <p className="mt-3 text-indigo-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Evaluate strategic workforce development from campus hiring to billable project deployment.
          </p>
        </div>
      </div>

      {/* SECTION 1: Top Projects */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Top 5 Projects with Highest Learning Investment
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6 border-border/50 shadow-md">
            <ComparisonChart 
              title="Learning Investment Hours"
              description="Total hours invested by employees allocated to these projects"
              data={topProjectsData}
              xAxisKey="project"
              bars={[{ dataKey: 'investment', name: 'Investment (Hours)', color: '#4f46e5' }]}
            />
          </Card>
        </div>
      </div>

      {/* SECTION 2: Fresher Pipeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Map className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Fresher Campus to Project Pipeline
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fresherPipelineData.map((stage, idx) => (
            <Card key={idx} className={`p-6 border-border/50 shadow-sm flex flex-col items-center text-center justify-center relative overflow-hidden ${stage.bg}`}>
              {idx < fresherPipelineData.length - 1 && (
                 <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 hidden md:block">
                   <ShieldCheck className="w-8 h-8" />
                 </div>
              )}
              <h3 className="font-bold text-foreground text-sm mb-2">{stage.stage}</h3>
              <div className="flex items-end gap-2">
                <span className={`text-4xl font-black ${stage.color}`}>{stage.count}</span>
                <span className="text-xs text-muted-foreground font-medium mb-1">Employees</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION 3: Project Investment Roadmap */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Map className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Project Investment Roadmap
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl mb-6">
          The following features will connect LMS capabilities to ERP and Project Management tracking systems for true ROI calculation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectRoadmap.map((roadmap, idx) => {
            const Icon = roadmap.icon;
            return (
              <Card key={idx} className="overflow-hidden border-dashed border-2 border-indigo-500/20 bg-indigo-50/10 dark:bg-indigo-950/10 transition-colors hover:border-indigo-500/40">
                <div className="p-4 border-b border-border/50 bg-muted/20 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="font-bold text-foreground text-sm">{roadmap.name}</h3>
                  </div>
                  <Badge className="bg-indigo-500 text-white hover:bg-indigo-600 whitespace-nowrap ml-2 text-[10px] px-1.5 py-0">{roadmap.phase}</Badge>
                </div>
                <div className="p-4 space-y-2 bg-card/50">
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                    <span className="text-muted-foreground font-medium flex items-center gap-1.5 text-[10px] uppercase"><Database className="w-3 h-3" /> Entity</span>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-indigo-600 dark:text-indigo-400 w-max">{roadmap.entity}</code>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                    <span className="text-muted-foreground font-medium flex items-center gap-1.5 text-[10px] uppercase"><Server className="w-3 h-3" /> API</span>
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 w-max">{roadmap.api}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-start gap-2 text-sm pt-2 border-t border-border/30">
                    <span className="text-muted-foreground font-medium flex items-center gap-1.5 text-[10px] uppercase"><Briefcase className="w-3 h-3" /> Value</span>
                    <span className="text-foreground text-xs leading-relaxed">{roadmap.value}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: Fresher Journey (Premium Empty States) */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Fresher Journey Details
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl mb-6">
          Tracking the lifecycle of new campus hires requires robust integration with HR workflows. Data fabrication is strictly prohibited.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EmptyState title="Campus Hiring" description="Requires integration with University Recruiting ATS tables." icon={<Users className="w-8 h-8 text-blue-500/30 mb-4" />} />
          <EmptyState title="HR Induction" description="Requires organizational onboarding checklist API integration." icon={<CheckCircle2 className="w-8 h-8 text-emerald-500/30 mb-4" />} />
          <EmptyState title="Foundation Training" description="Requires Cohort Management and bootcamp scheduling entities." icon={<BookOpen className="w-8 h-8 text-amber-500/30 mb-4" />} />
          <EmptyState title="Technical Learning" description="Requires deep skill-gap mapping against project requirements." icon={<Cpu className="w-8 h-8 text-purple-500/30 mb-4" />} />
          <EmptyState title="Project Allocation" description="Requires Resource Management system synchronization." icon={<Map className="w-8 h-8 text-rose-500/30 mb-4" />} />
          <EmptyState title="Billable Deployment" description="Requires Timesheet and Finance Module integration." icon={<Briefcase className="w-8 h-8 text-indigo-500/30 mb-4" />} />
        </div>
      </div>

      {/* SECTION 5: Enterprise Workforce Roadmap */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Enterprise Workforce Roadmap
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hrRoadmap.map((roadmap, idx) => {
            const Icon = roadmap.icon;
            return (
              <Card key={idx} className="overflow-hidden border border-border/50 shadow-sm transition-colors hover:shadow-md hover:border-indigo-500/30">
                <div className="p-4 border-b border-border/50 bg-card flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">{roadmap.name}</h3>
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 text-[10px]">{roadmap.phase}</Badge>
                </div>
                <div className="p-4 space-y-3 bg-muted/10">
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                    <span className="text-muted-foreground font-medium text-xs">Entity</span>
                    <code className="text-xs bg-card px-1.5 py-0.5 rounded border border-border/50 font-mono text-foreground w-max">{roadmap.entity}</code>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                    <span className="text-muted-foreground font-medium text-xs">API</span>
                    <code className="text-xs bg-card px-1.5 py-0.5 rounded border border-border/50 font-mono text-foreground w-max">{roadmap.api}</code>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-start gap-2 text-sm pt-2 border-t border-border/30">
                    <span className="text-muted-foreground font-medium text-xs mt-0.5">Value</span>
                    <span className="text-foreground text-xs leading-relaxed">{roadmap.value}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* SECTION 6: Analytics Completion */}
      <div className="space-y-4 pt-12 pb-6 border-t border-border/50 flex flex-col items-center">
        <Card className="w-full max-w-4xl p-1 relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 shadow-2xl rounded-2xl animate-in zoom-in duration-1000 delay-300">
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm" />
          <div className="bg-card dark:bg-card p-10 rounded-xl relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black text-foreground mb-2">Enterprise Analytics Platform</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              All 11 enterprise data dashboards have been successfully architected, integrated, and deployed within the LMS Admin ecosystem.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left mb-10">
              {[
                'Executive Overview', 'Learning Coverage', 'Learning Hours', 'Learning Pillars', 
                'AI Transformation', 'Certifications', 'Flagship Programs', 'Learning Trends', 
                'Training Effectiveness', 'Learning Champions', 'Project Investment'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm px-6 py-2 shadow-lg border-0 uppercase tracking-widest font-black">
              Enterprise Analytics Suite Successfully Implemented
            </Badge>
          </div>
        </Card>
      </div>

      {/* SECTION 7: Related Dashboards */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Analytics Suite
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Link to="/admin/analytics">
            <Card className="p-4 hover:bg-muted/50 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-center gap-2 bg-indigo-50/50 dark:bg-indigo-900/20">
              <Activity className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Analytics Home</span>
            </Card>
          </Link>
          <Link to="/admin/analytics/executive">
            <Card className="p-4 hover:bg-muted/50 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-center gap-2">
              <Activity className="w-5 h-5 text-slate-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Executive Overview</span>
            </Card>
          </Link>
          <Link to="/admin/analytics/coverage">
            <Card className="p-4 hover:bg-muted/50 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-center gap-2">
              <Target className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Learning Coverage</span>
            </Card>
          </Link>
          <Link to="/admin/analytics/hours">
            <Card className="p-4 hover:bg-muted/50 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-center gap-2">
              <Clock className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Learning Hours</span>
            </Card>
          </Link>
          <Link to="/admin/analytics/pillars">
            <Card className="p-4 hover:bg-muted/50 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Learning Pillars</span>
            </Card>
          </Link>
          <Link to="/admin/analytics/certifications">
            <Card className="p-4 hover:bg-muted/50 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-center gap-2">
              <Trophy className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Certifications</span>
            </Card>
          </Link>
          <Link to="/admin/analytics/training-effectiveness">
            <Card className="p-4 hover:bg-muted/50 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Training Effectiveness</span>
            </Card>
          </Link>
          <Link to="/admin/analytics/learning-champions">
            <Card className="p-4 hover:bg-muted/50 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col items-center text-center h-full justify-center gap-2">
              <Crown className="w-5 h-5 text-fuchsia-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Learning Champions</span>
            </Card>
          </Link>
        </div>
      </div>

    </div>
  );
}
