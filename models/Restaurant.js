const {Schema, model} = require('mongoose')

const Restaurant = new Schema({
    name: {type: String, unique: true},
    staff: [{
        id: {type: String, ref: 'Staff'},
        name: {type: String},
    }]
})

module.exports = model('Restaurant', Restaurant)