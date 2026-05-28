const prod = require("../models/productSchema")

exports.products =async(req,res)=>{
    try{
        const product = await prod.find({}).limit(8)
        if(!product){
            return res.json({msg:"no product "})
        }
        res.json(product)

    }catch(e){
            res.json({msg:"not get the product"})
    }
}

exports.filterproduct = async(req,res)=>{
    try{
        const productfilter =await prod.find({})
        if(!productfilter){
            return res.json({msg:"nothing found in the filter"})
        }
        res.json(productfilter)

    }
    catch(e){
        console.log("there is an error in filter"+e)
    }
}

exports.catagoryproduct = async(req , res)=>{
      try{
        const {id} = req.params;
        const productfilter =await prod.find({p_type:id})
        if(!productfilter){
            return res.json({msg:"nothing found in the filter"})
        }
        res.json(productfilter)

    }
    catch(e){
        console.log("there is an error in filter"+e)
    }
}
