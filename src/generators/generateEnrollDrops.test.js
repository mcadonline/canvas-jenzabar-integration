import generateEnrollDrops from './generateEnrollDrops';

describe('generateEnrollDrops', () => {
  it('lists students to drop from courses in Canvas', async () => {
    const jexService = {
      getStudentEnrollment: jest.fn().mockResolvedValue([
        {
          course_id: 'Art 101',
          user_id: 'enrolled user',
        },
      ]),
    };

    const canvasService = {
      getStudentEnrollment: jest
        .fn()
        .mockResolvedValue([
          { course_id: 'Art 101', user_id: 'enrolled user' },
          { course_id: 'Art 101', user_id: 'user to drop' },
        ]),
    };

    const expected = [
      '"course_id","user_id","status","role"',
      '"Art 101","user to drop","inactive","student"',
    ].join('\n');

    const csv = await generateEnrollDrops({
      jex: jexService,
      canvas: canvasService,
    });

    expect(csv).toEqual(expected);
  });

  it('does not drop users on settings.ignoreUsers list', async () => {
    const jexService = {
      getStudentEnrollment: jest.fn().mockResolvedValue([
        {
          course_id: 'Art 101',
          user_id: 'enrolled user',
        },
      ]),
    };

    const canvasService = {
      getStudentEnrollment: jest
        .fn()
        .mockResolvedValue([
          { course_id: 'Art 101', user_id: 'enrolled user' },
          { course_id: 'Art 101', user_id: 'user to drop' },
          { course_id: 'Art 101', user_id: 'userToIgnore' },
        ]),
    };

    const expected = [
      '"course_id","user_id","status","role"',
      '"Art 101","user to drop","inactive","student"',
    ].join('\n');

    const csv = await generateEnrollDrops({
      jex: jexService,
      canvas: canvasService,
      ignoreUsers: ['userToIgnore'],
    });

    expect(csv).toEqual(expected);
  });
});
