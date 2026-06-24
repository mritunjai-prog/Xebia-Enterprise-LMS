import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { IconAdd } from '../../components/Icons';
import { clsx } from 'clsx';
import { Modal } from '../../components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MoreVertical, Edit3, Trash2, FolderCode, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

// Mock initial categories data (matches CategoryEntity schema)
const initialCategories = [
  { id: 'cat-1', name: 'Programming & Software Development', icon: '💻', color: '#3B82F6', description: 'Core programming languages and engineering principles.', status: 'Active', count: 12 },
  { id: 'cat-2', name: 'Cloud & DevOps Architecture', icon: '☁️', color: '#10B981', description: 'Cloud infrastructure, CI/CD, and site reliability.', status: 'Active', count: 8 },
  { id: 'cat-3', name: 'Data Science & Machine Learning', icon: '🧠', color: '#8B5CF6', description: 'AI, big data, analytics, and ML models.', status: 'Active', count: 5 },
  { id: 'cat-4', name: 'Cybersecurity & Compliance', icon: '🛡️', color: '#EF4444', description: 'Network security, cryptography, and risk management.', status: 'Inactive', count: 0 },
];

export default function Categories() {
  const { addToast } = useAppStore();
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
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
  });

  const handleEdit = (category) => {
    setFormData(category);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setFormData({ id: '', name: '', icon: '📚', color: '#3B82F6', description: '', status: 'Active' });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setCategories(categories.map(c => c.id === formData.id ? { ...formData, count: c.count } : c));
      addToast(`Category "${formData.name}" updated successfully.`, 'success');
    } else {
      const newCategory = { ...formData, id: `cat-${Math.floor(Math.random() * 9000) + 1000}`, count: 0 };
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
        <div className="lg:col-span-3 glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between border border-border/40 shadow-sm">
          <div className="flex bg-secondary/50 p-1 rounded-xl w-full sm:w-auto">
            {['All', 'Active', 'Inactive'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer flex-1 sm:flex-none",
                  activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search domains..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
        <div className="glass rounded-2xl p-5 border border-border/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Domains</p>
            <p className="text-2xl font-black text-foreground">{categories.length}</p>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="glass border border-border/40 rounded-2xl overflow-hidden hover:border-border/80 transition-all group"
            >
              <div className="h-2 w-full" style={{ backgroundColor: cat.color }}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm" style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
                    {cat.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={clsx(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      cat.status === 'Active' ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-red-500/10 text-red-600 border border-red-500/20"
                    )}>
                      {cat.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                      {cat.status}
                    </span>
                    <button onClick={() => handleEdit(cat)} className="h-8 w-8 rounded-lg hover:bg-secondary grid place-items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground font-mono mb-3">{cat.id}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-5">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-xs font-semibold text-muted-foreground">Courses Attached</span>
                  <span className="text-sm font-bold text-foreground bg-secondary/80 px-2.5 py-0.5 rounded-md">{cat.count}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredCategories.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No Categories Found</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-1">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
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
                        const url = URL.createObjectURL(e.target.files[0]);
                        setFormData({...formData, icon: url});
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
