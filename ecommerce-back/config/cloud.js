const cloudinarys = require("cloudinary").v2

cloudinarys.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.APP_KEY,
    api_secret:process.env.APP_SECREAT
})

module.exports = cloudinarys