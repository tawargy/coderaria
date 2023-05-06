import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { allComments, createComment, deleteComment } from '../handlers/commentsHandler';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:postId', allComments);
router.post('/new', authMiddleware, expressAsyncHandler(createComment));
router.delete('/:id', authMiddleware, expressAsyncHandler(deleteComment));

export default router;
