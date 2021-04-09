const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const cloudinary = require('cloudinary').v2;
const Post = mongoose.model('Post');

cloudinary.config({ 
  cloud_name: 'dcyfsjd', 
  api_key: '429237186124595',
  api_secret: 'FlEgacGUFud6WBF-E6kIAvky1R0'
});

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
  .sort({createdAt: 'desc'})
  .then(myPost => {
    res.json({myPost})
  })
  .catch(err => (
    console.log(err)
  ))
})

router.get("/followingsPost", requireLogin, (req, res) => {
  Post.find({postedBy: {$in:req.user.following}})
  .populate('postedBy', '_id name picture')
  .sort({createdAt: 'desc'})
  .then(posts => {
    res.json({posts})
  })
  .catch(err => (
    console.log(err)
  ))
})

router.get("/GetPost/:id", (req, res) => {
  Post.findById(req.params.id)
  .populate('postedBy', '_id name picture')
  .then(post=>{
    res.json({post})
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

router.get("/liked/:postId/:id", (req, res)=>{
  Post.find({_id: req.params.postId, likes: req.params.id})
  .then((result, err)=>{
    if(result[0]){
      return res.json(true)
    } else {
      return res.json(false)
    }
  })
})

router.post("/like", requireLogin, (req, res)=>{
  Post.find({_id: req.body.postId, likes: req.body._id})
  .then(result=>{
    if(result[0]){
      return null
    } else {
      Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.body._id}
      }, {
        new: true
      }).exec((err, result)=> {
        if(err) {
          return res.status(422).json({error:err})
        } else {
          res.json(result)
        }
      })
    }
  })
})

router.post("/unlike", requireLogin, (req, res)=>{
  Post.findByIdAndUpdate(req.body.postId, {
    $pull: {likes: req.body._id}
  }, {
    new: true
  }).exec((err, result)=> {
    if(err) {
      return res.status(422).json({error:err})
    } else {
      res.json(result)
    }
  })
})

router.put('/comment',requireLogin,(req,res)=>{
  const comment = {
      text: req.body.commentText,
      postedBy: {name: req.user.name, picture: req.user.picture, _id: req.user._id}
  }
  Post.findByIdAndUpdate(req.body.postId, {
    $push: {comments: comment}
  }, {
    new: true
  })
  .exec((err, result)=> {
    if(err) {
      return res.status(422).json({error:err})
    } else {
      res.json(result)
    }
  })
})

router.delete("/deletepost/:id", requireLogin, (req, res)=>{
  Post.findById(req.params.id)
  .populate("postedBy", "_id")
  .exec((err, post)=> {
    if(err || !post){
      return res.status(422).json({error:err})
    }
    if(post.postedBy._id.toString()===req.user._id.toString()) {
      if(req.headers.picture && post.picture){
        let picture = post.picture
        picture = picture.toString().replace("http://res.cloudinary.com/dcyfsjd/image/upload", "").replace(".jpg", "").replace(".png", "")
        picture = picture.split("/")
        console.log(picture[2])
        cloudinary.api.delete_resources(
          picture[2],
          {invalidate: true}, 
          (result, err) => {
            console.log(err, result)
          }
        )
      }
      post.remove()
      .then(result_=>{
        res.json({success: "Post Deleted", result_})
      }).catch(err=>{
        console.log(err)
      })
    }
  })
})

router.put("/deletecomment", requireLogin, (req, res)=> {
  Post.findByIdAndUpdate(req.body.postId, {
    $pull: {comments: {_id: req.body._id}}
  }, {
    new: true
  })
  .exec((err, result)=> {
    if(err) {
      return res.status(422).json({error:err})
    } else {
      res.json(result)
    }
  })
})

module.exports = router