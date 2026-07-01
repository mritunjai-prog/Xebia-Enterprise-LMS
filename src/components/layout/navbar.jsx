import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Bell, Menu, BookOpen, Tag as TagIcon, Search as IconSearch } from 'lucide-react';
import { useRouter, useLocation } from '@tanstack/react-router';
import { clsx } from 'clsx';
import { studentProfile, notifications, enrolledCourses as mockCourses, categories as mockCategories } from "@/lib/dummy-data";

export function StudentNavbar({ toggleSidebar, isSidebarOpen }) {
  const router = useRouter();
  const location = useLocation();
  
  // Try to determine current page name for breadcrumb
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPage = pathSegments.length > 1 
    ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)
    : "Dashboard";

  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('lms_theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('lms_theme', 'dark');
      setIsDark(true);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('lms_theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  // Search Logic (Exact parity with Admin, using dummy data)
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ courses: [], categories: [] });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const lower = searchQuery.toLowerCase();
      setSearchResults({
        courses: (mockCourses || []).filter(c => (c.title || '').toLowerCase().includes(lower)).slice(0, 5),
        categories: (mockCategories || []).filter(c => (c.name || '').toLowerCase().includes(lower)).slice(0, 5)
      });
    } else {
      setSearchResults({ courses: [], categories: [] });
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (type, slug) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    router.navigate({ to: `/${type}/${slug}` });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="header relative z-40 px-6 sm:px-8 py-4 bg-white/80 dark:bg-[#15151f]/80 backdrop-blur-md border-b border-gray-100 dark:border-[#2e2e3e] flex items-center justify-between">
      <div className="flex items-center gap-4 shrink-0">
        <button 
          onClick={toggleSidebar} 
          className="p-2 -ml-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="breadcrumb text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:flex items-center gap-2">
          <span>Learning</span>
          <span>›</span>
          <span className="font-bold text-[#6C1D5F] dark:text-purple-400">{currentPage}</span>
        </div>
      </div>
      
      <div className="flex-1 max-w-2xl px-4 relative hidden md:block" ref={searchRef}>
        <div className="w-full relative">
          <IconSearch className="text-[#5A5A5A] absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search courses and categories…" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6C1D5F]/20 focus:border-[#6C1D5F] transition-all"
          />
        </div>

        {/* Search Results Dropdown */}
        {isSearchOpen && searchQuery.trim().length >= 2 && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl shadow-xl overflow-hidden z-50 py-2">
            {searchResults.courses.length === 0 && searchResults.categories.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">No results found for "{searchQuery}"</div>
            ) : (
              <>
                {searchResults.courses.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Courses</div>
                    {searchResults.courses.map(course => (
                      <div 
                        key={course.id} 
                        className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors"
                        onClick={() => handleResultClick('student/course', course.slug || course.id)}
                      >
                        <div className="w-8 h-8 rounded bg-[#6C1D5F]/10 text-[#6C1D5F] flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{course.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">{course.category || 'Uncategorized'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {searchResults.categories.length > 0 && (
                  <div>
                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider border-t border-gray-100 dark:border-white/10 pt-2 mt-2">Categories</div>
                    {searchResults.categories.map(cat => (
                      <div 
                        key={cat.id} 
                        className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors"
                        onClick={() => handleResultClick('student/courses', '')}
                      >
                        <div className="w-8 h-8 rounded bg-[#01AC9F]/10 text-[#01AC9F] flex items-center justify-center shrink-0">
                          <TagIcon className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{cat.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="header-actions flex items-center gap-3 shrink-0">
        <button
          onClick={() => router.navigate({ to: '/student/notifications' })}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1a1a24] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#252535] transition-colors border border-transparent dark:border-[#2e2e3e] relative"
          title="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          {unreadCount > 0 && (
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6200] rounded-full border-2 border-white dark:border-[#15151f]" />
          )}
        </button>

        <button className="icon-btn p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" onClick={toggleDark}>
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {/* Profile / Avatar -> links to /student/profile */}
        <button 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-2"
          onClick={() => router.navigate({ to: '/student/profile' })}
        >
          <div className="w-10 h-10 rounded-xl bg-[#6C1D5F] dark:bg-[#84117C] text-white flex items-center justify-center font-bold text-sm shadow-sm relative overflow-hidden border-2 border-white dark:border-[#15151f]">
            {studentProfile?.avatar ? (
               <img src={studentProfile.avatar} alt={studentProfile.name} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
               <span>{studentProfile?.name?.charAt(0) || 'S'}</span>
            )}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">{studentProfile?.name || 'Student'}</span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Student</span>
          </div>
        </button>
      </div>
    </header>
  );
}
