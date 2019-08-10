import path from 'path';

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const settings = {
  jex: {
    username: process.env.jex_username,
    password: process.env.jex_password,
    server: process.env.jex_server,
    database: process.env.jex_database,
  },
  canvas: {
    hostname: process.env.canvas_hostname,
    token: process.env.canvas_token,
  },
  // users to ignore when processing drops
  ignoreUsers: ['mlisa'],
};

export default settings;
