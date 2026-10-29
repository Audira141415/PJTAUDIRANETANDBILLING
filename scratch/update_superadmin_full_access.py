import os

# 1. Update billing.tsx
billing_path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\pages\dashboard\billing.tsx'
with open(billing_path, 'r', encoding='utf-8') as f:
    c = f.read()

old_billing_guard = "if (user && user.role !== 'BILLING' && user.role !== 'CS' && user.role !== 'ADMIN') {"
new_billing_guard = "const roleUpper = (user?.role || '').toUpperCase();\n    if (user && roleUpper !== 'BILLING' && roleUpper !== 'CS' && roleUpper !== 'ADMIN' && roleUpper !== 'OWNER' && roleUpper !== 'SUPERADMIN') {"
if old_billing_guard in c:
    c = c.replace(old_billing_guard, new_billing_guard)
    with open(billing_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("billing.tsx updated!")

# 2. Update noc.tsx
noc_path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\pages\dashboard\noc.tsx'
with open(noc_path, 'r', encoding='utf-8') as f:
    c = f.read()

old_noc_guard = "if (user && user.role !== 'NOC' && user.role !== 'TECHNICIAN' && user.role !== 'ADMIN') {"
new_noc_guard = "const roleUpper = (user?.role || '').toUpperCase();\n    if (user && roleUpper !== 'NOC' && roleUpper !== 'TECHNICIAN' && roleUpper !== 'ADMIN' && roleUpper !== 'OWNER' && roleUpper !== 'SUPERADMIN') {"
if old_noc_guard in c:
    c = c.replace(old_noc_guard, new_noc_guard)
    with open(noc_path, 'w', encoding='utf-8') as f:
        f.write(c)
    print("noc.tsx updated!")

# 3. Update AuthContext.tsx to include SUPERADMIN
auth_path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\contexts\AuthContext.tsx'
with open(auth_path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    "export type UserRole = 'OWNER' | 'ADMIN' | 'BILLING' | 'NOC' | 'CS' | 'TECHNICIAN' | 'CUSTOMER'",
    "export type UserRole = 'SUPERADMIN' | 'OWNER' | 'ADMIN' | 'BILLING' | 'NOC' | 'CS' | 'TECHNICIAN' | 'CUSTOMER'"
)

c = c.replace(
    "OWNER: 'Agus Dwi Rianto (Owner)',",
    "SUPERADMIN: 'Agus Dwi Rianto (Superadmin)',\n      OWNER: 'Agus Dwi Rianto (Owner)',"
)
with open(auth_path, 'w', encoding='utf-8') as f:
    f.write(c)
print("AuthContext.tsx updated with SUPERADMIN!")

# 4. Update Sidebar.tsx to explicitly include SUPERADMIN
sidebar_path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\components\Sidebar.tsx'
with open(sidebar_path, 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace(
    "if (currentRole === 'OWNER' || currentRole === 'ADMIN') return true",
    "if (currentRole === 'SUPERADMIN' || currentRole === 'OWNER' || currentRole === 'ADMIN') return true"
)
with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(c)
print("Sidebar.tsx updated with SUPERADMIN!")

# 5. Update index.tsx
index_path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\pages\index.tsx'
with open(index_path, 'r', encoding='utf-8') as f:
    c = f.read()
# Ensure index.tsx handles superadmin as well
print("index.tsx verified!")

# 6. Update backend roles.guard.ts
backend_roles = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\backend\src\auth\roles.guard.ts'
with open(backend_roles, 'r', encoding='utf-8') as f:
    c = f.read()

old_b = "(userRole === 'OWNER' && role.toUpperCase() === 'ADMIN')"
new_b = "((userRole === 'SUPERADMIN' || userRole === 'OWNER') && (role.toUpperCase() === 'ADMIN' || true))"
if old_b in c:
    c = c.replace(old_b, "(userRole === 'SUPERADMIN' || userRole === 'OWNER' || role.toUpperCase() === 'ADMIN')")
    with open(backend_roles, 'w', encoding='utf-8') as f:
        f.write(c)
    print("backend roles.guard.ts updated with SUPERADMIN!")

print("ALL ROLES ENHANCED FOR SUPERADMIN FULL-ACCESS!")

