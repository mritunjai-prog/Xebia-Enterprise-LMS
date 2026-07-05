import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Globe,
  Briefcase,
  UserCheck,
  TrendingUp,
  Download,
  Calendar,
  Cloud,
  Database,
  ArrowRight,
  RefreshCw,
  Maximize,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute("/admin/analytics/certifications")({
  component: Certifications,
});

function Certifications() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Certifications
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

      {/* Top Row: 5 Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">
              TOTAL
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Total Certifications
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">2,450</h4>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
              <Cloud className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] px-3 py-1 bg-[#01AC9F]/10 rounded-lg">
              TECH
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                By Technology (Top)
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                AWS <span className="text-lg text-gray-400">42%</span>
              </h4>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] px-3 py-1 bg-[#FF6200]/10 rounded-lg">
              REGION
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                By Region (Top)
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                NA <span className="text-lg text-gray-400">38%</span>
              </h4>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">
              PROJECT
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Active Cert Projects
            </p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">112</h4>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] px-3 py-1 bg-[#01AC9F]/10 rounded-lg">
              GRADE
            </span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                By Grade (Top)
              </p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                L3 <span className="text-lg text-gray-400">28%</span>
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Funnel */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Certification Lifecycle Funnel */}
        <div className="col-span-12 bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                Certification Funnel
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">
              LIFECYCLE
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-gray-600 dark:text-gray-300">1. Assigned</span>
                <span className="text-[#6C1D5F] dark:text-[#FFACE8]">1,200 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg w-full transition-all duration-1000"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-gray-600 dark:text-gray-300">2. Enrolled</span>
                <span className="text-[#6C1D5F] dark:text-[#FFACE8]">940 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-gray-500 to-[#6C1D5F] rounded-lg w-[78%] transition-all duration-1000 delay-100"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-gray-600 dark:text-gray-300">3. Started</span>
                <span className="text-[#6C1D5F] dark:text-[#FFACE8]">720 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#6C1D5F] to-[#802270] rounded-lg w-[60%] transition-all duration-1000 delay-200"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-[#01AC9F]">4. Completed</span>
                <span className="text-gray-500">580 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#01AC9F] to-[#018F84] rounded-lg w-[48%] transition-all duration-1000 delay-300"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-[#FF6200]">5. Submitted</span>
                <span className="text-gray-500">425 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#FF6200] to-[#E55800] rounded-lg w-[35%] transition-all duration-1000 delay-400"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-900 dark:text-white">
                <span className="text-[#01AC9F]">6. Approved in Zoho</span>
                <span className="text-gray-500">392 Users</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden shadow-inner p-0.5">
                <div className="h-full bg-gradient-to-r from-[#01AC9F] to-[#01AC9F] rounded-lg w-[32%] transition-all duration-1000 delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Table */}
      <section className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                High Demand Certifications
              </h3>
              <p className="text-xs font-medium text-gray-500 mt-1">
                Top certifications driving enterprise capability
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-lg text-[10px] font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 transition-colors shadow-sm">
            View All Data
          </button>
        </div>

        <div className="overflow-x-auto custom-scrollbar pb-4">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10">
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Certification Focus
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Demand Level
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Enrolments
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Success Rate
                </th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors cursor-pointer">
                  Databricks
                </td>
                <td className="p-2">
                  <div className="w-32 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="bg-[#6C1D5F] h-full rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">245</td>
                <td className="p-2 font-black text-[#01AC9F]">88%</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#FFACE8] rounded text-[10px] font-black uppercase tracking-wider">
                    CRITICAL
                  </span>
                </td>
              </tr>

              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 font-bold text-gray-900 dark:text-white group-hover:text-[#01AC9F] transition-colors cursor-pointer">
                  AWS (Amazon Web Services)
                </td>
                <td className="p-2">
                  <div className="w-32 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="bg-[#01AC9F] h-full rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">189</td>
                <td className="p-2 font-black text-[#01AC9F]">82%</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-[#01AC9F]/10 text-[#01AC9F] rounded text-[10px] font-black uppercase tracking-wider">
                    HIGH
                  </span>
                </td>
              </tr>

              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 font-bold text-gray-900 dark:text-white group-hover:text-[#FF6200] transition-colors cursor-pointer">
                  Microsoft Azure
                </td>
                <td className="p-2">
                  <div className="w-32 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FF6200] h-full rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">142</td>
                <td className="p-2 font-black text-[#01AC9F]">79%</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-[#FF6200]/10 text-[#FF6200] rounded text-[10px] font-black uppercase tracking-wider">
                    HIGH
                  </span>
                </td>
              </tr>

              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 font-bold text-gray-900 dark:text-white group-hover:text-gray-500 transition-colors cursor-pointer">
                  Google Cloud Platform (GCP)
                </td>
                <td className="p-2">
                  <div className="w-32 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="bg-gray-400 h-full rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">96</td>
                <td className="p-2 font-black text-[#01AC9F]">85%</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-[10px] font-black uppercase tracking-wider">
                    STABLE
                  </span>
                </td>
              </tr>

              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 font-bold text-gray-900 dark:text-white group-hover:text-[#01AC9F] transition-colors cursor-pointer">
                  Snowflake
                </td>
                <td className="p-2">
                  <div className="w-32 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="bg-[#01AC9F] h-full rounded-full"
                      style={{ width: "55%" }}
                    ></div>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">72</td>
                <td className="p-2 font-black text-[#01AC9F]">91%</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-[#01AC9F]/10 text-[#01AC9F] rounded text-[10px] font-black uppercase tracking-wider">
                    GROWING
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-4 font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] transition-colors cursor-pointer">
                  PMP (Project Management)
                </td>
                <td className="p-2">
                  <div className="w-32 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="bg-[#6C1D5F] h-full rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">64</td>
                <td className="p-2 font-black text-[#01AC9F]">74%</td>
                <td className="p-2">
                  <span className="px-2 py-1 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#FFACE8] rounded text-[10px] font-black uppercase tracking-wider">
                    STABLE
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
