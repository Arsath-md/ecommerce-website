const cartitm = require("../models/cartSchema")
const allproduct = require("../models/productSchema")

exports.addtocart =async(req,res)=>{

    try{
        const usersid = req.user.userid
        const {productid,quantity} = req.body
        if(!usersid){
            console.log("no user jwt")
            return res.json({status:false ,msg:"login first"})
        }
        console.log("now executed userifd")
        let cartitems = await cartitm.findOne({userid:usersid})
        let allprod   = await allproduct.findOne({_id:productid})
        if(!cartitems){
            cartitems = new cartitm({
                userid: usersid,
                producting:[{
                    productid,
                    quantity
            }]
            })
        }else{
            const productindex = cartitems.producting.findIndex(
                items => items.productid.toString() === productid
            )
        
        if(productindex > -1){
            cartitems.producting[productindex].quantity +=1
        }else{
            cartitems.producting.push({
                productid,
                quantity
            })
        }
    
    } 
        allprod.quantity -= quantity
        console.log(allprod.quantity)

        await allprod.save()
        await cartitems.save()
        res.status(200).json({status:true,msg:true,quant:allprod.quantity})

    }catch(e){
        res.json({msg:false})
    }
}
exports.getcart = async(req,res)=>{

    try{

        const usersid = req.user.userid

        if(!usersid){
            return res.json({status:false,msg:'login first to get'})
        }

        console.log("logged user:", usersid)

        const getitems = await cartitm.findOne({
            userid: usersid
        }).populate("producting.productid")

        console.log(getitems)

        if(!getitems){
            return res.send({msg:"not from getcart"})
        }

        res.json(getitems)

    }catch(e){

        res.json({msg:`error : ${e}`})

    }
} 
exports.deletecartproduct = async(req,res)=>{

    try{

        const usersid = req.user.userid

        const { productid } = req.params

        // FIND USER CART
        const cart = await cartitm.findOne({
            userid: usersid
        })

        // FIND PRODUCT INSIDE CART
        const cartproduct = cart.producting.find(

            item => item.productid.toString() === productid

        )

        // FIND REAL PRODUCT
        const allprod = await allproduct.findById(productid)

        // RESTORE QUANTITY
        allprod.quantity += cartproduct.quantity

        await allprod.save()

        // REMOVE FROM CART
        await cartitm.updateOne(

            { userid: usersid },

            {
                $pull:{
                    producting:{
                        productid: productid
                    }
                }
            }

        )

        res.json({
            msg:"Product removed"
        })

    }catch(e){

        console.log(e)

        res.json({
            msg:"Error"
        })

    }

}