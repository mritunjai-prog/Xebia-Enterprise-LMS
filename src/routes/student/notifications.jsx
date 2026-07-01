import { createFileRoute } from "@tanstack/react-router";
import { notifications } from "@/lib/dummy-data";
import { Bell, BookOpen, ClipboardCheck, MessageSquare, Award, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/student/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const getIconData = (type) => {
    switch (type) {
      case "course":
        return {
          icon: <BookOpen className="w-5 h-5" />,
          colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        };
      case "assessment":
        return {
          icon: <ClipboardCheck className="w-5 h-5" />,
          colorClass: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
        };
      case "comment":
        return {
          icon: <MessageSquare className="w-5 h-5" />,
          colorClass: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
        };
      case "result":
        return {
          icon: <Award className="w-5 h-5" />,
          colorClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        };
      default:
        return {
          icon: <Bell className="w-5 h-5" />,
          colorClass: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
        };
    }
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setLocalNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = localNotifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#6C1D5F]/10 dark:bg-purple-500/10 rounded-xl flex items-center justify-center text-[#6C1D5F] dark:text-purple-400 shrink-0">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Notifications</h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#6C1D5F] text-white text-xs font-bold shadow-sm">
                  {unreadCount} New
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
              Stay updated with your courses and assessments
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-[#15151f] hover:bg-gray-200 dark:hover:bg-[#2e2e3e] border border-transparent dark:border-[#2e2e3e] rounded-xl transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {localNotifications.length === 0 ? (
          <div className="py-12 text-center bg-white dark:bg-[#15151f] rounded-2xl border border-gray-200 dark:border-[#2e2e3e]">
            <Bell className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">You're all caught up!</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications right now.</p>
          </div>
        ) : (
          localNotifications.map((notification, idx) => {
            const iconData = getIconData(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => markAsRead(notification.id)}
                className={clsx(
                  "relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer group flex items-start gap-4 p-5",
                  notification.read 
                    ? "bg-white dark:bg-[#15151f] border-gray-200 dark:border-[#2e2e3e] hover:shadow-md hover:-translate-y-0.5" 
                    : "bg-[#6C1D5F]/[0.03] dark:bg-purple-500/[0.05] border-[#6C1D5F]/20 dark:border-purple-500/20 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                )}
              >
                {/* Unread Indicator Bar */}
                {!notification.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6C1D5F] dark:bg-purple-500" />
                )}

                {/* Icon */}
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", iconData.colorClass, !notification.read && "shadow-sm")}>
                  {iconData.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className={clsx("font-bold text-base truncate", notification.read ? "text-gray-800 dark:text-gray-200" : "text-gray-900 dark:text-white")}>
                      {notification.title}
                    </h3>
                    <span className="text-xs font-bold text-gray-400 whitespace-nowrap shrink-0 mt-0.5">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className={clsx("text-sm leading-relaxed", notification.read ? "text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-300")}>
                    {notification.message}
                  </p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
