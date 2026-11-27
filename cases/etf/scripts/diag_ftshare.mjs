import fs from 'node:fs';

const p = 'src/server/ftshare.js';
let src = fs.readFileSync(p, 'utf8');
const target = "throw new FTShareError('FtShare数据暂不可用');";
if (src.includes(target)) {
  src = src.replaceAll(
    target,
    `console.error('=== FTSHARE_TOOL_ERR ===', JSON.stringify({ tool: name, args, isError: r?.isError, error: s?.error, text: r?.content?.find(c => c.type === 'text')?.text?.slice(0, 400) })); ${target}`
  );
  fs.writeFileSync(p, src, 'utf8');
}
