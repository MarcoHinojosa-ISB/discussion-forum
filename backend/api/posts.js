var router = require("express").Router();
var posts = require("../queries/posts.js");

router.get("/retrieve-posts", function(req, res){
  posts.retrievePosts(req.query.topic_id, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send(result);
  })
})
router.post("/new-post", function(req, res){
  posts.newPost(req.body, function(err, result){
    err ? res.status(500).send(err) : res.status(200).send("ok");
  })
})

module.exports = {
  routes: router
}
