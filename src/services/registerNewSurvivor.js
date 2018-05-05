import axios from 'axios'

const config = require('./config.json');

export function registerNewSurvivor (survivorPostData) {
  axios.post(`${config.BASE_URL}/people.json`, survivorPostData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
  }).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    });
}
