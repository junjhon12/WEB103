import { pool } from '../config/database.js'

const getLures = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM lures ORDER BY id ASC')
        
        // Map snake_case DB columns to camelCase for the frontend
        const formatted = results.rows.map(row => ({
            id: row.id,
            name: row.name,
            brand: row.brand,
            category: row.category,
            type: row.type,
            color: row.color,
            size: row.size,
            weight: row.weight,
            divingDepth: row.diving_depth,
            buoyancy: row.buoyancy,
            sound: row.sound,
            hookSize: row.hook_size,
            targetSpecies: row.target_species,
            waterType: row.water_type,
            price: parseFloat(row.price),
            rating: parseFloat(row.rating),
            reviews: row.reviews,
            inStock: row.in_stock,
            stockCount: row.stock_count,
            sku: row.sku,
            imageUrl: row.image_url,
            description: row.description,
            tags: row.tags
        }))
        
        res.status(200).json(formatted)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getLureById = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM lures WHERE id = $1', [req.params.lureId])
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Lure not found' })
        }
        // Format single row (same mapping as above)
        const row = results.rows[0]
        const formatted = {
            id: row.id, name: row.name, brand: row.brand, category: row.category, type: row.type,
            color: row.color, size: row.size, weight: row.weight, divingDepth: row.diving_depth,
            buoyancy: row.buoyancy, sound: row.sound, hookSize: row.hook_size,
            targetSpecies: row.target_species, waterType: row.water_type, price: parseFloat(row.price),
            rating: parseFloat(row.rating), reviews: row.reviews, inStock: row.in_stock,
            stockCount: row.stock_count, sku: row.sku, imageUrl: row.image_url,
            description: row.description, tags: row.tags
        }
        res.json(formatted)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getLures,
    getLureById
}