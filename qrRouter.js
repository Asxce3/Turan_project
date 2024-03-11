const Router = require('express')
const router = new Router()
const controller = require('./qrController')

router.post('/qr', controller.CreateQr)

module.exports = router
