const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function(roles) {
    return function(req, res, next) {
        if(req.method === 'OPTIONS') {
            next()
        }
    
        try {
            const token = req.cookies.token.split(' ')[1]
            if(!token) {
                return res.status(403).json({message: 'Пользователь не авторизован'})
            }
            const {roles: requestRoles} = jwt.verify(token, secret)
            console.log('roles - ', roles)
            console.log('requestRoles - ',requestRoles)
            let hasRole = false
            requestRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true
                }
            })

            if(!hasRole) {
                return res.status(403).json({message: 'У вас нет доступа'})
            }
            next();
            
        }   catch(e) {
            console.log(e)
            res.status(403).json({message: 'Пользователь не авторизован'})
        }
    }
}