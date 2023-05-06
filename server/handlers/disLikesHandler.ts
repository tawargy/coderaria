import {ExpressHandlerUser} from './apiTypes'
import {db} from '../datastore'

export const disLikesHandler: ExpressHandlerUser<{postId: string}, {}> = async (
  req,
  res,
) => {
  const userId = req.body.user?.id
  const postId = req.body.postId
  if (!postId || !userId) {
    return res.status(401).send({error: 'postId is missing'})
  }
  const post = await db.getPost(postId)
  if (!post) {
    return res.status(404).send({error: 'post not found'})
  }
  const userDislike = await db.getUserDislike(userId, postId)

  if (!userDislike) {
    await db.createDislike({userId, postId})
  } else {
    await db.deleteLike(userId)
  }
  res.sendStatus(200)
}
