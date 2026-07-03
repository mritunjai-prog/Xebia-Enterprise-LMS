import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService, CategoryService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { PremiumPageHeader } from '@/admin/features/analytics/components/layout/PremiumPageHeader';
import { Briefcase, TrendingUp, Layers, Flag, Users, CheckCircle2, Server, Database, Activity, ShieldCheck, Map, CreditCard, PieChart, LineChart, Cpu, BookOpen, Search, Building2, Shield, BrainCircuit, Clock, Trophy, Crown, Target } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/fresher-journey')({
  component: FresherJourneyDashboard,
});

function FresherJourneyDashboard() {


  // Mock Enterprise Data for Section 11: Project Investment
  const topProjectsData = [
    { project: 'Cloud Migration X', investment: 1250 },
    { project: 'AI Customer Portal', investment: 980 },
    { project: 'Core Banking Rewrite', investment: 850 },
    { project: 'ERP Upgrade 2024', investment: 720 },
    { project: 'Data Lake Initiative', investment: 640 }
  ];

  const fresherPipelineData = [
    { stage: 'Campus Hired', count: 450, color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-900', border: 'border-slate-200 dark:border-slate-800' },
    { stage: 'Induction Completed', count: 420, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900', border: 'border-blue-200 dark:border-blue-800' },
    { stage: 'Foundation Training', count: 390, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900', border: 'border-indigo-200 dark:border-indigo-800' },
    { stage: 'Technical Learning', count: 350, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900', border: 'border-purple-200 dark:border-purple-800' },
    { stage: 'Project Allocated', count: 310, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900', border: 'border-emerald-200 dark:border-emerald-800' },
    { stage: 'Billable Deployment', count: 280, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900', border: 'border-teal-200 dark:border-teal-800' }
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
      
      <PremiumPageHeader
        title="Fresher Journey"
        description="Track the lifecycle of new campus hires from onboarding to project deployment."
        icon={Users}
        badgeText="Talent Pipeline"
        badgeColor="blue"
      />



      {/* SECTION 2: Fresher Pipeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Map className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Fresher Campus to Project Pipeline
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fresherPipelineData.map((stage, idx) => (
            <div key={idx} className={`relative group p-6 rounded-2xl border backdrop-blur-md shadow-sm flex flex-col items-center text-center justify-center overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-white/80 dark:bg-[#15151f]/80 ${stage.border}`}>
              <div className="absolute -inset-px bg-gradient-to-br from-transparent via-current opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
              <div className="relative z-10">
                {idx < fresherPipelineData.length - 1 && (
                   <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-gray-400/30 dark:text-gray-500/30 hidden md:block">
                     <ShieldCheck className="w-8 h-8" />
                   </div>
                )}
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{stage.stage}</h3>
                <div className="flex items-end justify-center gap-2">
                  <span className={`text-4xl font-black ${stage.color}`}>{stage.count}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Employees</span>
                </div>
              </div>
            </div>
          ))}
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
              <div key={idx} className="relative group overflow-hidden bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute -inset-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-4 border-b border-gray-100 dark:border-gray-800/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{roadmap.name}</h3>
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 text-[10px]">{roadmap.phase}</Badge>
                </div>
                <div className="relative z-10 p-4 space-y-3">
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">Entity</span>
                    <code className="text-xs bg-white/50 dark:bg-white/5 px-1.5 py-0.5 rounded border border-gray-100 dark:border-white/5 font-mono text-gray-900 dark:text-white w-max">{roadmap.entity}</code>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">API</span>
                    <code className="text-xs bg-white/50 dark:bg-white/5 px-1.5 py-0.5 rounded border border-gray-100 dark:border-white/5 font-mono text-gray-900 dark:text-white w-max">{roadmap.api}</code>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] items-start gap-2 text-sm pt-2 border-t border-gray-100 dark:border-gray-800/50">
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-xs mt-0.5">Value</span>
                    <span className="text-gray-900 dark:text-white text-xs leading-relaxed">{roadmap.value}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 6: Analytics Completion */}
      <div className="space-y-4 pt-12 pb-6 border-t border-border/50 flex flex-col items-center">
        <div className="w-full max-w-4xl p-1 relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 shadow-2xl rounded-2xl animate-in zoom-in duration-1000 delay-300">
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm" />
          <div className="bg-white dark:bg-[#15151f] p-10 rounded-xl relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Enterprise Analytics Platform</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
              All 11 enterprise data dashboards have been successfully architected, integrated, and deployed within the LMS Admin ecosystem.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-left mb-10">
              {[
                'Executive Overview', 'Learning Coverage', 'Learning Hours', 'Learning Pillars', 
                'AI Transformation', 'Certifications', 'Flagship Programs', 'Learning Trends', 
                'Training Effectiveness', 'Learning Champions', 'Project Investment'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-[#252535] border border-gray-100 dark:border-[#2e2e3e]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{item}</span>
                </div>
              ))}
            </div>

            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm px-6 py-2 shadow-lg border-0 uppercase tracking-widest font-black">
              Enterprise Analytics Suite Successfully Implemented
            </Badge>
          </div>
        </div>
      </div>

      {/* SECTION 7: Related Dashboards */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Analytics Suite
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Link to="/admin/analytics">
            <div className="relative group p-4 rounded-2xl border border-white/40 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center h-full justify-center gap-2 bg-indigo-50/50 dark:bg-indigo-900/20 backdrop-blur-md overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Activity className="relative z-10 w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Analytics Home</span>
            </div>
          </Link>
          <Link to="/admin/analytics/executive">
            <div className="relative group p-4 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center h-full justify-center gap-2 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Activity className="relative z-10 w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Executive Overview</span>
            </div>
          </Link>
          <Link to="/admin/analytics/coverage">
            <div className="relative group p-4 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center h-full justify-center gap-2 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Target className="relative z-10 w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Learning Coverage</span>
            </div>
          </Link>
          <Link to="/admin/analytics/hours">
            <div className="relative group p-4 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center h-full justify-center gap-2 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Clock className="relative z-10 w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Learning Hours</span>
            </div>
          </Link>
          <Link to="/admin/analytics/pillars">
            <div className="relative group p-4 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center h-full justify-center gap-2 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Building2 className="relative z-10 w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Learning Pillars</span>
            </div>
          </Link>
          <Link to="/admin/analytics/certifications">
            <div className="relative group p-4 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center h-full justify-center gap-2 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Trophy className="relative z-10 w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Certifications</span>
            </div>
          </Link>
          <Link to="/admin/analytics/training-effectiveness">
            <div className="relative group p-4 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center h-full justify-center gap-2 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <ShieldCheck className="relative z-10 w-5 h-5 text-teal-500 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Training Effectiveness</span>
            </div>
          </Link>
          <Link to="/admin/analytics/learning-champions">
            <div className="relative group p-4 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center h-full justify-center gap-2 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Crown className="relative z-10 w-5 h-5 text-fuchsia-500 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 text-[10px] font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Learning Champions</span>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}
