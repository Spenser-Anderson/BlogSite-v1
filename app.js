//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Blog variables

let blogContent = [];

//Get Routes

app.get("/", function(req, res){
  res.render("home", {startingContent: homeStartingContent, blogPosts: blogContent});
  // res.render('home', {key: value}); key is the variable created in the home page. 
  // value is the variable created on this page to fill that key/variable's definition. 
});


app.get("/about", function(req, res){
  res.render("about", {abtContent: aboutContent});
});


app.get("/contact", function(req, res){
  res.render("contact", {ctcContent: contactContent});
});


app.get("/compose", function(req, res){
  res.render("compose");
});

//Dynamic blog page creation
app.get("/posts/:postID", function(req, res){
  
  const reqPostID = _.lowerCase(req.params.postID);

  //console.log(reqPostID);

  blogContent.forEach(function(post){
    const postID = _.lowerCase(post.title);

    var title = post.title;
    var content = post.content;

    if (postID === reqPostID){
      console.log("Found a matching post!");
      res.render("post", {postsTitle: title, postsContent: content});
    }
  });

});


//Post route
app.post("/compose", function(req, res){
   const newPost = {
    title : req.body.newPostTitle,
    content : req.body.newPostContent
  }; //creating my own object using the users inputs

  blogContent.push(newPost);
  //pushing that content into a global variable
    res.redirect("/");
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
