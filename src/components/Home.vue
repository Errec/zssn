<template>
  <div class="home container">
    <img class="img-fluid" src="../assets/logo.png">
    <h1>{{ title }}</h1>
    <router-link to="/add-survivor-form">
      <button type="button" class="btn btn-dark btn-sm">Add New Survivor</button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}
h1 {
  pointer-events: none;
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
