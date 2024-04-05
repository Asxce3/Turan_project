const User = require('../models/User')
const Role = require('../models/Role')
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
            
            const {username, password} = req.body
            const condidate = await User.findOne({username})
            if(condidate) {
                return res.status(400).json({message:"Пользователь с таким именем уже сущустует", Boolean: false})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, role: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегестрирован'})
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Registrtion error', Boolean: false})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                return res.status(400).json({message:`Пользователь ${username} не найден`, Boolean: false})
            }

            const validPassword = bcrypt.compareSync(password, user.password) 
            if(!validPassword) {
                return res.status(400).json({message:`Введен неверный пароль`, Boolean: false})
            }
            const token = generateAccessToken(user._id, user.role)
            
            return res.json({message: 'вы вошли', userData:  user, token: `Bearer ${token}`})

        }   catch(e) {
                console.log(e)
                res.status(400).json({message: 'Login error', Boolean: false})
        }
    }
}

module.exports = new authController()


