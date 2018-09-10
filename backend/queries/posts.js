var query = require("../pg-connect.js").query;
var auth = require("./auth.js");
var topics = require("./topics.js");

function retrievePosts(data, callback){
  query("SELECT posts.message, posts.date_created, users.username FROM posts, users WHERE posts.topic_id=$1 " +
  "AND posts.user_id=users.id GROUP BY posts.message, posts.date_created, users.username ORDER BY posts.date_created",
  [data], function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

function newPost(data, callback){
  auth.retrieveUser(data.username, function(err, result){
    if(err)
      callback(err, null);
    else{
      createPost([result.rows[0].id, data.topic_id, data.message], function(err, result){
        if(err)
          callback(err, null);
        else{
          topics.updateTopic(data.topic_id, function(err, result){
            err ? callback(err, null) : callback(null, result);
          })
        }
      })
    }
  })
}

function createPost(data, callback){
  query("INSERT INTO posts (user_id, topic_id, message) VALUES ($1, $2, $3)", data, function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

module.exports = {
  retrievePosts: retrievePosts,
  newPost: newPost,
  createPost: createPost
}
