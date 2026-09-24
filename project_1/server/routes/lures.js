import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import LuresController from '../controllers/lures.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// API: Get all lures
router.get('/', LuresController.getLures)

// API: Get a single lure by ID
router.get('/api/:lureId', LuresController.getLureById)

// View: Serve the HTML for the lure detail page
router.get('/:lureId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/lure.html'))
})

export default router