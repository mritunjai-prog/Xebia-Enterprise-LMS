import { Lightbulb, TrendingUp, AlertTriangle, MapPin, Award, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function CoverageInsights() {
  return (
    <>
      {/* Auto-Generated Insights */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#FFACE8] dark:hover:border-[#6C1D5F] transition-colors duration-300 h-full flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#FFACE8] dark:text-[#FFACE8]" />
          Coverage Insights
        </h3>

        <div className="space-y-4 flex-1">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Coverage Milestone
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Overall Learning Coverage increased by 15% this quarter. The APAC region leads
                  globally, achieving a record 98% coverage.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FF6200]/5 border border-[#FF6200]/10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#FF6200] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Low Participation Alert
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  The Middle East region and specifically the 'Sales' business unit are showing
                  below-target participation rates (65%). Intervention is recommended.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#01AC9F]/5 border border-[#01AC9F]/10">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-[#01AC9F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Grade Coverage Trends
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Junior and Senior grades show 90%+ coverage, but Executive-level participation is
                  lagging at 40%. Specialized executive tracks should be promoted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboards */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300 h-full flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#6C1D5F] dark:text-[#FFACE8]" />
          Top Rankings
        </h3>

        <div className="flex flex-col gap-8 flex-1">
          {/* Top Regions */}
          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
              Top Performing Regions
            </h4>
            <div className="space-y-4">
              {[
                { name: "APAC", score: "98%", trend: "+2%" },
                { name: "North America", score: "94%", trend: "+1%" },
                { name: "Europe", score: "89%", trend: "-1%" },
                { name: "Latin America", score: "82%", trend: "+5%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-black w-5 h-5 rounded-full flex items-center justify-center ${i === 0 ? "bg-[#FFACE8] text-[#6C1D5F]" : "bg-gray-100 dark:bg-white/10 text-gray-500"}`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#FFACE8] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{item.trend}</span>
                    <Badge
                      variant="outline"
                      className="font-bold border-[#01AC9F]/20 text-[#01AC9F] bg-[#01AC9F]/5"
                    >
                      {item.score}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Projects */}
          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
              Highest Engagement Projects
            </h4>
            <div className="space-y-4">
              {[
                { name: "Project Alpha (AI)", score: "100%", trend: "-" },
                { name: "Cloud Migration V2", score: "95%", trend: "+12%" },
                { name: "Global ERP Rollout", score: "90%", trend: "+8%" },
                { name: "CyberSec 2026", score: "85%", trend: "+15%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-black w-5 h-5 rounded-full flex items-center justify-center ${i === 0 ? "bg-[#01AC9F]/20 text-[#01AC9F]" : "bg-gray-100 dark:bg-white/10 text-gray-500"}`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#01AC9F] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{item.trend}</span>
                    <Badge
                      variant="outline"
                      className="font-bold border-[#6C1D5F]/20 text-[#6C1D5F] dark:text-[#FFACE8] bg-[#6C1D5F]/5 dark:bg-[#FFACE8]/5"
                    >
                      {item.score}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
