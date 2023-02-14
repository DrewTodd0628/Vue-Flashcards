<template>
    <NavBar />
    <div>My Decks</div>
</template>

<script>
import { Databases } from 'appwrite';
import NavBar from '../components/NavBar.vue';
import { client } from '../composables/auth';

export default {
    components: { NavBar },
    setup() {

    }
}
</script>

<style>
    
</style>