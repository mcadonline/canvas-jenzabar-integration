// Only loaded explicitly by the isolated nodev demonstration.
import { registerHooks } from 'node:module';
const fixtureUrl = new URL('./transports.js', import.meta.url).href;
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'isomorphic-fetch' || specifier === 'mssql') {
      return { url: `${fixtureUrl}?transport=${specifier}`, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});
process.env.canvas_hostname = 'canvas.invalid';
process.env.canvas_token = 'dummy-token';
process.env.jex_server = 'jenzabar.invalid';
console.log('[nodev] Dummy transports enabled; no real service credentials are used.');
