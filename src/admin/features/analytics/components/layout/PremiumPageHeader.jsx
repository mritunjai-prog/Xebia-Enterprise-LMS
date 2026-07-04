import React from "react";
import { Badge } from "@/components/ui/badge";
import { clsx } from "clsx";

export function PremiumPageHeader({
  title,
  description,
  icon: Icon,
  badgeText,
  badgeColor = "indigo",
}) {
  // Mapping for badge colors to ensure vibrant glow
  const colorMap = {
    indigo: {
      bg: "bg-indigo-500/10 dark:bg-indigo-500/20",
      text: "text-indigo-600 dark:text-indigo-300",
      border: "border-indigo-200 dark:border-indigo-500/30",
      iconBg: "bg-indigo-500/10 dark:bg-indigo-500/10",
      glow: "from-indigo-500/5 to-transparent",
    },
    emerald: {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      text: "text-emerald-600 dark:text-emerald-300",
      border: "border-emerald-200 dark:border-emerald-500/30",
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/10",
      glow: "from-emerald-500/5 to-transparent",
    },
    blue: {
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      text: "text-blue-600 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-500/30",
      iconBg: "bg-blue-500/10 dark:bg-blue-500/10",
      glow: "from-blue-500/5 to-transparent",
    },
    purple: {
      bg: "bg-[#6C1D5F]/10 dark:bg-purple-500/20",
      text: "text-[#6C1D5F] dark:text-purple-300",
      border: "border-[#6C1D5F]/20 dark:border-purple-500/30",
      iconBg: "bg-[#6C1D5F]/10 dark:bg-purple-500/10",
      glow: "from-[#6C1D5F]/5 dark:from-purple-500/5 to-transparent",
    },
    amber: {
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      text: "text-amber-600 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-500/30",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/10",
      glow: "from-amber-500/5 to-transparent",
    },
    rose: {
      bg: "bg-rose-500/10 dark:bg-rose-500/20",
      text: "text-rose-600 dark:text-rose-300",
      border: "border-rose-200 dark:border-rose-500/30",
      iconBg: "bg-rose-500/10 dark:bg-rose-500/10",
      glow: "from-rose-500/5 to-transparent",
    },
    fuchsia: {
      bg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/20",
      text: "text-fuchsia-600 dark:text-fuchsia-300",
      border: "border-fuchsia-200 dark:border-fuchsia-500/30",
      iconBg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/10",
      glow: "from-fuchsia-500/5 to-transparent",
    },
    cyan: {
      bg: "bg-cyan-500/10 dark:bg-cyan-500/20",
      text: "text-cyan-600 dark:text-cyan-300",
      border: "border-cyan-200 dark:border-cyan-500/30",
      iconBg: "bg-cyan-500/10 dark:bg-cyan-500/10",
      glow: "from-cyan-500/5 to-transparent",
    },
    teal: {
      bg: "bg-teal-500/10 dark:bg-teal-500/20",
      text: "text-teal-600 dark:text-teal-300",
      border: "border-teal-200 dark:border-teal-500/30",
      iconBg: "bg-teal-500/10 dark:bg-teal-500/10",
      glow: "from-teal-500/5 to-transparent",
    },
  };

  const theme = colorMap[badgeColor] || colorMap.indigo;

  return (
    <div className="relative overflow-hidden mb-10 p-8 sm:p-10 bg-white/70 dark:bg-[#15151f]/70 rounded-3xl border border-white/50 dark:border-[#2e2e3e] shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl group">
      {/* Background Glow Effect */}
      <div
        className={clsx(
          "absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50 dark:opacity-70 pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-100",
          theme.glow,
        )}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div className="flex items-start gap-5">
          {Icon && (
            <div
              className={clsx(
                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 dark:border-white/5 shadow-inner backdrop-blur-md transition-transform duration-500 group-hover:scale-105",
                theme.iconBg,
                theme.text,
              )}
            >
              <Icon className="w-7 h-7" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
                {title}
              </h1>
              {badgeText && (
                <Badge
                  className={clsx(
                    "px-3 py-1 rounded-full font-bold shadow-sm backdrop-blur-md border",
                    theme.bg,
                    theme.text,
                    theme.border,
                  )}
                >
                  {badgeText}
                </Badge>
              )}
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
