import React from 'react';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function MetricCard({ title, value, icon: Icon, trend, trendValue, description, className, iconClassName }) {
  return (
    <div className={clsx("relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden", className)}>
      
      {/* Subtle Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="space-y-1">
          <p className="text-[11px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900 dark:text-white leading-none tracking-tight">{value}</span>
          </div>
        </div>
        
        {Icon && (
          <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gray-50 dark:bg-gray-800/50 shadow-inner group-hover:scale-110 transition-transform duration-500 border border-gray-100 dark:border-gray-700/50", iconClassName)}>
            <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/50 dark:border-gray-800/50 relative z-10">
        {description && (
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">{description}</p>
        )}
        
        {trend && (
          <div className="flex items-center">
            {trend === 'up' && (
              <div className="flex items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                {trendValue}
              </div>
            )}
            {trend === 'down' && (
              <div className="flex items-center text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full border border-red-100 dark:border-red-500/20 shadow-sm">
                <TrendingDown className="w-3 h-3 mr-1" />
                {trendValue}
              </div>
            )}
            {trend === 'neutral' && (
              <div className="flex items-center text-[11px] font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-500/10 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                <Minus className="w-3 h-3 mr-1" />
                {trendValue}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
