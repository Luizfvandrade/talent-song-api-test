import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY as string;

interface IPayload {
  sub: string
}

export function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, secretKey) as IPayload;

    res.locals.userId = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
