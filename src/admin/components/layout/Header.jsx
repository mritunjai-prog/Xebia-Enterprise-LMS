import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconSearch, IconProfile } from '../Icons';
import { Sun, Moon, Settings, ChevronDown, BookOpen, Tag as TagIcon } from 'lucide-react';
import { CourseService, CategoryService } from '../../../services/api';
import { useRouter } from '@tanstack/react-router';
import { clsx } from 'clsx';

export function Header() {
  const { activeSidebarItem, addToast } = useAppStore();
  const router = useRouter();

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

  // Search Logic
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ courses: [], categories: [] });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      Promise.all([CourseService.getCourses(), CategoryService.getCategories()])
        .then(([courses, categories]) => {
          const lower = searchQuery.toLowerCase();
          setSearchResults({
            courses: (courses || []).filter(c => (c.title || '').toLowerCase().includes(lower)).slice(0, 5),
            categories: (categories || []).filter(c => (c.name || '').toLowerCase().includes(lower)).slice(0, 5)
          });
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

  // Settings Menu
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Profile Image Upload & State
  const { adminProfile, updateAdminProfile } = useAppStore();
  const [tempProfile, setTempProfile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Initialize temp profile when modal opens
  useEffect(() => {
    if (isSettingsOpen) {
      setTempProfile({ ...adminProfile });
    }
  }, [isSettingsOpen, adminProfile]);

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

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({ ...tempProfile, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      addToast('Please upload a valid image file.', 'error');
    }
  };

  const saveSettings = () => {
    updateAdminProfile(tempProfile);
    addToast('Settings saved successfully.', 'success');
    setIsSettingsOpen(false);
  };

  return (
    <header className="header relative z-40">
      <div className="breadcrumb">
        <span>Platform</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-cur">{activeSidebarItem}</span>
      </div>
      
      <div className="flex-1 max-w-2xl px-4 relative" ref={searchRef}>
        <div className="header-search w-full relative">
          <IconSearch className="search-icon text-[#5A5A5A]" />
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
              <div className="px-4 py-3 text-sm text-gray-500 text-center">No results found for "{searchQuery}"</div>
            ) : (
              <>
                {searchResults.categories.length > 0 && (
                  <div className="mb-2">
                    <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</div>
                    {searchResults.categories.map(cat => (
                      <div 
                        key={cat.id} 
                        onClick={() => handleResultClick('categories', cat.slug || (cat.name && cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')))}
                        className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a24] cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#01AC9F]/10 text-[#01AC9F] flex items-center justify-center shrink-0">
                          <TagIcon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{cat.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {searchResults.courses.length > 0 && (
                  <div>
                    <div className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Courses</div>
                    {searchResults.courses.map(course => (
                      <div 
                        key={course.id} 
                        onClick={() => handleResultClick('courses', course.slug || (course.title && course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')))}
                        className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1a1a24] cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#6C1D5F]/10 text-[#6C1D5F] dark:bg-[#84117C]/20 dark:text-[#84117C] flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{course.title}</span>
                          <span className="text-xs text-gray-500 truncate">{course.level}</span>
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
      
      <div className="header-actions relative">
        <button
          onClick={toggleDark}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1a1a24] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#252535] transition-colors border border-transparent dark:border-[#2e2e3e]"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-[#1a1a24] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#252535] transition-colors border border-transparent dark:border-[#2e2e3e]"
            title="Settings"
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Account Settings Modal */}
      {isSettingsOpen && tempProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#15151f] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-[#2e2e3e]">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2e2e3e] flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Account Settings</h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
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
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`w-24 h-24 rounded-full bg-gray-100 dark:bg-[#1a1a24] border-2 border-dashed ${isDragging ? 'border-[#6C1D5F] dark:border-[#84117C] scale-105' : 'border-gray-300 dark:border-[#3e3e4e]'} flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252535] transition-all relative overflow-hidden group`}
                >
                   <div className="text-xs text-gray-500 font-medium z-10 group-hover:scale-105 transition-transform bg-white/80 dark:bg-black/50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100">Upload</div>
                   {tempProfile.image ? (
                     <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${tempProfile.image})` }}></div>
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-3xl font-bold bg-[#6C1D5F] dark:bg-[#84117C] text-white">
                       {tempProfile.name?.charAt(0) || 'A'}
                     </div>
                   )}
                </div>
                <div className="text-xs text-gray-500">Max size 2MB (JPG, PNG)</div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2e2e3e] rounded-xl text-sm outline-none focus:border-[#6C1D5F] dark:focus:border-[#84117C]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={tempProfile.email} 
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#1a1a24]/50 border border-gray-200 dark:border-[#2e2e3e] text-gray-500 rounded-xl text-sm outline-none cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <input type="text" value={tempProfile.role} disabled className="w-full px-4 py-2 bg-gray-100 dark:bg-[#1a1a24]/50 border border-gray-200 dark:border-[#2e2e3e] text-gray-500 rounded-xl text-sm outline-none cursor-not-allowed" />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 dark:bg-[#1a1a24] border-t border-gray-100 dark:border-[#2e2e3e] flex justify-end gap-3">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#252535] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveSettings}
                className="px-4 py-2 text-sm font-semibold bg-[#6C1D5F] hover:bg-[#5a184f] dark:bg-[#84117C] dark:hover:bg-[#6e0e67] text-white rounded-xl transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
