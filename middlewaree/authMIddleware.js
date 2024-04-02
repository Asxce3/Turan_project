const jwt = require('jsonwebtoken')
const {secret} = require('../config')
module.exports = function(req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        // const token = req.cookies.token.split(' ')[1]    // через куки не работает
        if(!token) {
            return res.status(403).json({message: 'Пользователь не авторизован (нет jwt токена)'})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
        
    }   catch(e) {
        console.log(e)
        return res.status(403).json({message: 'Пользователь не авторизован'})
    }
};