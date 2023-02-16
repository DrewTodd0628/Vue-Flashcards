<template>
    <div class="container" @click="flip"  ref="container">
        <div class="flashcard">
            <div class="front">
                <h2>Question</h2>
                <div>{{ flashcard["front"] }}</div>
            </div>
            <div class="back">
                <h2>Answer</h2>
                <div>{{ flashcard["back"] }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted} from 'vue';

export default {
    props: ["flashcard"],

    setup() {
        const flipped = ref(false)
        const container = ref(null)

        const flip = () => {
            flipped.value = !flipped.value
            container.value.classList.toggle('flipped')
        }
        onMounted(() => {
        console.log(container.value)
        })


        return {
            flip,
            flipped,
            container
        }
    }
}
</script>

<style scoped>
    .flashcard div h2 {
        background-color: #38b9ff;
        width: 100%;
        margin: 0px;
        border-radius: 15px 15px 0px 0px;
        color: white;
        text-align: center;
        min-height: 3em;
    }

    .flashcard div div {
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
    }

    .container {
        perspective: 1000px;
    }

    .flipped .flashcard {
        transform: rotateY(180deg);
    }

    .front, .back {
        backface-visibility: hidden;
        width: 100%;
    }
    .front {
        z-index: 2;
        transform: rotateY(0deg);
    }

    .back {
        transform: rotateY(180deg);
        position: relative;
        top: -27em;
    }
</style>