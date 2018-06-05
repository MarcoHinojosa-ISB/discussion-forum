var query = require("../pg-connect.js").query;
var bcrypt = require("bcrypt");

function register(data, callback){
  checkExistingUsernames(data.username, function(err, result){
    if(err)
      callback("Server error");
    else if(result.rows.length > 0)
      callback("Username already exists");
    else{
      bcrypt.hash(data.password, 10, function(err, hash){
        if(err)
          callback("Server error");
        else{
          query("INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
          [data.firstname, data.lastname, data.username, hash], function(err, result){
            err ? callback(err) : callback(null);
          })
        }
      })
    }
  })
}
function login(data, callback){
  checkExistingUsernames(data.username, function(err, result){
    if(err)
      callback("Server error", null);
    else if(result.rows.length === 0)
      callback("Username does not exist", null);
    else{
      bcrypt.compare(data.password, result.rows[0].password, function(err, isPasswordMatch){
        if(err)
          callback("Server error", null);
        else if(!isPasswordMatch)
          callback("Password is invalid", null);
        else
          callback(null, result);
      })
    }
  });
}
function checkExistingUsernames(username, callback){
  query("SELECT * FROM users WHERE username = $1", [username], function(err, result){
    err ? callback(err, null) : callback(null, result);
  })
}


module.exports = {
  register: register,
  login: login
};
