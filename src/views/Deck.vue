<template>
    <NavBar />
    <h2>Deck Title</h2>
    <DeckViewer :flashcard="currentDeck" />
</template>

<script>
import { Databases } from 'appwrite';
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import DeckViewer from '../components/DeckViewer.vue';
import { client, ID} from '../composables/auth';

export default {
    components: { NavBar, DeckViewer },
    setup() {

        const currentDeck = ref('')
        currentDeck.value = JSON.parse('{ \"front\":\"question\", \"back\":\"answer\" }')
        
        // const databases = new Databases(client)

        // const promise = databases.createDocument(
        //     '63ebf3afddae21e5a119',
        //     '63ebf3de54f3e0e0991c',
        //     ID.unique(),
        //     {
        //     }
        // )

        // promise.then(function (response) {
        //     console.log(response)
        // }, function (error) {
        //     console.log(error)
        // })

        return {
            currentDeck
        }
    }
}
</script>

<style>
    
</style>