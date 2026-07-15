import { Card, CardContent } from "@/components/ui/card";
import { clsx } from "clsx";

/**
 * A single stats card displayed in the dashboard summary row.
 * @param {{ title: string, value: number|string, icon: React.ElementType, trend: string, trendUp: boolean, colorClass: string, bgClass: string }} props
 */
export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  colorClass = "text-[#6C1D5F]",
  bgClass = "bg-[#6C1D5F]/10",
}) {
  return (
    <div className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
        <div className={clsx("w-9 h-9 rounded-xl flex items-center justify-center", bgClass)}>
          <Icon className={clsx("w-4 h-4", colorClass)} />
        </div>
      </div>
      <div className="mt-2">
        <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</div>
        <p className={`text-[10px] font-semibold mt-0.5 ${trendUp ? "text-[#01AC9F]" : "text-gray-400 dark:text-gray-500"}`}>
          {trend}
        </p>
      </div>
    </div>
  );
}
