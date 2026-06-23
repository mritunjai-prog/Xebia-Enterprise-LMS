import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Send, Smartphone, Mail, MessageSquare, Bell, Clock, CheckCircle, Search, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/notifications/")({
  component: NotificationsView,
});

const initialLogs = [
  { id: "l1", subject: "Syllabus Outline Update: Docker Practice", batch: "Spring Boot Jan 2026", channels: ["email", "whatsapp"], date: "2026-06-22", sent: 45, delivery: 100, open: 92 },
  { id: "l2", subject: "Rescheduled: Advanced React Hooks Session", batch: "React Advanced Cohort", channels: ["email", "sms"], date: "2026-06-20", sent: 32, delivery: 98, open: 88 },
  { id: "l3", subject: "Final Practical Examination Details Released", batch: "Spring Boot Jan 2026", channels: ["email", "whatsapp", "sms"], date: "2026-06-15", sent: 45, delivery: 100, open: 96 },
];

function NotificationsView() {
  const [logs, setLogs] = useState(initialLogs);
  const [channels, setChannels] = useState({ email: true, whatsapp: true, sms: false });
  const [selectedAudience, setSelectedAudience] = useState("Spring Boot Jan 2026");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!subject || !message) return;
    setSending(true);

    const activeChannels = Object.keys(channels).filter(k => channels[k]);
    if (activeChannels.length === 0) {
      toast.error("Please select at least one delivery channel.");
      setSending(false);
      return;
    }

    setTimeout(() => {
      const newLog = {
        id: `l-${Date.now()}`,
        subject: subject,
        batch: selectedAudience,
        channels: activeChannels,
        date: new Date().toISOString().split("T")[0],
        sent: selectedAudience.includes("Spring") ? 45 : 32,
        delivery: 100,
        open: 0, // newly sent
      };

      setLogs([newLog, ...logs]);
      setSending(false);
      setSubject("");
      setMessage("");
      toast.success("Broadcast dispatched across selected provider gateways!");
    }, 1500);
  };

  const toggleChannel = (channel) => {
    setChannels({ ...channels, [channel]: !channels[channel] });
  };

  const filteredLogs = logs.filter(l =>
    l.subject.toLowerCase().includes(search.toLowerCase()) ||
    l.batch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <ModuleHeroBanner
        breadcrumb="Dashboard / Notifications"
        title="Broadcast Notifications & Logs"
        subtitle="Compose multi-channel alerts and review delivery, click, and read logs."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Broadcast Composer */}
        <div className="lg:col-span-1 glass rounded-2xl p-5 border-border/40 flex flex-col justify-between">
          <form onSubmit={handleSendNotification} className="space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-primary" /> Alert Composer
            </h2>
            <hr className="border-border/30" />

            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Select Cohort / Batch</label>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs cursor-pointer focus:border-primary"
              >
                <option value="Spring Boot Jan 2026">Spring Boot Jan 2026 Batch</option>
                <option value="React Advanced Cohort">React Advanced Cohort Batch</option>
                <option value="All active students">All Active Batches</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Alert Subject</label>
              <input
                required
                type="text"
                placeholder="e.g. Schedule Change: Room 4"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs focus:border-primary"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Channels Gateway</label>
              <div className="flex gap-2">
                {[
                  { id: "email", label: "Email", icon: Mail, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" },
                  { id: "whatsapp", label: "WhatsApp", icon: Smartphone, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" },
                  { id: "sms", label: "SMS", icon: MessageSquare, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" },
                ].map((item) => {
                  const active = channels[item.id];
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleChannel(item.id)}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 border rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                        active ? `${item.color} ring-1 ring-primary` : "bg-card text-muted-foreground border-border/40 hover:bg-secondary/40"
                      }`}
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">Message Body</label>
              <textarea
                required
                rows={4}
                placeholder="Enter alert copy... Support Markdown & template keywords like {{student_name}}."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-xs focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Send className="w-4 h-4" /> {sending ? "Broadcasting..." : "Dispatch Broadcast"}
            </button>
          </form>

          <span className="text-[9px] text-muted-foreground text-center block mt-3 font-semibold">
            Messages are automatically routed via SMTP/WhatsApp APIs.
          </span>
        </div>

        {/* Right Side: Delivery Logs */}
        <div className="lg:col-span-2 glass rounded-2xl p-5 border-border/40 flex flex-col justify-between h-[500px]">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/30 pb-3">
              <h2 className="text-base font-bold text-foreground flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" /> Transmission History Logs
              </h2>
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 bg-background border border-border/40 rounded-lg text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-[360px] pr-1">
              <table className="w-full text-xs text-left">
                <thead className="bg-secondary/40 text-muted-foreground border-b border-border/30 text-[10px] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-2">Subject / Batch</th>
                    <th className="px-3 py-2 text-center">Gateways</th>
                    <th className="px-3 py-2 text-center">Delivered</th>
                    <th className="px-3 py-2 text-center">Open Rate</th>
                    <th className="px-3 py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 font-medium">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-secondary/15 transition-all">
                      <td className="px-3 py-3">
                        <h4 className="font-bold text-foreground truncate max-w-xs">{log.subject}</h4>
                        <span className="text-[10px] text-muted-foreground">{log.batch} • {log.date}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex gap-1 justify-center">
                          {log.channels.map((chan) => (
                            <span key={chan} className="p-1 rounded bg-secondary text-muted-foreground" title={chan}>
                              {chan === "email" && <Mail className="w-3.5 h-3.5 text-blue-500" />}
                              {chan === "whatsapp" && <Smartphone className="w-3.5 h-3.5 text-emerald-500" />}
                              {chan === "sms" && <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center font-bold">{log.sent} / {log.sent}</td>
                      <td className="px-3 py-3 text-center font-bold text-primary">{log.open}%</td>
                      <td className="px-3 py-3 text-right">
                        <span className="text-[9px] uppercase font-bold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
                          Success
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
