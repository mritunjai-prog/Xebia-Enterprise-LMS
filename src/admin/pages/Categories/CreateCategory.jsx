import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CategoryService } from '../../../services/api';
import { AIService } from '../../../services/aiService';
import {
  CheckCircle2, Circle, ChevronRight, Save, Plus,
  Smile, Link as LinkIcon, BookOpen, Users, X, Wand2, Loader2, AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import EmojiPicker from 'emoji-picker-react';

const BRAND = '#6C1D5F';
const TEAL = '#01AC9F';

const PRESET_COLORS = [
  '#6C1D5F', '#01AC9F', '#FF6B35', '#845EC2', '#6C757D', '#4A90D9'
];

export default function CreateCategory({ onBack, editData = null }) {
  const { addToast } = useAppStore();

  const [form, setForm] = useState({
    name: editData?.name || '',
    slug: editData?.slug || '',
    iconType: editData?.icon?.startsWith('http') || editData?.icon?.startsWith('blob:') ? 'url' : 'emoji',
    icon: editData?.icon || '',
    description: editData?.description || '',
    color: editData?.color || TEAL,
    active: editData?.active !== undefined ? editData.active : true,
  });

  const [saved, setSaved] = useState(false);
  const [autoSaveMsg, setAutoSaveMsg] = useState('Auto-saved · just now');
  const [successBanner, setSuccessBanner] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [duplicateError, setDuplicateError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const colorInputRef = useRef(null);

  const generateAIDescription = async () => {
    if (!form.name.trim()) {
      addToast('Please enter a category name first', 'error');
      return;
    }
    setIsGenerating(true);
    try {
      const desc = await AIService.generateCategoryDescription(form.name.trim());
      setForm({ ...form, description: desc });
      addToast('AI description generated successfully!', 'success');
    } catch (e) {
      addToast(e.message, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!editData) {
      setForm(f => ({
        ...f,
        slug: f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }));
    }
  }, [form.name, editData]);

  useEffect(() => {
    if (form.name) {
      const t = setTimeout(() => setAutoSaveMsg('Auto-saved · just now'), 1500);
      return () => clearTimeout(t);
    }
  }, [form]);

  const fieldSummary = [
    { label: 'Name', value: form.name || 'Web Development', ok: !!form.name },
    { label: 'Icon', value: form.iconType === 'emoji' ? 'Emoji' : 'Image URL', ok: true },
    { label: 'Description', value: form.description ? 'Filled' : 'Not filled', ok: !!form.description },
    { label: 'Color', value: form.color.toUpperCase(), ok: true },
    { label: 'Status', value: form.active ? 'Active' : 'Inactive', ok: true },
  ];

  const handleSubmit = async (asDraft = false) => {
    if (!form.name.trim() || !form.description.trim()) {
      setValidationError('Please fill in all mandatory fields (Name and Description) before saving.');
      return;
    }
    setIsSubmitting(true);
    try {
      const allCategories = await CategoryService.getCategories();
      const isDuplicate = allCategories.some(c =>
        (c.name || '').trim().toLowerCase() === form.name.trim().toLowerCase() &&
        c.id !== editData?.id
      );
      if (isDuplicate) {
        setDuplicateError(form.name.trim());
        setIsSubmitting(false);
        return;
      }

      const payload = {
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        icon: form.icon,
        color: form.color,
        description: form.description,
        isActive: asDraft ? false : form.active,
      };

      if (editData?.id) {
        await CategoryService.updateCategory(editData.id, payload);
        addToast(`Category "${form.name}" updated!`, 'success');
        if (onBack) onBack();
      } else {
        await CategoryService.createCategory(payload);
        setSuccessBanner(true);
        addToast(`Category "${form.name}" created!`, 'success');
        if (!asDraft) {
          setSaved(true);
          if (onBack) onBack();
        }
      }
    } catch (err) {
      addToast(err.message || 'Failed to save category', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-in fade-in duration-300">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <button onClick={onBack} className="hover:text-gray-800 dark:hover:text-white transition-colors">Dashboard</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={onBack} className="hover:text-gray-800 dark:hover:text-white transition-colors">Categories</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-white font-medium">{editData ? 'Edit' : 'Create'}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${form.color}22` }}>
                <LinkIcon className="w-5 h-5" style={{ color: form.color }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editData ? 'Edit Category' : 'Create New Category'}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Fill in the details below to set up a new learning category.</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#2e2e3e] bg-white dark:bg-[#15151f] rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
              Draft recovered
            </div>
          </div>

          {successBanner && (
            <div className="flex items-center justify-between bg-[#01AC9F] text-white rounded-xl px-4 py-3 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Category created successfully!
              </div>
              <button onClick={() => setSuccessBanner(false)} className="text-white/80 hover:text-white">
                Dismiss
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-5 space-y-4 transition-colors">
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={100}
                  placeholder="e.g. Web Development"
                  value={form.name}
                  onChange={e => {
                    const newName = e.target.value;
                    const generatedSlug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setForm({ ...form, name: newName, slug: generatedSlug });
                  }}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#3a3a4a] bg-white dark:bg-[#1a1a24] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg text-sm outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-2">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="px-3 py-2.5 bg-gray-50 dark:bg-[#1a1a24] border border-r-0 border-gray-300 dark:border-[#3a3a4a] rounded-l-lg text-gray-500 text-sm">/categories/</span>
                <input
                  type="text"
                  maxLength={100}
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                  className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#3a3a4a] bg-white dark:bg-[#1a1a24] text-gray-900 dark:text-white rounded-r-lg text-sm outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] transition-all pr-24"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {form.slug && (
                    <span className="flex items-center gap-1 text-[11px] text-[#01AC9F] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Unique
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                <span>Must be unique, lowercase, alphanumeric with hyphens.</span>
                <span>{form.slug.length}/100</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-5 space-y-3 transition-colors">
            <label className="block text-sm font-semibold text-gray-800 dark:text-white">Icon / Thumbnail</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, iconType: 'emoji' })}
                className={clsx('px-4 py-1.5 rounded-full text-sm font-medium transition-colors', form.iconType === 'emoji' ? 'text-white' : 'bg-gray-100 dark:bg-[#252535] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a3a]')}
                style={form.iconType === 'emoji' ? { backgroundColor: BRAND } : {}}
              >
                Emoji
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, iconType: 'url' })}
                className={clsx('px-4 py-1.5 rounded-full text-sm font-medium transition-colors', form.iconType === 'url' ? 'text-white' : 'bg-gray-100 dark:bg-[#252535] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a3a]')}
                style={form.iconType === 'url' ? { backgroundColor: BRAND } : {}}
              >
                Image
              </button>
            </div>

            {form.iconType === 'emoji' ? (
              <div className="flex gap-3 mt-2 relative">
                <div
                  className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-[#3a3a4a] flex items-center justify-center text-2xl shrink-0 bg-gray-50 dark:bg-[#1a1a24]"
                  style={{ borderColor: form.color }}
                >
                  {form.icon}
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder=""
                    value={form.icon}
                    onChange={e => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#3a3a4a] bg-white dark:bg-[#1a1a24] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg text-sm outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] pr-10 transition-all"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <Smile className="w-4 h-4" />
                  </button>

                  {showEmojiPicker && (
                    <div className="absolute top-full right-0 z-50 mt-2 shadow-2xl rounded-xl border border-gray-200 dark:border-[#3a3a4a] bg-white dark:bg-[#1a1a24] overflow-hidden">
                      <EmojiPicker
                        onEmojiClick={(emojiData) => {
                          setForm({ ...form, icon: emojiData.emoji });
                          setShowEmojiPicker(false);
                        }}
                        theme="auto"
                        lazyLoadEmojis={true}
                        searchDisabled={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div
                  className="mt-3 border-2 border-dashed border-gray-300 dark:border-[#3a3a4a] rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-gray-50 dark:bg-[#1a1a24]/50 hover:bg-gray-100 dark:hover:bg-[#1a1a24] transition-colors relative overflow-hidden"
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.onload = (event) => setForm({ ...form, icon: event.target.result });
                      reader.readAsDataURL(file);
                    } else {
                      addToast('Please upload a valid image file.', 'error');
                    }
                  }}
                >
                  {form.icon && form.icon.startsWith('data:image/') ? (
                    <div className="relative group rounded-full overflow-hidden w-20 h-20 border-2" style={{ borderColor: form.color }}>
                      <img src={form.icon} alt="Preview" className="w-full h-full object-cover z-10 relative pointer-events-none" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button onClick={() => setForm({ ...form, icon: '' })} className="text-white bg-red-500 p-1 rounded-full pointer-events-auto"><X className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-[#6C1D5F]/10 dark:bg-[#84117C]/20 flex items-center justify-center text-[#6C1D5F] dark:text-[#84117C] pointer-events-none">
                        <Plus className="w-6 h-6" />
                      </div>
                      <div className="text-center pointer-events-none">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Drag & drop an image or click to upload</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => setForm({ ...form, icon: event.target.result });
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>

                <div className="w-full mt-4 flex items-center gap-3">
                  <div className="h-px bg-gray-200 dark:bg-[#3a3a4a] flex-1"></div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">OR URL</span>
                  <div className="h-px bg-gray-200 dark:bg-[#3a3a4a] flex-1"></div>
                </div>

                <input
                  type="text"
                  placeholder="https://..."
                  value={form.icon && !form.icon.startsWith('data:image/') ? form.icon : ''}
                  onChange={e => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-[#3a3a4a] bg-white dark:bg-[#15151f] text-gray-900 dark:text-white placeholder-gray-400 rounded-lg text-sm outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] mt-2 relative z-10"
                />
              </>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Appears as the category thumbnail. Use simple, recognizable images or emojis.</p>
          </div>

            <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-5 space-y-2 transition-colors">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-800 dark:text-white">Description <span className="text-red-500">*</span></label>
                <button
                type="button"
                onClick={generateAIDescription}
                disabled={isGenerating || !form.name.trim()}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                Generate with AI
              </button>
            </div>
            <textarea
              rows={6}
              placeholder="Describe what this category covers..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-[#3a3a4a] bg-white dark:bg-[#1a1a24] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg text-sm outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] transition-all"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500">No character limit. Appears in category listings and SEO previews.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-5 space-y-3 transition-colors">
              <label className="block text-sm font-semibold text-gray-800 dark:text-white">Accent Color</label>
              <div className="flex items-center gap-3 border border-gray-200 dark:border-[#3a3a4a] rounded-lg px-3 py-2 bg-gray-50 dark:bg-[#1a1a24]">
                <input
                  type="color"
                  ref={colorInputRef}
                  value={form.color}
                  onChange={e => setForm({ ...form, color: e.target.value })}
                  className="w-8 h-8 rounded-full cursor-pointer border-0 bg-transparent p-0"
                />
                <div className="flex items-center gap-1.5 text-sm font-mono text-gray-700 dark:text-gray-300">
                  <span className="text-gray-400 dark:text-gray-500">#</span>
                  <span className="uppercase">{form.color.replace('#', '')}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => setForm({ ...form, color: c })}
                    className={clsx('w-7 h-7 rounded-full transition-transform hover:scale-110', form.color === c && 'ring-2 ring-offset-1 ring-gray-400')}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">Used for badges and highlights.</p>
            </div>

            <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-5 space-y-3 transition-colors">
              <label className="block text-sm font-semibold text-gray-800 dark:text-white">Status</label>
              <div
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setForm({ ...form, active: !form.active })}
              >
                <div
                  className={clsx('relative w-12 h-6 rounded-full transition-colors flex items-center px-0.5', form.active ? 'bg-[#01AC9F]' : 'bg-gray-300 dark:bg-gray-600')}
                >
                  <div
                    className={clsx('w-5 h-5 bg-white rounded-full shadow transition-transform', form.active ? 'translate-x-6' : 'translate-x-0')}
                  />
                </div>
                <span className={clsx('text-sm font-semibold', form.active ? 'text-[#01AC9F]' : 'text-gray-500 dark:text-gray-400')}>
                  {form.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className={clsx('rounded-lg px-3 py-2 text-xs flex items-center gap-2', form.active ? 'bg-[#01AC9F]/10 text-[#01AC9F]' : 'bg-gray-50 dark:bg-[#1a1a24] text-gray-500 dark:text-gray-400')}>
                <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', form.active ? 'bg-[#01AC9F]' : 'bg-gray-400')} />
                {form.active ? 'Visible to all learners' : "Inactive categories won't be visible to learners."}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {form.active ? "Inactive categories won't be visible to learners." : "Enable to make this category visible."}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 dark:border-[#2e2e3e] pt-4 mt-2 pb-6">
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
              <Save className="w-3.5 h-3.5" />
              {autoSaveMsg}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#3a3a4a] hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-300 dark:border-[#3a3a4a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors disabled:opacity-60"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting || !form.name.trim()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                style={{ backgroundColor: BRAND }}
              >
                <Plus className="w-4 h-4" />
                {editData ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl overflow-hidden shadow-sm transition-colors">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-[#2e2e3e]">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Live Preview</p>
            </div>
            <div className="p-4">
              <div 
                className="bg-white dark:bg-[#15151f] rounded-xl overflow-hidden shadow-sm relative flex flex-col"
                style={{ border: `3px solid ${form.color}` }}
              >

                {/* Cover Image, Emoji, or Solid Color */}
                <div 
                  className="w-full aspect-video shrink-0 overflow-hidden relative flex items-center justify-center"
                  style={{ backgroundColor: (form.iconType === 'url' && form.icon) ? 'var(--tw-bg-opacity)' : form.color }}
                >
                  {form.iconType === 'url' && form.icon ? (
                    <img src={form.icon} alt="" className="w-full h-full object-cover" />
                  ) : form.iconType === 'emoji' && form.icon ? (
                    <span className="text-[400px] leading-none absolute flex items-center justify-center w-full h-full">{form.icon}</span>
                  ) : null}
                  <div className="absolute top-4 right-4">
                    <span className={clsx(
                      'text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm',
                      form.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    )}>
                      {form.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div 
                  className="flex flex-col flex-1 p-4 pt-3 bg-white dark:bg-[#15151f]"
                >

                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[14px]">{form.name || 'Web Development'}</h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono mt-0.5">
                      {form.slug || 'web-development'}
                    </p>
                    <p className="text-[12px] text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {form.description || 'Learn the fundamentals of building modern web applications using industry-standard tools and best practices.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400 pt-1 border-t border-gray-100 dark:border-[#2e2e3e] mt-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: form.color }} />
                      {form.color.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 0 Courses</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 0 Learners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-4 shadow-sm transition-colors">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Field Summary</p>
            <div className="space-y-2.5">
              {fieldSummary.map(({ label, value, ok }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={clsx('font-medium', ok ? 'text-gray-900 dark:text-white' : 'text-red-400')}>{value}</span>
                    {ok
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-[#01AC9F]" />
                      : <Circle className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-500 mb-2">Quick Tips</p>
            <ul className="space-y-1.5 text-xs text-amber-600 dark:text-amber-400/80">
              <li>Use a clear, descriptive name</li>
              <li>Pick a brand-aligned accent color</li>
              <li>Write a short SEO-friendly description</li>
              <li>Keep inactive until content is ready</li>
            </ul>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mt-auto">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: BRAND }}>
              <span className="text-white font-bold text-[9px]">X</span>
            </div>
            <span>Xebia LMS · Admin</span>
          </div>
        </div>
      </div>

      {/* Duplicate Error Modal */}
      {duplicateError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#15151f] rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Duplicate Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                A category named <span className="font-semibold text-gray-800 dark:text-gray-200">"{duplicateError}"</span> already exists. Please choose a unique name for this category.
              </p>
              <button
                onClick={() => setDuplicateError(null)}
                className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Okay, I'll change it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Validation Error Modal */}
      {validationError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#15151f] rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Missing Fields</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {validationError}
              </p>
              <button
                onClick={() => setValidationError(null)}
                className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Okay, I'll fill them
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
