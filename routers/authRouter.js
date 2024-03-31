const Router = require('express')
const router = new Router()
const controllerUser = require('../controllers/authUserController')
const controllerStaff = require('../controllers/authStaffController')
const controllerRestaurant = require('../controllers/authRestaurantController')
const { check } = require('express-validator')
const authMiddleware = require('../middlewaree/authMIddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')
const authRestaurantMiddleware = require('../middlewaree/authRestaurantMiddleware')

// User
router.post('/registration-user',
    [check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пороль должен быть более 4 символом и меньше 10 символов').isLength({min: 4, max: 10})
],
controllerUser.registration)

router.post('/login-user', controllerUser.login)

// Staff
router.post('/registration-staff',
    [check('staffName', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пороль должен быть более 4 символом и меньше 10 символов').isLength({min: 4, max: 10})
],authRestaurantMiddleware(['RESTAURANT']), controllerStaff.registration)

router.post('/login-staff', controllerStaff.login)

// Restaurant
router.post('/registration-restaurant',
    [check('nameRestaurant', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пороль должен быть более 4 символом и меньше 10 символов').isLength({min: 4, max: 10})
],
controllerRestaurant.registration)

router.post('/login-restaurant', controllerRestaurant.login)

// router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

// router.get('/registration', controller.registrationGet)
// router.get('/login', controller.loginGet)
// router.get('/profile/:id', authMiddleware, controller.profile)
module.exports = router