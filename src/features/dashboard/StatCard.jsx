import { motion } from "framer-motion";
import { clsx } from "clsx";

/**
 * A single animated stats card displayed in the dashboard summary row.
 * @param {{ title: string, value: number|string, icon: React.ElementType, trend: string, trendUp: boolean, index?: number }} props
 */
export function StatCard({ title, value, icon: Icon, trend, trendUp, index = 0 }) {
  
  // Dynamic styling based on standard titles
  const getThemeColors = () => {
    if (title.toLowerCase().includes("course")) {
      return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20";
    }
    if (title.toLowerCase().includes("assessment")) {
      return "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20";
    }
    if (title.toLowerCase().includes("completed")) {
      return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20";
    }
    if (title.toLowerCase().includes("notification")) {
      return "bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-purple-500/10 dark:text-purple-400 group-hover:bg-[#6C1D5F]/20 dark:group-hover:bg-purple-500/20";
    }
    return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent dark:from-white/[0.02] dark:to-transparent rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{value}</span>
          </div>
          <p className={clsx("text-xs font-bold mt-2", trendUp ? "text-emerald-500 dark:text-emerald-400" : "text-gray-400 dark:text-gray-500")}>
            {trend}
          </p>
        </div>
        
        <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300", getThemeColors())}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
