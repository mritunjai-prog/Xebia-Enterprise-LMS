export interface Organization {
  id: string;
  name: string;
  domain: string;
  type: 'University' | 'Company' | 'College';
  status: 'Active' | 'Pending' | 'Inactive';
  abbr: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Trainer' | 'Organiser' | 'Student';
  tenant: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  avatarColor: string;
}

export interface KPIStats {
  orgs: { total: number; change: number };
  users: { total: number; change: number };
  trainers: { total: number; change: number };
  courses: { total: number; change: number };
  batches: { total: number; change: number };
  approvals: { total: number; change: number; isNegative?: boolean };
  students: { total: number; change: number };
  assessments: { total: number; change: number };
}

export interface ApprovalRequest {
  id: string;
  title: string;
  requester: string;
  timeAgo: string;
  slaHours: number;
  isUrgent?: boolean;
}

export interface DashboardData {
  kpi: KPIStats;
  recentOrgs: Organization[];
  approvals: ApprovalRequest[];
}
