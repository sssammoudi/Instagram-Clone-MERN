const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post');
const User = mongoose.model('User');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  // your config
});

router.get("/userProfile", requireLogin, (req, res) => {
  User.findById(req.user._id)
  .then(user=>{
    res.json(user)
  })
})

router.post("/findUser", (req, res) => {
  let userPattern = new RegExp("^"+req.body.value.toLowerCase())
  User.find({name: {$regex: userPattern}})
  .then(user=>{
    res.json(user)
  })
  .catch(err=>{
    console.log(err)
  })
})

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({_id: req.params.id})
  .select("-password")
  .then(user=>{
    Post.find({postedBy: req.params.id})
    .populate("postedBy","_id name")
    .exec((err, posts)=>{
      if(err){
        return res.status(422).json({error:err})
      }
      res.json({user, posts})
    })
  })
  .catch(err=>{
    res.status(404).json({error: "User Not Found"})
  })
})

router.put('/follow', requireLogin, (req,res)=>{
  User.findByIdAndUpdate(req.body.followId, {
    $push: {followers: req.user._id}
  }, {
    new: true
  }, (err, result)=>{
    if(err) {
      return res.status(422).json({error:err})
    }
    User.findByIdAndUpdate(req.user._id, {
      $push: {following: req.body.followId}
    }, {
      new:true
    })
    .select("-password")
    .then(resu=>{
      res.json({result, resu})
    })
    .catch(err=>{
      return res.status(422).json({error:err})
    })
  })
})

router.put('/unfollow', requireLogin, (req,res)=>{
  User.findByIdAndUpdate(req.body.unfollowId, {
    $pull: {followers: req.user._id}
  }, {
    new: true
  }, (err, result)=>{
    if(err) {
      return res.status(422).json({error:err})
    }
    User.findByIdAndUpdate(req.user._id, {
      $pull: {following: req.body.unfollowId}
    }, {
      new:true
    })
    .select("-password")
    .then(resu=>{
      res.json({result, resu: resu})
    })
    .catch(err=>{
      return res.status(422).json({error:err})
    })
  })
})

router.post('/update', requireLogin, (req, res)=>{
  console.log(req.body.picture)
  User.findOneAndUpdate({_id: req.user._id}, {
    $set:{name: req.body.name, picture: req.body.picture}
  },{
    new:true
  }, (err,result)=>{
    if(err){
      return res.status(422).json({error:"can not update"})
    }
    res.json(result)
  })
})

router.delete("/deleteIcon", requireLogin, (req, res)=>{
  let picture = req.body.picture
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
})

module.exports = router