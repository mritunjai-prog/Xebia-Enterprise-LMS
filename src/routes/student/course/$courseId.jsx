import { createFileRoute } from "@tanstack/react-router";
import { enrolledCourses, commentsData } from "@/features/student/mocks/dummy-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlayCircle, MessageSquare, Reply, Send, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/student/course/$courseId")({
  component: CourseVideoPlayer,
});

function CourseVideoPlayer() {
  const { courseId } = Route.useParams();
  // For demo purposes, we fallback to the first course if ID doesn't match perfectly.
  const course = enrolledCourses.find((c) => c.id === courseId) || enrolledCourses[0];
  const [commentText, setCommentText] = useState("");

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    toast.success("Comment posted successfully!");
    setCommentText("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Video Player Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center group shadow-elegant">
            <img
              src={course.image}
              alt="Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <button className="z-10 h-16 w-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <PlayCircle className="h-8 w-8" />
            </button>
            {/* Fake video controls */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end px-4 pb-2">
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3"></div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Current Module: {course.lastWatched}
            </p>
          </div>

          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Comments & Discussions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handlePostComment} className="flex gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="https://i.pravatar.cc/150?u=vinit" />
                  <AvatarFallback>VN</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Ask a question or share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[80px] resize-y"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" className="btn-hero">
                      <Send className="h-4 w-4 mr-2" /> Post Comment
                    </Button>
                  </div>
                </div>
              </form>

              <div className="space-y-6 mt-6">
                {commentsData.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    {/* Student Comment */}
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-muted/40 p-4 rounded-2xl rounded-tl-none border border-border/50">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-foreground/90">{comment.text}</p>
                      </div>
                    </div>

                    {/* Trainer Replies */}
                    {comment.replies?.map((reply) => (
                      <div key={reply.id} className="flex gap-3 ml-12">
                        <Avatar className="h-8 w-8 border-2 border-primary/20 ring-2 ring-primary/10">
                          <AvatarImage src={reply.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">TR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-primary/5 p-3 rounded-2xl rounded-tl-none border border-primary/10">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-sm text-primary flex items-center gap-1">
                              {reply.author} <CheckCircle2 className="h-3 w-3" />
                            </span>
                            <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground/90">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Video Progress & Modules */}
        <div className="space-y-4">
          <Card className="glass sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Course Progress</CardTitle>
              <CardDescription>Your overall progress in this course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2.5" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {course.modulesCompleted} out of {course.totalModules} modules completed.
              </p>

              <div className="pt-4 mt-4 border-t border-border/50 space-y-2">
                <h3 className="font-medium text-sm mb-3">Module List</h3>
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      idx === 3
                        ? "bg-primary/10 border-primary/30 text-primary font-medium"
                        : idx < 3
                          ? "bg-muted/30 border-border text-muted-foreground"
                          : "hover:bg-muted/50 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {idx < 3 ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <PlayCircle className="h-4 w-4" />
                      )}
                      <span>
                        Module {idx}: {idx === 3 ? course.lastWatched : `Topic ${idx}`}
                      </span>
                    </div>
                    {idx === 3 && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        Playing
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
