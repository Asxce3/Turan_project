const Router = require('express')
const router = new Router()
const controllerUser = require('../controllers/authUserController')
const controllerStaff = require('../controllers/authStaffController')
const controllerRestaurant = require('../controllers/authRestaurantController')
const { check } = require('express-validator')
const authMiddleware = require('../middlewaree/authMIddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')

// User
router.post('/registrationUser',
    [check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пороль должен быть более 4 символом и меньше 10 символов').isLength({min: 4, max: 10})
],
controllerUser.registrationPost)

router.post('/loginUser', controllerUser.loginPost)

// Staff
router.post('/registrationStaff',
    [check('staffName', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пороль должен быть более 4 символом и меньше 10 символов').isLength({min: 4, max: 10})
],
controllerStaff.registration)

router.post('/loginStaff', controllerStaff.login)

// Restaurant
router.post('/registrationRest',
    [check('nameRestaurant', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пороль должен быть более 4 символом и меньше 10 символов').isLength({min: 4, max: 10})
],
controllerRestaurant.registration)

router.post('/loginRest', controllerRestaurant.login)

// router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

// router.get('/registration', controller.registrationGet)
// router.get('/login', controller.loginGet)
// router.get('/profile/:id', authMiddleware, controller.profile)
module.exports = router