var router = require("express").Router();
var auth = require("../queries/auth.js");
var jwt = require("jsonwebtoken");
var jwtsecret = require("../../jwtsecret.js");

router.post("/register", function(req, res){
  auth.register(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send(generateToken(req.body));
  })
})
router.post("/login", function(req, res){
  auth.login(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send(generateToken(req.body));
  })
})

// generate session token
function generateToken(data){
  var user = {
    username: data.username,
    firstname: data.firstname,
    lastname: data.lastname
  }

  return jwt.sign(user, jwtsecret.secret);
}

module.exports = {
  routes: router
}
