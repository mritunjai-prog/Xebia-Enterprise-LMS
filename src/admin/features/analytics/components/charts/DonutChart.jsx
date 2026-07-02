import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { clsx } from 'clsx';

export function DonutChart({ title, description, data, dataKey = "value", nameKey = "name", className }) {
  const defaultColors = ['#84117C', '#01AC9F', '#F59E0B', '#3B82F6', '#10B981', '#EC4899', '#6366F1'];

  return (
    <Card className={clsx("bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300", className)}>
      <CardHeader className="pb-1 pt-5 px-5 text-center">
        <CardTitle className="text-md font-extrabold text-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-[11px] font-medium">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-1">
        <div className="h-[240px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="40%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={2}
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
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--border)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  color: 'var(--foreground)'
                }}
                itemStyle={{ fontSize: '13px', fontWeight: 'bold' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ fontSize: '12px', fontWeight: '600' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
