import { hash } from 'bcryptjs';
import db from '../database/prismaClient';

interface ICreateUser {
  email: string
  password: string
}

async function create({ email, password }: ICreateUser) {
  const userExists = await db.users.findFirst({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      }
    }
  });

  if (userExists) {
    throw new Error('User already exists!');
  }

  const encryptedPass = await hash(password, 10);

  const user = await db.users.create({
    data: {
      email,
      password: encryptedPass,
    }
  });

  const userNormalized = {
    id: user.id,
    email: user.email,
  };

  return userNormalized;
}

export { create };
