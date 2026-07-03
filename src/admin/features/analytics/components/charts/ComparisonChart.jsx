import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { clsx } from 'clsx';

export function ComparisonChart({ title, description, data, xAxisKey, bars, className, stacked = false }) {
  const defaultColors = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899'];

  return (
    <div className={clsx("relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col", className)}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-50" />
      <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="px-6 pt-6 pb-4 shrink-0 relative z-10">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{title}</h3>
        {description && <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
      </div>
      
      <div className="px-6 pb-6 pt-0 flex-1 min-h-[250px] relative z-10">
        <div className="h-full w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10 dark:opacity-20" />
              <XAxis 
                dataKey={xAxisKey} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="opacity-50"
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'currentColor' }}
                className="opacity-50"
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'currentColor', opacity: 0.05 }}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '1rem',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  color: '#111827',
                  backdropFilter: 'blur(8px)'
                }}
                itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', marginBottom: '4px' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: '600' }} 
                iconType="circle"
              />
              
              {bars.map((bar, idx) => (
                <Bar 
                  key={bar.dataKey}
                  dataKey={bar.dataKey} 
                  name={bar.name || bar.dataKey}
                  fill={bar.color || defaultColors[idx % defaultColors.length]} 
                  radius={stacked ? [0,0,0,0] : [4, 4, 0, 0]}
                  stackId={stacked ? "a" : undefined}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
