<!-- view -->
<template>
  <div>
    <App-Header />

    <div id="register">
      <h2>Registration</h2>
      <form v-on:submit="handleSubmit">
        <input type="text" maxLength="12" placeholder="first name" v-model="registerInput.firstname"/>
        <div class="error">{{registerErrors.firstname}}</div>
        <input type="text" maxLength="12" placeholder="last name" v-model="registerInput.lastname"/>
        <div class="error">{{registerErrors.lastname}}</div>
        <input type="text" maxLength="12" placeholder="username" v-model="registerInput.username"/>
        <div class="error">{{registerErrors.username}}</div>
        <input type="password" maxLength="16" placeholder="password" v-model="registerInput.password"/>
        <div class="error">{{registerErrors.password}}</div>
        <div class="error">{{serverError}}</div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Header from "../partials/Header.vue";
  import Axios from "axios";
  import store from "../../store/index.js";
  import {loggedIn} from '../../store/actions/userActions.js';

  export default {
    components: {
      "App-Header": Header
    },
    data: function(){
      return {
        registerInput: {
          firstname: "",
          lastname: "",
          username: "",
          password: ""
        },
        registerErrors: {
          firstname: "",
          lastname: "",
          username: "",
          password: ""
        },
        serverError: ""
      }
    },
    methods: {
      handleSubmit: function(e){
        e.preventDefault();

        this.registerErrors.firstname = "";
        this.registerErrors.lastname = "";
        this.registerErrors.username = "";
        this.registerErrors.password = "";
        this.serverError = "";

        if(!this.checkInputErrors()){
          Axios.post("/api/auth/register", this.registerInput)
          .then((result) => {
            store.dispatch(loggedIn(this.registerInput.username, this.registerInput.firstname, this.registerInput.lastname));
            this.$router.push({ path: '/' });
          })
          .catch((err) => {
            if(err.response.data === "Username already exists")
              this.registerErrors.username = err.response.data;
            else
              this.serverError = err.response.data;
          });
        }
      },
      checkInputErrors: function(){
        if(!this.registerInput.firstname)
          this.registerErrors.firstname = "First name cannot be empty";
        else
          this.registerErrors.firstname = "";

        if(!this.registerInput.lastname)
          this.registerErrors.lastname = "Last name cannot be empty";
        else
          this.registerErrors.lastname = "";

        if(!this.registerInput.username)
          this.registerErrors.username = "Username cannot be empty";
        else
          this.registerErrors.username = "";

        if(!this.registerInput.password)
          this.registerErrors.password = "Password cannot be empty";
        else if(!this.registerInput.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/))
          this.registerErrors.password = "Password must contain at least 1 letter, 1 number, and 6 characters long";
        else
          this.registerErrors.password = "";

        if(!this.registerErrors.firstname && !this.registerErrors.lastname && !this.registerErrors.username && !this.registerErrors.password)
          return false;
        else
          return true;
      }
    }
  }
</script>
