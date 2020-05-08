import { pick } from 'ramda';
import fetchFromCanvas from './fetchFromCanvas';

export default async function getUsers() {
  const users = await fetchFromCanvas('/accounts/1/users?include[]=email&per_page=500');
  return users
    .filter(u => !!u.sis_user_id)
    .map(pick(['id', 'name', 'sortable_name', 'short_name', 'sis_user_id', 'login_id', 'email']));
}
