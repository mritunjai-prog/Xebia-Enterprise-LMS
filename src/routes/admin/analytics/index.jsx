import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { clsx } from 'clsx';
import { Activity, Target, Clock, Building2, Sparkles, Trophy, Flag, TrendingUp, ShieldCheck, Crown, Briefcase, BarChart3, ChevronRight, Users } from 'lucide-react';

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
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-500/20',
      cardBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      ring: 'group-hover:ring-emerald-500/50 dark:group-hover:ring-emerald-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]',
      gradientAccent: 'from-emerald-400 to-emerald-600',
      hoverText: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-400',
      status: 'Live Data',
      statusDot: 'bg-emerald-500'
    },
    {
      title: 'Learning Coverage',
      description: 'Analyze content distribution and identify skill gaps across enterprise roles.',
      icon: Target,
      path: '/admin/analytics/coverage',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-500/20',
      cardBg: 'bg-blue-50 dark:bg-blue-900/20',
      ring: 'group-hover:ring-blue-500/50 dark:group-hover:ring-blue-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]',
      gradientAccent: 'from-blue-400 to-blue-600',
      hoverText: 'group-hover:text-blue-700 dark:group-hover:text-blue-400',
      status: 'Updated',
      statusDot: 'bg-blue-500'
    },
    {
      title: 'Learning Hours',
      description: 'Deep dive into learner engagement, time spent, and seasonal learning patterns.',
      icon: Clock,
      path: '/admin/analytics/hours',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-500/20',
      cardBg: 'bg-amber-50 dark:bg-amber-900/20',
      ring: 'group-hover:ring-amber-500/50 dark:group-hover:ring-amber-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]',
      gradientAccent: 'from-amber-400 to-amber-600',
      hoverText: 'group-hover:text-amber-700 dark:group-hover:text-amber-400',
      status: 'Live Data',
      statusDot: 'bg-amber-500'
    },
    {
      title: 'Learning Pillars',
      description: 'Track strategic capabilities like Technical Engineering and Agile delivery.',
      icon: Building2,
      path: '/admin/analytics/pillars',
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-100 dark:bg-indigo-500/20',
      cardBg: 'bg-indigo-50 dark:bg-indigo-900/20',
      ring: 'group-hover:ring-indigo-500/50 dark:group-hover:ring-indigo-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]',
      gradientAccent: 'from-indigo-400 to-indigo-600',
      hoverText: 'group-hover:text-indigo-700 dark:group-hover:text-indigo-400',
      status: 'Active',
      statusDot: 'bg-indigo-500'
    },
    {
      title: 'AI Transformation',
      description: 'Monitor enterprise adoption of GenAI, Copilot, and intelligent workflows.',
      icon: Sparkles,
      path: '/admin/analytics/ai-transformation',
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-500/20',
      cardBg: 'bg-purple-50 dark:bg-purple-900/20',
      ring: 'group-hover:ring-purple-500/50 dark:group-hover:ring-purple-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]',
      gradientAccent: 'from-purple-400 to-purple-600',
      hoverText: 'group-hover:text-purple-700 dark:group-hover:text-purple-400',
      status: 'Trending',
      statusDot: 'bg-purple-500'
    },
    {
      title: 'Certifications',
      description: 'Enterprise credential tracking and external vendor certification metrics.',
      icon: Trophy,
      path: '/admin/analytics/certifications',
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-100 dark:bg-rose-500/20',
      cardBg: 'bg-rose-50 dark:bg-rose-900/20',
      ring: 'group-hover:ring-rose-500/50 dark:group-hover:ring-rose-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.3)]',
      gradientAccent: 'from-rose-400 to-rose-600',
      hoverText: 'group-hover:text-rose-700 dark:group-hover:text-rose-400',
      status: 'Active',
      statusDot: 'bg-rose-500'
    },
    {
      title: 'Flagship Programs',
      description: 'Strategic academies, bootcamps, and executive-sponsored learning tracks.',
      icon: Flag,
      path: '/admin/analytics/flagship-programs',
      color: 'text-fuchsia-600 dark:text-fuchsia-400',
      bg: 'bg-fuchsia-100 dark:bg-fuchsia-500/20',
      cardBg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20',
      ring: 'group-hover:ring-fuchsia-500/50 dark:group-hover:ring-fuchsia-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(217,70,239,0.3)]',
      gradientAccent: 'from-fuchsia-400 to-fuchsia-600',
      hoverText: 'group-hover:text-fuchsia-700 dark:group-hover:text-fuchsia-400',
      status: 'Strategic',
      statusDot: 'bg-fuchsia-500'
    },
    {
      title: 'Learning Trends',
      description: 'Historical catalog momentum and emerging technology focus areas.',
      icon: TrendingUp,
      path: '/admin/analytics/learning-trends',
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-100 dark:bg-cyan-500/20',
      cardBg: 'bg-cyan-50 dark:bg-cyan-900/20',
      ring: 'group-hover:ring-cyan-500/50 dark:group-hover:ring-cyan-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]',
      gradientAccent: 'from-cyan-400 to-cyan-600',
      hoverText: 'group-hover:text-cyan-700 dark:group-hover:text-cyan-400',
      status: 'Live Data',
      statusDot: 'bg-cyan-500'
    },
    {
      title: 'Training Effectiveness',
      description: 'Quality assurance metrics, content richness, and catalog health indicators.',
      icon: ShieldCheck,
      path: '/admin/analytics/training-effectiveness',
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-100 dark:bg-teal-500/20',
      cardBg: 'bg-teal-50 dark:bg-teal-900/20',
      ring: 'group-hover:ring-teal-500/50 dark:group-hover:ring-teal-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.3)]',
      gradientAccent: 'from-teal-400 to-teal-600',
      hoverText: 'group-hover:text-teal-700 dark:group-hover:text-teal-400',
      status: 'Quality',
      statusDot: 'bg-teal-500'
    },
    {
      title: 'Learning Champions',
      description: 'Enterprise recognition, gamification engine, and learner achievements.',
      icon: Crown,
      path: '/admin/analytics/learning-champions',
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-500/20',
      cardBg: 'bg-orange-50 dark:bg-orange-900/20',
      ring: 'group-hover:ring-orange-500/50 dark:group-hover:ring-orange-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]',
      gradientAccent: 'from-orange-400 to-orange-600',
      hoverText: 'group-hover:text-orange-700 dark:group-hover:text-orange-400',
      status: 'Social',
      statusDot: 'bg-orange-500'
    },
    {
      title: 'Project Investment',
      description: 'Strategic workforce transformation and bench management.',
      icon: Briefcase,
      path: '/admin/analytics/project-investment',
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-100 dark:bg-violet-500/20',
      cardBg: 'bg-violet-50 dark:bg-violet-900/20',
      ring: 'group-hover:ring-violet-500/50 dark:group-hover:ring-violet-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]',
      gradientAccent: 'from-violet-400 to-violet-600',
      hoverText: 'group-hover:text-violet-700 dark:group-hover:text-violet-400',
      status: 'Strategic',
      statusDot: 'bg-violet-500'
    },
    {
      title: 'Fresher Journey',
      description: 'Track the lifecycle of new campus hires from onboarding to project deployment.',
      icon: Users,
      path: '/admin/analytics/fresher-journey',
      color: 'text-sky-600 dark:text-sky-400',
      bg: 'bg-sky-100 dark:bg-sky-500/20',
      cardBg: 'bg-sky-50 dark:bg-sky-900/20',
      ring: 'group-hover:ring-sky-500/50 dark:group-hover:ring-sky-400/40',
      glow: 'group-hover:shadow-[0_0_40px_-10px_rgba(14,165,233,0.3)]',
      gradientAccent: 'from-sky-400 to-sky-600',
      hoverText: 'group-hover:text-sky-700 dark:group-hover:text-sky-400',
      status: 'Pipeline',
      statusDot: 'bg-sky-500'
    }
  ];

  return (
    <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-16">
      
      {/* Hero Header Section */}
      <div className="relative mb-6">
        {/* Subtle background glow for the header */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6C1D5F]/20 via-purple-500/10 to-transparent dark:from-[#6C1D5F]/40 dark:via-purple-500/20 rounded-2xl flex items-center justify-center text-[#6C1D5F] dark:text-purple-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ring-1 ring-purple-500/20 backdrop-blur-xl">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-1.5">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Enterprise Analytics</h1>
                <Badge className="hidden md:flex bg-gradient-to-r from-purple-600 to-[#6C1D5F] hover:from-purple-500 hover:to-[#5a174f] text-white border-0 shadow-[0_0_15px_rgba(108,29,95,0.3)] px-3 py-1 rounded-full font-bold text-xs uppercase tracking-widest transition-all">
                  Complete Suite
                </Badge>
              </div>
              <p className="text-base md:text-lg font-medium text-gray-500 dark:text-gray-400 max-w-3xl leading-relaxed">
                Mission control for enterprise learning. Monitor workforce capabilities, catalog health, and strategic transformation in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Dashboards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {dashboards.map((dashboard, idx) => {
          const Icon = dashboard.icon;
          return (
            <Link key={idx} to={dashboard.path} className="block group h-full focus:outline-none">
              <div className={clsx(
                "h-full p-7 transition-all duration-500 flex flex-col relative overflow-hidden rounded-[2rem]",
                "backdrop-blur-3xl shadow-sm hover:-translate-y-1.5",
                "ring-1 ring-gray-900/5 dark:ring-white/5",
                dashboard.cardBg,
                dashboard.ring,
                dashboard.glow
              )}>
                {/* Accent Top Line */}
                <div className={clsx(
                  "absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r opacity-80 group-hover:opacity-100 transition-opacity",
                  dashboard.gradientAccent
                )} />

                {/* Decorative Background Blob */}
                <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-150 ${dashboard.bg.split(' ')[0]}`} />

                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-500 group-hover:scale-110",
                    dashboard.bg
                  )}>
                    <Icon className={clsx("w-7 h-7 drop-shadow-sm", dashboard.color)} />
                  </div>
                  
                  {/* Status Indicator & Arrow */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-1.5 bg-gray-100/50 dark:bg-white/5 backdrop-blur-md px-2.5 py-1 rounded-full ring-1 ring-black/5 dark:ring-white/10">
                      <span className={clsx("w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]", dashboard.statusDot)} />
                      <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">{dashboard.status}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                      <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 mt-auto pt-2">
                  <h3 className={clsx(
                    "text-xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 tracking-tight", 
                    dashboard.hoverText
                  )}>
                    {dashboard.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2.5 leading-relaxed line-clamp-2">
                    {dashboard.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>


    </div>
  );
}

