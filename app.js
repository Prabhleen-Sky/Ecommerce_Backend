const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//const products = require('./api/data/products')
// const Product = require('./api/models/Product')

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://prabhleen:Sky1111@cluster0.nmqfc35.mongodb.net/ecommerce_backend?retryWrites=true&w=majority")
    .then(console.log("Connection to DB successfull."))
    .catch(err => console.log(err))



// routes
const homeRoute = require('./api/routes/home');
app.use('/home', homeRoute);

// user route
const userRoute = require('./api/routes/user')
app.use('/user', userRoute)

// product route
const productRoute = require('./api/routes/product')
app.use('/product', productRoute)


// cart route
const cartRoute = require('./api/routes/cart')
app.use('/cart', cartRoute)

// error
app.use('/', (req,res) => {
    res.status(200).json({msg:"404,resource not found"});
})


module.exports = app;