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
      sections: [
        'GWD  7410 20', // MAGWD / Web Design
        'CSDE 9478 20', // CE / Motion Illustration
        'GWD  7460 20', // MAGWD / UX Design
        'HS   5010 20', // LA / LA Adv Sem
        'GWD  6610 20', // MAGWD / Web Dev: HTML + CSS
        'IDM  6611 20', // Web Dev: HTML
        'IDM  6612 20', // Web Dev: CSS
        'IDM  6613 20', // Web Dev: Projects
        'SD   7010 20', // SD Practicum
        'SD   7021 20', // SD Thesis Project 1
        'SD   7022 20', // SD Thesis Project 2
        'CSDE 9305 20', // CE / Comic Art Crash Course
        'CSID 6631 20', // Web Dev: PHP and MySQL
        'HS   3317 20', // LA / Myth, Ritual, and Symbolism
        'SD   6510 20', // SD / Systems Thinking
        'VC   4207 20', // CE / Graphic Design Essentials
        'CSID 6632 20', // CE / Web Dev: Wordpress
        'CSMA 9342 20', // CE / Game Mechanics
        'AH   3862 01', // LA / Bauhaus
        'HS   3862 01', // LA / Bauhaus cross-list
        'AH   2103 01', // LA / Applied Arts
        'HS   5010 04', // LA / LA Adv Sem - GGG
      ],
    },
  ],

  // users to ignore when processing drops
  ignoreUsers: ['mlisa'],
};

export default settings;
