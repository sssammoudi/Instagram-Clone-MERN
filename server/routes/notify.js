const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Notify = mongoose.model('Notify');

router.post('/createNotify', requireLogin, (req, res)=>{
  const {id, recipient, url, text, content, image} = req.body.msg
  const notification = new Notify({
    recipient,
    url,
    text,
    content,
    image,
    user: req.user._id
  })
  notification.save()
  .then((notify)=>{
    res.json({notify})
  })
  .catch((err) => {
    console.log(err)
  })
})

router.get("/getNotify", requireLogin, (req, res)=>{
  Notify.find({recipient: {$all: [req.user._id]}})
  .populate("user", "name picture")
  .sort("read")
  .sort({createdAt: 'desc'})
  .then(notification => {
    res.json({notification})
  })
  .catch(err => (
    console.log(err)
  ))
})

module.exports = router