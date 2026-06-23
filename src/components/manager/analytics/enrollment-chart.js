import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEnrollmentData } from "@/lib/mock-data/manager-data";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    _jsxs("div", {
      className: "rounded-lg border-0 bg-white p-3 shadow-lg",
      children: [
        _jsx("p", {
          className: "mb-2 text-xs font-semibold text-[#5A5A5A]",
          children: label,
        }),
        ...payload.map((item, i) =>
          _jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              _jsx("div", {
                className: "h-2 w-2 rounded-full",
                style: { backgroundColor: item.color },
              }),
              _jsxs("span", {
                className: "text-xs text-[#5A5A5A]",
                children: [item.name, ": "],
              }),
              _jsx("span", {
                className: "text-xs font-semibold text-[#000000]",
                children: item.value.toLocaleString(),
              }),
            ],
          }, i)
        ),
      ],
    })
  );
}

export function EnrollmentChart({ compact = false }) {
  const { data, isLoading } = useEnrollmentData();

  return (
    _jsx(motion.div, {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: _jsxs(Card, {
        className: "border-0 bg-white shadow-sm",
        children: [
          _jsx(CardHeader, {
            className: "pb-2",
            children: _jsx(CardTitle, {
              className: "text-base font-semibold text-[#000000]",
              children: "Enrollment & Completion Trends",
            }),
          }),
          _jsx(CardContent, {
            children: isLoading
              ? _jsx(Skeleton, { className: `w-full rounded-lg ${compact ? "h-[200px]" : "h-[320px]"}` })
              : _jsx(ResponsiveContainer, {
                  width: "100%",
                  height: compact ? 200 : 320,
                  children: _jsxs(AreaChart, {
                    data,
                    margin: { top: 5, right: 10, left: -10, bottom: 0 },
                    children: [
                      _jsx("defs", {
                        children: [
                          _jsxs("linearGradient", {
                            id: "enrollGradient",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [
                              _jsx("stop", { offset: "5%", stopColor: "#6C1D5F", stopOpacity: 0.3 }),
                              _jsx("stop", { offset: "95%", stopColor: "#6C1D5F", stopOpacity: 0.02 }),
                            ],
                          }),
                          _jsxs("linearGradient", {
                            id: "completeGradient",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [
                              _jsx("stop", { offset: "5%", stopColor: "#00A99D", stopOpacity: 0.3 }),
                              _jsx("stop", { offset: "95%", stopColor: "#00A99D", stopOpacity: 0.02 }),
                            ],
                          }),
                        ],
                      }),
                      _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#EDEDED", vertical: false }),
                      _jsx(XAxis, {
                        dataKey: "month",
                        axisLine: false,
                        tickLine: false,
                        tick: { fill: "#5A5A5A", fontSize: 12 },
                      }),
                      _jsx(YAxis, {
                        axisLine: false,
                        tickLine: false,
                        tick: { fill: "#5A5A5A", fontSize: 12 },
                      }),
                      _jsx(Tooltip, { content: _jsx(CustomTooltip, {}) }),
                      !compact && _jsx(Legend, {
                        wrapperStyle: { fontSize: 12, color: "#5A5A5A" },
                      }),
                      _jsx(Area, {
                        type: "monotone",
                        dataKey: "enrollments",
                        name: "Enrollments",
                        stroke: "#6C1D5F",
                        strokeWidth: 2,
                        fill: "url(#enrollGradient)",
                      }),
                      _jsx(Area, {
                        type: "monotone",
                        dataKey: "completions",
                        name: "Completions",
                        stroke: "#00A99D",
                        strokeWidth: 2,
                        fill: "url(#completeGradient)",
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
