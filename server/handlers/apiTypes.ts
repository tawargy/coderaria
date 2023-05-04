
import { Request, RequestHandler } from 'express';
import { Post,FullPost, User,Comment } from '../types';

type WithError<T> = T & { error: string };
type WithUser<T> = T & { user: User };

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
export type ExpressHandlerUser<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<WithUser<Req>>,
  any
>;

export type ParamExpressHandler<P, Req, Res> = RequestHandler<
  P,
  Partial<WithError<Res>>,
  Partial<WithUser<Req>>,
  any
>;
export type AuthExpressHandler<P, Req, Res> = RequestHandler<
  P,
  Partial<WithError<Req>>,
  Partial<WithUser<Res>>,
  any
>;


//Users APIs
export type SignUpReq = Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'password'>;

export interface SignUpRes {
  user: Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'id'>;
  jwt: string;
}

export interface SignInReq {
  login: string; //userName or email
  password: string;
}

