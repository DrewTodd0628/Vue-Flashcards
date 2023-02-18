<template>
    <NavBar />
    <h2>{{ title }}</h2>
    <div class="main">
        <div class="arrowBtn arrowBtnLocked" @click="moveBack" ref="backBtn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path></svg>
        </div>

        <CardViewer :question="question" :answer="answer" />

        <div class="arrowBtn arrowBtnUsable" @click="moveForward" ref="forwardBtn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M284.9 412.6l138.1-134c6-5.8 9-13.7 9-22.4v-.4c0-8.7-3-16.6-9-22.4l-138.1-134c-12-12.5-31.3-12.5-43.2 0-11.9 12.5-11.9 32.7 0 45.2l83 79.4h-214c-17 0-30.7 14.3-30.7 32 0 18 13.7 32 30.6 32h214l-83 79.4c-11.9 12.5-11.9 32.7 0 45.2 12 12.5 31.3 12.5 43.3 0z"></path></svg>
        </div>
    </div>
</template>

<script>
import { Databases } from 'appwrite';
import { ref, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue';
import CardViewer from '../components/CardViewer.vue';
import { client, ID} from '../composables/auth';
import { useRoute } from "vue-router";
import decksFile from '../composables/data.json';

export default {
    props:['id'],
    components: { NavBar, CardViewer },
    setup() {
        const currentDeck = ref('')
        const route = useRoute();
        const deckIndex = route.params.id;
        currentDeck.value = decksFile[deckIndex]
        const title = ref(currentDeck.value["title"])
        const cardIndex = ref(0)
        const currentCards = currentDeck.value["flashcards"]
        const question = ref(currentCards[0]["front"])
        const answer = ref(currentCards[0]["back"])
        const backBtn = ref(null)
        const forwardBtn = ref(null)

        const getCard = () => {
            question.value = currentCards[cardIndex.value]["front"]
            answer.value = currentCards[cardIndex.value]["back"] 
            console.log(question.value)
            console.log(answer.value)
        }

        const updateButtons = () => {
            if (cardIndex.value < currentCards.length - 1) {
                forwardBtn.value.className = "arrowBtn arrowBtnUsable"
            } else {
                forwardBtn.value.className = "arrowBtn arrowBtnLocked"
            }

            if (cardIndex.value > 0) {
                backBtn.value.className = "arrowBtn arrowBtnUsable"
            } else {
                backBtn.value.className = "arrowBtn arrowBtnLocked"
            }
        }

        onMounted(() => {
            updateButtons()
        })

        const moveBack = () => {
            if (cardIndex.value > 0) {
                cardIndex.value--
                getCard()
                updateButtons()
            } 
        }

        const moveForward = () => {
            if (cardIndex.value < currentCards.length - 1) {
                cardIndex.value++
                getCard()
                updateButtons()
            }
        }
        
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
            question,
            answer,
            moveBack,
            moveForward,
            backBtn,
            forwardBtn
        }
    }
}
</script>

<style>
.main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-width: 28em;
}

.arrowBtn {
    position: relative;
    top: 1em;
  }

  .arrowBtn > svg {
    transform: scale(3.5);
  }

  .arrowBtnLocked {
    cursor: not-allowed;
  }

  .arrowBtnLocked > svg {
    color:  #d3d3d3;
  }

  .arrowBtnUsable > svg {
    color:  #939191;
    transition: transform 0.1s;

  }

  .arrowBtnUsable:hover > svg {
    transform: scale(4.5);
  }

  .arrowBtnUsable:active > svg {
    color:  #6d6d6d;
  }
</style>