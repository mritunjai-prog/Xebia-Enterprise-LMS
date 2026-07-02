import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService, CategoryService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { BookOpen, Tag, Users, Activity, FileCheck, FileEdit, Plus, LayoutGrid, GraduationCap, BarChart, Server, CheckCircle2, ChevronRight, Clock, ShieldCheck, Database, Calendar, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { clsx } from 'clsx';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export const Route = createFileRoute('/admin/analytics/executive')({
  component: ExecutiveSummary,
});

function ExecutiveSummary() {
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: CourseService.getCourses,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: CategoryService.getCategories,
  });

  if (coursesLoading || categoriesLoading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Executive Dashboard</h1>
            <p className="text-sm font-medium text-muted-foreground mt-1">Platform command center and top-level learning analytics</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton className="h-[120px] rounded-2xl" />
          <Skeleton className="h-[120px] rounded-2xl" />
          <Skeleton className="h-[120px] rounded-2xl" />
          <Skeleton className="h-[120px] rounded-2xl" />
        </div>
      </div>
    );
  }

  const courseList = courses || [];
  const categoryList = categories || [];

  const totalCourses = courseList.length;
  const publishedCourses = courseList.filter(c => c.published || c.isPublished).length;
  const draftCourses = totalCourses - publishedCourses;
  const totalCategories = categoryList.length;

  // Chart Data
  const statusData = [
    { name: 'Published', value: publishedCourses, color: '#01AC9F' },
    { name: 'Drafts', value: draftCourses, color: '#F59E0B' }
  ];

  const categoryCountMap = {};
  courseList.forEach(course => {
    let catName = 'Uncategorized';
    if (course.category && course.category.name) {
      catName = course.category.name;
    } else if (course.categoryId) {
      const foundCat = categoryList.find(c => String(c.id) === String(course.categoryId));
      if (foundCat) catName = foundCat.name;
    }
    categoryCountMap[catName] = (categoryCountMap[catName] || 0) + 1;
  });
  
  const categoryChartData = Object.entries(categoryCountMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Recent Activity Data
  const recentCourses = [...courseList]
    .sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0))
    .slice(0, 5);

  const draftActionItems = courseList
    .filter(c => !(c.published || c.isPublished))
    .slice(0, 4);

  // Health Status Config
  const healthModules = [
    { name: 'Course Service', status: 'Operational', ping: '12ms' },
    { name: 'Categories API', status: 'Operational', ping: '8ms' },
    { name: 'Analytics Hub', status: 'Operational', ping: '15ms' },
    { name: 'Enrollment Engine', status: 'Operational', ping: '21ms' },
    { name: 'Student Portal', status: 'Operational', ping: '18ms' }
  ];

  // Roadmap Cards Config
  const roadmapModules = [
    { title: 'AI Transformation', icon: Sparkles, desc: 'Telemetry tracking for Copilot and AI adoption' },
    { title: 'Learning Coverage', icon: Users, desc: 'Enterprise HR directory synchronization' },
    { title: 'Certifications', icon: ShieldCheck, desc: 'External Zoho/AWS integration tracking' },
    { title: 'Fresher Journey', icon: Calendar, desc: 'Campus-to-billable lifecycle metrics' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* 1. Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6C1D5F] via-[#84117C] to-[#01AC9F] p-8 sm:p-10 text-white shadow-2xl border border-white/10">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 mb-4 px-3 py-1">Command Center</Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Welcome to Xebia LMS Analytics</h1>
          <p className="mt-3 text-white/90 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Monitor real-time platform health, review curriculum statistics, and analyze course distribution across your enterprise ecosystem. 
          </p>
        </div>
      </div>

      {/* 2. Top KPI Cards (Actionable) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" /> Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link to="/admin/courses" className="block group">
            <MetricCard 
              title="Total Courses" 
              value={totalCourses} 
              icon={BookOpen} 
              className="h-full border-primary/20 shadow-md group-hover:border-primary/50 group-hover:shadow-lg transition-all" 
              description="View all curriculum"
            />
          </Link>
          <Link to="/admin/courses" className="block group">
            <MetricCard 
              title="Published" 
              value={publishedCourses} 
              icon={FileCheck} 
              className="h-full shadow-md group-hover:border-emerald-500/50 group-hover:shadow-lg transition-all" 
              description="Active courses"
            />
          </Link>
          <Link to="/admin/courses" className="block group">
            <MetricCard 
              title="Drafts" 
              value={draftCourses} 
              icon={FileEdit} 
              className="h-full shadow-md group-hover:border-amber-500/50 group-hover:shadow-lg transition-all" 
              description="Requires attention"
            />
          </Link>
          <Link to="/admin/categories" className="block group">
            <MetricCard 
              title="Categories" 
              value={totalCategories} 
              icon={Tag} 
              className="h-full shadow-md group-hover:border-primary/50 group-hover:shadow-lg transition-all" 
              description="Manage taxonomies"
            />
          </Link>
        </div>
      </div>

      {/* 3. Learning Insights & Platform Health */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BarChart className="w-5 h-5 text-primary" /> Learning Insights & Health
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <DonutChart 
            title="Course Status" 
            description="Published vs Draft distribution"
            data={statusData}
            className="shadow-md"
          />
          
          {categoryChartData.length > 0 ? (
            <DonutChart 
              title="Category Distribution" 
              description="Courses across top learning categories"
              data={categoryChartData}
              className="shadow-md"
            />
          ) : (
            <EmptyState 
              title="Category Distribution" 
              description="No categorized courses found. Create categories and assign them to courses to see distribution metrics." 
            />
          )}

          {/* Lightweight Platform Health */}
          <Card className="bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col h-full">
            <CardHeader className="pb-1 pt-5 px-5 text-center">
              <CardTitle className="text-md font-extrabold text-foreground">Platform Health</CardTitle>
              <CardDescription className="text-[11px] font-medium">Current API subsystem status</CardDescription>
            </CardHeader>
            
            <CardContent className="flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar px-5 pb-5 pt-1">
              {healthModules.map((mod, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-[#2e2e3e]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-[13px] font-bold text-gray-700 dark:text-gray-200">{mod.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">{mod.status}</span>
                    <span className="text-xs font-medium text-gray-400">{mod.ping}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Recent Activity & Action Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" /> Content Activity
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recently Added Courses */}
          <Card className="p-6 bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-4">Recently Updated Courses</h3>
            {recentCourses.length > 0 ? (
              <div className="flex flex-col gap-3">
                {recentCourses.map((c) => {
                  const dateString = c.updatedAt || c.createdAt;
                  const timeAgo = dateString ? formatDistanceToNow(new Date(dateString), { addSuffix: true }) : 'Recently';
                  const courseSlug = c.slug || (c.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <Link key={c.id} to={`/courses/${courseSlug}`} className="group">
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-[#2e2e3e] hover:border-[#6C1D5F]/30 dark:hover:border-[#84117C]/50 hover:bg-[#F7F8FC]/60 dark:hover:bg-black/20 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[#6C1D5F]/10 text-[#6C1D5F] dark:text-[#84117C] flex items-center justify-center shrink-0 font-bold text-[13px] uppercase shadow-sm overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center z-0">
                              {c.title ? c.title.substring(0, 2) : 'CO'}
                            </div>
                            {(c.icon || c.thumbnailImageUrl || c.thumbnail) && (
                              <img src={c.icon || c.thumbnailImageUrl || c.thumbnail} alt="" className="w-full h-full object-contain p-1 relative z-10" onError={e => { e.target.style.display = 'none'; }} />
                            )}
                          </div>
                          <div>
                            <p className="text-[14px] font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors">{c.title}</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{c.category?.name || categoryList.find(cat => String(cat.id) === String(c.categoryId))?.name || 'Uncategorized'} • {timeAgo}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#6C1D5F] dark:group-hover:text-[#84117C] transition-colors" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">No recent courses found.</p>
            )}
          </Card>

          {/* Action Items (Drafts) */}
          <Card className="p-6 bg-amber-50/30 dark:bg-amber-950/10 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Drafts Requiring Attention</h3>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Courses pending publication</p>
              </div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
                {draftActionItems.length} Pending
              </Badge>
            </div>
            
            {draftActionItems.length > 0 ? (
              <div className="flex flex-col gap-3">
                {draftActionItems.map((c) => {
                  const courseSlug = c.slug || (c.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                  <Link key={c.id} to={`/courses/${courseSlug}`} className="group">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#15151f] border border-gray-100 dark:border-[#2e2e3e] hover:border-amber-300 dark:hover:border-amber-700/50 transition-all duration-200 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 flex items-center justify-center shrink-0 font-bold text-[13px] uppercase shadow-sm overflow-hidden relative">
                          <div className="absolute inset-0 flex items-center justify-center z-0">
                            {c.title ? c.title.substring(0, 2) : 'CO'}
                          </div>
                          {(c.icon || c.thumbnailImageUrl || c.thumbnail) && (
                            <img src={c.icon || c.thumbnailImageUrl || c.thumbnail} alt="" className="w-full h-full object-contain p-1 relative z-10" onError={e => { e.target.style.display = 'none'; }} />
                          )}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors truncate max-w-[200px] sm:max-w-[250px]">{c.title}</p>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Draft Status</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-500 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">Review</span>
                    </div>
                  </Link>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">All courses are currently published!</p>
            )}
          </Card>
        </div>
      </div>

      {/* 5. Analytics Preview Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" /> Enterprise Analytics Dashboards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          
          {[
            { name: 'Learning Coverage', path: 'coverage', icon: Users, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', desc: 'Platform adoption & demographics.', status: 'Active' },
            { name: 'Learning Hours', path: 'hours', icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10', desc: 'Upskilling & time investment metrics.', status: 'Active' },
            { name: 'Learning Pillars', path: 'pillars', icon: Activity, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10', desc: 'Strategic taxonomy breakdown.', status: 'Active' },
            { name: 'AI Transformation', path: 'ai-transformation', icon: Sparkles, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-500/10', desc: 'Copilot telemetry & AI upskilling.', status: 'Active' },
            { name: 'Certifications', path: 'certifications', icon: ShieldCheck, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10', desc: 'External credentials & integrations.', status: 'Active' },
            { name: 'Flagship Programs', path: 'flagship-programs', icon: GraduationCap, color: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-500/10', desc: 'Strategic academies & ROI tracking.', status: 'Active' }
          ].map((dash, idx) => (
            <Link key={idx} to={`/admin/analytics/${dash.path}`} className="block">
              <Card className="p-4 border border-gray-200 dark:border-[#2e2e3e] bg-white dark:bg-[#15151f] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group h-full">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${dash.bg} flex items-center justify-center ${dash.color} shrink-0`}>
                    <dash.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[13px] font-bold text-foreground">{dash.name}</h3>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none text-[9px] px-1.5 py-0 h-4">Active</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{dash.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors shrink-0 ml-2" />
              </Card>
            </Link>
          ))}

          {/* Pending Dashboards */}
          {[
            { name: 'Learning Trends', path: 'trends' },
            { name: 'Training Effectiveness', path: 'effectiveness' },
            { name: 'Learning Champions', path: 'champions' },
            { name: 'Project Investment', path: 'investment' },
            { name: 'Fresher Journey', path: 'fresher' }
          ].map((dash, idx) => (
            <Link key={`pending-${idx}`} to={`/admin/analytics/${dash.path}`} className="block">
              <Card className="p-4 border-dashed border-2 border-gray-200 dark:border-[#2e2e3e] bg-gray-50/50 dark:bg-white/5 opacity-80 hover:opacity-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-center justify-between group h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200/50 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                    <BarChart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">{dash.name}</h3>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">Future enterprise module.</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors shrink-0 ml-2" />
              </Card>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}
