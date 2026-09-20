import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fetch from 'node-fetch'
import luresRouter from './routes/lures.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/lures', luresRouter)

// --- Channel3 proxy route (with in-memory cache) ---
const imageCache = new Map()

app.get('/api/lure-images', async (req, res) => {
  const query = req.query.q || 'fishing lure'

  // Cache hit — return instantly, no API call
  if (imageCache.has(query)) {
    console.log(`💾 Cache hit for "${query}"`)
    return res.json(imageCache.get(query))
  }

  try {
    console.log(`🌐 Fetching Channel3 for "${query}"`)
    const response = await fetch('https://api.trychannel3.com/v1/search', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CHANNEL3_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        limit: 10
      })
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Channel3 responded with:', response.status, text)
      return res.status(response.status).json({ error: 'Channel3 request failed' })
    }

    const data = await response.json()
    imageCache.set(query, data)
    res.json(data)
  } catch (error) {
    console.error('Channel3 error:', error)
    res.status(500).json({ error: 'Failed to fetch lure images' })
  }
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})