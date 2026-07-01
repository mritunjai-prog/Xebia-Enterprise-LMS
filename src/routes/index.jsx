import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, GraduationCap, ShieldCheck, Zap } from 'lucide-react';
import logoPurple from '@/assets/logo-purple.png';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#15151f] text-gray-900 dark:text-white flex flex-col font-sans overflow-hidden">
      {/* Navbar */}
      <header className="absolute top-0 w-full z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-3">
          <img src={logoPurple} alt="Xebia" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight">Xebia LMS</span>
            <span className="text-[10px] font-bold text-[#6C1D5F] dark:text-[#01AC9F] tracking-[0.2em] uppercase">Enterprise Edition</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-4">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C1D5F] rounded-full blur-[150px] opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#01AC9F] rounded-full blur-[150px] opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
        
        <div className="max-w-4xl mx-auto text-center z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C1D5F]/10 dark:bg-[#6C1D5F]/20 text-[#6C1D5F] dark:text-pink-300 text-sm font-semibold mb-2">
            <Zap className="w-4 h-4" /> Next-Gen Learning Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Empower your team with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C1D5F] to-[#01AC9F]">world-class learning</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            One unified platform to manage courses, track progress, and deliver exceptional training experiences across your enterprise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              to="/student"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20 dark:shadow-white/10"
            >
              <GraduationCap className="w-5 h-5" />
              Enter as Student
            </Link>
            
            <Link 
              to="/admin"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#6C1D5F] text-white font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-[#6C1D5F]/30"
            >
              <ShieldCheck className="w-5 h-5" />
              Enter as Admin
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>

        {/* Mockup Preview */}
        <div className="mt-20 relative w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#15151f] via-transparent to-transparent z-10 rounded-t-3xl" />
          <div className="bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-t-2xl shadow-2xl overflow-hidden pt-4 px-4 flex gap-4">
             {/* Fake Sidebar */}
             <div className="w-64 shrink-0 rounded-t-xl bg-gray-50 dark:bg-[#15151f] border border-gray-200 dark:border-white/5 opacity-50 hidden md:block h-64" />
             {/* Fake Content */}
             <div className="flex-1 space-y-4 pt-4">
               <div className="h-10 w-full max-w-md bg-gray-100 dark:bg-[#15151f] rounded-lg opacity-50" />
               <div className="flex gap-4">
                 <div className="h-40 flex-1 bg-gray-100 dark:bg-[#15151f] rounded-xl opacity-50" />
                 <div className="h-40 flex-1 bg-gray-100 dark:bg-[#15151f] rounded-xl opacity-50" />
                 <div className="h-40 flex-1 bg-gray-100 dark:bg-[#15151f] rounded-xl opacity-50 hidden lg:block" />
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
