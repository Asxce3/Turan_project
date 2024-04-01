const Role = require('../models/Role')
const Staff = require('../models/Staff')
const User = require('../models/User')
const Order = require('../models/Order')
const jwt = require('jsonwebtoken');
const {secret} = require('../config');
const Restaurant = require('../models/Restaurant');


const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class userData {
    async profile(req, res) {
        try {
            const user = await User.findById({_id: req.user.id})

            return res.status(200).json({message: 'Профиль',user})

        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Error profile'})
        }
    }

    async orders(req, res) {
        try {
            const userOrders = await Order.find({userId: req.user.id})
            return res.status(200).json({message: 'Заказы', userOrders})
            
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Error orderds'})
        }
    }

    async restaurants(req, res) {
        try {
            const restaurants = await Restaurant.find()
            return res.status(200).json({message: 'Заведения', restaurants})
            
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Error restaurants'})
        }
    }
   

}

module.exports = new userData()


