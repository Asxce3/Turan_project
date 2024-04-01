const Router = require('express')
const router = new Router()
const userDataController = require('../controllers/userDataController')
const authMiddlewaree = require('../middlewaree/authMIddleware')

router.get('/profile', authMiddlewaree, userDataController.profile)
router.get('/orders', authMiddlewaree,  userDataController.orders)
router.get('/restaurants', userDataController.restaurants)
module.exports = router