import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BookOpen,
  Clock,
  CalendarCheck,
  Video,
  FileText,
  Activity,
  TrendingUp,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { PermissionGuard } from "@/components/auth/permission-guard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/trainer/")({
  component: TrainerDashboard,
});

// Analytics Mock Data
const analyticsData = {
  Weekly: [
    { name: "Mon", attendance: 85, engagement: 70 },
    { name: "Tue", attendance: 90, engagement: 82 },
    { name: "Wed", attendance: 88, engagement: 75 },
    { name: "Thu", attendance: 92, engagement: 85 },
    { name: "Fri", attendance: 95, engagement: 90 },
  ],
  Monthly: [
    { name: "Week 1", attendance: 85, engagement: 75 },
    { name: "Week 2", attendance: 88, engagement: 78 },
    { name: "Week 3", attendance: 92, engagement: 85 },
    { name: "Week 4", attendance: 94, engagement: 88 },
  ],
};

const mockActivities = [
  { id: 1, type: "submission", user: "Alice Johnson", detail: "submitted 'Assignment 2 - Docker Setup'", time: "12 mins ago" },
  { id: 2, type: "discussion", user: "Vikram Dev", detail: "asked a question in 'Microservices'", time: "45 mins ago" },
  { id: 3, type: "system", user: "System", detail: "Your batch 'Cohort 4' is starting soon", time: "2 hours ago" },
  { id: 4, type: "evaluation", user: "You", detail: "graded Bob Smith's Spring Boot Quiz", time: "5 hours ago" },
];

const mockSessions = {
  "2026-06-24": [
    { id: 1, time: "10:00 AM", title: "Advanced Web Architecture", batch: "Batch A", room: "Virtual Room 1" },
    { id: 2, time: "02:00 PM", title: "React Context API", batch: "Batch B", room: "Virtual Room 2" },
  ],
  "2026-06-25": [
    { id: 3, time: "11:30 AM", title: "Docker Containerization Lab", batch: "Cohort 4", room: "Offline Lab 1" },
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

function TrainerDashboard() {
  const [analyticsTab, setAnalyticsTab] = useState("Weekly");
  const [selectedDate, setSelectedDate] = useState("2026-06-24");
  const [activeModal, setActiveModal] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

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

  const calendarDays = [
    { day: 21, dateStr: "2026-06-21" },
    { day: 22, dateStr: "2026-06-22" },
    { day: 23, dateStr: "2026-06-23" },
    { day: 24, dateStr: "2026-06-24", hasSessions: true },
    { day: 25, dateStr: "2026-06-25", hasSessions: true },
    { day: 26, dateStr: "2026-06-26" },
    { day: 27, dateStr: "2026-06-27" },
  ];

  return (
    <PermissionGuard required="course.read">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Premium Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-border/30 shadow-elegant"
          style={{ background: "var(--hero-banner-bg)", minHeight: "170px" }}
        >
          {/* Gradients and Effects ported from Organiser */}
          <div className="absolute inset-0 pointer-events-none dark:opacity-0 transition-opacity duration-500"
            style={{ background: "linear-gradient(135deg, oklch(0.94 0.06 320 / 0.9) 0%, oklch(0.97 0.03 260 / 0.85) 40%, oklch(0.93 0.08 200 / 0.8) 100%)" }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500"
            style={{ background: "linear-gradient(135deg, oklch(0.16 0.06 310) 0%, oklch(0.14 0.04 260) 50%, oklch(0.15 0.05 200) 100%)" }}
          />

          <div className="absolute -left-16 -top-16 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, oklch(0.55 0.22 320 / 0.35) 0%, transparent 70%)", filter: "blur(40px)" }}
          />
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, oklch(0.72 0.18 200 / 0.28) 0%, transparent 70%)", filter: "blur(50px)" }}
          />

          <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 sm:p-8">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.55 0.16 320)" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Dashboard / Trainer
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, var(--color-foreground) 0%, oklch(0.6 0.22 320) 60%, oklch(0.72 0.18 200) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  Trainer Dashboard
                </h1>
                <motion.div
                  animate={{ scaleX: [0.9, 1.05, 0.9], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-[2.5px] w-52 rounded-full mt-2.5 origin-left"
                  style={{ background: "linear-gradient(90deg, oklch(0.55 0.22 320), oklch(0.72 0.18 200), transparent)" }}
                />
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed pt-0.5">
                Welcome back. Monitor your batches, upcoming sessions, and pending evaluations.
              </p>
            </div>

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
                Trainer • University of Technology • Online
              </motion.span>
            </div>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Active Courses" value="12" icon={BookOpen} trend="+2 new" trendUp={true} glowColor="text-purple-500" />
          <StatCard title="Active Batches" value="8" icon={CalendarCheck} trend="+1 new" trendUp={true} glowColor="text-teal-500" />
          <StatCard title="Total Students" value="342" icon={Users} trend="+18% growth" trendUp={true} glowColor="text-cyan-500" />
          <StatCard title="Pending Evaluations" value="24" icon={Clock} trend="-4 pending" trendUp={false} glowColor="text-amber-500" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Analytics Panel */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Class Engagement</h2>
                  <p className="text-xs text-muted-foreground">Monitor student attendance and assignment submissions.</p>
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

              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData[analyticsTab]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.38 0.14 335)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="oklch(0.38 0.14 335)" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.78 0.14 200)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="oklch(0.78 0.14 200)" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{ background: "var(--card)", borderColor: "var(--border)", borderRadius: "12px" }}
                    />
                    <Area type="monotone" dataKey="attendance" stroke="oklch(0.38 0.14 335)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAtt)" />
                    <Area type="monotone" dataKey="engagement" stroke="oklch(0.78 0.14 200)" strokeWidth={2} fillOpacity={1} fill="url(#colorEng)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between border-t border-border/40 pt-4 mt-4 gap-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary"></span>
                  <span className="text-xs text-muted-foreground font-semibold">Average Attendance (%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-accent"></span>
                  <span className="text-xs text-muted-foreground font-semibold">Average Engagement (%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Upcoming Sessions</h2>
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4 border-b border-border/40 pb-2">
                 {calendarDays.map((day) => {
                  const isSelected = selectedDate === day.dateStr;
                  return (
                    <button
                      key={day.day}
                      onClick={() => setSelectedDate(day.dateStr)}
                      className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center relative transition-all cursor-pointer font-bold ${
                        isSelected ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-secondary text-foreground"
                      }`}
                    >
                      <span>{day.day}</span>
                      {day.hasSessions && !isSelected && (
                        <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-accent" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                {mockSessions[selectedDate] ? (
                  mockSessions[selectedDate].map((session) => (
                    <div key={session.id} className="flex flex-col p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold text-primary">{session.time}</span>
                        <span className="text-[9px] uppercase font-bold bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">{session.room}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mt-1">{session.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{session.batch}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-secondary/20 border border-dashed text-center justify-center">
                    <span className="text-xs text-muted-foreground">No sessions scheduled.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
             <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
              <Activity className="w-4 h-4 text-accent" />
            </div>
            <div className="space-y-4">
              {mockActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl bg-card/45 hover:bg-card/90 transition-colors border border-border/30">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground"><span className="font-semibold">{act.user}</span> {act.detail}</p>
                    <span className="text-[10px] text-muted-foreground">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
             <h2 className="text-lg font-bold text-foreground mb-4">Pending Evaluations</h2>
              <div className="space-y-3">
                {[
                  { student: "Alice Johnson", task: "Docker Architecture Essay", deadline: "Today, 5 PM", delay: "critical" },
                  { student: "Bob Smith", task: "React Quiz", deadline: "Tomorrow", delay: "warning" },
                ].map((task, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/40">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{task.student}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{task.task}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-500/10 text-red-500">
                      {task.deadline}
                    </span>
                  </div>
                ))}
              </div>
          </div>
        </div>

      </div>
    </PermissionGuard>
  );
}
