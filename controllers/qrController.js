const { json } = require('express')
const User = require('../models/User')
const Qrcode = require('qrcode')

class qrController {
    async CreateQr(req, res) {
        try {
            const userId = req.id
            const qr = await Qrcode.toDataURL(userId)
            return res.status(200).json({qr: qr, message: 'ok'})

        }   catch(e) {
            console.log(e)
            return res.status(400).json({message: 'Не удалось сгенерировать qr'})
        }
        
    }
}


module.exports = new qrController()