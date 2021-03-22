const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

const User = mongoose.model('User');

router.post('/signup', (req, res)=>{
  const {name, email, password, picture} = req.body
  if (!email || !password || !name){
    return res.status(422).json({error: "fill all the fields please"})
  }
  User.findOne({email: email})
  .then((savedUser)=>{
    if(savedUser){
      return res.status(422).json({error: "Email already in use"})
    }
    bcrypt.hash(password, 15)
    .then(hashedPassword=>{
      const user = new User({
        email,
        name,
        password: hashedPassword,
        picture: picture
      })
      user.save()
      .then((user)=>{
        res.json({success: "Account Created"})
      })
      .catch((err) => (
        console.log(err)
      ))
    })
    
    })
  .catch((err) => (
    console.log(err)
  ))
})

router.post('/login', (req, res)=>{
  const {email, password} = req.body
  if (!email || !password ){
    return res.status(422).json({error: "fill all the fields please"})
  }
  User.findOne({email: email})
  .then((savedUser)=>{
    if(!savedUser){
      return res.status(422).json({error: "The Email or Password is incorrect "})
    }
    bcrypt.compare(password, savedUser.password)
    .then(match=>{
      if(match){
        const token = jwt.sign({s_id: savedUser._id}, JWT_SECRET_KEY)
        const {_id, name, email} = savedUser
        return res.json({token, user: {_id, name, email}, success: "Succesfull login"})
      }
      return res.status(422).json({error: "The Email or Password is incorrect "})
    })
  })
  .catch((err) =>{
    console.log(err.message)
  })
})

module.exports = router