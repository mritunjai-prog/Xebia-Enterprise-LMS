import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { GlobalFilters } from '@/components/analytics/GlobalFilters';
import { 
  ShieldCheck, Terminal, Brain, Download, Users, 
  Award, Clock, Target, TrendingUp, CheckCircle2,
  Activity, BookOpen, Layers, RefreshCw, Calendar
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { clsx } from 'clsx';

export const Route = createFileRoute('/admin/analytics/pillars')({
  component: PillarsDashboard,
});

// --- DUMMY DATA ---

const kpiData = [
  { id: 1, title: 'Total Learning Programs', value: '342', trend: '+12%', icon: BookOpen, colorClass: 'text-[#6C1D5F] dark:text-[#FFACE8]', hoverBorderClass: 'hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]' },
  { id: 2, title: 'Total Learners', value: '12,450', trend: '+5%', icon: Users, colorClass: 'text-[#01AC9F]', hoverBorderClass: 'hover:border-[#01AC9F] dark:hover:border-[#01AC9F]' },
  { id: 3, title: 'Total Learning Hours', value: '45.2K', trend: '+18%', icon: Clock, colorClass: 'text-[#FF6200]', hoverBorderClass: 'hover:border-[#FF6200] dark:hover:border-[#FF6200]' },
  { id: 4, title: 'Active Learning Paths', value: '89', trend: '+8%', icon: Target, colorClass: 'text-[#6C1D5F] dark:text-[#FFACE8]', hoverBorderClass: 'hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]' },
  { id: 5, title: 'Overall Completion Rate', value: '94%', trend: '+2%', icon: CheckCircle2, colorClass: 'text-[#01AC9F]', hoverBorderClass: 'hover:border-[#01AC9F] dark:hover:border-[#01AC9F]' },
];

const hoursTrendData = [
  { month: 'Jan', compliance: 4000, technical: 2400, ai: 2400 },
  { month: 'Feb', compliance: 3000, technical: 1398, ai: 2210 },
  { month: 'Mar', compliance: 2000, technical: 9800, ai: 2290 },
  { month: 'Apr', compliance: 2780, technical: 3908, ai: 2000 },
  { month: 'May', compliance: 1890, technical: 4800, ai: 2181 },
  { month: 'Jun', compliance: 2390, technical: 3800, ai: 2500 },
  { month: 'Jul', compliance: 3490, technical: 4300, ai: 4100 },
];

const techDistributionData = [
  { name: 'Databricks', value: 400 },
  { name: 'Azure', value: 300 },
  { name: 'AWS', value: 300 },
  { name: 'GCP', value: 200 },
];

const categoryDistributionData = [
  { name: 'Compliance', value: 45 },
  { name: 'Technical', value: 35 },
  { name: 'AI & GenAI', value: 20 },
];
const COLORS = ['#6C1D5F', '#01AC9F', '#FFACE8', '#FF6200'];

const leaderboardData = [
  { id: 1, team: 'Cloud Infrastructure', compliance: '100%', tech: '45 Certs', ai: '85%', status: 'Excellent' },
  { id: 2, team: 'Data Science Core', compliance: '98%', tech: '32 Certs', ai: '95%', status: 'Excellent' },
  { id: 3, team: 'Frontend Engineering', compliance: '95%', tech: '28 Certs', ai: '60%', status: 'Good' },
  { id: 4, team: 'Product Strategy', compliance: '99%', tech: '15 Certs', ai: '80%', status: 'Excellent' },
  { id: 5, team: 'DevOps & SRE', compliance: '100%', tech: '42 Certs', ai: '70%', status: 'Excellent' },
];

// --- COMPONENTS ---

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 p-4 rounded-xl shadow-xl">
        <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs font-medium mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
            <span className="text-gray-900 dark:text-white font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PillarsDashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleTimeString());
  };

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Learning Pillars
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Reporting Period: April 1 - June 30, 2026 • Last updated: {lastUpdated}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-lg bg-[#6C1D5F] hover:bg-[#4A1E47] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg">
            <Download className="w-4 h-4" />Export Report</button>
        </div>
      </div>

      <GlobalFilters />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {kpiData.map(kpi => (
          <div key={kpi.id} className={`relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 group ${kpi.hoverBorderClass}`}>
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div>
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{kpi.title}</h3>
                <div className="flex flex-col gap-0.5">
                  <p className={`text-2xl font-black ${kpi.colorClass}`}>{kpi.value}</p>
                </div>
              </div>
              <div className={`p-2 rounded-lg bg-gray-50 dark:bg-white/5 ${kpi.colorClass}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <div className={`relative z-10 mt-4 text-xs font-bold flex items-center gap-1.5 ${kpi.colorClass}`}>
              {kpi.trend}
              <span className="text-[10px] text-[#01AC9F] flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 7 Strategic Learning Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            id: 'compliance',
            title: 'Compliance Learning',
            tag: 'MANDATORY',
            examples: 'POSH, PISMS, Security Awareness, Mandatory Compliance Programs.',
            icon: ShieldCheck,
            colorHex: '#6C1D5F',
            hoverBorderClass: 'hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]',
            bgLight: 'bg-[#6C1D5F]/10', bgDark: 'dark:bg-[#FFACE8]/10',
            textLight: 'text-[#6C1D5F]', textDark: 'dark:text-[#FFACE8]',
            metric1Label: 'Completion Rate', metric1Value: '98%',
            metric2Label: 'Enrolled', metric2Value: '12,400',
            metric3Label: 'Compliance Score', metric3Value: '99.2',
            progress: '98%'
          },
          {
            id: 'technical',
            title: 'Technical Learning',
            tag: 'CORE SKILLS',
            examples: 'Databricks, Cloud, Data Engineering, Development Technologies.',
            icon: Terminal,
            colorHex: '#01AC9F',
            hoverBorderClass: 'hover:border-[#01AC9F] dark:hover:border-[#01AC9F]',
            bgLight: 'bg-[#01AC9F]/10', bgDark: 'dark:bg-[#01AC9F]/10',
            textLight: 'text-[#01AC9F]', textDark: 'dark:text-[#01AC9F]',
            metric1Label: 'Skill Progress', metric1Value: '74%',
            metric2Label: 'Active Learners', metric2Value: '8,230',
            metric3Label: 'Certifications', metric3Value: '1,450',
            progress: '74%'
          },
          {
            id: 'ai',
            title: 'AI & GenAI Learning',
            tag: 'STRATEGIC',
            examples: 'Kiro, Claude, Copilot, GenAI Learning Paths, Prompt Engineering, AI Workshops.',
            icon: Brain,
            colorHex: '#6C1D5F',
            hoverBorderClass: 'hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]',
            bgLight: 'bg-[#6C1D5F]/10', bgDark: 'dark:bg-[#FFACE8]/10',
            textLight: 'text-[#6C1D5F]', textDark: 'dark:text-[#FFACE8]',
            metric1Label: 'AI Readiness Score', metric1Value: '82%',
            metric2Label: 'AI Adoption', metric2Value: '65%',
            metric3Label: 'Tool Usage Hrs', metric3Value: '45.2K',
            progress: '82%'
          },
          {
            id: 'leadership',
            title: 'Leadership Development',
            tag: 'LEADERSHIP',
            examples: 'YMP, Managerial Programs, People Management Programs.',
            icon: Users,
            colorHex: '#01AC9F',
            hoverBorderClass: 'hover:border-[#01AC9F] dark:hover:border-[#01AC9F]',
            bgLight: 'bg-[#01AC9F]/10', bgDark: 'dark:bg-[#01AC9F]/10',
            textLight: 'text-[#01AC9F]', textDark: 'dark:text-[#01AC9F]',
            metric1Label: 'Pipeline Readiness', metric1Value: '78%',
            metric2Label: 'Cohort Size', metric2Value: '1,200',
            metric3Label: 'Promotion Rate', metric3Value: '24%',
            progress: '78%'
          },
          {
            id: 'upskilling',
            title: 'Upskilling & Cross-Skilling',
            tag: 'GROWTH',
            examples: 'Solution Architect Programs, Tech Lead Development Programs, Career Transition Programs.',
            icon: TrendingUp,
            colorHex: '#FF6200',
            hoverBorderClass: 'hover:border-[#FF6200] dark:hover:border-[#FF6200]',
            bgLight: 'bg-[#FF6200]/10', bgDark: 'dark:bg-[#FF6200]/10',
            textLight: 'text-[#FF6200]', textDark: 'dark:text-[#FF6200]',
            metric1Label: 'Skill Shift Rate', metric1Value: '85%',
            metric2Label: 'Trainees', metric2Value: '3,400',
            metric3Label: 'Placements', metric3Value: '2,800',
            progress: '85%'
          },
          {
            id: 'certifications',
            title: 'Certifications',
            tag: 'RECOGNITION',
            examples: 'All external and internal certifications.',
            icon: Award,
            colorHex: '#01AC9F',
            hoverBorderClass: 'hover:border-[#01AC9F] dark:hover:border-[#01AC9F]',
            bgLight: 'bg-[#01AC9F]/10', bgDark: 'dark:bg-[#01AC9F]/10',
            textLight: 'text-[#01AC9F]', textDark: 'dark:text-[#01AC9F]',
            metric1Label: 'Pass Rate', metric1Value: '92%',
            metric2Label: 'Vouchers Used', metric2Value: '4,100',
            metric3Label: 'Total Certified', metric3Value: '3,850',
            progress: '92%'
          },
          {
            id: 'flagship',
            title: 'Flagship Programs',
            tag: 'ORG-WIDE',
            examples: 'Organization-wide strategic learning initiatives.',
            icon: Target,
            colorHex: '#6C1D5F',
            hoverBorderClass: 'hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]',
            bgLight: 'bg-[#6C1D5F]/10', bgDark: 'dark:bg-[#FFACE8]/10',
            textLight: 'text-[#6C1D5F]', textDark: 'dark:text-[#FFACE8]',
            metric1Label: 'Engagement Rate', metric1Value: '88%',
            metric2Label: 'Participants', metric2Value: '9,500',
            metric3Label: 'Impact Score', metric3Value: '4.8',
            progress: '88%',
            isFullWidth: true
          }
        ].map((pillar) => (
          <div key={pillar.id} className={`bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 group flex flex-col ${pillar.hoverBorderClass} ${pillar.isFullWidth ? 'md:col-span-2 lg:col-span-3' : ''}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 ${pillar.bgLight} ${pillar.bgDark} ${pillar.textLight} ${pillar.textDark} rounded-xl`}>
                <pillar.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${pillar.textLight} ${pillar.textDark} px-3 py-1 ${pillar.bgLight} ${pillar.bgDark} rounded-lg`}>
                {pillar.tag}
              </span>
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{pillar.title}</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 flex-1 min-h-[40px]">{pillar.examples}</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{pillar.metric1Label}</span>
                  <span className="text-xs font-black text-gray-900 dark:text-white">{pillar.metric1Value}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: pillar.progress, backgroundColor: pillar.colorHex }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">{pillar.metric2Label}</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">{pillar.metric2Value}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">{pillar.metric3Label}</p>
                  <p className={`text-lg font-black ${pillar.textLight} ${pillar.textDark}`}>{pillar.metric3Value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Chart 1: Learning Hours Trend */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-black text-gray-900 dark:text-white">Learning Hours Trend</h4>
              <p className="text-xs font-medium text-gray-500">Monthly breakdown across pillars</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hoursTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTech" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#01AC9F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#01AC9F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="compliance" name="Compliance" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
                <Area type="monotone" dataKey="technical" name="Technical" stroke="#01AC9F" strokeWidth={3} fillOpacity={1} fill="url(#colorTech)" />
                <Area type="monotone" dataKey="ai" name="AI & GenAI" stroke="#6C1D5F" strokeWidth={3} fillOpacity={1} fill="url(#colorAI)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Distribution Overview */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-black text-gray-900 dark:text-white">Distribution Overview</h4>
              <p className="text-xs font-medium text-gray-500">Learning category vs Technology focus</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-[300px]">
            {/* Category Pie */}
            <div className="flex flex-col items-center">
              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">By Pillar</h5>
              <div className="w-full h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tech Bar */}
            <div className="flex flex-col items-center">
              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Top Technologies</h5>
              <div className="w-full h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={techDistributionData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                    <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(150,150,150,0.05)' }} />
                    <Bar dataKey="value" name="Learners" fill="#01AC9F" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="mt-8 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
          <div>
            <h4 className="font-black text-gray-900 dark:text-white">Top Performing Teams</h4>
            <p className="text-xs font-medium text-gray-500">Based on cross-pillar learning metrics</p>
          </div>
          <button className="text-xs font-bold text-[#6C1D5F] dark:text-[#FFACE8] hover:underline">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 text-xs font-bold uppercase tracking-wider text-gray-500">
                <th className="p-4 pl-6 font-semibold">Team / Department</th>
                <th className="p-4 font-semibold">Compliance %</th>
                <th className="p-4 font-semibold">Tech Certifications</th>
                <th className="p-4 font-semibold">AI Readiness</th>
                <th className="p-4 pr-6 font-semibold">Overall Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-white/5">
              {leaderboardData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                        {row.team.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">{row.team}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gray-900 dark:text-white">{row.compliance}</td>
                  <td className="p-4 font-bold text-[#01AC9F]">{row.tech}</td>
                  <td className="p-4 font-bold text-[#6C1D5F] dark:text-[#FFACE8]">{row.ai}</td>
                  <td className="p-4 pr-6">
                    <span className={clsx(
                      "px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider",
                      row.status === 'Excellent' ? "bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/20 dark:text-[#01AC9F]/80" : "bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#6C1D5F]/20 dark:text-[#6C1D5F]/80"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// Trigger HMR
