<template>
  <div class="survivor-options container">
    <h1>Survivor Options</h1>

    <form class="container clearfix bg-light p-3 my-3">
      <div class="form-group">
        <label for="inputId">Find Survivor</label>
        <input type="text" class="form-control" :class="{'is-invalid':inputIdValidation}" id="inputId" aria-describedby="id" placeholder="Survivor ID">
      </div>
      <button type="submit" class="float-right btn btn-dark">Search</button>
    </form>

    <button type="buton" class="btn btn-dark d-block">Update Position</button>

    <form class="container clearfix bg-light p-3 my-3">
      <div class="form-group">
        <label for="reportInfected">Report Infected</label>
        <input type="text" class="form-control" :class="{'is-invalid':reportInfectedValidation}" id="reportInfected" aria-describedby="id" placeholder="Infected ID">
      </div>
      <button type="submit" class="float-right btn btn-dark">Report</button>
    </form>


    <router-link to="/">
      <button type="button" class="btn btn-dark">Home</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputIdValidation: false,
      reportInfectedValidation: false
    }
  }
}
</script>
