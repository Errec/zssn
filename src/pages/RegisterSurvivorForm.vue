<template>
  <div class="register-survivor-form">
    <h1>Register New Survivor</h1>
    <form class="survivor-form container bg-light border rounded py-3" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="form-group col-sm-7">
          <label for="inputName">Name</label>
          <input type="text" class="form-control" :class="{'is-invalid':inputNameValidation}" id="inputName" aria-describedby="name" placeholder="Enter name" v-model="survivorData.name">
        </div>
        <div class="form-group col-sm-2">
          <label for="inputAge">Age</label>
          <input type="number"  min="0" class="form-control" id="inputAge" aria-describedby="age" v-model="survivorData.age">
        </div>
        <div class="form-group col-sm-3">
          <label for="selectGender">Gender</label>
          <select class="form-control" :class="{'is-invalid':inputGenderValidation}" id="selectGender" v-model="survivorData.gender">
            <option value="">Select</option>
            option
            <option value="F">F</option>
            <option value="M">M</option>
          </select>
        </div>
      </div>
      <label for="inputPosition">Last location (latitude, longitude)</label>
      <div class="form-row mb-4" id="inputPosition">
        <button @click="getCoordinates" type="button">Get coords</button>
        <div class="col">
          <input number class="form-control" :class="{'is-invalid':inputCoordinateValidation}" placeholder="Latitude" v-model="survivorData.location.latitude">
        </div>
        <div class="col">
          <input number class="form-control" :class="{'is-invalid':inputCoordinateValidation}" placeholder="Longitude" v-model="survivorData.location.longitude">
        </div>
      </div>
      <div class="form-group d-flex">
        <label class="inventory-label" for="inputWater">Water</label>
        <input type="number" min="0" class="form-control" id="inputWater" value="0" v-model="survivorData.inventory.water">
      </div>
      <div class="form-group d-flex">
        <label class="inventory-label" for="inputFood">Food</label>
        <input type="number" min="0" class="form-control" id="inputFood" value="0" v-model="survivorData.inventory.food">
      </div>
      <div class="form-group d-flex">
        <label class="inventory-label" for="inputMedication">Medication</label>
        <input type="number" min="0" class="form-control" id="inputMedication" value="0" v-model="survivorData.inventory.medication">
      </div>
      <div class="form-group d-flex">
        <label class="inventory-label" for="inputAmmunition">Ammunition</label>
        <input type="number" min="0" class="form-control" id="inputAmmunition" value="0" v-model="survivorData.inventory.ammunition">
      </div>

      <button type="submit" class="btn btn-dark">Save</button>
      <router-link to="/">
        <button type="button" class="btn btn-dark">Cancel</button>
      </router-link>
    </form>
  </div>

</template>

<script>
  import { registerNewSurvivor } from '../services/registerNewSurvivor'

  export default {
    data () {
      return {
        inputNameValidation: false,
        inputGenderValidation: false,
        inputCoordinateValidation: false,
        survivorData: {
          name: '',
          age: '0',
          gender: '',
          location: {
            latitude: '',
            longitude: ''
          },
          inventory: {
            water: '0',
            food: '0',
            medication: '0',
            ammunition: '0'
          }
        }
      }
    },
    methods: {
      getCoordinates () {
        const vm = this
        vm.$swal.showLoading()

        const options = {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
        function success (pos) {
          vm.$swal.hideLoading()
          vm.$swal({
            type: 'success',
            title: 'Location Updated',
            showConfirmButton: false,
            timer: 1000
          })
          const crd = pos.coords
          vm.survivorData.location.latitude = crd.latitude
          vm.survivorData.location.longitude = crd.longitude
        }
        function error (err) {
          vm.$swal.hideLoading()
          vm.$swal({
            type: 'error',
            title: `ERROR(${err.code}): ${err.message}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
        navigator.geolocation.getCurrentPosition(success, error, options)
      },
      checkForm () {
        this.survivorData.name === '' ? this.inputNameValidation = true : this.inputNameValidation = false
        this.survivorData.gender === '' ? this.inputGenderValidation = true : this.inputGenderValidation = false

        if (!this.survivorData.location.longitude || !this.survivorData.location.latitude) {
          this.inputCoordinateValidation = true
        } else {
          this.inputCoordinateValidation = false
        }

        if (!this.survivorData.name ||
            !this.survivorData.gender ||
            !this.survivorData.location.longitude ||
            !this.survivorData.location.latitude) {
          return true
        }
      },
      handleSubmit () {
        if (this.checkForm()) {
          this.$swal({
            type: 'error',
            text: 'Please fill out all fields to proceed.'
          });
        } else {

          const survivorPostData = `person[name]=${this.survivorData.name}&person[age]=${parseInt(this.survivorData.age)}&person[gender]=${this.survivorData.gender}&person[lonlat]=Point(${parseFloat(this.survivorData.location.longitude).toFixed(3)} ${parseFloat(this.survivorData.location.latitude).toFixed(3)})&items=Water:${this.survivorData.inventory.water};Food:${this.survivorData.inventory.food};Medication:${this.survivorData.inventory.medication};Ammunition:${this.survivorData.inventory.ammunition};`

          registerNewSurvivor(this, survivorPostData)
        }
      }
    }
  }
</script>

<style>
  .inventory-label {
    min-width: 100px
  }
</style>
