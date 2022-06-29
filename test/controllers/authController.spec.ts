jest.mock('../../src/services/auth');

import { AuthController } from '../../src/controllers/authController';

import { login } from '../../src/services/auth';

describe('AuthUserController', () => {
  let authUserController: AuthController;

  beforeEach(() => {
    authUserController = new AuthController();
  });

  it('should be defined', () => {
    expect(authUserController).toBeDefined();
  });

  it('should called auth service', async () => {
    const result = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXpmZWxpcHBldmllaXJhQG91dGxvb2suY29tIiwicGFzc3dvcmQiOiIxMjMifQ.UdXJ_Lvmc6_4_YQktu7xEay_PeP23_ruhL0Q2j3MGLw';
    const req = {
      body: {
        email: 'test@test.com',
        password: '123'
      }
    };

    const res = {
      json: jest.fn()
    };

    (login as any).mockResolvedValue(result);

    await authUserController.login(req as any, res as any);

    expect(login).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ token: result });
  });
});
