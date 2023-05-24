import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import connectToDatabase from './database/database'
import router from './routers/router'

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(router)

connectToDatabase()

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})