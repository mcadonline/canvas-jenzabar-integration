import uuidv4 from 'uuid/v4';
import queryString from 'query-string';
import fetchFromCanvas from './fetchFromCanvas';
import postToCanvas from './postToCanvas';

const hasBookmarkWithName = async (name) => {
  const url = '/users/self/bookmarks';
  const bookmarks = await fetchFromCanvas(url).catch(err => console.error(`Fetch error: ${JSON.stringify(err)}`));
  return bookmarks.some(x => x.name === name);
};

const createBookmark = async (bookmarkName, bookmarkedUrl) => {
  const queryParams = { name: bookmarkName, url: bookmarkedUrl };
  const url = `/users/self/bookmarks?${queryString.stringify(queryParams)}`;
  const res = await postToCanvas(url).catch(console.error);
  return res;
};

const removeBookmark = async (bookmarkId) => {
  const url = `/users/self/bookmarks/${bookmarkId}`;
  const res = await postToCanvas(url, {}, { method: 'DELETE' }).catch(console.error);
  return res;
};

describe('postToCanvas', () => {
  it('posts a bookmark successfully', async () => {
    const bookmarkName = `test-${uuidv4()}`;

    // 1: expect no bookmark with bookmark name to begin with
    expect(await hasBookmarkWithName(bookmarkName)).toBeFalsy();

    // 2: create a new bookmark via postToCanvas
    const { id } = await createBookmark(bookmarkName, '/courses/1');
    expect(id).toBeGreaterThanOrEqual(1);

    // 3: check that bookmarks contain bookmarkName
    expect(await hasBookmarkWithName(bookmarkName)).toBeTruthy();

    // 4: CLEANUP - remove bookmark via postToCanvas
    // and expect no bookmark with bookmark name
    await removeBookmark(id);
    expect(await hasBookmarkWithName(bookmarkName)).toBeFalsy();
  });
});
