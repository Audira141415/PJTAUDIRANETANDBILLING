import os

path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\components\Sidebar.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's inspect Keuangan & Akuntansi roles
old_keuangan = """      { 
        name: 'Keuangan & Akuntansi', 
        href: '/finance/dashboard', 
        icon: DollarSign, 
        roles: ['ADMIN', 'BILLING'],"""
new_keuangan = """      { 
        name: 'Keuangan & Akuntansi', 
        href: '/finance/dashboard', 
        icon: DollarSign, 
        roles: ['OWNER', 'ADMIN'],"""
assert old_keuangan in content, 'old_keuangan not found'
content = content.replace(old_keuangan, new_keuangan)

# Let's inspect HRM roles
old_hrm = """      { 
        name: 'Manajemen Karyawan', 
        href: '/hrm-dashboard', 
        icon: Users, 
        roles: ['ADMIN'],"""
new_hrm = """      { 
        name: 'Manajemen Karyawan', 
        href: '/hrm-dashboard', 
        icon: Users, 
        roles: ['OWNER', 'ADMIN'],"""
assert old_hrm in content, 'old_hrm not found'
content = content.replace(old_hrm, new_hrm)

# Let's inspect Sistem & Konfigurasi roles
old_settings = """      { 
        name: 'Pengaturan Sistem', 
        href: '/pengaturan', 
        icon: Settings, 
        roles: ['ADMIN', 'BILLING', 'NOC', 'CS', 'TECHNICIAN'],"""
new_settings = """      { 
        name: 'Pengaturan Sistem', 
        href: '/pengaturan', 
        icon: Settings, 
        roles: ['OWNER', 'ADMIN'],"""
assert old_settings in content, 'old_settings not found'
content = content.replace(old_settings, new_settings)

# Let's inspect Reports roles
old_reports = """      { 
        name: 'Pusat Laporan ISP', 
        href: '/reports', 
        icon: BarChart3, 
        roles: ['ADMIN', 'BILLING', 'CS'],"""
new_reports = """      { 
        name: 'Pusat Laporan ISP', 
        href: '/reports', 
        icon: BarChart3, 
        roles: ['OWNER', 'ADMIN', 'BILLING'],"""
assert old_reports in content, 'old_reports not found'
content = content.replace(old_reports, new_reports)

# Update the role filter logic to be rock-solid
old_filter = """      const roleFilteredItems = group.items.filter(item => {
        if (!user || !item.roles) return true
        return item.roles.some(role => role.toUpperCase() === user.role.toUpperCase())
      })"""

new_filter = """      const roleFilteredItems = group.items.filter(item => {
        if (!user) return true
        const currentRole = (user.role || '').toUpperCase()
        // Owner and Admin have access to all management modules
        if (currentRole === 'OWNER' || currentRole === 'ADMIN') return true
        // Customer has no access to admin management menus
        if (currentRole === 'CUSTOMER') return false
        if (!item.roles) return true
        return item.roles.some(role => role.toUpperCase() === currentRole)
      })"""

assert old_filter in content, 'old_filter not found'
content = content.replace(old_filter, new_filter)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Sidebar.tsx updated with strict RBAC rules successfully!')

