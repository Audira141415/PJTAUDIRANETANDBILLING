const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function testAuthCockpit() {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    'http://localhost:3217/login'
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

          // Set user in localStorage and navigate to /
          ws.send(JSON.stringify({
            id: id++,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                localStorage.setItem('token', 'mock-admin-token-xyz');
                localStorage.setItem('user', JSON.stringify({
                  id: 'usr-admin-1',
                  email: 'admin@audira.net',
                  name: 'Agus Dwi Rianto',
                  role: 'ADMIN'
                }));
                window.location.href = 'http://localhost:3217/';
              `
            }
          }));

          // Wait 4 seconds for navigation to /
          await new Promise(r => setTimeout(r, 4000));

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
                fs.writeFileSync(path.join(__dirname, 'actual_authenticated_cockpit.png'), Buffer.from(base64Data, 'base64'));
                console.log('Saved actual_authenticated_cockpit.png');
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

testAuthCockpit();

