import express from 'express';
import {signInHandler, signUpHandler } from '../handlers/usersHandler';
import asyncHandler from 'express-async-handler'

const router=express.Router();

router.post('/signin',asyncHandler( signInHandler))
router.post('/signup',asyncHandler(signUpHandler))


export default router;
