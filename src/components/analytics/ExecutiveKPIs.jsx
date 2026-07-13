import { TrendingUp, Users, BookOpen, Award, Sparkles, Star } from "lucide-react";

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

export function ExecutiveKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {/* Learning Reach */}
      <KpiCard
        title="Learning Reach"
        mainValue="82.4%"
        mainLabel="Learning Coverage %"
        icon={Users}
        colorClass="text-[#6C1D5F] dark:text-[#FFACE8]"
        hoverBorderClass="hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-[#6C1D5F]/5 dark:hover:from-[#111] dark:hover:to-[#6C1D5F]/10"
        metrics={[
          { label: "Total Employees", value: "12,500" },
          { label: "Employees Nominated", value: "11,200" },
          { label: "Employees Trained", value: "10,300" },
        ]}
      />

      {/* Learning Delivery */}
      <KpiCard
        title="Learning Delivery"
        mainValue="142.5K"
        mainLabel="Total Learning Hours"
        icon={BookOpen}
        colorClass="text-[#01AC9F]"
        hoverBorderClass="hover:border-[#01AC9F] dark:hover:border-[#01AC9F]"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-[#01AC9F]/5 dark:hover:from-[#111] dark:hover:to-[#01AC9F]/10"
        metrics={[
          { label: "Total Sessions Conducted", value: "4,250" },
          { label: "Total Attendees", value: "85,000" },
          { label: "Total Nominations", value: "92,400" },
          { label: "Average Hours per Session", value: "3.5 hrs" },
        ]}
      />

      {/* Certifications */}
      <KpiCard
        title="Certification Summary"
        mainValue="3,482"
        mainLabel="Total Certifications Completed"
        icon={Award}
        colorClass="text-[#FF6200]"
        hoverBorderClass="hover:border-[#FF6200] dark:hover:border-[#FF6200]"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-[#FF6200]/5 dark:hover:from-[#111] dark:hover:to-[#FF6200]/10"
        metrics={[{ label: "Certification Growth %", value: "24%", trend: "5%" }]}
      />

      {/* AI Readiness */}
      <KpiCard
        title="AI Readiness"
        mainValue="2,450"
        mainLabel="Employees Trained in AI"
        icon={Sparkles}
        colorClass="text-[#84117C] dark:text-[#D3CCEC]"
        hoverBorderClass="hover:border-[#84117C] dark:hover:border-[#D3CCEC]"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-[#84117C]/5 dark:hover:from-[#111] dark:hover:to-[#84117C]/10"
        metrics={[
          { label: "AI Certifications Achieved", value: "890" },
          { label: "AI Learning Hours", value: "12,500" },
        ]}
      />

      {/* Training Effectiveness */}
      <KpiCard
        title="Training Effectiveness"
        mainValue="4.8/5"
        mainLabel="Average Feedback Rating"
        icon={Star}
        colorClass="text-yellow-500"
        hoverBorderClass="hover:border-yellow-500 dark:hover:border-yellow-500"
        gradientClass="hover:bg-gradient-to-br hover:from-white hover:to-yellow-500/5 dark:hover:from-[#111] dark:hover:to-yellow-500/10"
        metrics={[
          { label: "Training Satisfaction Score", value: "96%" },
          { label: "Recommendation %", value: "92%" },
        ]}
      />
    </div>
  );
}
