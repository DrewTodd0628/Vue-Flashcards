<template>
    <div :class=type>{{ message }}</div>
</template>

<script>
export default {
    props: ["message", "type"],
    data() {
        const type = this.type + " toast"
        return {
            type
        }
    }
}
</script>

<style>
    .toast {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 9em;
        margin: auto;
        width: 20em;
        z-index: 1;
        height: 70px;
        border-radius: 15px;
        font-weight: bold;
        color: white;

        -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
        -moz-animation: fadein 1s; /* Firefox < 16 */
         -ms-animation: fadein 1s; /* Internet Explorer */
          -o-animation: fadein 1s; /* Opera < 12.1 */
             animation: fadein 1s;
    }

    .normal {
        background-color: #38b9ff;
    }

    .error {
        background-color: #ffb1b1;
    }

    @keyframes fadein {
        from { top: 0em; opacity: 0; }
        to   { top: 9em; opacity: 1; }
    }
    
    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { top: 0em; opacity: 0; }
        to   { top: 9em; opacity: 1; }
    }
    
    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { top: 0em; opacity: 0; }
        to   { top: 9em; opacity: 1; }
    }
    
    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { top: 0em; opacity: 0; }
        to   { top: 9em; opacity: 1; }
    }
    
    /* Opera < 12.1 */
    @-o-keyframes fadein {
        from { top: 0em; opacity: 0; }
        to   { top: 9em; opacity: 1; }
    }
</style>