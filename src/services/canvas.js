import fetch from 'node-fetch';
import settings from '../settings';

const { token, hostname } = settings.canvas;

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

export default {
  async getUsers() {
    const url = `https://${hostname}/api/v1/accounts/1/users`;
    const headers = { Authorization: `Bearer ${token}` };
    const payload = await fetch(`${url}/api/v1/accounts/1/`, { headers }).then(res => res.json());

    return payload.map(normalizeCanvasUserData);
  },
};
