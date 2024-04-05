const Router = require('express')
const router = new Router()
const controllerUser = require('../controllers/authUserController')
const controllerStaff = require('../controllers/authStaffController')
const controllerRestaurant = require('../controllers/authRestaurantController')
const authMiddleware = require('../middlewaree/authMIddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')

// User
router.post('/registration-user', controllerUser.registration)

router.post('/login-user', controllerUser.login)

// Staff
router.post('/registration-staff',roleMiddleware(['RESTAURANT']), controllerStaff.registration)

router.post('/login-staff', controllerStaff.login)

// Restaurant
router.post('/registration-restaurant', controllerRestaurant.registration)

router.post('/login-restaurant', controllerRestaurant.login)

module.exports = router