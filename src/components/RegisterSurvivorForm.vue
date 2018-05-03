<template>
  <form class="survivor-form container" @submit.prevent="handleSubmit">

    <div class="row">
      <div class="form-group col-sm-8">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" aria-describedby="name" placeholder="Enter name" v-model="survivorData.name">
      </div>
      <div class="form-group col-sm-2">
        <label for="inputAge">Age</label>
        <input type="number" class="form-control" id="inputAge" aria-describedby="age" v-model="survivorData.age">
      </div>
      <div class="form-group col-sm-2">
        <label for="selectGender">Gender</label>
        <select class="form-control" id="selectGender" v-model="survivorData.gender">
          <option value="">Select Gender</option>}
          option
          <option value="1">F</option>
          <option value="2">M</option>
        </select>
      </div>
    </div>

    <label for="inputPosition">Last location (latitude, longitude)</label>
    <div class="form-row" id="inputPosition">
      <button @click="getCoordinates" type="button">Get coords</button>
      <div class="col">
        <input type="number" class="form-control" placeholder="Latitude" v-model="survivorData.location.latitude">
      </div>
      <div class="col">
        <input type="number" class="form-control" placeholder="Longitude" v-model="survivorData.location.longitude">
      </div>
    </div>

    <div class="form-group d-flex">
      <label class="inventory-label" for="inputWater">Water</label>
      <input type="number" class="form-control" id="inputWater" value="0" v-model="survivorData.inventory.water">
    </div>
    <div class="form-group d-flex">
      <label class="inventory-label" for="inputFood">Food</label>
      <input type="number" class="form-control" id="inputFood" value="0" v-model="survivorData.inventory.food">
    </div>
    <div class="form-group d-flex">
      <label class="inventory-label" for="inputMedication">Medication</label>
      <input type="number" class="form-control" id="inputMedication" value="0" v-model="survivorData.inventory.medication">
    </div>
    <div class="form-group d-flex">
      <label class="inventory-label" for="inputAmmunition">Ammunition</label>
      <input type="number" class="form-control" id="inputAmmunition" value="0" v-model="survivorData.inventory.ammunition">
    </div>

    <button type="submit" class="btn btn-dark">Save</button>
    <router-link to="/">
      <button type="button" class="btn btn-dark">Cancel</button>
    </router-link>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        survivorData: {
          name: '',
          age: '',
          gender: '',
          location: {
            latitude: '',
            longitude: ''
          },
          inventory: {
            water: '',
            food: '',
            medication: '',
            ammunition: ''
          }
        }
      }
    },
    methods: {
      getCoordinates () {
        const vm = this
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
        function success (pos) {
          const crd = pos.coords
          vm.survivorData.location.latitude = crd.latitude
          vm.survivorData.location.longitude = crd.longitude
        }
        function error (err) {
          console.warn(`ERROR(${err.code}): ${err.message}`)
        }
        navigator.geolocation.getCurrentPosition(success, error, options)
      },
      handleSubmit () {
        console.log(this.survivorData)
      }
    }
  }
</script>

<style>
  .inventory-label {
    min-width: 100px
  }
</style>
