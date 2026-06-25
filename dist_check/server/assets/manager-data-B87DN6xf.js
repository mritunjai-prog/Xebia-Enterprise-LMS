import { jsx, jsxs } from "react/jsx-runtime";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//#region src/components/manager/shared/page-header.js
function PageHeader({ title, description, children }) {
	return jsxs("div", {
		className: "mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
		children: [jsxs("div", {
			className: "space-y-1.5",
			children: [jsx("h1", {
				className: "text-[28px] font-extrabold tracking-tight text-[#000000] lg:text-[32px]",
				children: title
			}), description && jsx("p", {
				className: "text-[15px] font-medium text-[#5A5A5A]",
				children: description
			})]
		}), children && jsx("div", {
			className: "flex items-center gap-3",
			children
		})]
	});
}
//#endregion
//#region src/lib/mock-data/manager-data.js
var delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
var universities = [
	{
		id: "u1",
		name: "Delhi Technical University",
		location: "New Delhi",
		students: 2450,
		courses: 38,
		status: "active",
		logo: "DTU"
	},
	{
		id: "u2",
		name: "IIT Bombay",
		location: "Mumbai",
		students: 1820,
		courses: 45,
		status: "active",
		logo: "IITB"
	},
	{
		id: "u3",
		name: "BITS Pilani",
		location: "Pilani",
		students: 1340,
		courses: 32,
		status: "active",
		logo: "BITS"
	},
	{
		id: "u4",
		name: "NIT Warangal",
		location: "Warangal",
		students: 980,
		courses: 24,
		status: "active",
		logo: "NITW"
	},
	{
		id: "u5",
		name: "Amity University",
		location: "Noida",
		students: 3200,
		courses: 56,
		status: "pending",
		logo: "AU"
	}
];
var trainers = [
	{
		id: "t1",
		name: "Dr. Priya Sharma",
		email: "priya.s@xebia.com",
		specialization: "Cloud Architecture",
		rating: 4.8,
		courses: 6,
		students: 420,
		status: "active",
		avatar: "PS"
	},
	{
		id: "t2",
		name: "Rahul Verma",
		email: "rahul.v@xebia.com",
		specialization: "Full Stack Development",
		rating: 4.6,
		courses: 8,
		students: 580,
		status: "active",
		avatar: "RV"
	},
	{
		id: "t3",
		name: "Anita Desai",
		email: "anita.d@xebia.com",
		specialization: "Data Science",
		rating: 4.9,
		courses: 5,
		students: 350,
		status: "active",
		avatar: "AD"
	},
	{
		id: "t4",
		name: "Vikram Singh",
		email: "vikram.s@xebia.com",
		specialization: "DevOps & CI/CD",
		rating: 4.5,
		courses: 4,
		students: 290,
		status: "active",
		avatar: "VS"
	},
	{
		id: "t5",
		name: "Meera Patel",
		email: "meera.p@xebia.com",
		specialization: "AI & Machine Learning",
		rating: 4.7,
		courses: 7,
		students: 510,
		status: "active",
		avatar: "MP"
	},
	{
		id: "t6",
		name: "Arjun Kapoor",
		email: "arjun.k@xebia.com",
		specialization: "Cybersecurity",
		rating: 4.4,
		courses: 3,
		students: 180,
		status: "inactive",
		avatar: "AK"
	},
	{
		id: "t7",
		name: "Kavitha Nair",
		email: "kavitha.n@xebia.com",
		specialization: "Agile & Scrum",
		rating: 4.8,
		courses: 9,
		students: 720,
		status: "active",
		avatar: "KN"
	},
	{
		id: "t8",
		name: "Sanjay Gupta",
		email: "sanjay.g@xebia.com",
		specialization: "Microservices",
		rating: 4.3,
		courses: 4,
		students: 260,
		status: "active",
		avatar: "SG"
	},
	{
		id: "t9",
		name: "Deepika Rao",
		email: "deepika.r@xebia.com",
		specialization: "UI/UX Design",
		rating: 4.6,
		courses: 5,
		students: 340,
		status: "pending",
		avatar: "DR"
	},
	{
		id: "t10",
		name: "Amit Joshi",
		email: "amit.j@xebia.com",
		specialization: "Blockchain",
		rating: 4.2,
		courses: 2,
		students: 120,
		status: "active",
		avatar: "AJ"
	}
];
var students = [
	{
		id: "s1",
		name: "Aarav Mehta",
		email: "aarav.m@dtu.ac.in",
		university: "Delhi Technical University",
		progress: 87,
		coursesEnrolled: 4,
		status: "active",
		avatar: "AM"
	},
	{
		id: "s2",
		name: "Ishita Roy",
		email: "ishita.r@iitb.ac.in",
		university: "IIT Bombay",
		progress: 94,
		coursesEnrolled: 3,
		status: "active",
		avatar: "IR"
	},
	{
		id: "s3",
		name: "Rohan Das",
		email: "rohan.d@bits.ac.in",
		university: "BITS Pilani",
		progress: 72,
		coursesEnrolled: 5,
		status: "active",
		avatar: "RD"
	},
	{
		id: "s4",
		name: "Neha Agarwal",
		email: "neha.a@nitw.ac.in",
		university: "NIT Warangal",
		progress: 63,
		coursesEnrolled: 3,
		status: "active",
		avatar: "NA"
	},
	{
		id: "s5",
		name: "Karan Patel",
		email: "karan.p@amity.edu",
		university: "Amity University",
		progress: 45,
		coursesEnrolled: 6,
		status: "at-risk",
		avatar: "KP"
	},
	{
		id: "s6",
		name: "Simran Kaur",
		email: "simran.k@dtu.ac.in",
		university: "Delhi Technical University",
		progress: 91,
		coursesEnrolled: 4,
		status: "active",
		avatar: "SK"
	},
	{
		id: "s7",
		name: "Aryan Mishra",
		email: "aryan.m@iitb.ac.in",
		university: "IIT Bombay",
		progress: 56,
		coursesEnrolled: 2,
		status: "at-risk",
		avatar: "AM"
	},
	{
		id: "s8",
		name: "Prachi Jain",
		email: "prachi.j@bits.ac.in",
		university: "BITS Pilani",
		progress: 88,
		coursesEnrolled: 5,
		status: "active",
		avatar: "PJ"
	},
	{
		id: "s9",
		name: "Dev Sharma",
		email: "dev.s@nitw.ac.in",
		university: "NIT Warangal",
		progress: 79,
		coursesEnrolled: 3,
		status: "active",
		avatar: "DS"
	},
	{
		id: "s10",
		name: "Ananya Gupta",
		email: "ananya.g@amity.edu",
		university: "Amity University",
		progress: 95,
		coursesEnrolled: 7,
		status: "active",
		avatar: "AG"
	},
	{
		id: "s11",
		name: "Vivek Reddy",
		email: "vivek.r@dtu.ac.in",
		university: "Delhi Technical University",
		progress: 68,
		coursesEnrolled: 3,
		status: "active",
		avatar: "VR"
	},
	{
		id: "s12",
		name: "Riya Saxena",
		email: "riya.s@iitb.ac.in",
		university: "IIT Bombay",
		progress: 82,
		coursesEnrolled: 4,
		status: "active",
		avatar: "RS"
	},
	{
		id: "s13",
		name: "Harsh Pandey",
		email: "harsh.p@bits.ac.in",
		university: "BITS Pilani",
		progress: 38,
		coursesEnrolled: 2,
		status: "inactive",
		avatar: "HP"
	},
	{
		id: "s14",
		name: "Pooja Nair",
		email: "pooja.n@nitw.ac.in",
		university: "NIT Warangal",
		progress: 91,
		coursesEnrolled: 5,
		status: "active",
		avatar: "PN"
	},
	{
		id: "s15",
		name: "Manish Kumar",
		email: "manish.k@amity.edu",
		university: "Amity University",
		progress: 74,
		coursesEnrolled: 4,
		status: "active",
		avatar: "MK"
	}
];
var approvals = [
	{
		id: "a1",
		type: "Course Creation",
		requester: "Rahul Verma",
		requesterAvatar: "RV",
		description: "New course: Advanced TypeScript Patterns",
		date: "2026-06-22T10:30:00",
		status: "pending",
		priority: "high"
	},
	{
		id: "a2",
		type: "University Onboarding",
		requester: "Admin Team",
		requesterAvatar: "AT",
		description: "Amity University registration approval",
		date: "2026-06-21T14:15:00",
		status: "pending",
		priority: "high"
	},
	{
		id: "a3",
		type: "Trainer Verification",
		requester: "Deepika Rao",
		requesterAvatar: "DR",
		description: "Trainer profile verification & credentials",
		date: "2026-06-21T09:00:00",
		status: "pending",
		priority: "medium"
	},
	{
		id: "a4",
		type: "Content Update",
		requester: "Anita Desai",
		requesterAvatar: "AD",
		description: "Major update to Python Data Science curriculum",
		date: "2026-06-20T16:45:00",
		status: "pending",
		priority: "low"
	},
	{
		id: "a5",
		type: "Course Creation",
		requester: "Meera Patel",
		requesterAvatar: "MP",
		description: "New course: Generative AI with LangChain",
		date: "2026-06-20T11:20:00",
		status: "approved",
		priority: "high"
	},
	{
		id: "a6",
		type: "Bulk Enrollment",
		requester: "DTU Admin",
		requesterAvatar: "DA",
		description: "Bulk enrollment of 200 students for Cloud track",
		date: "2026-06-19T13:30:00",
		status: "approved",
		priority: "medium"
	},
	{
		id: "a7",
		type: "Content Update",
		requester: "Vikram Singh",
		requesterAvatar: "VS",
		description: "Kubernetes course v3.0 content revision",
		date: "2026-06-18T10:00:00",
		status: "rejected",
		priority: "low"
	},
	{
		id: "a8",
		type: "Trainer Verification",
		requester: "Sanjay Gupta",
		requesterAvatar: "SG",
		description: "Updated certifications and bio",
		date: "2026-06-17T15:00:00",
		status: "approved",
		priority: "medium"
	}
];
var feedback = [
	{
		id: "f1",
		student: "Aarav Mehta",
		studentAvatar: "AM",
		course: "Cloud Architecture Fundamentals",
		rating: 5,
		comment: "Excellent course! The hands-on labs were incredibly useful. Dr. Sharma explains complex concepts beautifully.",
		date: "2026-06-22T18:00:00",
		sentiment: "positive"
	},
	{
		id: "f2",
		student: "Ishita Roy",
		studentAvatar: "IR",
		course: "Machine Learning with TensorFlow",
		rating: 4,
		comment: "Very thorough content. Would appreciate more real-world project examples in future updates.",
		date: "2026-06-22T14:30:00",
		sentiment: "positive"
	},
	{
		id: "f3",
		student: "Rohan Das",
		studentAvatar: "RD",
		course: "React & Next.js Mastery",
		rating: 5,
		comment: "This course transformed my frontend skills. The project-based approach is fantastic.",
		date: "2026-06-21T20:15:00",
		sentiment: "positive"
	},
	{
		id: "f4",
		student: "Karan Patel",
		studentAvatar: "KP",
		course: "Blockchain Fundamentals",
		rating: 3,
		comment: "Content is good but feels outdated. Needs to cover more recent developments in Web3.",
		date: "2026-06-21T11:45:00",
		sentiment: "neutral"
	},
	{
		id: "f5",
		student: "Simran Kaur",
		studentAvatar: "SK",
		course: "Agile Project Management",
		rating: 5,
		comment: "Kavitha is an amazing instructor. The real-world case studies made everything click.",
		date: "2026-06-20T16:00:00",
		sentiment: "positive"
	},
	{
		id: "f6",
		student: "Aryan Mishra",
		studentAvatar: "AM",
		course: "Python for Data Science",
		rating: 4,
		comment: "Great course overall. The pace was a bit fast for the statistics sections.",
		date: "2026-06-20T09:30:00",
		sentiment: "positive"
	},
	{
		id: "f7",
		student: "Prachi Jain",
		studentAvatar: "PJ",
		course: "Design Systems & Figma",
		rating: 5,
		comment: "Perfect blend of theory and practice. My portfolio has improved tremendously.",
		date: "2026-06-19T15:20:00",
		sentiment: "positive"
	},
	{
		id: "f8",
		student: "Dev Sharma",
		studentAvatar: "DS",
		course: "Kubernetes & Docker Deep Dive",
		rating: 2,
		comment: "The lab environment was unstable and I lost progress multiple times. Needs infrastructure fixes.",
		date: "2026-06-19T10:00:00",
		sentiment: "negative"
	},
	{
		id: "f9",
		student: "Ananya Gupta",
		studentAvatar: "AG",
		course: "AWS Solutions Architect",
		rating: 5,
		comment: "Hands down the best cloud course. Passed my AWS SA certification on the first attempt!",
		date: "2026-06-18T19:00:00",
		sentiment: "positive"
	},
	{
		id: "f10",
		student: "Vivek Reddy",
		studentAvatar: "VR",
		course: "CI/CD Pipeline Mastery",
		rating: 4,
		comment: "Very practical approach. The GitHub Actions integration was particularly helpful.",
		date: "2026-06-18T12:30:00",
		sentiment: "positive"
	},
	{
		id: "f11",
		student: "Riya Saxena",
		studentAvatar: "RS",
		course: "Deep Learning Specialization",
		rating: 3,
		comment: "Good content but prerequisites should be more clearly stated. Struggled in early modules.",
		date: "2026-06-17T14:45:00",
		sentiment: "neutral"
	},
	{
		id: "f12",
		student: "Manish Kumar",
		studentAvatar: "MK",
		course: "Microservices with Spring Boot",
		rating: 4,
		comment: "Solid course. Would love a follow-up on event-driven architecture with Kafka.",
		date: "2026-06-17T08:15:00",
		sentiment: "positive"
	}
];
var activities = [
	{
		id: "act1",
		type: "enrollment",
		message: "Aarav Mehta enrolled in AWS Solutions Architect",
		time: "2 minutes ago",
		icon: "user-plus"
	},
	{
		id: "act2",
		type: "completion",
		message: "Ishita Roy completed Machine Learning with TensorFlow",
		time: "15 minutes ago",
		icon: "check-circle"
	},
	{
		id: "act3",
		type: "approval",
		message: "Course 'Generative AI with LangChain' was approved",
		time: "1 hour ago",
		icon: "shield-check"
	},
	{
		id: "act4",
		type: "feedback",
		message: "New 5-star review on Cloud Architecture Fundamentals",
		time: "2 hours ago",
		icon: "star"
	},
	{
		id: "act5",
		type: "enrollment",
		message: "45 students from DTU enrolled in Cloud track",
		time: "3 hours ago",
		icon: "user-plus"
	},
	{
		id: "act6",
		type: "completion",
		message: "Simran Kaur completed Agile Project Management",
		time: "4 hours ago",
		icon: "check-circle"
	},
	{
		id: "act7",
		type: "alert",
		message: "Karan Patel flagged as at-risk — progress below 50%",
		time: "5 hours ago",
		icon: "alert-triangle"
	},
	{
		id: "act8",
		type: "approval",
		message: "Bulk enrollment request from DTU approved",
		time: "6 hours ago",
		icon: "shield-check"
	},
	{
		id: "act9",
		type: "feedback",
		message: "New feedback on Kubernetes course — infrastructure issue reported",
		time: "8 hours ago",
		icon: "message-square"
	},
	{
		id: "act10",
		type: "enrollment",
		message: "Prachi Jain enrolled in Advanced Scrum Master",
		time: "10 hours ago",
		icon: "user-plus"
	},
	{
		id: "act11",
		type: "completion",
		message: "Ananya Gupta completed 7th course — top performer!",
		time: "12 hours ago",
		icon: "trophy"
	},
	{
		id: "act12",
		type: "approval",
		message: "Trainer Sanjay Gupta's profile update approved",
		time: "1 day ago",
		icon: "shield-check"
	}
];
var enrollmentData = [
	{
		month: "Jul",
		enrollments: 320,
		completions: 180
	},
	{
		month: "Aug",
		enrollments: 450,
		completions: 240
	},
	{
		month: "Sep",
		enrollments: 680,
		completions: 380
	},
	{
		month: "Oct",
		enrollments: 520,
		completions: 310
	},
	{
		month: "Nov",
		enrollments: 740,
		completions: 420
	},
	{
		month: "Dec",
		enrollments: 610,
		completions: 350
	},
	{
		month: "Jan",
		enrollments: 890,
		completions: 520
	},
	{
		month: "Feb",
		enrollments: 780,
		completions: 480
	},
	{
		month: "Mar",
		enrollments: 960,
		completions: 580
	},
	{
		month: "Apr",
		enrollments: 1120,
		completions: 690
	},
	{
		month: "May",
		enrollments: 1040,
		completions: 720
	},
	{
		month: "Jun",
		enrollments: 1250,
		completions: 810
	}
];
var completionByCategory = [
	{
		category: "Cloud",
		completed: 340,
		total: 420,
		color: "#6C1D5F"
	},
	{
		category: "Frontend",
		completed: 248,
		total: 380,
		color: "#8A177D"
	},
	{
		category: "Data Science",
		completed: 287,
		total: 350,
		color: "#4A1E47"
	},
	{
		category: "DevOps",
		completed: 218,
		total: 290,
		color: "#00A99D"
	},
	{
		category: "AI/ML",
		completed: 296,
		total: 510,
		color: "#5B1E53"
	},
	{
		category: "Management",
		completed: 662,
		total: 720,
		color: "#FF6A00"
	},
	{
		category: "Design",
		completed: 258,
		total: 340,
		color: "#793B74"
	},
	{
		category: "Security",
		completed: 153,
		total: 180,
		color: "#533754"
	}
];
var performanceData = [
	{
		course: "Agile PM",
		avgScore: 92,
		students: 720
	},
	{
		course: "Cloud Arch.",
		avgScore: 88,
		students: 420
	},
	{
		course: "Data Science",
		avgScore: 86,
		students: 350
	},
	{
		course: "AWS SA",
		avgScore: 85,
		students: 395
	},
	{
		course: "CI/CD",
		avgScore: 84,
		students: 220
	},
	{
		course: "Security",
		avgScore: 83,
		students: 180
	},
	{
		course: "React/Next",
		avgScore: 81,
		students: 380
	},
	{
		course: "Scrum Adv.",
		avgScore: 80,
		students: 450
	}
];
var dashboardStats = {
	totalStudents: {
		value: 9790,
		trend: 12.5,
		label: "Total Students"
	},
	activeCourses: {
		value: 15,
		trend: 8.3,
		label: "Active Courses"
	},
	completionRate: {
		value: 73.2,
		trend: 4.1,
		label: "Completion Rate",
		suffix: "%"
	},
	pendingApprovals: {
		value: 4,
		trend: -15,
		label: "Pending Approvals"
	}
};
function useManagerStats() {
	return useQuery({
		queryKey: ["manager", "stats"],
		queryFn: async () => {
			await delay();
			return dashboardStats;
		}
	});
}
function useUniversities() {
	return useQuery({
		queryKey: ["manager", "universities"],
		queryFn: async () => {
			await delay();
			return universities;
		}
	});
}
function useTrainers() {
	return useQuery({
		queryKey: ["manager", "trainers"],
		queryFn: async () => {
			await delay();
			return trainers;
		}
	});
}
function useStudents() {
	return useQuery({
		queryKey: ["manager", "students"],
		queryFn: async () => {
			await delay();
			return students;
		}
	});
}
function useApprovals() {
	return useQuery({
		queryKey: ["manager", "approvals"],
		queryFn: async () => {
			await delay();
			return [...approvals];
		}
	});
}
function useUpdateApproval() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, status }) => {
			await delay(300);
			approvals = approvals.map((a) => a.id === id ? {
				...a,
				status
			} : a);
			return approvals.find((a) => a.id === id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["manager", "approvals"] });
			queryClient.invalidateQueries({ queryKey: ["manager", "stats"] });
		}
	});
}
function useFeedback() {
	return useQuery({
		queryKey: ["manager", "feedback"],
		queryFn: async () => {
			await delay();
			return feedback;
		}
	});
}
function useRecentActivity() {
	return useQuery({
		queryKey: ["manager", "activity"],
		queryFn: async () => {
			await delay(200);
			return activities;
		}
	});
}
function useEnrollmentData() {
	return useQuery({
		queryKey: [
			"manager",
			"charts",
			"enrollment"
		],
		queryFn: async () => {
			await delay(300);
			return enrollmentData;
		}
	});
}
function useCompletionData() {
	return useQuery({
		queryKey: [
			"manager",
			"charts",
			"completion"
		],
		queryFn: async () => {
			await delay(300);
			return completionByCategory;
		}
	});
}
function usePerformanceData() {
	return useQuery({
		queryKey: [
			"manager",
			"charts",
			"performance"
		],
		queryFn: async () => {
			await delay(300);
			return performanceData;
		}
	});
}
//#endregion
export { useManagerStats as a, useStudents as c, useUpdateApproval as d, PageHeader as f, useFeedback as i, useTrainers as l, useCompletionData as n, usePerformanceData as o, useEnrollmentData as r, useRecentActivity as s, useApprovals as t, useUniversities as u };
