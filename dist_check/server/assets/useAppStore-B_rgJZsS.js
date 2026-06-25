import { create } from "zustand";
//#region src/admin/services/api.js
var loadMock = (key, defaultData) => {
	if (typeof window !== "undefined") {
		const saved = localStorage.getItem(key);
		if (saved) try {
			return JSON.parse(saved);
		} catch (e) {}
	}
	return defaultData;
};
var saveMock = (key, data) => {
	if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(data));
};
var mockDashboardData = loadMock("lms_mock_dashboard", {
	kpi: {
		orgs: {
			total: 1284,
			change: 12
		},
		users: {
			total: 24719,
			change: 8
		},
		trainers: {
			total: 892,
			change: 5
		},
		courses: {
			total: 3461,
			change: 3
		},
		batches: {
			total: 287,
			change: 18
		},
		approvals: {
			total: 14,
			change: -2,
			isNegative: true
		},
		students: {
			total: 9148,
			change: 9
		},
		assessments: {
			total: 6204,
			change: 21
		}
	},
	recentOrgs: [
		{
			id: "1",
			name: "IIT Bombay",
			domain: "iitb.ac.in",
			type: "University",
			status: "Active",
			abbr: "IIT",
			color: "#6C1D5F"
		},
		{
			id: "2",
			name: "Tata Consultancy",
			domain: "tcs.com",
			type: "Company",
			status: "Active",
			abbr: "TCS",
			color: "#533754"
		},
		{
			id: "3",
			name: "Delhi University",
			domain: "du.ac.in",
			type: "University",
			status: "Pending",
			abbr: "DU",
			color: "#4A1E47"
		},
		{
			id: "4",
			name: "Infosys Ltd.",
			domain: "infosys.com",
			type: "Company",
			status: "Inactive",
			abbr: "INF",
			color: "#5B1E53"
		}
	],
	approvals: [
		{
			id: "a1",
			title: "New Batch — IIT Bombay · ML Engineering",
			requester: "Priya Sharma",
			timeAgo: "2h ago",
			slaHours: 6
		},
		{
			id: "a2",
			title: "Role Override — Trainer → Admin · TCS",
			requester: "Rahul Mehta",
			timeAgo: "5h ago",
			slaHours: 4
		},
		{
			id: "a3",
			title: "Course Publish — AWS Fundamentals v3",
			requester: "Anita Patel",
			timeAgo: "8h ago",
			slaHours: 24,
			isUrgent: false
		}
	]
});
var mockUsers = loadMock("lms_mock_users", [
	{
		id: "u1",
		name: "Amit Kumar",
		email: "amit@iitb.ac.in",
		role: "Trainer",
		tenant: "IIT Bombay",
		status: "Active",
		lastLogin: "10m ago",
		avatarColor: "#6C1D5F"
	},
	{
		id: "u2",
		name: "Sarah Jones",
		email: "sarah@tcs.com",
		role: "Manager",
		tenant: "Tata Consultancy",
		status: "Active",
		lastLogin: "1h ago",
		avatarColor: "#533754"
	},
	{
		id: "u3",
		name: "Ravi Singh",
		email: "ravi@du.ac.in",
		role: "Student",
		tenant: "Delhi University",
		status: "Inactive",
		lastLogin: "2d ago",
		avatarColor: "#4A1E47"
	},
	{
		id: "u4",
		name: "Neha Gupta",
		email: "neha@tcs.com",
		role: "Student",
		tenant: "Tata Consultancy",
		status: "Active",
		lastLogin: "Just now",
		avatarColor: "#01AC9F"
	}
]);
var mockOrgs = loadMock("lms_mock_orgs", [
	...mockDashboardData.recentOrgs,
	{
		id: "5",
		name: "Stanford Univ.",
		domain: "stanford.edu",
		type: "University",
		status: "Active",
		abbr: "SU",
		color: "#84117C"
	},
	{
		id: "6",
		name: "Google Cloud Training",
		domain: "google.com",
		type: "Company",
		status: "Active",
		abbr: "GC",
		color: "#FF6200"
	}
]);
var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var api = {
	dashboard: { getOverview: async () => {
		await delay(400);
		return mockDashboardData;
	} },
	organizations: {
		list: async () => {
			await delay(400);
			return [...mockOrgs];
		},
		create: async (org) => {
			await delay(600);
			const newOrg = {
				id: Math.random().toString(),
				name: org.name || "New Org",
				domain: org.domain || "example.com",
				type: org.type || "Company",
				status: "Active",
				abbr: org.name ? org.name.substring(0, 2).toUpperCase() : "NO",
				color: "#6C1D5F",
				...org
			};
			mockOrgs.unshift(newOrg);
			saveMock("lms_mock_orgs", mockOrgs);
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
				name: user.name || "New User",
				email: user.email || "user@example.com",
				role: user.role || "Student",
				tenant: user.tenant || "Global",
				status: "Active",
				lastLogin: "Never",
				avatarColor: "#01AC9F",
				...user
			};
			mockUsers.unshift(newUser);
			saveMock("lms_mock_users", mockUsers);
			return newUser;
		}
	},
	approvals: { process: async (id, action) => {
		await delay(500);
		mockDashboardData.approvals = mockDashboardData.approvals.filter((a) => a.id !== id);
		mockDashboardData.kpi.approvals.total = Math.max(0, mockDashboardData.kpi.approvals.total - 1);
		saveMock("lms_mock_dashboard", mockDashboardData);
		return true;
	} }
};
//#endregion
//#region src/admin/store/useAppStore.js
var useAppStore = create((set, get) => ({
	isSidebarCollapsed: false,
	activeTenant: "Global · All Tenants",
	activeSidebarItem: "Dashboard",
	toasts: [],
	modals: {
		addOrg: false,
		quickCreate: false,
		addUser: false
	},
	dashboardData: null,
	organizations: [],
	users: [],
	approvals: [],
	isLoading: false,
	isLoadingOrgs: false,
	isLoadingUsers: false,
	toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
	setTenant: (tenant) => set({ activeTenant: tenant }),
	setActiveSidebarItem: (item) => set({ activeSidebarItem: item }),
	addToast: (message, type = "info") => {
		const id = Math.random().toString(36).substring(2, 9);
		set((state) => ({ toasts: [...state.toasts, {
			id,
			message,
			type
		}] }));
		setTimeout(() => {
			get().removeToast(id);
		}, 4e3);
	},
	removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
	openModal: (modal) => set((state) => ({ modals: {
		...state.modals,
		[modal]: true
	} })),
	closeModal: (modal) => set((state) => ({ modals: {
		...state.modals,
		[modal]: false
	} })),
	fetchDashboardData: async () => {
		set({ isLoading: true });
		try {
			const data = await api.dashboard.getOverview();
			set({
				dashboardData: data,
				isLoading: false,
				approvals: data.approvals
			});
		} catch (error) {
			console.error("Failed to load dashboard data", error);
			get().addToast("Failed to load dashboard data", "error");
			set({ isLoading: false });
		}
	},
	fetchOrganizations: async () => {
		set({ isLoadingOrgs: true });
		try {
			set({
				organizations: await api.organizations.list(),
				isLoadingOrgs: false
			});
		} catch (error) {
			get().addToast("Failed to load organizations", "error");
			set({ isLoadingOrgs: false });
		}
	},
	fetchUsers: async () => {
		set({ isLoadingUsers: true });
		try {
			set({
				users: await api.users.list(),
				isLoadingUsers: false
			});
		} catch (error) {
			get().addToast("Failed to load users", "error");
			set({ isLoadingUsers: false });
		}
	},
	processApproval: async (id, action) => {
		try {
			await api.approvals.process(id, action);
			set((state) => ({ approvals: state.approvals.filter((a) => a.id !== id) }));
			get().addToast(`Request ${action}d successfully.`, "success");
			set((state) => {
				if (state.dashboardData) return { dashboardData: {
					...state.dashboardData,
					kpi: {
						...state.dashboardData.kpi,
						approvals: {
							...state.dashboardData.kpi.approvals,
							total: Math.max(0, state.dashboardData.kpi.approvals.total - 1)
						}
					}
				} };
				return state;
			});
		} catch (error) {
			get().addToast(`Failed to ${action} request.`, "error");
		}
	},
	createOrganization: async (org) => {
		try {
			const newOrg = await api.organizations.create(org);
			set((state) => ({ organizations: [newOrg, ...state.organizations] }));
			get().addToast(`Organization ${newOrg.name} created.`, "success");
		} catch (error) {
			get().addToast("Failed to create organization.", "error");
		}
	},
	createUser: async (user) => {
		try {
			const newUser = await api.users.create(user);
			set((state) => ({ users: [newUser, ...state.users] }));
			get().addToast(`User ${newUser.name} created.`, "success");
		} catch (error) {
			get().addToast("Failed to create user.", "error");
		}
	}
}));
//#endregion
export { useAppStore as t };
