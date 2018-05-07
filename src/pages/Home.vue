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
    <button type="button" @click="loadGameSummary" class="btn btn-dark btn-sm">Game Summary</button>
  </div>
</template>

<script>
  import { fetchSummary } from '../services/fetchSummary'

  export default {
    name: 'Home',
    data () {
      return {
        title: 'ZSSN'
      }
    },
    methods: {
      loadGameSummary () {
        this.$swal.showLoading()
        fetchSummary().payload.then(response => {
          this.$router.push({ name: 'Game Summary', params: { summaryData: response }})
          this.$swal.close()
        }).catch((err) => {
          this.$swal({
            type: 'error',
            text: err
          })
        })
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
