const user = require("../models/userSchema")
const jwt  = require("jsonwebtoken")

exports.register =async(req, res)=>{
        try{
            const {email,password} = req.body;
            const done =await user.create({
                email:email,
                password:password
            })
            res.json({msg:"registered user in the mongo db !"})
            console.log("done registerd");
            

        }catch(e){
            res.json({msg:`there is an error in the register controller :${e}`})
        }
}

exports.logins = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const done = await user.findOne({email})
        if(!done){
            return res.send("<h1>email not found</h1>")
        }
        const token = jwt.sign({
            userid :done._id,
            email:done.email
        },"hifi",{
            expiresIn:"7h"
        })
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
        res.json({msg:"stored in jwt",token})
        
    }catch(e){
        res.json({msg:`i am the error in logins :${e}`})
    }
}

