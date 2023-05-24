import mongoose from 'mongoose'

interface urlInterface {
    id?: string,
    originalUrl: string,
    shortUrl: string,
    clicks?: Number,
    expirationDate: Date
}

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clicks: Number,
    expirationDate: Date,
})

const urlModel = mongoose.model('Url', urlSchema)

export { urlModel as model, urlInterface as interface };