import crypto from 'crypto'

import {db} from '../datastore'
import {Post} from '../types'
import AppError from '../utils/AppError'
import {
  ExpressHandler,
  ListPostReq,
  ListPostRes,
  CreatePostReq,
  CreatePostRes,
  GetPostRes,
  GetPostReq,
  DeletePostRes,
  DeletePostReq,
  ParamExpressHandler,
  GetIdParams,
  ExpressHandlerUser,
} from './apiTypes'

export const listPostHandler: ExpressHandlerUser<
  ListPostReq,
  ListPostRes
> = async (req, res) => {
  const postsResult = await db.listPosts()
  const fullPostsLoop = async () => {
    const postsList = [...postsResult]
    for (const post of postsList) {
      const like = await db.getLikes(post.id)
      const disliks = await db.getDislikes(post.id)
      post.likes = like
      post.dislike = disliks

      const comments = await db.commentsCount(post.id)
      post.comments = comments
      const user = await db.getUserById(post.userId)
      post.user = user?.userName
    }
    return postsList
  }
  const fullPosts = await fullPostsLoop()

  res.status(200).send({data: fullPosts})
}

export const userlistPostHandler: ExpressHandlerUser<
  ListPostReq,
  ListPostRes
> = async (req, res) => {
  const page = req.query.page
  const limit = req.query.limit
  let userId = req.body.user?.id

  if (!page || !limit) {
    res.sendStatus(400)
  }
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const posts = await db.listPosts()
  const postsResult = posts.slice(startIndex, endIndex)

  const fullPostsLoop = async () => {
    const postsList = [...postsResult]
    for (const post of postsList) {
      const like = await db.getLikes(post.id)
      const disliks = await db.getDislikes(post.id)
      post.likes = like
      post.dislike = disliks
      if (!userId) {
        throw new AppError(401, 'you are not login')
      }
      const userLike = await db.getUserLike(userId, post.id)
      if (!userLike) {
        post.userLike = false
      } else {
        post.userLike = true
      }
      const userDislike = await db.getUserDislike(userId, post.id)
      if (!userDislike) {
        post.userDislike = false
      } else {
        post.userDislike = true
      }
      const comments = await db.commentsCount(post.id)
      post.comments = comments
    }
    return postsList
  }
  const fullPosts = await fullPostsLoop()

  res.status(200).send({data: fullPosts})
}

export const creatPostHandler: ExpressHandlerUser<
  CreatePostReq,
  CreatePostRes
> = async (req, res) => {
  if (
    !req.body.title ||
    req.body.title === '' ||
    !req.body.url ||
    req.body.url === ''
  )
    return res.sendStatus(400)

  if (req.body.title === '' || req.body.url === '') return res.sendStatus(400)
  const allPosts = await db.listPosts()
  for (const P of allPosts) {
    if (P.url === req.body.url) {
      throw new AppError(401, 'This topic allrady existing')
    }
  }
  const id = req.body.user?.id
  if (!id) throw new AppError(401, 'somthing went wrong')

  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: id,
  }
  await db.createPost(post)
  res.sendStatus(200)
}

export const getPostHandler: ParamExpressHandler<
  GetIdParams,
  GetPostReq,
  GetPostRes
> = async (req, res) => {
  const id = req.params.id

  const post = await db.getPost(id)
  if (!post) return res.sendStatus(404)
  console.log(post)
  res.status(200).json({data: post})
}

export const deletePostHandeler: ParamExpressHandler<
  GetIdParams,
  DeletePostReq,
  DeletePostRes
> = async (req, res) => {
  const id = req.params.id
  if (!id) return res.sendStatus(404)
  await db.deletePost(id)
  res.sendStatus(200)
}
