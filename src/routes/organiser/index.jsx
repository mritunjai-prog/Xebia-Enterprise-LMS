import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BookOpen,
  Clock,
  CalendarCheck,
  Video,
  Bell,
  Send,
  Plus,
  Calendar,
  Activity,
  FileText,
  TrendingUp,
  Download,
  AlertCircle,
  X,
  CheckCircle,
} from "lucide-react";
import { PermissionGuard } from "@/components/auth/permission-guard";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/organiser/")({
  component: TrainerDashboard,
});

// Analytics Mock Data
const analyticsData = {
  Daily: [
    { name: "Mon", engagement: 120, views: 340, submissions: 15 },
    { name: "Tue", engagement: 180, views: 420, submissions: 28 },
    { name: "Wed", engagement: 210, views: 510, submissions: 32 },
    { name: "Thu", engagement: 150, views: 380, submissions: 19 },
    { name: "Fri", engagement: 240, views: 600, submissions: 45 },
    { name: "Sat", engagement: 90, views: 210, submissions: 12 },
    { name: "Sun", engagement: 110, views: 250, submissions: 8 },
  ],
  Weekly: [
    { name: "Week 1", engagement: 820, views: 2400, submissions: 120 },
    { name: "Week 2", engagement: 1100, views: 3100, submissions: 185 },
    { name: "Week 3", engagement: 950, views: 2800, submissions: 140 },
    { name: "Week 4", engagement: 1450, views: 4200, submissions: 260 },
  ],
  Monthly: [
    { name: "Jan", engagement: 3100, views: 9800, submissions: 610 },
    { name: "Feb", engagement: 4200, views: 12000, submissions: 820 },
    { name: "Mar", engagement: 5100, views: 14500, submissions: 980 },
    { name: "Apr", engagement: 4800, views: 13900, submissions: 920 },
    { name: "May", engagement: 6200, views: 18100, submissions: 1200 },
    { name: "Jun", engagement: 7400, views: 21500, submissions: 1450 },
  ],
  Yearly: [
    { name: "2023", engagement: 38000, views: 112000, submissions: 7500 },
    { name: "2024", engagement: 54000, views: 165000, submissions: 11200 },
    { name: "2025", engagement: 78000, views: 232000, submissions: 16800 },
    { name: "2026", engagement: 92000, views: 285000, submissions: 19800 },
  ],
};

const mockActivities = [
  { id: 1, type: "submission", user: "Alice Johnson", detail: "submitted 'Assignment 2 - Docker Setup'", time: "12 mins ago" },
  { id: 2, type: "discussion", user: "Vikram Dev", detail: "commented on 'Microservices Patterns'", time: "45 mins ago" },
  { id: 3, type: "system", user: "University of Tech", detail: "synced 18 new enrolments for Batch B", time: "2 hours ago" },
  { id: 4, type: "upload", user: "You", detail: "uploaded 'Kafka Guide.pdf' to Content Library", time: "4 hours ago" },
  { id: 5, type: "evaluation", user: "You", detail: "graded Bob Smith's Spring Boot Quiz", time: "5 hours ago" },
];

const mockSessions = {
  "2026-06-24": [
    { id: 1, time: "10:00 AM", title: "Cloud Architecture Masterclass", batch: "Batch A - Tech Uni", room: "Virtual Room 3" },
    { id: 2, time: "02:00 PM", title: "Spring Boot Middleware Session", batch: "Batch B - Enterprise", room: "Virtual Room 1" },
  ],
  "2026-06-25": [
    { id: 3, time: "11:30 AM", title: "React Query In-Depth Delivery", batch: "Cohort 4", room: "Virtual Room 2" },
  ],
  "2026-06-28": [
    { id: 4, time: "09:00 AM", title: "Semester Practical Examinations", batch: "Batch A - Tech Uni", room: "Offline Lab 2" },
  ],
};

function StatCard({ title, value, icon: Icon, trend, trendUp, glowColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all pointer-events-none duration-300">
        <Icon className={`w-16 h-16 ${glowColor}`} />
      </div>
      <div className="flex items-center justify-between text-muted-foreground">
        <h3 className="font-semibold text-xs uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-xl bg-card border border-border/40 text-primary`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-extrabold font-display text-foreground tracking-tight">{value}</div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className={`flex items-center text-xs font-bold ${trendUp ? "text-emerald-500" : "text-amber-500"}`}>
            <TrendingUp className={`w-3.5 h-3.5 ${!trendUp && "rotate-180"}`} />
            {trend}
          </span>
          <span className="text-[10px] text-muted-foreground">vs last month</span>
        </div>
      </div>
    </motion.div>
  );
}

export function TrainerDashboard() {
  const [analyticsTab, setAnalyticsTab] = useState("Daily");
  const [selectedDate, setSelectedDate] = useState("2026-06-24");
  const [activeModal, setActiveModal] = useState(null); // 'course', 'content', 'student', 'assessment', 'notification', 'batch', 'report'
  const [loadingAction, setLoadingAction] = useState(false);

  // Quick Action form submission
  const handleQuickAction = (e, type) => {
    e.preventDefault();
    setLoadingAction(true);
    setTimeout(() => {
      setLoadingAction(false);
      setActiveModal(null);
      toast.success(`${type} successfully processed!`, {
        icon: <CheckCircle className="text-emerald-500" />,
      });
    }, 1200);
  };

  // Calendar render helpers
  const calendarDays = [
    { day: 21, dateStr: "2026-06-21", isCurrentMonth: true },
    { day: 22, dateStr: "2026-06-22", isCurrentMonth: true },
    { day: 23, dateStr: "2026-06-23", isCurrentMonth: true },
    { day: 24, dateStr: "2026-06-24", isCurrentMonth: true, hasSessions: true },
    { day: 25, dateStr: "2026-06-25", isCurrentMonth: true, hasSessions: true },
    { day: 26, dateStr: "2026-06-26", isCurrentMonth: true },
    { day: 27, dateStr: "2026-06-27", isCurrentMonth: true },
    { day: 28, dateStr: "2026-06-28", isCurrentMonth: true, hasSessions: true },
    { day: 29, dateStr: "2026-06-29", isCurrentMonth: true },
    { day: 30, dateStr: "2026-06-30", isCurrentMonth: true },
  ];

  return (
    <PermissionGuard required="course.read">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* ── Premium Hero Banner ─────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-border/30 shadow-elegant"
          style={{
            background: "var(--hero-banner-bg)",
            minHeight: "170px",
          }}
        >
          {/* Light mode: soft layered gradient */}
          <div className="absolute inset-0 pointer-events-none dark:opacity-0 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.06 320 / 0.9) 0%, oklch(0.97 0.03 260 / 0.85) 40%, oklch(0.93 0.08 200 / 0.8) 100%)",
            }}
          />
          {/* Dark mode: deep space gradient */}
          <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.16 0.06 310) 0%, oklch(0.14 0.04 260) 50%, oklch(0.15 0.05 200) 100%)",
            }}
          />

          {/* Glow orbs — left (primary color) */}
          <div className="absolute -left-16 -top-16 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, oklch(0.55 0.22 320 / 0.35) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Glow orbs — right (accent/cyan) */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, oklch(0.72 0.18 200 / 0.28) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />
          {/* Glow orbs — center top accent-2 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, oklch(0.65 0.16 165 / 0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Grid dot pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Animated floating particles */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: i % 3 === 0 ? "3px" : "2px",
                height: i % 3 === 0 ? "3px" : "2px",
                left: `${(i * 7.2) + 2}%`,
                bottom: "-6px",
                background: i % 2 === 0
                  ? "oklch(0.65 0.22 320 / 0.7)"
                  : "oklch(0.75 0.18 200 / 0.6)",
              }}
              animate={{
                y: [-5, -200],
                x: [0, (i % 2 === 0 ? 1 : -1) * (12 + (i % 4) * 8)],
                opacity: [0, 0.8, 0],
                scale: [1, 1.4, 0.6],
              }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                delay: i * 0.38,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Diagonal shimmer streak */}
          <motion.div
            className="absolute inset-y-0 w-24 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.06) 50%, transparent 60%)",
              left: "-10%",
            }}
            animate={{ left: ["−10%", "120%"] }}
            transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 3.5, ease: "linear" }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 sm:p-8">
            <div className="space-y-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.55 0.16 320)" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Dashboard / Organiser
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, var(--color-foreground) 0%, oklch(0.6 0.22 320) 60%, oklch(0.72 0.18 200) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  Organiser Dashboard
                </h1>
                {/* Animated underline */}
                <motion.div
                  animate={{ scaleX: [0.9, 1.05, 0.9], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-[2.5px] w-52 rounded-full mt-2.5 origin-left"
                  style={{
                    background: "linear-gradient(90deg, oklch(0.55 0.22 320), oklch(0.72 0.18 200), transparent)",
                  }}
                />
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed pt-0.5">
                Manage course delivery, student tracking, cohorts, and assessments from one unified hub.
              </p>
            </div>

            {/* Role badge + live indicator */}
            <div className="z-10 shrink-0 flex flex-col items-end gap-2">
              <motion.span
                animate={{ boxShadow: ["0 0 0px oklch(0.55 0.22 320 / 0)", "0 0 16px oklch(0.55 0.22 320 / 0.35)", "0 0 0px oklch(0.55 0.22 320 / 0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border backdrop-blur-md"
                style={{
                  background: "oklch(0.55 0.18 320 / 0.12)",
                  borderColor: "oklch(0.55 0.18 320 / 0.30)",
                  color: "oklch(0.55 0.2 320)",
                }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_oklch(0.7_0.2_145)]" />
                Organiser • University of Technology • Sync Active
              </motion.span>
            </div>
          </div>
        </div>

        {/* Quick Actions Console */}
        <div className="glass rounded-2xl p-5 border-primary/10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Quick Command Center</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { id: "course", label: "Create Course", icon: Plus, color: "text-purple-500 hover:bg-purple-500/10" },
              { id: "content", label: "Upload Content", icon: FileText, color: "text-blue-500 hover:bg-blue-500/10" },
              { id: "student", label: "Add Student", icon: Users, color: "text-cyan-500 hover:bg-cyan-500/10" },
              { id: "assessment", label: "New Assessment", icon: Clock, color: "text-pink-500 hover:bg-pink-500/10" },
              { id: "notification", label: "Send Notice", icon: Send, color: "text-amber-500 hover:bg-amber-500/10" },
              { id: "batch", label: "Launch Batch", icon: CalendarCheck, color: "text-teal-500 hover:bg-teal-500/10" },
              { id: "report", label: "Export Report", icon: Download, color: "text-indigo-500 hover:bg-indigo-500/10" },
            ].map((action) => (
              <button
                key={action.id}
                onClick={() => setActiveModal(action.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl bg-card/60 border border-border/40 hover:-translate-y-0.5 transition-all text-center cursor-pointer ${action.color}`}
              >
                <action.icon className="w-5 h-5 mb-1.5" />
                <span className="text-xs font-bold text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Seven Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          <div className="lg:col-span-1">
            <StatCard title="Total Courses" value="12" icon={BookOpen} trend="+16.6%" trendUp={true} glowColor="text-purple-500" />
          </div>
          <div className="lg:col-span-1">
            <StatCard title="Active Batches" value="8" icon={CalendarCheck} trend="+8.3%" trendUp={true} glowColor="text-teal-500" />
          </div>
          <div className="lg:col-span-1">
            <StatCard title="Total Enrolled" value="342" icon={Users} trend="+12.4%" trendUp={true} glowColor="text-cyan-500" />
          </div>
          <div className="lg:col-span-1">
            <StatCard title="Completion Rate" value="84%" icon={TrendingUp} trend="+4.1%" trendUp={true} glowColor="text-emerald-500" />
          </div>
          <div className="lg:col-span-1">
            <StatCard title="Pending Review" value="24" icon={Clock} trend="-14.2%" trendUp={true} glowColor="text-amber-500" />
          </div>
          <div className="lg:col-span-1">
            <StatCard title="Video Views" value="4.8k" icon={Video} trend="+28.4%" trendUp={true} glowColor="text-pink-500" />
          </div>
          <div className="lg:col-span-1">
            <StatCard title="Alerts Sent" value="158" icon={Bell} trend="+5.2%" trendUp={true} glowColor="text-indigo-500" />
          </div>
        </div>

        {/* Analytics & Calendar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Charts & Graphs Panel */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Delivery Analytics</h2>
                  <p className="text-xs text-muted-foreground">Monitor student engagement, video consumption, and submissions.</p>
                </div>
                <div className="flex items-center p-1 rounded-full bg-secondary/80 border border-border/40">
                  {Object.keys(analyticsData).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAnalyticsTab(tab)}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                        analyticsTab === tab
                          ? "bg-primary text-primary-foreground shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive Container for Recharts */}
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData[analyticsTab]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.38 0.14 335)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="oklch(0.38 0.14 335)" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.78 0.14 200)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="oklch(0.78 0.14 200)" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{
                        background: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "12px",
                        boxShadow: "var(--shadow-elegant)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      name="Active Hours"
                      stroke="oklch(0.38 0.14 335)"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorEngagement)"
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      name="Video Views"
                      stroke="oklch(0.78 0.14 200)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between border-t border-border/40 pt-4 mt-4 gap-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary"></span>
                  <span className="text-xs text-muted-foreground font-semibold">Active Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-accent"></span>
                  <span className="text-xs text-muted-foreground font-semibold">Video Lessons Views</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground italic">Updated real-time via university SSO logs.</span>
            </div>
          </div>

          {/* Interactive Calendar Widget */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Schedules & Calendar</h2>
                <Calendar className="w-4 h-4 text-primary" />
              </div>

              {/* Month Header */}
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground mb-3 px-1">
                <span>JUNE 2026</span>
                <span className="text-primary font-semibold">3 Sessions Marked</span>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
                  <span key={idx} className="text-[10px] font-bold text-muted-foreground/60 py-1">
                    {d}
                  </span>
                ))}
                {calendarDays.map((day) => {
                  const isSelected = selectedDate === day.dateStr;
                  return (
                    <button
                      key={day.day}
                      onClick={() => setSelectedDate(day.dateStr)}
                      className={`h-8 rounded-lg flex flex-col items-center justify-center relative transition-all cursor-pointer font-bold ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-extrabold shadow"
                          : "hover:bg-secondary/40 text-foreground bg-card/25"
                      }`}
                    >
                      <span>{day.day}</span>
                      {day.hasSessions && !isSelected && (
                        <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sessions List for Selected Day */}
              <div className="space-y-2 border-t border-border/40 pt-4">
                <h3 className="text-xs font-bold text-muted-foreground">Sessions on June {selectedDate.split("-")[2]}</h3>
                {mockSessions[selectedDate] ? (
                  mockSessions[selectedDate].map((session) => (
                    <div
                      key={session.id}
                      className="flex flex-col p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-primary">{session.time}</span>
                        <span className="text-[9px] uppercase font-bold bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">
                          {session.room}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mt-1 line-clamp-1">{session.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{session.batch}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-secondary/20 border border-dashed border-border text-center justify-center">
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">No sessions scheduled on this date.</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setActiveModal("batch")}
              className="w-full mt-4 btn-hero py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Launch Live Session
            </button>
          </div>
        </div>

        {/* Bottom Section: Activities & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Activity Log */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Recent Activity Stream</h2>
              <Activity className="w-4 h-4 text-accent" />
            </div>
            <div className="space-y-4">
              {mockActivities.map((act) => (
                <div key={act.id} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-card/45 hover:bg-card/90 transition-colors border border-border/30">
                  <div className="flex items-start gap-3">
                    <span className={`w-2 h-2 rounded-full mt-2 ${
                      act.type === "submission" ? "bg-purple-500" :
                      act.type === "discussion" ? "bg-cyan-500" :
                      act.type === "upload" ? "bg-blue-500" : "bg-teal-500"
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        <span className="font-semibold text-primary">{act.user}</span> {act.detail}
                      </p>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Action Alerts */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Pending Evaluations</h2>
              <div className="space-y-3">
                {[
                  { student: "Alice Johnson", task: "Docker Architecture Essay", deadline: "Today, 5 PM", delay: "critical" },
                  { student: "Bob Smith", task: "Next.js Static Paths Lab", deadline: "Tomorrow", delay: "warning" },
                  { student: "Clara Oswald", task: "Spring Boot OAuth Quiz", deadline: "In 2 days", delay: "normal" },
                ].map((task, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/40">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{task.student}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{task.task}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        task.delay === "critical" ? "bg-red-500/10 text-red-500" :
                        task.delay === "warning" ? "bg-amber-500/10 text-amber-500" :
                        "bg-secondary text-muted-foreground"
                      }`}>
                        {task.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => toast.info("Redirecting to assessments evaluation workflow...")}
              className="w-full mt-4 bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-2 rounded-xl text-xs transition-colors"
            >
              Open Evaluation Queue
            </button>
          </div>
        </div>

        {/* MODAL OVERLAYS (GLASSMORPHIC DIALOGS) */}
        <AnimatePresence>
          {activeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/40 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-lg glass rounded-2xl p-6 relative shadow-elegant border-primary/20"
              >
                {/* Modal Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full border bg-card hover:bg-secondary grid place-items-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>

                {/* Create Course Form Modal */}
                {activeModal === "course" && (
                  <form onSubmit={(e) => handleQuickAction(e, "Course created")}>
                    <h2 className="text-xl font-bold font-display text-foreground mb-4">Quick Create Course</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Course Title</label>
                        <input required type="text" placeholder="e.g. Intro to Docker & K8s" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Subject Code</label>
                          <input required type="text" placeholder="e.g. CS-301" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Duration (Hours)</label>
                          <input required type="number" placeholder="e.g. 15" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Assigned Scope / University</label>
                        <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                          <option>University of Technology</option>
                          <option>Central Engineering Academy</option>
                          <option>Corporate Learning Hub</option>
                        </select>
                      </div>
                      <button type="submit" disabled={loadingAction} className="w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center">
                        {loadingAction ? "Creating course..." : "Generate Course Outline"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Upload Content Modal */}
                {activeModal === "content" && (
                  <form onSubmit={(e) => handleQuickAction(e, "Asset uploaded")}>
                    <h2 className="text-xl font-bold font-display text-foreground mb-4">Upload Asset to Library</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Asset Name</label>
                        <input required type="text" placeholder="e.g. Cloud Deployments Cheat Sheet" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Asset Type</label>
                          <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                            <option>PDF Document</option>
                            <option>PPT Presentation</option>
                            <option>Comparison Grid</option>
                            <option>Video Lesson</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Subject Tags</label>
                          <input type="text" placeholder="e.g. Cloud, Docker" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">File Upload</label>
                        <div className="border-2 border-dashed border-border/60 hover:bg-secondary/20 transition-all rounded-xl p-8 text-center cursor-pointer">
                          <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                          <span className="text-xs font-bold text-foreground">Click to select files</span>
                          <p className="text-[10px] text-muted-foreground mt-0.5">PDF, MP4, PPTX up to 1GB</p>
                        </div>
                      </div>
                      <button type="submit" disabled={loadingAction} className="w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center">
                        {loadingAction ? "Uploading to Cloud..." : "Add to Library"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Add Student Modal */}
                {activeModal === "student" && (
                  <form onSubmit={(e) => handleQuickAction(e, "Student profiles imported")}>
                    <h2 className="text-xl font-bold font-display text-foreground mb-4">Enroll New Student</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Full Name</label>
                        <input required type="text" placeholder="e.g. Clara Oswald" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Email Address</label>
                        <input required type="email" placeholder="clara@example.com" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Select Batch</label>
                          <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                            <option>Spring Boot Jan 2026</option>
                            <option>React Advanced Cohort</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Roll / UID</label>
                          <input required type="text" placeholder="e.g. UID-9844" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                        </div>
                      </div>
                      <button type="submit" disabled={loadingAction} className="w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center">
                        {loadingAction ? "Enrolling..." : "Enroll Student"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Create Assessment Modal */}
                {activeModal === "assessment" && (
                  <form onSubmit={(e) => handleQuickAction(e, "Assessment published")}>
                    <h2 className="text-xl font-bold font-display text-foreground mb-4">Construct Assessment</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Title</label>
                        <input required type="text" placeholder="e.g. Middleware Orchestration Lab" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Assessment Type</label>
                          <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                            <option>Practical Lab</option>
                            <option>Theoretical Essay</option>
                            <option>Theoretical MCQ Test</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Total Marks</label>
                          <input required type="number" placeholder="100" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Submission Deadline</label>
                        <input required type="datetime-local" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                      </div>
                      <button type="submit" disabled={loadingAction} className="w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center">
                        {loadingAction ? "Deploying Assessment..." : "Publish Assessment"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Send Notification Modal */}
                {activeModal === "notification" && (
                  <form onSubmit={(e) => handleQuickAction(e, "Broadcasting notification")}>
                    <h2 className="text-xl font-bold font-display text-foreground mb-4">Broadcast Notification Alert</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Select Audience</label>
                        <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                          <option>All Enrolled Students (University Scope)</option>
                          <option>Spring Boot Jan 2026 Batch</option>
                          <option>React Advanced Cohort Batch</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Message Content</label>
                        <textarea required rows={4} placeholder="Write announcement details..." className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Channels</label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                            <input defaultChecked type="checkbox" className="rounded border-borderaccent/40" /> Email Alert
                          </label>
                          <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                            <input defaultChecked type="checkbox" className="rounded border-borderaccent/40" /> SMS Text
                          </label>
                          <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                            <input type="checkbox" className="rounded border-borderaccent/40" /> WhatsApp
                          </label>
                        </div>
                      </div>
                      <button type="submit" disabled={loadingAction} className="w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center">
                        {loadingAction ? "Broadcasting..." : "Send Announcement"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Launch Batch Modal */}
                {activeModal === "batch" && (
                  <form onSubmit={(e) => handleQuickAction(e, "Cohort Batch scheduled")}>
                    <h2 className="text-xl font-bold font-display text-foreground mb-4">Launch Batch & Schedule</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Batch Name</label>
                        <input required type="text" placeholder="e.g. NextJS Summer 2026" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Associate Course</label>
                        <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                          <option>Advanced React & Next.js</option>
                          <option>Enterprise Architecture Patterns</option>
                          <option>Microservices with Spring Boot</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Session Timing</label>
                          <input required type="time" defaultValue="10:00" className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary" />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Virtual Room</label>
                          <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                            <option>Virtual Room 1</option>
                            <option>Virtual Room 2</option>
                            <option>Virtual Room 3</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" disabled={loadingAction} className="w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center">
                        {loadingAction ? "Setting up Calendars..." : "Initialize Batch"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Export Report Modal */}
                {activeModal === "report" && (
                  <form onSubmit={(e) => handleQuickAction(e, "Report compilation dispatched")}>
                    <h2 className="text-xl font-bold font-display text-foreground mb-4">Export Performance Report</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Report Category</label>
                        <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                          <option>Student Performance & Grades</option>
                          <option>Engagement & Attendance Logs</option>
                          <option>Course Completion Logs</option>
                          <option>Video Views Heatmaps Summary</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Scope</label>
                          <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                            <option>All Batches</option>
                            <option>Spring Boot Jan 2026</option>
                            <option>React Advanced Cohort</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Export Format</label>
                          <select className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm cursor-pointer focus:border-primary">
                            <option>Excel Worksheet (.xlsx)</option>
                            <option>CSV Raw File (.csv)</option>
                            <option>Acrobat Document (.pdf)</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" disabled={loadingAction} className="w-full btn-hero py-2.5 rounded-xl font-semibold text-sm mt-2 flex items-center justify-center">
                        {loadingAction ? "Gathering data fields..." : "Compile & Download File"}
                      </button>
                    </div>
                  </form>
                )}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PermissionGuard>
  );
}
