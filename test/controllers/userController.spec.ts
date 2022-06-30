jest.mock('../../src/services/user');
import { Request, Response } from 'express';

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

  it('should called create user function', async () => {
    const mockedResult = {
      'id': 'a655b3d4-6ebd-4acc-8c18-88ddaba502ba',
      'email': 'test@test.com'
    };

    const mockedRequest: Partial<Request> = {
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

    await userController.create(mockedRequest as Request, mockedResponse as Response);

    expect(create).toHaveBeenCalledWith(mockedRequest.body);
    expect(mockedResponse.json).toHaveBeenCalledWith(mockedResult);
    expect(mockedResponse.status).toHaveBeenCalledWith(201);
  });
});
