import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FunnelChart as RechartsFunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import { clsx } from 'clsx';

export function FunnelChartWrapper({ title, description, data, dataKey = "value", nameKey = "name", className }) {
  const defaultColors = ['#01AC9F', '#34D399', '#FCD34D', '#F87171', '#84117C'];

  // Recharts Funnel requires colors injected into data
  const chartData = data.map((item, idx) => ({
    ...item,
    fill: item.color || defaultColors[idx % defaultColors.length]
  }));

  return (
    <div className={clsx("relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col", className)}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-rose-500 to-purple-600 opacity-50" />
      <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="px-6 pt-6 pb-4 shrink-0 relative z-10">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{title}</h3>
        {description && <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
      </div>
      
      <div className="px-6 pb-6 pt-0 flex-1 min-h-[250px] relative z-10">
        <div className="h-full w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsFunnelChart>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  color: 'var(--foreground)'
                }}
                itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
              />
              <Funnel
                dataKey={dataKey}
                data={chartData}
                isAnimationActive
              >
                <LabelList position="right" fill="currentColor" stroke="none" dataKey={nameKey} style={{ fontSize: '12px', fontWeight: 'bold' }} />
                <LabelList position="inside" fill="#fff" stroke="none" dataKey={dataKey} style={{ fontSize: '14px', fontWeight: '900' }} />
              </Funnel>
            </RechartsFunnelChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
