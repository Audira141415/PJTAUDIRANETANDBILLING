/**
 * AUDIRA DEV - PreToolUse Safety Guard
 * Evaluates agent commands to prevent catastrophic operations, force pushes,
 * or port disruptions in multi-project environments.
 */

const fs = require('fs');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
    // Fallback timeout in case stdin remains open
    setTimeout(() => resolve(data), 3000);
  });
}

async function main() {
  try {
    const rawInput = await readStdin();
    if (!rawInput || !rawInput.trim()) {
      process.stdout.write(JSON.stringify({ decision: 'allow' }));
      return;
    }

    const payload = JSON.parse(rawInput);
    const toolCall = payload.toolCall || {};
    const commandLine = (toolCall.args && toolCall.args.CommandLine) || '';

    if (!commandLine) {
      process.stdout.write(JSON.stringify({ decision: 'allow' }));
      return;
    }

    const normalizedCmd = commandLine.trim().toLowerCase();

    // 1. Check for destructive force pushes
    if (/git\s+push\b.*(--force|-f)\b/i.test(normalizedCmd)) {
      process.stdout.write(
        JSON.stringify({
          decision: 'deny',
          reason: 'AUDIRA Safety Guard: Destructive `git push --force` is prohibited. Use standard `git push` or `save.bat`.'
        })
      );
      return;
    }

    // 2. Check for catastrophic hard git resets
    if (/git\s+reset\s+--hard\b/i.test(normalizedCmd)) {
      process.stdout.write(
        JSON.stringify({
          decision: 'deny',
          reason: 'AUDIRA Safety Guard: `git reset --hard` is restricted to prevent losing uncommitted portfolio work.'
        })
      );
      return;
    }

    // 3. Check for root or recursive wipe commands
    if (/rmdir\s+\/s\s+\/q\s+[c-z]:\\/i.test(normalizedCmd) || /rm\s+-rf\s+(\/|[a-z]:\\)/i.test(normalizedCmd)) {
      process.stdout.write(
        JSON.stringify({
          decision: 'deny',
          reason: 'AUDIRA Safety Guard: Root filesystem deletion command blocked.'
        })
      );
      return;
    }

    // 4. Check for destructive database drops
    if (/prisma\s+migrate\s+reset\s+--force/i.test(normalizedCmd)) {
      process.stdout.write(
        JSON.stringify({
          decision: 'ask',
          reason: 'AUDIRA Safety Guard: Prisma database reset requested. Requires developer confirmation.'
        })
      );
      return;
    }

    // Default: allow safe execution
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  } catch (err) {
    // Fail-safe allow to avoid locking up agent if parsing fails
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  }
}

main();
