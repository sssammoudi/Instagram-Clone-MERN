const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Notify = mongoose.model('Notify');

router.post('/notify', requireLogin, (req, res)=>{
  const {id, recipient, url, text, content, image} = req.body
  console.log({id, recipient, url, text, content, image})
  const notification = new Notify({
    id,
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

module.exports = router