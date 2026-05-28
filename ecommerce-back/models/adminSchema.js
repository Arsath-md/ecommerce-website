const mongose = require("mongoose")

const adminSchema = new mongose.Schema({
    email:String,
    password:String
})

module.exports = mongose.model("Admins",adminSchema)