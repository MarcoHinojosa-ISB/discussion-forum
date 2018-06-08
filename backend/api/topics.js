var router = require("express").Router();
var topics = require("../queries/topics.js");

router.post("/create-topic", function(req, res){
  topics.createTopic(req.body, function(err){
    err ? res.status(500).send(err) : res.status(200).send("ok");
  })
})
router.get("/retrieve-topics", function(req, res){
  topics.retrieveTopics(req.query.category, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(result);
  })
})
router.get("/retrieve-posts", function(req, res){
  topics.retrievePosts(req.query.topic_id, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(result);
  })
})
router.post("/new-post", function(req, res){
  topics.newPost(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send("ok");
  })
})
module.exports = {
  routes: router
}
