import { useEffect, useState } from "react";

/**
 * Shared hook for all Student Module components.
 * Reactively returns true when the `dark` class is present on <html>.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
});
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
