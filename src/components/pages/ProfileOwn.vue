<!-- View -->
<template>
  <div>
    <App-Header />
    
    <div id="profile">
      <h1>Work in progress</h1>
      <h2>{{postCount}}</h2>
    </div>
  </div>
</template>

<!-- Controller -->
<script>
  import Header from "../partials/Header.vue";
  import Axios from "axios";
  import store from "../../store/index.js";
  import jwt from "jsonwebtoken";
  import jwtsecret from "../../../jwtsecret.js";

  export default {
    components: {
      "App-Header": Header
    },
    data: function(){
      return {
        username: "",
        firstName: "",
        lastName: "",
        bio: "",
        quote: "",
        postCount: 0,
        dateCreated: ""
      }
    },
    created: function(){
      try{
        var userdata = jwt.verify(store.getState().user.authToken, jwtsecret.secret);

          console.log("hello")
        this.updatePage(userdata.username);
      }
      catch(err){}
    },
    methods: {
      updatePage: function(username){
        Axios.get("/api/auth/retrieve-user?username="+username)
        .then(result => {

          this.username = result.data.rows[0].username;
          this.firstName = result.data.rows[0].firstname;
          this.lastName = result.data.rows[0].lastname;

          Axios.get("/api/profiles/retrieve-profile?user_id="+result.data.rows[0].id)
          .then(result => {
            console.log(result.data.rows[0])
            this.bio = result.data.rows[0].bio;
            this.quote = result.data.rows[0].quote;
            this.postCount = result.data.rows[0].post_count;
            this.date_created = result.data.rows[0].date_created;
          })
          .catch(err => {
            console.log(err);
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
