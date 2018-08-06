<!-- view -->
<template>
  <div>
    <App-Header />

    <div id="topic-list">
      <h3>{{category.toUpperCase()[0] + category.slice(1)}}</h3>

      <ul class="breadcrumbs">
        <li><router-link to="/">Home &#9656;</router-link></li>
        <li><span>{{category.toUpperCase()[0] + category.slice(1)}}</span></li>
      </ul>
      <table>
        <thead>
          <tr class="topic-head">
            <th class="topic">Topic</th>
            <th class="creator">Creator</th>
            <th class="posts">Posts</th>
            <th class="date">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr class="topic-panel" v-for="t in topics">
            <td class="topic">
              <router-link :to="'/cat/' + category + '/' + t.id + '/' + t.title">{{t.title}}</router-link>
            </td>
            <td class="creator">{{t.username}}</td>
            <td class="posts">{{t.post_num}}</td>
            <td class="date">{{transformDate(t.last_updated)}}</td>
          </tr>
          <tr class="topic-panel" v-if="topics.length === 0">
            <td style="font-size: 12px;">No topics available</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <router-link :to="'/cat/' + category + '/create'" class="new-topic-btn">New Topic</router-link>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Header from "../partials/Header.vue";
  import Axios from "axios";
  import Moment from "moment";

  export default {
    components: {
      "App-Header": Header
    },
    data: function(){
      return {
        category: this.$route.params.category,
        topics: []
      }
    },
    created: function(){
      Axios.get("/api/topics/retrieve-topics?category="+this.category)
      .then( result => {
        this.topics = result.data.rows;
      })
     .catch( err => {
       console.log(err);
      })
    },
    methods: {
      transformDate: function(d){
        return Moment(new Date(d), 'MM-DD-YYYY hh:mm a').format('MM/DD/YYYY hh:mm a');
      }
    }
  }
</script>
