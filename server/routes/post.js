const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')

router.post('/createPost', requireLogin, (req, res)=>{
  const {title, body} = req.body
  if (!title || !body){
    res.status(422).json({error: "fill all the fields please"})
  }
  console.log(req.user)
  res.send("ok"+req.user)
  // const post = new Post({
  //   title: title,
  //   body: body
  // })
})

module.exports = router