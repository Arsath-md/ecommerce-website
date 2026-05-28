
const mongo = require("mongoose")

const checkoutSchema = new mongo.Schema({
    userid :{
        type:mongo.Schema.Types.ObjectId,
        ref:"Users"
    },
    producting :[
        {
            productid:{
                type:mongo.Schema.Types.ObjectId,
                ref:"Products"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    totalprice:Number,
    address:String,
    paymentmethod:{
        type:String,
        default:"cash on delivery"
    },
    orderstatus:{
        type:String,
        default:"pending"
        
    }

},{timestamps:true})

module.exports = mongo.model("Billings",checkoutSchema)