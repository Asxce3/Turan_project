const Role = require('../models/Role')
const Staff = require('../models/Staff')
const User = require('../models/User')
const Order = require('../models/Order')
const Restaurant = require('../models/Restaurant')

const calculateBonus = (cost, discount) => {
    discount /= 100
    bonuses = Math.floor(cost*discount)    // округляет к меньшему значению
    return bonuses
}

const paymentBonus = (cost, bonuses) => {

    bonuses -= cost
    return bonuses
}
class sendBonusController {
    async payment(req, res) {
        try {
            const orderCost = req.body.price
            const user = await User.findOne({username:'samvel'})    // User должен прилетать с qr
            const staff = await Staff.findOne({staffName: 'petya'})    // Staff должен прилетать с qr
            const nameRestauran = staff.nameRestaurant
            const userBonuses = user.bonuses
            
            if(userBonuses < orderCost) {
                return res.status(400).json({message: 'У вас недостаточно бонусов'})
            }

            const bonuses = paymentBonus(orderCost, userBonuses)
            const discardedBonuses = -1 * orderCost
            const order = new Order({nameRestauran, orderCost, bonuses: discardedBonuses, userId: user._id})
            await order.save()

            user.bonuses = bonuses
            await user.save()

            return res.status(200).json({message: `Бонусы успешно списаны! Оставшиеся бонусы ${user.bonuses}`})
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Error'})
        }
    }

    async accrual(req, res) {
        try {
            const orderCost = req.body.price
            const user = await User.findOne({username:'samvel'})    // User должен прилетать с qr
            const staff = await Staff.findOne({staffName: 'petya'})    // Staff должен прилетать с qr
            const nameRestauran = staff.nameRestaurant
            const userDiscount = user.discount

            const bonuses = calculateBonus(orderCost, userDiscount)
            const order = new Order({nameRestauran, orderCost, bonuses, userId: user._id})
            await order.save()

            user.bonuses += bonuses
            await user.save()

            res.status(200).json({message: 'Бонусы успешно отправлены!', totalBonus: user.bonuses})
        }   catch(e) {
                console.log(e)
                return res.status(400).json({message: 'Error'})
        }
    }
   

}

module.exports = new sendBonusController()


