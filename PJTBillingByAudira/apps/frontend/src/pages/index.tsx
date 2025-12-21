import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useAuth } from '@/contexts/AuthContext'
import api from '@/lib/api'
import { 
  CreditCard, 
  Clock, 
  Settings, 
  Store, 
  Server, 
  Users,
  ChevronDown,
  X,
  Info
} from 'lucide-react'

interface DashboardStats {
  revenue: {
    total: number
    period: string
    daysRemaining: number
    activeUntil: string
  }
  customers: {
    active: number
    isolated: number
    inactive: number
  }
  technicians: {
    total: number
    active: number
    inactive: number
  }
  locations: {
    total: number
    active: number
    inactive: number
  }
  devices: {
    total: number
    mikrotik: number
    odp: number
  }
  customers_total: {
    total: number
    pppoe: number
    ipStatic: number
  }
}

interface TicketStats {
  open: number
  onProgress: number
  resolved: number
  rejected: number
}

interface MonthlyRevenue {
  month: string
  amount: number
}

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState('November')
  const [selectedYear, setSelectedYear] = useState('2025')
  
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const years = ['2023', '2024', '2025']

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  // Fetch dashboard stats from API
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await api.dashboard.getStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      }
    }

    const fetchTicketStats = async () => {
      try {
        const tickets = await api.operational.getTickets()
        const stats = {
          open: tickets.filter((t: any) => t.status === 'open').length,
          onProgress: tickets.filter((t: any) => t.status === 'in-progress').length,
          resolved: tickets.filter((t: any) => t.status === 'resolved').length,
          rejected: tickets.filter((t: any) => t.status === 'rejected').length,
        }
        setTicketStats(stats)
      } catch (error) {
        console.error('Failed to fetch ticket stats:', error)
      }
    }

    const fetchRevenueData = async () => {
      try {
        const invoices = await api.keuangan.getInvoices()
        const revenueByMonth: { [key: string]: number } = {}
        
        // Initialize all months with 0
        months.forEach(month => {
          revenueByMonth[month] = 0
        })

        // Calculate revenue per month from invoices
        invoices.forEach((invoice: any) => {
          if (invoice.status === 'paid') {
            const date = new Date(invoice.paidDate || invoice.dueDate)
            const monthName = months[date.getMonth()]
            revenueByMonth[monthName] = (revenueByMonth[monthName] || 0) + invoice.amount
          }
        })

        const revenueData = months.map(month => ({
          month,
          amount: revenueByMonth[month]
        }))
        
        setMonthlyRevenue(revenueData)
      } catch (error) {
        console.error('Failed to fetch revenue data:', error)
      }
    }

    if (user) {
      fetchDashboardStats()
      fetchTicketStats()
      fetchRevenueData()
    }
  }, [user])

  const [stats, setStats] = useState<DashboardStats>({
    revenue: {
      total: 0,
      period: '-',
      daysRemaining: 3,
      activeUntil: '01 Desember 2025'
    },
    customers: {
      active: 2,
      isolated: 0,
      inactive: 0
    },
    technicians: {
      total: 0,
      active: 0,
      inactive: 0
    },
    locations: {
      total: 1,
      active: 1,
      inactive: 0
    },
    devices: {
      total: 1,
      mikrotik: 1,
      odp: 0
    },
    customers_total: {
      total: 2,
      pppoe: 2,
      ipStatic: 0
    }
  })

  const [ticketStats, setTicketStats] = useState<TicketStats>({
    open: 0,
    onProgress: 0,
    resolved: 0,
    rejected: 0
  })

  const [showInfoModal, setShowInfoModal] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState<{
    title: string
    description: string
    features: string[]
    icon: any
  } | null>(null)

  const moduleInfo = {
    pelanggan: {
      title: 'Manajemen Pelanggan',
      description: 'Sistem manajemen pelanggan lengkap untuk ISP. Kelola semua data pelanggan, paket layanan, status koneksi, dan riwayat pembayaran dalam satu platform.',
      features: [
        '📋 Database pelanggan lengkap dengan informasi kontak dan alamat',
        '📦 Manajemen paket layanan (10 Mbps, 20 Mbps, 50 Mbps, 100 Mbps)',
        '🔄 Status real-time: Aktif, Suspended, Inactive',
        '💰 Tracking saldo dan tunggakan pelanggan',
        '📅 Riwayat pembayaran dan tanggal jatuh tempo',
        '🔍 Pencarian dan filter pelanggan berdasarkan status',
        '✏️ CRUD operations: Create, Read, Update, Delete',
        '📊 Statistik pelanggan aktif, suspended, dan tunggakan'
      ],
      icon: Users
    },
    keuangan: {
      title: 'Manajemen Keuangan',
      description: 'Sistem keuangan terintegrasi untuk mengelola invoice, pembayaran, dan laporan keuangan ISP Anda.',
      features: [
        '🧾 Generate invoice otomatis setiap bulan',
        '💳 Multi payment gateway (Transfer Bank, E-Wallet, QRIS)',
        '📈 Dashboard pendapatan real-time',
        '⏰ Tracking invoice: Lunas, Belum Dibayar, Overdue',
        '📊 Laporan keuangan bulanan dan tahunan',
        '💸 Monitoring tunggakan pelanggan',
        '📥 Export laporan ke Excel/PDF',
        '🔔 Reminder pembayaran otomatis via WhatsApp/Email'
      ],
      icon: CreditCard
    },
    mikrotik: {
      title: 'Manajemen MikroTik',
      description: 'Kelola semua router MikroTik Anda dari satu dashboard. Monitoring real-time, konfigurasi, dan manajemen PPPoE/Hotspot.',
      features: [
        '🌐 18+ Model MikroTik siap deploy (CCR, RB, hEX, CRS series)',
        '📡 Monitoring CPU, Memory, Disk usage real-time',
        '🔌 Port mapping visual dengan status Up/Down',
        '⚡ Interface details: Speed, RX/TX bytes, Packets',
        '🔐 API connection test dan management',
        '👥 PPPoE user management',
        '🎫 Hotspot voucher generation',
        '🚦 Bandwidth management dan QoS',
        '🔥 Firewall rules configuration'
      ],
      icon: Server
    },
    layanan: {
      title: 'Manajemen Layanan',
      description: 'Kelola aktivasi, suspend, dan terminasi layanan internet pelanggan dengan mudah.',
      features: [
        '🎯 Service activation untuk pelanggan baru',
        '⏸️ Suspend layanan untuk tunggakan',
        '🛑 Terminasi layanan pelanggan non-aktif',
        '🔄 Auto-renewal untuk langganan bulanan',
        '📅 Tracking tanggal aktivasi dan expired',
        '📊 Status layanan real-time',
        '🔗 Integrasi dengan MikroTik untuk auto isolir',
        '📧 Notifikasi email/WhatsApp saat perubahan status'
      ],
      icon: Settings
    },
    operational: {
      title: 'Operasional & Tiket',
      description: 'Sistem ticketing dan manajemen operasional untuk handle keluhan pelanggan dan assignment teknisi.',
      features: [
        '🎫 Ticketing system lengkap',
        '👨‍🔧 Manajemen teknisi dan assignment',
        '📍 Tracking lokasi teknisi real-time',
        '⏱️ SLA monitoring dan response time',
        '📊 Dashboard ticket: Open, In Progress, Resolved',
        '🔔 Notifikasi real-time ke teknisi',
        '📝 History dan notes setiap ticket',
        '⭐ Rating kepuasan pelanggan'
      ],
      icon: Clock
    },
    infrastruktur: {
      title: 'Infrastruktur Jaringan',
      description: 'Manajemen infrastruktur fisik jaringan seperti ODP, kabel fiber, dan mapping perangkat.',
      features: [
        '📍 ODP (Optical Distribution Point) management',
        '🗺️ Interactive map untuk lokasi perangkat',
        '🔌 Port management per ODP',
        '📡 Tracking splitter ratio dan capacity',
        '🚧 Status: Available, Used, Maintenance',
        '📊 Utilization monitoring',
        '🔍 Search ODP by location/code',
        '📷 Upload foto dokumentasi infrastruktur'
      ],
      icon: Store
    }
  }

  const handleInfoClick = (module: keyof typeof moduleInfo) => {
    setSelectedInfo(moduleInfo[module])
    setShowInfoModal(true)
  }

  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([
    { month: 'Januari', amount: 0 },
    { month: 'Februari', amount: 0 },
    { month: 'Maret', amount: 0 },
    { month: 'April', amount: 0 },
    { month: 'Mei', amount: 0 },
    { month: 'Juni', amount: 0 },
    { month: 'Juli', amount: 0 },
    { month: 'Agustus', amount: 0 },
    { month: 'September', amount: 0 },
    { month: 'Oktober', amount: 0 },
    { month: 'November', amount: 0 },
    { month: 'Desember', amount: 0 }
  ])

  const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.amount, 0)
  const averageRevenue = totalRevenue / 12

  // Show loading or nothing while checking auth
  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Statistik ISP</h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Pendapatan Bulanan - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Pendapatan Bulanan</h2>
                <button
                  onClick={() => handleInfoClick('keuangan')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <Info size={18} />
                  <span className="text-sm">Info Detail</span>
                </button>
              </div>
              
              <div className="bg-blue-700/40 backdrop-blur rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-blue-200 text-sm mb-2">TOTAL PENDAPATAN</p>
                    <p className="text-5xl font-bold">Rp {stats.revenue.total.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="bg-blue-600/50 p-4 rounded-xl">
                    <CreditCard size={32} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div>
                    <p className="text-blue-200 text-sm mb-1">PERIODE</p>
                    <p className="text-xl font-semibold">{stats.revenue.period}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm mb-1">MASA AKTIF TERSISA</p>
                    <div className="flex items-center space-x-2">
                      <Clock size={20} className="text-blue-200" />
                      <span className="text-xl font-semibold">~{stats.revenue.daysRemaining} minggu lagi</span>
                    </div>
                    <p className="text-sm text-blue-200 mt-1">Aktif sampai:</p>
                    <p className="text-lg font-semibold">{stats.revenue.activeUntil}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Manajemen Pelanggan - Takes 1/3 width on large screens */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users size={24} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-purple-600">Informasi Manajemen</h3>
                <p className="text-sm text-gray-600">Pelanggan</p>
              </div>
              <button
                onClick={() => handleInfoClick('pelanggan')}
                className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                title="Info Detail"
              >
                <Info size={20} className="text-purple-600" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-700">Terbaru Bulan Ini</p>
              <div className="flex items-center space-x-2 text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                <span className="font-medium">2 Terbaru</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              {/* Pelanggan Aktif */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Pelanggan Aktif</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{stats.customers.active}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Pelanggan Isolir */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Pelanggan Isolir</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{stats.customers.isolated}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>

              {/* Pelanggan Tidak Aktif */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Pelanggan Tidak Aktif</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{stats.customers.inactive}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Teknisi */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-orange-600">Total Teknisi</h3>
                <button
                  onClick={() => handleInfoClick('operational')}
                  className="text-xs text-orange-500 hover:text-orange-700 flex items-center gap-1 mt-1"
                >
                  <Info size={14} />
                  Lihat Detail
                </button>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <Settings size={24} className="text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{stats.technicians.total}</p>
            <p className="text-sm text-gray-600">
              <span className="text-orange-600 font-medium">Aktif: {stats.technicians.active}</span> | Tidak Aktif: {stats.technicians.inactive}
            </p>
          </div>

          {/* Total Loket */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-teal-600">Total Loket</h3>
                <button
                  onClick={() => handleInfoClick('infrastruktur')}
                  className="text-xs text-teal-500 hover:text-teal-700 flex items-center gap-1 mt-1"
                >
                  <Info size={14} />
                  Lihat Detail
                </button>
              </div>
              <div className="bg-teal-500 p-3 rounded-xl">
                <Store size={24} className="text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{stats.locations.total}</p>
            <p className="text-sm text-gray-600">
              <span className="text-teal-600 font-medium">Aktif: {stats.locations.active}</span> | Tidak Aktif: {stats.locations.inactive}
            </p>
          </div>

          {/* Total Perangkat */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-600">Total Perangkat</h3>
                <button
                  onClick={() => handleInfoClick('mikrotik')}
                  className="text-xs text-purple-500 hover:text-purple-700 flex items-center gap-1 mt-1"
                >
                  <Info size={14} />
                  Lihat Detail
                </button>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <Server size={24} className="text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{stats.devices.total}</p>
            <p className="text-sm text-gray-600">
              <span className="text-purple-600 font-medium">Mikrotik: {stats.devices.mikrotik}</span> | ODP: {stats.devices.odp}
            </p>
          </div>

          {/* Total Pelanggan */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-600">Total Pelanggan</h3>
                <button
                  onClick={() => handleInfoClick('layanan')}
                  className="text-xs text-cyan-500 hover:text-cyan-700 flex items-center gap-1 mt-1"
                >
                  <Info size={14} />
                  Lihat Detail
                </button>
              </div>
              <div className="bg-cyan-500 p-3 rounded-xl">
                <Users size={24} className="text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{stats.customers_total.total}</p>
            <p className="text-sm text-gray-600">
              <span className="text-cyan-600 font-medium">PPPoE: {stats.customers_total.pppoe}</span> | Ip Static: {stats.customers_total.ipStatic}
            </p>
          </div>
        </div>

        {/* Filter Berdasarkan Bulan dan Tahun */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Berdasarkan Bulan dan Tahun</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Status Tiket & Tren Pendapatan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{/* Status Tiket */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Status Tiket</h2>
            
            {/* Ticket Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Open</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">On Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Resolved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Rejected</span>
              </div>
            </div>

            {/* Ticket Counts */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Open</p>
                <p className="text-3xl font-bold text-blue-600">{ticketStats.open}</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">On Progress</p>
                <p className="text-3xl font-bold text-orange-600">{ticketStats.onProgress}</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                <p className="text-3xl font-bold text-teal-600">{ticketStats.resolved}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{ticketStats.rejected}</p>
              </div>
            </div>
          </div>

          {/* Tren Pendapatan */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tren Pendapatan</h2>
            
            {/* Chart Area */}
            <div className="relative h-64 mb-6">
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                {/* Y-axis labels */}
                <text x="5" y="15" className="text-xs fill-gray-500">Rp 1</text>
                <text x="5" y="50" className="text-xs fill-gray-500">Rp 1</text>
                <text x="5" y="85" className="text-xs fill-gray-500">Rp 1</text>
                <text x="5" y="120" className="text-xs fill-gray-500">Rp 0</text>
                <text x="5" y="155" className="text-xs fill-gray-500">Rp 0</text>
                <text x="5" y="190" className="text-xs fill-gray-500">Rp 0</text>
                
                {/* Trend Line */}
                <polyline
                  points="60,100 120,100 180,100 240,100 300,100 360,100 420,100 480,100 540,100 600,100 660,100 720,100"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                
                {/* Data Points */}
                {[60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720].map((x, i) => (
                  <circle key={i} cx={x} cy="100" r="5" fill="#3b82f6" />
                ))}
                
                {/* X-axis labels */}
                <text x="40" y="195" className="text-xs fill-gray-500" transform="rotate(-45 40 195)">Januari</text>
                <text x="100" y="195" className="text-xs fill-gray-500" transform="rotate(-45 100 195)">Februari</text>
                <text x="160" y="195" className="text-xs fill-gray-500" transform="rotate(-45 160 195)">Maret</text>
                <text x="220" y="195" className="text-xs fill-gray-500" transform="rotate(-45 220 195)">April</text>
                <text x="280" y="195" className="text-xs fill-gray-500" transform="rotate(-45 280 195)">Mei</text>
                <text x="340" y="195" className="text-xs fill-gray-500" transform="rotate(-45 340 195)">Juni</text>
                <text x="400" y="195" className="text-xs fill-gray-500" transform="rotate(-45 400 195)">Juli</text>
                <text x="460" y="195" className="text-xs fill-gray-500" transform="rotate(-45 460 195)">Agustus</text>
                <text x="520" y="195" className="text-xs fill-gray-500" transform="rotate(-45 520 195)">September</text>
                <text x="580" y="195" className="text-xs fill-gray-500" transform="rotate(-45 580 195)">Oktober</text>
                <text x="640" y="195" className="text-xs fill-gray-500" transform="rotate(-45 640 195)">November</text>
                <text x="700" y="195" className="text-xs fill-gray-500" transform="rotate(-45 700 195)">Desember</text>
              </svg>
            </div>

            {/* Revenue Summary */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Pendapatan</p>
                <p className="text-2xl font-bold text-indigo-600">Rp {totalRevenue.toLocaleString('id-ID')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Rata-rata</p>
                <p className="text-2xl font-bold text-indigo-600">Rp {Math.round(averageRevenue).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/pelanggan')}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all transform hover:scale-105"
            >
              <Users className="text-blue-600 mb-3" size={32} />
              <span className="text-sm font-semibold text-gray-900">Tambah Pelanggan</span>
            </button>
            
            <button
              onClick={() => router.push('/keuangan')}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all transform hover:scale-105"
            >
              <CreditCard className="text-green-600 mb-3" size={32} />
              <span className="text-sm font-semibold text-gray-900">Generate Invoice</span>
            </button>
            
            <button
              onClick={() => router.push('/operational')}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl transition-all transform hover:scale-105"
            >
              <Clock className="text-orange-600 mb-3" size={32} />
              <span className="text-sm font-semibold text-gray-900">Buat Tiket</span>
            </button>
            
            <button
              onClick={() => router.push('/mikrotik')}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all transform hover:scale-105"
            >
              <Server className="text-purple-600 mb-3" size={32} />
              <span className="text-sm font-semibold text-gray-900">Kelola Mikrotik</span>
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Payment Success Rate</h3>
            <p className="text-4xl font-bold mb-2">
              {stats.customers.active > 0 
                ? Math.round((stats.customers.active / (stats.customers.active + stats.customers.isolated + stats.customers.inactive)) * 100)
                : 0}%
            </p>
            <p className="text-sm text-emerald-100">
              {stats.customers.active} dari {stats.customers_total.total} pelanggan bayar tepat waktu
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Ticket Resolution Rate</h3>
            <p className="text-4xl font-bold mb-2">
              {(ticketStats.open + ticketStats.onProgress + ticketStats.resolved) > 0
                ? Math.round((ticketStats.resolved / (ticketStats.open + ticketStats.onProgress + ticketStats.resolved)) * 100)
                : 0}%
            </p>
            <p className="text-sm text-amber-100">
              {ticketStats.resolved} tiket selesai dari total {ticketStats.open + ticketStats.onProgress + ticketStats.resolved}
            </p>
          </div>

          <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Network Uptime</h3>
            <p className="text-4xl font-bold mb-2">99.9%</p>
            <p className="text-sm text-rose-100">
              Rata-rata uptime jaringan bulan ini
            </p>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && selectedInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                {selectedInfo.icon && <selectedInfo.icon className="h-8 w-8 text-white" />}
                <h2 className="text-2xl font-bold text-white">{selectedInfo.title}</h2>
              </div>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-gray-700 leading-relaxed">{selectedInfo.description}</p>
              </div>

              {/* Features List */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded"></span>
                  Fitur Lengkap
                </h3>
                <div className="space-y-3">
                  {selectedInfo.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 flex-1">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  💡 Klik menu di sidebar untuk mengakses fitur ini
                </p>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
