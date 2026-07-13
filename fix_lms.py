import sys
with open('src/context/LMSContext.jsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('export const LMSProvider = ({ children }) => {', 'export const LMSProvider = ({ children }) => {\n  console.log(\'LMSProvider mounted!\');')
with open('src/context/LMSContext.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
