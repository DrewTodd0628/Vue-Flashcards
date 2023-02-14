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
</style>
