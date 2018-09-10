var router = require("express").Router();
var profiles = require("../queries/profiles.js");

router.get("/retrieve-profile", function(req, res){
  profiles.retrieveProfile([req.query.user_id], function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(result);
  })
})
module.exports = {
  routes: router
}
