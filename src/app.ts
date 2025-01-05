import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import handleErrors from './middlewares/handleErrors'
import routes from './app.routes'

const app = express()

app.use(helmet())
app.use(express.json())
app.use('/api', routes)
app.use(handleErrors)

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log('Press CTRL-C to stop\n')
})