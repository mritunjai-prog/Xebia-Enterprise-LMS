import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { clsx } from 'clsx';

export function ComparisonChart({ title, description, data, xAxisKey, bars, className, stacked = false }) {
  const defaultColors = ['#01AC9F', '#84117C', '#F59E0B', '#3B82F6', '#10B981'];

  return (
    <Card className={clsx("bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col", className)}>
      <CardHeader className="pb-2 pt-6 px-6 shrink-0">
        <CardTitle className="text-lg font-extrabold text-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-xs font-medium">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 flex-1 min-h-[250px]">
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
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  color: 'var(--foreground)'
                }}
                itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
                labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--muted-foreground)', marginBottom: '4px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: '600' }} />
              
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
      </CardContent>
    </Card>
  );
}
