var router = require("express").Router();
var topics = require("../queries/topics.js");

router.get("/retrieve-topics", function(req, res){
  topics.retrieveTopics(req.query.category, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(result);
  })
})
router.post("/create-topic", function(req, res){
  topics.createTopic(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send("ok");
  })
})

module.exports = {
  routes: router
}
