import { createFileRoute } from '@tanstack/react-router';
import { 
  UserPlus,
  CheckCircle2,
  Award,
  Rocket,
  Timer,
  ChevronRight,
  GraduationCap,
  Download,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute('/admin/analytics/apprentice')({
  component: ApprenticeJourney,
});

function ApprenticeJourney() {
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Apprentice Journey
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
        
        {/* Metric 1: Freshers Hired */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl transition-transform group-hover:scale-110">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Freshers Hired</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">1,248</h4>
          </div>
        </div>

        {/* Metric 2: Training Completion % */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl transition-transform group-hover:scale-110">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Training Completion %</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">88.4%</h4>
            <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1 mt-3 overflow-hidden shadow-inner">
              <div className="bg-[#01AC9F] h-full rounded-full" style={{width: '88.4%'}}></div>
            </div>
          </div>
        </div>

        {/* Metric 3: Certification Completion % */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#FF6200]/10 text-[#FF6200] dark:bg-[#FF6200]/10 dark:text-[#FF6200] rounded-xl transition-transform group-hover:scale-110">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Certification Completion %</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">82.0%</h4>
            <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1 mt-3 overflow-hidden shadow-inner">
              <div className="bg-[#FF6200] h-full rounded-full" style={{width: '82.0%'}}></div>
            </div>
          </div>
        </div>

        {/* Metric 4: Deployment % */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-xl transition-transform group-hover:scale-110">
              <Rocket className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Deployment %</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">74.2%</h4>
            <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-1 mt-3 overflow-hidden shadow-inner">
              <div className="bg-[#6C1D5F] h-full rounded-full" style={{width: '74.2%'}}></div>
            </div>
          </div>
        </div>

        {/* Metric 5: Time to Deployment */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] flex flex-col justify-between h-full group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-[#01AC9F]/10 text-[#01AC9F] dark:bg-[#01AC9F]/10 dark:text-[#01AC9F] rounded-xl transition-transform group-hover:scale-110">
              <Timer className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Time to Deployment</p>
            <h4 className="text-3xl font-black text-gray-900 dark:text-white mt-1">94 <span className="text-base text-gray-400 font-bold">Days</span></h4>
          </div>
        </div>

      </div>

      {/* Main Section: Journey Funnel Visualization */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-300 dark:border-white/20 shadow-sm overflow-hidden mb-8 transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]">
        
        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-[#6C1D5F] rounded-full"></div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Fresher Lifecycle Funnel</h3>
          </div>
        </div>
        
        <div className="p-6 md:p-10 overflow-x-auto">
          <div className="flex justify-between items-start gap-4 min-w-[1000px]">
            
            {/* Stage 1: Campus Hiring */}
            <div className="flex-1 text-center group cursor-pointer">
              <div className="relative h-64 bg-gray-50 dark:bg-white/5 rounded-xl flex flex-col items-center justify-end p-4 transition-all hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity">
                  <GraduationCap className="w-24 h-24 text-[#6C1D5F]" />
                </div>
                <div className="w-full bg-[#6C1D5F] rounded-t-xl h-[95%] transition-all z-10 relative"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="text-4xl font-black text-white drop-shadow-md">100%</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] mb-1">CAMPUS HIRING</p>
                <p className="text-xs font-bold text-gray-500">1,248 Candidates</p>
              </div>
            </div>
            
            <div className="pt-28 shrink-0"><ChevronRight className="w-6 h-6 text-gray-300 dark:text-white/20" /></div>
            
            {/* Stage 2: Training Enrollment */}
            <div className="flex-1 text-center group cursor-pointer">
              <div className="relative h-64 bg-gray-50 dark:bg-white/5 rounded-xl flex flex-col items-center justify-end p-4 transition-all hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="w-full bg-[#6C1D5F]/90 rounded-t-xl h-[92%] transition-all z-10 relative"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="text-4xl font-black text-white drop-shadow-md">92%</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8] mb-1">TRAINING ENROLLMENT</p>
                <p className="text-xs font-bold text-gray-500">1,148 Enrolled</p>
              </div>
            </div>
            
            <div className="pt-28 shrink-0"><ChevronRight className="w-6 h-6 text-gray-300 dark:text-white/20" /></div>
            
            {/* Stage 3: Training Completion */}
            <div className="flex-1 text-center group cursor-pointer">
              <div className="relative h-64 bg-gray-50 dark:bg-white/5 rounded-xl flex flex-col items-center justify-end p-4 transition-all hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="w-full bg-[#01AC9F]/90 rounded-t-xl h-[88%] transition-all z-10 relative"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="text-4xl font-black text-white drop-shadow-md">88%</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] mb-1">TRAINING COMPLETION</p>
                <p className="text-xs font-bold text-gray-500">1,104 Completed</p>
              </div>
            </div>
            
            <div className="pt-28 shrink-0"><ChevronRight className="w-6 h-6 text-gray-300 dark:text-white/20" /></div>
            
            {/* Stage 4: Certification Completion */}
            <div className="flex-1 text-center group cursor-pointer">
              <div className="relative h-64 bg-gray-50 dark:bg-white/5 rounded-xl flex flex-col items-center justify-end p-4 transition-all hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="w-full bg-[#FF6200]/90 rounded-t-xl h-[82%] transition-all z-10 relative"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="text-4xl font-black text-white drop-shadow-md">82%</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#FF6200] mb-1">CERTIFICATION</p>
                <p className="text-xs font-bold text-gray-500">1,023 Certified</p>
              </div>
            </div>
            
            <div className="pt-28 shrink-0"><ChevronRight className="w-6 h-6 text-gray-300 dark:text-white/20" /></div>
            
            {/* Stage 5: Project Allocation */}
            <div className="flex-1 text-center group cursor-pointer">
              <div className="relative h-64 bg-gray-50 dark:bg-white/5 rounded-xl flex flex-col items-center justify-end p-4 transition-all hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="w-full bg-[#01AC9F]/80 rounded-t-xl h-[78%] transition-all z-10 relative"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="text-4xl font-black text-white drop-shadow-md">78%</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] mb-1">ALLOCATION</p>
                <p className="text-xs font-bold text-gray-500">973 Shadow Roles</p>
              </div>
            </div>
            
            <div className="pt-28 shrink-0"><ChevronRight className="w-6 h-6 text-gray-300 dark:text-white/20" /></div>
            
            {/* Stage 6: Billable Deployment */}
            <div className="flex-1 text-center group cursor-pointer">
              <div className="relative h-64 bg-gray-50 dark:bg-white/5 rounded-xl flex flex-col items-center justify-end p-4 transition-all hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="w-full bg-[#01AC9F] rounded-t-xl h-[74%] transition-all z-10 relative"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="text-4xl font-black text-white drop-shadow-md">74%</span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F] mb-1">DEPLOYMENT</p>
                <p className="text-xs font-bold text-gray-500">926 Billable</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
}
