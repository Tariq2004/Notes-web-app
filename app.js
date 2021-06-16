const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const home = "This is a website to write your notes"
const features = "It is so eazy to use , and so fast while using"
let posts = [];



app.get("/",function(req,res){
  res.render("home", {homeContent: home, posts: posts})
});

app.get("/about", function(req,res){
  res.render("about", {features: features})
});

app.get("/contact", function(req,res){
  res.render("contact")
});

app.get("/posts/:anything",function(req,res){
  const params = _.lowerCase(req.params.anything);
  posts.forEach(function(post){
      const secret = _.lowerCase(post.adress)
      if(secret === params){
        res.render("posts",{postAdress: post.adress, postArticle: post.article})
      }
  });
});

app.get("/publish",function(req,res){
  res.render("publish")
});

app.post("/publish", function(req,res){
  const post = {
    adress:  req.body.title,
    article: req.body.post
  }
  posts.push(post)
  res.redirect("/")
})

app.post("/home",function(req,res){
  const clear = req.body.remove;
  if(clear === "clear"){
    posts = [];
  };
  res.redirect("/");
});





app.listen(3000, function(req,res){
  console.log("The server is running on port 3000");
})
