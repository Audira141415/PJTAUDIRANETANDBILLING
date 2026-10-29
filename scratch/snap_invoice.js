const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function snap() {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1200,1000',
    'http://localhost:3217/invoice/INV-2026-07-0012'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get('http://127.0.0.1:9222/json/list', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const pages = JSON.parse(data);
      const target = pages.find(p => p.url.includes('3217'));
      if (!target) {
        console.log('No 3217 target');
        edge.kill();
        process.exit(1);
      }

      const ws = new WebSocket(target.webSocketDebuggerUrl);
      ws.onopen = async () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        await new Promise(r => setTimeout(r, 3000));
        ws.send(JSON.stringify({
          id: 2,
          method: 'Page.captureScreenshot',
          params: { format: 'png', captureBeyondViewport: true }
        }));
      };

      ws.onmessage = (ev) => {
        const m = JSON.parse(ev.data);
        if (m.id === 2 && m.result && m.result.data) {
          const buf = Buffer.from(m.result.data, 'base64');
          fs.writeFileSync('C:/Users/ASUS/.gemini/antigravity-ide/brain/4cdabdef-dbd0-4f8b-aa43-af60adcb472c/scratch/current_invoice_screen.png', buf);
          console.log('Screenshot saved to scratch/current_invoice_screen.png');
          edge.kill();
          process.exit(0);
        }
      };
    });
  });
}
snap();
