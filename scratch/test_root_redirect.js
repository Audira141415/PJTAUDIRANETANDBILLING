const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function capture(url, outputPath) {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    url
  ]);

  await new Promise(r => setTimeout(r, 2500));

  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const pages = JSON.parse(data);
          const target = pages.find(p => p.url.includes('3217') || p.type === 'page');
          if (!target) {
            edge.kill();
            return reject(new Error('Target page not found'));
          }

          const ws = new WebSocket(target.webSocketDebuggerUrl);
          let id = 1;

          ws.onopen = async () => {
            ws.send(JSON.stringify({ id: id++, method: 'Page.enable' }));
            ws.send(JSON.stringify({ id: id++, method: 'Runtime.enable' }));

            // Wait 5 seconds for any client-side redirect (e.g. / -> /landing)
            await new Promise(r => setTimeout(r, 5000));

            const snapId = id++;
            ws.send(JSON.stringify({
              id: snapId,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));

            const onMsg = (event) => {
              const msg = JSON.parse(event.data);
              if (msg.id === snapId) {
                const base64Data = msg.result?.data;
                if (base64Data) {
                  fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
                  console.log(`Saved screenshot to ${outputPath}`);
                }
                ws.close();
                edge.kill();
                resolve();
              }
            };
            ws.addEventListener('message', onMsg);
          };
        } catch (e) {
          edge.kill();
          reject(e);
        }
      });
    }).on('error', err => {
      edge.kill();
      reject(err);
    });
  });
}

async function main() {
  await capture('http://localhost:3217/', path.join(__dirname, 'actual_root_redirect.png'));
}

main().catch(console.error);

