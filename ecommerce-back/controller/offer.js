const offering = require("../models/offerSchema")

exports.offeradd= async(req ,res)=>{
    try{
        const {o_name,offer} = req.body;
        const imgs = req.file.path;
        const offers =await offering.create({
                o_name:o_name,
                offer:offer,
                imgs:imgs

        }) 
        if(!offers){
            return res.json({msg:"cant add the offer "})
        }
        res.json({msg:"succes to add offers"})

    }catch(e){
        res.json({msg:`in the error of offer : ${e}`})
    }
} 

exports.getoffer=async(req , res )=>{
    try{
        const getoffer =await offering.find({})
        
        res.status(200).json(getoffer)

    }catch(e){
        res.json({msg:`errror in the get offers : ${e}`})
    }
}