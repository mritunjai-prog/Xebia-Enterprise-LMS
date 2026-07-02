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
    <Card className={clsx("bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col", className)}>
      <CardHeader className="pb-2 pt-6 px-6 shrink-0">
        <CardTitle className="text-lg font-extrabold text-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-xs font-medium">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 flex-1 min-h-[250px]">
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
      </CardContent>
    </Card>
  );
}
