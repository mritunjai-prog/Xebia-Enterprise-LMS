import { FolderKanban, Globe, Star, TrendingUp, Trophy } from "lucide-react";

export function HoursLeaderboards() {
  const topProjects = [
    {
      rank: 1,
      name: "AI-First Engineering Transformation",
      hours: "24,500",
      avg: "56.4",
      completion: "94%",
      trend: "+12%",
    },
    {
      rank: 2,
      name: "Global Leadership Bootcamp 2024",
      hours: "18,200",
      avg: "42.1",
      completion: "88%",
      trend: "+8%",
    },
    {
      rank: 3,
      name: "Data Privacy & Ethics Certification",
      hours: "15,400",
      avg: "38.5",
      completion: "91%",
      trend: "+15%",
    },
    {
      rank: 4,
      name: "Cloud Native Architecture Mastery",
      hours: "12,100",
      avg: "34.2",
      completion: "85%",
      trend: "+5%",
    },
    {
      rank: 5,
      name: "Agile Delivery Professional",
      hours: "9,800",
      avg: "28.4",
      completion: "78%",
      trend: "-2%",
    },
  ];

  const topRegions = [
    { rank: 1, name: "North America", hours: "42,400", active: "850", avg: "49.8", growth: "+18%" },
    { rank: 2, name: "EMEA", hours: "38,200", active: "920", avg: "41.5", growth: "+12%" },
    { rank: 3, name: "APAC", hours: "34,500", active: "1100", avg: "31.3", growth: "+24%" },
    { rank: 4, name: "LATAM", hours: "18,600", active: "420", avg: "44.2", growth: "+8%" },
    { rank: 5, name: "Oceania", hours: "8,800", active: "180", avg: "48.8", growth: "+4%" },
  ];

  const topLearners = [
    {
      rank: 1,
      name: "Alex Chen",
      dept: "Engineering",
      project: "AI-First",
      hours: "212",
      progress: "100%",
      certs: 4,
      ai: 140,
    },
    {
      rank: 2,
      name: "Sarah Miller",
      dept: "Consulting",
      project: "Cloud Native",
      hours: "198",
      progress: "100%",
      certs: 3,
      ai: 85,
    },
    {
      rank: 3,
      name: "Marcus Johnson",
      dept: "Sales",
      project: "Leadership",
      hours: "185",
      progress: "95%",
      certs: 2,
      ai: 40,
    },
    {
      rank: 4,
      name: "Yuki Tanaka",
      dept: "Engineering",
      project: "Data Privacy",
      hours: "174",
      progress: "90%",
      certs: 3,
      ai: 60,
    },
    {
      rank: 5,
      name: "Elena Rodriguez",
      dept: "Operations",
      project: "Agile",
      hours: "162",
      progress: "88%",
      certs: 1,
      ai: 20,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Top Projects */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300 shadow-sm overflow-hidden flex flex-col h-[450px]">
        <div className="p-5 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/10 flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-[#6C1D5F] dark:text-[#FFACE8]" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Top 10 Projects
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
          {topProjects.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 p-3 rounded-xl border border-gray-100 dark:border-white/5 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#FFACE8]/10 dark:text-[#FFACE8] text-xs font-bold flex items-center justify-center">
                    {item.rank}
                  </div>
                  <span className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#6C1D5F] transition-colors truncate max-w-[180px]">
                    {item.name}
                  </span>
                </div>
                <span className="font-black text-[#6C1D5F] dark:text-[#FFACE8] text-sm">
                  {item.hours}h
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 pl-9">
                <span>Avg: {item.avg}h</span>
                <span>Comp: {item.completion}</span>
                <span className={item.trend.startsWith("+") ? "text-emerald-500" : "text-red-500"}>
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Regions */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300 shadow-sm overflow-hidden flex flex-col h-[450px]">
        <div className="p-5 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/10 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#01AC9F]" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Top 10 Regions
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
          {topRegions.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 p-3 rounded-xl border border-gray-100 dark:border-white/5 hover:border-[#01AC9F] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#01AC9F]/10 text-[#01AC9F] text-xs font-bold flex items-center justify-center">
                    {item.rank}
                  </div>
                  <span className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#01AC9F] transition-colors">
                    {item.name}
                  </span>
                </div>
                <span className="font-black text-[#01AC9F] text-sm">{item.hours}h</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 pl-9">
                <span>Active: {item.active}</span>
                <span>Avg: {item.avg}h</span>
                <span className="text-emerald-500">{item.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Learners */}
      <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#6C1D5F] dark:hover:border-[#FFACE8] transition-colors duration-300 shadow-sm overflow-hidden flex flex-col h-[450px]">
        <div className="p-5 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-black/10 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#FF6200]" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Top 10 Learners
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
          {topLearners.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-3 p-3 rounded-xl border border-gray-100 dark:border-white/5 hover:border-[#FF6200] transition-colors group"
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 dark:border-gray-700">
                  <img
                    src={`https://i.pravatar.cc/150?u=${item.name.replace(/\s+/g, "")}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {item.rank}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#FF6200] transition-colors truncate">
                    {item.name}
                  </span>
                  <span className="font-black text-[#FF6200] text-sm">{item.hours}h</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 truncate">
                    {item.dept}
                  </span>
                  <span className="text-[10px] text-gray-300">•</span>
                  <span className="text-[10px] text-[#84117C] font-bold">{item.certs} Certs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
