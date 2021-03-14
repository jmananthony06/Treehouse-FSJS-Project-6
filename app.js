const express = require("express"); //getting express from node modules folder
const pug = require("pug"); // getting pug from node modules folder
const data = require("./data.json"); // getting json info from file made
const app = express(); // making the library a function that spits pout servers - calling the server "app"
const port = 3000; // localhost server
// app.set('views', __dirname + '/public/views');
app.set("view engine", "pug"); // how we render our files with pug library
app.use(express.static("public")); // serves public files (available for everyone to access)

// function requesting and responding with specified rendered index.pug info
app.get("/", function (req, res) { 
  res.render("index", data);
});
// function requesting and responding with specified rendered about pug file info
app.get("/about", function (req, res) {
  res.render("about", data);
});
// function requesting and responding with specified rendered projects pug file info in addition to :id which is absolutely anything the user types. The relation between the projects file and what the user input is. 
app.get("/projects/:id", function (req, res) {
  let id = req.params.id;
  let project = data.Projects[id];
  if(project) {
    res.render("project", project);
  } else {
    res.redirect("/404");
  }
});

// test to see what 500 looks like but don't actually have a 500 error that occurs - represents something going wrong with a file(s)
app.get("/500", function (req, res) {
  let err = new Error();
  err.status = 500;
  err.message = "The server has encountered an error";
  res.render("page-not-found", err);
  console.log("The page you requested cannot be found", err);
});

// * is a wildcard - if the user put in a route or url that isn't familiar, do something else instead
app.get("*", function (req, res) {
  let err = new Error();
  err.status = 404;
  err.message = "The page you requested cannot be found at this time";
  res.render("page-not-found", err);
  console.log("The page you requested cannot be found", err);
});

// this tells the port to listen to the url bar - awaiting user input 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
