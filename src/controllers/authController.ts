import { Request, Response } from 'express';
import { login } from '../services/auth';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const jwtToken = await login({ email, password });

    return res.json({ token: jwtToken });
  }
}

export { AuthController };
