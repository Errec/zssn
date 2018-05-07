import axios from 'axios'

const config = require('./config.json');

export function fetchSurvivorItems (id) {
  const request = axios.get(`${config.BASE_URL}/people/${id}/properties.json`).then((response) => {
      return response.data
    }).catch((err) => {
      return Promise.reject(err)
    })

    return {
        payload: request
    }
}
