import { Pencil, Lock, User, LogOut } from "lucide-react";
import { studentProfile } from "@/lib/dummy-data";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useRouter } from "@tanstack/react-router";

export function ProfileHeader() {
  const router = useRouter();
  
  const initials = studentProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleEditProfile = () => {
    toast.info("Edit Profile", {
      description: "Profile editing will be available after backend integration.",
    });
  };

  const handleChangePassword = () => {
    toast.info("Change Password", {
      description: "Password change will be available after backend integration.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("lms_token");
    router.navigate({ to: "/" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-3xl overflow-hidden shadow-sm relative group"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#6C1D5F]/20 via-purple-500/10 to-transparent dark:from-purple-900/30 dark:via-purple-800/10" />
      
      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-8 sm:mt-12">
        {/* Avatar */}
        <div className="flex-shrink-0 h-28 w-28 rounded-full bg-gradient-to-br from-[#6C1D5F] to-purple-800 p-1 shadow-xl">
          <div className="w-full h-full rounded-full bg-white dark:bg-[#15151f] flex items-center justify-center border-4 border-white dark:border-[#15151f]">
            <span className="text-4xl font-black text-[#6C1D5F] dark:text-purple-400">{initials}</span>
          </div>
        </div>

        {/* Name & Role */}
        <div className="flex-1 text-center sm:text-left mt-2 sm:mt-4">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{studentProfile.name}</h2>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{studentProfile.role}</p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
            <span className="px-3 py-1 rounded-full bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-purple-500/10 dark:text-purple-400 text-xs font-bold tracking-wide">
              {studentProfile.batch}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs font-bold tracking-wide border border-gray-200 dark:border-gray-700">
              {studentProfile.university}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-4">
          <button
            onClick={handleEditProfile}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#6C1D5F] hover:bg-purple-800 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </button>
          <button
            onClick={handleChangePassword}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-[#1a1a24] dark:hover:bg-[#2e2e3e] text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-all border border-transparent dark:border-[#2e2e3e]"
          >
            <Lock className="h-4 w-4" />
            Security Settings
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold transition-all"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      </div>
    </motion.div>
  );
}
