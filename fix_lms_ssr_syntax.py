import re

with open('src/context/LMSContext.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the syntax error: ? localStorage.getItem('x'); -> ? localStorage.getItem('x') : null;
content = re.sub(r'\? \n?localStorage\.getItem\((.*?)\);', r'? localStorage.getItem(\1) : null;', content)

with open('src/context/LMSContext.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
