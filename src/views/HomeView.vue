<template>
  <NavBar />
  <div class="home">
    <h1>Home</h1>

  </div>
</template>

<script>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import { Client, Functions } from "appwrite";
import { client } from '../composables/auth';

export default {
  components: { NavBar },
  
  name: 'Home'

}
</script>

<style>
</style>
