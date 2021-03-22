const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')

const Post = mongoose.model('Post');

router.get("/allPosts", (req, res) => {
  Post.find()
  .populate('postedBy', '_id name picture')
  .sort({createdAt: 'desc'})
  .then(posts => {
    res.json({posts})
  })
  .catch(err => (
    console.log(err)
  ))
})

router.get("/userPost", requireLogin, (req, res) => {
  Post.find({postedBy: req.user._id})
  .populate('postedBy', '_id name')
  .then(myPost => {
    res.json({myPost})
  })
  .catch(err => (
    console.log(err)
  ))
})

router.post('/createPost', requireLogin, (req, res)=>{
  const {title, body, picture} = req.body
  if (!title || !body){
    res.status(422).json({error: "fill all the fields please"})
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    picture,
    postedBy: req.user
  })
  post.save()
  .then((post)=>{
    res.json({success: "Post Created"})
  })
  .catch((err) => (
    console.log(err)
  ))
})

module.exports = router