import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CourseService } from '@/services/api';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { EmptyState } from '@/admin/features/analytics/components/feedback/EmptyState';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Award, ShieldCheck, Target, Cloud, Server, LayoutGrid, CheckCircle2, History, Network, BadgeCheck, FileCheck, Building2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/certifications')({
  component: CertificationDashboard,
});

function CertificationDashboard() {
  const { filters } = useAnalyticsFilters();

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: CourseService.getCourses,
  });

  if (coursesLoading) {
    return (
      <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Certifications</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Enterprise certification tracking and external vendor integrations</p>
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

  // Frontend Aggregation (Category B): Map known certification keywords
  const certCounts = {
    'AWS': 0,
    'Azure / Microsoft': 0,
    'Google Cloud': 0,
    'Scrum / Agile': 0,
    'Kubernetes / Docker': 0,
    'CompTIA / Security+': 0
  };

  const certKeywords = {
    'AWS': ['aws', 'amazon web services'],
    'Azure / Microsoft': ['azure', 'microsoft'],
    'Google Cloud': ['google cloud', 'gcp'],
    'Scrum / Agile': ['scrum', 'pmp', 'agile'],
    'Kubernetes / Docker': ['kubernetes', 'docker', 'k8s'],
    'CompTIA / Security+': ['comptia', 'security+', 'ccna', 'cissp']
  };

  let totalCertCourses = 0;

  courseList.forEach(course => {
    const text = `${course.title} ${course.category?.name}`.toLowerCase();
    let found = false;

    Object.entries(certKeywords).forEach(([provider, keywords]) => {
      if (keywords.some(kw => text.includes(kw))) {
        certCounts[provider]++;
        found = true;
      }
    });

    if (found) totalCertCourses++;
  });

  const certChartData = Object.entries(certCounts)
    .filter(([_, count]) => count > 0)
    .map(([name, count]) => ({ name, value: count }))
    .sort((a, b) => b.value - a.value);

  const certBarData = certChartData.map(item => ({ provider: item.name, courses: item.value }));

  // Future Roadmap integrations
  const roadmapIntegrations = [
    { name: 'Microsoft Learn', icon: LayoutGrid, desc: 'Sync Azure certification badges' },
    { name: 'AWS Training', icon: Cloud, desc: 'Sync AWS Solutions Architect credentials' },
    { name: 'Google Cloud Skills', icon: Cloud, desc: 'Sync GCP Professional tracks' },
    { name: 'Cisco Networking Academy', icon: Network, desc: 'Sync CCNA and enterprise networking status' },
    { name: 'Oracle University', icon: Server, desc: 'Sync Java and Oracle DB credentials' },
    { name: 'Coursera Enterprise', icon: Building2, desc: 'Sync University partner certificates' }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700 pb-12">
      
      {/* Premium Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#022c22] to-[#0f172a] p-8 sm:p-10 text-white shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Award className="w-64 h-64 text-white" />
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/30 mb-4 px-3 py-1 backdrop-blur-md">
            Phase 3 Integration
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Certification & Badging</h1>
          <p className="mt-3 text-emerald-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Monitor organizational certification prep coverage. Real-time employee credential tracking and vendor integrations (AWS, Azure) are pending deployment.
          </p>
        </div>
      </div>

      {/* SECTION 1: Certification Overview (KPIs) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Certification Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard 
            title="Cert Prep Courses" 
            value={totalCertCourses} 
            icon={BookOpen} 
            description="Inferred from catalog"
            className="shadow-sm border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20" 
          />
          <MetricCard 
            title="Cert Assignments" 
            value="--" 
            icon={CheckCircle2} 
            description="Integration Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
          <MetricCard 
            title="Cert Attempts" 
            value="--" 
            icon={History} 
            description="Integration Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
          <MetricCard 
            title="Avg. Pass Rate" 
            value="--" 
            icon={ShieldCheck} 
            description="Integration Pending"
            className="shadow-sm border-border/50 bg-muted/20 opacity-70" 
          />
        </div>
      </div>

      {/* SECTION 2 & 4: Certification Distribution & Top Providers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Certification Prep Curriculum
          </h2>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
            Inferred from Course Catalog
          </Badge>
        </div>
        
        {certChartData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ComparisonChart 
                title="Top Certification Providers"
                description="Number of preparation courses inferred per external vendor"
                data={certBarData}
                xAxisKey="provider"
                bars={[{ dataKey: 'courses', name: 'Prep Courses', color: '#10b981' }]}
                className="shadow-md h-full border-emerald-500/10"
              />
            </div>
            <div className="lg:col-span-1">
              <DonutChart 
                title="Curriculum Distribution"
                description="Share of prep courses by vendor"
                data={certChartData}
                className="shadow-md h-full border-emerald-500/10"
              />
            </div>
          </div>
        ) : (
          <Card className="p-8 bg-card/50 border-border/50 shadow-md">
            <EmptyState 
              title="No Certification Content Detected" 
              description="Could not infer any certification prep courses based on catalog keywords (e.g., AWS, Azure, Scrum, CCNA)." 
            />
          </Card>
        )}
      </div>

      {/* SECTION 3: Certification Lifecycle */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <History className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Certification Lifecycle Management
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <EmptyState 
            title="Zoho Approval Workflow" 
            description="Tracking manager approvals for certification exam reimbursements requires the Zoho API integration." 
            icon={<FileCheck className="w-8 h-8 text-emerald-500/30 mb-4" />}
          />
          <EmptyState 
            title="Certificate Issuance & Badging" 
            description="Digital badge statistics require integration with a platform like Credly or explicit certificate tracking tables in the database." 
            icon={<BadgeCheck className="w-8 h-8 text-indigo-500/30 mb-4" />}
          />
          <EmptyState 
            title="Certification Expiry" 
            description="Tracking credential validity (e.g., AWS expires in 3 years) requires a dedicated employee credential management schema." 
            icon={<History className="w-8 h-8 text-amber-500/30 mb-4" />}
          />
        </div>
      </div>

      {/* SECTION 5: Enterprise Certification Roadmap */}
      <div className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Cloud className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Enterprise Integration Roadmap
        </h2>
        <p className="text-sm text-muted-foreground max-w-3xl mb-6">
          The following external vendor integrations are planned for Phase 3 to sync real-time examination results and credentials directly into the LMS.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmapIntegrations.map((vendor, idx) => {
            const Icon = vendor.icon;
            return (
              <Card key={idx} className="p-5 border-dashed border-2 border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 flex flex-col gap-3 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 relative z-10">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    {vendor.name}
                  </h3>
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0 mt-1.5 w-max bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">Future Integration</Badge>
                  <p className="text-xs font-medium text-muted-foreground mt-2 leading-relaxed">
                    {vendor.desc}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

    </div>
  );
}
