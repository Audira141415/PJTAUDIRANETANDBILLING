import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Users, Plus, Search, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, MapPin, Phone, Mail, Loader2, X, Calendar, Package, CreditCard, FileText } from 'lucide-react'
import api from '@/lib/api'

interface Customer {
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
  internetNumber?: string  // Nomor internet/ID pelanggan ISP
  ipAddress?: string       // IP Address
  installedModem?: string  // Jenis modem
  modemSerial?: string     // Serial modem
  installationDate?: string // Tanggal instalasi
}

export default function Pelanggan() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    suspended: 0,
    inactive: 0
  })
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'inactive'>('all');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers()
    fetchStats()
  }, [])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const data = await api.pelanggan.getAll()
      setCustomers(data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data pelanggan')
      console.error('Error fetching customers:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await api.pelanggan.getStats()
      setStats(data)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus pelanggan ini?')) return
    
    try {
      await api.pelanggan.delete(id)
      await fetchCustomers()
      await fetchStats()
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus pelanggan')
    }
  }

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  }

  const handleEditClick = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowEditModal(true);
  }

  const handleSaveEdit = async () => {
    if (!editingCustomer) return;
    
    try {
      await api.pelanggan.update(editingCustomer.id, editingCustomer);
      setShowEditModal(false);
      setEditingCustomer(null);
      await fetchCustomers();
      await fetchStats();
      alert('Data pelanggan berhasil diupdate');
    } catch (err: any) {
      alert(err.message || 'Gagal mengupdate pelanggan');
    }
  }

  // Mock data untuk fallback jika backend belum ada data
  const mockCustomers = [
    {
      id: '1',
      name: 'PT Cipta Karya Sentosa',
      email: 'admin@ciptakarya.co.id',
      phone: '021-55567890',
      address: 'Gedung Plaza Indonesia Lt. 15, Jakarta Pusat',
      packageName: 'Corporate 1 Gbps',
      packageSpeed: '1 Gbps',
      status: 'active',
      balance: 0,
      lastPayment: '28 Nov 2025',
      joinDate: '05 Jan 2023'
    },
    {
      id: '2',
      name: 'Warnet Game Zone',
      email: 'owner@gamezone.net',
      phone: '022-87654321',
      address: 'Jl. Dago No. 88, Bandung',
      packageName: 'Business 300 Mbps',
      packageSpeed: '300 Mbps',
      status: 'active',
      balance: 0,
      lastPayment: '25 Nov 2025',
      joinDate: '12 Mar 2023'
    },
    {
      id: '3',
      name: 'Rumah Kost Mahasiswa Harapan',
      email: 'kosharapan@gmail.com',
      phone: '081234567890',
      address: 'Jl. Veteran No. 45, Yogyakarta',
      packageName: 'Paket 100 Mbps',
      packageSpeed: '100 Mbps',
      status: 'active',
      balance: 0,
      lastPayment: '20 Nov 2025',
      joinDate: '08 Jul 2023'
    },
    {
      id: '4',
      name: 'Keluarga Bapak Sutrisno',
      email: 'sutrisno.family@yahoo.com',
      phone: '085678901234',
      address: 'Perum Griya Asri Blok C15, Tangerang',
      packageName: 'Paket 50 Mbps',
      packageSpeed: '50 Mbps',
      status: 'active',
      balance: 0,
      lastPayment: '15 Nov 2025',
      joinDate: '20 Sep 2024'
    },
    {
      id: '5',
      name: 'Toko Online Fashion Store',
      email: 'cs@fashionstore.id',
      phone: '031-77889900',
      address: 'Ruko Manyar Megah A-12, Surabaya',
      packageName: 'Business 200 Mbps',
      packageSpeed: '200 Mbps',
      status: 'suspended',
      balance: -450000,
      lastPayment: '01 Oct 2025',
      joinDate: '15 Jan 2024'
    },
    {
      id: '6',
      name: 'Keluarga Ibu Ratna Dewi',
      email: 'ratna.dewi88@gmail.com',
      phone: '082345678901',
      address: 'Jl. Melati No. 67, Bekasi',
      packageName: 'Paket 20 Mbps',
      packageSpeed: '20 Mbps',
      status: 'active',
      balance: 0,
      lastPayment: '22 Nov 2025',
      joinDate: '10 Feb 2024'
    },
    {
      id: '7',
      name: 'Cafe Kopi Nusantara',
      email: 'cafe.nusantara@outlook.com',
      phone: '024-66778899',
      address: 'Jl. Pemuda No. 123, Semarang',
      packageName: 'Business 100 Mbps',
      packageSpeed: '100 Mbps',
      status: 'active',
      balance: 0,
      lastPayment: '27 Nov 2025',
      joinDate: '22 Jun 2024'
    },
    {
      id: '8',
      name: 'Bapak Hendro Wijaya',
      email: 'hendro.w@hotmail.com',
      phone: '087654321098',
      address: 'Komplek Villa Indah No. 8, Depok',
      packageName: 'Paket 30 Mbps',
      packageSpeed: '30 Mbps',
      status: 'inactive',
      balance: -200000,
      lastPayment: '15 Sep 2025',
      joinDate: '05 May 2024'
    }
  ];

  // Gunakan data dari API jika ada, fallback ke mock data
  const displayCustomers = customers.length > 0 ? customers : mockCustomers

  const filteredCustomers = displayCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Gunakan stats dari API jika ada, fallback ke perhitungan manual
  const displayStats = stats.total > 0 ? stats : {
    total: displayCustomers.length,
    active: displayCustomers.filter(c => c.status === 'active').length,
    suspended: displayCustomers.filter(c => c.status === 'suspended').length,
    inactive: displayCustomers.filter(c => c.status === 'inactive').length
  }

  const totalRevenue = displayCustomers.reduce((sum, c) => sum + (c.balance > 0 ? c.balance : 0), 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-500" size={18} />
      case 'suspended':
        return <Clock className="text-orange-500" size={18} />
      case 'inactive':
        return <XCircle className="text-red-500" size={18} />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'suspended':
        return 'bg-orange-100 text-orange-700'
      case 'inactive':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif'
      case 'suspended':
        return 'Suspended'
      case 'inactive':
        return 'Nonaktif'
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
            <span className="ml-2 text-gray-600">Memuat data pelanggan...</span>
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
                <h1 className="text-3xl font-bold text-gray-900">Manajemen Pelanggan</h1>
                <p className="text-gray-600 mt-1">Kelola data pelanggan dan langganan</p>
              </div>
              <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                <Plus size={20} />
                <span>Tambah Pelanggan</span>
              </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Pelanggan</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{displayStats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pelanggan Aktif</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{displayStats.active}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Suspended</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{displayStats.suspended}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tunggakan</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {displayCustomers.filter(c => c.balance < 0).length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="text-red-600" size={24} />
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
                placeholder="Cari berdasarkan nama, email, telepon, atau alamat..."
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
                onClick={() => setStatusFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Aktif
              </button>
              <button
                onClick={() => setStatusFilter('suspended')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'suspended' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Suspended
              </button>
            </div>
          </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pelanggan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Kontak
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paket
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Saldo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pembayaran Terakhir
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    onClick={() => handleCustomerClick(customer as Customer)}
                    className="hover:bg-green-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="mr-1" />
                          {customer.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail size={14} className="mr-2 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone size={14} className="mr-2 text-gray-400" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{customer.packageName}</p>
                        <p className="text-sm text-gray-500">{customer.packageSpeed}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(customer.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                          {getStatusText(customer.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${customer.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        Rp {Math.abs(customer.balance).toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{customer.lastPayment}</span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleCustomerClick(customer as Customer)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleEditClick(customer as Customer)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Edit Data"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada pelanggan ditemukan</h3>
              <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter Anda</p>
            </div>
          )}
            </div>
          </>
        )}
      </div>

      {/* Customer Detail Modal */}
      {showCustomerModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-t-2xl relative">
              <button
                onClick={() => setShowCustomerModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <Users size={32} />
                </div>
                <div>
                  <p className="text-sm opacity-90">Detail Pelanggan</p>
                  <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedCustomer.status)}
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedCustomer.status)}`}>
                    {getStatusText(selectedCustomer.status)}
                  </span>
                </div>
                <div className={`text-lg font-bold ${selectedCustomer.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {selectedCustomer.balance < 0 ? 'Tunggakan: ' : 'Lunas'}
                  {selectedCustomer.balance !== 0 && ` Rp ${Math.abs(selectedCustomer.balance).toLocaleString('id-ID')}`}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 space-y-3">
                <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                  <Phone className="text-blue-600" size={20} />
                  <span>Informasi Kontak</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="text-blue-600 mt-1" size={18} />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="text-blue-600 mt-1" size={18} />
                    <div>
                      <p className="text-xs text-gray-600">Telepon</p>
                      <p className="font-semibold text-gray-900">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 md:col-span-2">
                    <MapPin className="text-blue-600 mt-1" size={18} />
                    <div>
                      <p className="text-xs text-gray-600">Alamat</p>
                      <p className="font-semibold text-gray-900">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Package className="text-blue-600" size={20} />
                    <h3 className="font-bold text-gray-900">Paket Layanan</h3>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{selectedCustomer.packageName}</p>
                  <p className="text-sm text-gray-600">Kecepatan: {selectedCustomer.packageSpeed}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="text-blue-600" size={20} />
                    <h3 className="font-bold text-gray-900">Informasi Berlangganan</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Tanggal Bergabung</p>
                      <p className="font-semibold text-gray-900">{selectedCustomer.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Pembayaran Terakhir</p>
                      <p className="font-semibold text-gray-900">{selectedCustomer.lastPayment}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Information - NEW */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 space-y-3">
                <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                  <FileText className="text-purple-600" size={20} />
                  <span>Informasi Teknis</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Nomor Internet</p>
                    <p className="font-semibold text-gray-900">{selectedCustomer.internetNumber || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">IP Address</p>
                    <p className="font-semibold text-gray-900 font-mono">{selectedCustomer.ipAddress || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Jenis Modem</p>
                    <p className="font-semibold text-gray-900">{selectedCustomer.installedModem || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Serial Modem</p>
                    <p className="font-semibold text-gray-900 font-mono">{selectedCustomer.modemSerial || '-'}</p>
                  </div>
                  {selectedCustomer.installationDate && (
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-600">Tanggal Instalasi</p>
                      <p className="font-semibold text-gray-900">
                        {typeof selectedCustomer.installationDate === 'string' 
                          ? selectedCustomer.installationDate 
                          : new Date(selectedCustomer.installationDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Tutup
                </button>
                <button className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl">
                  <CreditCard className="inline mr-2" size={18} />
                  Proses Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && editingCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Edit Data Pelanggan</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCustomer(null);
                }}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pelanggan
                  </label>
                  <input
                    type="text"
                    value={editingCustomer.name}
                    onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telepon
                  </label>
                  <input
                    type="text"
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editingCustomer.status}
                    onChange={(e) => setEditingCustomer({...editingCustomer, status: e.target.value as any})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat
                  </label>
                  <textarea
                    value={editingCustomer.address}
                    onChange={(e) => setEditingCustomer({...editingCustomer, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCustomer(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
