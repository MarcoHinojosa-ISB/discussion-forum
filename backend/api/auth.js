var router = require("express").Router();
var auth = require("../queries/auth.js");
var jwt = require("jsonwebtoken");
var jwtsecret = require("../../jwtsecret.js");

router.get("/retrieve-user", function(req, res){
  auth.retrieveUser(req.query.username, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(result);
  })
})
router.post("/register", function(req, res){
  auth.register(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(generateToken(req.body));
  })
})
router.post("/login", function(req, res){
  auth.login(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(generateToken(req.body));
  })
})

// generate session token
function generateToken(data){
  var user = {
    username: data.username
  }

  return jwt.sign(user, jwtsecret.secret);
}

module.exports = {
  routes: router
}
