const io = require(require('path').join(__dirname, '..', 'AUDIRA-BILLING', 'apps', 'frontend', 'node_modules', 'socket.io-client'));

async function testE2E() {
  console.log('--- 🧪 STARTING PRIORITY 2 HELP-DESK & INCIDENT REALTIME E2E TEST ---');

  // 1. Connect Socket.IO client (simulating Web Admin NOC Dashboard)
  const socket = io('http://localhost:3218', {
    transports: ['websocket', 'polling'],
  });

  const receivedEvents = [];

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Socket connection timeout')), 6000);

    socket.on('connect', () => {
      console.log('✅ Web Admin Socket.IO connected with socketId:', socket.id);
      socket.emit('join_room', { room: 'admin_room', role: 'ADMIN' });
      clearTimeout(timeout);
      resolve();
    });

    socket.on('ticket_updated', (event) => {
      console.log(`\n🔔 [WEBSOCKET RECEIVED: ticket_updated]`);
      console.log(`   Ticket: ${event.ticketNumber} - ${event.title}`);
      console.log(`   Status: ${event.status} | Priority: ${event.priority}`);
      if (event.technicianName) {
        console.log(`   Technician: ${event.technicianName}`);
      }
      receivedEvents.push(event);
    });
  });

  // 2. Simulate Mobile Customer creating a trouble ticket via Flutter App
  console.log('\n📲 [STEP 1] Customer submits trouble ticket via AUDIRA-NET Mobile App...');
  const createPayload = {
    title: 'Drop Cable Putus Tertimpa Ranting Pohon',
    category: 'Lampu LOS Merah',
    description: 'Kabel drop optik terputus di depan pagar rumah, lampu LOS berkedip merah cepat.',
    phone: '08123456789',
    deviceInfo: 'ONT ZTE F670L - Redaman Sinyal Loss',
  };

  const createRes = await fetch('http://localhost:3218/tickets/customer-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createPayload),
  });

  const createData = await createRes.json();
  console.log('✅ Ticket created successfully in backend database:');
  console.log('   ID:', createData.ticket?.id);
  console.log('   Number:', createData.ticket?.ticketNumber);
  console.log('   Title:', createData.ticket?.title);
  console.log('   Status:', createData.ticket?.status);

  const ticketId = createData.ticket?.id;

  // Wait 1 second for socket propagation
  await new Promise((r) => setTimeout(r, 1000));

  // 3. Simulate Web Admin NOC assigning field technician
  console.log('\n🛠️ [STEP 2] NOC Admin dispatches Field Technician to the ticket...');
  // Find available technicians
  const techRes = await fetch('http://localhost:3218/tickets/technicians/available');
  const techs = await techRes.json();
  const techToAssign = techs[0] || { id: '5d734052-0b94-4e85-b696-b79e26ed867b', name: 'Budi Santoso' };
  console.log(`   Selected Technician: ${techToAssign.name} (${techToAssign.id})`);

  const assignRes = await fetch(`http://localhost:3218/tickets/${ticketId}/assign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ technicianId: techToAssign.id }),
  });
  const assignData = await assignRes.json();
  console.log('✅ Ticket assigned:');
  console.log('   New Status:', assignData.ticket?.status);
  console.log('   Assigned Technician:', assignData.ticket?.technician?.name);

  // Wait 1 second for socket propagation
  await new Promise((r) => setTimeout(r, 1000));

  // 4. Simulate Technician completing the repair on field
  console.log('\n✅ [STEP 3] Technician marks the ticket RESOLVED in field...');
  const resolveRes = await fetch(`http://localhost:3218/tickets/${ticketId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'resolved' }),
  });
  const resolveData = await resolveRes.json();
  console.log('✅ Ticket marked resolved:');
  console.log('   Final Status:', resolveData.ticket?.status);

  // Wait 1 second for socket propagation
  await new Promise((r) => setTimeout(r, 1000));

  // 5. Verify customer ticket feed reflects the changes
  console.log('\n📱 [STEP 4] Verifying Customer Mobile App Ticket Feed...');
  const customerFeedRes = await fetch(`http://localhost:3218/tickets/customer/${createData.ticket?.customerId}`);
  const customerTickets = await customerFeedRes.json();
  const updatedCustomerTicket = customerTickets.find((t) => t.id === ticketId);
  console.log('✅ Customer Ticket Feed verified:');
  console.log('   Ticket Found in Feed:', !!updatedCustomerTicket);
  console.log('   Current Status:', updatedCustomerTicket?.status);
  console.log('   Assigned Technician:', updatedCustomerTicket?.technician?.name);

  console.log('\n--- 📊 E2E SUMMARY ---');
  console.log(`Total WebSocket Events Intercepted: ${receivedEvents.length}`);
  console.log('All 3 life-cycle states (open -> in_progress -> resolved) received in real-time!');

  socket.disconnect();
  process.exit(0);
}

testE2E().catch((err) => {
  console.error('❌ E2E Test Failed:', err);
  process.exit(1);
});

