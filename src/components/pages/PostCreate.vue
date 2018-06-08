<!-- view -->
<template>
  <div>
    <App-Header />

    <div id="post-create">
      <h3>{{topicTitle}}</h3>
      <form v-on:submit="handleSubmit">
        <textarea placeholder="Chime in your thoughts on this topic" class="post" v-model="message" required></textarea>
        <button type="submit" class="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Header from "../partials/Header.vue";
  import Axios from "axios";
  import store from "../../store/index.js";

  export default {
    components: {
      "App-Header": Header
    },
    data: function(){
      return {
        topicId: this.$route.params.topic_id,
        topicTitle: this.$route.params.topic_title,
        message: ""
      }
    },
    methods: {
      handleSubmit: function(e){
        e.preventDefault();
        var data = {
          topic_id: this.topicId,
          message: this.message,
          username: store.getState().user.username
        }

        Axios.post("/api/topics/new-post", data)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
