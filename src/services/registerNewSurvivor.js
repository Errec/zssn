import axios from 'axios'

const config = require('./config.json');

export function registerNewSurvivor (vm, survivorPostData) {
  vm.$swal.showLoading()
  axios.post(`${config.BASE_URL}/people.json`, survivorPostData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
  }).then((response) => {
      vm.$swal.hideLoading()
      vm.$swal({
        type: 'success',
        text: 'Survivor Registered With Success'
      });
    }).catch((err) => {
      vm.$swal.hideLoading()
      vm.$swal({
        type: 'error',
        text: err
      });
    });
}
