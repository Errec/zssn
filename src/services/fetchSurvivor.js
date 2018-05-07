import axios from 'axios'

const config = require('./config.json');

export function fetchSurvivorData (id) {
  const request = axios.get(`${config.BASE_URL}/people/${id}.json`).then((response) => {
      return response.data
    }).catch((err) => {
      return Promise.reject(err)
    })

    return {
        payload: request
    }
}
