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

            const {nameRestaurant, password} = req.body
            const condidate = await Restaurant.findOne({nameRestaurant})
            console.log(condidate)
            if(condidate) {
                return res.status(400).json({message: 'Название ресторана уже занято'})
            }
            const restaurantRole = await Role.findOne({value: "RESTAURANT"})
            const hashPassword = bcrypt.hashSync(password, 7)

            const restaurant = new Restaurant({nameRestaurant, password: hashPassword, role: [restaurantRole.value]})
            await restaurant.save()

            return res.json({message: 'Заведение успешно зарегестрировано'})
            // return res.redirect('login')
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Registrtion error'})
        }
    }

    async login(req, res) {
        try {
            const {nameRestaurant, password} = req.body
            const restaurant = await Restaurant.findOne({nameRestaurant})

            if(!restaurant) {
                return res.status(400).json({message:`Ресторан ${nameRestaurant} не найден`})
            }

            const validPassword = bcrypt.compareSync(password, restaurant.password) 

            if(!validPassword) {
                return res.status(400).json({message:`Введен неверный пароль`})
            }
            const token = generateAccessToken(restaurant._id, restaurant.role)
            res.cookie('token', `Bearer ${token}`)
            return res.json({message: 'вы вошли', restaurantData:  restaurant})
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


