<template>
    <NavBar />
    <h2>My Decks</h2>

    <div class="collection">
        <div class="addDeckContainer btnContainer">
            <div class="btnTitle">Create New Deck</div>
            <div class="outer">
                <RouterLink :to="{ name: 'edit-deck' }">
                    <div class="addDeck">
                        <svg viewBox="0 0 70.265251 70.265289" version="1.1" id="svg5" inkscape:export-filename="bitmap.svg" inkscape:export-xdpi="46.12" inkscape:export-ydpi="46.12" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="10mm" height="10mm">
                            <sodipodi:namedview id="namedview7" pagecolor="#505050" bordercolor="#ffffff" borderopacity="1" inkscape:showpageshadow="0" inkscape:pageopacity="0" inkscape:pagecheckerboard="1" inkscape:deskcolor="#505050" inkscape:document-units="mm" showgrid="false" inkscape:zoom="1.3774147" inkscape:cx="213.80634" inkscape:cy="401.83976" inkscape:window-width="1920" inkscape:window-height="1001" inkscape:window-x="-9" inkscape:window-y="-9" inkscape:window-maximized="1" inkscape:current-layer="layer1"></sodipodi:namedview>
                            <defs id="defs2"></defs>
                            <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(-69.867044,-79.867674)">
                            <path style="fill:#939191;fill-opacity:1;stroke:none;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 75,110 c 0,0 -5.067913,-0.006 -5,5 0.06791,5.00563 5,5 5,5 h 25 v 25 c 0,0 -0.0056,5.06791 5,5 5.00563,-0.0679 5,-5 5,-5 v -25 h 25 c 0,0 5,0.16335 5,-5 0,-5.16335 -5,-5 -5,-5 H 110 V 85 c 0,0 -0.16768,-4.98335 -5,-5 -4.83232,-0.01665 -5,5 -5,5 v 25 z" id="path236" sodipodi:nodetypes="czccczccczccczccc"></path>
                            </g>
                        </svg>
                    </div>
                </RouterLink>
            </div>
        </div>
            <div class="deck" v-for="deck in decks" :key="deck">
                <DeckLink :deck="deck"/>
            </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import NavBar from '../components/NavBar.vue';
import DeckLink from '../components/DeckLink.vue';
import decksFile from '../composables/data.json';
import { Databases, Permission, Role } from 'appwrite';
import { client, ID } from '../composables/auth';
import { getDecks } from '../composables/flashcards';

export default {
    components: { NavBar, DeckLink },
    
    setup() {
        let decksRes = ""
        const decks = ref('')
        const loading = ref(true)

        watch(decks, () => {
            loading.value = false
        })

        const fetchData = async () => {
            decks.value = await getDecks()
        }
        fetchData()

        return {
            decksRes,
            decks,
            loading
        }
    }
}
</script>

<style scoped>
.collection {
	display: flex;
	flex-direction: row;
	align-items: center;
	background: white;
	border-radius: 15px;
	padding: 2em;
	padding-right: 0em;
    min-height: 9.8em;
}

    .deck {
        margin-right: 2em;
    }

    .addDeck {
        border: 2px dashed rgb(147, 145, 145);
        border-radius: 15px;
        width: 2em;
        padding: 3.2em 2.2em 3.2em 2.2em;
        transition: padding .1s;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
    }

    .addDeckContainer{
        display: flex;
    }

    .addDeckContainer > .outer {
        width: 7.5em;
        margin-right: 2em;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
    }

    .addDeck:hover {
        padding: 3.5em 2.5em 3.5em 2.5em;
    }

    #svg5 {
        transition: transform .1s;
    }

    .addDeck:hover > #svg5 {
        transform: scale(1.1);
    }

    .btnTitle {
        left: 9.1em;
    }

</style>