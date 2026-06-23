import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, suffix = "", trend, icon: Icon, index = 0 }) {
  const isPositive = trend >= 0;

  return (
    _jsx(motion.div, {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.1, ease: "easeOut" },
      children: _jsx(Card, {
        className: `
          group relative overflow-hidden border-0 bg-white shadow-sm
          transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
        `,
        children: _jsxs(CardContent, {
          className: "p-5",
          children: [
            /* Top row: icon + trend */
            _jsxs("div", {
              className: "flex items-start justify-between",
              children: [
                _jsx("div", {
                  className: `
                    flex h-11 w-11 items-center justify-center rounded-xl
                    bg-[#6C1D5F]/8 transition-colors group-hover:bg-[#6C1D5F]/12
                  `,
                  children: _jsx(Icon, {
                    className: "h-5 w-5 text-[#6C1D5F]",
                  }),
                }),
                _jsxs("div", {
                  className: `
                    flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold
                    ${isPositive ? "bg-[#00A99D]/10 text-[#00A99D]" : "bg-red-50 text-red-500"}
                  `,
                  children: [
                    isPositive
                      ? _jsx(TrendingUp, { className: "h-3 w-3" })
                      : _jsx(TrendingDown, { className: "h-3 w-3" }),
                    _jsxs("span", {
                      children: [isPositive ? "+" : "", trend, "%"],
                    }),
                  ],
                }),
              ],
            }),

            /* Value */
            _jsx("p", {
              className: "mt-4 text-3xl font-bold tracking-tight text-[#000000]",
              children: typeof value === "number"
                ? value.toLocaleString() + suffix
                : value + suffix,
            }),

            /* Label */
            _jsx("p", {
              className: "mt-1 text-sm text-[#5A5A5A]",
              children: label,
            }),

            /* Decorative gradient bar */
            _jsx("div", {
              className: `
                absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r
                from-[#6C1D5F] via-[#8A177D] to-[#00A99D]
                opacity-0 transition-opacity duration-300 group-hover:opacity-100
              `,
            }),
          ],
        }),
      }),
    })
  );
}
