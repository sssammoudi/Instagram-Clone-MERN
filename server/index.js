const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 5000
const {MONGOURL} = require('./config/keys')

require('./models/user')
require('./models/post')
require('./models/notify')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.use(require('./routes/notify'))

mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on("connected", ()=>{
  console.log("connected")
})
mongoose.connection.on("error", (err)=>{
  console.log("error in connection: ", err)
})

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(PORT, ()=>{
  console.log(PORT)
})