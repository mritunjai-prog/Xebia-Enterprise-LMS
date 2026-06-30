import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "@/hooks/use-dark-mode";

/**
 * Bar chart showing assessment scores across subject areas.
 * @param {{ data: Array<{subject: string, score: number}> }} props
 */
export function SubjectPerformanceChart({ data }) {
  const isDark = useDarkMode();

  return (
    <ResponsiveContainer width="100%" height="100%" key={isDark ? "dark" : "light"}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          opacity={0.15}
          stroke={isDark ? "#ffffff20" : "#00000015"}
        />
        <XAxis
          dataKey="subject"
          tick={{ fill: "currentColor", opacity: 0.7, fontSize: 12 }}
        />
        <YAxis tick={{ fill: "currentColor", opacity: 0.7, fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "8px",
          }}
          itemStyle={{ color: "var(--foreground)" }}
        />
        <Bar dataKey="score" fill="var(--primary)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
