import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import postToCanvas from './postToCanvas';

jest.mock('isomorphic-fetch');

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
