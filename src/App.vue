<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
import { survivorList } from './services/fetchAllSurvivors'

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 600px;
  margin: 32px auto;
}
</style>
