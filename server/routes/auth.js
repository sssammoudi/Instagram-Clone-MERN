const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('./keys')

const User = mongoose.model('User');

router.get('/', (req, res)=>{
  res.send("Home")
})


router.post('/signup', (req, res)=>{
  const {name, email, password} = req.body
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
        password: hashedPassword
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
        return res.json({success: "Success login"})
      }
      return res.status(422).json({error: "The Email or Password is incorrect "})
    })
  })
  .catch((err) =>{
    console.log(err.message)
  })
})

module.exports = router