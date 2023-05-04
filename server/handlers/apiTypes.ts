
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


//Posts APIs
export interface ListPostReq {}
export interface ListPostRes {
  data:Post [];
}
export type CreatePostReq = Pick<Post, 'title' | 'url'>;
export interface CreatePostRes {}

export interface GetPostReq {}
export interface GetPostRes {
  data: Post;
}

export interface DeletePostReq {}
export interface DeletePostRes {}

export interface GetIdParams {
  id: string;
}

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

