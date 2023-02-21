<script>
</script>

<template>
  <div class="logo">Flashcards</div>
  <RouterView />
</template>

<style>
.logo {
	position: absolute;
	top: 0px;
	background-color: #ff3859;
	align-self: flex-start;
	font-family: "UD Digi KyoKasho NK-R";
	font-size: 3em;
	/* font-family: "Segoe Print"; */
	font-weight: bolder;
	color: white;
	width: 100%;
}

  #app {
    min-width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  body {
    margin: 0px;
    color: #181818;
    background: #eeeeee;
    transition: color 0.5s, background-color 0.5s;
    line-height: 1.6;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: #38b9ff;
    text-decoration: none;
  }

  h2 {
    text-transform: uppercase;
    color: rgb(147, 145, 145);
  }

  .btnTitle {
    opacity: 0;
    transition: opacity .2s;
    position: relative;
    top: -4em;
    color: white;
    font-size: 0.8em;
    font-weight: bold;
    text-align: center;
    min-width: 9em;
    height: 1.7em;
    background-color: #cacaca;
    border-radius: 12px;
    margin-left: -9.1em;
  }

  .btnContainer:hover > .btnTitle {
      opacity: 1;
  }
  .btnTitle:before {
    content: "";
    position: absolute;
    right: 40%;
    bottom: -50%;
    border-left: 0.8em solid transparent;
    border-top: 1em solid #cacaca;
    border-right: 0.8em solid transparent;
  }
</style>
