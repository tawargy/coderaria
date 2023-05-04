import { db } from '../datastore';
import {  AuthExpressHandler } from '../handlers/apiTypes';
import { verifyJwt } from '../utils/jwtAuth';

export const authMiddleware: AuthExpressHandler<any,any, any> = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
     return res.status(401).send({ error: 'You are not logedin' });
    }

    const payload = verifyJwt(token );

    const user = await db.getUserById(payload.userId);
    if (!user) {
    return  res.status(401).send({ error: 'User not exist' });
    }
    req.body.user=user
    next();
  } catch (err) {
    res.status(401).send({ error: 'Bad Token' });
  }
};
