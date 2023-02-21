<template>
    <RouterLink :to="{ name: 'deck', params: { id: deck['$id'] } }">
        <div class="deck">
            <div class="card cardOne"></div>
            <div class="card under cardTwo"></div>
            <div class="card under cardThree">
                <div class="title">{{ deck["title"] }}</div>
            </div>

        </div>
    </RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    props: ["deck"],
    components: { RouterLink },
    
    data() {
        const color = this.deck["color"]
        return {
            color
        }
    }
}
</script>

<style scoped>

    .card {
        background-color: white;
        width: 7.5em;
        height: 9.5em;
        box-shadow: 0px 0px 8px #cbcbcb;
        border-radius: 10px;
    }

    .under {
        margin-top: -9em; 
    }

    .cardOne {
        z-index: 1;
    }

    .cardTwo {
        transform: rotateZ(2deg);
        transition: transform .1s;
    }
    .cardThree {
        background-color: v-bind('color');
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: rotateZ(4deg);
        transition: transform .1s;
    }

    .title {
        background-color: white;
        color: v-bind('color');
        width: 100%;
        text-align: center;
        font-weight: bold;
        height: 4em;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .deck:hover > .cardTwo {
        transform: translate(0, 3%) rotateZ(3deg);
        transition: transform 0.1s linear;
    }

    .deck:hover > .cardThree {
        transform: translate(0, 6%) rotateZ(6deg);
        transition: transform 0.1s linear;
    }

</style>