import { pool } from './database.js'
import './dotenv.js'
import lureData from '../data/lures.js'

const createLuresTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS lures;

        CREATE TABLE IF NOT EXISTS lures (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            brand VARCHAR(255) NOT NULL,
            category VARCHAR(100) NOT NULL,
            type VARCHAR(100) NOT NULL,
            color VARCHAR(100) NOT NULL,
            size VARCHAR(50) NOT NULL,
            weight VARCHAR(50) NOT NULL,
            diving_depth VARCHAR(50) NOT NULL,
            buoyancy VARCHAR(50) NOT NULL,
            sound VARCHAR(50) NOT NULL,
            hook_size VARCHAR(50) NOT NULL,
            target_species TEXT[] NOT NULL,
            water_type VARCHAR(100) NOT NULL,
            price NUMERIC(10,2) NOT NULL,
            rating NUMERIC(2,1) NOT NULL,
            reviews INTEGER NOT NULL,
            in_stock BOOLEAN NOT NULL,
            stock_count INTEGER NOT NULL,
            sku VARCHAR(100) UNIQUE NOT NULL,
            image_url TEXT NOT NULL,
            description TEXT NOT NULL,
            tags TEXT[] NOT NULL
        )
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 lures table created successfully')
    } catch (err) {
        console.error('⚠️ error creating lures table', err)
    }
}

const seedLuresTable = async () => {
    await createLuresTable()

    lureData.forEach((lure) => {
        const insertQuery = {
            text: 'INSERT INTO lures (name, brand, category, type, color, size, weight, diving_depth, buoyancy, sound, hook_size, target_species, water_type, price, rating, reviews, in_stock, stock_count, sku, image_url, description, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)'
        }

        const values = [
            lure.name, lure.brand, lure.category, lure.type, lure.color, lure.size,
            lure.weight, lure.divingDepth, lure.buoyancy, lure.sound, lure.hookSize,
            lure.targetSpecies, lure.waterType, lure.price, lure.rating, lure.reviews,
            lure.inStock, lure.stockCount, lure.sku, lure.imageUrl, lure.description,
            lure.tags
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting lure', err)
                return
            }
            console.log(`✅ ${lure.name} added successfully`)
        })
    })
}

seedLuresTable()