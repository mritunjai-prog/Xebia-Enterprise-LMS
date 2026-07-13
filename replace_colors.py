import os
import re

dir_path = 'src'

def replacer(match):
    prefix = match.group(1) # bg, text, border, etc
    color = match.group(2)  # purple, blue, emerald, etc
    shade = int(match.group(3)) # 50, 100, 500, etc
    suffix = match.group(4) or '' # /20, /30 etc
    
    # Determine the target brand color
    target_color = 'primary'
    if color in ['emerald', 'teal', 'blue', 'cyan', 'green']:
        target_color = 'accent-2'
    elif color in ['orange', 'red', 'rose', 'amber']:
        target_color = 'destructive'
    elif color in ['fuchsia', 'pink']:
        target_color = 'primary-glow'
    else:
        target_color = 'primary'
        
    # Determine shade/opacity
    if shade < 300:
        if prefix == 'bg':
            return f"{prefix}-{target_color}/{10 if shade <= 100 else 20}"
        elif prefix == 'border':
            return f"{prefix}-{target_color}/20"
        elif prefix == 'ring':
            return f"{prefix}-{target_color}/20"
        else:
            return f"{prefix}-{target_color}"
    elif shade > 700:
        return f"{prefix}-{target_color}"
    else:
        # Default mid-range
        return f"{prefix}-{target_color}{suffix}"

count = 0
for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Pattern: (bg|text|border|ring|from|to|via)-(purple|blue|emerald|teal|orange|red|fuchsia|pink|amber|cyan|green)-(\d{2,3})(/\d{1,2})?
            pattern = r'\b(bg|text|border|ring|from|to|via)-(purple|blue|emerald|teal|orange|red|fuchsia|pink|amber|cyan|green)-(\d{2,3})(/\d{1,3})?\b'
            
            new_content = re.sub(pattern, replacer, content)
                
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f"Updated {count} files.")
