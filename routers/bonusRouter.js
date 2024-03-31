const Router = require('express')
const router = new Router()
const sendBonusController = require('../controllers/sendBonusController')
const bonusMiddleware = require('../middlewaree/bonusMiddleware')
router.use('/accrual', bonusMiddleware(['STAFF']), sendBonusController.accrual)
router.use('/payment', bonusMiddleware(['STAFF']), sendBonusController.payment)

module.exports = router