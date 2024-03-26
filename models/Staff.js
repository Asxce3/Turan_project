const {Schema, model} = require('mongoose')

const Staff = new Schema({
    staffName: {type: String},
    password: {type: String},
    nameRestaurant: {type: String, ref: 'Restaurant'},
    role: [{type: String, ref: 'Role'}]
})

module.exports = model('Staff', Staff)