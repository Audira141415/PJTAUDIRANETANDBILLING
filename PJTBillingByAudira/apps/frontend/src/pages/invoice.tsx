import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  Send, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  User,
  Mail,
  MessageCircle,
  Users,
  Phone,
  History,
  Zap
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  amount: number;
  dueDate: string;
  paidAt?: string | null;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  description?: string;
  month: string;
  createdAt: string;
}

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'PAID' | 'OVERDUE'>('ALL');
  const [filterCustomer, setFilterCustomer] = useState<string>('ALL');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [selectedInvoicesForWA, setSelectedInvoicesForWA] = useState<string[]>([]);

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:4000/keuangan/invoices', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/pelanggan', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchCustomerInvoices = async (customerId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/keuangan/invoices?customerId=${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching customer invoices:', error);
    }
    return [];
  };

  const handleGenerateInvoices = async () => {
    if (!confirm('Generate invoice untuk semua customer aktif bulan ini?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/billing/generate-invoices', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Invoice berhasil di-generate!');
        fetchInvoices();
      }
    } catch (error) {
      console.error('Error generating invoices:', error);
      alert('Gagal generate invoice');
    }
  };

  const handleSendReminder = async (invoiceId: string) => {
    console.log('Sending email reminder for invoice:', invoiceId);
    try {
      const token = localStorage.getItem('token');
      const invoice = invoices.find(inv => inv.id === invoiceId);
      if (!invoice) {
        alert('Invoice tidak ditemukan');
        return;
      }

      console.log('Sending email to:', invoice.customer.email);

      const response = await fetch('http://localhost:4000/billing/send-reminders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          invoiceId: invoiceId,
          customerEmail: invoice.customer.email,
          invoiceNumber: invoice.invoiceNumber,
          amount: invoice.amount,
          dueDate: invoice.dueDate
        })
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        alert('✅ Email reminder berhasil dikirim ke ' + invoice.customer.email);
      } else {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        alert('⚠️ Backend belum support email. Status: ' + response.status);
      }
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('❌ Error: ' + (error as Error).message);
    }
  };

  const handleSendWhatsApp = async (customerId: string, phone: string, message: string) => {
    try {
      // Format phone number (remove non-digits, ensure starts with 62)
      let formattedPhone = phone.replace(/\D/g, '');
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '62' + formattedPhone.substring(1);
      } else if (!formattedPhone.startsWith('62')) {
        formattedPhone = '62' + formattedPhone;
      }

      // Open WhatsApp Web with pre-filled message
      const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');

      // Log the action
      const token = localStorage.getItem('token');
      await fetch('http://localhost:4000/audit/log', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'SEND_WHATSAPP_REMINDER',
          resource: 'invoices',
          details: `Sent WhatsApp to ${phone} for customer ${customerId}`
        })
      });
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
      alert('Gagal membuka WhatsApp');
    }
  };

  const handleBulkWhatsApp = () => {
    if (selectedInvoicesForWA.length === 0) {
      alert('Pilih minimal 1 invoice untuk dikirim reminder WhatsApp');
      return;
    }
    setShowWhatsAppModal(true);
    
    // Generate default message
    const defaultMsg = `Halo, ini adalah pengingat pembayaran tagihan internet Anda.\n\nBerikut detail tagihan yang perlu dibayar:\n\n${selectedInvoicesForWA.map(id => {
      const inv = invoices.find(i => i.id === id);
      if (!inv) return '';
      return `📄 Invoice: ${inv.invoiceNumber}\n💰 Jumlah: Rp ${inv.amount.toLocaleString('id-ID')}\n📅 Jatuh Tempo: ${new Date(inv.dueDate).toLocaleDateString('id-ID')}`;
    }).join('\n\n')}\n\nTerima kasih atas perhatiannya.\n\nSalam,\nAudiraNET Team`;
    
    setWhatsappMessage(defaultMsg);
  };

  const handleSendBulkWhatsApp = async () => {
    if (!whatsappMessage.trim()) {
      alert('Pesan WhatsApp tidak boleh kosong');
      return;
    }

    const selectedInvs = invoices.filter(inv => selectedInvoicesForWA.includes(inv.id));
    let successCount = 0;

    for (const inv of selectedInvs) {
      if (inv.customer.phone) {
        await handleSendWhatsApp(inv.customer.id, inv.customer.phone, whatsappMessage);
        successCount++;
        // Delay to avoid too many tabs
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    alert(`WhatsApp berhasil dikirim ke ${successCount} customer`);
    setShowWhatsAppModal(false);
    setSelectedInvoicesForWA([]);
  };

  const handleDownloadPDF = async (invoice: Invoice) => {
    console.log('Downloading PDF for invoice:', invoice.invoiceNumber);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/keuangan/invoices/${invoice.id}/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('PDF Response status:', response.status);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${invoice.invoiceNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        alert('✅ PDF berhasil didownload: ' + invoice.invoiceNumber + '.pdf');
        
        // Log the action
        await fetch('http://localhost:4000/audit/log', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'DOWNLOAD_INVOICE_PDF',
            resource: 'invoices',
            details: `Downloaded PDF for invoice ${invoice.invoiceNumber}`
          })
        });
      } else {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        alert('⚠️ Backend belum support PDF generator. Status: ' + response.status);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('❌ Error: ' + (error as Error).message);
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterStatus === 'ALL' || invoice.status === filterStatus;

    const matchesCustomer = 
      filterCustomer === 'ALL' || invoice.customer.id === filterCustomer;

    return matchesSearch && matchesFilter && matchesCustomer;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      PAID: { icon: CheckCircle, color: 'bg-green-100 text-green-800', text: 'Lunas' },
      PENDING: { icon: Clock, color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      OVERDUE: { icon: AlertCircle, color: 'bg-red-100 text-red-800', text: 'Jatuh Tempo' }
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon size={14} />
        {badge.text}
      </span>
    );
  };

  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = filteredInvoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = filteredInvoices.filter(inv => inv.status === 'PENDING').reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = filteredInvoices.filter(inv => inv.status === 'OVERDUE').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Receipt className="text-blue-600" size={36} />
              Invoice Management
            </h1>
            <p className="text-gray-600 mt-1">Kelola tagihan customer</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCustomerModal(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <Users size={20} />
              Daftar Customer
            </button>
            <button
              onClick={handleBulkWhatsApp}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
              disabled={selectedInvoicesForWA.length === 0}
            >
              <MessageCircle size={20} />
              Kirim WA ({selectedInvoicesForWA.length})
            </button>
            <button
              onClick={handleGenerateInvoices}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Receipt size={20} />
              Generate Invoice
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoice</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{filteredInvoices.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Receipt className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Rp {totalAmount.toLocaleString('id-ID')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lunas</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {filteredInvoices.filter(inv => inv.status === 'PAID').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Rp {totalPaid.toLocaleString('id-ID')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  {filteredInvoices.filter(inv => inv.status === 'PENDING').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Rp {totalPending.toLocaleString('id-ID')}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Jatuh Tempo</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {filteredInvoices.filter(inv => inv.status === 'OVERDUE').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Rp {totalOverdue.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari invoice number, nama, atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">Semua Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              {(['ALL', 'PENDING', 'PAID', 'OVERDUE'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'ALL' ? 'Semua' : status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedInvoicesForWA.length === filteredInvoices.length && filteredInvoices.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvoicesForWA(filteredInvoices.map(inv => inv.id));
                        } else {
                          setSelectedInvoicesForWA([]);
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Invoice #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Periode</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Jatuh Tempo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Tidak ada invoice
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedInvoicesForWA.includes(invoice.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedInvoicesForWA([...selectedInvoicesForWA, invoice.id]);
                            } else {
                              setSelectedInvoicesForWA(selectedInvoicesForWA.filter(id => id !== invoice.id));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-blue-600">{invoice.invoiceNumber}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{invoice.customer.name}</p>
                          <p className="text-sm text-gray-500">{invoice.customer.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{invoice.month}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">
                          Rp {invoice.amount.toLocaleString('id-ID')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(invoice.dueDate).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setShowDetailModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Lihat Detail"
                          >
                            <Eye size={18} />
                          </button>
                          {invoice.customer.phone && (
                            <button
                              onClick={() => {
                                const msg = `Halo ${invoice.customer.name},\n\nBerikut detail tagihan Anda:\n\n📄 Invoice: ${invoice.invoiceNumber}\n💰 Jumlah: Rp ${invoice.amount.toLocaleString('id-ID')}\n📅 Jatuh Tempo: ${new Date(invoice.dueDate).toLocaleDateString('id-ID')}\n\nMohon segera lakukan pembayaran. Terima kasih!\n\nSalam,\nAudiraNET Team`;
                                handleSendWhatsApp(invoice.customer.id, invoice.customer.phone, msg);
                              }}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Kirim WhatsApp"
                            >
                              <MessageCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleSendReminder(invoice.id)}
                            className={`p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ${invoice.status === 'PAID' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={invoice.status === 'PAID' ? 'Invoice sudah dibayar' : 'Kirim Email'}
                          >
                            <Send size={18} />
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(invoice)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedInvoice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Detail Invoice</h2>
                    <p className="text-gray-600 mt-1">{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <User size={16} />
                    Informasi Customer
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Nama:</span> {selectedInvoice.customer.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedInvoice.customer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedInvoice.customer.phone}</p>
                  </div>
                </div>

                {/* Invoice Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <Receipt size={16} />
                    Detail Tagihan
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Periode:</span> {selectedInvoice.month}</p>
                    <p><span className="font-medium">Deskripsi:</span> {selectedInvoice.description || '-'}</p>
                    <p><span className="font-medium">Tanggal Invoice:</span> {new Date(selectedInvoice.createdAt).toLocaleDateString('id-ID')}</p>
                    <p><span className="font-medium">Jatuh Tempo:</span> {new Date(selectedInvoice.dueDate).toLocaleDateString('id-ID')}</p>
                    {selectedInvoice.paidAt && (
                      <p><span className="font-medium">Tanggal Bayar:</span> {new Date(selectedInvoice.paidAt).toLocaleDateString('id-ID')}</p>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <DollarSign size={16} />
                    Total Tagihan
                  </h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">
                      Rp {selectedInvoice.amount.toLocaleString('id-ID')}
                    </p>
                    <div className="mt-2">
                      {getStatusBadge(selectedInvoice.status)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer List Modal */}
        {showCustomerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <Users size={28} />
                      Daftar Customer
                    </h2>
                    <p className="text-gray-600 mt-1">Total: {customers.length} customer</p>
                  </div>
                  <button
                    onClick={() => setShowCustomerModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Invoice</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {customers.map((customer) => {
                        const customerInvoices = invoices.filter(inv => inv.customer.id === customer.id);
                        const pendingInvoices = customerInvoices.filter(inv => inv.status === 'PENDING' || inv.status === 'OVERDUE');
                        
                        return (
                          <tr key={customer.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User size={16} className="text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">{customer.name}</p>
                                  <p className="text-xs text-gray-500">{customer.customerId}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{customer.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {customer.phone ? (
                                <span className="flex items-center gap-1">
                                  <Phone size={14} />
                                  {customer.phone}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                customer.status === 'active' ? 'bg-green-100 text-green-800' :
                                customer.status === 'suspended' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {customer.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm">
                                <p className="font-medium text-gray-800">Total: {customerInvoices.length}</p>
                                {pendingInvoices.length > 0 && (
                                  <p className="text-red-600">Pending: {pendingInvoices.length}</p>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={async () => {
                                    const custInvs = await fetchCustomerInvoices(customer.id);
                                    setSelectedCustomer({ ...customer, invoices: custInvs });
                                  }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Lihat Invoice"
                                >
                                  <History size={16} />
                                </button>
                                {customer.phone && pendingInvoices.length > 0 && (
                                  <button
                                    onClick={() => {
                                      const msg = `Halo ${customer.name},\\n\\nAnda memiliki ${pendingInvoices.length} tagihan yang belum dibayar:\\n\\n${pendingInvoices.map(inv => 
                                        `📄 ${inv.invoiceNumber}\\n💰 Rp ${inv.amount.toLocaleString('id-ID')}\\n📅 Jatuh Tempo: ${new Date(inv.dueDate).toLocaleDateString('id-ID')}`
                                      ).join('\\n\\n')}\\n\\nMohon segera lakukan pembayaran. Terima kasih!\\n\\nSalam,\\nAudiraNET Team`;
                                      handleSendWhatsApp(customer.id, customer.phone, msg);
                                    }}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="Kirim WhatsApp"
                                  >
                                    <MessageCircle size={16} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk WhatsApp Modal */}
        {showWhatsAppModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <MessageCircle size={28} className="text-green-600" />
                      Kirim WhatsApp Massal
                    </h2>
                    <p className="text-gray-600 mt-1">Kirim ke {selectedInvoicesForWA.length} customer</p>
                  </div>
                  <button
                    onClick={() => setShowWhatsAppModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan WhatsApp
                  </label>
                  <textarea
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                    placeholder="Tulis pesan WhatsApp..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Tips: Gunakan \\n untuk baris baru
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <Zap size={16} />
                    Preview Recipients:
                  </h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    {invoices
                      .filter(inv => selectedInvoicesForWA.includes(inv.id))
                      .slice(0, 5)
                      .map(inv => (
                        <p key={inv.id}>
                          • {inv.customer.name} - {inv.customer.phone || 'No phone'}
                        </p>
                      ))}
                    {selectedInvoicesForWA.length > 5 && (
                      <p className="text-gray-500">... dan {selectedInvoicesForWA.length - 5} lainnya</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setShowWhatsAppModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSendBulkWhatsApp}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Kirim WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Invoice History Modal */}
        {selectedCustomer && selectedCustomer.invoices && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                      <History size={28} />
                      Riwayat Invoice - {selectedCustomer.name}
                    </h2>
                    <p className="text-gray-600 mt-1">{selectedCustomer.email} • {selectedCustomer.phone}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 mb-1">Total Invoice</p>
                    <p className="text-2xl font-bold text-blue-800">{selectedCustomer.invoices.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Lunas</p>
                    <p className="text-2xl font-bold text-green-800">
                      {selectedCustomer.invoices.filter((inv: any) => inv.status === 'PAID').length}
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-red-800">
                      {selectedCustomer.invoices.filter((inv: any) => inv.status !== 'PAID').length}
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Invoice #</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Periode</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Due Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedCustomer.invoices.map((inv: any) => (
                        <tr key={inv.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-blue-600">{inv.invoiceNumber}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{inv.month}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                            Rp {inv.amount.toLocaleString('id-ID')}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(inv.dueDate).toLocaleDateString('id-ID')}
                          </td>
                          <td className="px-4 py-3">{getStatusBadge(inv.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
