jest.mock('../../../src/services/user');

import { UserController } from '../../../src/controllers/userController';

import { create } from '../../../src/services/user';

describe('userController', () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should called create user function', async () => {
    const mockedResult = {
      'id': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'email': 'test@test.com'
    };

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
      status: jest.fn(() => mockedResponse)
    };

    (create as any).mockResolvedValue(mockedResult);

    await userController.create(mockedRequest, mockedResponse);

    expect(create).toHaveBeenCalledWith(mockedRequest.body);
    expect(mockedResponse.json).toHaveBeenCalledWith(mockedResult);
    expect(mockedResponse.status).toHaveBeenCalledWith(201);
  });
});
