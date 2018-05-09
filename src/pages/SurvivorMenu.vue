<template>
  <div class="survivor-options container">
    <h1>Survivor Menu</h1>

    <form v-if="!showOptions" class="container clearfix bg-light p-3 my-3 rounded border" @submit.prevent="handleFindSurvivorSubmit">
      <div class="form-group">
        <label for="inputId">Enter the survivor ID</label>
        <input type="text" class="form-control" :class="{'is-invalid':inputIdValidation}" id="inputId" aria-describedby="id" placeholder="Survivor ID" v-model="survivorId">
      </div>
      <button type="submit" class="float-right btn btn-dark">Login</button>
    </form>

    <div v-else>
      <info-table :tableData="survivorData.infos" :tableTitle="'Survivor Information'"></info-table>
      <div class="w-100 clearfix mb-4">
        <button type="button" class="btn btn-dark d-block float-right" @click="updatePosition"><i class="mr-2 fa fa-lg fa-globe"></i>Update Position</button>
      </div>

      <info-table :tableData="survivorData.items" :tableTitle="'Survivor Items'"></info-table>
      <p class="text-right ">Total Points: {{survivorData.totalPoints}}</p>

      <form class="container clearfix bg-light p-3 my-3 rounded border" @submit.prevent="handleFindTradeSubmit">
        <div class="form-group">
          <label for="tradeItems">Trade Items</label>
          <input type="text" class="form-control" :class="{'is-invalid':inputTradeSurvivorNameValidation}" id="tradeItems" aria-describedby="id" placeholder="Survivor Name" v-model="tradeSurvivorName">
        </div>
        <button type="submit" class="btn btn-dark float-right"><i class="mr-2 fa fa-exchange"></i>Open Trade</button>
      </form>

      <form class="container clearfix bg-light p-3 my-3 rounded border" @submit.prevent="handleReportInfectedSubmit">
        <div class="form-group">
          <label for="reportInfected">Report Infected</label>
          <input type="text" class="form-control" :class="{'is-invalid':inputInfectedIdValidation}" id="reportInfected" aria-describedby="id" placeholder="Infected ID" v-model="infectedId">
        </div>
        <button type="submit" class="float-right btn btn-dark"><i class="mr-2 fa fa-exclamation-triangle"></i>Report</button>
      </form>

      <b-modal v-model="showTradeModal"
               title="Trade Items">
         <b-container fluid>
           <b-row class="mb-1 text-center">
             <b-col cols="3"> </b-col>
             <b-col>You</b-col>
             <b-col>Target</b-col>
           </b-row>
           <b-row class="mb-1">
             <b-col cols="3">Water</b-col>
             <b-col><input type="number" min="0" :max="survivorData.items.Water" class="form-control" aria-describedby="water" v-model="survivorData.trade.Water"></b-col>
             <b-col><input type="number" min="0" :max="tradeTargetSurvivorData.items.Water" class="form-control" aria-describedby="water" v-model="tradeTargetSurvivorData.trade.Water"></b-col>
           </b-row>
           <b-row class="mb-1">
             <b-col cols="3">Food</b-col>
             <b-col><input type="number" min="0" :max="survivorData.items.Food" class="form-control" aria-describedby="Food" v-model="survivorData.trade.Food"></b-col>
             <b-col><input type="number" min="0" :max="tradeTargetSurvivorData.items.Food" class="form-control" aria-describedby="Food" v-model="tradeTargetSurvivorData.trade.Food"></b-col>
           </b-row>
           <b-row class="mb-1">
             <b-col cols="3">Medication</b-col>
             <b-col><input type="number" min="0" :max="survivorData.items.Medication" class="form-control" aria-describedby="Medication" v-model="survivorData.trade.Medication"></b-col>
             <b-col><input type="number" min="0" :max="tradeTargetSurvivorData.items.Medication" class="form-control" aria-describedby="Medication" v-model="tradeTargetSurvivorData.trade.Medication"></b-col>
           </b-row>
           <b-row class="mb-1">
             <b-col cols="3">Ammunition</b-col>
             <b-col><input type="number" min="0" :max="survivorData.items.Ammunition" class="form-control" aria-describedby="Ammunition" v-model="survivorData.trade.Ammunition"></b-col>
             <b-col><input type="number" min="0" :max="tradeTargetSurvivorData.items.Ammunition" class="form-control" aria-describedby="Ammunition" v-model="tradeTargetSurvivorData.trade.Ammunition"></b-col>
           </b-row>
           <b-row>
             <b-col cols="3">Points</b-col>
             <b-col><p class="text-right">{{myTradePoints}}</p></b-col>
             <b-col><p class="text-right">{{targetTradePoints}}</p></b-col>
           </b-row>
         </b-container>
         <div slot="modal-footer" class="w-100">
           <b-btn size="sm" class="float-right btn-dark" variant="primary" @click="showTradeModal=false">
             Cancel
           </b-btn>
           <b-btn :disabled="myTradePoints !== targetTradePoints || myTradePoints === 0" size="sm" class="float-right btn-dark mr-2" variant="primary" @click="makeItemTrade"><i class="fa fa-exchange"></i></b-btn>
         </div>
      </b-modal>
    </div>

    <router-link to="/">
      <button type="button" class="btn btn-dark"><i class="fa fa-lg fa-angle-left mr-2"></i>Back</button>
    </router-link>
  </div>
</template>

<script>
  import InfoTable from '../components/InfoTable'
  import { fetchSurvivorInfos } from '../services/fetchSurvivorInfos'
  import { fetchSurvivorItems } from '../services/fetchSurvivorItems'
  import { reportInfected } from '../services/reportInfected'
  import { patchCurrentPosition } from '../services/patchCurrentPosition'
  import { requestTrade } from '../services/requestTrade'
  import { fetchAllSurvivors } from '../services/fetchAllSurvivors'

  export default {
    data () {
      return {
        showTradeModal: false,
        showOptions: false,
        survivorId: '',
        tradeSurvivorId: '',
        tradeSurvivorName: '',
        infectedId: '',
        inputIdValidation: false,
        inputInfectedIdValidation: false,
        inputTradeSurvivorNameValidation: false,
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
            Medication: 0,
            Ammunition: 0
          },
          trade: {
            Water: 0,
            Food: 0,
            Medication: 0,
            Ammunition: 0
          },
          totalPoints: 0
        },
        tradeTargetSurvivorData: {
          items: {
            Water: 0,
            Food: 0,
            Medication: 0,
            Ammunition: 0
          },
          trade: {
            Water: 0,
            Food: 0,
            Medication: 0,
            Ammunition: 0
          }
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
      handleFindTradeSubmit () {
        // get name -> search if name -> get ID from name -> get items from ID
        if (!this.tradeSurvivorName) {
          this.inputTradeSurvivorNameValidation = true
        } else {
          this.inputTradeSurvivorNameValidation = false
          this.$swal.showLoading()
          fetchAllSurvivors().payload.then((fetchAllResponse) => {

            let survivorDataBuff

            survivorDataBuff = fetchAllResponse.find((survivorData) => {
              return survivorData.name === this.tradeSurvivorName
            });

            if (survivorDataBuff.name && !survivorDataBuff["infected?"]) {
              this.tradeSurvivorId = survivorDataBuff.location.substr(survivorDataBuff.location.indexOf("people/") + 7)

              fetchSurvivorItems(this.tradeSurvivorId).payload.then(getItemsResponse => {
                this.$swal.close()
                this.showTradeModal = true
                const vm = this
                if (getItemsResponse.length) {
                  getItemsResponse.forEach((currentItem) => {
                      vm.tradeTargetSurvivorData.items[currentItem.item.name] = currentItem.quantity
                      vm.tradeTargetSurvivorData.totalPoints += currentItem.item.points * currentItem.quantity
                    })
                }
              }).catch((err) => {
                this.$swal({
                  type: 'error',
                  text: err
                })
              })
            } else if (survivorDataBuff["infected?"]) {
              this.$swal({
                type: 'error',
                text: "Survivor infected"
              })
            } else {
              this.$swal({
                type: 'error',
                text: "Survivor not found"
              })
            }
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
      },
      makeItemTrade () {
        const consumerPayment = `Water:${this.survivorData.trade.Water};Food:${this.survivorData.trade.Food};Medication:${this.survivorData.trade.Medication};Ammunition:${this.survivorData.trade.Ammunition};`
        const consumerPick = `Water:${this.tradeTargetSurvivorData.trade.Water};Food:${this.tradeTargetSurvivorData.trade.Food};Medication:${this.tradeTargetSurvivorData.trade.Medication};Ammunition:${this.tradeTargetSurvivorData.trade.Ammunition};`
        const tradeData = `consumer[name]=${this.tradeSurvivorName}&consumer[pick]=${consumerPick}&consumer[payment]=${consumerPayment}`

        this.$swal.showLoading()
        requestTrade(this.survivorId, tradeData).payload.then(tradeItemsResponse => {

          this.survivorData.items.Water = this.survivorData.items.Water - this.survivorData.trade.Water + this.tradeTargetSurvivorData.trade.Water
          this.survivorData.items.Food = this.survivorData.items.Food - this.survivorData.trade.Food + this.tradeTargetSurvivorData.trade.Food
          this.survivorData.items.Medication = this.survivorData.items.Medication - this.survivorData.trade.Medication + this.tradeTargetSurvivorData.trade.Medication
          this.survivorData.items.Ammunition = this.survivorData.items.Ammunition - this.survivorData.trade.Ammunition + this.tradeTargetSurvivorData.trade.Ammunition

            this.$swal({
              type: 'error',
              text: 'Trade completed with success!'
            })
          }).catch((err) => {
            this.$swal({
              type: 'error',
              text: err
            })
          })
      }
    },
    computed: {
      myTradePoints () {
          return (this.survivorData.trade.Water * 4) + ( this.survivorData.trade.Food * 3) + ( this.survivorData.trade.Medication * 2) + ( this.survivorData.trade.Ammunition * 1)
      },
      targetTradePoints () {
          return ( this.tradeTargetSurvivorData.trade.Water * 4) + ( this.tradeTargetSurvivorData.trade.Food * 3) + ( this.tradeTargetSurvivorData.trade.Medication * 2) + ( this.tradeTargetSurvivorData.trade.Ammunition * 1)
      }
    },
    components: {
      InfoTable
    }
  }
</script>
