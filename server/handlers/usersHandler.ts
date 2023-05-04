
import crypto from 'crypto';
import { db } from '../datastore';
import AppError from '../utils/AppError';

import { User } from '../types';
import { ExpressHandler, SignInReq, SignUpReq, SignUpRes } from './apiTypes';
import { signJwt } from '../utils/jwtAuth';

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, 'sha512').toString('hex');
}


export const signUpHandler: ExpressHandler<SignUpReq, SignUpRes> = async (req, res) => {
  const { email, firstName, lastName, password, userName } = req.body;
  if (!email || !firstName || !lastName || !password || !userName) {
    throw new AppError(401, 'All fields are required');
  }

  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(userName));
  if (existing) throw new AppError(401, 'User is existe');
  const user: User = {
    id: crypto.randomUUID(),
    email,
    firstName,
    lastName,
    userName,
    password: hashPassword(password),
  };
  await db.createUser(user);
  user.password=undefined!;

  const jwt = signJwt({userId:user.id})
  res.status(200).send({
    user: user,
    jwt,
  });
};
export const signInHandler: ExpressHandler<SignInReq, SignUpRes> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) throw new AppError(401, 'all fields are required');
  const existing = (await db.getUserByUsername(login)) || (await db.getUserByEmail(login));

  if (!existing || existing.password !== hashPassword(password))
    throw new AppError(401, 'user or password not correct');
  const jwt = signJwt({userId:existing.id});

  res.status(200).send({
    user: {
      email: existing.email,
      firstName: existing.firstName,
      lastName: existing.lastName,
      id: existing.id,
      userName: existing.userName,
    },
    jwt,
  });
};


