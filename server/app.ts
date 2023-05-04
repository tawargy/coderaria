import express, {RequestHandler} from 'express'
import usersRoutes from './routes/usersRoutes'
const app: express.Application = express()

app.use(express.json())

const logger: RequestHandler = (req, res, next) => {
  console.log('Headers', req.headers)
  console.log('Body', req.body)
  next()
}
app.use(logger)
app.get('/healthz', (req, res) => res.send({status: '✌️'}))


app.use('/users', usersRoutes);

export default app
