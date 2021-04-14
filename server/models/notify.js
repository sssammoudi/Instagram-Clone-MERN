const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const notifySchema = new mongoose.Schema({
  id: ObjectId,
  user: {
    type: ObjectId,
    ref: "User"
  },
  recipient: [
    ObjectId
  ],
  url: String,
  text: String,
  content: String,
  image: String,
  read: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true })

mongoose.model("Notify", notifySchema)