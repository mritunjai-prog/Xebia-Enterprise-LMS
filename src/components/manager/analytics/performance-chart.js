import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceData } from "@/lib/mock-data/manager-data";

const barColors = ["#6C1D5F", "#8A177D", "#4A1E47", "#00A99D", "#5B1E53", "#793B74", "#FF6A00", "#533754"];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    _jsxs("div", {
      className: "rounded-lg border-0 bg-white p-3 shadow-lg",
      children: [
        _jsx("p", {
          className: "mb-1 text-xs font-semibold text-[#000000]",
          children: label,
        }),
        _jsxs("p", {
          className: "text-xs text-[#5A5A5A]",
          children: ["Avg. Score: ", _jsx("span", { className: "font-semibold", children: payload[0].value }), "%"],
        }),
        _jsxs("p", {
          className: "text-xs text-[#5A5A5A]",
          children: ["Students: ", payload[0].payload.students.toLocaleString()],
        }),
      ],
    })
  );
}

export function PerformanceChart() {
  const { data, isLoading } = usePerformanceData();

  return (
    _jsx(motion.div, {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.2 },
      children: _jsxs(Card, {
        className: "border-0 bg-white shadow-sm",
        children: [
          _jsx(CardHeader, {
            className: "pb-2",
            children: _jsx(CardTitle, {
              className: "text-base font-semibold text-[#000000]",
              children: "Top Performing Courses",
            }),
          }),
          _jsx(CardContent, {
            children: isLoading
              ? _jsx(Skeleton, { className: "h-[320px] w-full rounded-lg" })
              : _jsx(ResponsiveContainer, {
                  width: "100%",
                  height: 320,
                  children: _jsxs(BarChart, {
                    data,
                    margin: { top: 5, right: 10, left: -10, bottom: 0 },
                    children: [
                      _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#EDEDED", vertical: false }),
                      _jsx(XAxis, {
                        dataKey: "course",
                        axisLine: false,
                        tickLine: false,
                        tick: { fill: "#5A5A5A", fontSize: 11 },
                        interval: 0,
                        angle: -15,
                        textAnchor: "end",
                      }),
                      _jsx(YAxis, {
                        domain: [60, 100],
                        axisLine: false,
                        tickLine: false,
                        tick: { fill: "#5A5A5A", fontSize: 12 },
                      }),
                      _jsx(Tooltip, { content: _jsx(CustomTooltip, {}), cursor: { fill: "#EDEDED", opacity: 0.5 } }),
                      _jsx(Bar, {
                        dataKey: "avgScore",
                        radius: [6, 6, 0, 0],
                        maxBarSize: 45,
                        children: data?.map((_, i) =>
                          _jsx(Cell, { fill: barColors[i % barColors.length] }, i)
                        ),
                      }),
                    ],
                  }),
                }),
          }),
        ],
      }),
    })
  );
}
