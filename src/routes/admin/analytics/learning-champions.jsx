import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Trophy, Star, Users, Award, Crown, Building2, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/learning-champions')({
  component: LearningChampionsDashboard,
});

function LearningChampionsDashboard() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 10: Learning Champions
  const topEmployees = [
    { name: 'Sarah Jenkins', dept: 'Engineering', hours: 145, courses: 12 },
    { name: 'Michael Chang', dept: 'Data Science', hours: 132, courses: 10 },
    { name: 'Priya Patel', dept: 'Cloud Ops', hours: 128, courses: 11 },
    { name: 'David Smith', dept: 'Security', hours: 115, courses: 9 },
    { name: 'Elena Rodriguez', dept: 'Engineering', hours: 110, courses: 8 },
    { name: 'James Wilson', dept: 'Product', hours: 98, courses: 7 },
    { name: 'Anita Kumar', dept: 'Data Science', hours: 95, courses: 8 },
    { name: 'Robert Taylor', dept: 'Engineering', hours: 92, courses: 6 },
    { name: 'Lisa Anderson', dept: 'Cloud Ops', hours: 88, courses: 7 },
    { name: 'William Brown', dept: 'Security', hours: 85, courses: 6 }
  ];

  const topDepartmentsData = [
    { department: 'Engineering', engagement: 92 },
    { department: 'Data Science', engagement: 88 },
    { department: 'Cloud Ops', engagement: 85 },
    { department: 'Security', engagement: 78 },
    { department: 'Product', engagement: 72 }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-rose-500/10">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Trophy className="w-64 h-64 text-rose-400" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-rose-500/30 text-rose-200 border-rose-400/30 mb-4 px-3 py-1 backdrop-blur-md">
            Recognition Center
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Learning Champions</h1>
          <p className="mt-3 text-rose-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Celebrating our most dedicated learners and highly engaged departments across the organization.
          </p>
        </div>
      </div>

      {/* SECTION 1: Top 5 Departments */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Building2 className="w-5 h-5 text-rose-600 dark:text-rose-400" /> Top 5 Departments by Engagement
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6 border-border/50 shadow-md">
            <ComparisonChart 
              title="Department Engagement Score"
              description="Calculated based on course completions, active hours, and platform logins"
              data={topDepartmentsData}
              xAxisKey="department"
              bars={[{ dataKey: 'engagement', name: 'Engagement Score', color: '#e11d48' }]}
            />
          </Card>
        </div>
      </div>

      {/* SECTION 2: Top 10 Employees */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Crown className="w-5 h-5 text-rose-600 dark:text-rose-400" /> Top 10 Employees (Max Learning Hours)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topEmployees.map((emp, idx) => (
            <Card key={idx} className="p-4 flex items-center justify-between shadow-sm border-border/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                  idx === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-2 border-amber-400' :
                  idx === 1 ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border-2 border-gray-300' :
                  idx === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-2 border-orange-400' :
                  'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                }`}>
                  #{idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    {emp.name}
                    {idx === 0 && <Crown className="w-4 h-4 text-amber-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground">{emp.dept}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-rose-600 dark:text-rose-400 text-lg">{emp.hours}h</p>
                <p className="text-xs text-muted-foreground">{emp.courses} courses</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
