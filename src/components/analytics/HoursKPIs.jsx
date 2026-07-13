import { TrendingUp, Clock, UserCheck, Globe, FolderKanban, User } from "lucide-react";

const KpiCard = ({
  title,
  mainValue,
  mainLabel,
  icon: Icon,
  colorClass,
  gradientClass,
  hoverBorderClass,
  metrics,
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 group ${hoverBorderClass || "hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]"} ${gradientClass}`}
  >
    <div className="flex justify-between items-start mb-3 relative z-10">
      <div>
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
          {title}
        </h3>
        <div className="flex flex-col gap-0.5">
          <p className={`text-2xl font-black ${colorClass}`}>{mainValue}</p>
          <span className="text-[11px] font-medium text-gray-500">{mainLabel}</span>
        </div>
      </div>
      <div className={`p-2 rounded-lg bg-gray-50 dark:bg-white/5 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>

    <div className="relative z-10 mt-4 space-y-2">
      {metrics.map((metric, idx) => (
        <div key={idx} className="flex justify-between items-center text-xs">
          <span className="text-gray-600 dark:text-gray-400">{metric.label}</span>
          <span className={`font-bold flex items-center gap-1.5 ${colorClass}`}>
            {metric.value}
            {metric.trend && (
              <span className="text-[10px] text-accent-2 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                {metric.trend}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export function HoursKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {/* Total Learning Hours */}
      <KpiCard
        title="Total Learning Hours"
        mainValue="142.5K"
        mainLabel="Total Hours Logged"
        icon={Clock}
        colorClass="text-[#FF6200]"
        hoverBorderClass="hover:border-[#FF6200] dark:hover:border-[#FF6200]"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-[#FF6200]/5 dark:hover:from-[#111] dark:hover:to-[#FF6200]/10"
        metrics={[
          { label: "Target Hours", value: "150K" },
          { label: "Completion vs Target", value: "95%", trend: "2%" },
          { label: "Hours Pending", value: "7.5K" },
        ]}
      />

      {/* Average Hours Per Employee */}
      <KpiCard
        title="Avg. Hours / Employee"
        mainValue="14.2"
        mainLabel="Hours per Person"
        icon={UserCheck}
        colorClass="text-[#01AC9F]"
        hoverBorderClass="hover:border-[#01AC9F] dark:hover:border-[#01AC9F]"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-[#01AC9F]/5 dark:hover:from-[#111] dark:hover:to-[#01AC9F]/10"
        metrics={[
          { label: "Company Benchmark", value: "12.0" },
          { label: "Highest Avg BU", value: "18.5" },
          { label: "Lowest Avg BU", value: "9.2" },
        ]}
      />

      {/* Required vs Elective */}
      <KpiCard
        title="Required vs Elective"
        mainValue="68 / 32"
        mainLabel="Ratio Percentage"
        icon={FolderKanban}
        colorClass="text-[#6C1D5F] dark:text-[#FFACE8]"
        hoverBorderClass="hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-[#6C1D5F]/5 dark:hover:from-[#111] dark:hover:to-[#6C1D5F]/10"
        metrics={[
          { label: "Required Hours", value: "96.9K" },
          { label: "Elective Hours", value: "45.6K" },
        ]}
      />

      {/* Top Region */}
      <KpiCard
        title="Top Region by Hours"
        mainValue="NA"
        mainLabel="North America"
        icon={Globe}
        colorClass="text-[#84117C] dark:text-[#D3CCEC]"
        hoverBorderClass="hover:border-[#84117C] dark:hover:border-[#D3CCEC]"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-[#84117C]/5 dark:hover:from-[#111] dark:hover:to-[#84117C]/10"
        metrics={[
          { label: "Total Region Hours", value: "62.4K" },
          { label: "Avg per Person", value: "16.8" },
        ]}
      />

      {/* Engagement Status */}
      <KpiCard
        title="Learner Engagement"
        mainValue="High"
        mainLabel="Overall Status"
        icon={User}
        colorClass="text-accent-2"
        hoverBorderClass="hover:border-accent-2 dark:hover:border-accent-2"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-accent-2/5 dark:hover:from-[#111] dark:hover:to-accent-2/10"
        metrics={[
          { label: "Active Learners", value: "85%" },
          { label: "Dormant Learners", value: "15%" },
        ]}
      />
    </div>
  );
}
