const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const { check } = require('express-validator')
const authMiddleware = require('../middlewaree/authMIddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')


router.post('/registration',
    [check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пороль должен быть более 4 символом и меньше 10 символов').isLength({min: 4, max: 10})
],
 controller.registrationPost)

router.post('/login', controller.loginPost)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

router.get('/registration', controller.registrationGet)
router.get('/login', controller.loginGet)
router.get('/profile/:id', authMiddleware, controller.profile)
module.exports = router