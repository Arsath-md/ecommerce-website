
exports.dash =async(req, res)=>{
        try{
            
            res.json({msg:"data from dashboard",user:req.user.email})
            

        }catch(e){
            res.json({msg:`there is an error in the register controller :${e}`})
        }
}