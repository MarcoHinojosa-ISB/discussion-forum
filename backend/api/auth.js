var router = require("express").Router();
var auth = require("../queries/auth.js");

router.post("/register", function(req, res){
  auth.register(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("ok");
  })
})
router.post("/login", function(req, res){
  auth.login(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(result.rows[0]);
  })
})

module.exports = {
  routes: router
}
