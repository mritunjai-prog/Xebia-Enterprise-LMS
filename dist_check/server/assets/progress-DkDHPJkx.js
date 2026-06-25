import { t as cn } from "./utils-_lkLOWLq.js";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import * as ProgressPrimitive from "@radix-ui/react-progress";
//#region src/components/ui/progress.js
var Progress = React.forwardRef(({ className, value, ...props }, ref) => jsx(ProgressPrimitive.Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: jsx(ProgressPrimitive.Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = ProgressPrimitive.Root.displayName;
//#endregion
export { Progress as t };
