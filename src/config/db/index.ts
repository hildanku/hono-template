import { drizzle } from 'drizzle-orm/mysql2'
import 'dotenv/config'
import mysql from 'mysql2/promise'
import { drizzleLogger } from '../logging.js'

const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL!
})

export const db = drizzle(connection, {
    logger: drizzleLogger
})
