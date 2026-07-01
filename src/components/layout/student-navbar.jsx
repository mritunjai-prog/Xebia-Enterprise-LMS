import { Bell, Search, User, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { studentProfile, notifications } from "@/features/student/mocks/dummy-data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { useDarkMode } from "@/features/student/hooks/use-dark-mode";
import { useAppStore } from "@/admin/store/useAppStore";

export function StudentNavbar({ isMobileOpen, setIsMobileOpen }) {
  const { toggleSidebar } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const isDark = useDarkMode();
  const initials = studentProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="header">
      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center gap-2 mr-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="header-btn"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop Toggle & Breadcrumb */}
      <div className="hidden md:flex items-center gap-3 mr-4">
        <button
          onClick={toggleSidebar}
          className="header-btn"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-cur">Student Portal</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="header-search hidden md:block">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="header-actions">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="header-btn relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></div>
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
                to="/student/notifications"
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
              className="header-btn"
              aria-label="User menu"
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-sm">
                {initials || <User className="h-4 w-4" />}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/student/profile" className="w-full">
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
    </div>
  );
}
