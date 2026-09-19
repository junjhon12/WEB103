import express from 'express'
import luresRouter from './routes/lures.js'
import lureData from './data/lures.js'

const app = express()
app.use('/public', express.static('./public'))
app.use('/scripts', express.static('./public/scripts'))

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Node Server is Up!</h1>')
})

app.use('/lures', luresRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})