const express = require("express");
const app = express();
const mongoose = require("mongoose");

const ShortUrl = require("./models/shortUrl");

mongoose.connect("mongodb://127.0.0.1:27017/test").then(
  () => {
    console.log("connected");
  },
  (err) => {
    console.log(err);
  }
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  const shortUrl = await ShortUrl.find();
  res.render("index", { shortUrl: shortUrl });
});

app.post("/shortUrls", async (req, res) => {
  console.log(req.body.fullUrl);
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});
app.listen(process.env.WEB_CONCURRENCY || 3000);
