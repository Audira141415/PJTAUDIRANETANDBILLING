const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../AUDIRA-BILLING/apps/backend/src/billing/billing.service.ts');
let code = fs.readFileSync(file, 'utf-8');

// 1. Add import
if (!code.includes("import { RealtimeService } from '../realtime/realtime.service';")) {
  code = code.replace(
    "import { WhatsAppService } from '../whatsapp/whatsapp.service';",
    "import { WhatsAppService } from '../whatsapp/whatsapp.service';\r\nimport { RealtimeService } from '../realtime/realtime.service';"
  );
}

// 2. Add constructor parameter
if (!code.includes('private realtimeService: RealtimeService')) {
  code = code.replace(
    'private whatsappService: WhatsAppService,',
    'private whatsappService: WhatsAppService,\r\n    private realtimeService: RealtimeService,'
  );
}

// 3. In confirmPayment, broadcast realtime event
const confirmTarget = 'this.logger.log(`Payment confirmed for invoice ${invoice.invoiceNumber}`);';
const confirmBroadcast = `this.logger.log(\`Payment confirmed for invoice \${invoice.invoiceNumber}\`);

      // ─── Broadcast Realtime Socket.IO ke Web Admin Dashboard ───
      try {
        this.realtimeService.broadcastPaymentReceived({
          invoiceId: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          customerName: invoice.customer?.name || 'Pelanggan',
          amount: invoice.amount,
          paymentMethod: paymentData.method || 'Online Payment',
          paymentTime: new Date().toISOString(),
          customerId: invoice.customerId,
        });
      } catch (rtErr: any) {
        this.logger.warn(\`Gagal broadcast realtime payment: \${rtErr.message}\`);
      }`;

if (code.includes(confirmTarget)) {
  code = code.replace(confirmTarget, confirmBroadcast);
}

// 4. In payInvoiceWithCoa, broadcast realtime event
const coaTarget = "this.logger.log(\r\n        `[CoA Instant Restore] Tagihan ${invoice.invoiceNumber} LUNAS. Sinyal CoA terkirim ke MikroTik!`,\r\n      );";
const coaTargetAlt = "this.logger.log(\n        `[CoA Instant Restore] Tagihan ${invoice.invoiceNumber} LUNAS. Sinyal CoA terkirim ke MikroTik!`,\n      );";
const coaBroadcast = `this.logger.log(
        \`[CoA Instant Restore] Tagihan \${invoice.invoiceNumber} LUNAS. Sinyal CoA terkirim ke MikroTik!\`,
      );

      // ─── Broadcast Realtime Socket.IO ke Web Admin Dashboard ───
      try {
        this.realtimeService.broadcastPaymentReceived({
          invoiceId: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          customerName: updatedInvoice.customer?.name || 'Pelanggan',
          amount: payment.amount,
          paymentMethod: payment.method || 'Online Payment',
          paymentTime: new Date().toISOString(),
          customerId: invoice.customerId,
        });
      } catch (rtErr: any) {
        this.logger.warn(\`Gagal broadcast realtime payment: \${rtErr.message}\`);
      }`;

if (code.includes(coaTarget)) {
  code = code.replace(coaTarget, coaBroadcast);
} else if (code.includes(coaTargetAlt)) {
  code = code.replace(coaTargetAlt, coaBroadcast);
}

// 5. In payInvoiceWithCoa fallback for mock sample
const mockTarget = 'const generatedTxId = txRef || `TX-MOCK-${Date.now()}`;';
const mockBroadcast = `const generatedTxId = txRef || \`TX-MOCK-\${Date.now()}\`;
    try {
      this.realtimeService.broadcastPaymentReceived({
        invoiceId: invoiceId,
        invoiceNumber: invoiceId,
        customerName: 'Demo Pelanggan AUDIRA',
        amount: paymentData.amount || 250000,
        paymentMethod: paymentData.method || 'Online Payment',
        paymentTime: new Date().toISOString(),
      });
    } catch (_) {}`;

if (code.includes(mockTarget)) {
  code = code.replace(mockTarget, mockBroadcast);
}

fs.writeFileSync(file, code, 'utf-8');
console.log('Successfully updated billing.service.ts with RealtimeService!');

