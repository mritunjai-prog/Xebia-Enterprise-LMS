import {
  Mail,
  Phone,
  Building,
  CalendarDays,
  Hash,
  BookOpen,
} from "lucide-react";
import { studentProfile, enrolledCourses } from "@/lib/dummy-data";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const INFO_ITEMS = [
  {
    icon: Mail,
    label: "Email Address",
    getValue: () => studentProfile.email,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    icon: Hash,
    label: "Student ID",
    getValue: () => studentProfile.id,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    icon: Phone,
    label: "Phone Number",
    getValue: () => studentProfile.phone,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    icon: Building,
    label: "University / Organisation",
    getValue: () => studentProfile.university,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-500/10",
  },
  {
    icon: CalendarDays,
    label: "Batch",
    getValue: () => studentProfile.batch,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
  },
  {
    icon: CalendarDays,
    label: "Enrollment Date",
    getValue: () => studentProfile.enrollmentDate,
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-500/10",
  },
];

export function ProfileDetails() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-3xl overflow-hidden shadow-sm"
    >
      <div className="px-8 py-6 border-b border-gray-100 dark:border-[#2e2e3e] bg-gray-50/50 dark:bg-white/[0.02]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your account details and enrollment information.</p>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INFO_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-[#2e2e3e] bg-gray-50/30 dark:bg-white/[0.02] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-white dark:hover:bg-[#1a1a24]"
            >
              <div className={clsx("p-3 rounded-xl flex-shrink-0", item.bg, item.color)}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="font-bold text-sm text-gray-900 dark:text-white mt-0.5 truncate">{item.getValue()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function EnrolledCoursesList() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-3xl overflow-hidden shadow-sm"
    >
      <div className="px-8 py-6 border-b border-gray-100 dark:border-[#2e2e3e] bg-gray-50/50 dark:bg-white/[0.02]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Enrolled Courses</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Courses you are currently participating in.</p>
      </div>
      
      <div className="p-8 space-y-4">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-[#2e2e3e] bg-gray-50/30 dark:bg-white/[0.02] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-white dark:hover:bg-[#1a1a24]"
          >
            <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 dark:border-[#2e2e3e]">
              <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{course.title}</p>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
                {course.modulesCompleted}/{course.totalModules} modules · {course.duration}
              </p>
            </div>
            <span
              className={clsx(
                "px-3 py-1 rounded-full text-xs font-black tracking-wide border",
                course.progress === 100
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                  : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20"
              )}
            >
              {course.progress === 100 ? "Completed" : `${course.progress}%`}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
