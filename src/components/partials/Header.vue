<!-- view -->
<template>
  <div id="header">
    <h1 v-on:click="redirectToHome">Discussion</h1>

    <ul v-if="!isUserLoggedIn()">
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
    </ul>
    <ul v-else>
      <li><span class="username">{{username}}</span></li>
      <li><button v-on:click="logout">Logout</button></li>
    </ul>
  </div>
</template>

<!-- controller -->
<script>
  import store from "../../store/index.js";
  import {loggedOut} from "../../store/actions/userActions.js";
  import jwt from "jsonwebtoken";
  import jwtsecret from "../../../jwtsecret.js";

  export default {
    data: function(){
      return {
        username: ""
      }
    },
    methods: {
      redirectToHome: function(){
        this.$router.push({ path: "/" });
      },
      isUserLoggedIn: function(){
        try{
          var userdata = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
        }
        catch(err){
          return false;
        }

        this.username = userdata.username;
        return true; 
      },
      logout: function(){
        store.dispatch(loggedOut());
        this.username = "";
        this.$router.push({ path: "/" })
      }
    }
  }
</script>
