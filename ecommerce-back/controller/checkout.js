const cart = require("../models/cartSchema")
const check = require("../models/checkoutSchema")

exports.checkout =async(req,res)=>{

     try{
        const userid = req.user.userid;
        const {address,paymentmethod} = req.body;
        

        const cartitem =await cart.findOne({userid:userid})
            .populate("producting.productid")
        if(!cartitem){
            return res.json({msg:"cart is empty"})
        }
        let total =0 ;
         cartitem.producting.forEach( data =>{
            total += data.productid.price * data.quantity
        })
        const orderedproducts = cartitem.producting.map((adds)=>({
                productid:adds.productid,
                quantity:adds.quantity
                
        }))
        const ordered = await check.create({
            userid:userid,
            producting:orderedproducts,
            totalprice:total,
            address:address,
            paymentmethod:paymentmethod,
            orderstatus:"pending"
        }) 
        cart.producting = []
        await cartitem.save()

        res.json({msg:"order created",ordered})



     }catch(e){
        res.json({msg:`there is an error in the checkout: ${e}`})
     }
}
exports.showcheckout = async(req , res) => {

    try {

        const { id } = req.params

        const resp = await check.findById(id)
        .populate("producting.productid")

        if(!resp){

            return res.json({
                msg:"no items in checkout"
            })

        }

        return res.json(resp)

    } catch(e){

        console.error(
          "there is an error in show cart " + e
        )

        return res.status(500).json({
            msg:"server error"
        })
    }
}