import re

with open('src/admin/pages/Courses/HierarchyBuilder.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const BRAND = '#6C1D5F';", "const BRAND = '#4f46e5';")
content = content.replace("const BRAND_LIGHT = 'rgba(108,29,95,0.08)';", "const BRAND_LIGHT = '#e0e7ff';")
content = content.replace("const BRAND_MEDIUM = 'rgba(108,29,95,0.15)';", "const BRAND_MEDIUM = '#c7d2fe';")

replacements = [
    ('bg-background', 'bg-white'),
    ('bg-secondary', 'bg-gray-50'),
    ('border-border', 'border-gray-200'),
    ('text-foreground', 'text-gray-900'),
    ('text-muted-foreground', 'text-gray-500'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open('src/admin/pages/Courses/HierarchyBuilder.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated HierarchyBuilder')
