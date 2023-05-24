import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD

const connectToDatabase = async () => {
    try {
    mongoose.connect(`mongodb+srv://alyxsonmarques0:${DB_PASSWORD}@urlshortenercluster.djai6lj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, undefined)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`)
    }
}

export default connectToDatabase