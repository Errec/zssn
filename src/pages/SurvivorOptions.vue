<template>
  <div class="survivor-options container" @submit.prevent="handleSubmit">
    <h1>Survivor Options</h1>

    <form v-if="!showOptions" class="container clearfix bg-light p-3 my-3 rounded border">
      <div class="form-group">
        <label for="inputId">Find Survivor</label>
        <input type="text" class="form-control" :class="{'is-invalid':inputIdValidation}" id="inputId" aria-describedby="id" placeholder="Survivor ID" v-model="survivorId">
      </div>
      <button type="submit" class="float-right btn btn-dark">Search</button>
    </form>
    <div v-else>
      <form class="container clearfix bg-light p-3 my-3 rounded border">
        <div class="form-group">
          <label for="reportInfected">Report Infected</label>
          <input type="text" class="form-control" :class="{'is-invalid':reportInfectedValidation}" id="reportInfected" aria-describedby="id" placeholder="Infected ID">
        </div>
        <button type="submit" class="float-right btn btn-dark">Report</button>
      </form>

      <button type="buton" class="btn btn-dark d-block my-3">Update Position</button>

      <info-table :tableData="survivorData.infos" :tableTitle="'Survivor Information'"></info-table>
      <info-table :tableData="survivorData.items" :tableTitle="'Survivor Items'"></info-table>
    </div>

    <router-link to="/">
      <button type="button" class="btn btn-dark">Home</button>
    </router-link>
  </div>
</template>

<script>
  import InfoTable from '../components/InfoTable'
  import { fetchSurvivorData } from '../services/fetchSurvivor'

  export default {
    data () {
      return {
        showOptions: false,
        survivorId: '',
        inputIdValidation: false,
        reportInfectedValidation: false,
        survivorData: {
          infos: {
            ID: "",
            Name: "",
            Age: "",
            Gender: "",
            Position: ""
          },
          items: {
            Water: "",
            Food: "",
            Medicine: "",
            Ammunition: ""
          }
        }
      }
    },
    methods: {
      handleSubmit () {
        if (!this.survivorId) {
          this.inputIdValidation = true
        } else {
          this.inputIdValidation = false
          fetchSurvivorData(this.survivorId).payload.then(response => {
            this.showOptions = true
            console.log(response)
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    },
    components: {
      InfoTable
    }
  }
</script>
