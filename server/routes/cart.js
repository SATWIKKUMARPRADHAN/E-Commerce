import express from 'express'
import Cart from '../model/Cart.js'

const router = express.Router();

//get user cart
router.get("/:userId", async(req,res)=>{
    try{
        const cart = await Cart.findOne({user: req.params.userId});
        if(!cart) return res.json({cartItems:[]});
        res.json(cart);
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

//add ITem to Cart

router.post("/add", async(req,res)=>{
    const {userId, product, name, image, price, qty} = req.body;

    try{
        let cart = await Cart.findOne({user: userId});

        if(cart){
            const itemIdx = cart.cartItems.findIndex((p)=> p.product.toString() === product);
        

            if(itemIdx > -1){
                cart.cartItems[itemIdx].qty += qty;
            }else{
                cart.cartItems.push({product, name, image, price, qty});
            }
            cart = await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({
                user: userId,
                cartItems: [{product, name, image, price, qty}],
            })
            return res.status(201).json(newCart);
        }

    } catch (error){
        res.status(500).json({message: error.message})
    }

})

router.delete("/remove/:userId/:productId", async(req,res)=>{
    try{
        let cart = await Cart.findOne({user: req.params.userId});
        if(!cart) return res.status(404).json({message: "cart not found"});

        cart.cartItems = cart.cartItems.filter(
            (item)=>item.product.toString() !== req.params.productId
        )
        await cart.save();
        res.json(cart);

    } catch(err){
        res.status(500).json({message: error.message});
    }
});

export default router;
