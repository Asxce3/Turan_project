const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function(req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.cookies.token.split(' ')[1]
        if(!token) {
            return res.status(403).json({message: 'Пользователь не авторизован (нет jwt токена)'})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
        
    }   catch(e) {
        console.log(e)
        res.status(403).json({message: 'Пользователь не авторизован'})
    }
};