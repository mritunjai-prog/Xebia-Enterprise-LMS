import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { clsx } from 'clsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function MetricCard({ title, value, icon: Icon, trend, trendValue, description, className }) {
  return (
    <Card className={clsx("bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0 px-5 pt-5">
        <CardTitle className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </CardTitle>
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{value}</div>
        
        {(trend || description) && (
          <div className="flex items-center gap-2 mt-2.5">
            {trend === 'up' && (
              <div className="flex items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                {trendValue}
              </div>
            )}
            {trend === 'down' && (
              <div className="flex items-center text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full border border-red-100 dark:border-red-500/20">
                <TrendingDown className="w-3 h-3 mr-1" />
                {trendValue}
              </div>
            )}
            {trend === 'neutral' && (
              <div className="flex items-center text-[11px] font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-500/10 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-500/20">
                <Minus className="w-3 h-3 mr-1" />
                {trendValue}
              </div>
            )}
            {description && (
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex-1">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
