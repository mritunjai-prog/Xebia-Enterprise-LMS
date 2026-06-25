import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/lib/utils.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { cn as t };
