'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  RefreshCcw, 
  Building2, 
  Server, 
  DollarSign, 
  Activity, 
  HardDrive, 
  Settings, 
  BookOpen,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Receipt,
  TicketIcon,
  MapPin,
  Clock
} from 'lucide-react'
import clsx from 'clsx'

interface MenuItem {
  name: string
  href: string
  icon: any
  subItems?: { name: string; href: string }[]
  roles?: string[]
}

interface MenuCategory {
  category: string
  icon: any
  items: MenuItem[]
  roles?: string[]
}

const menuCategories: MenuCategory[] = [
  // Dashboard
  {
    category: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'BILLING', 'NOC', 'CS', 'TECHNICIAN'],
    items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['ADMIN', 'BILLING', 'NOC', 'CS', 'TECHNICIAN'] },
    ]
  },
  
  // Data Master Pelanggan
  {
    category: 'Data Master',
    icon: Building2,
    roles: ['ADMIN', 'BILLING', 'CS'],
    items: [
      { name: 'Pelanggan', href: '/pelanggan', icon: Building2, roles: ['ADMIN', 'BILLING', 'CS'] },
      { name: 'Paket Layanan', href: '/paket', icon: Package, roles: ['ADMIN', 'BILLING', 'CS'] },
      { name: 'Layanan Aktif', href: '/layanan', icon: Server, roles: ['ADMIN', 'BILLING', 'CS'] },
    ]
  },
  
  // Keuangan & Billing
  {
    category: 'Keuangan',
    icon: DollarSign,
    roles: ['ADMIN', 'BILLING', 'CS'],
    items: [
      { name: 'Invoice', href: '/invoice', icon: Receipt, roles: ['ADMIN', 'BILLING', 'CS'] },
      { name: 'Transaksi', href: '/transaksi', icon: FileText, roles: ['ADMIN', 'BILLING'] },
      { name: 'Laporan Keuangan', href: '/keuangan', icon: DollarSign, roles: ['ADMIN', 'BILLING'] },
    ]
  },
  
  // Operasional & Support
  {
    category: 'Operasional',
    icon: Activity,
    roles: ['ADMIN', 'BILLING', 'NOC', 'CS', 'TECHNICIAN'],
    items: [
      { name: 'Operational', href: '/operational', icon: Activity, roles: ['ADMIN', 'BILLING', 'NOC', 'CS', 'TECHNICIAN'] },
      { name: 'Ticket Support', href: '/tickets', icon: TicketIcon, roles: ['ADMIN', 'CS', 'TECHNICIAN'] },
      { 
        name: 'Field Service', 
        href: '/field-service', 
        icon: MapPin, 
        roles: ['ADMIN', 'NOC'],
        subItems: [
          { name: 'Dispatcher', href: '/field-service' },
          { name: 'Monitor Teknisi', href: '/technician-monitoring' }
        ]
      },
      { name: 'Check In Job', href: '/technician-checkin', icon: MapPin, roles: ['TECHNICIAN'] },
    ]
  },
  
  // Infrastruktur & Perangkat
  {
    category: 'Infrastruktur',
    icon: HardDrive,
    roles: ['ADMIN', 'NOC', 'TECHNICIAN'],
    items: [
      { 
        name: 'Infrastruktur', 
        href: '/infrastruktur', 
        icon: HardDrive,
        roles: ['ADMIN', 'NOC', 'TECHNICIAN'],
        subItems: [
          { name: 'ODP', href: '/infrastruktur/odp' },
          { name: 'Map Perangkat', href: '/infrastruktur/map' }
        ]
      },
      { name: 'Mikrotik', href: '/mikrotik', icon: Users, roles: ['ADMIN', 'NOC', 'TECHNICIAN'] },
      { name: 'GenieACS', href: '/genieacs', icon: RefreshCcw, roles: ['ADMIN', 'NOC', 'TECHNICIAN'] },
      { name: 'Modem Monitor', href: '/modem-monitor', icon: Activity, roles: ['ADMIN', 'NOC', 'TECHNICIAN'] },
    ]
  },
  
  // HRM - Human Resource Management
  {
    category: 'HRM',
    icon: Users,
    roles: ['ADMIN', 'TECHNICIAN', 'NOC', 'CS', 'BILLING'],
    items: [
      { name: 'HRM Dashboard', href: '/hrm-dashboard', icon: Activity, roles: ['ADMIN', 'TECHNICIAN', 'NOC', 'CS', 'BILLING'] },
      // Attendance Section
      { name: 'Absensi Saya', href: '/attendance', icon: Clock, roles: ['TECHNICIAN', 'NOC', 'CS', 'BILLING'] },
      { name: 'Pelacakan Langsung', href: '/attendance-monitoring', icon: MapPin, roles: ['ADMIN'] },
      // Employee Management (Admin only)
      { name: 'Data Karyawan', href: '/karyawan', icon: Users, roles: ['ADMIN'] },
      // Payroll & Benefits
      { name: 'Gaji & Payroll', href: '/gaji', icon: DollarSign, roles: ['ADMIN', 'TECHNICIAN', 'NOC', 'CS', 'BILLING'] },
      // Leave & Schedule
      { name: 'Pengajuan Cuti', href: '/cuti', icon: FileText, roles: ['ADMIN', 'TECHNICIAN', 'NOC', 'CS', 'BILLING'] },
      { name: 'Jadwal Kerja', href: '/jadwal-kerja', icon: Clock, roles: ['ADMIN', 'TECHNICIAN', 'NOC', 'CS', 'BILLING'] },
      // Performance
      { name: 'Kinerja', href: '/kinerja', icon: Activity, roles: ['ADMIN', 'TECHNICIAN', 'NOC', 'CS', 'BILLING'] },
    ]
  },
  
  // Laporan & Analytics
  {
    category: 'Laporan',
    icon: FileText,
    roles: ['ADMIN', 'BILLING'],
    items: [
      { name: 'Analytics', href: '/analytics', icon: Activity, roles: ['ADMIN', 'BILLING'] },
      { name: 'Reports', href: '/reports', icon: FileText, roles: ['ADMIN', 'BILLING'] },
    ]
  },
  
  // Sistem & Admin
  {
    category: 'Sistem',
    icon: Settings,
    roles: ['ADMIN'],
    items: [
      { name: 'Franchise', href: '/franchise', icon: Building2, roles: ['ADMIN'] },
      { name: 'Backup', href: '/backup', icon: HardDrive, roles: ['ADMIN'] },
      { name: 'Audit Logs', href: '/audit-logs', icon: Activity, roles: ['ADMIN'] },
      { name: 'Pengaturan', href: '/pengaturan', icon: Settings, roles: ['ADMIN', 'BILLING', 'NOC', 'CS', 'TECHNICIAN'] },
    ]
  },
  
  // Bantuan
  {
    category: 'Bantuan',
    icon: BookOpen,
    roles: ['ADMIN', 'BILLING', 'NOC', 'CS', 'TECHNICIAN'],
    items: [
      { name: 'Dokumentasi', href: '/dokumentasi', icon: BookOpen, roles: ['ADMIN', 'BILLING', 'NOC', 'CS', 'TECHNICIAN'] },
      { name: '🔧 Test API', href: '/test-api', icon: Settings, roles: ['ADMIN'] },
    ]
  },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Dashboard'])
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    )
  }

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    )
  }

  const isActive = (href: string) => {
    return router.pathname === href
  }

  const isParentActive = (item: MenuItem) => {
    if (isActive(item.href)) return true
    if (item.subItems) {
      return item.subItems.some(sub => isActive(sub.href))
    }
    return false
  }

  const isCategoryActive = (category: MenuCategory) => {
    return category.items.some(item => isParentActive(item))
  }

  // Filter categories and items based on user role
  const filteredCategories = menuCategories
    .map(category => ({
      ...category,
      items: category.items.filter(item => {
        if (!item.roles || item.roles.length === 0) return true
        if (!user) return false
        return item.roles.some(role => role.toUpperCase() === user.role.toUpperCase())
      })
    }))
    .filter(category => {
      // Show category if it has items OR if user has access to category
      if (category.items.length === 0) return false
      if (!category.roles || category.roles.length === 0) return true
      if (!user) return false
      return category.roles.some(role => role.toUpperCase() === user.role.toUpperCase())
    })

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 shadow-lg transition-transform duration-300 z-40 flex flex-col',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'w-64'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center transform -rotate-12">
              <div className="w-6 h-6 border-2 border-white rounded transform rotate-12"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">AudiraNET</h1>
              {user && (
                <p className="text-xs text-gray-600">
                  {user.role === 'BILLING' || user.role === 'CS' ? 'Admin Billing' : 
                   user.role === 'NOC' || user.role === 'TECHNICIAN' ? 'Admin NOC' : 'Admin'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4 px-3 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {filteredCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon
              const isCategoryExpanded = expandedCategories.includes(category.category)
              const categoryActive = isCategoryActive(category)

              return (
                <li key={category.category}>
                  {/* Category Header */}
                  <div
                    className={clsx(
                      'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-bold transition-all cursor-pointer mb-1',
                      categoryActive
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                    onClick={() => toggleCategory(category.category)}
                  >
                    <div className="flex items-center space-x-2">
                      <CategoryIcon size={18} />
                      <span>{category.category}</span>
                    </div>
                    <div>
                      {isCategoryExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </div>
                  </div>

                  {/* Category Items */}
                  {isCategoryExpanded && (
                    <ul className="mt-1 space-y-0.5 ml-2">
                      {category.items.map((item) => {
                        const Icon = item.icon
                        const hasSubItems = item.subItems && item.subItems.length > 0
                        const isExpanded = expandedItems.includes(item.name)
                        const active = isParentActive(item)

                        return (
                          <li key={item.name}>
                            <div
                              className={clsx(
                                'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all cursor-pointer',
                                active
                                  ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-600'
                                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-800'
                              )}
                              onClick={() => {
                                if (hasSubItems) {
                                  toggleExpanded(item.name)
                                } else {
                                  router.push(item.href)
                                  setIsMobileOpen(false)
                                }
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                <Icon size={16} />
                                <span className="text-xs">{item.name}</span>
                              </div>
                              {hasSubItems && (
                                <div>
                                  {isExpanded ? (
                                    <ChevronDown size={14} className="text-gray-400" />
                                  ) : (
                                    <ChevronRight size={14} className="text-gray-400" />
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Sub Items */}
                            {hasSubItems && isExpanded && (
                              <ul className="mt-1 ml-6 space-y-0.5">
                                {item.subItems!.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      className={clsx(
                                        'block rounded-lg px-3 py-1.5 text-xs transition-all',
                                        isActive(subItem.href)
                                          ? 'bg-blue-200 text-blue-900 font-semibold'
                                          : 'text-gray-500 hover:bg-blue-50 hover:text-blue-800'
                                      )}
                                      onClick={() => setIsMobileOpen(false)}
                                    >
                                      • {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        {user && (
          <div className="p-4 border-t border-blue-200 bg-blue-50 flex-shrink-0">
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
