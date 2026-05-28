const mongose = require("mongoose")

const offerSchema = new mongose.Schema({
      o_name:String,
      offer:String,
      imgs:String

})
module.exports = mongose.model("Offers",offerSchema)