const Router = require('express')
const router = new Router()
const sendBonusController = require('../controllers/sendBonusController')
const roleMiddleware = require('../middlewaree/roleMiddleware')
router.post('/accrual', roleMiddleware(['STAFF']), sendBonusController.accrual)
router.post('/payment', roleMiddleware(['STAFF']), sendBonusController.payment)

module.exports = router