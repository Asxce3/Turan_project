const Qrcode = require('qrcode')

class qrController {
    async CreateQr(req, res) {
        try {
            const {userId} = req.body
            const qr = await Qrcode.toDataURL(userId)
            
            return res.status(200).send(`<img src="${qr}"/> ${userId}`)
            // return res.status(200).json({message: 'ok'})

        }   catch(e) {
            console.log(e)
            return res.status(400).json({message: 'error'})
        }
        
    }
}


module.exports = new qrController()