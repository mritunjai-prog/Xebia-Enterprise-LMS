import React, { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { KpiGrid } from './KpiGrid';
import { ChartsRow } from './ChartsRow';
import { BottomRow } from './BottomRow';
import { IconExport, IconAdd } from '../../components/Icons';

export default function Dashboard() {
  const { dashboardData, isLoading, fetchDashboardData } = useAppStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-[var(--dark-gray)]">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-title">Admin Dashboard</div>
          <div className="page-subtitle">Platform overview — all tenants · June 2025</div>
        </div>
        <div className="page-actions">
          <button className="btn-outline">
            <IconExport />
            Export Report
          </button>
          <button className="btn-primary">
            <IconAdd />
            Add Organization
          </button>
        </div>
      </div>

      <KpiGrid data={dashboardData.kpi} />
      <ChartsRow />
      <BottomRow orgs={dashboardData.recentOrgs} approvals={dashboardData.approvals} />
    </>
  );
}
