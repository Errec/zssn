<template>
  <div class="info-table bg-light p-3 rounded border mb-3">
    <h3>{{tableTitle}}</h3>
    <table class="table table-striped table-dark table-bordered">
      <tbody>
        <tr v-for="(value, key, index) in tableData">
          <th scope="row">{{key}}</th>
          <td>{{value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: ['tableData', 'tableTitle'],
    data () {
      return {
        title: 'Table Title'
      }
    }
  }
</script>
