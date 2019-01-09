require('dotenv').config();

const settings = {
  jex: {
    username: process.env.jex_username,
    password: process.env.jex_password,
    server: process.env.jex_server,
    database: process.env.jex_database,
  },
  ldap: {
    url: process.env.ldap_url,
    base: process.env.ldap_base,
    dn: process.env.ldap_dn,
    password: process.env.ldap_password,
  },
  canvas: {
    hostname: process.env.canvas_hostname,
    token: process.env.canvas_token,
  },
  // for emailing reports
  postmarkAPIKey: process.env.postmark_api_key,
  emailTo: process.env.email_to,
  emailFrom: process.env.email_from,

  // users and enrollments will only be processed for these courses
  // (course id must be in JEX format)
  onlyCourses: [
    'IDM  6611 20',
    'SD   6750 20',
    'GWD  7460 20',
    'HS   5010 20',
    '2D   3206 20',
    'ILL  2000 01',
    'GRD  5100 01',
    'AH   2103 01',
  ],
  onlyTerm: 'SP',
  onlyRealYear: 2019,

  // users to ignore when processing drops
  ignoreUsers: ['mlisa'],
};

export default settings;
