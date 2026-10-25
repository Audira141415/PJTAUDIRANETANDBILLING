const { io } = require('socket.io-client');
const http = require('http');

const SERVER_URL = 'http://localhost:3218';

console.log('====================================================');
console.log('  AUDIRA REALTIME WEBSOCKET INTEGRATION TEST');
console.log('====================================================\n');

async function runRealtimeTest() {
  console.log(`[1/4] Connecting to WebSocket Gateway at ${SERVER_URL}...`);
  
  const socket = io(SERVER_URL, {
    transports: ['websocket', 'polling'],
    timeout: 5000,
  });

  let handshakeReceived = false;
  let paymentReceived = false;
  let ticketReceived = false;
  let testCompleted = false;

  const timeoutTimer = setTimeout(() => {
    if (!testCompleted) {
      console.error('\n[TIMEOUT] Test took too long. Summary:');
      console.log(`- Handshake received: ${handshakeReceived ? 'YES' : 'NO'}`);
      console.log(`- Payment event received: ${paymentReceived ? 'YES' : 'NO'}`);
      console.log(`- Ticket event received: ${ticketReceived ? 'YES' : 'NO'}`);
      socket.disconnect();
      process.exit(1);
    }
  }, 12000);

  socket.on('connect', () => {
    console.log(`[OK] WebSocket Connected! Socket ID: ${socket.id}`);
    console.log('[2/4] Joining room: admin_room...');
    socket.emit('join_room', { room: 'admin_room', role: 'ADMIN' }, (ack) => {
      console.log('  -> Join Ack:', ack);
    });
  });

  socket.on('connected', (data) => {
    handshakeReceived = true;
    console.log('  -> Handshake Payload:', data.message);

    // After joining, trigger a test payment broadcast via REST API
    setTimeout(() => {
      console.log('\n[3/4] Triggering simulated payment event via Backend REST API...');
      triggerBroadcast('payment', {
        invoiceNumber: 'INV/2026/10/LIVE-001',
        customerName: 'Bpk. Agus Dwi Rianto',
        amount: 350000,
        paymentMethod: 'QRIS Realtime',
      });
    }, 1000);
  });

  socket.on('payment_received', (data) => {
    paymentReceived = true;
    console.log('\n[SUCCESS] Received Realtime Event "payment_received":');
    console.log(`  - Invoice: ${data.invoiceNumber}`);
    console.log(`  - Pelanggan: ${data.customerName}`);
    console.log(`  - Jumlah: Rp ${Number(data.amount).toLocaleString('id-ID')}`);
    console.log(`  - Waktu: ${data.timestamp}`);

    // Trigger ticket event next
    setTimeout(() => {
      console.log('\n[4/4] Triggering simulated ticket event...');
      triggerBroadcast('ticket', {
        title: 'Instalasi PSB Fiber Baru ODP-KOT-04',
        status: 'ASSIGNED',
        customerName: 'Ibu Siti Rahmawati',
      });
    }, 1000);
  });

  socket.on('ticket_updated', (data) => {
    ticketReceived = true;
    console.log('\n[SUCCESS] Received Realtime Event "ticket_updated":');
    console.log(`  - Judul: ${data.title}`);
    console.log(`  - Status: ${data.status}`);
    console.log(`  - Pelanggan: ${data.customerName}`);

    testCompleted = true;
    clearTimeout(timeoutTimer);

    console.log('\n====================================================');
    console.log('  ALL REALTIME WEBSOCKET TESTS PASSED SUCCESSFULLY! ✅');
    console.log('====================================================');
    socket.disconnect();
    process.exit(0);
  });

  socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
  });
}

function triggerBroadcast(type, payload) {
  const postData = JSON.stringify({ type, ...payload });

  const req = http.request(
    {
      hostname: 'localhost',
      port: 3218,
      path: '/realtime/test-broadcast',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        // console.log(`Trigger response (${res.statusCode}):`, data);
      });
    }
  );

  req.on('error', (e) => {
    console.error('Failed to trigger broadcast:', e.message);
  });

  req.write(postData);
  req.end();
}

runRealtimeTest();
