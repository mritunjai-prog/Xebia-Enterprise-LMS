import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { Award, ShieldCheck, Target, Cloud, Server, LayoutGrid, CheckCircle2, History, Network, BadgeCheck, FileCheck, Building2, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAnalyticsFilters } from '@/admin/features/analytics/context/AnalyticsFilterContext';

export const Route = createFileRoute('/admin/analytics/certifications')({
  component: CertificationDashboard,
});

function CertificationDashboard() {
  const { filters } = useAnalyticsFilters();

  // Mock Enterprise Data for Section 6: Certifications
  const metrics = {
    totalCertificationsCount: 1250,
    activeVendors: 14,
    passRate: 92
  };

  const deptCertData = [
    { department: 'Engineering', count: 620 },
    { department: 'IT & Cloud', count: 340 },
    { department: 'Data Science', count: 180 },
    { department: 'Security', count: 75 },
    { department: 'Product', count: 35 }
  ];

  const topCertifications = [
    { name: 'AWS Certified Solutions Architect', vendor: 'AWS', count: 210 },
    { name: 'Microsoft Certified: Azure Administrator', vendor: 'Microsoft', count: 185 },
    { name: 'Certified Kubernetes Administrator (CKA)', vendor: 'CNCF', count: 142 },
    { name: 'Google Cloud Professional Cloud Architect', vendor: 'Google Cloud', count: 115 },
    { name: 'Certified Information Systems Security Professional', vendor: 'ISC2', count: 95 },
    { name: 'Databricks Certified Data Engineer Professional', vendor: 'Databricks', count: 82 },
    { name: 'HashiCorp Certified: Terraform Associate', vendor: 'HashiCorp', count: 75 },
    { name: 'Cisco Certified Network Associate (CCNA)', vendor: 'Cisco', count: 68 },
    { name: 'Scrum Alliance Certified ScrumMaster', vendor: 'Scrum Alliance', count: 60 },
    { name: 'Salesforce Certified Administrator', vendor: 'Salesforce', count: 48 }
  ];

  const vendorDistributionData = [
    { name: 'AWS', value: 310, color: '#f59e0b' },
    { name: 'Microsoft Azure', value: 240, color: '#3b82f6' },
    { name: 'Google Cloud', value: 160, color: '#10b981' },
    { name: 'CNCF (Kubernetes)', value: 155, color: '#6366f1' },
    { name: 'Others', value: 385, color: '#64748b' }
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
            Credential Tracking
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-sm">Certifications Dashboard</h1>
          <p className="mt-3 text-emerald-100/80 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Monitor organizational certification counts and department-wise credential distribution.
          </p>
        </div>
      </div>

      {/* SECTION 1: Certification Overview (KPIs) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Certification Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <MetricCard 
            title="Total Certifications Count" 
            value={metrics.totalCertificationsCount.toLocaleString()} 
            icon={BadgeCheck} 
            description="Enterprise-wide credentials"
            className="shadow-sm border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20" 
          />
          <MetricCard 
            title="Active Technology Vendors" 
            value={metrics.activeVendors} 
            icon={Cloud} 
            description="Across all departments"
            className="shadow-sm border-border/50" 
          />
          <MetricCard 
            title="Avg. Exam Pass Rate" 
            value={`${metrics.passRate}%`} 
            icon={ShieldCheck} 
            description="Based on reimbursement data"
            className="shadow-sm border-border/50" 
          />
        </div>
      </div>

      {/* SECTION 2 & 3: Department Distribution & Vendors */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Demographics & Providers
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComparisonChart 
              title="Department-wise Certifications"
              description="Number of active certifications held per department"
              data={deptCertData}
              xAxisKey="department"
              bars={[{ dataKey: 'count', name: 'Certifications', color: '#10b981' }]}
              className="shadow-md h-full border-emerald-500/10"
            />
          </div>
          <div className="lg:col-span-1">
            <DonutChart 
              title="Vendor Distribution"
              description="Share of credentials by external vendor"
              data={vendorDistributionData}
              className="shadow-md h-full border-emerald-500/10"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: Top 10 Popular Certifications */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Top Credentials
        </h2>
        
        <Card className="shadow-sm border-border/50 bg-white dark:bg-[#15151f]">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Star className="w-4 h-4 text-emerald-500" /> Top 10 Popular Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCertifications.map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-card/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-tight">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.vendor}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-bold shrink-0">{cert.count} Achieved</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

// Temporary Star icon import since it was missing from lucide-react imports above
import { Star } from 'lucide-react';
