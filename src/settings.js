import path from 'path';
import dotenv from 'dotenv';

// path relative to __dirname
const pathname = path.resolve('./.env');

dotenv.config({
  path: pathname,
});

const settings = {
  jex: {
    user: process.env.jex_username,
    password: process.env.jex_password,
    server: process.env.jex_server,
    database: process.env.jex_database,
    options: {
      useUTC: false,
      enableArithAbort: true,
    },
  },
  canvas: {
    hostname: process.env.canvas_hostname,
    token: process.env.canvas_token,
  },
};

export default settings;
