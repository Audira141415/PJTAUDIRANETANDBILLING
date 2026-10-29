const { spawn } = require('child_process');
const http = require('http');

async function test(url) {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    url
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9222/json/list', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      try {
        const pages = JSON.parse(data);
        const target = pages.find(p => p.url.includes('3217'));
        if (!target) {
          console.log('No 3217 target in:', pages);
          edge.kill();
          process.exit(1);
        }

        const ws = new WebSocket(target.webSocketDebuggerUrl);
        let id = 1;

        ws.onopen = () => {
          ws.send(JSON.stringify({ id: id++, method: 'Runtime.enable' }));
          ws.send(JSON.stringify({ id: id++, method: 'Page.enable' }));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.method === 'Runtime.consoleAPICalled') {
            console.log(`[CONSOLE ${msg.params.type}]`, msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' '));
          } else if (msg.method === 'Runtime.exceptionThrown') {
            console.error('[EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
          }
        };

        await new Promise(r => setTimeout(r, 4000));

        const evalId = id++;
        ws.send(JSON.stringify({
          id: evalId,
          method: 'Runtime.evaluate',
          params: { expression: 'document.body.innerText' }
        }));

        ws.addEventListener('message', (ev) => {
          const m = JSON.parse(ev.data);
          if (m.id === evalId) {
            console.log('=== DOCUMENT BODY INNERTEXT ===');
            console.log(m.result?.result?.value);
            console.log('================================');
            ws.close();
            edge.kill();
            process.exit(0);
          }
        });

      } catch (e) {
        console.error('Error:', e);
        edge.kill();
        process.exit(1);
      }
    });
  }).on('error', e => {
    console.error('HTTP get error:', e);
    edge.kill();
    process.exit(1);
  });
}

const targetUrl = process.argv[2] || 'http://localhost:3217/pelanggan/CUST-00918';
test(targetUrl);
