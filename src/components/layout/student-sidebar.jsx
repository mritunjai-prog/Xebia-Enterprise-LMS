import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Award,
  Bell,
  MessageSquare,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { studentProfile } from "@/features/student/mocks/dummy-data";

const navItems = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "My Courses", href: "/student/courses", icon: BookOpen },
  { name: "My Batches", href: "/student/batches", icon: CalendarDays },
  { name: "Assessments", href: "/student/assessments", icon: ClipboardCheck },
  { name: "Results", href: "/student/results", icon: Award },
  { name: "Notifications", href: "/student/notifications", icon: Bell },
  { name: "Feedback", href: "/student/feedback", icon: MessageSquare },
];

export function StudentSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel asChild className="mb-2 h-10 hover:bg-transparent">
            <Link to="/student" className="flex items-center gap-2">
              <img src="/logo-purple.png" alt="Xebia" className="h-6 w-6 rounded-full dark:brightness-0 dark:invert" />
              <span className="font-bold tracking-wide text-primary">Student Portal</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  currentPath === item.href ||
                  (item.href !== "/student" && currentPath.startsWith(item.href));

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                      <Link to={item.href} className="flex items-center gap-3 transition-colors">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 pt-2 pb-2">
        {/* Removed duplicate SidebarTrigger; toggle is in navbar */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile" className="h-12 mb-1">
              <Link to="/student/profile" className="flex items-center gap-3">
                <div className="flex flex-col flex-1 min-w-0 text-left">
                  <span className="font-semibold text-sm truncate">{studentProfile.name}</span>
                  <span className="text-xs text-muted-foreground truncate">View Profile</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link to="/" className="flex items-center gap-3 text-destructive hover:text-destructive/90">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
