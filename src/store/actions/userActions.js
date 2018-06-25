function loggedIn(authToken){
  return {
    type: "LOGGED_IN",
    authToken
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
