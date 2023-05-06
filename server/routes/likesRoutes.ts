import express from 'express'
import {likesHandler} from '../handlers/likesHandler'
import asyncHandelr from 'express-async-handler'
import {authMiddleware} from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', authMiddleware, asyncHandelr(likesHandler))

export default router
