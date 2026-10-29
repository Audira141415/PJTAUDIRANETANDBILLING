const { spawn } = require('child_process');
const http = require('http');

const urls = [
  'http://localhost:3217/pelanggan/CUST-00918',
  'http://localhost:3217/work-order-detail',
  'http://localhost:3217/attendance',
  'http://localhost:3217/audit-logs',
  'http://localhost:3217/backup',
  'http://localhost:3217/hrm-dashboard',
  'http://localhost:3217/modem-monitor',
  'http://localhost:3217/customer/dashboard',
  'http://localhost:3217/technician-checkin',
  'http://localhost:3217/technician-monitoring',
  'http://localhost:3217/invoices-admin'
];

async function run() {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9222/json/list', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      try {
        const pages = JSON.parse(data);
        const target = pages[0];
        if (!target) {
          console.error('No target page found');
          edge.kill();
          process.exit(1);
        }

        const ws = new WebSocket(target.webSocketDebuggerUrl);
        let id = 1;
        const send = (method, params = {}) => new Promise((resolve) => {
          const reqId = id++;
          const handler = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === reqId) {
              ws.removeEventListener('message', handler);
              resolve(msg.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id: reqId, method, params }));
        });

        ws.onopen = async () => {
          await send('Runtime.enable');
          await send('Page.enable');

          let exceptions = [];
          ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.method === 'Runtime.exceptionThrown') {
              exceptions.push(msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || ''));
            }
          };

          for (const url of urls) {
            exceptions = [];
            await send('Page.navigate', { url });
            await new Promise(r => setTimeout(r, 2500));

            const res = await send('Runtime.evaluate', {
              expression: 'JSON.stringify({ title: document.title, text: document.body.innerText.substring(0, 300).replace(/\\n+/g, " ") })'
            });

            let parsed = {};
            try {
              parsed = JSON.parse(res.result?.value || '{}');
            } catch (e) {}

            console.log('\n--- TESTING URL:', url);
            console.log('Title:', parsed.title);
            console.log('Exceptions:', exceptions.length > 0 ? exceptions : 'None');
            console.log('Body snippet:', parsed.text);
          }

          ws.close();
          edge.kill();
          process.exit(0);
        };

      } catch (err) {
        console.error(err);
        edge.kill();
        process.exit(1);
      }
    });
  }).on('error', (e) => {
    console.error('Edge connect error:', e);
    edge.kill();
    process.exit(1);
  });
}

run();
