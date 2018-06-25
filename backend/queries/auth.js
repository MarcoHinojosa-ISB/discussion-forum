var query = require("../pg-connect.js").query;
var bcrypt = require("bcryptjs");
var joi = require("joi");

var userValidateSchema = joi.object().keys({
  firstname: joi.string().alphanum().min(3).max(16).required(),
  lastname: joi.string().alphanum().min(3).max(16).required(),
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{6,20}$/)
})

function register(data, callback){
  var validation = joi.validate(data, userValidateSchema);

  if(validation.error){
    callback({type: "validation", text: validation.error.details[0].message});
  }
  else{
    checkExistingUsernames(data.username, function(err, result){
      if(err)
        callback({type: "server", text: "Server error"});
      else if(result.rows.length > 0)
        callback({type: "validation", text: '"username" already exists'});
      else{
        bcrypt.hash(data.password, 10, function(err, hash){
          if(err)
            callback({type: "server", text: "Server error"});
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
}
function login(data, callback){
  checkExistingUsernames(data.username, function(err, result){
    if(err)
      callback("Server error");
    else if(result.rows.length === 0)
      callback("username does not exist");
    else{
      bcrypt.compare(data.password, result.rows[0].password, function(err, isPasswordMatch){
        if(err)
          callback("Server error");
        else if(!isPasswordMatch)
          callback("Password is invalid");
        else
          callback(null);
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
  login: login,
  checkExistingUsernames: checkExistingUsernames
};
