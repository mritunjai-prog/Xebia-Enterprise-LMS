import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Search,
  Menu,
  Settings,
  Sun,
  Moon,
  X,
  BookOpen,
  Tag as TagIcon,
  CheckCircle,
  Code,
  MessageSquare,
  User,
  Layers,
  ClipboardCheck,
} from "lucide-react";
import {
  studentProfile,
  notifications,
  batchInfo,
  upcomingAssessments,
} from "@/features/student/mocks/dummy-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useRouter } from "@tanstack/react-router";
import { useDarkMode } from "@/features/student/hooks/use-dark-mode";
import { useAppStore } from "@/admin/store/useAppStore";
import { CourseService, CategoryService } from "@/services/api";

export function StudentNavbar({ isMobileOpen, setIsMobileOpen }) {
  const { toggleSidebar, breadcrumbs, addToast } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const router = useRouter();

  const [isDark, setIsDark] = useState(
    () => typeof window !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("lms_theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("lms_theme", "dark");
      setIsDark(true);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("lms_theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // Search Logic
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    features: [],
    courses: [],
    batches: [],
    assessments: [],
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const STUDENT_FEATURES = [
    { id: "feat-dashboard", title: "Dashboard", slug: "" },
    { id: "feat-mycourses", title: "My Courses", slug: "courses" },
    { id: "feat-mybatches", title: "My Batches", slug: "batches" },
    { id: "feat-assessments", title: "Assessments", slug: "assessments" },
    { id: "feat-results", title: "Results", slug: "results" },
    { id: "feat-notifications", title: "Notifications", slug: "notifications" },
    { id: "feat-feedback", title: "Feedback", slug: "feedback" },
  ];

  const MOCK_BATCHES = [{ id: "b1", name: batchInfo.batchName, type: batchInfo.trainer }];

  const MOCK_ASSESSMENTS = upcomingAssessments.map((a) => ({
    id: a.id,
    title: a.name,
    status: a.status,
  }));

  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      CourseService.getCourses().then((courses) => {
        const lower = searchQuery.toLowerCase();
        setSearchResults({
          features: STUDENT_FEATURES.filter((f) => f.title.toLowerCase().includes(lower)).slice(
            0,
            3,
          ),
          courses: (courses || [])
            .filter((c) => (c.title || "").toLowerCase().includes(lower))
            .slice(0, 3),
          batches: MOCK_BATCHES.filter((b) => b.name.toLowerCase().includes(lower)).slice(0, 3),
          assessments: MOCK_ASSESSMENTS.filter((a) => a.title.toLowerCase().includes(lower)).slice(
            0,
            3,
          ),
        });
      });
    } else {
      setSearchResults({ features: [], courses: [], batches: [], assessments: [] });
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (type, slug) => {
    setIsSearchOpen(false);
    setSearchQuery("");

    if (type === "features") {
      router.navigate({ to: `/student/${slug}` });
      return;
    }
    if (type === "batches" || type === "assessments") {
      addToast(`Navigating to ${type} is not fully implemented yet.`, "info");
      router.navigate({ to: `/student/${type}` });
      return;
    }

    router.navigate({ to: `/student/course/${slug}` });
  };

  const handleSearchBtnClick = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
    }
    if (searchQuery.trim().length >= 1) {
      const allResults = [
        ...searchResults.features.map((i) => ({ type: "features", slug: i.slug })),
        ...searchResults.courses.map((i) => ({ type: "courses", slug: i.id })),
        ...searchResults.batches.map((i) => ({ type: "batches", slug: i.id })),
        ...searchResults.assessments.map((i) => ({ type: "assessments", slug: i.id })),
      ];
      if (allResults.length > 0) {
        handleResultClick(allResults[0].type, allResults[0].slug);
      }
    }
  };

  // Settings Menu
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Profile State
  const [tempProfile, setTempProfile] = useState(null);
  const fileInputRef = useRef(null);

  // Initialize temp profile when modal opens
  useEffect(() => {
    if (isSettingsOpen) {
      setTempProfile({
        name: studentProfile.name,
        email: "student@xebia.com",
        university: "Xebia University",
        image: null,
      });
    }
  }, [isSettingsOpen]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({ ...tempProfile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveSettings = () => {
    // In a real app, you would call an API to update the profile here.
    addToast("Settings saved successfully.", "success");
    setIsSettingsOpen(false);
  };

  const initials = tempProfile?.name
    ? tempProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "S";

  return (
    <>
      <header className="header relative z-40">
        <div className="header-left">
          <button onClick={toggleSidebar} className="header-btn" aria-label="Toggle Sidebar">
            <Menu className="h-5 w-5" />
          </button>

          <div className="breadcrumb">
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={crumb.label}>
                {index > 0 && <span className="breadcrumb-sep">›</span>}
                <Link
                  to={crumb.href}
                  className={
                    index === breadcrumbs.length - 1
                      ? "breadcrumb-cur hover:underline"
                      : "hover:underline"
                  }
                  style={{ textDecoration: "none" }}
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Center: Search */}
        <div className="header-search" ref={searchRef}>
          <input
            type="text"
            placeholder="Search courses, assessments, results..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
          />
          <div className="search-controls">
            {searchQuery.length > 0 && (
              <button
                className="search-clear"
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {searchQuery.length > 0 && <div className="search-divider"></div>}
            <button className="search-btn" onClick={handleSearchBtnClick}>
              <Search className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.trim().length >= 1 && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl shadow-xl overflow-hidden z-50 py-2 custom-scrollbar"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {searchResults.features.length === 0 &&
              searchResults.courses.length === 0 &&
              searchResults.batches.length === 0 &&
              searchResults.assessments.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No results found for "{searchQuery}"
                </div>
              ) : (
                <>
                  {searchResults.features.length > 0 && (
                    <div className="mb-2">
                      <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Features & Pages
                      </div>
                      {searchResults.features.map((feat) => (
                        <div
                          key={feat.id}
                          onClick={() => handleResultClick("features", feat.slug)}
                          className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a24] cursor-pointer flex items-center gap-3 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                            <Settings className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {feat.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.courses.length > 0 && (
                    <div className="mb-2">
                      <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Courses
                      </div>
                      {searchResults.courses.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => handleResultClick("courses", course.id)}
                          className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a24] cursor-pointer flex items-center gap-3 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#84117C]/20 dark:text-[#84117C] flex items-center justify-center shrink-0">
                            <BookOpen className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {course.title}
                            </span>
                            <span className="text-xs text-gray-500 truncate">{course.level}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.batches.length > 0 && (
                    <div className="mb-2">
                      <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        My Batches
                      </div>
                      {searchResults.batches.map((batch) => (
                        <div
                          key={batch.id}
                          onClick={() => handleResultClick("batches", batch.id)}
                          className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a24] cursor-pointer flex items-center gap-3 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                            <Layers className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {batch.name}
                            </span>
                            <span className="text-xs text-gray-500 truncate">{batch.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.assessments.length > 0 && (
                    <div className="mb-2">
                      <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Assessments
                      </div>
                      {searchResults.assessments.map((assessment) => (
                        <div
                          key={assessment.id}
                          onClick={() => handleResultClick("assessments", assessment.id)}
                          className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a24] cursor-pointer flex items-center gap-3 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <ClipboardCheck className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {assessment.title}
                            </span>
                            <span className="text-xs text-gray-500 truncate">
                              {assessment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="header-actions">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-[34px] h-[34px] flex items-center justify-center rounded-lg bg-gray-100 dark:bg-[#1a1a24] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#252535] hover:text-[#6C1D5F] dark:hover:text-[#D3CCEC] transition-colors border border-gray-200 dark:border-[#2e2e3e] relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] shadow-xl rounded-xl p-0 overflow-hidden"
            >
              <div className="px-4 py-3 font-bold text-sm text-gray-900 dark:text-white border-b border-gray-100 dark:border-[#2e2e3e]">
                Notifications
              </div>
              {notifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start gap-1 px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 dark:border-[#2e2e3e] last:border-0 focus:outline-none
                    ${
                      !notification.read
                        ? "bg-[#6C1D5F]/10 dark:bg-[#6C1D5F]/20 hover:bg-[#6C1D5F]/15 dark:hover:bg-[#6C1D5F]/30"
                        : "bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-[#1a1a24]"
                    }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span
                      className={`font-semibold text-sm ${!notification.read ? "text-[#6C1D5F] dark:text-[#D3CCEC]" : "text-gray-800 dark:text-gray-200"}`}
                    >
                      {notification.title}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {notification.message}
                  </p>
                </DropdownMenuItem>
              ))}
              <div className="px-4 py-2.5 border-t border-gray-100 dark:border-[#2e2e3e]">
                <Link
                  to="/student/notifications"
                  className="block w-full text-center text-sm font-semibold text-[#6C1D5F] dark:text-[#D3CCEC] hover:text-[#84117C] dark:hover:text-white transition-colors"
                >
                  View all notifications
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={toggleDark}
            className="w-[34px] h-[34px] flex items-center justify-center rounded-lg bg-gray-100 dark:bg-[#1a1a24] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#252535] hover:text-[#6C1D5F] dark:hover:text-[#D3CCEC] transition-colors border border-gray-200 dark:border-[#2e2e3e]"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-[16px] h-[16px]" />
            ) : (
              <Moon className="w-[16px] h-[16px]" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-[34px] h-[34px] flex items-center justify-center rounded-lg bg-gray-100 dark:bg-[#1a1a24] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#252535] hover:text-[#6C1D5F] dark:hover:text-[#D3CCEC] transition-colors border border-gray-200 dark:border-[#2e2e3e]"
              title="Settings"
            >
              <Settings className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Account Settings Modal */}
      {isSettingsOpen && tempProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#15151f] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-[#2e2e3e]">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2e2e3e] flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Account Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/png, image/jpeg"
                />
                <div
                  className="w-24 h-24 rounded-full bg-[#6C1D5F] flex items-center justify-center text-4xl font-bold text-white cursor-pointer hover:bg-[#84117C] transition-colors relative group overflow-hidden"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {tempProfile.image ? (
                    <img
                      src={tempProfile.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-semibold text-center leading-tight px-2">
                      Change Image
                    </span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Max size 2MB (JPG, PNG)
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    University
                  </label>
                  <input
                    type="text"
                    value={tempProfile.university}
                    onChange={(e) => setTempProfile({ ...tempProfile, university: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 dark:border-[#2e2e3e] flex items-center justify-end gap-3 bg-white dark:bg-[#15151f]">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSettings}
                className="px-5 py-2.5 text-sm font-bold bg-[#6C1D5F] hover:bg-[#84117C] text-white rounded-xl shadow-lg transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
