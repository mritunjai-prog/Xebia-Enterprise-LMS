import { DashboardData } from '../types';

export const mockDashboardData: DashboardData = {
  kpi: {
    orgs: { total: 1284, change: 12 },
    users: { total: 24719, change: 8 },
    trainers: { total: 892, change: 5 },
    courses: { total: 3461, change: 3 },
    batches: { total: 287, change: 18 },
    approvals: { total: 14, change: -2, isNegative: true },
    students: { total: 9148, change: 9 },
    assessments: { total: 6204, change: 21 },
  },
  recentOrgs: [
    { id: '1', name: 'IIT Bombay', domain: 'iitb.ac.in', type: 'University', status: 'Active', abbr: 'IIT', color: '#6C1D5F' },
    { id: '2', name: 'Tata Consultancy', domain: 'tcs.com', type: 'Company', status: 'Active', abbr: 'TCS', color: '#533754' },
    { id: '3', name: 'Delhi University', domain: 'du.ac.in', type: 'University', status: 'Pending', abbr: 'DU', color: '#4A1E47' },
    { id: '4', name: 'Infosys Ltd.', domain: 'infosys.com', type: 'Company', status: 'Inactive', abbr: 'INF', color: '#5B1E53' },
  ],
  approvals: [
    { id: 'a1', title: 'New Batch — IIT Bombay · ML Engineering', requester: 'Priya Sharma', timeAgo: '2h ago', slaHours: 6 },
    { id: 'a2', title: 'Role Override — Trainer → Admin · TCS', requester: 'Rahul Mehta', timeAgo: '5h ago', slaHours: 4 },
    { id: 'a3', title: 'Course Publish — AWS Fundamentals v3', requester: 'Anita Patel', timeAgo: '8h ago', slaHours: 24, isUrgent: false },
  ]
};

// Simulation of an API service layer
export const api = {
  dashboard: {
    getOverview: async (): Promise<DashboardData> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDashboardData), 400); // Network delay simulation
      });
    }
  }
};
