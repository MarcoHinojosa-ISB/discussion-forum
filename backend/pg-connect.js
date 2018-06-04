require("dotenv").config();

var pg = require("pg");
var dbString = process.env.DATABASE_URL;
pg.defaults.poolIdle = 5000;

module.exports = {
  query: function(qString, qParams, callback){
    pg.connect(dbString, function(err, client, done){
      if(err){
        callback(err, null);
        console.log(err);
        console.log("Connection Error");
      }
      else{
        client.query(qString, qParams ? qParams : [], function(err, result){
          done();
          if(err){
            callback(err, null);
            console.log("Query Error");
          }
          else{
            callback(null, result);
          }
        })
      }
    })
  }
}
