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
    'GRD  2000 01',
    'AH   2103 01',
  ],
  onlyTerm: 'SP',
  onlyRealYear: 2019,

  // will be excluded from jex SQL query
  // exclusions: [
  //   '% IN99% %', // Internships
  //   '% 4010 91', // Internships
  //   '% EX99% %', // Externships
  //   '% IS99 %', // Independent Studies
  //   'OC %', // off campus
  //   // 9000 level class = CE classes, which can sometimes be online
  //   // exclude section numbers that begin with 0 or 1,
  //   // online courses should begin with 2
  //   '% 9% 0_',
  //   '% 9% 1_',
  //   'DT %', // Placeholder for registration billing
  //   '% GM99 %', // Graduate Mentored Credits
  //   'GRST 7018 %', // Graduate Thesis Exhibition
  //   'CSK %', // CE Kids courses
  //   'CST %', // CE Teen courses
  //   'WAIVE', // Waived courses?
  // ],
  // what to use as the user's primary identifier
  // jexUser[primaryUserId] === BbUser[primaryUserId]
  // we use this field as EXTERNAL_PERSON_KEY (aka batch_uid)
  // in SP18, we're using `username`. We plan to change
  // to `id` beginning SU18.
  primaryUserId: process.env.primary_user_id, // 'id' or 'username'

  // users to ignore when processing drops
  // wildcards can be used like *_previewuser
  ignoreUsers: ['mlisa', 'inewton', '*_previewuser'],

  // throw an error if there's an insane number of drops
  dropSanityCheck: true,
};

export default settings;
