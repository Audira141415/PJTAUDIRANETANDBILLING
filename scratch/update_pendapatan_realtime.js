const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../AUDIRA-BILLING/apps/frontend/src/pages/finance/pendapatan.tsx');
let code = fs.readFileSync(file, 'utf-8');

// 1. Ensure useRealtime is imported
if (!code.includes("import { useRealtime } from '@/contexts/RealtimeContext';")) {
  code = code.replace(
    "import { useToast } from '@/contexts/ToastContext';",
    "import { useToast } from '@/contexts/ToastContext';\r\nimport { useRealtime } from '@/contexts/RealtimeContext';"
  );
}

// 2. Add live fetch & socket listener
const targetHook = "  const { toast } = useToast();\r\n  const [activeTab, setActiveTab] = useState('Transaksi Pendapatan');";
const targetHookLF = "  const { toast } = useToast();\n  const [activeTab, setActiveTab] = useState('Transaksi Pendapatan');";

const liveIntegration = `  const { toast } = useToast();
  const { socket, isConnected } = useRealtime();
  const [activeTab, setActiveTab] = useState('Transaksi Pendapatan');`;

if (code.includes(targetHook)) {
  code = code.replace(targetHook, liveIntegration);
} else if (code.includes(targetHookLF)) {
  code = code.replace(targetHookLF, liveIntegration);
}

// 3. Insert useEffect hooks after initialTransactions setup
const txStateTarget = "  const [transactions, setTransactions] = useState(initialTransactions);\r\n  const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions);";
const txStateTargetLF = "  const [transactions, setTransactions] = useState(initialTransactions);\n  const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions);";

const txStateReplacement = `  const [transactions, setTransactions] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions);

  // ─── 1. Live Fetch Riwayat Transaksi Pendapatan dari Backend API ───
  useEffect(() => {
    let isMounted = true;
    const fetchTransactions = async () => {
      try {
        const res = await fetch('http://localhost:3218/billing/transactions-all');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map((tx: any, idx: number) => ({
              no: idx + 1,
              tanggal: new Date(tx.createdAt).toLocaleDateString('id-ID') + ' ' + new Date(tx.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              invoice: tx.paymentGatewayRef || \`TX-\${tx.id.slice(0, 8)}\`,
              pelanggan: tx.customer?.name || 'Pelanggan',
              sumber: tx.description || 'Layanan Internet',
              metode: tx.method ? tx.method.toUpperCase() : 'ONLINE PAYMENT',
              total: tx.amount,
              status: tx.status === 'success' ? 'Lunas' : 'Belum Lunas',
            }));

            if (isMounted) {
              setTransactions(mapped);
              setFilteredTransactions(mapped);
            }
          }
        }
      } catch (err) {
        console.warn('Backend transactions API offline, fallback ke cache.');
      }
    };

    fetchTransactions();
    return () => { isMounted = false; };
  }, []);

  // ─── 2. Realtime Socket.IO Listener: Pembayaran Baru dari Mobile App ───
  useEffect(() => {
    if (!socket) return;

    const handlePaymentReceived = (data: any) => {
      console.log('⚡ [Realtime Pendapatan] Kas masuk baru:', data);
      const newTx = {
        no: 1,
        tanggal: new Date().toLocaleDateString('id-ID') + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        invoice: data.invoiceNumber || \`TX-\${Date.now().toString().slice(-4)}\`,
        pelanggan: data.customerName || 'Pelanggan Mobile',
        sumber: 'Layanan Internet Fiber',
        metode: data.paymentMethod ? data.paymentMethod.toUpperCase() : 'ONLINE PAYMENT',
        total: data.amount || 250000,
        status: 'Lunas',
      };

      toast.success(
        \`⚡ [KAS MASUK REALTIME] Pelanggan \${data.customerName || 'Pelanggan'} telah membayar Rp \${(data.amount || 0).toLocaleString('id-ID')} via \${data.paymentMethod || 'Online'}!\`
      );

      setTransactions((prev) => [newTx, ...prev.map((t, i) => ({ ...t, no: i + 2 }))]);
      setFilteredTransactions((prev) => [newTx, ...prev.map((t, i) => ({ ...t, no: i + 2 }))]);
    };

    socket.on('payment_received', handlePaymentReceived);
    return () => {
      socket.off('payment_received', handlePaymentReceived);
    };
  }, [socket, toast]);`;

if (code.includes(txStateTarget)) {
  code = code.replace(txStateTarget, txStateReplacement);
} else if (code.includes(txStateTargetLF)) {
  code = code.replace(txStateTargetLF, txStateReplacement);
}

// 4. Add Live Status badge in Top Bar
const topBarTarget = '<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--app-card)] border border-[var(--app-border)] text-xs">\r\n              <span className="text-[var(--app-muted)] font-medium">25 Juni 2026 - 22 Oktober 2026</span>\r\n            </div>';
const topBarTargetLF = '<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--app-card)] border border-[var(--app-border)] text-xs">\n              <span className="text-[var(--app-muted)] font-medium">25 Juni 2026 - 22 Oktober 2026</span>\n            </div>';

const topBarReplacement = `<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--app-card)] border border-[var(--app-border)] text-xs">
              <span className={\`w-2 h-2 rounded-full \${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}\`}></span>
              <span className={isConnected ? 'text-emerald-400 font-mono font-medium' : 'text-amber-400 font-mono font-medium'}>
                {isConnected ? 'Real-Time Sync Aktif' : 'Gateway Standby'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--app-card)] border border-[var(--app-border)] text-xs">
              <span className="text-[var(--app-muted)] font-medium">25 Juni 2026 - 22 Oktober 2026</span>
            </div>`;

if (code.includes(topBarTarget)) {
  code = code.replace(topBarTarget, topBarReplacement);
} else if (code.includes(topBarTargetLF)) {
  code = code.replace(topBarTargetLF, topBarReplacement);
}

fs.writeFileSync(file, code, 'utf-8');
console.log('Successfully updated apps/frontend/src/pages/finance/pendapatan.tsx with live transactions API and realtime socket!');

