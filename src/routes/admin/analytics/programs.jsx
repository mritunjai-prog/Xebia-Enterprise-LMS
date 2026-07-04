import { createFileRoute } from '@tanstack/react-router';
import { 
  Users, 
  CheckCircle2, 
  Award, 
  Clock, 
  Star,
  Download,
  Calendar,
  LayoutGrid,
  TrendingUp,
  RefreshCw,
  Maximize
} from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute('/admin/analytics/programs')({
  component: FlagshipPrograms,
});

function FlagshipPrograms() {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Flagship Programs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Reporting Period: April 1 - June 30, 2026 • Last updated: {lastUpdated}
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
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">GLOBAL</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Participants</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">12,482</h4>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] px-3 py-1 bg-[#01AC9F]/10 rounded-lg">RATE</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Completion %</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">84.2%</h4>
            </div>
            <div className="text-sm font-bold text-[#01AC9F]">+2.4%</div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] px-3 py-1 bg-[#FF6200]/10 rounded-lg">EFFORT</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Learning Hours</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">45.2K</h4>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <Star className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] px-3 py-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 rounded-lg">QUALITY</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Feedback Score</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">4.8<span className="text-lg text-gray-400">/5</span></h4>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] group flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] px-3 py-1 bg-[#01AC9F]/10 rounded-lg">IMPACT</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Certifications Achieved</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">3,105</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Strategic Programs Tracking */}
      <section className="bg-white dark:bg-[#111111] p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] group">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">Strategic Programs Tracking</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">Detailed performance metrics for all flagship initiatives</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar pb-4">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10">
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Program Name</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Participants</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Completion %</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Learning Hours</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-center">Feedback</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-center">Certifications</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              
              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-5 font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  <div className="flex flex-col">
                    <span>YMP (Young Managers Program)</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] mt-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 w-fit px-1.5 py-0.5 rounded">Leadership</span>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">1,240</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#01AC9F]">92%</span>
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-[#01AC9F] h-full rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                </td>
                <td className="p-2 font-bold text-gray-600 dark:text-gray-300">12,400h</td>
                <td className="p-2">
                  <div className="flex justify-center items-center gap-1 font-black text-gray-900 dark:text-white">
                    4.8 <Star className="w-3.5 h-3.5 text-[#FF6200] fill-current" />
                  </div>
                </td>
                <td className="p-2 text-center font-black text-gray-900 dark:text-white">
                  420
                </td>
              </tr>
              
              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-5 font-bold text-gray-900 dark:text-white group-hover:text-[#01AC9F] transition-colors">
                  <div className="flex flex-col">
                    <span>Quantum Shift</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] mt-1 bg-[#01AC9F]/10 w-fit px-1.5 py-0.5 rounded">Technology</span>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">850</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#01AC9F]">76%</span>
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-[#01AC9F] h-full rounded-full" style={{width: '76%'}}></div>
                    </div>
                  </div>
                </td>
                <td className="p-2 font-bold text-gray-600 dark:text-gray-300">8,500h</td>
                <td className="p-2">
                  <div className="flex justify-center items-center gap-1 font-black text-gray-900 dark:text-white">
                    4.5 <Star className="w-3.5 h-3.5 text-[#FF6200] fill-current" />
                  </div>
                </td>
                <td className="p-2 text-center font-black text-gray-900 dark:text-white">
                  190
                </td>
              </tr>
              
              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-5 font-bold text-gray-900 dark:text-white group-hover:text-[#FF6200] transition-colors">
                  <div className="flex flex-col">
                    <span>Tech AI Thon</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] mt-1 bg-[#FF6200]/10 w-fit px-1.5 py-0.5 rounded">Innovation</span>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">3,200</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#FF6200]">68%</span>
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-[#FF6200] h-full rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                </td>
                <td className="p-2 font-bold text-gray-600 dark:text-gray-300">6,400h</td>
                <td className="p-2">
                  <div className="flex justify-center items-center gap-1 font-black text-gray-900 dark:text-white">
                    4.9 <Star className="w-3.5 h-3.5 text-[#FF6200] fill-current" />
                  </div>
                </td>
                <td className="p-2 text-center font-black text-gray-900 dark:text-white">
                  1,200
                </td>
              </tr>
              
              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-5 font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  <div className="flex flex-col">
                    <span>Databricks Program</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] mt-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 w-fit px-1.5 py-0.5 rounded">Data Eng</span>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">540</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#01AC9F]">94%</span>
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-[#01AC9F] h-full rounded-full" style={{width: '94%'}}></div>
                    </div>
                  </div>
                </td>
                <td className="p-2 font-bold text-gray-600 dark:text-gray-300">4,120h</td>
                <td className="p-2">
                  <div className="flex justify-center items-center gap-1 font-black text-gray-900 dark:text-white">
                    4.7 <Star className="w-3.5 h-3.5 text-[#FF6200] fill-current" />
                  </div>
                </td>
                <td className="p-2 text-center font-black text-gray-900 dark:text-white">
                  492
                </td>
              </tr>
              
              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-5 font-bold text-gray-900 dark:text-white group-hover:text-[#01AC9F] transition-colors">
                  <div className="flex flex-col">
                    <span>GCV Certification Program</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-1 bg-gray-100 dark:bg-white/10 w-fit px-1.5 py-0.5 rounded">Certification</span>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">2,100</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#01AC9F]">88%</span>
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-[#01AC9F] h-full rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>
                </td>
                <td className="p-2 font-bold text-gray-600 dark:text-gray-300">5,800h</td>
                <td className="p-2">
                  <div className="flex justify-center items-center gap-1 font-black text-gray-900 dark:text-white">
                    4.6 <Star className="w-3.5 h-3.5 text-[#FF6200] fill-current" />
                  </div>
                </td>
                <td className="p-2 text-center font-black text-gray-900 dark:text-white">
                  1,840
                </td>
              </tr>
              
              <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-5 font-bold text-gray-900 dark:text-white group-hover:text-[#FF6200] transition-colors">
                  <div className="flex flex-col">
                    <span>Kiro Learning Initiative</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] mt-1 bg-[#FF6200]/10 w-fit px-1.5 py-0.5 rounded">Change Mgmt</span>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">1,120</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#01AC9F]">79%</span>
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-[#01AC9F] h-full rounded-full" style={{width: '79%'}}></div>
                    </div>
                  </div>
                </td>
                <td className="p-2 font-bold text-gray-600 dark:text-gray-300">7,840h</td>
                <td className="p-2">
                  <div className="flex justify-center items-center gap-1 font-black text-gray-900 dark:text-white">
                    4.9 <Star className="w-3.5 h-3.5 text-[#FF6200] fill-current" />
                  </div>
                </td>
                <td className="p-2 text-center font-black text-gray-900 dark:text-white">
                  84
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-5 font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                  <div className="flex flex-col">
                    <span>Copilot Learning Initiative</span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] mt-1 bg-[#6C1D5F]/10 dark:bg-[#FFACE8]/10 w-fit px-1.5 py-0.5 rounded">AI Adoption</span>
                  </div>
                </td>
                <td className="p-2 font-black text-gray-900 dark:text-white">6,840</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#01AC9F]">91%</span>
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden hidden sm:block">
                      <div className="bg-[#01AC9F] h-full rounded-full" style={{width: '91%'}}></div>
                    </div>
                  </div>
                </td>
                <td className="p-2 font-bold text-gray-600 dark:text-gray-300">14,200h</td>
                <td className="p-2">
                  <div className="flex justify-center items-center gap-1 font-black text-gray-900 dark:text-white">
                    4.8 <Star className="w-3.5 h-3.5 text-[#FF6200] fill-current" />
                  </div>
                </td>
                <td className="p-2 text-center font-black text-gray-900 dark:text-white">
                  4,100
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </section>
      
    </div>
  );
}
