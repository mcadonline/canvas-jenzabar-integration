import { pipe } from 'ramda';
import fetchFromCanvas from './fetchFromCanvas';
import parseIntsInObject from '../../utils/parseIntsInObject';

// eslint-disable-next-line camelcase
const remapUserProps = ({ sis_user_id, sortable_name, email }) => {
  const [lastName, firstName] = sortable_name.split(',');
  return {
    user_id: sis_user_id,
    login_id: sis_user_id,
    first_name: firstName ? firstName.trim() : '',
    last_name: lastName ? lastName.trim() : '',
    email: email || null,
    status: 'active',
  };
};

const normalizeCanvasUserData = pipe(
  remapUserProps,
  parseIntsInObject,
);

export default async function getUsers() {
  try {
    const users = await fetchFromCanvas('/accounts/1/users?include[]=email');
    return users.map(normalizeCanvasUserData);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
