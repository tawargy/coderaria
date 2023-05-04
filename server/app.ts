import express, {RequestHandler} from 'express'

const app: express.Application = express()

app.use(express.json())

const logger: RequestHandler = (req, res, next) => {
  console.log('Headers', req.headers)
  console.log('Body', req.body)
  next()
}
app.use(logger)
app.get('/healthz', (req, res) => res.send({status: '✌️'}))

export default app