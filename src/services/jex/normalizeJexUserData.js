export default ({
  sisId, firstName, preferredName, lastName, mcadEmail,
}) => ({
  user_id: sisId,
  login_id: sisId,
  first_name: preferredName || firstName,
  last_name: lastName,
  email: mcadEmail,
  status: 'active',
});
