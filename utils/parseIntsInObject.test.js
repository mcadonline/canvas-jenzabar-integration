import parseIntsInObject from './parseIntsInObject';

describe('parseIntsInObject', () => {
  it('returns a new object with values converted to ints where possible', () => {
    const obj = {
      id: 1,
      name: 'Joe',
      account: '12345',
      liftoffIn: '-10',
    };

    const parsedObject = parseIntsInObject(obj);
    expect(parsedObject).toEqual({
      id: 1,
      name: 'Joe',
      account: 12345,
      liftoffIn: -10,
    });
  });
});
