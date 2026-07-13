import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function HoursCharts() {
  // Brand Colors
  const COLORS = {
    velvet: "#6C1D5F",
    emerald: "#01AC9F",
    orange: "#FF6200",
    pink: "#FFACE8",
    lightPurple: "#D3CCEC",
    darkGray: "#333333",
  };

  const trendData = [
    { name: "Jan", TotalHours: 12000, Target: 10000 },
    { name: "Feb", TotalHours: 15000, Target: 11000 },
    { name: "Mar", TotalHours: 14000, Target: 12000 },
    { name: "Apr", TotalHours: 18000, Target: 13000 },
    { name: "May", TotalHours: 22000, Target: 14000 },
    { name: "Jun", TotalHours: 28000, Target: 15000 },
  ];

  const regionData = [
    { name: "NA", AvgHours: 42.1 },
    { name: "EMEA", AvgHours: 38.5 },
    { name: "APAC", AvgHours: 34.2 },
    { name: "LATAM", AvgHours: 28.4 },
    { name: "Oceania", AvgHours: 24.8 },
  ];

  const projectData = [
    { name: "AI-First", AvgHours: 56.4 },
    { name: "Leadership", AvgHours: 42.1 },
    { name: "Privacy", AvgHours: 38.5 },
    { name: "Cloud Native", AvgHours: 34.2 },
    { name: "Agile Delivery", AvgHours: 28.4 },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* 3D Shadows for Recharts */}
      <svg width="0" height="0">
        <defs>
          <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="6" stdDeviation="4" floodOpacity="0.15" />
          </filter>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.velvet} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.velvet} stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      {/* Row 1: Trend Area Chart */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
            Total Learning Hours Trend
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#888", fontSize: 12 }} />
                <RechartsTooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="TotalHours"
                  stroke={COLORS.velvet}
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                  strokeWidth={3}
                  style={{ filter: "url(#shadow3d)" }}
                />
                <Area
                  type="monotone"
                  dataKey="Target"
                  stroke={COLORS.emerald}
                  fill="none"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Region and Project Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region Bar Chart */}
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
            Average Learning Hours by Region
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#888", fontSize: 12 }} />
                <RechartsTooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="AvgHours"
                  fill={COLORS.emerald}
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                  style={{ filter: "url(#shadow3d)" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Horizontal Bar Chart */}
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
            Average Learning Hours by Project
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#333"
                  opacity={0.1}
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12, fontWeight: 600 }}
                  width={90}
                />
                <RechartsTooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="AvgHours"
                  fill={COLORS.orange}
                  radius={[0, 6, 6, 0]}
                  barSize={24}
                  style={{ filter: "url(#shadow3d)" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
