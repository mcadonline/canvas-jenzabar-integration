import fetch from 'node-fetch';
import queryString from 'query-string';
import postToCanvas from './postToCanvas';

jest.mock('node-fetch');

// const hasBookmarkWithName = async (name) => {
//   const url = '/users/self/bookmarks';
//   const bookmarks = await fetchFromCanvas(url).catch(err => console.error(`Fetch error: ${JSON.stringify(err)}`));
//   return bookmarks.some(x => x.name === name);
// };

const createBookmark = async (bookmarkName, bookmarkedUrl) => {
  const queryParams = { name: bookmarkName, url: bookmarkedUrl };
  const url = `/users/self/bookmarks?${queryString.stringify(queryParams)}`;
  const res = await postToCanvas(url).catch(console.error);
  return res;
};

const mockData = {
  id: 13,
  name: 'test',
  url: '/courses/1',
  position: 2,
  data: null,
};

describe('postToCanvas', () => {
  beforeEach(() => {
    fetch.mockResolvedValue({
      json: () => mockData,
    });
  });

  it('posts a bookmark successfully', async () => {
    const queryParams = { name: 'test', url: '/courses/1' };
    const url = `/users/self/bookmarks?${queryString.stringify(queryParams)}`;
    const data = await postToCanvas(url).catch(console.error);
    expect(data).toEqual(mockData);
  });
});
