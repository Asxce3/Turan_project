const Router = require('express')
const router = new Router()
const controller = require('../controllers/qrController')
const roleMiddleware = require('../middlewaree/roleMiddleware')
router.get('/create', roleMiddleware(['USER']), controller.CreateQr)
module.exports = router