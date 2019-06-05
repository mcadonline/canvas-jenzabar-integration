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

  // users and enrollments will only be processed for these courses
  // (course id must be in JEX format)
  onlyCourses: [
    {
      term: 'SP',
      year: 2019,
      sections: [
        'SD   6750 20',
        'GWD  7460 20',
        'HS   5010 20',
        '2D   3206 20',
        'ILL  2000 01',
        'GRD  5100 01',
        'AH   2103 01',
      ],
    },
    {
      term: 'SU',
      year: 2019,
      sections: ['HS   5010 20', 'GWD  7800 20', 'CSLA 4004 01'],
    },
    {
      term: 'FA',
      year: 2019,
      sections: ['GWD  7410 20', 'CSDE 9478 20', 'GWD  7460 20', 'HS   5010 20'],
    },
  ],

  // users to ignore when processing drops
  ignoreUsers: ['mlisa'],
};

export default settings;
