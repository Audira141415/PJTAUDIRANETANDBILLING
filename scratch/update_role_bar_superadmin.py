import os

path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\components\RoleSwitcherBar.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

old_roles = """const ROLES: RoleOption[] = [
  {
    role: 'OWNER',
    label: 'Owner / Superadmin',
    shortLabel: 'Owner',
    icon: Crown,
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-500/40',
    description: 'Akses Penuh: Laba Rugi, Cashflow, Beban Payroll, Pajak 11%, dan Uptime SLA Makro.',
  },"""

new_roles = """const ROLES: RoleOption[] = [
  {
    role: 'SUPERADMIN',
    label: 'Superadmin / Owner (Akses Penuh)',
    shortLabel: 'Superadmin',
    icon: Crown,
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-500/40',
    description: 'Hak Akses Tertinggi: Buka SEMUA 7 kelompok menu (Finansial, Gaji, Core BGP, OLT, Pelanggan, Audit).',
  },"""

assert old_roles in c, 'old_roles not found'
c = c.replace(old_roles, new_roles)

# Also handle activeRoleOption matching
old_match = "const activeRoleOption = ROLES.find(r => r.role === currentRole) || ROLES[0]"
new_match = """const isSuperRole = currentRole === 'SUPERADMIN' || currentRole === 'OWNER' || currentRole === 'ADMIN'
  const activeRoleOption = isSuperRole ? ROLES[0] : (ROLES.find(r => r.role === currentRole) || ROLES[0])"""

assert old_match in c, 'old_match not found'
c = c.replace(old_match, new_match)

# And in pill icon
c = c.replace(
    "activeRoleOption.role === 'OWNER'",
    "activeRoleOption.role === 'SUPERADMIN' || activeRoleOption.role === 'OWNER'"
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('RoleSwitcherBar.tsx updated with explicit Superadmin role!')

