const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function(roles) {
    return function(req, res, next) {
        if(req.method === 'OPTIONS') {
            next()
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(403).json({message: 'Пользователь не авторизован'})
            }
            const {roles: requestRoles, id} = jwt.verify(token, secret)
            
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
            req.id = id
            next();
            
        }   catch(e) {
            console.log(e)
            res.status(403).json({message: 'Пользователь не авторизован'})
        }
    }
}