import { spawnSync } from 'node:child_process';
const args = process.argv.slice(2);
const commands = args[0] === 'nodev'
  ? [['docker', ['compose', 'build', 'nodev']], ['docker', ['compose', 'run', '--rm', '--no-deps', 'nodev']]]
  : [[process.execPath, ['--experimental-vm-modules', 'node_modules/.bin/jest', ...args]]];
for (const [command, options] of commands) {
  const result = spawnSync(command, options, { stdio: 'inherit' });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) process.exit(result.status || 1);
}
