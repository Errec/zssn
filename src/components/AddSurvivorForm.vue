<template>
  <form class="survivor-form container">

    <div class="row">
      <div class="form-group col-sm-8">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" aria-describedby="name" placeholder="Enter name">
      </div>
      <div class="form-group col-sm-2">
        <label for="inputAge">Age</label>
        <input type="number" class="form-control" id="inputAge" aria-describedby="age">
      </div>
      <div class="form-group col-sm-2">
        <label for="selectGender">Gender</label>
        <select class="form-control" id="selectGender">
          <option value="">Select Gender</option>}
          option
          <option value="1">F</option>
          <option value="2">M</option>
        </select>
      </div>
    </div>

    <label for="inputPosition">Last location (latitude, longitude)</label>
    <div class="form-row" id="inputPosition">
      <div class="col">
        <input type="number" class="form-control" placeholder="Latitude">
      </div>
      <div class="col">
        <input type="number" class="form-control" placeholder="Longitude">
      </div>
    </div>

    <div class="form-group d-flex">
      <label class="inventory-label" for="inputWater">Water</label>
      <input type="number" class="form-control" id="inputWater" value="0">
    </div>
    <div class="form-group d-flex">
      <label class="inventory-label" for="inputFood">Food</label>
      <input type="number" class="form-control" id="inputFood" value="0">
    </div>
    <div class="form-group d-flex">
      <label class="inventory-label" for="inputMedication">Medication</label>
      <input type="number" class="form-control" id="inputMedication" value="0">
    </div>
    <div class="form-group d-flex">
      <label class="inventory-label" for="inputAmmunition">Ammunition</label>
      <input type="number" class="form-control" id="inputAmmunition" value="0">
    </div>

    <button type="submit" class="btn btn-dark">Save</button>
    <router-link to="/">
      <button type="button" class="btn btn-dark">Cancel</button>
    </router-link>
  </form>
</template>

<style>
  .inventory-label {
    min-width: 100px
  }
</style>
