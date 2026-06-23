import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Reply,
  CheckCircle,
  Pin,
  X,
  Search,
  Send,
  Building,
  Star,
  ThumbsUp,
  Award,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/discussions/")({
  component: DiscussionsView,
});

const initialThreads = [
  {
    id: "d1",
    student: "Alice Johnson",
    course: "Advanced React & Next.js",
    module: "Hooks Overview",
    message: "Can you explain how useEffect cleanup works? Specifically when dealing with WebSocket connections inside dynamic routes. I keep seeing memory leaks.",
    time: "2 hours ago",
    unread: true,
    replies: [
      { id: "r1", user: "Vikram Dev (TA)", message: "Check if you are closing the connection inside the return statement of useEffect. Example: return () => socket.close();", time: "1 hour ago" },
    ],
  },
  {
    id: "d2",
    student: "Bob Smith",
    course: "Microservices with Spring Boot",
    module: "Kafka Event Broker",
    message: "Is the dead-letter queue auto-configured or do we have to manually set the listener container factories for retries? The logs show message dropoffs.",
    time: "1 day ago",
    unread: false,
    replies: [],
  },
];

const mockSurveys = [
  { id: "s1", course: "Advanced React & Next.js", rating: 4.8, count: 48, recommend: 96, comment: "Excellent practical hands-on labs. The dashboard code examples were very complete!" },
  { id: "s2", course: "Microservices with Spring Boot", rating: 4.5, count: 32, recommend: 90, comment: "Great content on Kafka, but would love more visual deployment architecture guides." },
];

function DiscussionsView() {
  const [threads, setThreads] = useState(initialThreads);
  const [selectedThread, setSelectedThread] = useState(initialThreads[0]);
  const [search, setSearch] = useState("");
  const [discussionsTab, setDiscussionsTab] = useState("forum"); // forum, surveys
  const [newReply, setNewReply] = useState("");

  const handlePostReply = (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const newReplyObj = {
      id: `r-${Date.now()}`,
      user: "You (Organiser)",
      message: newReply,
      time: "Just now",
    };

    const updatedThread = {
      ...selectedThread,
      unread: false,
      replies: [...selectedThread.replies, newReplyObj],
    };

    setSelectedThread(updatedThread);
    setThreads(threads.map(t => t.id === selectedThread.id ? updatedThread : t));
    setNewReply("");
    toast.success("Response posted to thread.");
  };

  const handleResolveThread = (id) => {
    toast.success("Thread marked as resolved and closed.");
    setThreads(threads.map(t => t.id === id ? { ...t, unread: false } : t));
  };

  const handlePinAnnouncement = () => {
    toast.success("Broadcasting announcement to all batch feeds!");
  };

  const filteredThreads = threads.filter(t =>
    t.student.toLowerCase().includes(search.toLowerCase()) ||
    t.course.toLowerCase().includes(search.toLowerCase()) ||
    t.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <ModuleHeroBanner
        breadcrumb="Dashboard / Engagement"
        title="Learner Engagement & Forums"
        subtitle="Moderate student threads, broadcast pinned announcements, and analyze course survey feedback."
        actions={
          <>
            <div className="flex border border-border/40 rounded-xl p-0.5 bg-secondary/35">
              <button
                onClick={() => setDiscussionsTab("forum")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  discussionsTab === "forum" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Q&A Forums
              </button>
              <button
                onClick={() => setDiscussionsTab("surveys")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  discussionsTab === "surveys" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Surveys Feedback
              </button>
            </div>
            <button
              onClick={handlePinAnnouncement}
              className="btn-hero flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold cursor-pointer shrink-0"
            >
              <Pin className="w-4 h-4 animate-bounce" /> Pin Announcement
            </button>
          </>
        }
      />

      {discussionsTab === "forum" ? (
        /* Forum Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Thread Inbox */}
          <div className="glass rounded-2xl flex flex-col overflow-hidden border-border/40 h-[500px]">
            <div className="p-4 border-b border-border/30 bg-secondary/20 flex flex-col gap-3">
              <h2 className="font-bold text-sm text-foreground">Discussions Inbox</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search comments..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-background border border-border/40 rounded-lg text-xs outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-border/30">
              {filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`w-full text-left p-4 hover:bg-secondary/40 transition-colors flex flex-col gap-1.5 ${
                    selectedThread.id === thread.id ? "bg-primary/5 border-l-2 border-primary" : ""
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">{thread.student}</span>
                    <span className="text-[10px] text-muted-foreground">{thread.time}</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary">{thread.course} • {thread.module}</span>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{thread.message}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Thread Details Chat panel */}
          <div className="lg:col-span-2 glass rounded-2xl flex flex-col overflow-hidden border-border/40 h-[500px] justify-between">
            <div className="p-4 border-b border-border/30 bg-secondary/20 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground">{selectedThread.module}</h3>
                <span className="text-[10px] text-muted-foreground font-semibold">{selectedThread.student} • {selectedThread.course}</span>
              </div>
              <button
                onClick={() => handleResolveThread(selectedThread.id)}
                className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded hover:bg-emerald-500/25 transition-all cursor-pointer"
              >
                Mark Resolved
              </button>
            </div>

            {/* Nested reply chat stream */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              
              {/* Student original message */}
              <div className="flex gap-3.5 items-start max-w-[85%]">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs shrink-0">
                  {selectedThread.student.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="p-3 bg-card border border-border/40 rounded-2xl rounded-tl-none space-y-1.5 shadow-sm">
                  <p className="text-xs text-foreground font-medium leading-relaxed">{selectedThread.message}</p>
                  <span className="text-[9px] text-muted-foreground block">{selectedThread.time}</span>
                </div>
              </div>

              {/* Nested replies */}
              {selectedThread.replies.map((rep) => (
                <div key={rep.id} className="flex gap-3.5 items-start max-w-[85%] ml-auto justify-end">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-none space-y-1.5 shadow-sm text-right">
                    <span className="text-[9px] font-extrabold text-primary block">{rep.user}</span>
                    <p className="text-xs text-foreground font-medium leading-relaxed">{rep.message}</p>
                    <span className="text-[9px] text-muted-foreground block">{rep.time}</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-extrabold text-xs shrink-0">
                    {rep.user.includes("TA") ? "TA" : "OR"}
                  </div>
                </div>
              ))}

            </div>

            {/* Message composer */}
            <form onSubmit={handlePostReply} className="p-4 border-t border-border/30 bg-background flex gap-2">
              <input
                type="text"
                placeholder="Type your instruction or reply..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-xl bg-card outline-none text-xs focus:border-primary"
              />
              <button
                type="submit"
                className="h-8.5 w-8.5 bg-primary text-primary-foreground rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary/95 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>
      ) : (
        /* Feedback Surveys Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSurveys.map((survey) => (
            <div key={survey.id} className="glass rounded-2xl p-5 border-border/40 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-foreground">{survey.course}</h3>
                  <span className="text-[10px] text-muted-foreground font-semibold">N = {survey.count} Surveys</span>
                </div>
                <hr className="my-3 border-border/30" />

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 bg-secondary/35 rounded-xl border text-center">
                    <Star className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <span className="text-[9px] text-muted-foreground uppercase font-bold block">Avg Rating</span>
                    <strong className="text-sm font-extrabold text-foreground">{survey.rating} / 5.0</strong>
                  </div>
                  <div className="p-2 bg-secondary/35 rounded-xl border text-center">
                    <ThumbsUp className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                    <span className="text-[9px] text-muted-foreground uppercase font-bold block">Recommend</span>
                    <strong className="text-sm font-extrabold text-foreground">{survey.recommend}%</strong>
                  </div>
                  <div className="p-2 bg-secondary/35 rounded-xl border text-center">
                    <Award className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                    <span className="text-[9px] text-muted-foreground uppercase font-bold block">Lab Quality</span>
                    <strong className="text-sm font-extrabold text-foreground">High</strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-card border border-border/40 rounded-xl space-y-1">
                <span className="text-[9px] text-muted-foreground font-bold uppercase block">Latest Feedback Text</span>
                <p className="text-xs text-foreground italic leading-relaxed">"{survey.comment}"</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
