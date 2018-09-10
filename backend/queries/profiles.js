var query = require("../pg-connect.js").query;

function createProfile(data, callback){
  query("INSERT INTO profiles (user_id) VALUES ($1)", data, function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

function retrieveProfile(data, callback){
  query("SELECT * FROM profiles WHERE user_id = $1", data, function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}

module.exports = {
  createProfile: createProfile,
  retrieveProfile: retrieveProfile
}
