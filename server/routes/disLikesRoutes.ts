import express from 'express'
import {disLikesHandler} from '../handlers/disLikesHandler'
import asyncHandelr from 'express-async-handler'
import {authMiddleware} from '../middleware/authMiddleware'

const router = express.Router()

router.post('/', authMiddleware, asyncHandelr(disLikesHandler))

export default router
