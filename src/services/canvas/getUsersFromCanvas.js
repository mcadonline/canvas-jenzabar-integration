import fetchFromCanvas from './fetchFromCanvas';

// eslint-disable-next-line camelcase
const normalizeCanvasUserData = ({ sis_user_id, sortable_name, email }) => {
  const [lastName, firstName] = sortable_name.split(',');
  return {
    user_id: sis_user_id,
    login_id: sis_user_id,
    first_name: firstName,
    last_name: lastName,
    email,
    status: 'active',
  };
};

export default async function getUsers() {
  try {
    const users = await fetchFromCanvas('/users');
    return users.map(normalizeCanvasUserData);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
