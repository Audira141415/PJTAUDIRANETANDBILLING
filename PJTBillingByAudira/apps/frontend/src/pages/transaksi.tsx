import { useState } from 'react'
import Layout from '@/components/Layout'
import { FileText, Calendar, DollarSign, CheckCircle, Clock, XCircle, Filter, Eye, Printer, Download, X } from 'lucide-react'

interface Transaction {
  id: string
  date: string
  customer: string
  type: string
  amount: number
  status: 'success' | 'pending' | 'failed'
  description: string
  paymentMethod?: string
  invoiceNumber?: string
}

export default function TransaksiSaya() {
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TRX001',
      date: '2025-11-28',
      customer: 'John Doe',
      type: 'Pembayaran',
      amount: 250000,
      status: 'success',
      description: 'Pembayaran bulanan Paket 20 Mbps',
      paymentMethod: 'Transfer Bank',
      invoiceNumber: 'INV-2025-001'
    },
    {
      id: 'TRX002',
      date: '2025-11-27',
      customer: 'Jane Smith',
      type: 'Pembayaran',
      amount: 150000,
      status: 'success',
      description: 'Pembayaran bulanan Paket 10 Mbps',
      paymentMethod: 'Cash',
      invoiceNumber: 'INV-2025-002'
    },
    {
      id: 'TRX003',
      date: '2025-11-26',
      customer: 'Bob Wilson',
      type: 'Registrasi',
      amount: 450000,
      status: 'pending',
      description: 'Registrasi baru Paket 50 Mbps',
      paymentMethod: 'Transfer Bank',
      invoiceNumber: 'INV-2025-003'
    },
    {
      id: 'TRX004',
      date: '2025-11-25',
      customer: 'Alice Brown',
      type: 'Pembayaran',
      amount: 250000,
      status: 'failed',
      description: 'Pembayaran gagal - saldo tidak cukup',
      paymentMethod: 'E-Wallet',
      invoiceNumber: 'INV-2025-004'
    }
  ])

  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const filteredTransactions = transactions.filter(trx => 
    filterStatus === 'all' ? true : trx.status === filterStatus
  )

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'success': return <CheckCircle className="text-green-500" size={20} />
      case 'pending': return <Clock className="text-orange-500" size={20} />
      case 'failed': return <XCircle className="text-red-500" size={20} />
      default: return null
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'success': return 'Berhasil'
      case 'pending': return 'Pending'
      case 'failed': return 'Gagal'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-orange-100 text-orange-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalSuccess = transactions.filter(t => t.status === 'success').length
  const totalPending = transactions.filter(t => t.status === 'pending').length
  const totalAmount = transactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0)

  const handleViewDetail = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowDetailModal(true)
  }

  const handlePrint = (transaction: Transaction) => {
    alert(`Mencetak invoice ${transaction.id}...`)
  }

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Tanggal', 'Pelanggan', 'Tipe', 'Jumlah', 'Status', 'Metode Pembayaran', 'No Invoice'],
      ...filteredTransactions.map(t => [
        t.id,
        new Date(t.date).toLocaleDateString('id-ID'),
        t.customer,
        t.type,
        t.amount.toString(),
        getStatusText(t.status),
        t.paymentMethod || '-',
        t.invoiceNumber || '-'
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transaksi-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transaksi Saya</h1>
          <p className="text-gray-600 mt-1">Riwayat transaksi dan pembayaran</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Transaksi</h3>
              <FileText className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Berhasil</h3>
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-600">{totalSuccess}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <Clock className="text-orange-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-orange-600">{totalPending}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Pendapatan</h3>
              <DollarSign className="text-blue-500" size={24} />
            </div>
            <p className="text-2xl font-bold text-blue-600">
              Rp {totalAmount.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="text-gray-400" size={20} />
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilterStatus('success')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === 'success'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Berhasil
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === 'pending'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilterStatus('failed')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === 'failed'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Gagal
                </button>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Transaksi</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{trx.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {new Date(trx.date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{trx.customer}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{trx.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        Rp {trx.amount.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trx.status)}`}>
                        {getStatusIcon(trx.status)}
                        <span>{getStatusText(trx.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{trx.description}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(trx)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handlePrint(trx)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Cetak Invoice"
                        >
                          <Printer size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <FileText size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada transaksi</h3>
              <p className="text-gray-600">Belum ada transaksi dengan filter yang dipilih</p>
            </div>
          )}
        </div>

        {showDetailModal && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Detail Transaksi</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium opacity-90">Invoice Number</h3>
                      <p className="text-2xl font-bold">{selectedTransaction.invoiceNumber}</p>
                    </div>
                    <span className={`inline-flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium ${
                      selectedTransaction.status === 'success' ? 'bg-green-500' :
                      selectedTransaction.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'
                    } text-white`}>
                      {getStatusIcon(selectedTransaction.status)}
                      <span>{getStatusText(selectedTransaction.status)}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm opacity-90">ID Transaksi</p>
                      <p className="font-semibold">{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Tanggal</p>
                      <p className="font-semibold">
                        {new Date(selectedTransaction.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Pelanggan</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedTransaction.customer}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Tipe Transaksi</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedTransaction.type}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Metode Pembayaran</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedTransaction.paymentMethod}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-600 mb-1">Total Pembayaran</p>
                      <p className="text-2xl font-bold text-blue-700">
                        Rp {selectedTransaction.amount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Deskripsi</p>
                    <p className="text-gray-900">{selectedTransaction.description}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      handlePrint(selectedTransaction)
                      setShowDetailModal(false)
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Printer size={20} />
                    <span>Cetak Invoice</span>
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
