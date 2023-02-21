<template>
    <NavBar />
    <div class="header">
        <h2>{{ title }}</h2>
        <div class="editBtn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>
        </div>
    </div>

    <div class="main">
        <div class="arrowBtn arrowBtnLocked" @click="moveBack" ref="backBtn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path></svg>
        </div>

        <CardViewer :question="question" :answer="answer" :color="color"/>

        <div class="arrowBtn arrowBtnUsable" @click="moveForward" ref="forwardBtn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M284.9 412.6l138.1-134c6-5.8 9-13.7 9-22.4v-.4c0-8.7-3-16.6-9-22.4l-138.1-134c-12-12.5-31.3-12.5-43.2 0-11.9 12.5-11.9 32.7 0 45.2l83 79.4h-214c-17 0-30.7 14.3-30.7 32 0 18 13.7 32 30.6 32h214l-83 79.4c-11.9 12.5-11.9 32.7 0 45.2 12 12.5 31.3 12.5 43.3 0z"></path></svg>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import CardViewer from '../components/CardViewer.vue';
import { useRoute } from "vue-router";
import { getDeck } from '../composables/flashcards.js';

export default {
    props:['id'],
    components: { NavBar, CardViewer },
    setup() {
        const route = useRoute()
        const deckId = route.params.id
        const cardIndex = ref(0)
        const currentDeck = ref(null)
        let currentCards = null
        const backBtn = ref(null)
        const forwardBtn = ref(null)
        const title = ref(null)
        const color = ref(null)
        const question = ref(null)
        const answer = ref(null)

        const fetchData = async (deckId) => {
            currentDeck.value = await getDeck(deckId)
            title.value = currentDeck.value["title"]
            color.value = currentDeck.value["color"]
            currentCards = JSON.parse(currentDeck.value["flashcards"])
            question.value = currentCards[0]["front"]
            answer.value = currentCards[0]["back"]

            updateButtons()
        }

        fetchData(deckId)

        const getCard = () => {
            question.value = currentCards[cardIndex.value]["front"]
            answer.value = currentCards[cardIndex.value]["back"]
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

        return {
            title,
            color,
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

    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18em;
    }

    .main {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        min-width: 28em;
    }

        .editBtn {
            margin: 0.4em 0em 0em 1em;
        }

        .editBtn > svg {
            color: #939191;
            transform: scale(1.5);
            transition: transform 0.1s;
        }

      .editBtn:hover > svg {
        color: #6d6d6d;
        transform: scale(2);
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