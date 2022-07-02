jest.mock('../../../src/services/auth');

import { AuthController } from '../../../src/controllers/authController';

import { login } from '../../../src/services/auth';

describe('AuthUserController', () => {
  let authUserController: AuthController;

  beforeEach(() => {
    authUserController = new AuthController();
  });

  it('should be defined', () => {
    expect(authUserController).toBeDefined();
  });

  it('should called auth service', async () => {
    const mockedResult = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXpmZWxpcHBldmllaXJhQG91dGxvb2suY29tIiwicGFzc3dvcmQiOiIxMjMifQ.UdXJ_Lvmc6_4_YQktu7xEay_PeP23_ruhL0Q2j3MGLw';

    const mockedRequest: any = {
      body: {
        email: 'test@test.com',
        password: '123'
      }
    };

    const mockedResponse: any = {
      json: jest.fn().mockImplementation((result) => {
        jest.fn().mockReturnValue(result);
      }),
    };

    (login as any).mockResolvedValue(mockedResult);

    await authUserController.login(mockedRequest, mockedResponse);

    expect(login).toHaveBeenCalledWith(mockedRequest.body);
    expect(mockedResponse.json).toHaveBeenCalledWith({ token: mockedResult });
  });
});
