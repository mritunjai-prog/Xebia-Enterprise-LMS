import os
import re

dir_path = 'src/pages'

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace import
            new_content = re.sub(
                r"from 'react-router-dom';",
                r"from '@tanstack/react-router';",
                content
            )
            
            # Replace navigate('/some/path') with navigate({ to: '/some/path' })
            # This regex looks for navigate('something') or navigate(something)
            new_content = re.sub(
                r"navigate\((['\"][^,]+['\"])\)",
                r"navigate({ to: \1 })",
                new_content
            )
            
            # Replace navigate('/some/path', { state: ... })
            # This is a bit more complex, we can handle the specific cases seen in the codebase
            new_content = re.sub(
                r"navigate\((['\"][^,]+['\"]),\s*({[^}]+})\)",
                r"navigate({ to: \1, ...\2 })",
                new_content
            )
            
            # One special case in AssessmentBuilder: navigate(location.pathname, { replace: true, state: {} });
            new_content = re.sub(
                r"navigate\(location\.pathname,\s*({[^}]+})\)",
                r"navigate({ to: location.pathname, ...\1 })",
                new_content
            )

            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {filepath}")
