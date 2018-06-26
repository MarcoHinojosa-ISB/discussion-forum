<!-- view -->
<template>
  <div>
    <div id="post">
      <div class="header">
        <span class="username">{{postData.username}}</span>
        <span class="date">{{transformDate(postData.date_created)}}</span>
      </div>
      <div class="message">
        <pre v-html="postData.message"></pre>
      </div>
    </div>
  </div>
</template>

<!-- controller -->
<script>
  import Moment from "moment";

  export default {
    props: {
      postData: Object,
      index: Number
    },
    data: function(){
      return {}
    },
    methods: {
      transformDate: function(d){
        return Moment(new Date(d), 'MM-DD-YYYY hh:mm a').format('MM/DD/YYYY hh:mm a');
      }
    }
  }
</script>
