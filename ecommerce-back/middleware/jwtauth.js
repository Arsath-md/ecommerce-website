const jwt = require("jsonwebtoken");

const authMiddleware = async(req , res , next)=>{
     try{
        const cookie =await req.cookies.token;
        if(!cookie){
            return res.json({status:false,msg:"no cookie by jwt auth"})
        }
        const jwtverify = jwt.verify(cookie,"hifi")
         req.user = jwtverify;
         next();

     }catch(e){
        res.json({msg:`there is a error find me in jwtauth :${e}`})
     }
}

module.exports = authMiddleware;