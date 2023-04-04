const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');

//////////////////// sign up ////////////////////////////////////////////////

const signupSchema = joi.object({
    email : joi.string().required().email(),
    password : joi.string().required().min(8),
    username : joi.string().required(),
})

router.post('/signup', async(req,res) => {
    const emailExist = await User.findOne({ email : req.body.email })

    if(emailExist){
        res.status(400).send("Email Id already exists")
        return
    }

    try{
        const {error} = await signupSchema.validateAsync(req.body);
        if(!error){
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                email : req.body.email,
                password : hashedPass,
                username : req.body.username,
            })
    
            const result = await user.save();
            res.status(200).json(result)
        }
    }
    catch(error){
        res.status(500).json({message : 'error occured' , err : error})
    }

})


////////////////////////////// login /////////////////////////////////////////

const loginSchema = joi.object({
    email : joi.string().email().required(),
    password : joi.string().min(8).required()
})

router.post('/login', async(req,res)=>{
    try{
        const {error} = await loginSchema.validateAsync(req.body);
    }catch(error){
          res.status(400).send(error)
    }

    const user = await User.findOne({ email : req.body.email})

    if(!user){
        res.status(400).send("Incorrect email id")
        return
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if(validPass){
        const token = jwt.sign({_id:user._id, email: user.email}, `${process.env.Token_Secret}`)
        res.header("auth-token", token).json({ token: token, user:user})
        user.token = token;
        // res.status(200).json(user);
    }else{
        res.status(400).send("invalid password")
    }

})

module.exports = router;
