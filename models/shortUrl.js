const mongoose = require("mongoose");
// const shortid = require("shortid");
const schema = new mongoose.Schema({
  emailList: {
    type: String,
    required: true,
  },
  // short: {
  //   type: String,
  //   required: true,
  //   default: shortid.generate,
  // },
  // clicks: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
});
module.exports = mongoose.model("emailList", schema);
