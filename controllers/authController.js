const User = require('../models/User')
const Role = require('../models/Role')
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
    async registrationPost(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {username, password} = req.body
            const condidate = await User.findOne({username})
            if(condidate) {
                return res.status(400).json({message:"Пользователь с таким именем уже сущустует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, bouneses: 0,
                 subscription: false, role: [userRole.value]})
            await user.save()
            // return res.json({message: 'Пользователь успешно зарегестрирован'})
            return res.redirect('login')
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Registrtion error'})
        }
    }

    async loginPost(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                return res.status(400).json({message:`Пользователь ${username} не найден`})
            }

            const validPassword = bcrypt.compareSync(password, user.password) 
            if(!validPassword) {
                return res.status(400).json({message:`Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.role)
            // return res.json({token})
            
            return res.redirect(`profile/${user._id}?token=${token}`)

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
            const token = req.query
            // console.log(token)
            const user = await User.findById(req.params.id)
            // console.log(user)

            return res.render('pages/profile', {user})
            
        }   catch(e) {
            console.log(e)
        }
        
    }

    async getUsers(req, res){
        try{
            const users = await User.find()
            res.send(users)
        }   catch(e){
            console.log(e)
        }
    }
}

module.exports = new authController()

