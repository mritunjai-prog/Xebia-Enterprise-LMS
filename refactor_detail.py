import re

with open('src/admin/pages/Courses/Detail.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the hero banner
hero_pattern = r'<motion\.div[^>]*className="relative rounded-\[2rem\] overflow-hidden shadow-2xl border border-white/10 bg-black min-h-\[360px\] flex flex-col justify-end"[^>]*>[\s\S]*?</motion\.div>'
hero_replacement = """<div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start mb-8">
  <div className="w-32 h-32 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-5xl shrink-0 overflow-hidden">
    {formData.icon && (formData.icon.toLowerCase().startsWith('http') || formData.icon.toLowerCase().startsWith('data:image')) ? (
      <img src={formData.icon} alt="" className="w-full h-full object-cover" />
    ) : (
      formData.icon || '📚'
    )}
  </div>
  <div className="flex-1">
    <div className="flex items-center gap-2 mb-3">
      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
        {formData.category || 'NO CATEGORY'}
      </span>
      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
        {formData.level || 'BEGINNER'}
      </span>
      {formData.isFeatured && (
        <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
          <Star className="w-3 h-3" /> Featured
        </span>
      )}
    </div>
    <h2 className="text-3xl font-bold text-gray-900">{displayTitle}</h2>
    <p className="text-gray-500 mt-2 max-w-3xl">{formData.shortDescription || 'Enter a short description.'}</p>
  </div>
</div>"""

content = re.sub(hero_pattern, hero_replacement, content)

replacements = [
  ('bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl shadow-black/5', 'bg-white border-b border-gray-200 shadow-sm rounded-xl'),
  ('bg-secondary/50 border border-border/50', 'bg-gray-50 border border-gray-200'),
  ('bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 border border-white/10', 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'),
  ('text-foreground', 'text-gray-900'),
  ('text-muted-foreground', 'text-gray-500'),
  ('bg-background border-2 border-border/40 rounded-[2rem] shadow-xl', 'bg-white border border-gray-200 rounded-2xl shadow-sm'),
  ('bg-secondary/20 border-r border-border/40', 'bg-gray-50 border-r border-gray-200'),
  ('bg-background shadow-md border border-border/50', 'bg-white shadow-sm border border-gray-200 text-indigo-600'),
  ('hover:bg-secondary', 'hover:bg-gray-100'),
  ('bg-secondary/20 border border-border/40 backdrop-blur-sm', 'bg-white border border-gray-300 shadow-sm focus-within:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'),
  ('border-blue-500', 'border-indigo-500'),
  ('text-blue-500', 'text-indigo-600'),
  ('bg-secondary/50', 'bg-gray-50'),
  ('bg-secondary hover:bg-secondary/80', 'bg-gray-100 hover:bg-gray-200'),
  ('border-border/50', 'border-gray-200'),
  ('border-border/40', 'border-gray-200'),
  ('bg-background', 'bg-white')
]

for old, new in replacements:
    content = content.replace(old, new)

with open('src/admin/pages/Courses/Detail.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
