import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import lureData from '../data/lures.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(lureData)
})

router.get('/:lureId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/lure.html'))
})

export default router