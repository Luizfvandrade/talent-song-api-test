import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import db from '../database/prismaClient';

const secretKey = process.env.SECRET_KEY as string;

interface IAuthLoginReq {
  email: string,
  password: string,
}

async function login({ email, password }: IAuthLoginReq) {
  const user = await db.users.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      }
    }
  });

  if (!user) {
    throw new Error('Email or Password is incorrect!');
  }

  const pass = compare(password, user.password);

  if (!pass) {
    throw new Error('Email or Password is incorrect!');
  }

  const token = sign({ email: user.email }, secretKey, {
    subject: user.id,
    expiresIn: '1d',
  });

  return token;
}

export { login };
