import express, {RequestHandler} from 'express'
import usersRoutes from './routes/usersRoutes'
import postsRoutes from './routes/postsRoutes'
import likesRoutes from './routes/likesRoutes'
import dislikesRoutes from './routes/disLikesRoutes'
import commentsRoutes from './routes/commentsRoutes'
const app: express.Application = express()

app.use(express.json())

const logger: RequestHandler = (req, res, next) => {
  console.log('Headers', req.headers)
  console.log('Body', req.body)
  next()
}
app.use(logger)
app.get('/healthz', (req, res) => res.send({status: '✌️'}))

app.use('/users', usersRoutes)
app.use('/posts', postsRoutes)
app.use('/likes', likesRoutes)
app.use('/dislikes', dislikesRoutes)
app.use('/comments', commentsRoutes)

export default app
