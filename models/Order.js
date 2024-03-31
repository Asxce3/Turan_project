const {Schema, model} = require('mongoose')

const Order = new Schema({
    nameRestaurant: {type: String, ref: 'Restaurant'},
    date: {type: Date, default: Date.now},
    orderCost: {type: Number},
    bonuses: {type: Number},
    userId: {type: String}
})

module.exports = model('Order', Order)