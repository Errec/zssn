import axios from 'axios'

const config = require('./config.json');

export function registerNewSurvivor () {
  axios.post(`${config.BASE_URL}/people.json`).then((response) => {
      console.log(response.data)
    }).catch((err) => {
      console.log(err)
    });
}
