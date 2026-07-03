import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { clsx } from 'clsx';

export function DonutChart({ title, description, data, dataKey = "value", nameKey = "name", className }) {
  const defaultColors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#6366f1'];

  return (
    <div className={clsx("relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col", className)}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 opacity-50" />
      <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="px-6 pt-6 pb-2 text-center relative z-10">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{title}</h3>
        {description && <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
      </div>
      
      <div className="px-6 pb-6 pt-2 flex-1 relative z-10">
        <div className="h-[240px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="40%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                dataKey={dataKey}
                nameKey={nameKey}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || defaultColors[index % defaultColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '1rem',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  color: '#111827',
                  backdropFilter: 'blur(8px)'
                }}
                itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ fontSize: '12px', fontWeight: '600' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
