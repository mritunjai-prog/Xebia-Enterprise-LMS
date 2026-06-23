import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export function PageHeader({ title, description, children }) {
  return (
    _jsxs("div", {
      className: "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      children: [
        _jsxs("div", {
          children: [
            _jsx("h1", {
              className: "text-2xl font-bold tracking-tight text-[#000000] lg:text-3xl",
              children: title,
            }),
            description &&
              _jsx("p", {
                className: "mt-1 text-sm text-[#5A5A5A] lg:text-base",
                children: description,
              }),
          ],
        }),
        children &&
          _jsx("div", {
            className: "flex items-center gap-3",
            children,
          }),
      ],
    })
  );
}
