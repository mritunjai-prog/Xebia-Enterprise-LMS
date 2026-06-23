import { createFileRoute, Link } from "@tanstack/react-router";
import { studentProfile, enrolledCourses, upcomingAssessments, notifications } from "@/features/student/mocks/dummy-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookOpen, Calendar, Clock, Award, Bell, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/student/")({
  component: DashboardHome,
});

function DashboardHome() {
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-strong p-8">
        <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Welcome Back, <span className="text-gradient">{studentProfile.name}!</span>
            </h1>
            <p className="mt-2 text-muted-foreground text-lg">
              Continue your learning journey and track your progress.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                {studentProfile.batch}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                {studentProfile.university}
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="h-24 w-24 rounded-full border-4 border-background shadow-glow overflow-hidden animate-float">
              <img src={studentProfile.avatar} alt={studentProfile.name} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Enrolled Courses" 
          value={enrolledCourses.length} 
          icon={BookOpen} 
          trend="+2 this month" 
          trendUp={true} 
        />
        <StatCard 
          title="Upcoming Assessments" 
          value={upcomingAssessments.length} 
          icon={Calendar} 
          trend="Next: Tomorrow" 
          trendUp={false} 
        />
        <StatCard 
          title="Completed Courses" 
          value={enrolledCourses.filter(c => c.progress === 100).length} 
          icon={Award} 
          trend="Great job!" 
          trendUp={true} 
        />
        <StatCard 
          title="Unread Notifications" 
          value={unreadNotifications} 
          icon={Bell} 
          trend="Check your inbox" 
          trendUp={false} 
        />
      </div>

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight">Continue Learning</h2>
          <Button variant="ghost" asChild>
            <Link to="/student/courses">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).map(course => (
            <Card key={course.id} className="glass hover:shadow-elegant transition-all duration-300 group overflow-hidden">
              <div className="h-32 w-full overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {course.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="mt-3 flex items-center text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
                  <PlayCircle className="h-4 w-4 mr-2 text-primary" />
                  <span className="line-clamp-1">{course.lastWatched}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full btn-hero" size="sm" asChild>
                  <Link to={`/student/course/${course.id}`}>
                    Resume Learning
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <Card className="glass hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <div className="text-3xl font-bold">{value}</div>
          <p className={`text-xs ${trendUp ? 'text-green-500' : 'text-muted-foreground'}`}>
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
