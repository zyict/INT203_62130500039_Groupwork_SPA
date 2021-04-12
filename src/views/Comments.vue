<template>
  <div class="about">
    <h1>This is a Comment page.</h1>
    <add-comment/>
  </div>
</template>

<script>
import AddComment from '../components/AddComment.vue'

export default {
  name: 'Comments',
  components:{
    AddComment
  }
}
</script>
