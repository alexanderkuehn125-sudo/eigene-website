import re

with open('src/routes/do.tsx', 'r') as f:
    do_content = f.read()

with open('src/routes/be.tsx', 'r') as f:
    be_content = f.read()

do_cursor = do_content[do_content.find('function CustomCursor() {'):]

be_new = be_content[:be_content.find('function CustomCursor() {')] + do_cursor

with open('src/routes/be.tsx', 'w') as f:
    f.write(be_new)
