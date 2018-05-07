import axios from 'axios'

const config = require('./config.json');

export function reportInfected (infectedId, myId) {
  const infectedIdData = `infected=${infectedId}`
  const request = axios.post(`${config.BASE_URL}/people/${myId}/report_infection.json`, infectedIdData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
  }).then((response) => {
      return response.data
    }).catch((err) => {
      return Promise.reject(err)
    })

    return {
        payload: request
    }
}
