jest.mock('../../src/database/prismaClient');

import db from '../../src/database/prismaClient';

import { create } from '../../src/services/user';

jest.mock(
  'bcryptjs',
  () => {
    return {
      hash: jest.fn().mockResolvedValue('$2a$10$uMmuOTPkdy05pqlq8iV9DO3lvDgxIpeAeD3r1B8JsHm4YRlS.dAWu'),
    };
  },
  { virtual: true },
);

jest.mock(
  'isemail',
  () => {
    return {
      validate: jest.fn((email) => {
        if (email === 'test@test.com') {
          return true;
        }
        return false;
      }),
    };
  },
  { virtual: true },
);

describe('user create function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(create).toBeDefined();
  });

  it('should create the user', async () => {
    const mockedBody = {
      'email': 'test@test.com',
      'password': '123',
    };

    const mockedUser = {
      'id': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'email': 'test@test.com',
      'password': '$2a$10$uMmuOTPkdy05pqlq8iV9DO3lvDgxIpeAeD3r1B8JsHm4YRlS.dAWu'
    };

    (db.users.findFirst as any).mockResolvedValue(null);
    (db.users.create as any).mockResolvedValue(mockedUser);

    await create(mockedBody);

    expect(db.users.create).toBeCalledWith({
      data: {
        email: mockedUser.email,
        password: mockedUser.password
      }
    });
  });

  it('should throw invalid e-mail! error', async () => {
    const mockedBody = {
      'email': 'test',
      'password': '123',
    };

    try {
      await create(mockedBody);
    } catch (error) {
      expect(db.users.create).toBeCalledTimes(0);
      // eslint-disable-next-line quotes
      expect(error).toMatchInlineSnapshot(`[Error: Invalid e-mail!]`);
    }
  });

  it('should throw user already exists error', async () => {
    const mockedBody = {
      'email': 'test@test.com',
      'password': '123',
    };

    const mockedUser = {
      'id': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'email': 'test@test.com',
      'password': '$2a$10$uMmuOTPkdy05pqlq8iV9DO3lvDgxIpeAeD3r1B8JsHm4YRlS.dAWu'
    };

    (db.users.findFirst as any).mockResolvedValue(mockedUser);

    try {
      await create(mockedBody);
    } catch (error) {
      expect(db.users.create).toBeCalledTimes(0);
    }
  });

  it('should return the user normalized', async () => {
    const mockedBody = {
      'email': 'test@test.com',
      'password': '123',
    };

    const mockedUser = {
      'id': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'email': 'test@test.com',
      'password': '$2a$10$uMmuOTPkdy05pqlq8iV9DO3lvDgxIpeAeD3r1B8JsHm4YRlS.dAWu'
    };

    const mockedResult = {
      'id': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'email': 'test@test.com',
    };

    (db.users.findFirst as any).mockResolvedValue(null);
    (db.users.create as any).mockResolvedValue(mockedUser);

    const result = await create(mockedBody);

    expect(db.users.create).toBeCalledWith({
      data: {
        email: mockedUser.email,
        password: mockedUser.password
      }
    });
    expect(result).toEqual(mockedResult);
  });
});
