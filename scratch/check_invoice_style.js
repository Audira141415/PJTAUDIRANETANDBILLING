const { spawn } = require('child_process');
const http = require('http');

async function check() {
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
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
        console.log('Target not found');
        edge.kill();
        process.exit(1);
      }
      const ws = new WebSocket(target.webSocketDebuggerUrl);
      ws.onopen = async () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        await new Promise(r => setTimeout(r, 3000));
        ws.send(JSON.stringify({
          id: 2,
          method: 'Runtime.evaluate',
          params: {
            expression: `(() => {
              const htmlClass = document.documentElement.className;
              const docStyle = window.getComputedStyle(document.documentElement);
              const cssVars = {
                '--app-bg': docStyle.getPropertyValue('--app-bg'),
                '--app-card': docStyle.getPropertyValue('--app-card'),
                '--app-card-subtle': docStyle.getPropertyValue('--app-card-subtle'),
                '--app-text': docStyle.getPropertyValue('--app-text'),
                '--app-text-muted': docStyle.getPropertyValue('--app-text-muted')
              };
              const elements = Array.from(document.querySelectorAll('#printable-invoice [class*="bg-"]')).map(el => ({
                tag: el.tagName,
                text: el.innerText.slice(0, 30).replace(/\\n/g, ' '),
                class: el.className,
                bg: window.getComputedStyle(el).backgroundColor,
                color: window.getComputedStyle(el).color
              }));
              return { htmlClass, cssVars, elements };
            })()`,
            returnByValue: true
          }
        }));
      };
      ws.onmessage = (ev) => {
        const m = JSON.parse(ev.data);
        if (m.id === 2) {
          console.log('RESULT:', JSON.stringify(m.result.result.value, null, 2));
          edge.kill();
          process.exit(0);
        }
      };
    });
  });
}
check();
