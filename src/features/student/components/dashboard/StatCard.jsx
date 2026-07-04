import { Card, CardContent } from "@/components/ui/card";
import { clsx } from "clsx";

/**
 * A single stats card displayed in the dashboard summary row.
 * @param {{ title: string, value: number|string, icon: React.ElementType, trend: string, trendUp: boolean, colorClass: string, bgClass: string }} props
 */
export function StatCard({ title, value, icon: Icon, trend, trendUp, colorClass = "text-[#6C1D5F]", bgClass = "bg-[#6C1D5F]/10" }) {
  return (
    <Card className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-glow hover:border-[#6C1D5F] dark:hover:border-[#D3CCEC] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden">
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{title}</p>
          <div className={clsx("h-12 w-12 rounded-xl flex items-center justify-center", bgClass)}>
            <Icon className={clsx("h-6 w-6", colorClass)} />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</div>
          <p className={`text-xs font-semibold ${trendUp ? "text-emerald-500" : "text-gray-500 dark:text-gray-400"}`}>
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
