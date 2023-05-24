import * as Url from '../models/Url'

import * as urlServices from '../services/urlServices'

import { Router } from 'express'

const router = Router()

router
  .route('/')
    .post(async (req, res) => {
        const { originalUrl } = req.body
        
        if(!originalUrl) {
            return res.status(400).json({ error: 'Provide a URL' })
        }

        let shortUrl = urlServices.getShortUrl(originalUrl)

        const urlExists = await Url.model.findOne({shortUrl})
        if(urlExists) {
            shortUrl = urlServices.getShortUrl(originalUrl + Math.random()*100)
        }

        const nextHour = new Date(Date.now())
        nextHour.setHours(nextHour.getHours() + 1)

        const url: Url.interface = {
            id: undefined,
            originalUrl,
            shortUrl,
            clicks: 0,
            expirationDate: nextHour,
        }

        const createdDocument = await Url.model.create(url)
        res.status(201).send(createdDocument)
        }
    )

router
  .route('/:shortUrl')
    .get(async (req, res) => {
        const { shortUrl } = req.params

        const { _id, originalUrl, expirationDate, clicks } = await Url.model.findOne({shortUrl})

        if(!originalUrl) {
            return res.status(404).json({ error: 'URL not found' })
        }

        if(Date.now() > expirationDate.getTime()){
            Url.model.deleteOne({shortUrl})
            return res.status(404).json({ error: 'URL expired' })
        }

        const nextHour = new Date(Date.now())
        nextHour.setHours(nextHour.getHours() + 1)

        await Url.model.updateOne({_id}, {$inc: { clicks: 1 }, expirationDate: nextHour})
        res.status(302).redirect(originalUrl)
    })

export default router