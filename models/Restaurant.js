const {Schema, model} = require('mongoose')

const Restaurant = new Schema({
    nameRestaurant: {type: String, unique: true},
    password: {type: String, required: true},
    role: [{type: String, ref: 'Role'}],
    staff: [{
        name: {type: String},
    }]
})

module.exports = model('Restaurant', Restaurant)