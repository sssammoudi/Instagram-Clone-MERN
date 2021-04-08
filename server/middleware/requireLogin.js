const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const {JWT_SECRET_KEY} = require('../config/keys')

module.exports = (req, res, next) =>{
  const {authorization} = req.headers
  if(!authorization){
    return res.status(401).json({error: "You must be logged in"})
  }
  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, JWT_SECRET_KEY, (err, payload)=>{
    if(err){
     return res.status(401).json({error: "You must be logged in"})
    }
    const {s_id} = payload
    User.findById(s_id)
    .then(userdata=>{
      req.user = userdata
      next()
    })  
  })
}