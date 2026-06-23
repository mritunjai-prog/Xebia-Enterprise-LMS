import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Bell, Globe } from "lucide-react";
import logoPurple from "@/assets/logo-purple.png.asset.json";
import logoWhite from "@/assets/logo-white.png.asset.json";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Modules", href: "#modules" },
  { label: "Architecture", href: "#architecture" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`glass rounded-2xl flex items-center gap-3 px-3 sm:px-4 py-2.5 ${
            scrolled ? "shadow-lg" : ""
          }`}
          aria-label="Primary"
        >
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logoPurple.url} alt="Xebia" className="h-9 w-9 rounded-full dark:hidden" />
            <img src={logoWhite.url} alt="Xebia" className="hidden h-9 w-9 rounded-full bg-white p-0.5 dark:block" />
            <span className="hidden sm:block font-display font-bold text-sm leading-tight">
              Xebia<br />
              <span className="text-[10px] font-medium text-muted-foreground">Enterprise LMS</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 ml-4">
            {NAV.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  className="ring-focus rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1.5">
            <button aria-label="Search" className="ring-focus hidden sm:grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition">
              <Search className="h-4 w-4" />
            </button>
            <button aria-label="Language" className="ring-focus hidden md:grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition">
              <Globe className="h-4 w-4" />
            </button>
            <button aria-label="Notifications" className="ring-focus hidden md:grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary-glow" />
            </button>
            <ThemeToggle />
            <a
              href="#signin"
              className="ring-focus hidden md:inline-flex h-10 items-center rounded-full px-4 text-sm font-medium hover:bg-secondary transition"
            >
              Sign In
            </a>
            <a
              href="#cta"
              className="ring-focus btn-hero hidden sm:inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold"
            >
              Get Started
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="ring-focus lg:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-2 glass rounded-2xl p-3"
            >
              <ul className="grid gap-1">
                {NAV.map((n) => (
                  <li key={n.label}>
                    <a
                      onClick={() => setOpen(false)}
                      href={n.href}
                      className="block rounded-xl px-4 py-3 font-medium hover:bg-secondary"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
                <li className="grid grid-cols-2 gap-2 pt-2">
                  <a href="#signin" className="ring-focus h-11 grid place-items-center rounded-xl border font-medium">Sign In</a>
                  <a href="#cta" className="ring-focus btn-hero h-11 grid place-items-center rounded-xl font-semibold">Get Started</a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
