import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { brotliCompressSync, brotliDecompressSync } from 'node:zlib';
import Papa from 'papaparse';
import '../check-node.js';

function run(args) {
  const result = spawnSync(process.execPath, args, {
    encoding: 'utf8', timeout: 120000,
    env: { ...process.env, TZ: 'America/Chicago' },
  });
  process.stdout.write(result.stdout || '');
  process.stderr.write(result.stderr || '');
  assert.equal(result.error, undefined, 'Subprocess must complete');
  assert.equal(result.status, 0, 'Subprocess must succeed');
  assert(!/Unmocked|Cannot |❌/.test(result.stderr), 'No swallowed service errors');
  return result.stdout;
}
console.log(`[nodev] Node ${process.version}; Brotli ${process.versions.brotli}`);
const input = Buffer.from('Dummy Canvas/Jenzabar Node validation');
assert.deepEqual(brotliDecompressSync(brotliCompressSync(input)), input);
console.log('[nodev] PASS Brotli round trip (functional check, not an exploit test)');
run(['scripts/test-runner.js', '--runInBand', '--testPathIgnorePatterns', 'services/jex/index.test.js', 'services/jex/jexService.test.js', '--testNamePattern=^(?!.*[Ii]ntegration)']);
const cli = readFileSync('cli.js', 'utf8');
const dictionary = cli.match(/const generatorDict = \{([\s\S]*?)\n\};/)[1];
const generators = [...dictionary.matchAll(/^\s*['"]?([\w-]+)['"]?:/gm)].map(match => match[1]);
assert.equal(generators.length, 13, 'All registered CLI generators must be discovered');
for (const generator of generators) {
  const output = run(['--import', './scripts/nodev/preload.js', 'cli.js', generator, '--file', '--upload', '--current-date-time', '2026-11-15T12:00:00-06:00']);
  assert(!output.includes('❌') && !output.includes('Cannot '), `${generator}: no swallowed errors`);
  assert(output.includes('Dummy Jenzabar'), `${generator}: dummy database exercised`);
  assert(output.includes('Saving to file:'), `${generator}: CSV written`);
  assert(output.includes('Dummy Canvas POST'), `${generator}: simulated upload exercised`);
  assert(output.includes('\"dummy\":true'), `${generator}: simulated upload acknowledged`);
  console.log(`[nodev] PASS CLI ${generator}`);
}
const files = readdirSync('tmp').filter(file => file.endsWith('.csv'));
assert.equal(files.length, generators.length, 'Each generator must write its own CSV file');
for (const file of files) {
  const csv = Papa.parse(readFileSync(`tmp/${file}`, 'utf8'), { header: true });
  assert.equal(csv.errors.length, 0, `Valid CSV: ${file}`);
  assert(csv.data.length > 0, `Nonempty CSV: ${file}`);
}
console.log(`[nodev] PASS ${generators.length} CLI generators; ${files.length} CSV files validated. Network disabled by Docker.`);
console.log('[nodev] This validates fixture paths and unit tests, not every possible input or real server compatibility.');
