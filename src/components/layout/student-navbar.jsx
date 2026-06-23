import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { studentProfile, notifications } from "@/features/student/mocks/dummy-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";

export function StudentNavbar() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md transition-all sm:px-6">
      <div className="flex items-center gap-2 mr-2">
        <SidebarTrigger className="-ml-1" />
      </div>

      {/* Logo for mobile/tablet where sidebar might be collapsed */}
      <div className="flex md:hidden items-center gap-2 mr-4">
        <Link to="/student" className="flex items-center gap-2">
          <img
            src="/logo-purple.png"
            alt="Xebia"
            className="h-8 w-8 rounded-full dark:brightness-0 dark:invert"
          />
          <span className="font-display font-bold text-sm leading-tight text-primary">
            Xebia
          </span>
        </Link>
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
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full glass hover:scale-105 transition-transform ring-focus">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0 text-[10px]">
                  {unreadCount}
                </Badge>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 3).map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="font-semibold text-sm">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full text-center text-sm font-medium text-primary cursor-pointer justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full outline-none ring-focus p-1 hover:bg-muted/50 transition-colors">
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {studentProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-sm sm:flex mr-2">
                <span className="font-semibold leading-none">{studentProfile.name}</span>
                <span className="text-xs text-muted-foreground mt-1 leading-none">
                  {studentProfile.role}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/student" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/student" className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-destructive focus:bg-destructive/10 cursor-pointer">
              <Link to="/" className="w-full">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
