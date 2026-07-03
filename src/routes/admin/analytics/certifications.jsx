import { createFileRoute } from '@tanstack/react-router';
import { MetricCard } from '@/admin/features/analytics/components/metrics/MetricCard';
import { DonutChart } from '@/admin/features/analytics/components/charts/DonutChart';
import { ComparisonChart } from '@/admin/features/analytics/components/charts/ComparisonChart';
import { PremiumPageHeader } from '@/admin/features/analytics/components/layout/PremiumPageHeader';
import { Award, ShieldCheck, Target, Cloud, Server, LayoutGrid, CheckCircle2, History, Network, BadgeCheck, FileCheck, Building2, BookOpen, Star } from 'lucide-react';
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
      
      <PremiumPageHeader
        title="Certifications Dashboard"
        description="Monitor organizational certification counts and department-wise credential distribution."
        icon={Award}
        badgeText="Credential Tracking"
        badgeColor="emerald"
      />

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
        
        <div className="relative group bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 hover:border-primary/40 dark:hover:border-fuchsia-400/60 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
          <div className="absolute -inset-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="p-5 border-b border-gray-100 dark:border-gray-800/50 relative z-10">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Star className="w-4 h-4 text-emerald-500" /> Top 10 Popular Certifications
            </h3>
          </div>
          <div className="p-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topCertifications.map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 dark:border-white/5 rounded-lg bg-white/50 dark:bg-[#252535]/50 hover:bg-white dark:hover:bg-[#252535] transition-colors shadow-sm hover:shadow-md hover:border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{cert.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cert.vendor}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-bold shrink-0 border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300">{cert.count} Achieved</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

