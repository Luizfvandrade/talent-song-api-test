import { HealthCheckController } from '../../../src/controllers/healthCheckController';

const mockedResponse: any = {
  json: jest.fn().mockImplementation((result) => {
    jest.fn().mockReturnValue(result);
  }),
  status: jest.fn(() => mockedResponse),
  setHeader: jest.fn()
};

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(() => {
    healthCheckController = new HealthCheckController();
  });

  it('should be defined', () => {
    expect(healthCheckController).toBeDefined();
  });

  it('should return the correct status code and message', async () => {
    const mockedResult = {
      message: 'up running!'
    };

    const mockedRequest: any = {};

    await healthCheckController.status(mockedRequest, mockedResponse);

    expect(mockedResponse.json).toHaveBeenCalledWith(mockedResult);
    expect(mockedResponse.status).toHaveBeenCalledWith(200);
  });
});
