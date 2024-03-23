const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    bouneses: {type: Number, required: true},
    subscription: {type: Boolean, required: true},
    role: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User)