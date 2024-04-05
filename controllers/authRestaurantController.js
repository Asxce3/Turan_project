const Role = require('../models/Role')
const Order = require('../models/Order')
const Staff = require('../models/Staff')
const Restaurant = require('../models/Restaurant')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            const {nameRestaurant, password} = req.body
            const condidate = await Restaurant.findOne({nameRestaurant})
            console.log(condidate)
            if(condidate) {
                return res.status(400).json({message: 'Название ресторана уже занято', Boolean: false})
            }
            const restaurantRole = await Role.findOne({value: "RESTAURANT"})
            const hashPassword = bcrypt.hashSync(password, 7)

            const restaurant = new Restaurant({nameRestaurant, password: hashPassword, role: [restaurantRole.value]})
            await restaurant.save()

            return res.json({message: 'Заведение успешно зарегестрировано'})
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Registrtion error', Boolean: false})
        }
    }

    async login(req, res) {
        try {
            const {nameRestaurant, password} = req.body
            const restaurant = await Restaurant.findOne({nameRestaurant})

            if(!restaurant) {
                return res.status(400).json({message:`Ресторан ${nameRestaurant} не найден`, Boolean: false})
            }

            const validPassword = bcrypt.compareSync(password, restaurant.password) 

            if(!validPassword) {
                return res.status(400).json({message:`Введен неверный пароль`, Boolean: false})
            }
            const token = generateAccessToken(restaurant._id, restaurant.role)
            return res.json({message: 'вы вошли', restaurantData:  restaurant, token: `Bearer ${token}`})

        }   catch(e) {
                console.log(e)
                res.status(400).json({message: 'Login error', Boolean: false})
        }
    }
}

module.exports = new authController()


