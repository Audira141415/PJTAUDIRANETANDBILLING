import os

path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\pages\_app.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
import_stmt = "import RoleSwitcherBar from '@/components/RoleSwitcherBar'"
if import_stmt not in content:
    content = content.replace(
        "import Layout from '@/components/Layout'",
        "import Layout from '@/components/Layout'\nimport RoleSwitcherBar from '@/components/RoleSwitcherBar'"
    ).replace(
        "import Layout from '@/components/Layout'\r\n",
        "import Layout from '@/components/Layout'\r\nimport RoleSwitcherBar from '@/components/RoleSwitcherBar'\r\n"
    )

# Add component
target = "<RealtimeNotificationBanner />"
replacement = "<RealtimeNotificationBanner />\n              <RoleSwitcherBar />"
if "<RoleSwitcherBar />" not in content:
    content = content.replace(
        "<RealtimeNotificationBanner />",
        "<RealtimeNotificationBanner />\r\n              <RoleSwitcherBar />"
    )

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('_app.tsx updated with RoleSwitcherBar successfully!')

