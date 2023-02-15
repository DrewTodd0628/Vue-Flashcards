<template>
    <NavBar />
    <h2>My Decks</h2>

    <div class="collection">
        <div class="deck" v-for="deck in decks" :key="deck">
            <DeckLink :deck="deck"/>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import DeckLink from '../components/DeckLink.vue';

export default {
    components: { NavBar, DeckLink },
    
    setup() {
        const decks = ref('')
        decks.value = JSON.parse('[         {             "title": "Countries",              "flashcards": [                 {                     "front": "Big Ben",                      "back": "UK"                  }             ]         },          {             "title": "Foods",             "flashcards": [                 {                     "front": "Fried Cake",                     "back": "Funnel Cakes"                  },                   {                  "front": "Baked custard with caramel",                  "back": "Flan"                  }             ]         } ]')
   console.log(decks.value)

        return {
            decks
        }
    }
}
</script>

<style scoped>
    .collection {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .deck {
        margin-right: 2em;
    }
</style>