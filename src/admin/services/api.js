

const loadMock = (key, defaultData) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
  }
  return defaultData;
};

const saveMock = (key, data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

let mockDashboardData = loadMock('lms_mock_dashboard', {
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
});

let mockUsers = loadMock('lms_mock_users', [
  { id: 'u1', name: 'Amit Kumar', email: 'amit@iitb.ac.in', role: 'Trainer', tenant: 'IIT Bombay', status: 'Active', lastLogin: '10m ago', avatarColor: '#6C1D5F' },
  { id: 'u2', name: 'Sarah Jones', email: 'sarah@tcs.com', role: 'Manager', tenant: 'Tata Consultancy', status: 'Active', lastLogin: '1h ago', avatarColor: '#533754' },
  { id: 'u3', name: 'Ravi Singh', email: 'ravi@du.ac.in', role: 'Student', tenant: 'Delhi University', status: 'Inactive', lastLogin: '2d ago', avatarColor: '#4A1E47' },
  { id: 'u4', name: 'Neha Gupta', email: 'neha@tcs.com', role: 'Student', tenant: 'Tata Consultancy', status: 'Active', lastLogin: 'Just now', avatarColor: '#01AC9F' },
]);

let mockOrgs = loadMock('lms_mock_orgs', [
  ...mockDashboardData.recentOrgs,
  { id: '5', name: 'Stanford Univ.', domain: 'stanford.edu', type: 'University', status: 'Active', abbr: 'SU', color: '#84117C' },
  { id: '6', name: 'Google Cloud Training', domain: 'google.com', type: 'Company', status: 'Active', abbr: 'GC', color: '#FF6200' },
]);

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  dashboard: {
    getOverview: async () => {
      await delay(400);
      return mockDashboardData;
    }
  },
  organizations: {
    list: async () => {
      await delay(400);
      return [...mockOrgs];
    },
    create: async (org) => {
      await delay(600);
      const newOrg = {
        id: Math.random().toString(),
        name: org.name || 'New Org',
        domain: org.domain || 'example.com',
        type: org.type || 'Company',
        status: 'Active',
        abbr: org.name ? org.name.substring(0, 2).toUpperCase() : 'NO',
        color: '#6C1D5F',
        ...org
      };
      mockOrgs.unshift(newOrg);
      saveMock('lms_mock_orgs', mockOrgs);
      return newOrg;
    }
  },
  users: {
    list: async () => {
      await delay(400);
      return [...mockUsers];
    },
    create: async (user) => {
      await delay(600);
      const newUser = {
        id: Math.random().toString(),
        name: user.name || 'New User',
        email: user.email || 'user@example.com',
        role: user.role || 'Student',
        tenant: user.tenant || 'Global',
        status: 'Active',
        lastLogin: 'Never',
        avatarColor: '#01AC9F',
        ...user
      };
      mockUsers.unshift(newUser);
      saveMock('lms_mock_users', mockUsers);
      return newUser;
    }
  },
  approvals: {
    process: async (id, action) => {
      await delay(500);
      mockDashboardData.approvals = mockDashboardData.approvals.filter(a => a.id !== id);
      mockDashboardData.kpi.approvals.total = Math.max(0, mockDashboardData.kpi.approvals.total - 1);
      saveMock('lms_mock_dashboard', mockDashboardData);
      return true;
    }
  }
};
