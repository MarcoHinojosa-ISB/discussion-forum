<!-- view -->
<template>
  <div id="register">
    <h2>Registration</h2>
    <form v-on:submit="handleSubmit">
      <input type="text" maxLength="12" placeholder="first name" v-model="registerInput.firstname"/>
      <div class="error">{{inputError.firstname}}</div>
      <input type="text" maxLength="12" placeholder="last name" v-model="registerInput.lastname"/>
      <div class="error">{{inputError.lastname}}</div>
      <input type="text" maxLength="12" placeholder="username" v-model="registerInput.username"/>
      <div class="error">{{inputError.username}}</div>
      <input type="password" maxLength="16" placeholder="password" v-model="registerInput.password"/>
      <div class="error">{{inputError.password}}</div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<!-- controller -->
<script>
  import Axios from "axios";

  export default {
    data: function(){
      return {
        registerInput: {
          firstname: "",
          lastname: "",
          username: "",
          password: ""
        },
        inputError: {
          firstname: "",
          lastname: "",
          username: "",
          password: ""
        }
      }
    },
    methods: {
      handleSubmit: function(e){
        e.preventDefault();
        console.log(this.checkInputErrors());
        // Axios.post("/api/auth/register", registerInput)
        // .then(function(result){
        //   console.log(result);
        // })
        // .catch(function(err){
        //   console.log(err);
        // })
        return false;
      },
      checkInputErrors: function(){
        if(!this.registerInput.firstname)
          this.inputError.firstname = "First name cannot be empty";
        else
          this.inputError.firstname = "";

        if(!this.registerInput.lastname)
          this.inputError.lastname = "Last name cannot be empty";
        else
          this.inputError.lastname = "";

        if(!this.registerInput.username)
          this.inputError.username = "username cannot be empty";
        else
          this.inputError.username = "";

        if(!this.registerInput.password)
          this.inputError.password = "password cannot be empty";
        else if(!this.registerInput.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/))
          this.inputError.password = "password must contain at least 1 letter, 1 number, and 6 characters long";
        else
          this.inputError.password = "";

        if(!this.inputError.firstname && !this.inputError.lastname && !this.inputError.username && !this.inputError.password)
          return false;
        else
          return true;
      }
    }
  }
</script>
