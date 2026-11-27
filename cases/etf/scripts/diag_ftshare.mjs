import fs from 'node:fs';

const p = 'src/server/ftshare.js';
let src = fs.readFileSync(p, 'utf8');
console.log('=== FTSHARE_KEY_LEN ===', (process.env.FTSHARE_API_KEY || '').trim().length);
console.log('=== FTSHARE_SRC_LINES_25_75 ===');
console.log(src.split('\n').slice(24, 75).map((l, i) => `${25 + i}: ${l}`).join('\n'));

const target = "throw new FTShareError('FtShare数据暂不可用');";
if (src.includes(target)) {
  src = src.replaceAll(
    target,
    `console.error('=== FTSHARE_UPSTREAM_ERR ===', { status: typeof response !== 'undefined' ? response?.status : (typeof res !== 'undefined' ? res?.status : null), body: typeof payload !== 'undefined' ? JSON.stringify(payload).slice(0, 400) : (typeof body !== 'undefined' ? String(body).slice(0, 400) : (typeof text !== 'undefined' ? String(text).slice(0, 400) : null)) }); ${target}`
  );
  fs.writeFileSync(p, src, 'utf8');
  console.log('Injected upstream error logger cleanly.');
}
