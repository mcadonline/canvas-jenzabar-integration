import fetch from 'node-fetch';
import parseLinkHeader from 'parse-link-header';
import settings from '../../settings';

const { error } = console;
const { token, hostname } = settings.canvas;

export default async (url, config) => {
  const baseUrl = `https://${hostname}/api/v1`;
  const headers = { Authorization: `Bearer ${token}` };

  try {
    let nextPage = `${baseUrl}${url}`;
    let collection = [];

    // loop through paginated links
    while (nextPage) {
      /* eslint-disable no-await-in-loop */
      const res = await fetch(nextPage, { headers, ...config });
      const payload = await res.json();
      collection = collection.concat(payload);
      const linkHeader = parseLinkHeader(res.headers.get('link'));
      nextPage = linkHeader && linkHeader.next && linkHeader.next.url;
      /* eslint-enable no-await-in-loop */
    }

    return collection;
  } catch (err) {
    error(err.message);
    throw err;
  }
};
