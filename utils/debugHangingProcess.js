import process from 'process';
import { inspect } from 'util';

export default () => {
  /* eslint-disable no-underscore-dangle */
  const activeHandles = process._getActiveHandles();
  const activeRequests = process._getActiveRequests();
  /* eslint-enable no-underscore-dangle */
  console.warn(`
  ===============================
  ℹ️ Active Handles:
  ${inspect(activeHandles)}
  
  ---
  ℹ️ Active Requests:
  ${activeRequests}

  ===============================
  `);
};
