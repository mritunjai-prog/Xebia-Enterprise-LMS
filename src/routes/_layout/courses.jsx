import { createFileRoute } from "@tanstack/react-router";
import { enrolledCourses } from "@/lib/dummy-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, PlayCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/courses")({
  component: MyCourses,
});

function MyCourses() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground mt-1">
          Access your assigned courses and continue learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <Card
            key={course.id}
            className="glass group overflow-hidden flex flex-col h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {course.progress === 100 && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500/90 hover:bg-green-600 text-white border-none gap-1">
                    <CheckCircle className="h-3 w-3" /> Completed
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="flex-none p-5 pb-3">
              <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                {course.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {course.duration}
                </span>
                <span>•</span>
                <span>By {course.trainer}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 p-5 py-2">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progress ({course.modulesCompleted}/{course.totalModules} Modules)
                  </span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />

                {course.progress > 0 && course.progress < 100 && (
                  <div className="flex items-start gap-2 bg-muted/40 p-3 rounded-lg mt-4 border border-border/50">
                    <PlayCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                        Resume from
                      </p>
                      <p className="text-sm font-medium line-clamp-2">{course.lastWatched}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-5 pt-4">
              <Button
                className={course.progress === 100 ? "w-full variant-outline" : "w-full btn-hero"}
                variant={course.progress === 100 ? "outline" : "default"}
                asChild
              >
                <Link to={`/course/${course.id}`}>
                  {course.progress === 0
                    ? "Start Course"
                    : course.progress === 100
                      ? "View Certificate"
                      : "Continue Learning"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
