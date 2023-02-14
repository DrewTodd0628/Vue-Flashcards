<template>
  <NavBar />
  <div class="home">
    <h1>Home</h1>

  </div>
</template>

<script>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';

export default {
  components: { NavBar },
  
  name: 'Home',
  setup() {

  }

}
</script>

<style>
</style>
