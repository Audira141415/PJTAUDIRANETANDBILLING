const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../AUDIRA-BILLING/apps/frontend/src/pages/invoice/history.tsx');
let code = fs.readFileSync(file, 'utf-8');

// 1. Ensure useEffect is imported
if (!code.includes('import React, { useState, useEffect } from "react";') && !code.includes('import React, { useState, useEffect } from \'react\';')) {
  code = code.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';");
}

// 2. Ensure useRealtime is imported
if (!code.includes("import { useRealtime } from '@/contexts/RealtimeContext';")) {
  code = code.replace(
    "import { useToast } from '@/contexts/ToastContext';",
    "import { useToast } from '@/contexts/ToastContext';\r\nimport { useRealtime } from '@/contexts/RealtimeContext';"
  );
}

// 3. Insert live backend fetch and realtime listener in InvoiceHistoryPage
const targetHook = "  const { toast } = useToast();\r\n  const [historyData, setHistoryData] = useState<HistoryRow[]>(mockHistoryData);";
const targetHookLF = "  const { toast } = useToast();\n  const [historyData, setHistoryData] = useState<HistoryRow[]>(mockHistoryData);";

const liveIntegration = `  const { toast } = useToast();
  const { socket, isConnected } = useRealtime();
  const [historyData, setHistoryData] = useState<HistoryRow[]>(mockHistoryData);

  // ─── 1. Live Fetch Invoices dari Backend Database (PostgreSQL) ───
  useEffect(() => {
    let isMounted = true;
    const fetchInvoices = async () => {
      try {
        const res = await fetch('http://localhost:3218/billing/invoices-all');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped: HistoryRow[] = data.map((inv: any) => ({
              id: inv.id,
              invoiceNumber: inv.invoiceNumber,
              customerName: inv.customer?.name || 'Pelanggan',
              type: 'Invoice Bulanan',
              period: inv.month || 'Periode Berjalan',
              invoiceDate: new Date(inv.createdAt).toLocaleDateString('id-ID'),
              dueDate: new Date(inv.dueDate).toLocaleDateString('id-ID'),
              total: inv.amount,
              status: inv.status === 'PAID' ? 'Lunas' : inv.status === 'PENDING' ? 'Belum Lunas' : inv.status === 'OVERDUE' ? 'Overdue' : 'Dibatalkan',
              method: inv.payments?.[0]?.paymentMethod ? (inv.payments[0].paymentMethod.toUpperCase()) : (inv.status === 'PAID' ? 'Online Payment' : '-'),
              paidDate: inv.paidAt ? new Date(inv.paidAt).toLocaleDateString('id-ID') : '-',
            }));

            if (isMounted) {
              setHistoryData(mapped);
            }
          }
        }
      } catch (err) {
        console.warn('Backend offline, fallback ke cache invoice.');
      }
    };

    fetchInvoices();
    return () => { isMounted = false; };
  }, []);

  // ─── 2. Realtime WebSocket Listener (Socket.io dari Mobile App / Gateway) ───
  useEffect(() => {
    if (!socket) return;

    const handlePaymentReceived = (data: any) => {
      console.log('⚡ [Realtime Invoice] Pembayaran masuk dari Mobile App:', data);
      toast.success(
        \`⚡ [REALTIME SYNC] Pelanggan \${data.customerName || 'Mobile'} telah melunasi invoice \${data.invoiceNumber || ''} sebesar Rp \${(data.amount || 0).toLocaleString('id-ID')}!\`
      );

      setHistoryData((prev) => {
        const targetId = data.invoiceId || data.invoiceNumber;
        const index = prev.findIndex(item => item.id === targetId || item.invoiceNumber === data.invoiceNumber);

        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            status: 'Lunas',
            method: data.paymentMethod ? data.paymentMethod.toUpperCase() : 'ONLINE PAYMENT',
            paidDate: new Date().toLocaleDateString('id-ID'),
          };
          return updated;
        } else {
          // Prepend new row if not present
          const newRow: HistoryRow = {
            id: data.invoiceId || \`INV-\${Date.now()}\`,
            invoiceNumber: data.invoiceNumber || \`INV-\${Date.now().toString().slice(-4)}\`,
            customerName: data.customerName || 'Pelanggan Mobile (App)',
            type: 'Invoice Bulanan',
            period: 'Bulan Berjalan',
            invoiceDate: new Date().toLocaleDateString('id-ID'),
            dueDate: new Date().toLocaleDateString('id-ID'),
            total: data.amount || 250000,
            status: 'Lunas',
            method: data.paymentMethod ? data.paymentMethod.toUpperCase() : 'ONLINE PAYMENT',
            paidDate: new Date().toLocaleDateString('id-ID'),
          };
          return [newRow, ...prev];
        }
      });
    };

    socket.on('payment_received', handlePaymentReceived);
    return () => {
      socket.off('payment_received', handlePaymentReceived);
    };
  }, [socket, toast]);`;

if (code.includes(targetHook)) {
  code = code.replace(targetHook, liveIntegration);
} else if (code.includes(targetHookLF)) {
  code = code.replace(targetHookLF, liveIntegration);
} else {
  console.log('Could not find targetHook for history.tsx');
}

// 4. Add Realtime indicator badge to top header
const headerTarget = '<div className="flex items-center gap-2.5">\r\n            <Link href="/invoice/semua" className="px-3 py-2 bg-[var(--app-card)] border border-[var(--app-border)] text-[var(--app-text)] text-xs font-semibold rounded-lg">Semua Invoice</Link>\r\n          </div>';
const headerTargetLF = '<div className="flex items-center gap-2.5">\n            <Link href="/invoice/semua" className="px-3 py-2 bg-[var(--app-card)] border border-[var(--app-border)] text-[var(--app-text)] text-xs font-semibold rounded-lg">Semua Invoice</Link>\n          </div>';

const headerReplacement = `<div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium bg-[var(--app-card)] border-[var(--app-border)]">
              <span className={\`w-2 h-2 rounded-full \${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}\`}></span>
              <span className={isConnected ? 'text-emerald-400' : 'text-amber-400'}>
                {isConnected ? 'Real-Time Sync Aktif' : 'Gateway Standby'}
              </span>
            </div>
            <Link href="/invoice/semua" className="px-3 py-2 bg-[var(--app-card)] hover:bg-[var(--app-card-subtle)] border border-[var(--app-border)] text-[var(--app-text)] text-xs font-semibold rounded-lg transition-colors">Semua Invoice</Link>
          </div>`;

if (code.includes(headerTarget)) {
  code = code.replace(headerTarget, headerReplacement);
} else if (code.includes(headerTargetLF)) {
  code = code.replace(headerTargetLF, headerReplacement);
}

fs.writeFileSync(file, code, 'utf-8');
console.log('Successfully updated apps/frontend/src/pages/invoice/history.tsx with live API and realtime sync!');

