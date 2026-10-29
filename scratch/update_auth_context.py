import os

path = r'f:\AUDIRA-NET-BILLING\AUDIRA-BILLING\apps\frontend\src\contexts\AuthContext.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update UserRole
old_role = "export type UserRole = 'ADMIN' | 'BILLING' | 'NOC' | 'CS' | 'TECHNICIAN'"
new_role = "export type UserRole = 'OWNER' | 'ADMIN' | 'BILLING' | 'NOC' | 'CS' | 'TECHNICIAN' | 'CUSTOMER'"
assert old_role in content, 'old_role not found'
content = content.replace(old_role, new_role)

# 2. Update AuthContextType
content = content.replace(
    '  logout: () => void\n  isLoading: boolean',
    '  logout: () => void\n  switchRole: (role: UserRole) => void\n  isLoading: boolean'
).replace(
    '  logout: () => void\r\n  isLoading: boolean',
    '  logout: () => void\r\n  switchRole: (role: UserRole) => void\r\n  isLoading: boolean'
)

# 3. Add switchRole implementation
old_logout = '  const logout = async () => {'
new_switch = '''  const switchRole = (newRole: UserRole) => {
    const roleUpper = newRole.toUpperCase() as UserRole
    const nameMap: Record<string, string> = {
      OWNER: 'Agus Dwi Rianto (Owner)',
      ADMIN: 'Agus Dwi Rianto (Admin)',
      NOC: 'Budi Santoso (NOC Engineer)',
      TECHNICIAN: 'Rudi Hartono (Teknisi Lapangan)',
      BILLING: 'Siti Rahmawati (Billing & Kasir)',
      CS: 'Dewi Lestari (Customer Service)',
      CUSTOMER: 'Ahmad Pratama (Pelanggan Mandiri)'
    }

    const updatedUser: User = {
      id: user?.id || 'usr-role-switch',
      email: `${roleUpper.toLowerCase()}@audira.net`,
      name: nameMap[roleUpper] || `${roleUpper} User`,
      role: roleUpper,
    }

    console.log('[Auth] Role switched dynamically to:', roleUpper)
    setUser(updatedUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const logout = async () => {'''

assert old_logout in content, 'old_logout not found'
content = content.replace(old_logout, new_switch)

# 4. Update Provider value
old_val = '<AuthContext.Provider value={{ user, login, logout, isLoading }}>'
new_val = '<AuthContext.Provider value={{ user, login, logout, switchRole, isLoading }}>'
assert old_val in content, 'old_val not found'
content = content.replace(old_val, new_val)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('AuthContext.tsx updated successfully!')

