import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { studentProfile } from "@/lib/dummy-data";

/**
 * Welcome banner displayed at the top of the student dashboard.
 */
export function WelcomeBanner() {
  const initials = studentProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-2xl glass-strong p-8">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Welcome Back,{" "}
            <span className="text-gradient">{studentProfile.name}!</span>
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Continue your learning journey and track your progress.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
            >
              {studentProfile.batch}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {studentProfile.university}
            </Badge>
          </div>
        </div>
        {/* Avatar initials */}
        <div className="hidden md:block">
          <div className="h-24 w-24 rounded-full border-4 border-background shadow-glow flex items-center justify-center text-2xl font-bold text-primary bg-primary/10">
            {initials}
          </div>
        </div>
      </div>
    </div>
  );
}
