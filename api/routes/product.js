const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const products = require('../data/products')


//// default products that will be available in database
// Product.collection.insertMany(products, onInsert);

// function onInsert(err, docs) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('success');
//     }
// }

// get all the products
router.get('/getAllProducts', (req,res) => {
    Product.find()
        .then(result => res.status(200).json( {message: 'All Products are : ', products: result} ))
        .catch(error => res.status(500).json( {message: 'Server Error', err: error} ))
})

// get product by id 
router.get('/getProductById/:id', async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
    
        res.json(product);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
})


module.exports = router;