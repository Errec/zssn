<template>
  <div class="game-summary container">
    <h1>Game Summary</h1>
    <b-card-group deck>
      <b-card bg-variant="secondary"
              style="min-width: 12rem;"
              text-variant="white"
              :header="summaryData[0].report.description"
              class="text-center my-3">
          <h2 class="card-text">{{(summaryData[0].report.average_infected * 100).toFixed(1)}}%</h2>
      </b-card>

      <b-card bg-variant="secondary"
              style="min-width: 12rem;"
              text-variant="white"
              :header="summaryData[1].report.description"
              class="text-center my-3">
          <h2 class="card-text">{{(summaryData[1].report.average_healthy * 100).toFixed(1)}}%</h2>
      </b-card>

      <b-card bg-variant="secondary"
              style="min-width: 12rem;"
              text-variant="white"
              :header="summaryData[2].report.description"
              class="text-center my-3">
          <h2 class="card-text">{{summaryData[2].report.average_items_quantity_per_person.toFixed(0)}}</h2>
      </b-card>

      <b-card bg-variant="secondary"
              style="min-width: 12rem;"
              text-variant="white"
              :header="summaryData[3].report.description"
              class="text-center my-3">
          <h2 class="card-text">{{summaryData[3].report.total_points_lost}}</h2>
      </b-card>
    </b-card-group>
    <router-link to="/">
      <button type="button" class="btn btn-dark"><i class="fa fa-lg fa-angle-left mr-2"></i>Back</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ["summaryData"]
  }
</script>
