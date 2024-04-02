const Router = require('express')
const router = new Router()
const controller = require('../controllers/qrController')
const authMiddleware = require('../middlewaree/authMIddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')
router.post('/qr', authMiddleware, controller.CreateQr)
router.get('/getqr', roleMiddleware(['STAFF']), controller.GetQr)
module.exports = router