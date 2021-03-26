/* eslint-disable camelcase */
const toSisUser = ({
  sis_user_id, login_id, sortable_name, email,
}) => {
  const [last_name, first_name] = sortable_name.split(', ');
  return {
    user_id: sis_user_id,
    login_id,
    first_name,
    last_name,
    email,
    status: 'active',
  };
};

export default arr => (Array.isArray(arr) ? arr.map(toSisUser) : toSisUser(arr));
