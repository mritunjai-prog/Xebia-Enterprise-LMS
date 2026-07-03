import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { PremiumPageHeader } from '@/admin/features/analytics/components/layout/PremiumPageHeader';
import { Trophy, Star, Users, Award, Crown, Building2, Flame } from 'lucide-react';
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
      
      <PremiumPageHeader
        title="Learning Champions"
        description="Celebrating our most dedicated learners and highly engaged departments across the organization."
        icon={Trophy}
        badgeText="Recognition Center"
        badgeColor="rose"
      />

      {/* SECTION 1: Top 5 Departments */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Building2 className="w-5 h-5 text-rose-600 dark:text-rose-400" /> Top 5 Departments by Engagement
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <ComparisonChart 
                title="Department Engagement Score"
                description="Calculated based on course completions, active hours, and platform logins"
                data={topDepartmentsData}
                xAxisKey="department"
                bars={[{ dataKey: 'engagement', name: 'Engagement Score', color: '#e11d48' }]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Top 10 Employees */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Crown className="w-5 h-5 text-rose-600 dark:text-rose-400" /> Top 10 Employees (Max Learning Hours)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topEmployees.map((emp, idx) => (
            <div key={idx} className="relative group p-4 flex items-center justify-between bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                    idx === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-2 border-amber-400 shadow-md scale-110 group-hover:scale-125 transition-transform duration-500' :
                    idx === 1 ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border-2 border-gray-300' :
                    idx === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-2 border-orange-400' :
                    'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500/20 transition-colors duration-500'
                  }`}>
                    #{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                      {emp.name}
                      {idx === 0 && <Crown className="w-4 h-4 text-amber-500" />}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{emp.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-rose-600 dark:text-rose-400 text-lg group-hover:scale-110 origin-right transition-transform duration-500">{emp.hours}h</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{emp.courses} courses</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
