import app from './app'

;(async () => {
  const PORT: number = 5000 || process.env.PORT
  app.listen(PORT, () => {
    console.log('server is running')
  })
})()
