
const mongose = require("mongoose")

const productSchema = mongose.Schema({
    p_name :String,
    p_desc:String,
    price:Number,
    quantity:Number,
    p_img:String,
    p_type:String,
    p_size:String
})

module.exports = mongose.model("Products",productSchema)