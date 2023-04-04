const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart')
const verify = require('../authVerify')

// get cart products
router.get('/getCartProducts', verify, (req,res) => {
    Cart.find()
    .then(result => res.status(200).json( {message: 'products in cart are : ', products: result} ))
    .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
})


// add product in cart
router.post('/addProductToCart', verify, async(req,res) =>{
    const productId = req.body.productId
    const count = req.body.count
    const token = req.header("auth-token");
    try {
        let cart = await Cart.findOne({ productId : req.body.productId })
        if(cart){
            cart = await Cart.findOneAndUpdate({productId},{productId, count, userId: token._id})
            res.status(201).json({status: 'ok', cart})
        }else{
            const cart = new Cart({
                _id : new mongoose.Types.ObjectId(),
                productId : req.body.productId,
                count : req.body.count,
                userId : token._id
            })
    
            const result = await cart.save();
            res.status(200).json(result)
        }
      }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
})


// delete product from cart
router.delete('/deleteProductFromCart/:id', verify, async(req,res) => {
    Cart.findOneAndDelete(req.params.id)
        .then(result => res.status(200).json( {message: 'deleted sucessfully', document: result} ))
        .catch(err => res.status(500).json( {message: 'Server Error', error: err} ))
})

module.exports = router;