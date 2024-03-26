const Role = require('../models/Role')
const Order = require('../models/Order')
const Staff = require('../models/Staff')
const Restaurant = require('../models/Restaurant')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require('../config')


const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {staffName, password, nameRestaurant} = req.body
            const restaurant = await Restaurant.findOne({nameRestaurant})
            if(!restaurant) {
                return res.status(400).json({message: 'Ресторан не найден'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const staffRole = await Role.findOne({value: "STAFF"})
            const staff = new Staff({staffName, password: hashPassword, nameRestaurant, role: [staffRole.value]})
            console.log(staff)
            await staff.save()
            restaurant.staff.push(staff._id, {name: staffName}) 
            await restaurant.save()
            return res.json({message: 'Staff успешно зарегестрирован'})
            // return res.redirect('login')
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Registrtion error'})
        }
    }

    async login(req, res) {
        try {
            const {staffName, password, nameRestaurant} = req.body
            const staffWork = await Restaurant.findOne({nameRestaurant})
            const staff = await Staff.findOne({nameRestaurant})

            if(!staffWork) {
                return res.status(400).json({message:`Ресторан ${nameRestaurant} не найден`})
            }
            if(!staff) {
                return res.status(400).json({message:`Staff ${staffName} не найден`})
            }

            const validPassword = bcrypt.compareSync(password, staff.password) 
            if(!validPassword) {
                return res.status(400).json({message:`Введен неверный пароль`})
            }
            const token = generateAccessToken(staff._id, staff.role)
            res.cookie('token', `Bearer ${token}`)
            return res.json({message: 'вы вошли', staffData:  staff})
            // return res.redirect(`profile/${user._id}`)

        }   catch(e) {
                console.log(e)
                res.status(400).json({message: 'Login error'})
        }
    }

    async registrationGet(req, res) {
        try {
            return res.render('pages/reg')
            
        }   catch(e) {
            console.log(e)
        }
    }

    async loginGet(req, res) {
        try {
            return res.render('pages/login')
            
        }   catch(e) {
            console.log(e)
        }
    }

    async profile(req, res) {
        
        try {
            const user = await User.findById(req.params.id)

            return res.render('pages/profile', {user})
        }   catch(e) {
            console.log(e)
        }
        
    }
}

module.exports = new authController()


