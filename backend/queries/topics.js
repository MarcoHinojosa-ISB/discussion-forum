var query = require("../pg-connect.js").query;
var auth = require("./auth.js");

// store new topic and post data to database
function createTopic(data, callback){
  auth.checkExistingUsernames(data.username, function(err, result){
    if(err)
      callback(err);
    else{
      var user_id = result.rows[0].id;

      query("INSERT INTO topics (user_id, title, category) VALUES ($1, $2, $3) returning id",
      [user_id, data.title, data.category], function(err, result){
        if(err)
          callback(err);
        else{
          createPost([user_id, result.rows[0].id, data.message], function(err, result){
            err ? callback(err) : callback(null);
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

function retrieveTopics(data, callback){
  query("SELECT topics.id, users.username, topics.title, topics.last_updated, COUNT(posts.id) as post_num " +
  "FROM topics, users, posts WHERE topics.category=$1 AND users.id=topics.user_id AND posts.topic_id=topics.id " +
  "GROUP BY topics.id, users.username, topics.title, topics.last_updated ORDER BY topics.last_updated", [data], function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}
function retrievePosts(data, callback){
  query("SELECT posts.message, posts.date_created, users.username FROM posts, users WHERE posts.topic_id=$1 " +
  "AND posts.user_id=users.id GROUP BY posts.message, posts.date_created, users.username ORDER BY posts.date_created",
  [data], function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

function updateTopic(id, callback){
  query("UPDATE topics SET last_updated = now() where id=$1", [id], function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}
function newPost(data, callback){
  auth.checkExistingUsernames(data.username, function(err, result){
    if(err)
      callback(err);
    else{
      var user_id = result.rows[0].id;

      createPost([user_id, data.topic_id, data.message], function(err, result){
        if(err)
          callback(err);
        else{
          updateTopic(data.topic_id, function(err, result){
            err ? callback(err, null) : callback(null, err);
          })
        }
      })
    }
  })
}

module.exports = {
  createTopic: createTopic,
  retrieveTopics: retrieveTopics,
  retrievePosts: retrievePosts,
  newPost: newPost
}
