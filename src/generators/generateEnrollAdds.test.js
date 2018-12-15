import generateEnrollAdds from './generateEnrollAdds';

describe('generateEnrollAdds', () => {
  it('gets a list of new enrollments to add to Canvas', async () => {
    const jexService = {
      getEnrollment: jest.fn().mockResolvedValue([
        {
          course_id: 'Art 101',
          user_id: 'enrolled user',
        },
        {
          course_id: 'Art 101',
          user_id: 'new user',
        },
      ]),
    };

    const canvasService = {
      getEnrollment: jest
        .fn()
        .mockResolvedValue([{ course_id: 'Art 101', user_id: 'enrolled user' }]),
    };

    const expected = [
      '"course_id","user_id","status","role"',
      '"Art 101","new user","active","student"',
    ].join('\n');

    const csv = await generateEnrollAdds({
      jex: jexService,
      canvas: canvasService,
    });

    expect(csv).toEqual(expected);
  });
});
