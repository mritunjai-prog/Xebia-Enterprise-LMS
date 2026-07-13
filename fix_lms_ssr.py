import re

with open('src/context/LMSContext.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix useState initializers
content = re.sub(r'const data = localStorage\.getItem', r'const data = typeof window !== "undefined" ? localStorage.getItem', content)

# Fix useEffects writing to localStorage
# The useEffects are already safe because they only run on the client, but let's double check.
# Wait, useEffect only runs on the client anyway! So useState is the only issue.

with open('src/context/LMSContext.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
