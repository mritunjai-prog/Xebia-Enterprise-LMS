import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart4,
  AlertTriangle,
  Target,
  Download,
  Calendar,
  Layers,
  FolderKanban,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute("/admin/analytics/skill-gap")({
  component: SkillGapDashboard,
});

function SkillGapDashboard() {
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Skill Gap Dashboard
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

      {/* Top Row: Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric 1: Overall Skill Gap */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl transition-transform group-hover:scale-110">
              <BarChart4 className="w-6 h-6" />
            </div>
            <span className="text-[#FF6200] bg-[#FF6200]/10 px-2 py-1 rounded-md text-[10px] font-black flex items-center gap-1 border border-[#FF6200]/20">
              <TrendingDown className="w-3 h-3" /> 4% REDUCTION
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Overall Skill Gap
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">18.4%</h4>
            <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1 mt-3 overflow-hidden shadow-inner">
              <div className="bg-[#6C1D5F] h-full rounded-full" style={{ width: "18.4%" }}></div>
            </div>
          </div>
        </div>

        {/* Metric 2: Critical Roles at Risk */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl transition-transform group-hover:scale-110">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Critical Roles at Risk (High Gap)
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">42</h4>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              Primarily Data Architects & AI Engineers
            </p>
          </div>
        </div>

        {/* Metric 3: Top Missing Skills */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl transition-transform group-hover:scale-110">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Top Missing Skills
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="px-2 py-1 bg-[#01AC9F]/10 text-[#01AC9F] rounded text-xs font-bold border border-[#01AC9F]/20">
                GenAI Integration
              </span>
              <span className="px-2 py-1 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#FFACE8] rounded text-xs font-bold border border-[#6C1D5F]/20">
                AWS Bedrock
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-xs font-bold border border-gray-200 dark:border-white/20">
                Data Modeling
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Current vs Required Skills (Radar/Bar Concept) */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 md:p-8 flex flex-col transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]">
          <h3 className="text-xl font-bold text-[#6C1D5F] dark:text-white mb-6">
            Current vs Required Skills
          </h3>

          <div className="space-y-6 flex-1">
            <div className="space-y-2 group">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  Cloud Architecture
                </span>
                <span className="text-gray-500 text-xs">
                  Required: Level 4 | Current: Level 3.2
                </span>
              </div>
              <div className="relative w-full bg-gray-100 dark:bg-white/5 rounded-full h-3 shadow-inner overflow-hidden">
                {/* Required Target Line */}
                <div className="absolute top-0 left-0 h-full w-[80%] border-r-2 border-dashed border-[#FF6200] z-10"></div>
                {/* Current Level */}
                <div
                  className="bg-[#6C1D5F] h-full rounded-full shadow-sm transition-all"
                  style={{ width: "64%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  Generative AI
                </span>
                <span className="text-gray-500 text-xs">
                  Required: Level 3 | Current: Level 1.8
                </span>
              </div>
              <div className="relative w-full bg-gray-100 dark:bg-white/5 rounded-full h-3 shadow-inner overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[60%] border-r-2 border-dashed border-[#FF6200] z-10"></div>
                <div
                  className="bg-[#FF6200]/80 h-full rounded-full shadow-sm transition-all"
                  style={{ width: "36%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  Full-stack React
                </span>
                <span className="text-gray-500 text-xs">
                  Required: Level 4 | Current: Level 3.9
                </span>
              </div>
              <div className="relative w-full bg-gray-100 dark:bg-white/5 rounded-full h-3 shadow-inner overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[80%] border-r-2 border-dashed border-[#FF6200] z-10"></div>
                <div
                  className="bg-[#01AC9F] h-full rounded-full shadow-sm transition-all"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  Cybersecurity (Zero Trust)
                </span>
                <span className="text-gray-500 text-xs">
                  Required: Level 3 | Current: Level 2.1
                </span>
              </div>
              <div className="relative w-full bg-gray-100 dark:bg-white/5 rounded-full h-3 shadow-inner overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[60%] border-r-2 border-dashed border-[#FF6200] z-10"></div>
                <div
                  className="bg-[#6C1D5F]/80 h-full rounded-full shadow-sm transition-all"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4 border-t border-gray-100 dark:border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-3 h-3 bg-[#6C1D5F] rounded-sm"></span> Current Skill
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              <span className="w-3 h-3 border-r-2 border-dashed border-[#FF6200]"></span> Required
              Target
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Skill Gap by Project */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex-1">
            <div className="flex items-center gap-2 mb-4">
              <FolderKanban className="w-5 h-5 text-[#6C1D5F] dark:text-[#FFACE8]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Skill Gap by Project
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center group">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                    Synergy AI Delivery
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                    High Risk
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#FF6200]/10 text-[#FF6200] rounded text-xs font-bold border border-[#FF6200]/20">
                  28% Gap
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                    Global FinTech Revamp
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                    Moderate Risk
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#FFACE8] rounded text-xs font-bold border border-[#6C1D5F]/20">
                  15% Gap
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                    Cloud Phoenix
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                    On Track
                  </p>
                </div>
                <span className="px-2 py-1 bg-[#01AC9F]/10 text-[#01AC9F] rounded text-xs font-bold border border-[#01AC9F]/20">
                  4% Gap
                </span>
              </div>
            </div>
          </div>

          {/* Skill Gap by Practice */}
          <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-[#01AC9F]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Skill Gap by Practice
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center group">
                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  Data & AI Practice
                </span>
                <span className="px-2 py-1 bg-[#FF6200]/10 text-[#FF6200] rounded text-xs font-bold border border-[#FF6200]/20">
                  24% Gap
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  Cybersecurity Practice
                </span>
                <span className="px-2 py-1 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#FFACE8] rounded text-xs font-bold border border-[#6C1D5F]/20">
                  18% Gap
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  Software Dev Practice
                </span>
                <span className="px-2 py-1 bg-[#01AC9F]/10 text-[#01AC9F] rounded text-xs font-bold border border-[#01AC9F]/20">
                  8% Gap
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
