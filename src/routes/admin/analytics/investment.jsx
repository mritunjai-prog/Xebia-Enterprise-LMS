import { createFileRoute } from '@tanstack/react-router';
import { 
  Users, 
  Clock, 
  Award, 
  Brain, 
  Target, 
  Download,
  Server,
  Cpu,
  Wallet,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute('/admin/analytics/investment')({
  component: ProjectInvestment,
});

function ProjectInvestment() {
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Project Learning Investment
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Reporting Period: April 1 - June 30, 2026 • Last updated: {lastUpdated}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Button 
            size="sm" 
            className="bg-[#6C1D5F] hover:bg-[#4A1E47] text-white shadow-sm transition-all"
          >
            <Download className="w-4 h-4 mr-2" />Export Report</Button>
        </div>
      </div>

      {/* Global Filters */}
      <GlobalFilters />

      {/* Top Row: 5 Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
        
        {/* Metric 1: Employees Trained */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl transition-transform group-hover:scale-110">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Employees Trained</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">1,284</h4>
          </div>
        </div>

        {/* Metric 2: Learning Hours */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl transition-transform group-hover:scale-110">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Learning Hours</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">14.2<span className="text-xl text-gray-400">k</span></h4>
          </div>
        </div>

        {/* Metric 3: Certifications */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl transition-transform group-hover:scale-110">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Certifications</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">852</h4>
          </div>
        </div>

        {/* Metric 4: AI Readiness Score */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl transition-transform group-hover:scale-110">
              <Brain className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">AI Readiness Score</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">78.2</h4>
            <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1 mt-3 overflow-hidden shadow-inner">
              <div className="bg-[#6C1D5F] h-full rounded-full" style={{width: '78.2%'}}></div>
            </div>
          </div>
        </div>

        {/* Metric 5: Training Coverage % */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl transition-transform group-hover:scale-110">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Training Coverage</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">64%</h4>
            <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1 mt-3 overflow-hidden shadow-inner">
              <div className="bg-[#01AC9F] h-full rounded-full" style={{width: '64%'}}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Main Section: Project Analysis Leaderboard */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-300 dark:border-white/20 shadow-sm overflow-hidden mb-8 transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]">
        
        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-[#6C1D5F] rounded-full"></div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Project Learning Analysis</h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Project Name</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Employees Trained</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Learning Hours</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Certifications</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">AI Readiness Score</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Training Coverage %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              
              {/* Row 1 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#6C1D5F]/10 flex items-center justify-center text-[#6C1D5F] dark:text-[#FFACE8] border border-[#6C1D5F]/20 transition-transform">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">Cloud Migration Phoenix</div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-0.5">Infrastructure Div.</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">342</td>
                <td className="px-6 py-5 text-base font-black text-[#6C1D5F] dark:text-[#FFACE8]">4,820<span className="text-xs text-gray-400">h</span></td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-black text-gray-900 dark:text-white">124</span>
                    <span className="px-1.5 py-0.5 bg-[#01AC9F]/10 text-[#01AC9F] text-[9px] rounded font-black border border-[#01AC9F]/20">TOP 5%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3 w-32">
                    <div className="flex-1 bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-[#6C1D5F] h-full shadow-sm" style={{width: '88%'}}></div>
                    </div>
                    <span className="text-sm font-black text-[#6C1D5F] dark:text-[#FFACE8]">88</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mb-2">
                    <div className="h-full bg-[#01AC9F] w-[92%] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">92%</span>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#01AC9F]/10 flex items-center justify-center text-[#01AC9F] border border-[#01AC9F]/20 transition-transform">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">Project Synergy AI</div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-0.5">R&D Core</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">186</td>
                <td className="px-6 py-5 text-base font-black text-[#6C1D5F] dark:text-[#FFACE8]">2,910<span className="text-xs text-gray-400">h</span></td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">98</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3 w-32">
                    <div className="flex-1 bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-[#6C1D5F] h-full shadow-sm" style={{width: '94%'}}></div>
                    </div>
                    <span className="text-sm font-black text-[#6C1D5F] dark:text-[#FFACE8]">94</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mb-2">
                    <div className="h-full bg-[#01AC9F] w-[84%] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">84%</span>
                </td>
              </tr>
              
              {/* Row 3 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6200]/10 flex items-center justify-center text-[#FF6200] border border-[#FF6200]/20 transition-transform">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">FinTech Revamp 2.0</div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-0.5">Global Finance</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">512</td>
                <td className="px-6 py-5 text-base font-black text-[#6C1D5F] dark:text-[#FFACE8]">3,200<span className="text-xs text-gray-400">h</span></td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">156</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3 w-32">
                    <div className="flex-1 bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-[#6C1D5F] h-full shadow-sm" style={{width: '62%'}}></div>
                    </div>
                    <span className="text-sm font-black text-[#6C1D5F] dark:text-[#FFACE8]">62</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mb-2">
                    <div className="h-full bg-[#01AC9F] w-[45%] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">45%</span>
                </td>
              </tr>
              
              {/* Row 4 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 transition-transform">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">Zero Trust Initiative</div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-0.5">Cyber Security</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">84</td>
                <td className="px-6 py-5 text-base font-black text-[#6C1D5F] dark:text-[#FFACE8]">1,840<span className="text-xs text-gray-400">h</span></td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">72</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3 w-32">
                    <div className="flex-1 bg-gray-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-[#6C1D5F] h-full shadow-sm" style={{width: '74%'}}></div>
                    </div>
                    <span className="text-sm font-black text-[#6C1D5F] dark:text-[#FFACE8]">74</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mb-2">
                    <div className="h-full bg-[#01AC9F] w-[100%] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">100%</span>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
