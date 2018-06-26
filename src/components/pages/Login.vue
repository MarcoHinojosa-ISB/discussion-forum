<!-- view -->
<template>
  <div>
    <App-Header />

    <div id="login">
      <h2>Login</h2>
      <form v-on:submit="handleSubmit">
        <input type="text" placeholder="username" v-model="loginInput.username"/>
        <div class="error">{{ loginErrors.username }}</div>
        <input type="password" placeholder="password" v-model="loginInput.password"/>
        <div class="error">{{ loginErrors.password }}</div>
        <div class="error">{{ serverError }}</div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Header from "../partials/Header.vue";
  import Axios from "axios";
  import jwt from "jsonwebtoken";
  import jwtsecret from "../../../jwtsecret.js";
  import store from "../../store/index.js";
  import {loggedIn} from '../../store/actions/userActions.js';


  export default {
    components: {
      "App-Header": Header
    },
    data: function(){
      return {
        loginInput: {
          username: "",
          password: ""
        },
        loginErrors: {
          username: "",
          password: ""
        },
        serverError: ""
      }
    },
    created: function(){
      console.log("hello")
      try{
        var userdata = jwt.verify(store.getState().user.authToken, jwtsecret.secret);
      }
      catch(err){
        //no need to handle error
        return;
      }
      if(userdata){
        this.$router.push("/");
      }
    },
    methods: {
      handleSubmit: function(e){
        e.preventDefault();

        this.loginErrors.username = "";
        this.loginErrors.password = "";
        this.serverError = "";

        Axios.post("/api/auth/login", this.loginInput)
        .then( result => {
          store.dispatch(loggedIn(result.data));
          this.$router.push({ path: '/' });
        })
        .catch( err =>{
          if(err.response.data === "Username does not exist")
            this.loginErrors.username = err.response.data;
          else if(err.response.data === "Password is invalid")
            this.loginErrors.password = err.response.data;
          else
            this.serverError = err.response.data;
        })
      }
    }
  }
</script>
