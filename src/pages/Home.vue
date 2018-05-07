<template>
  <div class="home container">
    <img class="img-fluid" src="../assets/logo.png">
    <h1 class="display-4">{{ title }}</h1>
    <router-link to="/register-survivor-form">
      <button type="button" class="btn btn-dark btn-sm">Add New Survivor</button>
    </router-link>
    <router-link to="/survivor-options">
      <button type="button" class="btn btn-dark btn-sm">Survivor Options</button>
    </router-link>
    <router-link to="/game-summary">
      <button type="button" class="btn btn-dark btn-sm">Game Summary</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: 'ZSSN'
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
}
h1 {
  pointer-events: none;
  text-shadow: -3px 3px grey
}
a:hover {
  text-decoration: none;
}
button {
  display: block;
  margin: 32px auto;
  cursor: pointer;
  }
</style>
