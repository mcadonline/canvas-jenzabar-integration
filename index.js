// This file allows ES Modules to load, which is currently
// not supported in NodeJS 10

require = require('esm')(module); // eslint-disable-line no-global-assign
const main = require('./src/main').default;

main();
