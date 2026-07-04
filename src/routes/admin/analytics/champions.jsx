import { createFileRoute } from '@tanstack/react-router';
import {
  Award,
  Star,
  Brain,
  CheckCircle2,
  Users,
  Download,
  Medal,
  Terminal,
  Palette,
  Cloud,
  Zap,
  Calendar,
  Trophy
} from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GlobalFilters } from "@/components/analytics/GlobalFilters";

export const Route = createFileRoute('/admin/analytics/champions')({
  component: LearningChampions,
});

function LearningChampions() {
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100 p-6 md:p-8 font-sans transition-colors duration-300 space-y-6 pb-12">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            Learning Champions
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

      {/* Top Row: 4 Recognition Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* Category 1: Top Learner of the Quarter */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between group relative overflow-hidden h-[240px]">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#6C1D5F]/10 text-[#6C1D5F] rounded-lg">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F]">Learner of the Quarter</span>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <img className="w-16 h-16 rounded-full object-cover border-2 border-[#6C1D5F] shadow-sm" src="https://i.pravatar.cc/150?u=marcus" alt="Marcus Thorne" />
            <div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">Marcus Thorne</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Cloud Architect</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 relative z-10">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Consistently pushing boundaries in Cloud adoption.</p>
          </div>
        </div>

        {/* Category 2: Top AI Learner */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6200] dark:hover:border-[#FF6200] flex flex-col justify-between group relative overflow-hidden h-[240px]">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#FF6200]/10 text-[#FF6200] rounded-lg">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF6200]">Top AI Learner</span>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <img className="w-16 h-16 rounded-full object-cover border-2 border-[#FF6200] shadow-sm" src="https://i.pravatar.cc/150?u=elena" alt="Elena Rodriguez" />
            <div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">Elena Rodriguez</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Innovation Lead</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 relative z-10">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Mastered 12 Generative AI modules this quarter.</p>
          </div>
        </div>

        {/* Category 3: Top Certified Employee */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01AC9F] dark:hover:border-[#01AC9F] flex flex-col justify-between group relative overflow-hidden h-[240px]">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#01AC9F]/10 text-[#01AC9F] rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#01AC9F]">Top Certified</span>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <img className="w-16 h-16 rounded-full object-cover border-2 border-[#01AC9F] shadow-sm" src="https://i.pravatar.cc/150?u=chen" alt="Chen Wei" />
            <div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">Chen Wei</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Lead Engineer</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 relative z-10">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Achieved GCP Pro & Azure Architect in Q2.</p>
          </div>
        </div>

        {/* Category 4: Learning Champion */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] flex flex-col justify-between group relative overflow-hidden h-[240px]">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6C1D5F] dark:text-[#FFACE8]">Learning Champion</span>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <img className="w-16 h-16 rounded-full object-cover border-2 border-[#6C1D5F] dark:border-[#FFACE8] shadow-sm" src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Jenkins" />
            <div>
              <h4 className="text-xl font-black text-gray-900 dark:text-white">Sarah Jenkins</h4>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">HR Director</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10 relative z-10">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Highest active participation & community mentoring.</p>
          </div>
        </div>

      </div>

      {/* Main Section: Top Learners Table */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-300 dark:border-white/20 shadow-sm overflow-hidden mb-8 transition-all duration-300 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]">

        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-[#6C1D5F] rounded-full"></div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Top Learners Leaderboard</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Rank</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Learner</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Learning Hours</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Certifications</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">AI Learning</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-gray-500">Training Participation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">

              {/* Row 1 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-5">
                  <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/10 text-[#6C1D5F] flex items-center justify-center font-black text-sm border border-[#6C1D5F]/20 shadow-sm">01</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/150?u=marcus" alt="Marcus Thorne" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">Marcus Thorne</div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-0.5">Cloud Architect</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">142.5<span className="text-xs text-gray-400">h</span></td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-[#01AC9F]" />
                    <span className="text-base font-black text-gray-900 dark:text-white">08</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF6200]/10 text-[#FF6200]">
                    AI Expert
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mb-2">
                    <div className="h-full bg-[#6C1D5F] w-[98%] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">98% Active</span>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-5">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center font-black text-sm border border-gray-200 dark:border-white/20 shadow-sm">02</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/150?u=elena" alt="Elena Rodriguez" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">Elena Rodriguez</div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-0.5">Innovation Lead</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">128.0<span className="text-xs text-gray-400">h</span></td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-[#01AC9F]" />
                    <span className="text-base font-black text-gray-900 dark:text-white">06</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF6200]/10 text-[#FF6200]">
                    AI Champion
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mb-2">
                    <div className="h-full bg-[#6C1D5F] w-[92%] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">92% Active</span>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-5">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center font-black text-sm border border-gray-200 dark:border-white/20 shadow-sm">03</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/150?u=chen" alt="Chen Wei" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">Chen Wei</div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-0.5">Lead Engineer</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">119.2<span className="text-xs text-gray-400">h</span></td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-[#01AC9F]" />
                    <span className="text-base font-black text-gray-900 dark:text-white">09</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                    Advanced
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mb-2">
                    <div className="h-full bg-[#6C1D5F] w-[85%] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">85% Active</span>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-5">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center font-black text-sm border border-gray-200 dark:border-white/20 shadow-sm">04</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-full object-cover shadow-sm" src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Jenkins" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">Sarah Jenkins</div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-gray-500 mt-0.5">HR Director</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-base font-black text-gray-900 dark:text-white">104.5<span className="text-xs text-gray-400">h</span></td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-[#01AC9F]" />
                    <span className="text-base font-black text-gray-900 dark:text-white">04</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF6200]/10 text-[#FF6200]">
                    AI Explorer
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden shadow-inner mb-2">
                    <div className="h-full bg-[#6C1D5F] w-[94%] shadow-sm"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">94% Active</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
