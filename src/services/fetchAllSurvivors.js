import axios from 'axios'

const config = require('./config.json');

export function getSurvivorList () {
  axios.get(`${config.BASE_URL}/people.json`).then((response) => {
      console.log(response.data)
    }).catch((err) => {
      console.log(err)
    });
}
