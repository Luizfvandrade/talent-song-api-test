jest.mock('../../../src/database/prismaClient');

import db from '../../../src/database/prismaClient';

import { login } from '../../../src/services/auth';

jest.mock(
  'bcryptjs',
  () => {
    return {
      compare: jest.fn((value) => {
        if (value === '123') {
          return true;
        }
        return false;
      })
    };
  },
  { virtual: true },
);

jest.mock(
  'jsonwebtoken',
  () => {
    return {
      sign: jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXpmZWxpcHBldmllaXJhQG91dGxvb2suY29tIiwiaWF0IjoxNjU2NzAzMzIwLCJleHAiOjE2NTY3ODk3MjAsInN1YiI6IjlmZDRmZmU3LTM3YjQtNDM4YS1hNjNmLTQwN2FmOTljZDAzMSJ9.6OYOBwsoALGrenF_C-hVID8u1NUMWh-RfcrhfzeNNZM'),
    };
  },
  { virtual: true },
);

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXpmZWxpcHBldmllaXJhQG91dGxvb2suY29tIiwiaWF0IjoxNjU2NzAzMzIwLCJleHAiOjE2NTY3ODk3MjAsInN1YiI6IjlmZDRmZmU3LTM3YjQtNDM4YS1hNjNmLTQwN2FmOTljZDAzMSJ9.6OYOBwsoALGrenF_C-hVID8u1NUMWh-RfcrhfzeNNZM';

describe('login function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(login).toBeDefined();
  });

  it('should generate jwt token', async () => {
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

    const token = await login(mockedBody);

    expect(token).toEqual(jwt);
  });

  it('should throw email or password is incorrect error in user validation', async () => {
    const mockedBody = {
      'email': 'test@test.com',
      'password': '123',
    };

    (db.users.findFirst as any).mockResolvedValue(null);

    try {
      await login(mockedBody);
    } catch (error) {
      // eslint-disable-next-line quotes
      expect(error).toMatchInlineSnapshot(`[Error: Email or Password is incorrect!]`);
    }
  });

  it('should throw email or password is incorrect error in password validation', async () => {
    const mockedBody = {
      'email': 'test@test.com',
      'password': '321',
    };

    const mockedUser = {
      'id': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'email': 'test@test.com',
      'password': '$2a$10$uMmuOTPkdy05pqlq8iV9DO3lvDgxIpeAeD3r1B8JsHm4YRlS.dAWu'
    };

    (db.users.findFirst as any).mockResolvedValue(mockedUser);

    try {
      await login(mockedBody);
    } catch (error) {
      // eslint-disable-next-line quotes
      expect(error).toMatchInlineSnapshot(`[Error: Email or Password is incorrect!]`);
    }
  });
});
