const user = require("mongoose")

const userSchema = new user.Schema({
    email:String,
    password:String
})

module.exports =user.model("Users",userSchema)