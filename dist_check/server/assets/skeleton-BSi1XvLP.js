import { t as cn } from "./utils-_lkLOWLq.js";
import { jsx } from "react/jsx-runtime";
//#region src/components/ui/skeleton.js
function Skeleton({ className, ...props }) {
	return jsx("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
//#endregion
export { Skeleton as t };
