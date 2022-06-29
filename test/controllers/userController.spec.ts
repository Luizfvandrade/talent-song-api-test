jest.mock('../../src/services/user');

import { UserController } from '../../src/controllers/userController';

import { create } from '../../src/services/user';

describe('userController', () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should called user service', async () => {
    const result = {
      'id': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'email': 'test@test.com'
    };
    const req = {
      body: {
        email: 'test@test.com',
        password: '123'
      }
    };

    const res = {
      json: jest.fn()
    };

    (create as any).mockResolvedValue(result);

    await userController.create(req as any, res as any);

    expect(create).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ ...result });
  });
});
