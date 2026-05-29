const product = require("../models/productSchema")
const admins  = require("../models/adminSchema")
const crypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.addproduct=async(req,res)=>{
    try{
    const {p_name,p_desc,price,p_type,quantity,p_size} = req.body;
    const p_img= req.file.path;
    const addproducts =await product.create({
        p_name:p_name,
        p_desc:p_desc,
        price:price,
        p_img:p_img,
        p_type:p_type,
        p_size:p_size,
        quantity:quantity

    })
    console.log("added products to mongo as well as cloudnary" + p_img)
    res.json({msg:"done and dusteed"})

}catch(e){
    console.log(`there is an error in addproduct of admin :${e}`)
}
}

exports.deleteproduct =async(req , res) =>{
        try{
            const {id} =req.params;
            const dlt = await product.deleteOne({_id:id})
            res.json({msg:"deleted "})
            console.log("delted")
        }catch(e){
            console.log("error of delete"+e)
        }

}


exports.adminverify = async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log("entered password:", password);
    //    const data = await crypt.hash("hifi4611",10)
    //    console.log("new paasss:"+data)
        const pass = await admins.findOne({
            email: email
        });

        if (!pass) {
            return res.status(404).json({
                msg: "Admin not found"
            });
        }

        console.log(pass.password);

        const verify = await crypt.compare(
            password,
            pass.password
        );
        

        console.log("verify:", verify);

        if (!verify) {
            return res.status(401).json({
                msg: false
            });
        }
         // CREATE JWT TOKEN
        const token = jwt.sign(
            {
                adminid: pass._id,
                role: "admin"
            },
            "adminauth",
            {
                expiresIn: "7h"
            }
        );

        // STORE TOKEN IN COOKIE
        res.cookie("tokens", token, {

            httpOnly: true,

            secure: false, // true in production HTTPS

            sameSite: "lax",

            maxAge: 7 * 60 * 60 * 1000
        });

        res.status(200).json({
            msg: "Admin login success",
            admin: true
        });

      

    } catch (e) {

        console.log(e);

        res.status(500).json({
            msg: "server error"
        });
    }
};


exports.admincheck = async(req , res )=>{
     try{
        const cookie = req.cookies.tokens;
        if(!cookie){
            return res.status(403).json({msg:false})
        }
        const jwtverify =await jwt.verify(cookie,"adminauth")
         if(!jwtverify){
            return res.status(404).json({msg:"not verified admin"})
         }
         res.json({admin:true})
         

     }catch(e){
        res.json({msg:`there is a error find me in jwtauth :${e}`})
     }
}
