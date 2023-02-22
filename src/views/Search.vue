<template>
    <NavBar />
    <div class="search">
        <div class="searchBar">
            <form @submit.prevent="handleSubmit">
                <input type="text" v-model="searchQuery">

                <div class="submit">
                    <button>Search</button>
                </div>
            </form>
        </div>
        <div class="results">
            <div @scroll="onScroll">
                <div class="result" v-for="deck in decks" :key="deck">
                    <div class="deckAndTitle">
                        <div class="deck">
                            <DeckLink :deck="deck"/>
                        </div>
                        <div class="center">
                            <div class="title">{{ deck.title }}</div>
                            <div class="likes">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
                                {{ deck.likes }}
                            </div>
                        </div>
                    </div>
                    <div class="by">By {{ deck.owner }}</div>
                    <div>
                        <div class="dates">Created: {{ deck.$createdAt }}</div>
                        <div class="dates">Last updated: {{ deck.$updatedAt }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import DeckLink from '../components/DeckLink.vue';
import NavBar from '../components/NavBar.vue';
import { getPublishedDecks, getNextPublishedDecks } from '../composables/flashcards';

export default {
    components: { NavBar, DeckLink },
    setup() {
        const searchQuery = ref('')
        const decks = ref([])
        let lastId = 0;

        const handleSubmit = async () => {
            decks.value = formatData(await getPublishedDecks(searchQuery.value))
            lastId = getLastId(decks.value)
        }

        const formatData = (decks) => {
            decks.forEach(e => {
                e["$createdAt"] = e["$createdAt"].substring(0, 10).replaceAll("-", "/")
                e["$updatedAt"] = e["$updatedAt"].substring(0, 10).replaceAll("-", "/")
            });

            return decks
        }

        const onScroll = async ({ target: { scrollTop, clientHeight, scrollHeight }}) => {
            if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
                let tmpDecks = formatData(await getNextPublishedDecks(searchQuery.value, lastId))
                
                tmpDecks.forEach(deck => {
                    decks.value.push(deck)
                })

                lastId = getLastId(decks.value)
            }
        }

        const getLastId = (decks) => {
            return decks[decks.length-1]["$id"]
        }

        return {
            searchQuery,
            handleSubmit,
            decks,
            onScroll
        }
    }
}
</script>

<style scoped>

.search {
    position: absolute;
    top: 8em;
    width: 100%;
    height: 84%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
    .searchBar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        border-radius: 15px;
        width: 95%;
        height: 4em;
    }

    .searchBar > form {
        
    }

    .results {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        border-radius: 15px;
        width: 95%;
        height: 83%;
        margin-top: 1em;
    }

    .results > div {
        width: 96%;
        overflow: auto;
        margin: 0.5em 0em 0.5em 1em;
    }
    
    .result {
        color: rgb(147, 145, 145);
        border-width: 1px 0px 1px 0px;
        border-style: solid;
        border-color: rgb(195, 195, 195);
        border-radius: 10px;
        width: 92%;
        margin-top: 1.2em;
        padding: 1em 1em 1.8em 1em;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title {
        margin-left: 2em;
        margin-top: 2.8em;
    }

    .deckAndTitle {
        display: flex;
        align-items: center;
        justify-content: column;
    }

    .likes {
        margin-top: 1em;
    }

    .likes > svg {
        color: #939191;
        transform: scale(1.5);
    }

    .deck {
        font-size: 0.7em;
    }

    form > .submit {
        display: inline;
    }
    .submit button {
        color: white;
        font-family: "Franklin Gothic Medium", sans-serif;
        font-weight: bold;
        font-size: medium;
        border: none;
        border-radius: 10px;
        padding: 4px 18px;
        background-color: #38b9ff;
        margin-left: 2em;
    }

    .submit button:hover {
        background-color: #00a6ff;
    }

    .submit button:active {
        background-color: #008cd6;
    }

    input[type="text"]{
        outline: white solid 2px;
        width: 15em;
        height: 1.8em;
        border: 1px solid rgb(195, 195, 195);
        border-radius: 4px;
        margin-left: 2em;
    }

    input[type="text"]:focus {
        border: 1px solid #38b9ff;
        outline: #38b9ff solid 2px;
    }



</style>