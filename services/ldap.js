import SimpleLDAP from 'simple-ldap-search';
import settings from '../settings';

const ldap = new SimpleLDAP(settings.ldap);

ldap.close = ldap.destroy;

export default ldap;
