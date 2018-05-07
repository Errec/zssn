<template>
  <div class="survivor-options container">
    <h1>Survivor Options</h1>

    <form v-if="!showOptions" class="container clearfix bg-light p-3 my-3 rounded border" @submit.prevent="handleFindSurvivorSubmit">
      <div class="form-group">
        <label for="inputId">Find Survivor</label>
        <input type="text" class="form-control" :class="{'is-invalid':inputIdValidation}" id="inputId" aria-describedby="id" placeholder="Survivor ID" v-model="survivorId">
      </div>
      <button type="submit" class="float-right btn btn-dark">Search</button>
    </form>
    <div v-else>

      <info-table :tableData="survivorData.infos" :tableTitle="'Survivor Information'"></info-table>
      <button type="buton" class="btn btn-dark d-block my-3" @click="updatePosition">Update Position</button>

      <info-table :tableData="survivorData.items" :tableTitle="'Survivor Items'"></info-table>
      <p class="text-right mb-5">Total Points: {{survivorData.totalPoints}}</p>

      <form class="container clearfix bg-light p-3 my-3 rounded border" @submit.prevent="handleReportInfectedSubmit">
        <div class="form-group">
          <label for="reportInfected">Report Infected</label>
          <input type="text" class="form-control" :class="{'is-invalid':inputInfectedIdValidation}" id="reportInfected" aria-describedby="id" placeholder="Infected ID" v-model="infectedId">
        </div>
        <button type="submit" class="float-right btn btn-dark">Report</button>
      </form>
    </div>

    <router-link to="/">
      <button type="button" class="btn btn-dark">Back</button>
    </router-link>
  </div>
</template>

<script>
  import InfoTable from '../components/InfoTable'
  import { fetchSurvivorInfos } from '../services/fetchSurvivorInfos'
  import { fetchSurvivorItems } from '../services/fetchSurvivorItems'
  import { reportInfected } from '../services/reportInfected'
  import { patchCurrentPosition } from '../services/patchCurrentPosition'

  export default {
    data () {
      return {
        showOptions: false,
        survivorId: '',
        infectedId: '',
        inputIdValidation: false,
        inputInfectedIdValidation: false,
        survivorData: {
          infos: {
            Name: "",
            ID: "",
            Age: "",
            Gender: "",
            Position: ""
          },
          items: {
            Water: 0,
            Food: 0,
            Medicine: 0,
            Ammunition: 0
          },
          totalPoints: 0
        }
      }
    },
    methods: {
      handleFindSurvivorSubmit () {
        if (!this.survivorId) {
          this.inputIdValidation = true
        } else {
          this.$swal.showLoading()
          this.inputIdValidation = false
          fetchSurvivorInfos(this.survivorId).payload.then(infosResponse => {

            this.survivorData.infos.Name = infosResponse.name
            this.survivorData.infos.ID = infosResponse.id
            this.survivorData.infos.Age = infosResponse.age
            this.survivorData.infos.Gender = infosResponse.gender
            this.survivorData.infos.Position = infosResponse.lonlat || "Unknown"

            fetchSurvivorItems(this.survivorId).payload.then(itemsResponse => {
              this.showOptions = true
              this.$swal.close()
              const vm = this
              if (itemsResponse.length) {
                itemsResponse.forEach((currentItem) => {
                    vm.survivorData.items[currentItem.item.name] = currentItem.quantity
                    vm.survivorData.totalPoints += currentItem.item.points * currentItem.quantity
                  })
              }
            }).catch((err) => {
              this.$swal({
                type: 'error',
                text: err
              })
            })
          }).catch((err) => {
            this.$swal({
              type: 'error',
              text: err
            })
          })
        }
      },
      handleReportInfectedSubmit () {
        if (!this.infectedId) {
          this.inputInfectedIdValidation = true
        } else {
          this.inputInfectedIdValidation = false
          this.$swal.showLoading()

          reportInfected(this.infectedId, this.survivorData.infos.ID).payload.then(response => {
            this.$swal({
              type: 'success',
              text: 'Infected Reported'
            })
          }).catch((err) => {
            this.$swal({
              type: 'error',
              text: err
            })
          })
        }
      },
      updatePosition () {
        let currentLongitude = ""
        let currentLatitude = ""

        this.$swal.showLoading()
        this.$helpers.getCurrentCoordinates().then((position) => {
          currentLatitude = position.coords.latitude
          currentLongitude = position.coords.longitude

          const survivorPostData = `person[name]=${this.survivorData.infos.Name}&person[age]=${parseInt(this.survivorData.infos.Age)}&person[gender]=${this.survivorData.infos.Gender}&person[lonlat]=Point(${parseFloat(currentLongitude).toFixed(3)} ${parseFloat(currentLatitude).toFixed(3)})`

          patchCurrentPosition(this.survivorData.infos.ID, survivorPostData).payload.then(response => {
            this.survivorData.infos.Position = `Point(${parseFloat(currentLongitude).toFixed(3)} ${parseFloat(currentLatitude).toFixed(3)})`
            this.$swal({
              type: 'success',
              text: 'Position Updated'
            })
          }).catch((err) => {
            this.$swal({
              type: 'error',
              text: err
            })
          })
        }).catch((err) => {
          this.$swal({
            type: 'error',
            title: `ERROR(${err.code}): ${err.message}`,
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
    },
    components: {
      InfoTable
    }
  }
</script>
