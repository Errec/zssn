<template>
  <div class="game-summary container">
    <h1>Game Summary</h1>
    <p>{{summaryData}}</p>

    <router-link to="/">
      <button type="button" class="btn btn-dark">Back</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ["summaryData"]
  }
</script>
