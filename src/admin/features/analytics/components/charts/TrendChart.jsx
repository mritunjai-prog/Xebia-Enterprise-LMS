import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { clsx } from 'clsx';

export function TrendChart({ title, description, data, xAxisKey, lines, className }) {
  // Default to first primary color if not specified
  const defaultColors = ['#84117C', '#01AC9F', '#F59E0B', '#3B82F6', '#10B981'];

  return (
    <Card className={clsx("bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col", className)}>
      <CardHeader className="pb-2 pt-6 px-6 shrink-0">
        <CardTitle className="text-lg font-extrabold text-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-xs font-medium">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 flex-1 min-h-[250px]">
        <div className="h-full w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              
              {lines.map((line, idx) => (
                <Line 
                  key={line.dataKey}
                  type="monotone" 
                  dataKey={line.dataKey} 
                  name={line.name || line.dataKey}
                  stroke={line.color || defaultColors[idx % defaultColors.length]} 
                  strokeWidth={3}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  dot={{ r: 3, strokeWidth: 0, fill: line.color || defaultColors[idx % defaultColors.length] }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
