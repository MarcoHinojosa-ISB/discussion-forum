var query = require("../pg-connect.js").query;
var auth = require("./auth.js");
var profiles = require("./profiles.js");

function retrieveTopics(data, callback){
  query("SELECT topics.id, users.username, topics.title, topics.last_updated, COUNT(posts.id) as post_num " +
  "FROM topics, users, posts WHERE topics.category=$1 AND users.id=topics.user_id AND posts.topic_id=topics.id " +
  "GROUP BY topics.id, users.username, topics.title, topics.last_updated ORDER BY topics.last_updated", [data], function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

function createTopic(data, callback){
  auth.retrieveUser(data.username, function(err, result){
    if(err)
      callback(err, null);
    else{
      var user_id = result.rows[0].id;

      query("INSERT INTO topics (user_id, title, category) VALUES ($1, $2, $3) returning id",
      [user_id, data.title, data.category], function(err, result){
        if(err)
          callback(err, null);
        else{
          query("INSERT INTO posts (user_id, topic_id, message) VALUES ($1, $2, $3)", [user_id, result.rows[0].id, data.message], function(err, result){
            err ? callback(err, null) : callback(null, result);
          })
        }
      })
    }
  })
}

function updateTopic(id, callback){
  query("UPDATE topics SET last_updated = now() where id=$1", [id], function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

module.exports = {
  createTopic: createTopic,
  retrieveTopics: retrieveTopics,
  updateTopic: updateTopic
}
