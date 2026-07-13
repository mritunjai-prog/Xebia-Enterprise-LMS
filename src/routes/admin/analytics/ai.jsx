import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
  Award,
  Clock,
  LineChart,
  Terminal,
  Bot,
  Zap,
  Star,
  Users,
  Video,
  LayoutGrid,
  Calendar,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute("/admin/analytics/ai")({
  component: AITransformation,
});

function AITransformation() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            AI Transformation
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Reporting Period: April 1 - June 30, 2026 • Last
            updated: {lastUpdated}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            className="bg-[#6C1D5F] hover:bg-[#4A1E47] text-white shadow-sm transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Global Filters */}
      <GlobalFilters />

      {/* Header Section / Hero */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        {/* AI Maturity Score */}
        <div className="col-span-1 xl:col-span-4 bg-white dark:bg-[#111111] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between relative overflow-hidden h-full">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

          <div className="flex items-start justify-between relative z-10 mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] mb-3">
                AI Maturity Score
              </p>
              <h3 className="text-6xl font-black text-[#6C1D5F] dark:text-white leading-none">
                78.4<span className="text-3xl text-gray-400">/100</span>
              </h3>
              <p className="text-sm font-bold text-gray-500 mt-4 flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-[#01AC9F]" />
                <span className="text-[#01AC9F]">+12.5%</span> vs last quarter
              </p>
            </div>

            <div className="w-32 h-32 relative transition-transform duration-500 hidden sm:block">
              <svg
                className="w-full h-full transform -rotate-90 drop-shadow-xl"
                viewBox="0 0 36 36"
              >
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-100 dark:text-white/5"
                  strokeWidth="3"
                ></path>
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#6C1D5F"
                  strokeDasharray="78.4, 100"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Award className="text-[#6C1D5F] dark:text-[#FFACE8] w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-gray-200 dark:border-white/10">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Score Components
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                Training Completion
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                Certification Achievement
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                Tool Adoption
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                AI Learning Hours
              </span>
            </div>
          </div>
        </div>

        {/* Core Quick Metrics */}
        <div className="col-span-1 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">
                CORE
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Employees Trained on AI
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">4,280</h4>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] px-3 py-1 bg-[#01AC9F]/10 rounded-lg">
                ACHIEVEMENT
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Employees Certified on AI
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">1,150</h4>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] px-3 py-1 bg-[#FF6200]/10 rounded-lg">
                ENGAGEMENT
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                AI Learning Hours
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">18.4K</h4>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] px-3 py-1 bg-[#01AC9F]/10 rounded-lg">
                PROGRAMS
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                AI Sessions Conducted
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">245</h4>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
                <LineChart className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] px-3 py-1 bg-[#FF6200]/10 rounded-lg">
                RETENTION
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  AI Training Attendance %
                </p>
                <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">94.2%</h4>
              </div>
              <div className="text-sm font-bold text-[#FF6200]">+4.1%</div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
                <Star className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">
                IMPACT
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Training Satisfaction
                </p>
                <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                  4.8<span className="text-xl text-gray-400">/5</span>
                </h4>
              </div>
              <div className="text-sm font-bold text-[#6C1D5F]">+0.2</div>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption & Funnel Bento */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* AI Adoption Funnel */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                AI Adoption Funnel
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">
              LIVE DATA
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-[#6C1D5F] dark:text-[#FFACE8]">Registered</span>
                <span className="text-gray-500">8,400 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#6C1D5F] to-[#802270] rounded-lg w-full transition-all duration-1000"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-[#01AC9F]">Attended</span>
                <span className="text-gray-500">6,210 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#01AC9F] to-[#018F84] rounded-lg w-[74%] transition-all duration-1000 delay-100"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-[#FF6200]">Completed Learning</span>
                <span className="text-gray-500">4,280 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#FF6200] to-[#E55800] rounded-lg w-[51%] transition-all duration-1000 delay-200"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-[#6C1D5F] dark:text-[#FFACE8]">Certified</span>
                <span className="text-gray-500">1,150 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#6C1D5F] to-[#802270] rounded-lg w-[14%] transition-all duration-1000 delay-300"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-[#01AC9F]">Using AI Tools</span>
                <span className="text-gray-500">892 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#01AC9F] to-[#018F84] rounded-lg w-[10%] transition-all duration-1000 delay-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Adoption Stats */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 relative overflow-hidden group hover:border-[#01AC9F] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] rounded-xl">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Tool Adoption</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] px-3 py-1 bg-[#01AC9F]/10 rounded-lg">
              METRICS
            </span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-[#01AC9F]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-1 text-gray-900 dark:text-white">
                  <span>Copilot Users</span>
                  <span>62%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-[#01AC9F] h-full rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#FFACE8]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-1 text-gray-900 dark:text-white">
                  <span>Kiro Users</span>
                  <span>48%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-[#FFACE8] h-full rounded-full" style={{ width: "48%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#FF6200]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-1 text-gray-900 dark:text-white">
                  <span>Claude Users</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-[#FF6200] h-full rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-[#FF6200]" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-1 text-gray-900 dark:text-white">
                  <span>Other AI Platforms</span>
                  <span>28%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-[#FF6200] h-full rounded-full" style={{ width: "28%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Champions */}
        <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] rounded-xl">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">AI Champions</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] px-3 py-1 bg-[#FF6200]/10 rounded-lg">
              PEOPLE
            </span>
          </div>

          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/10">
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                src="https://i.pravatar.cc/150?u=sarah"
                alt="Sarah Chen"
              />
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Sarah Chen</p>
                <p className="text-[10px] text-[#6C1D5F] font-black uppercase tracking-wider bg-[#6C1D5F]/10 inline-block px-1.5 py-0.5 rounded mt-1">
                  AI Power User
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/10">
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                src="https://i.pravatar.cc/150?u=marcus"
                alt="Marcus Thorne"
              />
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Marcus Thorne</p>
                <p className="text-[10px] text-[#01AC9F] font-black uppercase tracking-wider bg-[#01AC9F]/10 inline-block px-1.5 py-0.5 rounded mt-1">
                  AI Mentor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/10">
              <img
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                src="https://i.pravatar.cc/150?u=elena"
                alt="Elena Rodriguez"
              />
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Elena Rodriguez</p>
                <p className="text-[10px] text-[#FF6200] font-black uppercase tracking-wider bg-[#FF6200]/10 inline-block px-1.5 py-0.5 rounded mt-1">
                  AI Ambassador
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Readiness Heatmap Section */}
      <section className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                AI Capability Heatmap
              </h3>
              <p className="text-xs font-medium text-gray-500 mt-1">
                Display AI readiness across multiple dimensions
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1 bg-gray-100 dark:bg-black/20 rounded-lg p-1 border border-gray-200 dark:border-white/5">
            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-wider text-gray-500 hover:text-[#6C1D5F] dark:hover:text-white transition-colors">
              BY REGION
            </button>
            <button className="px-4 py-2 bg-white dark:bg-[#6C1D5F] shadow-sm rounded-md text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-white">
              BY DEPARTMENT
            </button>
            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-wider text-gray-500 hover:text-[#6C1D5F] dark:hover:text-white transition-colors">
              BY PROJECT
            </button>
            <button className="px-4 py-2 text-[10px] font-black uppercase tracking-wider text-gray-500 hover:text-[#6C1D5F] dark:hover:text-white transition-colors">
              BY PRACTICE
            </button>
          </div>
        </div>

        {/* Mock Heatmap Table */}
        <div className="overflow-x-auto custom-scrollbar pb-4">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10">
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Dimension
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-center">
                  Engineering
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-center">
                  Product
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-center">
                  Marketing
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-center">
                  Sales
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-center">
                  Ops
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100 dark:border-white/5">
                <td className="py-4 font-bold text-gray-900 dark:text-white">North America</td>
                <td className="p-2">
                  <div className="h-10 bg-[#6C1D5F] text-white flex items-center justify-center rounded-lg font-black shadow-sm transform hover:scale-105 transition-transform cursor-pointer">
                    94%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#6C1D5F]/80 text-white flex items-center justify-center rounded-lg font-bold transform hover:scale-105 transition-transform cursor-pointer">
                    82%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#6C1D5F]/40 text-gray-900 dark:text-white flex items-center justify-center rounded-lg font-medium transform hover:scale-105 transition-transform cursor-pointer">
                    56%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#6C1D5F]/20 text-gray-700 dark:text-gray-300 flex items-center justify-center rounded-lg text-xs transform hover:scale-105 transition-transform cursor-pointer">
                    32%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#6C1D5F]/60 text-white flex items-center justify-center rounded-lg font-bold transform hover:scale-105 transition-transform cursor-pointer">
                    61%
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-white/5">
                <td className="py-4 font-bold text-gray-900 dark:text-white">EMEA</td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/90 text-white flex items-center justify-center rounded-lg font-black shadow-sm transform hover:scale-105 transition-transform cursor-pointer">
                    88%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/70 text-white flex items-center justify-center rounded-lg font-bold transform hover:scale-105 transition-transform cursor-pointer">
                    71%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/30 text-gray-800 dark:text-gray-200 flex items-center justify-center rounded-lg text-xs transform hover:scale-105 transition-transform cursor-pointer">
                    44%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/10 text-gray-600 dark:text-gray-400 flex items-center justify-center rounded-lg text-xs transform hover:scale-105 transition-transform cursor-pointer border border-[#01AC9F]/20">
                    18%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/40 text-gray-900 dark:text-white flex items-center justify-center rounded-lg font-medium transform hover:scale-105 transition-transform cursor-pointer">
                    52%
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-white/5">
                <td className="py-4 font-bold text-gray-900 dark:text-white">APAC</td>
                <td className="p-2">
                  <div className="h-10 bg-[#FF6200] text-white flex items-center justify-center rounded-lg font-black shadow-sm transform hover:scale-105 transition-transform cursor-pointer ring-2 ring-[#FFACE8]/50 ring-offset-1 dark:ring-offset-black">
                    98%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#FF6200]/85 text-white flex items-center justify-center rounded-lg font-black transform hover:scale-105 transition-transform cursor-pointer">
                    85%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#FF6200]/50 text-white flex items-center justify-center rounded-lg font-medium transform hover:scale-105 transition-transform cursor-pointer">
                    64%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#FF6200]/30 text-gray-800 dark:text-gray-200 flex items-center justify-center rounded-lg text-xs transform hover:scale-105 transition-transform cursor-pointer">
                    41%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#FF6200]/80 text-white flex items-center justify-center rounded-lg font-bold transform hover:scale-105 transition-transform cursor-pointer">
                    79%
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 font-bold text-gray-900 dark:text-white">LATAM</td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/50 text-white flex items-center justify-center rounded-lg font-medium transform hover:scale-105 transition-transform cursor-pointer">
                    62%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/30 text-gray-800 dark:text-gray-200 flex items-center justify-center rounded-lg text-xs transform hover:scale-105 transition-transform cursor-pointer">
                    45%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/10 text-gray-600 dark:text-gray-400 flex items-center justify-center rounded-lg text-xs transform hover:scale-105 transition-transform cursor-pointer border border-[#01AC9F]/20">
                    21%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-transparent text-gray-500 flex items-center justify-center rounded-lg text-xs transform hover:scale-105 transition-transform cursor-pointer border border-dashed border-gray-300 dark:border-gray-700">
                    9%
                  </div>
                </td>
                <td className="p-2">
                  <div className="h-10 bg-[#01AC9F]/20 text-gray-700 dark:text-gray-300 flex items-center justify-center rounded-lg text-xs transform hover:scale-105 transition-transform cursor-pointer">
                    34%
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
