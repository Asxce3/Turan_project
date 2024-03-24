const Router = require('express')
const router = new Router()
const controller = require('../controllers/qrController')
const authMiddleware = require('../middlewaree/authMIddleware')
router.post('/qr', authMiddleware, controller.CreateQr)
router.get('/getqr', authMiddleware, controller.GetQr)
module.exports = router
