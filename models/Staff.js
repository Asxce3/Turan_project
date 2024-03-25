const {Schema, model} = require('mongoose')

const Staff = new Schema({
    name: {type: String},
    nameRestaurant: {type: String, ref: 'Restaurant'},
    role: [{type: String, ref: 'Role'}]
})

module.exports = model('Staff', Staff)