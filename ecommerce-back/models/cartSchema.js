
const mongose = require("mongoose")

const cartSchema = mongose.Schema({
    userid :{
        type:mongose.Schema.Types.ObjectId,
        ref:"Users"
    },
    producting:[{
        productid:{
            type:mongose.Schema.Types.ObjectId,
            ref:"Products"
        },
        quantity:{
            type:Number        }
}]
})

module.exports = mongose.model("Carts",cartSchema)