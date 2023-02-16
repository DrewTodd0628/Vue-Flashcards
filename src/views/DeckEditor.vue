<template>
    <NavBar />
    <div class="main">
        <div class="arrowBtn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path></svg>
        </div>
        <div class="viewer">
            <div class="viewHeader">
                <div class="save">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M272 64h-16c-4.4 0-8 3.6-8 8v72c0 4.4 7.6 8 12 8h12c4.4 0 8-3.6 8-8V72c0-4.4-3.6-8-8-8z"></path><path d="M433.9 130.1L382 78.2c-9-9-21.3-14.2-34.1-14.2h-28c-8.8 0-16 7.3-16 16.2v80c0 8.8-7.2 16-16 16H160c-8.8 0-16-7.2-16-16v-80c0-8.8-7.2-16.2-16-16.2H96c-17.6 0-32 14.4-32 32v320c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V164c0-12.7-5.1-24.9-14.1-33.9zM322 400.1c0 8.8-8 16-17.8 16H143.8c-9.8 0-17.8-7.2-17.8-16v-96c0-8.8 8-16 17.8-16h160.4c9.8 0 17.8 7.2 17.8 16v96z"></path></svg>
                </div>
                <div class="input titleInput" contenteditable=true @input="onInputTitle">New Deck</div>
                <div class="trash">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
                </div>
            </div>
            <div class="flashcards">
                <div class="flashcard">
                    <div class="front">
                        <h2>Question</h2>
                            <div>
                                <div class="input cardInput" contenteditable=true @input="onInputQuestion">Question</div>
                            </div>
                    </div>
                </div>
                <div class="flashcard">
                    <div class="back">
                        <h2>Answer</h2>
                        <div>
                            <div class="input cardInput" contenteditable=true @input="onInputAnswer">Answer</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="arrowBtn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M284.9 412.6l138.1-134c6-5.8 9-13.7 9-22.4v-.4c0-8.7-3-16.6-9-22.4l-138.1-134c-12-12.5-31.3-12.5-43.2 0-11.9 12.5-11.9 32.7 0 45.2l83 79.4h-214c-17 0-30.7 14.3-30.7 32 0 18 13.7 32 30.6 32h214l-83 79.4c-11.9 12.5-11.9 32.7 0 45.2 12 12.5 31.3 12.5 43.3 0z"></path></svg>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import decksFile from '../composables/data.json';

export default {
    components: { NavBar },

    setup() {
        const decks = ref('')
        const title = ref('')
        const question = ref('')
        const answer = ref('')
        // decks.value = JSON.parse('[         {             "title": "Countries",              "flashcards": [                 {                     "front": "Big Ben",                      "back": "UK"                  }             ]         },          {             "title": "Foods",             "flashcards": [                 {                     "front": "Fried Cake",                     "back": "Funnel Cakes"                  },                   {                  "front": "Baked custard with caramel",                  "back": "Flan"                  }             ]         } ]')
        decks.value = decksFile
        console.log(decks.value)

        const onInputTitle = (ev) => {
            if (ev.target.innerHTML.length <= 30) {
                title.value = ev.target.innerHTML
            } else {
                ev.target.innerHTML = title.value
            }
        }

        const onInputQuestion = (ev) => {
            if (ev.target.innerHTML.length <= 80) {
                question.value = ev.target.innerHTML
            } else {
                ev.target.innerHTML = question.value
            }
        }

        const onInputAnswer = (ev) => {
            if (ev.target.innerHTML.length <= 80) {
                answer.value = ev.target.innerHTML
            } else {
                ev.target.innerHTML = answer.value
            }
        }

        return {
            decks,
            question,
            answer,
            onInputTitle,
            onInputQuestion,
            onInputAnswer
        }
    }
}
</script>

<style scoped>

    .main {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .viewer {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        border-radius: 15px;
        margin-bottom: -8em;
    }

    .flashcards {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 15px;
        padding: 3em;
        padding-right: 0em;
    }

    .flashcard div h2 {
        background-color: #38b9ff;
        width: 100%;
        margin: 0px;
        border-radius: 15px 15px 0px 0px;
        color: white;
        text-align: center;
        min-height: 3em;
    }

    .flashcard > div > div {
        border-radius: 15px;
        background-color: white;
        height: 12.7em;
        margin-top: -1.1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.8em;
        padding: 12px;
    }

    .flashcard > div {
        width: 100%;
    }

    .flashcard {
        background-color: rgb(255, 255, 255);
        border-radius: 15px;
        box-shadow: 0px 0px 8px #cbcbcb;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20em;
        height: 27em;
        transition: 0.4s;
        transform-style: preserve-3d;
        margin-right: 3em;
    }

    .viewHeader {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 70%;
        margin-top: 2em;
    }

    .titleInput {
        min-height: 1.6em;
        min-width: 10em;
        max-width: 26em;
        padding: 0.5em;
    }

      .save > svg {
        color: #939191;
        transform: scale(2);
        transition: transform 0.1s;
      }

      .save:hover > svg {
        color: #6cdd88;
        transform: scale(2.5);
      }

      .trash > svg {
        color: #939191;
        transform: scale(1.5);
        transition: transform 0.1s;
      }

      .trash:hover > svg {
        color: #ff7979;
        transform: scale(2);
      }

    .cardInput {
        width: 9.5em;
        height: 12em;
    }

    .input {
        background-color: white;
        outline: white solid 1px;
        border: 1px dashed rgb(195, 195, 195);
        border-radius: 4px;
        word-wrap: break-word;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }

    .input:focus {
        border: 1px dashed #38b9ff;
        outline: #38b9ff dashed 1px;
    }

    .input {
        resize: none;
        text-align: center;
      }

      .arrowBtn {
        position: relative;
        top: 7em;
      }

      .arrowBtn > svg {
        color:  #939191;
        transform: scale(3.5);
        transition: transform 0.1s;
      }

      .arrowBtn:hover > svg {
        transform: scale(4.5);
      }
</style>