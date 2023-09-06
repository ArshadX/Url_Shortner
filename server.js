const express = require("express");
const app = express();
// const mongoose = require("mongoose");

// const emailList = require("./models/shortUrl");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/test")
//   .then(() => {
//     console.log("connected");
//   })
//   .catch((err) => console.log(err));
const emailList = [];
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  // const emailList = await emailList.find();
  res.render("index", { shortUrl: emailList });
});

app.post("/email=:email", async (req, res) => {
  // console.log(req.body.fullUrl);
  // await ShortUrl.create({ full: req.body.fullUrl });
  if (typeof req.params.email === "string") {
    emailList.push(req.params.email);
    res.status(200).send("succesfull");
  } else {
    res.status(404).send("must be string");
  }
});
app.get("/emailList", async (req, res) => {
  // const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  // if (shortUrl == null) return res.sendStatus(404);
  // shortUrl.clicks++;
  // shortUrl.save();
  emailList.length === 0 ? res.status(200).send("List is empty") : res.status(200).send(emailList);
});
app.listen(process.env.WEB_CONCURRENCY || 3000);
