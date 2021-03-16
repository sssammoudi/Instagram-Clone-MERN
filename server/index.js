const express = require('express')
const mongoose = require('mongoose')

const app = express()

const PORT = 5000
const {MONGOURL} = require('./keys')

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

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

app.listen(PORT, ()=>{
  console.log(PORT)
})