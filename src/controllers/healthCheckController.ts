import { Request, Response } from 'express';

class HealthCheckController {
  async status(req: Request, res: Response) {
    res.setHeader('Cache-Control', 'no-cache');
    return res.status(200).json({ message: 'up running!' });
  }
}

export { HealthCheckController };
