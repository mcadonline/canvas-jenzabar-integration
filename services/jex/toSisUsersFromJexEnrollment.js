import { uniq } from 'ramda';

const toSisUser = ({
  id, firstName, preferredName, lastName, mcadEmail,
}) => ({
  user_id: id.toString(),
  login_id: id.toString(),
  first_name: preferredName || firstName,
  last_name: lastName,
  // note that according to IT, mcadEmail should be a valid
  // @mcad.edu email address if one is active, otherwise
  // it will be a valid personalEmail address.
  email: mcadEmail,

  status: 'active',
});

export default arr => (Array.isArray(arr) ? uniq(arr.map(toSisUser)) : toSisUser(arr));
