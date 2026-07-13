import { Lightbulb, TrendingUp, ShieldAlert, Target, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ExecutiveInsights() {
  return (
    <>
      {/* Auto-Generated Insights */}
      <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#FFACE8] dark:hover:border-[#6C1D5F] transition-colors duration-300 h-full flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#FFACE8] dark:text-[#FFACE8]" />
          Executive Insights
        </h3>

        <div className="space-y-4 flex-1">
          <div className="p-4 rounded-xl bg-accent-2/10 dark:bg-accent-2 border border-accent-2/20 dark:border-accent-2">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-accent-2 dark:text-accent-2 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Growth Exceeds Target
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Learning Coverage increased by 12% this quarter, exceeding the 10% organizational
                  target. AI Training adoption improved by a record 18%.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FF6200]/5 border border-[#FF6200]/10">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#FF6200] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Risk Indicator
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Cybersecurity compliance in the Middle East region has dropped below 60%.
                  Mandatory nudges have been scheduled.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#01AC9F]/5 border border-[#01AC9F]/10">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-[#01AC9F] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Recommendation
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Feedback score reached 4.8/5 for Leadership tracks. Consider expanding the
                  'Executive Presence' module globally.
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
          Organizational Leaderboard
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

          {/* Top Practices */}
          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
              Top Practices (AI Adoption)
            </h4>
            <div className="space-y-4">
              {[
                { name: "Data & AI", score: "100%", trend: "-" },
                { name: "Software Development", score: "92%", trend: "+12%" },
                { name: "Cloud Architecture", score: "88%", trend: "+8%" },
                { name: "Agile Consulting", score: "76%", trend: "+15%" },
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
