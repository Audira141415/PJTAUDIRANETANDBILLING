const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function captureFooter() {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    'http://localhost:3217/landing'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get('http://127.0.0.1:9222/json/list', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      try {
        const pages = JSON.parse(data);
        const target = pages.find(p => p.url.includes('3217') || p.type === 'page');
        if (!target) {
          edge.kill();
          return;
        }

        const ws = new WebSocket(target.webSocketDebuggerUrl);
        let id = 1;

        ws.onopen = async () => {
          ws.send(JSON.stringify({ id: id++, method: 'Page.enable' }));
          ws.send(JSON.stringify({ id: id++, method: 'Runtime.enable' }));
          await new Promise(r => setTimeout(r, 1500));

          // Scroll to bottom
          ws.send(JSON.stringify({
            id: id++,
            method: 'Runtime.evaluate',
            params: { expression: 'window.scrollTo(0, document.body.scrollHeight)' }
          }));

          await new Promise(r => setTimeout(r, 2000));

          const snapId = id++;
          ws.send(JSON.stringify({
            id: snapId,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));

          ws.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id === snapId) {
              const base64Data = msg.result?.data;
              if (base64Data) {
                fs.writeFileSync(path.join(__dirname, 'actual_landing_footer.png'), Buffer.from(base64Data, 'base64'));
                console.log('Saved actual_landing_footer.png');
              }
              ws.close();
              edge.kill();
              process.exit(0);
            }
          });
        };
      } catch (e) {
        edge.kill();
      }
    });
  });
}

captureFooter();

