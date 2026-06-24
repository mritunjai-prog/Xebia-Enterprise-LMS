import { createFileRoute } from "@tanstack/react-router";
import { Bell, Send, CheckCircle } from "lucide-react";
import { ModuleHeroBanner } from "@/components/module-hero-banner";
import { toast } from "sonner";

export const Route = createFileRoute("/trainer/notifications/")({
  component: NotificationsView,
});

function NotificationsView() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ModuleHeroBanner
        breadcrumb="Dashboard / Notifications"
        title="Announcements & Alerts"
        subtitle="Broadcast messages to your cohorts and track read receipts."
        actions={
          <button
            onClick={() => toast.success("Drafting announcement...")}
            className="btn-hero flex items-center justify-center gap-2 h-10 px-5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" /> New Announcement
          </button>
        }
      />

      <div className="space-y-4">
        {[
          { title: "Mid-Term Exam Schedule Updated", batch: "All Active Batches", date: "June 24, 2026", type: "Alert" },
          { title: "Welcome to React Advanced Cohort", batch: "React Advanced Cohort", date: "June 20, 2026", type: "Welcome" }
        ].map((notif, idx) => (
          <div key={idx} className="glass p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border/40 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-secondary p-2 rounded-full text-primary">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">{notif.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Target: {notif.batch}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{notif.date}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Delivered
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
