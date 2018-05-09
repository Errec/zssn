import axios from 'axios'

const config = require('./config.json');

export function fetchAllSurvivors () {
  const request = axios.get(`${config.BASE_URL}/people.json`).then((response) => {
      return response.data
    }).catch((err) => {
      return Promise.reject(err)
    })

    return {
        payload: request
    }
}
