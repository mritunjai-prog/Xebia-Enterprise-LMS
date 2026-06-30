import { Bell, Search, User, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { studentProfile, notifications } from "@/lib/dummy-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { useDarkMode } from "@/hooks/use-dark-mode";


export function StudentNavbar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const isDark = useDarkMode();
  const initials = studentProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md transition-all sm:px-6">
      {/* Sidebar Toggle & Mobile Logo */}
      <div className="flex items-center gap-2 mr-4">
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsMobileOpen(!isMobileOpen);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full glass hover:scale-105 transition-transform focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2"
            style={{ textDecoration: "none" }}
          >
            <img
              src={isDark ? "/logo-white.png" : "/logo-purple.png"}
              alt="Xebia Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold tracking-wide text-sm text-foreground">
              Xebia LMS
            </span>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-1 items-center justify-start max-w-md hidden md:flex">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses, modules..."
            className="w-full rounded-full bg-muted/50 pl-8 focus-visible:ring-primary/50"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full glass hover:scale-105 transition-transform ring-focus"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2 font-semibold text-sm">Notifications</div>
            <DropdownMenuSeparator />
            {notifications.slice(0, 3).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-3"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="font-semibold text-sm">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer justify-center">
              <Link
                to="/notifications"
                className="w-full text-center text-sm font-medium text-primary"
              >
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-full outline-none ring-focus p-1 hover:bg-muted/50 transition-all hover:shadow-sm"
              aria-label="User menu"
            >
              <div className="h-9 w-9 flex items-center justify-center rounded-full text-sm font-bold bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                {initials || <User className="h-4 w-4" />}
              </div>
              <div className="hidden flex-col items-start text-sm sm:flex mr-2 text-left">
                <span className="font-semibold leading-none text-foreground">{studentProfile.name}</span>
                <span className="text-xs text-muted-foreground mt-1 leading-none">
                  {studentProfile.role}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/profile" className="w-full">
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="text-destructive focus:bg-destructive/10 cursor-pointer"
            >
              <Link to="/" className="w-full">
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
