import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CourseService } from '../../../services/api';
import { AIService } from '../../../services/aiService';
import {
  CheckCircle2, Circle, ChevronRight, Save, PlayCircle, Star, Users, Check, AlertCircle, Plus, X, UploadCloud, Link as LinkIcon, Wand2, Loader2, ArrowLeft, Globe, Clock, BookOpen
} from 'lucide-react';
import { clsx } from 'clsx';

const BRAND = '#6C1D5F';
const TEAL = '#01AC9F';

const STEPS = [
  { id: 'basic', label: 'Basic Details' },
  { id: 'seo', label: 'SEO & Meta' },
];

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

function SectionCard({ color = BRAND, title, icon, children }) {
  return (
    <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl overflow-hidden shadow-sm transition-colors">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100 dark:border-[#2e2e3e]" style={{ borderLeftColor: color, borderLeftWidth: 3 }}>
        <span className="text-base">{icon}</span>
        <span className="text-sm font-bold text-gray-800 dark:text-white">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function FormRow({ children, cols = 2 }) {
  return <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-4`}>{children}</div>;
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className={clsx('w-full px-3 py-2 border border-gray-200 dark:border-[#3a3a4a] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] bg-white dark:bg-[#1a1a24] transition-all', props.className)}
    />
  );
}

function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className={clsx('w-full px-3 py-2 border border-gray-200 dark:border-[#3a3a4a] rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-[#6C1D5F] focus:ring-1 focus:ring-[#6C1D5F] bg-white dark:bg-[#1a1a24] resize-none transition-all', props.className)}
    />
  );
}

function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select {...props} className={clsx('w-full px-3 py-2 border border-gray-200 dark:border-[#3a3a4a] rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:border-[#6C1D5F] bg-white dark:bg-[#1a1a24] appearance-none transition-all', props.className)}>
        {children}
      </select>
      <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
    </div>
  );
}

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={clsx('relative w-11 h-6 rounded-full transition-colors shrink-0 mt-0.5', checked ? 'bg-[#01AC9F]' : 'bg-gray-200 dark:bg-[#3a3a4a]')}
      >
        <span className={clsx('absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', checked ? 'translate-x-5' : 'translate-x-0')} />
      </button>
      <div>
        <p className="text-sm font-medium text-gray-800 dark:text-white">{label}</p>
        {hint && <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{hint}</p>}
      </div>
    </div>
  );
}

function ListEditor({ items, onChange, placeholder }) {
  const add = () => onChange([...items, '']);
  const update = (i, v) => onChange(items.map((x, idx) => idx === i ? v : x));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-[#252535] text-gray-500 dark:text-gray-400 text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
          <Input value={item} onChange={e => update(i, e.target.value)} placeholder={placeholder} />
          <button type="button" onClick={() => remove(i)} className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-dashed border-gray-300 dark:border-[#3a3a4a] text-gray-500 dark:text-gray-400 hover:border-[#6C1D5F] hover:text-[#6C1D5F] transition-colors">
        <Plus className="w-3.5 h-3.5" /> Add Outcome
      </button>
    </div>
  );
}

function BasicDetailsStep({ form, setForm, categories, generatingField, handleAIGenerate }) {
  const slug = form.title ? form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';

  return (
    <div className="space-y-5">
      <SectionCard color={BRAND} title="Course Identity" icon="🎓">
        <div className="space-y-4">
          <FormRow cols={1}>
            <Field label="Title" required hint="Appears on the course card and listing pages.">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => handleAIGenerate('title', AIService.generateCourseTitle)}
                  disabled={generatingField === 'title' || !form.title.trim()}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingField === 'title' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                  Generate with AI
                </button>
              </div>
              <div className="relative">
                <Input
                  value={form.title}
                  onChange={e => {
                    const newTitle = e.target.value;
                    const generatedSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setForm(f => ({ ...f, title: newTitle, slug: generatedSlug }));
                  }}
                  placeholder="Type a topic (e.g. Java) and hit 'Generate with AI', or enter full title."
                  maxLength={100}
                />
                {form.title && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#01AC9F] font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Unique
                  </span>
                )}
              </div>
            </Field>
          </FormRow>
          
          <FormRow cols={1}>
            <Field label="URL Slug" required hint="Must be unique, lowercase, alphanumeric with hyphens. Auto-generated from title.">
              <div className="relative flex items-center">
                <span className="px-3 py-2 border border-r-0 border-gray-200 dark:border-[#3a3a4a] bg-gray-50 dark:bg-[#1a1a24] text-gray-500 text-sm rounded-l-xl">/courses/</span>
                <input
                  value={form.slug || ''}
                  readOnly
                  placeholder="your-course-title"
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1a1a24] text-gray-500 border border-gray-200 dark:border-[#3a3a4a] rounded-r-xl text-sm outline-none cursor-not-allowed"
                />
                {form.slug && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#01AC9F] font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Unique
                  </span>
                )}
              </div>
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Category" required>
              <Select value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
                <option value="">Select a Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
            <Field label="Level" required>
              <Select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}>
                {LEVELS.map(l => <option key={l}>{l}</option>)}
              </Select>
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Language / Locale">
              <Select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))}>
                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
              </Select>
            </Field>
            <Field label="Duration" required hint="Hours and Minutes">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={form.durationHours}
                    onChange={e => setForm(f => ({ ...f, durationHours: e.target.value }))}
                    placeholder="0"
                    type="number"
                    min="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">hrs</span>
                </div>
                <div className="flex-1 relative">
                  <Input
                    value={form.durationMinutes}
                    onChange={e => setForm(f => ({ ...f, durationMinutes: e.target.value }))}
                    placeholder="0"
                    type="number"
                    min="0"
                    max="59"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">min</span>
                </div>
              </div>
            </Field>
          </FormRow>
        </div>
      </SectionCard>

      <SectionCard color={TEAL} title="Descriptions" icon="📝">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Field label="Short Description" required hint="A short, catchy tagline (max 200 chars)." />
            <button
              type="button"
              onClick={() => handleAIGenerate('shortDescription', AIService.generateBriefDescription)}
              disabled={generatingField === 'shortDescription' || !form.title.trim()}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-2"
            >
              {generatingField === 'shortDescription' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
              Generate with AI
            </button>
          </div>
          <Textarea
            value={form.shortDescription}
            onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))}
            rows={2}
            placeholder="A brief description of what this course covers..."
            maxLength={200}
          />

          <div className="flex items-center justify-between mt-4">
            <Field label="Full Description" required hint="Detailed overview. Supports markdown." />
            <button
              type="button"
              onClick={() => handleAIGenerate('description', AIService.generateFullDescription)}
              disabled={generatingField === 'description' || !form.title.trim()}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-2"
            >
              {generatingField === 'description' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
              Generate with AI
            </button>
          </div>
          <Textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={5}
            placeholder="Full course description..."
          />
        </div>
      </SectionCard>

      <SectionCard color="#f97316" title="Media" icon="🖼️">
        <div className="space-y-4">
          <FormRow cols={3}>
            <Field label="Icon" hint="Course Icon (Drag or URL)">
              <div 
                className="mt-1 border-2 border-dashed border-gray-300 dark:border-[#3a3a4a] rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-[#1a1a24]/50 hover:bg-gray-100 dark:hover:bg-[#1a1a24] transition-colors relative overflow-hidden"
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => setForm(f => ({ ...f, icon: reader.result }));
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/10 dark:bg-[#84117C]/20 flex items-center justify-center text-[#6C1D5F] dark:text-[#84117C]">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-medium text-gray-900 dark:text-white">Drag & drop or click</p>
                </div>
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setForm(f => ({ ...f, icon: reader.result }));
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="mt-2">
                <Input
                  value={form.icon && !form.icon.startsWith('blob:') ? form.icon : ''}
                  onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                  placeholder="URL https://..."
                />
              </div>
            </Field>

            <Field label="Thumbnail Image" hint="Course Thumbnail (Drag or URL)">
              <div 
                className="mt-1 border-2 border-dashed border-gray-300 dark:border-[#3a3a4a] rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-[#1a1a24]/50 hover:bg-gray-100 dark:hover:bg-[#1a1a24] transition-colors relative overflow-hidden"
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => setForm(f => ({ ...f, thumbnail: reader.result }));
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/10 dark:bg-[#84117C]/20 flex items-center justify-center text-[#6C1D5F] dark:text-[#84117C]">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-medium text-gray-900 dark:text-white">Drag & drop or click</p>
                </div>
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setForm(f => ({ ...f, thumbnail: reader.result }));
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="mt-2">
                <Input
                  value={form.thumbnail && !form.thumbnail.startsWith('blob:') ? form.thumbnail : ''}
                  onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))}
                  placeholder="URL https://..."
                />
              </div>
            </Field>

            <Field label="Banner Image" hint="Course Banner (Drag or URL)">
              <div 
                className="mt-1 border-2 border-dashed border-gray-300 dark:border-[#3a3a4a] rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-[#1a1a24]/50 hover:bg-gray-100 dark:hover:bg-[#1a1a24] transition-colors relative overflow-hidden"
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => setForm(f => ({ ...f, bannerImage: reader.result }));
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#6C1D5F]/10 dark:bg-[#84117C]/20 flex items-center justify-center text-[#6C1D5F] dark:text-[#84117C]">
                  <Plus className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-medium text-gray-900 dark:text-white">Drag & drop or click</p>
                </div>
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setForm(f => ({ ...f, bannerImage: reader.result }));
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="mt-2">
                <Input
                  value={form.bannerImage && !form.bannerImage.startsWith('blob:') ? form.bannerImage : ''}
                  onChange={e => setForm(f => ({ ...f, bannerImage: e.target.value }))}
                  placeholder="URL https://..."
                />
              </div>
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Preview Video URL" hint="Short intro video link (YouTube / Vimeo)">
              <Input
                value={form.previewVideoUrl}
                onChange={e => setForm(f => ({ ...f, previewVideoUrl: e.target.value }))}
                placeholder="https://youtube.com/..."
              />
            </Field>
            <Field label="Intro Video URL (****)" hint="Longer intro/trailer">
              <Input
                value={form.introVideoUrl}
                onChange={e => setForm(f => ({ ...f, introVideoUrl: e.target.value }))}
                placeholder="https://..."
              />
            </Field>
          </FormRow>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 bg-gray-50 dark:bg-[#1a1a24] border border-dashed border-gray-200 dark:border-[#3a3a4a] rounded-xl flex items-center justify-center overflow-hidden">
              {form.thumbnailImageUrl
                ? <img src={form.thumbnailImageUrl} alt="" className="w-full h-full object-cover rounded-xl" />
                : <div className="text-center text-gray-300 dark:text-gray-600"><div className="text-3xl mb-1">🖼️</div><div className="text-xs">Thumbnail Preview</div></div>
              }
            </div>
            <div className="h-28 bg-gray-50 dark:bg-[#1a1a24] border border-dashed border-gray-200 dark:border-[#3a3a4a] rounded-xl flex items-center justify-center">
              {form.promoImageUrl
                ? <img src={form.promoImageUrl} alt="" className="w-full h-full object-cover rounded-xl" />
                : <div className="text-center text-gray-300 dark:text-gray-600"><div className="text-3xl mb-1">🖼️</div><div className="text-xs">OG Image Preview</div></div>
              }
            </div>
          </div>

          <Field label="Price Course URL (***) · Resource / purchase page">
            <Input
              value={form.coursePriceUrl}
              onChange={e => setForm(f => ({ ...f, coursePriceUrl: e.target.value }))}
              placeholder="https://..."
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard color="#a78bfa" title="Additional Information" icon="📋">
        <div className="space-y-5">
          <Field label="Learning Outcomes" hint="What students will learn">
            <div className="flex items-center justify-end mb-2">
              <button
                type="button"
                onClick={() => handleAIGenerate('learningOutcomes', AIService.generateLearningOutcomes)}
                disabled={generatingField === 'learningOutcomes' || !form.title.trim()}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingField === 'learningOutcomes' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                Generate with AI
              </button>
            </div>
            <ListEditor
              items={form.learningOutcomes}
              onChange={v => setForm(f => ({ ...f, learningOutcomes: v }))}
              placeholder="e.g. Build REST APIs with Spring Boot"
            />
          </Field>

          <Field label="Prerequisites" hint="Optional">
            <div className="flex items-center justify-end mb-2">
              <button
                type="button"
                onClick={() => handleAIGenerate('prerequisites', AIService.generatePrerequisites)}
                disabled={generatingField === 'prerequisites' || !form.title.trim()}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingField === 'prerequisites' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                Generate with AI
              </button>
            </div>
            <ListEditor
              items={form.prerequisites}
              onChange={v => setForm(f => ({ ...f, prerequisites: v }))}
              placeholder="e.g. Basic Java knowledge"
            />
          </Field>
          <div className="flex items-center justify-between mt-4">
            <Field label="Target Audience" hint="Optional" />
            <button
              type="button"
              onClick={() => handleAIGenerate('targetAudience', AIService.generateTargetAudience)}
              disabled={generatingField === 'targetAudience' || !form.title.trim()}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generatingField === 'targetAudience' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
              Generate with AI
            </button>
          </div>
          <ListEditor
            items={form.targetAudience}
            onChange={v => setForm(f => ({ ...f, targetAudience: v }))}
            placeholder="e.g. Backend developers who want to learn Spring Boot"
          />

          <div className="flex items-center justify-between mt-4">
            <Field label="Course Highlights (max 10)" />
            <button
              type="button"
              onClick={() => handleAIGenerate('highlights', AIService.generateCourseHighlights)}
              disabled={generatingField === 'highlights' || !form.title.trim()}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-2"
            >
              {generatingField === 'highlights' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
              Generate with AI
            </button>
          </div>
          <ListEditor
            items={form.highlights}
            onChange={v => setForm(f => ({ ...f, highlights: v }))}
            placeholder="Key highlights (e.g. 3 Real-world projects)"
          />

          <div className="flex items-center justify-between mt-4">
            <Field label="Career Opportunities (max 5)" />
            <button
              type="button"
              onClick={() => handleAIGenerate('careerOpportunities', AIService.generateCareerOpportunities)}
              disabled={generatingField === 'careerOpportunities' || !form.title.trim()}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-2"
            >
              {generatingField === 'careerOpportunities' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
              Generate with AI
            </button>
          </div>
          <ListEditor
            items={form.careerOpportunities}
            onChange={v => setForm(f => ({ ...f, careerOpportunities: v }))}
            placeholder="e.g. Backend Developer, Cloud Engineer"
          />
        </div>
      </SectionCard>

      <SectionCard color="#34d399" title="Course Settings" icon="⚙️">
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          <Toggle checked={form.active} onChange={v => setForm(f => ({ ...f, active: v }))} label="Active" hint="Makes the course visible to learners" />
          <Toggle checked={form.isPublished} onChange={v => setForm(f => ({ ...f, isPublished: v }))} label="isPublished" hint="Publish the course now" />
          <Toggle checked={form.isFeatured} onChange={v => setForm(f => ({ ...f, isFeatured: v }))} label="isFeatured" hint="Show in featured section" />
          <Toggle checked={form.allowEnrolling} onChange={v => setForm(f => ({ ...f, allowEnrolling: v }))} label="allowEnrolling" hint="Allow new enrollments" />
          <Toggle checked={form.showOnCourse} onChange={v => setForm(f => ({ ...f, showOnCourse: v }))} label="showOnCourse" hint="Show on course listing" />
        </div>
      </SectionCard>
    </div>
  );
}

function SeoMetaStep({ form, setForm }) {
  const seoScore = Math.min(100, [
    form.seoTitle ? 20 : 0,
    form.seoDescription ? 20 : 0,
    form.canonicalUrl ? 10 : 0,
    form.ogTitle ? 15 : 0,
    form.ogDescription ? 15 : 0,
    form.twitterTitle ? 10 : 0,
    form.metaKeywords ? 10 : 0,
  ].reduce((a, b) => a + b, 0));

  const scoreColor = seoScore >= 70 ? 'text-[#01AC9F]' : seoScore >= 40 ? 'text-orange-400' : 'text-red-500';

  return (
    <div className="space-y-5">
      <SectionCard color={BRAND} title="SEO Core" icon="🔍">
        <div className="space-y-4">
          <Field label="SEO Title" hint={`${(form.seoTitle || '').length}/60`}>
            <Input
              value={form.seoTitle}
              onChange={e => setForm(f => ({ ...f, seoTitle: e.target.value }))}
              placeholder="Spring Boot Masterclass - Complete Backend Guide"
              maxLength={60}
            />
          </Field>
          <Field label="Meta Description" hint={`${(form.seoDescription || '').length}/160`}>
            <Textarea
              value={form.seoDescription}
              onChange={e => setForm(f => ({ ...f, seoDescription: e.target.value }))}
              rows={3}
              placeholder="Master Spring Boot 3 and build production-ready REST APIs..."
              maxLength={160}
            />
          </Field>
          <FormRow>
            <Field label="Canonical URL">
              <Input
                value={form.canonicalUrl}
                onChange={e => setForm(f => ({ ...f, canonicalUrl: e.target.value }))}
                placeholder="https://..."
              />
            </Field>
            <Field label="Robots">
              <Select value={form.robots} onChange={e => setForm(f => ({ ...f, robots: e.target.value }))}>
                {['index, follow', 'noindex, nofollow', 'index, nofollow', 'noindex, follow'].map(r => <option key={r}>{r}</option>)}
              </Select>
            </Field>
          </FormRow>
          <Field label="Meta Keywords" hint="Comma-separated">
            <Input
              value={form.metaKeywords}
              onChange={e => setForm(f => ({ ...f, metaKeywords: e.target.value }))}
              placeholder="spring boot, java, backend, rest api"
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard color="#3b82f6" title="Advanced SEO" icon="🚀">
        <div className="space-y-4">
          <Field label="primaryKeyword (*)">
            <Input value={form.primaryKeyword} onChange={e => setForm(f => ({ ...f, primaryKeyword: e.target.value }))} placeholder="spring boot" />
          </Field>
          <FormRow>
            <Field label="focusKeyphrase (Google/SEO)">
              <Input value={form.focusKeyphrase} onChange={e => setForm(f => ({ ...f, focusKeyphrase: e.target.value }))} placeholder="Spring Boot Masterclass" />
            </Field>
            <Field label="focusKeyword (SEMrush)">
              <Input value={form.focusKeyword} onChange={e => setForm(f => ({ ...f, focusKeyword: e.target.value }))} placeholder="spring boot course" />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="socialMediaTitle (Linked label)">
              <Input value={form.socialMediaTitle} onChange={e => setForm(f => ({ ...f, socialMediaTitle: e.target.value }))} placeholder="Spring Boot Masterclass" />
            </Field>
            <Field label="searchEngineTitle (Google SEO)">
              <Input value={form.searchEngineTitle} onChange={e => setForm(f => ({ ...f, searchEngineTitle: e.target.value }))} placeholder="Spring Boot Masterclass | Xebia LMS" />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="courseDescription (JSON-LD)">
              <Textarea value={form.courseDescriptionSeo} onChange={e => setForm(f => ({ ...f, courseDescriptionSeo: e.target.value }))} rows={2} placeholder="Same or shorter version of your course description..." />
            </Field>
            <Field label="courseDescription (Twitter)">
              <Textarea value={form.courseDescriptionTwitter} onChange={e => setForm(f => ({ ...f, courseDescriptionTwitter: e.target.value }))} rows={2} placeholder="Tweet-sized description..." />
            </Field>
          </FormRow>
        </div>
      </SectionCard>

      <SectionCard color="#f97316" title="Open Graph (Social Media)" icon="📱">
        <div className="space-y-4">
          <FormRow>
            <Field label="ogTitle">
              <Input value={form.ogTitle} onChange={e => setForm(f => ({ ...f, ogTitle: e.target.value }))} placeholder="Spring Boot Masterclass" />
            </Field>
            <Field label="ogType">
              <Select value={form.ogType} onChange={e => setForm(f => ({ ...f, ogType: e.target.value }))}>
                {['website', 'article', 'course', 'video.movie'].map(t => <option key={t}>{t}</option>)}
              </Select>
            </Field>
          </FormRow>
          <Field label="ogDescription (*)">
            <Textarea value={form.ogDescription} onChange={e => setForm(f => ({ ...f, ogDescription: e.target.value }))} rows={2} placeholder="OG description for Facebook, LinkedIn..." />
          </Field>
          <FormRow>
            <Field label="ogImage (***)" hint="1200×630 recommended">
              <Input value={form.ogImage} onChange={e => setForm(f => ({ ...f, ogImage: e.target.value }))} placeholder="https://..." />
            </Field>
            <Field label="ogUrl (***)" hint="Canonical URL for OG">
              <Input value={form.ogUrl} onChange={e => setForm(f => ({ ...f, ogUrl: e.target.value }))} placeholder="https://..." />
            </Field>
          </FormRow>
        </div>
      </SectionCard>

      <SectionCard color="#1da1f2" title="Twitter" icon="🐦">
        <div className="space-y-4">
          <FormRow>
            <Field label="twitterTitle (*)">
              <Input value={form.twitterTitle} onChange={e => setForm(f => ({ ...f, twitterTitle: e.target.value }))} placeholder="Spring Boot Masterclass" />
            </Field>
            <Field label="twitterCard (label)">
              <Select value={form.twitterCard} onChange={e => setForm(f => ({ ...f, twitterCard: e.target.value }))}>
                {['summary', 'summary_large_image', 'app', 'player'].map(t => <option key={t}>{t}</option>)}
              </Select>
            </Field>
          </FormRow>
          <Field label="twitterDescription (*)">
            <Textarea value={form.twitterDescription} onChange={e => setForm(f => ({ ...f, twitterDescription: e.target.value }))} rows={2} placeholder="Short Twitter description..." />
          </Field>
          <Field label="twitterImage (***)" hint="Twitter card image">
            <Input value={form.twitterImage} onChange={e => setForm(f => ({ ...f, twitterImage: e.target.value }))} placeholder="https://..." />
          </Field>
        </div>
      </SectionCard>

      <SectionCard color="#8b5cf6" title="Structured Data (JSON-LD)" icon="📊">
        <div className="space-y-4">
          <Field label="courseCode">
            <Input value={form.courseCode} onChange={e => setForm(f => ({ ...f, courseCode: e.target.value }))} placeholder="spring-boot-masterclass-001" />
          </Field>
          <div className="space-y-2">
            {[
              { label: 'breadcrumb (JSON-LD)', key: 'breadcrumb', placeholder: '{"@type":"BreadcrumbList","itemListElement":[...]}' },
              { label: 'faqSchema (JSON-LD)', key: 'faqSchema', placeholder: '{"@type":"FAQPage","mainEntity":[...]}' },
              { label: 'reviewSchema (JSON-LD)', key: 'reviewSchema', placeholder: '{"@type":"AggregateRating",...}' },
            ].map(({ label, key, placeholder }) => (
              <Field key={key} label={label}>
                <Textarea
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  rows={3}
                  placeholder={placeholder}
                  className="font-mono text-xs"
                />
              </Field>
            ))}
          </div>
          <Field label="legalText (***)" hint="Legal disclaimer shown on course page">
            <Textarea value={form.legalText} onChange={e => setForm(f => ({ ...f, legalText: e.target.value }))} rows={2} placeholder="Standard legal disclaimer..." />
          </Field>
        </div>
      </SectionCard>

      <SectionCard color="#6b7280" title="Tracking" icon="📈">
        <div className="space-y-4">
          <FormRow>
            <Field label="trackingId (*)">
              <Input value={form.trackingId} onChange={e => setForm(f => ({ ...f, trackingId: e.target.value }))} placeholder="Spring Boot Masterclass" />
            </Field>
            <Field label="LabelCard (alias / label)">
              <Select value={form.labelCard} onChange={e => setForm(f => ({ ...f, labelCard: e.target.value }))}>
                {['None', 'New', 'Bestseller', 'Popular', 'Updated', 'Free'].map(l => <option key={l}>{l}</option>)}
              </Select>
            </Field>
          </FormRow>
          <Field label="Note Description">
            <Input value={form.noteDescription} onChange={e => setForm(f => ({ ...f, noteDescription: e.target.value }))} placeholder="To the landing description" />
          </Field>
          <Field label="Badge Image (***)" hint="Enter Badge Image URL">
            <Input value={form.badgeImage} onChange={e => setForm(f => ({ ...f, badgeImage: e.target.value }))} placeholder="https://..." />
          </Field>
          <Field label="Build Image (***)" hint="Enter Build Image URL">
            <Input value={form.buildImage} onChange={e => setForm(f => ({ ...f, buildImage: e.target.value }))} placeholder="https://..." />
          </Field>
        </div>
      </SectionCard>

      <SectionCard color="#ec4899" title="Configurations (A/B testing | Advanced)" icon="🧪">
        <div className="space-y-4">
          <FormRow>
            <Field label="variantA/B (***)" hint="A/B test variant slug">
              <Input value={form.variantA} onChange={e => setForm(f => ({ ...f, variantA: e.target.value }))} placeholder="variant-a" />
            </Field>
            <Field label="variantB/B (***)" hint="Comparison variant slug">
              <Input value={form.variantB} onChange={e => setForm(f => ({ ...f, variantB: e.target.value }))} placeholder="variant-b" />
            </Field>
          </FormRow>
          <Field label="legalText (***) · Site-wide legal override">
            <Textarea value={form.legalTextOverride} onChange={e => setForm(f => ({ ...f, legalTextOverride: e.target.value }))} rows={2} placeholder="Optional site-wide legal override..." />
          </Field>
        </div>
      </SectionCard>

      <div className="bg-gray-50 dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">SEO Score</p>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-[#2e2e3e] flex items-center justify-center relative">
            <span className={clsx('text-xl font-black', scoreColor)}>{seoScore}</span>
          </div>
          <div className="text-sm text-gray-500">
            {seoScore >= 70 ? '✅ Good SEO coverage' : seoScore >= 40 ? '⚠️ Needs improvement' : '❌ Missing key SEO fields'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateCourse({ editData, categories = [], onBack, onSaved }) {
  const { addToast } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [generatingField, setGeneratingField] = useState(null);
  const [duplicateError, setDuplicateError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const handleAIGenerate = async (field, generatorFn) => {
    if (!form.title.trim()) {
      addToast('Please enter a course title first', 'error');
      return;
    }
    const cat = categories.find(c => String(c.id) === String(form.categoryId));
    const categoryName = cat ? cat.name : 'General';
    setGeneratingField(field);
    try {
      let result = await generatorFn(form.title.trim(), categoryName, form.level);
      if (field === 'title') {
        const generatedSlug = result.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setForm(f => ({ ...f, title: result, slug: generatedSlug }));
      } else {
        setForm(f => ({ ...f, [field]: result }));
      }
      addToast(`AI generated successfully!`, 'success');
    } catch (e) {
      addToast(e.message, 'error');
    } finally {
      setGeneratingField(null);
    }
  };

  const parseDuration = (durStr) => {
    if (!durStr) return { h: '', m: '' };
    const hMatch = durStr.match(/(\d+)\s*(h|hrs|hours)/i);
    const mMatch = durStr.match(/(\d+)\s*(m|min|mins)/i);
    return { h: hMatch ? hMatch[1] : '', m: mMatch ? mMatch[1] : '' };
  };

  const [form, setForm] = useState({
    title: editData?.title || '',
    categoryId: editData?.categoryId || '',
    level: LEVELS.find(l => l.toLowerCase() === (editData?.difficultyLevel || editData?.level || '').toLowerCase()) || 'Beginner',
    language: editData?.language || 'English',
    durationHours: editData?.durationHours || (editData?.duration ? parseDuration(editData.duration).h : ''),
    durationMinutes: editData?.durationMinutes || (editData?.duration ? parseDuration(editData.duration).m : ''),
    shortDescription: editData?.shortDescription || editData?.subtitle || '',
    description: editData?.description || '',
    icon: editData?.icon || '',
    thumbnail: editData?.thumbnail || editData?.thumbnailImageUrl || '',
    bannerImage: editData?.bannerImage || editData?.promoImageUrl || '',
    previewVideoUrl: editData?.previewVideoUrl || '',
    coursePriceUrl: editData?.coursePriceUrl || '',
    learningOutcomes: editData?.learningOutcomes || [''],
    prerequisites: editData?.prerequisites || [''],
    targetAudience: editData?.targetAudience || [''],
    highlights: Array.isArray(editData?.highlights) ? editData.highlights : (editData?.highlights ? editData.highlights.split('\n').filter(Boolean) : ['']),
    careerOpportunities: Array.isArray(editData?.careerOpportunities) ? editData.careerOpportunities : (editData?.careerOpportunities ? editData.careerOpportunities.split('\n').filter(Boolean) : ['']),
    active: editData?.isActive !== false && editData?.active !== false,
    isPublished: editData?.published || editData?.isPublished || false,
    isFeatured: editData?.isFeatured || false,
    allowEnrolling: editData?.allowEnrolling !== false,
    showOnCourse: editData?.showOnCourse !== false,
    seoTitle: editData?.seoTitle || '',
    seoDescription: editData?.seoDescription || editData?.metaDescription || '',
    canonicalUrl: editData?.canonicalUrl || '',
    robots: editData?.robots || 'index, follow',
    metaKeywords: editData?.metaKeywords || '',
    primaryKeyword: editData?.primaryKeyword || '',
    focusKeyphrase: editData?.focusKeyphrase || '',
    focusKeyword: editData?.focusKeyword || '',
    socialMediaTitle: editData?.socialMediaTitle || '',
    searchEngineTitle: editData?.searchEngineTitle || '',
    courseDescriptionSeo: editData?.courseDescriptionSeo || '',
    courseDescriptionTwitter: editData?.courseDescriptionTwitter || '',
    ogTitle: editData?.ogTitle || '',
    ogType: editData?.ogType || 'website',
    ogDescription: editData?.ogDescription || '',
    ogImage: editData?.ogImage || '',
    ogUrl: editData?.ogUrl || '',
    twitterTitle: editData?.twitterTitle || '',
    twitterCard: editData?.twitterCard || 'summary_large_image',
    twitterDescription: editData?.twitterDescription || '',
    twitterImage: editData?.twitterImage || '',
    courseCode: editData?.courseCode || editData?.slug || '',
    breadcrumb: editData?.breadcrumb || '',
    faqSchema: editData?.faqSchema || '',
    reviewSchema: editData?.reviewSchema || '',
    legalText: editData?.legalText || '',
    trackingId: editData?.trackingId || '',
    labelCard: editData?.labelCard || 'None',
    noteDescription: editData?.noteDescription || '',
    badgeImage: editData?.badgeImage || '',
    buildImage: editData?.buildImage || '',
    variantA: editData?.variantA || '',
    variantB: editData?.variantB || '',
    legalTextOverride: editData?.legalTextOverride || '',
  });

  const handleSave = async (asDraft = false) => {
    if (!form.title?.trim() || !form.categoryId || !form.durationHours || !form.level || !form.shortDescription?.trim() || !form.description?.trim()) { 
      setValidationError('Please fill in all mandatory fields (Title, Duration, Category, Level, and both Descriptions) before saving.'); 
      return; 
    }
    setIsSaving(true);
    try {
      const allCourses = await CourseService.getCourses();
      const isDuplicate = allCourses.some(c => 
        (c.title || '').trim().toLowerCase() === form.title.trim().toLowerCase() && 
        String(c.categoryId) === String(form.categoryId) &&
        (c.difficultyLevel || c.level || 'Beginner').toLowerCase() === form.level.toLowerCase() &&
        c.id !== editData?.id
      );
      if (isDuplicate) {
        setDuplicateError(form.title.trim());
        setIsSaving(false);
        return;
      }

      const payload = {
        title: form.title,
        courseCode: form.courseCode || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        categoryId: form.categoryId,
        level: form.level,
        language: form.language,
        duration: form.durationHours && form.durationMinutes ? `${form.durationHours}h ${form.durationMinutes}m` : (form.durationHours ? `${form.durationHours} hrs` : ''),
        durationHours: parseInt(form.durationHours) || 0,
        durationMinutes: parseInt(form.durationMinutes) || 0,
        shortDescription: form.shortDescription,
        description: form.description,
        icon: form.icon,
        thumbnail: form.thumbnail,
        bannerImage: form.bannerImage,
        previewVideoUrl: form.previewVideoUrl,
        published: asDraft ? false : true,
        active: form.active,
        isActive: form.active,
        isFeatured: form.isFeatured,
        allowEnrolling: form.allowEnrolling,
        learningOutcomes: form.learningOutcomes.filter(Boolean),
        prerequisites: form.prerequisites.filter(Boolean),
        targetAudience: form.targetAudience.filter(Boolean),
        highlights: form.highlights.filter(Boolean),
        careerOpportunities: form.careerOpportunities.filter(Boolean),
        seoTitle: form.seoTitle,
        seoDescription: form.seoDescription,
        metaKeywords: typeof form.metaKeywords === 'string' ? form.metaKeywords.split(',').map(s => s.trim()).filter(Boolean) : (form.metaKeywords || []),
        ogTitle: form.ogTitle,
        ogDescription: form.ogDescription,
        ogImage: form.ogImage,
        twitterTitle: form.twitterTitle,
        twitterDescription: form.twitterDescription,
      };

      let result;
      if (editData?.id) {
        result = await CourseService.updateCourse(editData.id, payload);
        addToast(`Course "${form.title}" updated!`, 'success');
      } else {
        result = await CourseService.createCourse(payload);
        addToast(`Course "${form.title}" created!`, 'success');
      }
      if (onSaved) onSaved(result);
      else onBack();
    } catch (err) {
      addToast(err.message || 'Failed to save course.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const selectedCat = categories.find(c => String(c.id) === String(form.categoryId));
  const seoScore = Math.min(100, [form.seoTitle, form.seoDescription, form.ogTitle, form.metaKeywords].filter(Boolean).length * 18);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <button onClick={onBack} className="hover:text-gray-800 dark:hover:text-white transition-colors">Dashboard</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={onBack} className="hover:text-gray-800 dark:hover:text-white transition-colors">Courses</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white font-medium">{editData ? 'Edit Course' : 'Create Course'} — {STEPS[currentStep].label}</span>
        </div>
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={clsx(
                'px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors',
                i === currentStep 
                  ? 'text-white border-transparent' 
                  : i < currentStep 
                    ? 'border-[#01AC9F]/30 text-[#01AC9F] bg-[#01AC9F]/5' 
                    : 'border-gray-200 dark:border-[#2e2e3e] text-gray-400 bg-white dark:bg-[#15151f]'
              )}
              style={i === currentStep ? { backgroundColor: BRAND } : {}}
            >
              {i < currentStep ? '✓ ' : ''}{s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg" style={{ backgroundColor: BRAND }}>
              {currentStep === 0 ? '🎓' : '🔍'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {editData ? 'Edit Course' : 'Create Course'} — {STEPS[currentStep].label}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentStep === 0 ? 'Establish course name, content, level and prerequisites.' : 'Set up this page to rank higher and optimise SEO titles.'}
              </p>
            </div>
          </div>

            {currentStep === 0 && <BasicDetailsStep form={form} setForm={setForm} categories={categories} generatingField={generatingField} handleAIGenerate={handleAIGenerate} />}
            {currentStep === 1 && <SeoMetaStep form={form} setForm={setForm} />}
        </div>

        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4 self-start lg:sticky lg:top-4">
          <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl overflow-hidden shadow-sm transition-colors">
            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-[#2e2e3e]">
              <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Card Preview</p>
            </div>
            <div className="p-3">
              <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-[#2e2e3e]">
                <div className="h-24 bg-gray-100 dark:bg-[#1a1a24] overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 z-0">
                    <span className="text-3xl font-bold opacity-30 uppercase">{form.title ? form.title.substring(0, 2) : 'CO'}</span>
                  </div>
                  {form.thumbnail && (
                    <img
                      src={form.thumbnail}
                      alt=""
                      className="w-full h-full object-cover relative z-10"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  )}
                  
                  {/* Floating Badges */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 z-20 items-end pointer-events-none">
                    <span className={clsx(
                      'text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm',
                      form.isPublished ? 'bg-purple-600 text-white' : 'bg-amber-500 text-white'
                    )}>
                      {form.isPublished ? 'Published' : 'Draft'}
                    </span>
                    <span className={clsx(
                      'text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm',
                      form.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    )}>
                      {form.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-2 bg-white dark:bg-[#1a1a24]">
                  <div className="flex gap-1.5 flex-wrap">
                    {selectedCat && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6C1D5F]/10 dark:bg-[#84117C]/20 text-[#6C1D5F] dark:text-[#84117C]">{selectedCat.name}</span>}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">{form.level}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">{form.title || 'Spring Boot Masterclass'}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 line-clamp-2">{form.shortDescription || 'Course description preview...'}</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-0.5"><Globe className="w-2.5 h-2.5" />{form.language}</span>
                    <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{form.durationHours || '0'} hrs</span>
                    <span className="flex items-center gap-0.5"><BookOpen className="w-2.5 h-2.5" />0 Modules</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#15151f] border border-gray-200 dark:border-[#2e2e3e] rounded-xl p-4 shadow-sm transition-colors">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Summary</p>
            <div className="space-y-2">
              {[
                { label: 'Title', val: form.title, ok: !!form.title },
                { label: 'Level', val: form.level, ok: true },
                { label: 'Language', val: form.language, ok: true },
                { label: 'Duration', val: form.durationHours ? `${form.durationHours} hrs` : '—', ok: !!form.durationHours },
                { label: 'Description', val: form.description ? 'Filled' : 'Empty', ok: !!form.description },
                { label: 'Status', val: form.active ? 'Active' : 'Inactive', ok: true },
              ].map(({ label, val, ok }) => (
                <div key={label} className="flex justify-between items-center text-[12px]">
                  <span className="text-gray-500 dark:text-gray-400">{label}</span>
                  <span className={clsx('font-medium flex items-center gap-1', ok ? 'text-gray-800 dark:text-gray-200' : 'text-orange-400')}>
                    {val ? (val.length > 16 ? val.slice(0, 14) + '...' : val) : '—'}
                    {ok ? <Check className="w-3 h-3 text-[#01AC9F]" /> : <AlertCircle className="w-3 h-3 text-orange-400" />}
                  </span>
                </div>
              ))}
              {currentStep === 1 && (
                <div className="pt-2 border-t border-gray-100 dark:border-[#2e2e3e]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-500 dark:text-gray-400">SEO Score</span>
                    <span className={clsx('text-sm font-black', seoScore >= 70 ? 'text-[#01AC9F]' : 'text-orange-400')}>{seoScore}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="w-full py-2.5 rounded-xl border-2 border-gray-200 dark:border-[#2e2e3e] text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-[#1a1a24] transition-colors disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="w-full py-2.5 rounded-xl bg-[#6C1D5F] hover:bg-[#5a184f] text-white font-bold transition-all shadow-[0_4px_14px_-4px_rgba(108,29,95,0.5)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : (editData?.id ? 'Publish Changes' : 'Publish Course')}
            </button>
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
                A course named <span className="font-semibold text-gray-800 dark:text-gray-200">"{duplicateError}"</span> with the same Category and Level already exists. Please make it unique.
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
