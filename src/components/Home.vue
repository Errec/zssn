<template>
  <div class="home container">
    <h1>{{ title }}</h1>
    <!-- <button>Search for Survivor</button> -->
    <button type="button" class="btn btn-dark">Add New Survivor</button>
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
button {
  display: block;
  margin: 32px auto;
  cursor: pointer;
  }
</style>
