import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconAdd } from '../../components/Icons';
import { clsx } from 'clsx';
import { Modal } from '../../components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreVertical, Edit3, Trash2, FolderCode, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

// Mock initial categories data (matches CategoryEntity schema)
const initialCategories = [
  { id: 'cat-1', name: 'Programming & Software Development', icon: '💻', color: '#3B82F6', description: 'Core programming languages and engineering principles.', status: 'Active', count: 12, createdAt: 'Oct 12, 2023' },
  { id: 'cat-2', name: 'Cloud & DevOps Architecture', icon: '☁️', color: '#10B981', description: 'Cloud infrastructure, CI/CD, and site reliability.', status: 'Active', count: 8, createdAt: 'Nov 05, 2023' },
  { id: 'cat-3', name: 'Data Science & Machine Learning', icon: '🧠', color: '#8B5CF6', description: 'AI, big data, analytics, and ML models.', status: 'Active', count: 5, createdAt: 'Dec 20, 2023' },
  { id: 'cat-4', name: 'Cybersecurity & Compliance', icon: '🛡️', color: '#EF4444', description: 'Network security, cryptography, and risk management.', status: 'Inactive', count: 0, createdAt: 'Jan 14, 2024' },
];

export default function Categories() {
  const { addToast } = useAppStore();
  const [categories, setCategories] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lms_categories_v1');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return initialCategories;
  });

  useEffect(() => {
    localStorage.setItem('lms_categories_v1', JSON.stringify(categories));
  }, [categories]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Created');
  const [search, setSearch] = useState('');
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    icon: '',
    color: '#3B82F6',
    description: '',
    status: 'Active'
  });

  const filteredCategories = categories.filter(cat => {
    const matchesTab = activeTab === 'All' ? true : cat.status === activeTab;
    const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
    if (sortBy === 'Name (Z-A)') return b.name.localeCompare(a.name);
    return 0; // 'Recently Created' relies on default insertion order
  });

  const handleEdit = (category) => {
    setFormData(category);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
      addToast('Category deleted successfully.', 'success');
    }
  };

  const handleCreateNew = () => {
    setFormData({ id: '', name: '', icon: '📚', color: '#3B82F6', description: '', status: 'Active' });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setCategories(categories.map(c => c.id === formData.id ? { ...formData, count: c.count, createdAt: c.createdAt } : c));
      addToast(`Category "${formData.name}" updated successfully.`, 'success');
    } else {
      const newCategory = { ...formData, id: `cat-${Math.floor(Math.random() * 9000) + 1000}`, count: 0, createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) };
      setCategories([newCategory, ...categories]);
      addToast(`Category "${newCategory.name}" created successfully.`, 'success');
    }
    setIsModalOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-8 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <FolderCode className="w-48 h-48 text-indigo-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Global Settings</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">Curriculum</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-display">Category Management</h1>
            <p className="text-indigo-200/80 max-w-xl text-sm">
              Configure top-level learning domains and course groupings. These categories dictate the primary taxonomy of the entire platform catalog.
            </p>
          </div>
          <button onClick={handleCreateNew} className="shrink-0 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25 cursor-pointer">
            <IconAdd className="w-5 h-5" /> Create Category
          </button>
        </div>
      </div>

      {/* Controls & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-4 glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between border border-border/40 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="px-3 py-2 bg-background border border-border/50 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value="All">Status: All</option>
                <option value="Active">Status: Active</option>
                <option value="Inactive">Status: Inactive</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-background border border-border/50 rounded-xl text-sm font-semibold outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value="Recently Created">Sort: Recently Created</option>
                <option value="Name (A-Z)">Sort: Name (A-Z)</option>
                <option value="Name (Z-A)">Sort: Name (Z-A)</option>
              </select>
            </div>
          </div>
          <div className="relative w-full sm:max-w-md ml-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-background border border-border/40 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-secondary/50 border-b border-border/40">
                <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-muted-foreground">Icon & Name</th>
                <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-muted-foreground">Description</th>
                <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-muted-foreground text-center">Total Courses</th>
                <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-muted-foreground text-center">Status</th>
                <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-muted-foreground text-center">Created Date</th>
                <th className="px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-muted-foreground text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredCategories.map((cat, index) => (
                  <motion.tr
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="border-b border-border/40 hover:bg-secondary/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm shrink-0" style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
                          {cat.icon.startsWith('http') ? <img src={cat.icon} alt={cat.name} className="w-6 h-6 object-contain" /> : cat.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground line-clamp-1">{cat.name}</h3>
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">{cat.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs whitespace-normal">
                      <p className="text-sm text-muted-foreground line-clamp-1">{cat.description}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-foreground bg-secondary/80 px-2.5 py-1 rounded-md">{cat.count}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={clsx(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider justify-center",
                        cat.status === 'Active' ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-orange-500/10 text-orange-600 border border-orange-500/20"
                      )}>
                        {cat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-muted-foreground">{cat.createdAt || 'Oct 12, 2023'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(cat)} className="h-8 w-8 rounded-lg hover:bg-secondary grid place-items-center text-muted-foreground hover:text-indigo-500 transition-colors cursor-pointer" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(cat.id)} className="h-8 w-8 rounded-lg hover:bg-secondary grid place-items-center text-muted-foreground hover:text-red-500 transition-colors cursor-pointer" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredCategories.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No Categories Found</h3>
              <p className="text-sm text-muted-foreground max-w-sm mt-1">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary/10">
          <span className="text-sm text-muted-foreground">
            Showing 1 to {filteredCategories.length} of {categories.length} categories
          </span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer" disabled>
              <span className="text-xs font-bold">&lt;</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer">1</button>
            <button className="w-8 h-8 rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer" disabled>
              <span className="text-xs font-bold">&gt;</span>
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? "Edit Domain Category" : "Create New Category"}>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Category Name</label>
              <input required type="text" className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Cloud & DevOps" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Icon (Emoji or URL)</label>
                <div className="flex gap-2">
                  <input required type="text" className="flex-1 px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. ☁️ or https://..." value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
                  <label className="shrink-0 bg-secondary hover:bg-secondary/80 flex items-center justify-center px-4 rounded-xl cursor-pointer transition-colors border border-border/50 text-xs font-bold" title="Upload Image">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                  if(e.target.files && e.target.files[0]) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => setFormData({...formData, icon: ev.target.result});
                                    reader.readAsDataURL(e.target.files[0]);
                                  }
                                }} />
                  </label>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Theme Color</label>
                <div className="flex gap-3 h-[42px] items-center px-3 bg-background border border-border/50 rounded-xl focus-within:border-indigo-500 transition-colors">
                  <input required type="color" className="h-6 w-6 rounded cursor-pointer border-0 p-0 bg-transparent" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
                  <span className="text-sm font-mono text-foreground font-semibold">{formData.color}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Description</label>
              <textarea required rows={3} className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="Brief description of the learning domain..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1.5">Status</label>
              <select className="w-full px-4 py-2.5 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors cursor-pointer appearance-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Active">🟢 Active (Visible in Catalog)</option>
                <option value="Inactive">🔴 Inactive (Hidden)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <button type="button" className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border/50 hover:bg-secondary transition-colors cursor-pointer" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white transition-colors cursor-pointer shadow-lg shadow-indigo-500/20">{isEditMode ? "Save Changes" : "Create Category"}</button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
