import {db} from '../datastore'
import crypto from 'crypto'
import {
  getCommentsRes,
  getCommentsReq,
  ParamExpressHandler,
  ExpressHandlerUser,
} from './apiTypes'

export const allComments: ParamExpressHandler<
  getCommentsReq,
  {},
  getCommentsRes
> = async (req, res) => {
  const postId = req.params.postId
  if (!postId) {
    return res.status(404).send({error: 'post id is not found'})
  }
  const allComments = await db.listComments(postId)
  if (!allComments) {
    return res.status(200).send({error: 'No Comments!'})
  }
  res.status(200).send({data: allComments})
}

export const createComment: ExpressHandlerUser<
  {comment: string; postId: string},
  {status: string}
> = async (req, res) => {
  if (
    !req.body.postId ||
    req.body.postId === '' ||
    !req.body.comment ||
    req.body.comment === ''
  ) {
    return res.status(404).send({status: 'fail'})
  }

  const userId = req.body.user?.id
  if (!userId) {
    return res.status(404).send({status: 'fail'})
  }

  await db.createComment({
    id: crypto.randomUUID(),
    userId: userId,
    postId: req.body.postId,
    comment: req.body.comment,
    postedAt: Date.now(),
  })
  res.status(200).send({status: 'ok'})
}

export const deleteComment: ParamExpressHandler<
  {id: string},
  {},
  {status: string}
> = async (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(200).send({status: 'ok'})
  }
  await db.deleteComment(id)
  res.status(200).send({status: 'ok'})
}
