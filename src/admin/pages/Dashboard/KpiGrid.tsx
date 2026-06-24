import React from 'react';
import { KPIStats } from '../../types';
import { clsx } from 'clsx';
import {
  IconOrganizations, IconUsers, IconRoles, IconCourses, 
  IconBatch, IconAssessments, IconApprovals, IconReports, IconSettings
} from '../../components/Icons';

interface KpiGridProps {
  data: KPIStats;
}

const KpiCard = ({ icon, color, badge, title, value, isNegativeMode = false }: {
  icon: React.ReactNode;
  color: 'purple' | 'emerald' | 'orange';
  badge: { value: number; isNegative?: boolean };
  title: string;
  value: string | number;
  isNegativeMode?: boolean;
}) => {
  const isUp = badge.isNegative ? false : true; 
  // For pending approvals, an increase could be considered "down" theoretically but the HTML showed it as down visually for pending approvals.
  // Wait, let's just stick to what the original HTML did dynamically using up/down classes.
  const isDown = !isUp;

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <div className={clsx("kpi-icon", color)}>
          {icon}
        </div>
        <span className={clsx("kpi-badge", isDown && "down", !isDown && "up")}>
          {isDown ? '↓' : '↑'} {Math.abs(badge.value)}%
        </span>
      </div>
      <div className="kpi-value">{value.toLocaleString()}</div>
      <div className="kpi-label">{title}</div>
    </div>
  );
};

export const KpiGrid: React.FC<KpiGridProps> = ({ data }) => {
  return (
    <div className="kpi-grid">
      <KpiCard 
        icon={<IconOrganizations />} 
        color="purple" 
        title="Total Organizations" 
        value={data.orgs.total} 
        badge={{ value: data.orgs.change }} 
      />
      <KpiCard 
        icon={<IconUsers />} 
        color="purple" 
        title="Total Users" 
        value={data.users.total} 
        badge={{ value: data.users.change }} 
      />
      <KpiCard 
        icon={<IconRoles />} // Replacing trainer with roles icon visually closes enough
        color="emerald" 
        title="Active Trainers" 
        value={data.trainers.total} 
        badge={{ value: data.trainers.change }} 
      />
      <KpiCard 
        icon={<IconAssessments />} 
        color="purple" 
        title="Active Courses" 
        value={data.courses.total} 
        badge={{ value: data.courses.change }} 
      />
      <KpiCard 
        icon={<IconCourses />} 
        color="purple" 
        title="Active Batches" 
        value={data.batches.total} 
        badge={{ value: data.batches.change }} 
      />
      <KpiCard 
        icon={<IconSettings />} 
        color="orange" 
        title="Pending Approvals" 
        value={data.approvals.total} 
        badge={{ value: data.approvals.change, isNegative: data.approvals.isNegative }} 
      />
      <KpiCard 
        icon={<IconReports />} 
        color="emerald" 
        title="Enrolled Students" 
        value={data.students.total} 
        badge={{ value: data.students.change }} 
      />
      <KpiCard 
        icon={<IconAssessments />} 
        color="orange" 
        title="Assessments Run" 
        value={data.assessments.total} 
        badge={{ value: data.assessments.change }} 
      />
    </div>
  );
};
