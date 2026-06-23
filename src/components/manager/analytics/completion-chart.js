import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompletionData } from "@/lib/mock-data/manager-data";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const pct = Math.round((d.completed / d.total) * 100);
  return (
    _jsxs("div", {
      className: "rounded-lg border-0 bg-white p-3 shadow-lg",
      children: [
        _jsx("p", {
          className: "mb-1 text-xs font-semibold text-[#000000]",
          children: d.category,
        }),
        _jsxs("p", {
          className: "text-xs text-[#5A5A5A]",
          children: [d.completed, " / ", d.total, " completed (", pct, "%)"],
        }),
      ],
    })
  );
}

function CustomLegend({ payload }) {
  return (
    _jsx("div", {
      className: "mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1",
      children: payload?.map((entry, i) =>
        _jsxs("div", {
          className: "flex items-center gap-1.5",
          children: [
            _jsx("div", {
              className: "h-2.5 w-2.5 rounded-full",
              style: { backgroundColor: entry.color },
            }),
            _jsx("span", {
              className: "text-[11px] text-[#5A5A5A]",
              children: entry.value,
            }),
          ],
        }, i)
      ),
    })
  );
}

export function CompletionChart() {
  const { data, isLoading } = useCompletionData();

  const pieData = data?.map((d) => ({
    ...d,
    name: d.category,
    value: d.completed,
  }));

  return (
    _jsx(motion.div, {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.1 },
      children: _jsxs(Card, {
        className: "border-0 bg-white shadow-sm",
        children: [
          _jsx(CardHeader, {
            className: "pb-2",
            children: _jsx(CardTitle, {
              className: "text-base font-semibold text-[#000000]",
              children: "Completion by Category",
            }),
          }),
          _jsx(CardContent, {
            children: isLoading
              ? _jsx(Skeleton, { className: "mx-auto h-[320px] w-full rounded-lg" })
              : _jsx(ResponsiveContainer, {
                  width: "100%",
                  height: 320,
                  children: _jsxs(PieChart, {
                    children: [
                      _jsx(Pie, {
                        data: pieData,
                        cx: "50%",
                        cy: "45%",
                        innerRadius: 65,
                        outerRadius: 110,
                        paddingAngle: 3,
                        dataKey: "value",
                        stroke: "none",
                        children: pieData.map((entry, i) =>
                          _jsx(Cell, { fill: entry.color }, i)
                        ),
                      }),
                      _jsx(Tooltip, { content: _jsx(CustomTooltip, {}) }),
                      _jsx(Legend, { content: _jsx(CustomLegend, {}) }),
                    ],
                  }),
                }),
          }),
        ],
      }),
    })
  );
}
