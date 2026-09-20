import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import luresRouter from './routes/lures.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Serve static files from the public folder
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')))

// Serve the index.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// Use the lures router for /lures endpoints
app.use('/lures', luresRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})