import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { DollarSign, Plus, Search, Eye, Download, CreditCard, FileText, TrendingUp, TrendingDown, Loader2, X, User, Phone, Mail, MapPin, Package, Calendar } from 'lucide-react'
import api from '@/lib/api'

interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'paid' | 'unpaid' | 'overdue'
  paymentMethod?: string
}

interface CustomerDetail {
  id: string
  name: string
  email: string
  phone: string
  address: string
  packageName: string
  packageSpeed: string
  status: 'active' | 'suspended' | 'inactive'
  balance: number
  lastPayment: string
  joinDate: string
  invoices?: Invoice[]
}

export default function Keuangan() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    paidInvoices: 0,
    unpaidInvoices: 0,
    overdueInvoices: 0
  })

  // Mock customer data
  const customerDatabase: { [key: string]: CustomerDetail } = {
    'Budi Santoso': {
      id: '1',
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '081234567890',
      address: 'Jl. Merdeka No. 123, Jakarta Pusat',
      packageName: 'Paket 20 Mbps',
      packageSpeed: '20 Mbps',
      status: 'active',
      balance: 0,
      lastPayment: '14 Dec 2024',
      joinDate: '01 Jan 2024'
    },
    'Siti Aminah': {
      id: '2',
      name: 'Siti Aminah',
      email: 'siti.aminah@email.com',
      phone: '082345678901',
      address: 'Jl. Sudirman No. 456, Bandung',
      packageName: 'Paket 50 Mbps',
      packageSpeed: '50 Mbps',
      status: 'active',
      balance: 0,
      lastPayment: '19 Dec 2024',
      joinDate: '15 Feb 2024'
    },
    'Ahmad Hidayat': {
      id: '3',
      name: 'Ahmad Hidayat',
      email: 'ahmad.h@email.com',
      phone: '083456789012',
      address: 'Jl. Ahmad Yani No. 789, Surabaya',
      packageName: 'Paket 10 Mbps',
      packageSpeed: '10 Mbps',
      status: 'suspended',
      balance: -150000,
      lastPayment: '10 Oct 2024',
      joinDate: '20 Mar 2024'
    },
    'Dewi Lestari': {
      id: '4',
      name: 'Dewi Lestari',
      email: 'dewi.lestari@email.com',
      phone: '084567890123',
      address: 'Jl. Gatot Subroto No. 321, Medan',
      packageName: 'Paket 100 Mbps',
      packageSpeed: '100 Mbps',
      status: 'active',
      balance: 0,
      lastPayment: '25 Nov 2024',
      joinDate: '05 Apr 2024'
    }
  }

  const handleCustomerClick = (customerName: string) => {
    const customer = customerDatabase[customerName]
    if (customer) {
      // Filter invoices untuk customer ini
      const customerInvoices = displayInvoices.filter(inv => inv.customerName === customerName) as Invoice[]
      setSelectedCustomer({ ...customer, invoices: customerInvoices })
      setShowCustomerModal(true)
    }
  }

  useEffect(() => {
    fetchInvoices()
    fetchStats()
  }, [])

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const data = await api.keuangan.getInvoices()
      setInvoices(data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data keuangan')
      console.error('Error fetching invoices:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await api.keuangan.getStats()
      setStats(data)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  // Mock data untuk fallback
  const mockInvoices = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customerName: 'Budi Santoso',
      amount: 250000,
      dueDate: '15 Dec 2024',
      paidDate: '14 Dec 2024',
      status: 'paid',
      paymentMethod: 'Transfer Bank'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customerName: 'Siti Aminah',
      amount: 450000,
      dueDate: '20 Dec 2024',
      paidDate: '19 Dec 2024',
      status: 'paid',
      paymentMethod: 'E-Wallet'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      customerName: 'Ahmad Hidayat',
      amount: 150000,
      dueDate: '10 Nov 2024',
      status: 'overdue'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      customerName: 'Dewi Lestari',
      amount: 550000,
      dueDate: '25 Dec 2024',
      status: 'unpaid'
    }
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'unpaid' | 'overdue'>('all')

  // Gunakan data dari API jika ada, fallback ke mock
  const displayInvoices = invoices.length > 0 ? invoices : mockInvoices

  const filteredInvoices = displayInvoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Gunakan stats dari API jika ada, fallback ke perhitungan
  const displayStats = stats.totalRevenue > 0 ? stats : {
    totalRevenue: displayInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0),
    paidInvoices: displayInvoices.filter(i => i.status === 'paid').length,
    unpaidInvoices: displayInvoices.filter(i => i.status === 'unpaid').length,
    overdueInvoices: displayInvoices.filter(i => i.status === 'overdue').length
  }

  const unpaidAmount = displayInvoices.filter(i => i.status === 'unpaid').reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = displayInvoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700'
      case 'unpaid':
        return 'bg-yellow-100 text-yellow-700'
      case 'overdue':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Lunas'
      case 'unpaid':
        return 'Belum Bayar'
      case 'overdue':
        return 'Jatuh Tempo'
      default:
        return status
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Memuat data keuangan...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!loading && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manajemen Keuangan</h1>
                <p className="text-gray-600 mt-1">Kelola invoice, pembayaran, dan laporan keuangan</p>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Download size={20} />
                  <span>Export</span>
                </button>
                <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Plus size={20} />
                  <span>Buat Invoice</span>
                </button>
              </div>
            </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Pendapatan</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  Rp {displayStats.totalRevenue.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Invoice Lunas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{displayStats.paidInvoices}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Belum Dibayar</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  Rp {unpaidAmount.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <CreditCard className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Jatuh Tempo</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  Rp {overdueAmount.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingDown className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 md:mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari berdasarkan nomor invoice atau nama pelanggan..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setStatusFilter('paid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'paid' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Lunas
              </button>
              <button
                onClick={() => setStatusFilter('unpaid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'unpaid' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Belum Bayar
              </button>
              <button
                onClick={() => setStatusFilter('overdue')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'overdue' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Jatuh Tempo
              </button>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    No. Invoice
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pelanggan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jumlah
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jatuh Tempo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tanggal Bayar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Metode Bayar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr 
                    key={invoice.id} 
                    onClick={() => handleCustomerClick(invoice.customerName)}
                    className="hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-gray-900">{invoice.invoiceNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium">
                        {invoice.customerName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        Rp {invoice.amount.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{invoice.dueDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{invoice.paidDate || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{invoice.paymentMethod || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleCustomerClick(invoice.customerName)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada invoice ditemukan</h3>
              <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter Anda</p>
            </div>
          )}
        </div>
          </>
        )}
      </div>

      {/* Customer Detail Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-violet-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCustomer.name}</h2>
                  <p className="text-blue-100 text-sm">Detail Informasi Pelanggan</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCustomerModal(false)}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Status Badge */}
              <div className="mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 ${
                  selectedCustomer.status === 'active' ? 'bg-green-100 text-green-700' :
                  selectedCustomer.status === 'suspended' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    selectedCustomer.status === 'active' ? 'bg-green-500' :
                    selectedCustomer.status === 'suspended' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}></span>
                  {selectedCustomer.status === 'active' ? 'Aktif' : 
                   selectedCustomer.status === 'suspended' ? 'Suspended' : 'Nonaktif'}
                </span>
              </div>

              {/* Customer Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-blue-600 rounded"></div>
                    Informasi Kontak
                  </h3>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">No. Telepon</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Alamat</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>

                {/* Package & Payment Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-purple-600 rounded"></div>
                    Paket & Pembayaran
                  </h3>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Paket Layanan</p>
                      <p className="font-bold text-gray-900">{selectedCustomer.packageName}</p>
                      <p className="text-sm text-purple-600">{selectedCustomer.packageSpeed}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Tanggal Bergabung</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.joinDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Pembayaran Terakhir</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.lastPayment}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance Info */}
              <div className={`p-4 rounded-lg mb-6 ${
                selectedCustomer.balance < 0 
                  ? 'bg-red-50 border-l-4 border-red-500' 
                  : 'bg-green-50 border-l-4 border-green-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Status Saldo</p>
                    <p className={`text-2xl font-bold ${
                      selectedCustomer.balance < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {selectedCustomer.balance < 0 ? 'Tunggakan' : 'Lunas'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Jumlah</p>
                    <p className={`text-2xl font-bold ${
                      selectedCustomer.balance < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      Rp {Math.abs(selectedCustomer.balance).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Invoice History */}
              {selectedCustomer.invoices && selectedCustomer.invoices.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-orange-600 rounded"></div>
                    Riwayat Invoice ({selectedCustomer.invoices.length})
                  </h3>
                  
                  <div className="space-y-2">
                    {selectedCustomer.invoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-mono font-semibold text-sm text-gray-900">{inv.invoiceNumber}</p>
                            <p className="text-xs text-gray-500">Jatuh tempo: {inv.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-bold text-gray-900">Rp {inv.amount.toLocaleString('id-ID')}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            inv.status === 'paid' ? 'bg-green-100 text-green-700' :
                            inv.status === 'unpaid' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {inv.status === 'paid' ? 'Lunas' : 
                             inv.status === 'unpaid' ? 'Belum Bayar' : 'Jatuh Tempo'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Tutup
                </button>
                <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  Lihat Detail Lengkap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
