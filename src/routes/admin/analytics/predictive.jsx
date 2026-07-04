import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart,
  ShieldAlert,
  BrainCircuit,
  Download,
  Calendar,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute("/admin/analytics/predictive")({
  component: PredictiveAnalyticsDashboard,
});

function PredictiveAnalyticsDashboard() {
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Predictive Analytics
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

      {/* Analytics Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Certification Completion Prediction */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-[#6C1D5F] dark:text-[#FFACE8]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Certification Forecast (Q3/Q4)
              </h3>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="text-center pb-4 border-b border-gray-100 dark:border-white/10">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Predicted Completions
              </p>
              <h4 className="text-4xl font-black text-gray-900 dark:text-white">1,450</h4>
              <span className="inline-flex items-center gap-1 text-[#01AC9F] text-xs font-bold mt-2">
                <ArrowUpRight className="w-4 h-4" /> +15% over historical average
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center group">
                <span className="text-sm font-bold text-gray-900 dark:text-white">AWS Cloud</span>
                <span className="px-2 py-1 bg-[#01AC9F]/10 text-[#01AC9F] rounded text-xs font-bold">
                  ~420 Expected
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  Databricks Data Engineer
                </span>
                <span className="px-2 py-1 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#FFACE8] rounded text-xs font-bold">
                  ~380 Expected
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  Azure Solutions
                </span>
                <span className="px-2 py-1 bg-[#FF6200]/10 text-[#FF6200] rounded text-xs font-bold">
                  ~310 Expected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Readiness Forecast */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col transition-all duration-300 hover:border-[#01AC9F] dark:hover:border-[#01AC9F]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-[#01AC9F]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                AI Readiness Forecast
              </h3>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="text-center pb-4 border-b border-gray-100 dark:border-white/10">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Projected Readiness by Q4
              </p>
              <h4 className="text-4xl font-black text-gray-900 dark:text-white">82%</h4>
              <span className="inline-flex items-center gap-1 text-[#FF6200] text-xs font-bold mt-2">
                Requires +14% growth to hit target
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>Current (Q2)</span>
                  <span>54%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gray-400 h-full rounded-full" style={{ width: "54%" }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                  <span>Forecast (Q3)</span>
                  <span>68%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#6C1D5F] h-full rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-[#01AC9F]">
                  <span>Forecast (Q4 Target)</span>
                  <span>82%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#01AC9F] h-full rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Risk Indicators */}
        <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col transition-all duration-300 hover:border-[#FF6200] dark:hover:border-[#FF6200]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#FF6200]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Learning Risk Indicators
              </h3>
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-4">
            <div className="p-4 border-l-4 border-l-[#FF6200] bg-[#FF6200]/5 dark:bg-[#FF6200]/10 rounded-r-xl group">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  High Dropout Risk Cohort
                </h4>
                <span className="text-[10px] font-black uppercase text-[#FF6200]">
                  92% Probability
                </span>
              </div>
              <p className="text-xs text-gray-500">
                "Data Science Fundamentals" cohort showing steep engagement drop at module 4.
                Intervention recommended.
              </p>
            </div>

            <div className="p-4 border-l-4 border-l-[#6C1D5F] bg-[#6C1D5F]/5 dark:bg-[#FFACE8]/10 rounded-r-xl group">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Certification Expiry Cliff
                </h4>
                <span className="text-[10px] font-black uppercase text-[#6C1D5F] dark:text-[#FFACE8]">
                  Upcoming
                </span>
              </div>
              <p className="text-xs text-gray-500">
                140 AWS Architect certifications expiring in the next 45 days. Recertification
                campaign required.
              </p>
            </div>

            <div className="p-4 border-l-4 border-l-gray-400 bg-gray-50 dark:bg-white/5 rounded-r-xl group">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Underutilized Licenses
                </h4>
                <span className="text-[10px] font-black uppercase text-gray-500">Low Risk</span>
              </div>
              <p className="text-xs text-gray-500">
                Udemy Business licenses running 15% below optimal utilization in the Consulting BU.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
