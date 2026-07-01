export const studentProfile = {
  name: "Vinit",
  avatar: "",
  role: "Student",
  university: "Xebia University",
  batch: "Batch 2026 - Frontend Engineering",
  email: "vinit@xebia.com",
  id: "S123456",
  phone: "+1-555-1234",
  enrollmentDate: "2026-01-10",
};

export const enrolledCourses = [
  {
    id: "c1",
    title: "Advanced React & Next.js",
    trainer: "Sarah Drasner",
    duration: "40 Hours",
    progress: 75,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    modulesCompleted: 15,
    totalModules: 20,
    lastWatched: "State Management with Zustand",
  },
  {
    id: "c2",
    title: "Enterprise Architecture Patterns",
    trainer: "Martin Fowler",
    duration: "35 Hours",
    progress: 30,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    modulesCompleted: 3,
    totalModules: 10,
    lastWatched: "Microservices Fundamentals",
  },
  {
    id: "c3",
    title: "UI/UX Design for Developers",
    trainer: "Gary Simon",
    duration: "25 Hours",
    progress: 100,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    modulesCompleted: 12,
    totalModules: 12,
    lastWatched: "Figma Prototyping",
  },
];

export const upcomingAssessments = [
  {
    id: "a1",
    name: "React Final Exam",
    course: "Advanced React & Next.js",
    date: "2026-06-25",
    time: "10:00 AM",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    id: "a2",
    name: "Architecture Quiz 1",
    course: "Enterprise Architecture Patterns",
    date: "2026-06-24",
    time: "02:00 PM",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    id: "a3",
    name: "Design Systems Assignment",
    course: "UI/UX Design for Developers",
    date: "2026-06-20",
    time: "11:59 PM",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
];

export const assessmentResults = [
  {
    id: "r1",
    assessmentName: "Design Systems Assignment",
    course: "UI/UX Design for Developers",
    marks: 95,
    maxMarks: 100,
    percentage: 95,
    grade: "A+",
    date: "2026-06-20",
  },
  {
    id: "r2",
    assessmentName: "React Midterm",
    course: "Advanced React & Next.js",
    marks: 82,
    maxMarks: 100,
    percentage: 82,
    grade: "B+",
    date: "2026-05-15",
  },
];

export const notifications = [
  {
    id: "n1",
    title: "New Course Assigned",
    message: "You have been enrolled in 'Enterprise Architecture Patterns'.",
    timestamp: "2 hours ago",
    read: false,
    type: "course",
  },
  {
    id: "n2",
    title: "Assessment Reminder",
    message: "Your 'React Final Exam' is due in 2 days.",
    timestamp: "5 hours ago",
    read: false,
    type: "assessment",
  },
  {
    id: "n3",
    title: "Trainer Replied",
    message: "Sarah Drasner replied to your comment in 'State Management'.",
    timestamp: "1 day ago",
    read: true,
    type: "comment",
  },
  {
    id: "n4",
    title: "Result Published",
    message: "Your 'Design Systems Assignment' results are out.",
    timestamp: "3 days ago",
    read: true,
    type: "result",
  },
];

export const batchInfo = {
  batchName: "Batch 2026 - Frontend Engineering",
  startDate: "2026-01-10",
  endDate: "2026-12-15",
  trainer: "Sarah Drasner",
  university: "Xebia University",
  schedule: "Mon - Fri, 09:00 AM - 05:00 PM",
  description: "An intensive frontend engineering program focusing on modern React, Next.js, and Enterprise Architecture.",
};

export const chartData = {
  courseProgress: [
    { name: "Jan", progress: 10 },
    { name: "Feb", progress: 25 },
    { name: "Mar", progress: 40 },
    { name: "Apr", progress: 60 },
    { name: "May", progress: 75 },
    { name: "Jun", progress: 90 },
  ],
  assessmentPerformance: [
    { subject: "React", score: 85 },
    { subject: "Architecture", score: 65 },
    { subject: "UI/UX", score: 95 },
    { subject: "JavaScript", score: 88 },
    { subject: "CSS", score: 92 },
  ],
};

export const commentsData = [
  {
    id: "c1",
    author: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?u=alex",
    text: "Can someone explain the difference between useMemo and useCallback again?",
    timestamp: "2 hours ago",
    replies: [
      {
        id: "r1",
        author: "Sarah Drasner",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
        text: "useMemo returns a memoized value, while useCallback returns a memoized callback function. Use useCallback when passing callbacks to optimized child components!",
        timestamp: "1 hour ago",
      }
    ]
  },
  {
    id: "c2",
    author: "Vinit",
    avatar: "https://i.pravatar.cc/150?u=vinit",
    text: "The state management module is super helpful, thanks!",
    timestamp: "1 day ago",
    replies: []
  }
];

export const categories = [
  { id: "cat1", name: "Frontend Development", description: "Learn React, Vue, HTML, CSS and more.", active: true },
  { id: "cat2", name: "Backend Development", description: "Master Node.js, Python, Java and Databases.", active: true },
  { id: "cat3", name: "UI/UX Design", description: "Design systems, Figma, and user research.", active: true },
  { id: "cat4", name: "Cloud Computing", description: "AWS, Azure, and Google Cloud Platform.", active: true },
  { id: "cat5", name: "Data Science", description: "Machine learning, AI, and data analytics.", active: false },
];
