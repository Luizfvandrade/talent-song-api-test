import { Request, Response } from 'express';
import { create } from '../services/user';

class UserController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await create({
      email,
      password,
    });

    return res.json(result);
  }
}

export { UserController };
