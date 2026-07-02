import { createFileRoute, Link } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Target, Clock, Building2, Sparkles, Trophy, Flag, TrendingUp, ShieldCheck, Crown, Briefcase, BarChart3, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/admin/analytics/')({
  component: AnalyticsIndex,
});

function AnalyticsIndex() {
  const dashboards = [
    {
      title: 'Executive Overview',
      description: 'High-level snapshot of platform engagement, user growth, and catalog health.',
      icon: Activity,
      path: '/admin/analytics/executive',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Learning Coverage',
      description: 'Analyze content distribution and identify skill gaps across enterprise roles.',
      icon: Target,
      path: '/admin/analytics/coverage',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Learning Hours',
      description: 'Deep dive into learner engagement, time spent, and seasonal learning patterns.',
      icon: Clock,
      path: '/admin/analytics/hours',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      title: 'Learning Pillars',
      description: 'Track strategic capabilities like Technical Engineering and Agile delivery.',
      icon: Building2,
      path: '/admin/analytics/pillars',
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    },
    {
      title: 'AI Transformation',
      description: 'Monitor enterprise adoption of GenAI, Copilot, and intelligent workflows.',
      icon: Sparkles,
      path: '/admin/analytics/ai-transformation',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Certifications',
      description: 'Enterprise credential tracking and external vendor certification metrics.',
      icon: Trophy,
      path: '/admin/analytics/certifications',
      color: 'text-rose-500',
      bg: 'bg-rose-500/10'
    },
    {
      title: 'Flagship Programs',
      description: 'Strategic academies, bootcamps, and executive-sponsored learning tracks.',
      icon: Flag,
      path: '/admin/analytics/flagship-programs',
      color: 'text-fuchsia-500',
      bg: 'bg-fuchsia-500/10'
    },
    {
      title: 'Learning Trends',
      description: 'Historical catalog momentum and emerging technology focus areas.',
      icon: TrendingUp,
      path: '/admin/analytics/learning-trends',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    },
    {
      title: 'Training Effectiveness',
      description: 'Quality assurance metrics, content richness, and catalog health indicators.',
      icon: ShieldCheck,
      path: '/admin/analytics/training-effectiveness',
      color: 'text-teal-500',
      bg: 'bg-teal-500/10'
    },
    {
      title: 'Learning Champions',
      description: 'Enterprise recognition, gamification engine, and learner achievements.',
      icon: Crown,
      path: '/admin/analytics/learning-champions',
      color: 'text-rose-600',
      bg: 'bg-rose-600/10'
    },
    {
      title: 'Project Investment',
      description: 'Strategic workforce transformation, bench management, and fresher journeys.',
      icon: Briefcase,
      path: '/admin/analytics/project-investment',
      color: 'text-indigo-600',
      bg: 'bg-indigo-600/10'
    }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Premium Gradient Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 sm:p-10 text-white shadow-2xl border border-slate-700/50">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <BarChart3 className="w-64 h-64 text-slate-300" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-3 py-1 mb-4 backdrop-blur-md">
            Enterprise Module Complete
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Enterprise Analytics Suite</h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Welcome to the centralized hub for enterprise learning analytics. Select a dashboard below to analyze workforce transformation, strategic capabilities, and operational catalog health.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dashboards.map((dashboard, idx) => {
          const Icon = dashboard.icon;
          return (
            <Link key={idx} to={dashboard.path} className="block group h-full">
              <Card className="h-full p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-400/50 dark:hover:border-slate-500/50 flex flex-col relative overflow-hidden bg-gradient-to-br from-card to-muted/10 border-border/50">
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${dashboard.bg}`} />
                
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner border border-white/10 ${dashboard.bg}`}>
                    <Icon className={`w-6 h-6 ${dashboard.color}`} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="relative z-10 mt-auto">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{dashboard.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{dashboard.description}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
