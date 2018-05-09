<template>
  <div class="home container">
    <img class="img-fluid" src="../assets/logo.png">
    <h1 class="display-4">{{ title }}</h1>
    <router-link to="/register-survivor-form">
      <button type="button" class="btn btn-dark btn-sm"><i class="mr-2 fa fa-plus"></i>Add New Survivor</button>
    </router-link>
    <router-link to="/survivor-menu">
      <button type="button" class="btn btn-dark btn-sm"><i class="mr-4 fa fa-bars"></i>Survivor Menu</button>
    </router-link>
    <button type="button" @click="loadGameSummary" class="btn btn-dark btn-sm"><i class="mr-2 fa fa-star"></i>Game Summary</button>
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
img {
  height: 250px;
  width: auto;
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
  width: 150px
  }
</style>
