<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
  </div>
</template>
<script>
import axios from 'axios';
export default {
  async mounted() {
    if(sessionStorage.getItem('data')) return;
    const res = await axios.get('/');
    sessionStorage.setItem('data', JSON.stringify(res.data)) 
  }
};
</script>
