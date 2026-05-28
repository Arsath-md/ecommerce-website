const multer = require("multer")
const cloudnarys = require("../config/cloud")
const {CloudinaryStorage} = require("multer-storage-cloudinary");

const multers = new CloudinaryStorage({
    cloudinary:cloudnarys,
    params:{
        folder:"products",
        allowed_formats: ["jpg", "png", "jpeg", "webp"]
    }
})
const upload = multer({storage:multers})
module.exports = upload