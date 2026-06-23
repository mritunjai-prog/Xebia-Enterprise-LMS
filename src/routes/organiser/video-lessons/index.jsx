import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Play,
  Pause,
  Plus,
  Clock,
  Users,
  Eye,
  BarChart2,
  X,
  HelpCircle,
  Settings,
  CheckCircle,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { ModuleHeroBanner } from "@/components/module-hero-banner";

export const Route = createFileRoute("/organiser/video-lessons/")({
  component: VideoLessonsView,
});

const initialVideos = [
  { id: "v1", title: "Monolith to Microservices Journey", duration: "18:40", views: 245, avgWatch: "14:15", completion: 76, heatData: [85, 80, 78, 75, 70, 50, 48, 45, 45, 42], quizzes: [{ id: "q1", time: 10, question: "What is DDD?" }] },
  { id: "v2", title: "Docker Containerization Architectures", duration: "12:15", views: 189, avgWatch: "10:30", completion: 86, heatData: [95, 92, 90, 88, 85, 85, 84, 80, 75, 72], quizzes: [] },
  { id: "v3", title: "Advanced React Context & Portals", duration: "25:30", views: 312, avgWatch: "19:45", completion: 77, heatData: [88, 85, 82, 80, 75, 72, 60, 58, 55, 50], quizzes: [] },
];

function VideoLessonsView() {
  const [videos, setVideos] = useState(initialVideos);
  const [selectedVideo, setSelectedVideo] = useState(initialVideos[0]);
  const [search, setSearch] = useState("");
  
  // Interactive Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [playerInterval, setPlayerInterval] = useState(null);
  
  // Quiz insert state
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizTime, setQuizTime] = useState("");
  const [activeQuizOverlay, setActiveQuizOverlay] = useState(null); // when video hits quiz timestamp

  // Video total duration helper (simulated 100s for easy math)
  const durationSec = 100;

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          
          // Check if any quiz is set at this timestamp
          const hitQuiz = selectedVideo.quizzes.find((q) => parseInt(q.time) === next);
          if (hitQuiz) {
            setIsPlaying(false);
            setActiveQuizOverlay(hitQuiz);
            toast.info("Video paused: Interactive Quiz Triggered!");
          }

          if (next >= durationSec) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return next;
        });
      }, 1000);
      setPlayerInterval(interval);
    } else {
      if (playerInterval) {
        clearInterval(playerInterval);
      }
    }

    return () => {
      if (playerInterval) clearInterval(playerInterval);
    };
  }, [isPlaying, selectedVideo]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    setActiveQuizOverlay(null);
  };

  const handleAddQuiz = (e) => {
    e.preventDefault();
    if (!quizQuestion) return;

    const timeMark = parseInt(quizTime) || currentTime;
    const newQuiz = {
      id: `q-${Date.now()}`,
      time: timeMark,
      question: quizQuestion,
    };

    const updatedVideo = {
      ...selectedVideo,
      quizzes: [...selectedVideo.quizzes, newQuiz],
    };

    setSelectedVideo(updatedVideo);
    setVideos(videos.map(v => v.id === selectedVideo.id ? updatedVideo : v));
    setQuizQuestion("");
    setQuizTime("");
    setIsQuizModalOpen(false);
    toast.success(`Interactive Quiz inserted at ${timeMark}s timeline!`);
  };

  const formatSec = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Banner */}
      <ModuleHeroBanner
        breadcrumb="Dashboard / Video Lessons"
        title="Video Lessons & Engagement Heatmaps"
        subtitle="Deploy interactive video lectures, embed timestamped check-in questions, and monitor drop-off rates."
      />

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Center Column: Interactive Player & Heatmaps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Mock Video Player */}
          <div className="glass rounded-2xl p-5 border-border/40 space-y-4">
            <h2 className="text-lg font-bold text-foreground truncate">{selectedVideo.title}</h2>
            
            {/* Player Container Box */}
            <div className="aspect-video bg-neutral-950 rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-white border border-border/20 shadow-inner">
              <Video className="w-16 h-16 opacity-10 animate-pulse text-white absolute" />

              {/* Video Play status indicators */}
              <AnimatePresence>
                {activeQuizOverlay ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-neutral-900/90 z-20 p-6 flex flex-col justify-between items-center text-center"
                  >
                    <div className="space-y-3">
                      <HelpCircle className="w-12 h-12 text-primary mx-auto" />
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Student Checkpoint Quiz</span>
                      <h4 className="text-lg font-bold leading-snug">{activeQuizOverlay.question}</h4>
                      <p className="text-xs text-muted-foreground">Select the correct option to resume video.</p>
                    </div>

                    <div className="flex gap-3 mt-4 w-full max-w-sm">
                      <button
                        onClick={() => {
                          setActiveQuizOverlay(null);
                          setIsPlaying(true);
                          toast.success("Correct answer! Resuming video lesson.");
                        }}
                        className="flex-1 btn-hero py-2 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Option A
                      </button>
                      <button
                        onClick={() => toast.error("Incorrect answer. Please review the previous 2 minutes.")}
                        className="flex-1 bg-secondary text-foreground hover:bg-secondary/90 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Option B
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Playback overlay controls */}
              {!isPlaying && !activeQuizOverlay && (
                <button
                  onClick={handlePlayToggle}
                  className="h-16 w-16 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-all z-10 cursor-pointer"
                >
                  <Play className="w-8 h-8 ml-1" />
                </button>
              )}

              {/* Simulated timeline display */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2">
                
                {/* Progress bar with quiz checkpoints */}
                <div className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-visible">
                  <div className="absolute h-full bg-primary rounded-full" style={{ width: `${currentTime}%` }} />
                  
                  {/* Quiz ticks */}
                  {selectedVideo.quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="absolute h-3 w-3 rounded-full bg-accent -top-[3px] border border-black cursor-pointer"
                      style={{ left: `${quiz.time}%` }}
                      title={`Quiz at ${quiz.time}s`}
                      onClick={() => setCurrentTime(parseInt(quiz.time))}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-white/90">
                  <div className="flex items-center gap-3">
                    <button onClick={handlePlayToggle} className="hover:text-primary transition-colors cursor-pointer">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span>{formatSec(currentTime)} / 01:40</span>
                  </div>
                  <button
                    onClick={() => {
                      setQuizTime(currentTime.toString());
                      setIsQuizModalOpen(true);
                    }}
                    className="text-[10px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Insert Quiz
                  </button>
                </div>

              </div>
            </div>

            {/* Retention dropoff heatmap */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground">
                <span>Viewers Retention Heatmap</span>
                <span className="text-emerald-500">Average Watch Duration: {selectedVideo.avgWatch}</span>
              </div>
              
              {/* Visual color gradient bar */}
              <div className="h-6 w-full rounded-lg overflow-hidden flex">
                {selectedVideo.heatData.map((val, idx) => {
                  let bg = "bg-emerald-500";
                  if (val < 80) bg = "bg-teal-500";
                  if (val < 65) bg = "bg-amber-500";
                  if (val < 50) bg = "bg-red-500";
                  return (
                    <div
                      key={idx}
                      className={`h-full flex-1 ${bg} opacity-85 border-r border-black/10 hover:opacity-100 transition-opacity`}
                      title={`Interval ${idx * 10}%: ${val}% active viewers`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] text-muted-foreground font-bold uppercase">
                <span>Start (0:00)</span>
                <span>Dropoff Point (10:00)</span>
                <span>End ({selectedVideo.duration})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Library list */}
        <div className="space-y-6">
          <div className="glass rounded-2xl p-5 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Video Assets</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search videos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => {
                    setSelectedVideo(video);
                    setCurrentTime(0);
                    setIsPlaying(false);
                    setActiveQuizOverlay(null);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedVideo.id === video.id
                      ? "bg-primary/10 border-primary"
                      : "bg-card border-border/40 hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-pink-500/10 text-pink-500 grid place-items-center shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground line-clamp-1 leading-snug">{video.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {video.views}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {video.duration}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-primary">{video.completion}% avg</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Insert Quiz Modal */}
      <AnimatePresence>
        {isQuizModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-md glass rounded-2xl p-6 relative"
            >
              <button
                onClick={() => setIsQuizModalOpen(false)}
                className="absolute top-4 right-4 h-8 w-8 rounded-full border hover:bg-secondary grid place-items-center cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <h2 className="text-xl font-bold font-display mb-4">Embed Interactive Checkpoint</h2>
              <form onSubmit={handleAddQuiz}>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Timeline Timestamp (Seconds)</label>
                    <input
                      required
                      type="number"
                      placeholder="e.g. 15"
                      value={quizTime}
                      onChange={(e) => setQuizTime(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Question Prompt</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. What is the main difference between horizontal scaling and vertical scaling?"
                      value={quizQuestion}
                      onChange={(e) => setQuizQuestion(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl bg-background outline-none text-sm focus:border-primary"
                    />
                  </div>
                  <button type="submit" className="w-full btn-hero py-2.5 rounded-xl text-sm font-semibold mt-2 cursor-pointer">
                    Embed Checkpoint
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
