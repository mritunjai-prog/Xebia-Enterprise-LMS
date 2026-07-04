import { Badge } from "@/components/ui/badge";
import { AuthService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

/**
 * Welcome banner displayed at the top of the student dashboard.
 */
export function WelcomeBanner() {
  const { data: profile } = useQuery({
    queryKey: ['student-profile'],
    queryFn: AuthService.getProfile
  });

  const name = profile?.name || "Student";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#84117C] to-[#5B1E53] border-0 transition-colors p-8 shadow-lg">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-40 h-40 bg-[#84117C]/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Welcome Back, <span className="text-[#D3CCEC]">{name}!</span>
          </h1>
          <p className="mt-2 text-[#D3CCEC]/80 text-lg font-medium">
            Continue your learning journey and track your progress.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-white/10 text-white hover:bg-white/20 border-0 px-3 py-1 text-xs font-bold backdrop-blur-sm"
            >
              {profile?.batchName || "Enrolled Student"}
            </Badge>
            <Badge variant="outline" className="text-[#D3CCEC] border-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
              {profile?.university || "Xebia Enterprise LMS"}
            </Badge>
          </div>
        </div>
        {/* Avatar initials */}
        <div className="hidden md:block">
          <div className="h-24 w-24 rounded-2xl border border-white/20 shadow-xl flex items-center justify-center text-3xl font-extrabold text-white bg-white/10 backdrop-blur-sm">
            {initials.substring(0, 2)}
          </div>
        </div>
      </div>
    </div>
  );
}
