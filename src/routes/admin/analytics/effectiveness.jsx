import { createFileRoute } from "@tanstack/react-router";
import {
  Download,
  Calendar,
  Star,
  Brain,
  BookOpen,
  Code,
  CheckCircle2,
  Users,
  ThumbsUp,
  Activity,
  Target,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute("/admin/analytics/effectiveness")({
  component: TrainingEffectiveness,
});

function TrainingEffectiveness() {
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Training Effectiveness
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

      {/* Top Row: 6 Core Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Feedback Score
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
              4.8<span className="text-lg text-gray-400">/5</span>
            </h4>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Trainer Rating
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
              4.9<span className="text-lg text-gray-400">/5</span>
            </h4>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Session Rating
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
              4.6<span className="text-lg text-gray-400">/5</span>
            </h4>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <ThumbsUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Recommendation %
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">92%</h4>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Attendance %
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">88%</h4>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Completion %
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">96%</h4>
          </div>
        </div>
      </div>

      {/* Main Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insight 1: Best Rated Trainings */}
        <section className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] hover:-translate-y-1 group">
          <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center gap-3">
            <div className="w-2 h-6 bg-[#6C1D5F] rounded-full"></div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">
              Best Rated Trainings
            </h3>
          </div>
          <div className="flex-1 divide-y divide-gray-100 dark:divide-white/5 flex flex-col">
            <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#FFACE8] flex items-center justify-center shrink-0">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    Generative AI for PMs
                  </p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider truncate mt-1">
                    Tech & Innovation
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-lg font-black text-[#6C1D5F] dark:text-[#FFACE8]">4.95</p>
                <p className="text-[10px] font-black text-[#01AC9F] uppercase tracking-wider mt-0.5">
                  Top 1%
                </p>
              </div>
            </div>

            <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    Servant Leadership 2.0
                  </p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider truncate mt-1">
                    Leadership
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-lg font-black text-gray-900 dark:text-white">4.88</p>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mt-0.5">
                  Top 5%
                </p>
              </div>
            </div>

            <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    Advanced Python
                  </p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider truncate mt-1">
                    Data Science
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-lg font-black text-gray-900 dark:text-white">4.85</p>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mt-0.5">
                  Top 8%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insight 2: Best Rated Trainers */}
        <section className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] hover:-translate-y-1 group">
          <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center gap-3">
            <div className="w-2 h-6 bg-[#01AC9F] rounded-full"></div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">
              Best Rated Trainers
            </h3>
          </div>
          <div className="flex-1 divide-y divide-gray-100 dark:divide-white/5 flex flex-col">
            <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                  src="https://i.pravatar.cc/150?u=helena"
                  alt="Dr. Helena Thorne"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Dr. Helena Thorne
                  </p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mt-1">
                    Senior AI Consultant
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end text-[#01AC9F] font-black gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-lg">4.99</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-0.5">
                  120 Sessions
                </p>
              </div>
            </div>

            <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                  src="https://i.pravatar.cc/150?u=mark"
                  alt="Mark J. Sterling"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Mark J. Sterling
                  </p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mt-1">
                    Executive Coach
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end text-[#FF6200] font-black gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-lg">4.94</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-0.5">
                  85 Sessions
                </p>
              </div>
            </div>

            <div className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                  src="https://i.pravatar.cc/150?u=sophia"
                  alt="Sophia Lin"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Sophia Lin</p>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mt-1">
                    Lead Designer
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end text-[#FF6200] font-black gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-lg">4.92</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-0.5">
                  42 Sessions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insight 3: Most Impactful Programs */}
        <section className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-[#FF6200] dark:hover:border-[#FF6200] hover:-translate-y-1 group">
          <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center gap-3">
            <div className="w-2 h-6 bg-[#FF6200] rounded-full"></div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white">
              Most Impactful Programs
            </h3>
          </div>
          <div className="flex-1 flex flex-col p-5 gap-4 justify-center">
            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Data Literacy Wave
                  </p>
                </div>
                <span className="text-xs font-black text-[#FF6200] px-2 py-1 bg-[#FF6200]/10 rounded shadow-sm">
                  88% ROI
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden shadow-inner">
                <div className="bg-[#FF6200] h-full rounded-full" style={{ width: "88%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Cloud Transformation
                  </p>
                </div>
                <span className="text-xs font-black text-[#01AC9F] px-2 py-1 bg-[#01AC9F]/10 rounded shadow-sm">
                  94% ADOPTION
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden shadow-inner">
                <div className="bg-[#01AC9F] h-full rounded-full" style={{ width: "94%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Future Leaders ‘24
                  </p>
                </div>
                <span className="text-xs font-black text-[#6C1D5F] dark:text-[#FFACE8] px-2 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded shadow-sm">
                  72% PROMOTION
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-[#6C1D5F] dark:bg-[#FFACE8] h-full rounded-full"
                  style={{ width: "72%" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
