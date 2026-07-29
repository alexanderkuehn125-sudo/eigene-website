import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    if 'import { createPortal } from "react-dom";' not in content:
        # Add import
        content = re.sub(r'import \{[^}]*\} from "react";', r'\g<0>\nimport { createPortal } from "react-dom";', content)
        if 'createPortal' not in content:
            # Fallback if the import replacement didn't work
            content = 'import { createPortal } from "react-dom";\n' + content
            
    # Replace return ( <div ref={cursorRef} ... ) with return createPortal( ... , document.body )
    # Look for the return statement of CustomCursor
    cursor_return_pattern = r'(return \(\s*<div\s+ref=\{cursorRef\}\s+className="pointer-events-none fixed left-0 top-0 z-\[9999\] hidden md:flex".*?</div>\s*\);\s*\})'
    
    match = re.search(cursor_return_pattern, content, re.DOTALL)
    if match:
        original_return = match.group(1)
        new_return = original_return.replace('return (', 'return createPortal(').replace(');\n}', ',\n    document.body\n  );\n}')
        content = content.replace(original_return, new_return)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed {filepath}")
    else:
        print(f"Could not find return statement in {filepath}")

fix_file('src/routes/be.tsx')
fix_file('src/routes/do.tsx')
