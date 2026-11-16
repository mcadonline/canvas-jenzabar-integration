// Keep this minimum in sync with package.json, .nvmrc, and .node-version.
// Node bundles Brotli: npm dependency updates cannot patch its native decoder.
const [major, minor, patch] = process.versions.node.split('.').map(Number);

if (major !== 24 || minor < 22 || (minor === 22 && patch < 3)) {
  throw new Error(
    `Unsupported Node.js ${process.versions.node}. Use Node.js 24.22.3 or a newer 24.x patch release. ` +
      'Older runtimes may contain vulnerable Brotli decoders (CVE-2026-111497). Run nvm install && nvm use.'
  );
}
