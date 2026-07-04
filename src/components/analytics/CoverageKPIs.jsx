import { Percent, Globe, MapPin, Briefcase, Layers, GraduationCap } from "lucide-react";

const KpiCard = ({ title, value, icon: Icon, colorClass, hoverBorderClass }) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 group ${hoverBorderClass || 'hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]'}`}>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
        <p className={`text-2xl font-black ${colorClass}`}>{value}</p>
      </div>
      <div className={`p-2 rounded-lg bg-gray-50 dark:bg-white/5 ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
);

export function CoverageKPIs() {
  const kpis = [
    { title: "Coverage by Region", value: "98%", icon: Globe, colorClass: "text-[#01AC9F] dark:text-[#01AC9F]", hoverBorderClass: "hover:border-[#01AC9F] dark:hover:border-[#01AC9F]" },
    { title: "Coverage by Location", value: "94%", icon: MapPin, colorClass: "text-[#6C1D5F] dark:text-[#FFACE8]", hoverBorderClass: "hover:border-[#6C1D5F] dark:hover:border-[#FFACE8]" },
    { title: "Coverage by Project", value: "85%", icon: Briefcase, colorClass: "text-[#FF6200] dark:text-[#FF6200]", hoverBorderClass: "hover:border-[#FF6200] dark:hover:border-[#FF6200]" },
    { title: "Coverage by BU", value: "92%", icon: Layers, colorClass: "text-[#84117C] dark:text-[#D3CCEC]", hoverBorderClass: "hover:border-[#84117C] dark:hover:border-[#D3CCEC]" },
    { title: "Coverage by Grade", value: "88%", icon: GraduationCap, colorClass: "text-emerald-500", hoverBorderClass: "hover:border-emerald-500 dark:hover:border-emerald-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {kpis.map((kpi, idx) => (
        <KpiCard key={idx} {...kpi} />
      ))}
    </div>
  );
}
