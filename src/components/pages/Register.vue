<!-- view -->
<template>
  <div>
    <App-Header />

    <div id="register">
      <h2>Registration</h2>
      <form v-on:submit="handleSubmit">
        <input type="text" maxLength="12" placeholder="First name" v-model="registerInput.firstname"/>
        <div class="error">{{registerErrors.firstname}}</div>
        <input type="text" maxLength="12" placeholder="Last name" v-model="registerInput.lastname"/>
        <div class="error">{{registerErrors.lastname}}</div>
        <input type="text" maxLength="12" placeholder="Username" v-model="registerInput.username"/>
        <div class="error">{{registerErrors.username}}</div>
        <input type="password" maxLength="16" placeholder="Password" v-model="registerInput.password"/>
        <div class="error">{{registerErrors.password}}</div>
        <div class="error">{{serverError}}</div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Axios from "axios";
  import store from "../../store/index.js";
  import {loggedIn} from '../../store/actions/userActions.js';
  import Header from "../partials/Header.vue";

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

        Axios.post("/api/auth/register", this.registerInput)
        .then(result => {
          store.dispatch(loggedIn(result.data));
          this.$router.push({ path: '/' });
        })
        .catch(err => {
          if(err.response.data.type === "validation"){
            switch(err.response.data.text.split('"')[1]){
              case "firstname":
                this.registerErrors.firstname = "First Name" + err.response.data.text.split('"')[2];
                break;
              case "lastname":
                this.registerErrors.lastname = "Last Name" + err.response.data.text.split('"')[2];
                break;
              case "username":
                this.registerErrors.username = "Username" + err.response.data.text.split('"')[2];
                break;
              case "password":
                this.registerErrors.password = "Password must be alphanumeric and between 6-20 characters";
                break;
            }
          }
          else if(err.response.data.type === "server"){
            this.serverError = err.response.data.text;
          }
        });
      }
    }
  }
</script>
