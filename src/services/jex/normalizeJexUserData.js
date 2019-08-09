export default ({
  sisId, firstName, preferredName, lastName, mcadEmail,
}) => {
  const sisIdInt = Number.parseInt(sisId, 10);
  return {
    user_id: sisIdInt,
    login_id: sisIdInt,
    first_name: preferredName || firstName,
    last_name: lastName,
    email: mcadEmail,
    status: 'active',
  };
};
