import {Router} from 'express'
import {
  creatPostHandler,
  deletePostHandeler,
  getPostHandler,
  listPostHandler,
  userlistPostHandler,
} from '../handlers/postsHandler'

import asyncHandler from 'express-async-handler'
import {authMiddleware} from '../middleware/authMiddleware'

const router = Router()
router.get('/list', asyncHandler(listPostHandler))
router.get('/userlist', authMiddleware, asyncHandler(userlistPostHandler))
router.post('/new', authMiddleware, asyncHandler(creatPostHandler))
router.get('/:id', authMiddleware, asyncHandler(getPostHandler))
router.delete('/:id', authMiddleware, asyncHandler(deletePostHandeler))

export default router
