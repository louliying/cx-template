<template>
  <div style="height:3rem">
       <router-link to="/">返回</router-link>
 <mt-swipe :auto="3000" :speed="300">
  <mt-swipe-item>
      <div style="height:100%;background-color:red"></div>
  </mt-swipe-item>
  <mt-swipe-item>
      <div style="height:100%;background-color:blue"></div></mt-swipe-item>
  <mt-swipe-item>
      <div style="height:100%;background-color:yellow"></div></mt-swipe-item>
</mt-swipe>
  </div>
</template>

<script>

export default {
  name: 'List',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  created () {

  },
  mounted () {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
