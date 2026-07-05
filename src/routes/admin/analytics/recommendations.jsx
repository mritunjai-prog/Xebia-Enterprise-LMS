import { createFileRoute } from "@tanstack/react-router";
import {
  Lightbulb,
  BookOpen,
  Award,
  TrendingUp,
  Download,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute("/admin/analytics/recommendations")({
  component: RecommendationEngineDashboard,
});

function RecommendationEngineDashboard() {
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Learning Recommendation Engine
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Reporting Period: April 1 - June 30, 2026 • Last
            updated: {lastUpdated}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
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

      {/* Top Row: AI Engine Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Metric 1: Acceptance Rate */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl transition-transform group-hover:scale-110">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[#01AC9F] bg-[#01AC9F]/10 px-2 py-1 rounded-md text-[10px] font-black flex items-center gap-1 border border-[#01AC9F]/20">
              <TrendingUp className="w-3 h-3" /> +12% GROWTH
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Recommendation Acceptance Rate
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">74.5%</h4>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              Employees enrolling in AI-suggested learning paths
            </p>
          </div>
        </div>

        {/* Metric 2: AI Accuracy/Impact */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl transition-transform group-hover:scale-110">
              <Lightbulb className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Completion Rate of Suggestions
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">68.2%</h4>
            <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1 mt-3 overflow-hidden shadow-inner">
              <div className="bg-[#FF6200] h-full rounded-full" style={{ width: "68.2%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Suggested Courses & Certs */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#6C1D5F] dark:text-[#FFACE8]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                High-Impact Course Recommendations
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-100 dark:border-white/5 rounded-xl bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-[#151515] hover:border-[#01AC9F] transition-all cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#01AC9F] transition-colors">
                    Advanced Prompt Engineering
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Suggested for: 840 Employees (Data & AI Practice)
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#01AC9F]/10 text-[#01AC9F] rounded text-[10px] font-black border border-[#01AC9F]/20">
                  92% MATCH
                </span>
              </div>
            </div>

            <div className="p-4 border border-gray-100 dark:border-white/5 rounded-xl bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-[#151515] hover:border-[#FF6200] transition-all cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#FF6200] transition-colors">
                    AWS Certified Solutions Architect
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Suggested for: 320 Employees (Cloud Practice)
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#FF6200]/10 text-[#FF6200] rounded text-[10px] font-black border border-[#FF6200]/20">
                  88% MATCH
                </span>
              </div>
            </div>

            <div className="p-4 border border-gray-100 dark:border-white/5 rounded-xl bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-[#151515] hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-all cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                    Zero Trust Architecture Fundamentals
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Suggested for: 410 Employees (Cybersecurity)
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#FFACE8] rounded text-[10px] font-black border border-[#6C1D5F]/20">
                  85% MATCH
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Career Path Learning */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#01AC9F]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Suggested Career Path Transitions
              </h3>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            {/* Transition 1 */}
            <div className="relative pl-6 border-l-2 border-gray-200 dark:border-white/10 group cursor-pointer">
              <div className="absolute w-3 h-3 bg-[#6C1D5F] rounded-full -left-[7px] top-1 transition-transform group-hover:scale-150"></div>
              <div className="flex items-center gap-3 text-sm font-bold mb-2">
                <span className="text-gray-500">Backend Developer</span>
                <ArrowRight className="w-4 h-4 text-gray-300" />
                <span className="text-[#6C1D5F] dark:text-[#FFACE8]">
                  Full-Stack Cloud Engineer
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Targeted to: 240 Employees</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                  React.js Deep Dive
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                  AWS Cloud Practitioner
                </span>
              </div>
            </div>

            {/* Transition 2 */}
            <div className="relative pl-6 border-l-2 border-gray-200 dark:border-white/10 group cursor-pointer">
              <div className="absolute w-3 h-3 bg-[#FF6200] rounded-full -left-[7px] top-1 transition-transform group-hover:scale-150"></div>
              <div className="flex items-center gap-3 text-sm font-bold mb-2">
                <span className="text-gray-500">Data Analyst</span>
                <ArrowRight className="w-4 h-4 text-gray-300" />
                <span className="text-[#FF6200]">AI / ML Engineer</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Targeted to: 180 Employees</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                  Applied Deep Learning
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                  MLOps with Databricks
                </span>
              </div>
            </div>

            {/* Transition 3 */}
            <div className="relative pl-6 border-l-2 border-transparent group cursor-pointer">
              <div className="absolute w-3 h-3 bg-[#01AC9F] rounded-full -left-[7px] top-1 transition-transform group-hover:scale-150"></div>
              <div className="flex items-center gap-3 text-sm font-bold mb-2">
                <span className="text-gray-500">Senior Engineer</span>
                <ArrowRight className="w-4 h-4 text-gray-300" />
                <span className="text-[#01AC9F]">Technical Architect</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Targeted to: 85 Employees</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                  System Design Masterclass
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-[10px] font-bold">
                  YMP Leadership
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
