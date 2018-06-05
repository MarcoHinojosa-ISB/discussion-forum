function loggedIn(username, firstname, lastname){
  return {
    type: "LOGGED_IN",
    username,
    firstname,
    lastname
  }
}

function loggedOut(){
  return {
    type: "LOGGED_OUT"
  }
}


module.exports = {
  loggedIn,
  loggedOut
}
