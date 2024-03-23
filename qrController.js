const User = require('./models/User')
const Qrcode = require('qrcode')
// const axios = require('axios')

class qrController {
    async CreateQr(req, res) {
        try {
            const {userId} = req.body
            const qr = await Qrcode.toDataURL(userId)
            
            return res.status(200).send(`<img src="${qr}"/> ${userId}`)
            // return res.status(200).json({message: 'ok'})

        }   catch(e) {
            console.log(e)
            return res.status(400).json({message: 'Не удалось сгенерировать qr'})
        }
        
    }

    async GetQr(req, res) {
        try {
            const user_id = req.query.content;
            if (!user_id) {
                return res.status(400).send('Missing QR code content')
            }

            const user = await User.findById(user_id)
            if(!user) {
                return res.status(400).send('Пользователь не найден')  
            }
            res.render('pages/scanqr', {user})

        }   catch(e) {
            console.log(e)
            return res.status(400).json({message: 'Не удалось получить qr'})
        }
        
    }

}


module.exports = new qrController()