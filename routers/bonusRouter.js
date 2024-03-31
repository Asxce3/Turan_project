const Router = require('express')
const router = new Router()
const sendBonusController = require('../controllers/sendBonusController')
const bonusMiddleware = require('../middlewaree/bonusMiddleware')
router.post('/accrual', bonusMiddleware(['STAFF']), sendBonusController.accrual)
router.post('/payment', bonusMiddleware(['STAFF']), sendBonusController.payment)

module.exports = router