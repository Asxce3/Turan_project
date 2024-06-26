const Role = require('../models/Role')
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
            const {staffName, password, nameRestaurant} = req.body
            const restaurant = await Restaurant.findOne({nameRestaurant})
            if(!restaurant) {
                return res.status(400).json({message: 'Ресторан не найден', Boolean: false})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const staffRole = await Role.findOne({value: "STAFF"})
            const staff = new Staff({staffName, password: hashPassword, nameRestaurant, role: [staffRole.value]})
            await staff.save()
            restaurant.staff.push({name: staffName, staffId: staff._id}) 
            await restaurant.save()
            return res.json({message: 'Staff успешно зарегестрирован'})
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Registrtion error', Boolean: false})
        }
    }

    async login(req, res) {
        try {
            const {staffName, nameRestaurant,  password} = req.body
            const staffWork = await Restaurant.findOne({nameRestaurant})
            const staff = await Staff.findOne({staffName, nameRestaurant})

            if(!staffWork) {
                return res.status(400).json({message:`Ресторан ${nameRestaurant} не найден`, Boolean: false})
            }
            if(!staff) {
                return res.status(400).json({message:`Staff ${staffName} не найден`, Boolean: false})
            }

            const validPassword = bcrypt.compareSync(password, staff.password) 
            if(!validPassword) {
                return res.status(400).json({message:`Введен неверный пароль`, Boolean: false})
            }
            const token = generateAccessToken(staff._id, staff.role)
            return res.json({message: 'вы вошли', staffData:  staff, token: `Bearer ${token}`})

        }   catch(e) {
                console.log(e)
                res.status(400).json({message: 'Login error', Boolean: false})
        }
    }

}

module.exports = new authController()


