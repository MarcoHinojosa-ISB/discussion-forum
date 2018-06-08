<!-- view -->
<template>
  <div>
    <App-Header />

    <div id="topic-create">
      <h3>Create a new topic about {{category}}</h3>
      <form v-on:submit="handleSubmit">
        <input type="text" maxLength="80" placeholder="Topic Title" class="title" v-model="formInput.title" required/>
        <textarea placeholder="Opening Post" class="post" v-model="formInput.message" required></textarea>
        <button type="submit" class="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Header from "../partials/Header.vue";
  import store from "../../store/index.js";
  import Axios from "axios";

  export default {
    components: {
      "App-Header": Header
    },
    data: function(){
      return {
        category: this.$route.params.category.toUpperCase()[0] + this.$route.params.category.slice(1),
        formInput: {
          title: "",
          message: ""
        }
      }
    },
    created: function(){
      if(!store.getState().user.username)
        this.$router.push("/login");
    },
    methods: {
      handleSubmit: function(e){
        e.preventDefault();

        var data = {
          title: this.formInput.title,
          message: this.formInput.message,
          category: this.$route.params.category,
          username: store.getState().user.username
        }

        Axios.post("/api/topics/create-topic", data)
        .then(result => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
