import 'dotenv/config'
import pg from 'pg'

const { DB_HOST,DB_NAME,DB_PASS,DB_PORT,DB_USER } = process.env

const databasePool = new pg.Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
})
.on('error', (err) => {
  console.error('Error while connecting to the database', err)
})
.on('connect', () => {
  console.log('Connected successfully to the database')
})

export default databasePool