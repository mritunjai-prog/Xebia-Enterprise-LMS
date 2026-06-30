import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "@/hooks/use-dark-mode";

/**
 * Line chart showing learning activity / hours spent over time.
 * @param {{ data: Array<{name: string, progress: number}> }} props
 */
export function LearningActivityChart({ data }) {
  const isDark = useDarkMode();

  return (
    <ResponsiveContainer width="100%" height="100%" key={isDark ? "dark" : "light"}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          opacity={0.15}
          stroke={isDark ? "#ffffff20" : "#00000015"}
        />
        <XAxis
          dataKey="name"
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
        <Line
          type="monotone"
          dataKey="progress"
          stroke="var(--primary)"
          strokeWidth={3}
          dot={{ fill: "var(--primary)", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
