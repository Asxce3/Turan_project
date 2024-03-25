const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    bonuses: {type: Number, default: 0},
    subscription: {type: Boolean, default: false},
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    role: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User)