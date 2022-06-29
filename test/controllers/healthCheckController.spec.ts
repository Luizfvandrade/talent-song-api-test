import { HealthCheckController } from '../../src/controllers/healthCheckController';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(() => {
    healthCheckController = new HealthCheckController();
  });

  it('should be defined', () => {
    expect(healthCheckController).toBeDefined();
  });
});
