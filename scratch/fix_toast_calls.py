import os

files = [
    r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\components\dashboard\NocDashboardView.tsx',
    r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\components\dashboard\TechnicianDashboardView.tsx',
    r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\components\RoleSwitcherBar.tsx',
]

for p in files:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('const { showToast } = useToast()', 'const { toast } = useToast()')
    content = content.replace("showToast(", "toast.info(")
    content = content.replace("toast.info(err.message, 'error')", "toast.error(err.message)")
    content = content.replace(", 'success')", ")").replace(", 'info')", ")").replace(", 'error')", ")")

    with open(p, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'Fixed toast in {os.path.basename(p)}')

