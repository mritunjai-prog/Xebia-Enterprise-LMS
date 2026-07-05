import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const heatmapData = [
  { region: "NA", Engineering: 98, Consulting: 85, Sales: 92, Operations: 78, HR: 88 },
  { region: "EU", Engineering: 94, Consulting: 90, Sales: 88, Operations: 85, HR: 92 },
  { region: "APAC", Engineering: 88, Consulting: 95, Sales: 94, Operations: 90, HR: 86 },
  { region: "MEA", Engineering: 75, Consulting: 80, Sales: 85, Operations: 92, HR: 88 },
];

const regionCoverageData = [
  { name: "North America", coverage: 98 },
  { name: "Europe", coverage: 94 },
  { name: "APAC", coverage: 88 },
  { name: "Middle East", coverage: 75 },
];

const projectData = [
  { name: "Alpha", Active: 120, Completed: 80 },
  { name: "Beta", Active: 90, Completed: 110 },
  { name: "Gamma", Active: 150, Completed: 60 },
  { name: "Delta", Active: 80, Completed: 90 },
];

const trendData = [
  { name: "Q1", Coverage: 65, Participation: 55 },
  { name: "Q2", Coverage: 72, Participation: 68 },
  { name: "Q3", Coverage: 85, Participation: 80 },
  { name: "Q4", Coverage: 92, Participation: 88 },
];

const getHeatmapColor = (val) => `rgba(1, 172, 159, ${val / 100})`;

export function CoverageCharts() {
  return (
    <>
      <svg width="0" height="0">
        <defs>
          <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.15" />
          </filter>
        </defs>
      </svg>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Chart 1: Heatmap */}
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">Coverage Heatmap</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead>
                <tr>
                  <th className="p-2 text-gray-500">Region</th>
                  {Object.keys(heatmapData[0])
                    .filter((k) => k !== "region")
                    .map((k) => (
                      <th key={k} className="p-2 text-gray-500">
                        {k}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((row, i) => (
                  <tr key={i}>
                    <td className="p-3 font-bold text-gray-900 dark:text-white">{row.region}</td>
                    {Object.entries(row)
                      .filter(([k]) => k !== "region")
                      .map(([k, v], j) => (
                        <td key={j} className="p-1">
                          <div
                            className="py-3 px-2 rounded-xl text-white font-bold"
                            style={{ backgroundColor: getHeatmapColor(v) }}
                          >
                            {v}%
                          </div>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart 2: Region-wise Coverage Bar Chart */}
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">
            Region-wise Coverage Chart
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={regionCoverageData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
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
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="coverage"
                  fill="#FF6200"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                  style={{ filter: "url(#shadow3d)" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Chart 3: Project-wise Participation */}
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">
            Project-wise Participation Chart
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                barSize={20}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke="#333"
                  opacity={0.2}
                />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#888" }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontWeight: 600 }}
                />
                <RechartsTooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{ borderRadius: "12px", border: "none" }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="Active" stackId="a" fill="#84117C" radius={[4, 0, 0, 4]} />
                <Bar dataKey="Completed" stackId="a" fill="#FFACE8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Quarterly Participation Trend */}
        <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">
            Quarterly Participation Trend
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCov" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C1D5F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6C1D5F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#01AC9F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#01AC9F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#888" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#888" }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                <RechartsTooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                <Legend iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="Coverage"
                  stroke="#6C1D5F"
                  fillOpacity={1}
                  fill="url(#colorCov)"
                  strokeWidth={3}
                  style={{ filter: "url(#shadow3d)" }}
                />
                <Area
                  type="monotone"
                  dataKey="Participation"
                  stroke="#01AC9F"
                  fillOpacity={1}
                  fill="url(#colorPart)"
                  strokeWidth={3}
                  style={{ filter: "url(#shadow3d)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
