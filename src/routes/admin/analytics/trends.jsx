import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
  Video,
  Clock,
  Award,
  Bot,
  Download,
  Users,
  Calendar,
  BarChart2,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute("/admin/analytics/trends")({
  component: LearningTrends,
});

function LearningTrends() {
  const [activeView, setActiveView] = useState("MoM");
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Learning Trends
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Reporting Period: April 1 - June 30, 2026 • Last
            updated: {lastUpdated}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Trend Views Toggles */}
          <div className="flex items-center bg-gray-100 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveView("MoM")}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${activeView === "MoM" ? "bg-white dark:bg-white/10 text-[#6C1D5F] dark:text-[#FFACE8] shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
            >
              MoM
            </button>
            <button
              onClick={() => setActiveView("QoQ")}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${activeView === "QoQ" ? "bg-white dark:bg-white/10 text-[#6C1D5F] dark:text-[#FFACE8] shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
            >
              QoQ
            </button>
            <button
              onClick={() => setActiveView("YoY")}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${activeView === "YoY" ? "bg-white dark:bg-white/10 text-[#6C1D5F] dark:text-[#FFACE8] shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
            >
              YoY
            </button>
          </div>

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

      {/* Top Row: 5 Core Trend Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">
              VOLUME
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Sessions Conducted
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">14,280</h4>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] px-3 py-1 bg-[#01AC9F]/10 rounded-lg">
              REACH
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Employees Trained
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">42,500</h4>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] px-3 py-1 bg-[#FF6200]/10 rounded-lg">
              EFFORT
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Learning Hours
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">112.4K</h4>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">
              IMPACT
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Certs Achieved
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">8,240</h4>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#01AC9F]/10 rounded-full blur-[20px] transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-white px-3 py-1 bg-[#01AC9F] rounded-lg shadow-sm animate-pulse">
                TRENDING
              </span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  AI Learning Growth
                </p>
                <h4 className="text-3xl font-black text-[#01AC9F] mt-1">+142%</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Chart & Indicators */}
      <div className="grid grid-cols-1 gap-8">
        {/* Growth Trends Over Time Chart */}
        <section className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                  Growth Trends Over Time
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-1">
                  Performance visualization across {activeView} periods
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#6C1D5F] shadow-sm"></span>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Employees Trained
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#01AC9F] shadow-sm"></span>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                  Certifications
                </span>
              </div>
            </div>
          </div>

          <div className="h-[380px] relative w-full flex items-end">
            {/* Chart Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-4 py-8">
              <div className="w-full border-t border-gray-100 dark:border-white/5"></div>
              <div className="w-full border-t border-gray-100 dark:border-white/5"></div>
              <div className="w-full border-t border-gray-100 dark:border-white/5"></div>
              <div className="w-full border-t border-gray-100 dark:border-white/5"></div>
              <div className="w-full border-t border-gray-100 dark:border-white/5"></div>
            </div>

            {/* SVG Chart Visualization */}
            <div className="relative w-full h-full px-4 pt-8 pb-10">
              <svg
                className="w-full h-full drop-shadow-xl"
                preserveAspectRatio="none"
                viewBox="0 0 1000 300"
              >
                {/* Employees Trained Line (Primary) */}
                <path
                  className="animate-[dash_2s_ease-out_forwards]"
                  d="M0,250 L100,220 L200,240 L300,180 L400,190 L500,120 L600,140 L700,80 L800,100 L900,40 L1000,20"
                  fill="none"
                  stroke="#6C1D5F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                ></path>
                {/* Certifications Line (Secondary) */}
                <path
                  className="animate-[dash_2.5s_ease-out_forwards] opacity-90"
                  d="M0,280 L100,270 L200,260 L300,240 L400,220 L500,230 L600,190 L700,210 L800,150 L900,170 L1000,110"
                  fill="none"
                  stroke="#01AC9F"
                  strokeDasharray="10,6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                ></path>
              </svg>
              {/* X-Axis Labels */}
              <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[10px] text-gray-400 font-black tracking-wider">
                {activeView === "MoM" ? (
                  <>
                    <span>JAN</span>
                    <span>FEB</span>
                    <span>MAR</span>
                    <span>APR</span>
                    <span>MAY</span>
                    <span>JUN</span>
                    <span>JUL</span>
                    <span>AUG</span>
                    <span>SEP</span>
                    <span>OCT</span>
                    <span>NOV</span>
                    <span>DEC</span>
                  </>
                ) : activeView === "QoQ" ? (
                  <>
                    <span>Q1 2024</span>
                    <span>Q2 2024</span>
                    <span>Q3 2024</span>
                    <span>Q4 2024</span>
                    <span>Q1 2025</span>
                    <span>Q2 2025</span>
                    <span>Q3 2025</span>
                    <span>Q4 2025</span>
                  </>
                ) : (
                  <>
                    <span>2020</span>
                    <span>2021</span>
                    <span>2022</span>
                    <span>2023</span>
                    <span>2024</span>
                    <span>2025</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Growth Indicators Grid */}
        <section>
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="p-2 bg-[#FF6200]/10 text-[#FF6200] rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              Growth Indicators ({activeView})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Indicator 1 */}
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">
                    Training Growth %
                  </p>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    +18.4%
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F] dark:text-[#FFACE8]">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-[#6C1D5F] w-[75%] rounded-full"></div>
              </div>
              <p className="text-xs font-bold text-gray-500 mt-2">Target: 20%</p>
            </div>

            {/* Indicator 2 */}
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all hover:border-[#01AC9F] dark:hover:border-[#01AC9F] hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">
                    Learner Growth %
                  </p>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    +24.2%
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#01AC9F]/10 flex items-center justify-center text-[#01AC9F]">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-[#01AC9F] w-[95%] rounded-full"></div>
              </div>
              <p className="text-xs font-bold text-[#01AC9F] mt-2">Target Exceeded</p>
            </div>

            {/* Indicator 3 */}
            <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">
                    Certification Growth %
                  </p>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    +12.8%
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F] dark:text-[#FFACE8]">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
                <div className="h-full bg-[#6C1D5F] w-[60%] rounded-full"></div>
              </div>
              <p className="text-xs font-bold text-gray-500 mt-2">Target: 15%</p>
            </div>

            {/* Indicator 4 */}
            <div className="bg-white dark:bg-[#111111] border border-[#FF6200]/20 rounded-2xl p-6 shadow-sm transition-all hover:border-[#FF6200] dark:hover:border-[#FF6200] hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] mb-1">
                    AI Adoption Growth %
                  </p>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    +142.0%
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FF6200]/10 flex items-center justify-center text-[#FF6200] animate-bounce">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full mt-6 overflow-hidden relative z-10">
                <div className="h-full bg-[#FF6200] w-[100%] rounded-full"></div>
              </div>
              <p className="text-xs font-black text-[#FF6200] mt-2 relative z-10">
                Hyper-Growth Phase
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
